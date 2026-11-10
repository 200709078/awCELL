package com.madematik.awcell;

import android.os.Bundle;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        // Yerel eklentiler köprü başlamadan kaydedilir.
        registerPlugin(AwCellNativePlugin.class);
        super.onCreate(savedInstanceState);
        // WebView, Android'in yazı boyutu ayarını (ör. 1,5×) bütün arayüze uygular ve tablo taşar;
        // tablonun kendi yakınlaştırması var.
        getBridge().getWebView().getSettings().setTextZoom(100);
    }
}
