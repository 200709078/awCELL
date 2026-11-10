package com.madematik.awcell;

import android.app.Activity;
import android.content.ContentResolver;
import android.content.Context;
import android.content.Intent;
import android.database.Cursor;
import android.net.Uri;
import android.print.PrintAttributes;
import android.print.PrintManager;
import android.provider.OpenableColumns;
import android.util.Base64;
import androidx.activity.OnBackPressedCallback;
import androidx.activity.result.ActivityResult;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.ActivityCallback;
import com.getcapacitor.annotation.CapacitorPlugin;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.HashMap;
import java.util.Map;

/**
 * WebView'in kendi yapamadıkları: Android'in dosya seçme ve kaydetme ekranları, açılan ya da
 * kaydedilen dosyaya yeniden yazma (Kaydet), başka uygulamadan "Birlikte aç", yazdırma ve geri
 * tuşu. Sayfa dosya adreslerini görmez, yalnız buradan verilen numaraları kullanır. Sayfa tarafı:
 * src/android.js.
 */
@CapacitorPlugin(name = "AwCellNative")
public class AwCellNativePlugin extends Plugin {

    private static final int COPY_BUFFER_BYTES = 64 * 1024;
    private static final long MAX_FILE_BYTES = 100L * 1024 * 1024;

    /** Bu açılışta kullanıcının verdiği dosyalar: numara → adres. */
    private final Map<Integer, Uri> files = new HashMap<>();
    private int lastId = 0;

    /** Bu olmadan geri tuşu, sayfada ne açık olursa olsun uygulamayı kapatırdı. */
    @Override
    public void load() {
        getActivity().getOnBackPressedDispatcher().addCallback(getActivity(), new OnBackPressedCallback(true) {
            @Override
            public void handleOnBackPressed() {
                if (hasListeners("backButton")) notifyListeners("backButton", new JSObject());
                else getActivity().moveTaskToBack(true);
            }
        });
    }

    @PluginMethod
    public void leaveApp(PluginCall call) {
        getActivity().runOnUiThread(() -> {
            getActivity().moveTaskToBack(true);
            call.resolve();
        });
    }

    /** Capacitor uygulamayı başlatan isteği de buradan geçirir ("Birlikte aç"). */
    @Override
    protected void handleOnNewIntent(Intent intent) {
        Uri uri = intent.getData();
        if (!Intent.ACTION_VIEW.equals(intent.getAction()) || uri == null) return;
        // Sayfa dinlemeye başlayana kadar saklanır: dokunuş uygulamayı sayfa yüklenmeden açabilir.
        notifyListeners("fileOpened", register(uri, false), true);
    }

    private JSObject register(Uri uri, boolean writable) {
        int id = ++lastId;
        files.put(id, uri);
        JSObject file = new JSObject();
        file.put("id", id);
        file.put("name", displayName(uri));
        file.put("writable", writable);
        return file;
    }

    @PluginMethod
    public void pickFile(PluginCall call) {
        Intent intent = new Intent(Intent.ACTION_OPEN_DOCUMENT);
        intent.addCategory(Intent.CATEGORY_OPENABLE);
        // .awc'nin Android'de türü yok; her şey gösterilir, uygulama açamadığını söyler.
        intent.setType("*/*");
        intent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION | Intent.FLAG_GRANT_WRITE_URI_PERMISSION);
        startActivityForResult(call, intent, "filePicked");
    }

    @ActivityCallback
    private void filePicked(PluginCall call, ActivityResult result) {
        Intent data = result.getData();
        if (result.getResultCode() != Activity.RESULT_OK || data == null || data.getData() == null) {
            call.resolve(new JSObject());
            return;
        }
        Uri uri = data.getData();
        call.resolve(register(uri, canWrite(data)));
    }

    private boolean canWrite(Intent data) {
        return (data.getFlags() & Intent.FLAG_GRANT_WRITE_URI_PERMISSION) != 0;
    }

    @PluginMethod
    public void readFile(PluginCall call) {
        Uri uri = files.get(call.getInt("id", 0));
        if (uri == null) {
            call.reject("Dosya bulunamadı.");
            return;
        }
        getBridge().execute(() -> {
            ContentResolver resolver = getContext().getContentResolver();
            try (InputStream input = resolver.openInputStream(uri); ByteArrayOutputStream output = new ByteArrayOutputStream()) {
                if (input == null) throw new FileNotFoundException(uri.toString());
                byte[] buffer = new byte[COPY_BUFFER_BYTES];
                long total = 0;
                for (int count = input.read(buffer); count >= 0; count = input.read(buffer)) {
                    total += count;
                    if (total > MAX_FILE_BYTES) {
                        call.reject("Dosya çok büyük (en çok 100 MB).");
                        return;
                    }
                    output.write(buffer, 0, count);
                }
                JSObject read = new JSObject();
                read.put("data", Base64.encodeToString(output.toByteArray(), Base64.NO_WRAP));
                call.resolve(read);
            } catch (IOException | SecurityException error) {
                call.reject("Dosya okunamadı.", error);
            }
        });
    }

    /** Kaydedilecek veri parça parça önbellekteki tek bir dosyaya gelir. */
    @PluginMethod
    public void appendSaveData(PluginCall call) {
        boolean first = Boolean.TRUE.equals(call.getBoolean("first", false));
        try (FileOutputStream output = new FileOutputStream(stagedCopy(), !first)) {
            output.write(Base64.decode(call.getString("data", ""), Base64.DEFAULT));
            call.resolve();
        } catch (IOException | IllegalArgumentException error) {
            call.reject("Dosya kaydetmeye hazırlanamadı.", error);
        }
    }

    /** Android'in "kaydet" ekranı: kullanıcı yeri ve adı seçer, hazırlanan veri oraya yazılır. */
    @PluginMethod
    public void saveFile(PluginCall call) {
        String name = new File(call.getString("name", "Tablo.awc")).getName();
        Intent intent = new Intent(Intent.ACTION_CREATE_DOCUMENT);
        intent.addCategory(Intent.CATEGORY_OPENABLE);
        intent.setType(mimeType(name));
        intent.putExtra(Intent.EXTRA_TITLE, name);
        startActivityForResult(call, intent, "fileSaved");
    }

    @ActivityCallback
    private void fileSaved(PluginCall call, ActivityResult result) {
        Intent data = result.getData();
        if (result.getResultCode() != Activity.RESULT_OK || data == null || data.getData() == null) {
            stagedCopy().delete();
            call.resolve(new JSObject());
            return;
        }
        Uri uri = data.getData();
        getBridge().execute(() -> {
            try {
                writeStaged(uri);
                call.resolve(register(uri, true));
            } catch (IOException | SecurityException error) {
                call.reject("Dosya kaydedilemedi.", error);
            }
        });
    }

    /** Kaydet: açık dosyanın üstüne yazar (izin yoksa sayfa "kaydet" ekranına döner). */
    @PluginMethod
    public void writeFile(PluginCall call) {
        Uri uri = files.get(call.getInt("id", 0));
        if (uri == null) {
            call.reject("Dosya bulunamadı.");
            return;
        }
        getBridge().execute(() -> {
            try {
                writeStaged(uri);
                call.resolve();
            } catch (IOException | SecurityException error) {
                call.reject("Dosyaya yazılamadı.", error);
            }
        });
    }

    private void writeStaged(Uri uri) throws IOException {
        File copy = stagedCopy();
        try (InputStream input = new FileInputStream(copy);
             OutputStream output = getContext().getContentResolver().openOutputStream(uri, "wt")) {
            if (output == null) throw new FileNotFoundException(uri.toString());
            byte[] buffer = new byte[COPY_BUFFER_BYTES];
            for (int count = input.read(buffer); count >= 0; count = input.read(buffer)) {
                output.write(buffer, 0, count);
            }
        } finally {
            copy.delete();
        }
    }

    /** Sayfayı olduğu gibi yazdırır; kâğıda ne gideceğine `@media print` stilleri karar verir. */
    @PluginMethod
    public void print(PluginCall call) {
        String name = call.getString("name", "awCELL");
        getActivity().runOnUiThread(() -> {
            PrintManager manager = (PrintManager) getContext().getSystemService(Context.PRINT_SERVICE);
            manager.print(name, getBridge().getWebView().createPrintDocumentAdapter(name), new PrintAttributes.Builder().build());
            call.resolve();
        });
    }

    private String displayName(Uri uri) {
        String[] columns = { OpenableColumns.DISPLAY_NAME };
        try (Cursor cursor = getContext().getContentResolver().query(uri, columns, null, null, null)) {
            if (cursor != null && cursor.moveToFirst() && !cursor.isNull(0)) return cursor.getString(0);
        } catch (SecurityException | IllegalArgumentException ignored) {
            // Aşağıdaki adres de kullanılabilir bir ad verir.
        }
        String segment = uri.getLastPathSegment();
        return segment == null ? "Tablo.awc" : new File(segment).getName();
    }

    /** Yalnız uygulamanın kaydettiği biçimler; .awc'nin türü yok. */
    private static String mimeType(String name) {
        String lower = name.toLowerCase();
        if (lower.endsWith(".xlsx")) return "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
        if (lower.endsWith(".ods")) return "application/vnd.oasis.opendocument.spreadsheet";
        if (lower.endsWith(".pdf")) return "application/pdf";
        if (lower.endsWith(".csv")) return "text/csv";
        if (lower.endsWith(".xls")) return "application/vnd.ms-excel";
        return "application/octet-stream";
    }

    private File stagedCopy() {
        File folder = new File(getContext().getCacheDir(), "kaydet");
        folder.mkdirs();
        return new File(folder, "kaydedilecek");
    }
}
