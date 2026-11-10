//Çoklu satır/sütun seçildiğinde bir satır/sütun genişliği değişirse bütün seçimin genişliği değişsin.
//Binlik ayraç butonu eklenecek.
//Hücre düzenleme modunda çift tıklama ile hücre metnininin tümü seçilebilsin.
//Hücre düzenleme modunda tek tık ile hücre metninin arasına girebileyim.
//Hücrenin köşesinden tutarak diğer hücrelere çoğaltabileyim.
// Butonlar sığmazsa alt satıra geçilsin.

const table = document.getElementById("data-table");
const addRowBtn = document.getElementById("add-row-btn");
const addRowDownBtn = document.getElementById("add-row-down-btn");
const removeRowBtn = document.getElementById("remove-row-btn");
const addColBtn = document.getElementById("add-col-btn");
const addColRightBtn = document.getElementById("add-col-right-btn");
const removeColBtn = document.getElementById("remove-col-btn");
const undoBtn = document.getElementById("undo-btn");
const redoBtn = document.getElementById("redo-btn");
const cellName = document.getElementById("cell-name");
const formulaInput = document.getElementById("formula-input");
const findToggleBtn = document.getElementById("find-toggle-btn");
const findPanel = document.getElementById("find-panel");
const findInput = document.getElementById("find-input");
const findCount = document.getElementById("find-count");
const findPrevBtn = document.getElementById("find-prev-btn");
const findNextBtn = document.getElementById("find-next-btn");
const replaceInput = document.getElementById("replace-input");
const replaceBtn = document.getElementById("replace-btn");
const replaceAllBtn = document.getElementById("replace-all-btn");
const findCloseBtn = document.getElementById("find-close-btn");
const fileMenuBtn = document.getElementById("file-menu-btn");
const fileMenu = document.getElementById("file-menu");
const newFileBtn = document.getElementById("new-file-btn");
const openFileBtn = document.getElementById("open-file-btn");
const openFileInput = document.getElementById("open-file-input");
const saveFileBtn = document.getElementById("save-file-btn");
const saveAsFileBtn = document.getElementById("save-as-file-btn");
const printFileBtn = document.getElementById("print-file-btn");
const editMenuBtn = document.getElementById("edit-menu-btn");
const editMenu = document.getElementById("edit-menu");
const menuUndoBtn = document.getElementById("menu-undo-btn");
const menuRedoBtn = document.getElementById("menu-redo-btn");
const menuCutBtn = document.getElementById("menu-cut-btn");
const menuCopyBtn = document.getElementById("menu-copy-btn");
const menuPasteBtn = document.getElementById("menu-paste-btn");
const menuDeleteBtn = document.getElementById("menu-delete-btn");
const menuFindBtn = document.getElementById("menu-find-btn");
const viewMenuBtn = document.getElementById("view-menu-btn");
const viewMenu = document.getElementById("view-menu");
const menuViewToolbarBtn = document.getElementById("menu-view-toolbar-btn");
const menuViewFormulaBtn = document.getElementById("menu-view-formula-btn");
const menuViewGridlinesBtn = document.getElementById("menu-view-gridlines-btn");
const menuFreezeAxisBtn = document.getElementById("menu-freeze-axis-btn");
const insertMenuBtn = document.getElementById("insert-menu-btn");
const insertMenu = document.getElementById("insert-menu");
const menuInsertRowsBtn = document.getElementById("menu-insert-rows-btn");
const menuInsertColsBtn = document.getElementById("menu-insert-cols-btn");
const insertChartBtn = document.getElementById("insert-chart-btn");
const dataMenuBtn = document.getElementById("data-menu-btn");
const dataMenu = document.getElementById("data-menu");
const menuSortAscBtn = document.getElementById("menu-sort-asc-btn");
const menuSortDescBtn = document.getElementById("menu-sort-desc-btn");
const menuFilterBtn = document.getElementById("menu-filter-btn");
const sortAscBtn = document.getElementById("sort-asc-btn");
const sortDescBtn = document.getElementById("sort-desc-btn");
const filterBtn = document.getElementById("filter-btn");
const hideAxisBtn = document.getElementById("hide-axis-btn");
const showAxisBtn = document.getElementById("show-axis-btn");
const freezeAxisBtn = document.getElementById("freeze-axis-btn");
const formatMenuBtn = document.getElementById("format-menu-btn");
const formatMenu = document.getElementById("format-menu");
const helpMenuBtn = document.getElementById("help-menu-btn");
const helpMenu = document.getElementById("help-menu");
const menuBoldBtn = document.getElementById("menu-bold-btn");
const menuItalicBtn = document.getElementById("menu-italic-btn");
const menuUnderlineBtn = document.getElementById("menu-underline-btn");
const menuStrikethroughBtn = document.getElementById("menu-strikethrough-btn");
const menuFontSizeIncreaseBtn = document.getElementById("menu-font-size-increase-btn");
const menuFontSizeDecreaseBtn = document.getElementById("menu-font-size-decrease-btn");
const menuTextColorBtn = document.getElementById("menu-text-color-btn");
const menuFillColorBtn = document.getElementById("menu-fill-color-btn");
const menuAlignBtn = document.getElementById("menu-align-btn");
const menuAlignLeftBtn = document.getElementById("menu-align-left-btn");
const menuAlignCenterBtn = document.getElementById("menu-align-center-btn");
const menuAlignRightBtn = document.getElementById("menu-align-right-btn");
const menuAlignJustifyBtn = document.getElementById("menu-align-justify-btn");
const menuAlignTopBtn = document.getElementById("menu-align-top-btn");
const menuAlignMiddleBtn = document.getElementById("menu-align-middle-btn");
const menuAlignBottomBtn = document.getElementById("menu-align-bottom-btn");
const menuBorderBtn = document.getElementById("menu-border-btn");
const menuMergeBtn = document.getElementById("menu-merge-btn");
const contextMenu = document.getElementById("context-menu");
const mergeBtn = document.getElementById("merge-btn");
const zoomValueBtn = document.getElementById("zoom-value-btn");
const zoomValueText = document.getElementById("zoom-value-text");
const zoomMenu = document.getElementById("zoom-menu");
const currencyFormatBtn = document.getElementById("currency-format-btn");
const percentFormatBtn = document.getElementById("percent-format-btn");
const decimalDecreaseBtn = document.getElementById("decimal-decrease-btn");
const decimalIncreaseBtn = document.getElementById("decimal-increase-btn");
const numberFormatMenu = document.getElementById("number-format-menu");
const boldBtn = document.getElementById("bold-btn");
const italicBtn = document.getElementById("italic-btn");
const underlineBtn = document.getElementById("underline-btn");
const strikethroughBtn = document.getElementById("strikethrough-btn");
const fontSizeDecreaseBtn = document.getElementById("font-size-decrease-btn");
const fontSizeIncreaseBtn = document.getElementById("font-size-increase-btn");
const textColorInput = document.getElementById("text-color-input");
const fillColorInput = document.getElementById("fill-color-input");
const alignLeftBtn = document.getElementById("align-left-btn");
const alignCenterBtn = document.getElementById("align-center-btn");
const alignRightBtn = document.getElementById("align-right-btn");
const alignJustifyBtn = document.getElementById("align-justify-btn");
const alignTopBtn = document.getElementById("align-top-btn");
const alignMiddleBtn = document.getElementById("align-middle-btn");
const alignBottomBtn = document.getElementById("align-bottom-btn");
const toolbarRow = document.getElementById("toolbar-row");
const toolbarOverflow = toolbarRow?.querySelector(".tb-overflow") ?? null;
const toolbarMenu = document.getElementById("toolbar-menu");
const toolbarMenuBtn = document.getElementById("toolbar-menu-btn");
const toolbarItems = toolbarRow ? Array.from(toolbarRow.querySelectorAll(":scope > .tb-item")) : [];
const toolbarGroups = Array.from(document.querySelectorAll("#control-panel .tb-group"));
/** Bölünmüş düğmenin (Hizalama, Kenarlık) büyük kısmının yapacağı iş: grubun içindeki son seçilen düğme. */
const toolbarSplitTargets = new WeakMap();
const TOOLBAR_MENU_ICON = '<path d="M4 7h16M4 12h16M4 17h16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>';
const TOOLBAR_CLOSE_ICON = '<path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>';
const TOOLBAR_SCREEN_MARGIN = 8;
const sheetTabs = document.getElementById("sheet-tabs");
const tableArea = document.getElementById("sheet-scroll");
const chartWindows = document.getElementById("chart-windows");
const chartSettingsPanel = document.getElementById("chart-settings-panel");
const chartSettingsTitle = document.getElementById("chart-settings-title");
const chartSettingsCloseBtn = document.getElementById("chart-settings-close-btn");
const chartSettingsTitleInput = document.getElementById("chart-settings-title-input");
const chartSettingsTypeInput = document.getElementById("chart-settings-type");
const chartSettingsTypeBtn = document.getElementById("chart-settings-type-btn");
const chartSettingsTypeMenu = document.getElementById("chart-settings-type-menu");
const chartSettingsLabelRangeInput = document.getElementById("chart-settings-label-range");
const chartSettingsValueRangeInput = document.getElementById("chart-settings-value-range");
const chartSettingsGridlinesInput = document.getElementById("chart-settings-gridlines");
const chartSettingsGridlinesField = chartSettingsGridlinesInput?.closest(".chart-settings-check");
const chartSettingsTrendlineInput = document.getElementById("chart-settings-trendline");
const chartSettingsTrendlineField = chartSettingsTrendlineInput?.closest(".chart-settings-check");
const chartSettingsAxisBounds = document.getElementById("chart-settings-axis-bounds");
const chartSettingsXMinInput = document.getElementById("chart-settings-x-min");
const chartSettingsXMaxInput = document.getElementById("chart-settings-x-max");
const chartSettingsYMinInput = document.getElementById("chart-settings-y-min");
const chartSettingsYMaxInput = document.getElementById("chart-settings-y-max");
const filterPopup = document.getElementById("filter-popup");
const filterPopupTitle = document.getElementById("filter-popup-title");
const filterPopupInput = document.getElementById("filter-popup-input");
const filterPopupApplyBtn = document.getElementById("filter-popup-apply-btn");
const filterPopupClearBtn = document.getElementById("filter-popup-clear-btn");
const MIN_ROW_SIZE = 20;
const MIN_COL_SIZE = 10;
const DEFAULT_COL_WIDTH = 84;
const DEFAULT_ROW_HEIGHT = 26;
const MIN_COL_WIDTH = 48;
const MIN_ROW_HEIGHT = 22;
const DEFAULT_FONT_SIZE = 13;
const MIN_FONT_SIZE = 8;
const MAX_FONT_SIZE = 36;
const MIN_ZOOM = 50;
const MAX_ZOOM = 200;
const ZOOM_LEVELS = [50, 75, 90, 100, 125, 150, 200];
const SAVE_NAME_COUNTER_KEY = "awcell.nextSaveNumber";
const VIEW_SETTINGS_KEY = "awcell.viewSettings";
const AUTOSAVE_KEY = "awcell.autosaveWorkbook";
const AWC_FILE_TYPE = {
    description: "awCELL dosyası",
    accept: { "application/json": [".awc"] }
};
const SAVE_AS_FILE_TYPES = [
    AWC_FILE_TYPE,
    {
        description: "Excel 97-2003 çalışma kitabı",
        accept: { "application/vnd.ms-excel": [".xls"] }
    },
    {
        description: "Excel çalışma kitabı",
        accept: { "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"] }
    },
    {
        description: "LibreOffice Calc çalışma kitabı",
        accept: { "application/vnd.oasis.opendocument.spreadsheet": [".ods"] }
    },
    {
        description: "PDF dosyası",
        accept: { "application/pdf": [".pdf"] }
    },
    {
        description: "CSV (yalnız etkin sayfa)",
        accept: { "text/csv": [".csv"] }
    }
];
let rowCount = 100;
let colCount = 26;
let selectedCell = { row: 0, col: 0 };
let selectionRange = null;
let selectionMode = "cell";
let extraSelections = [];
let internalClipboard = null;
let copiedRange = null;
let clipboardMode = null;
let contextMenuTarget = null;
let findResults = [];
let findResultIndex = -1;
let sheets = [];
let activeSheetIndex = 0;
let renamingSheetIndex = null;
let draggingSheetIndex = null;
let sheetDragOverIndex = null;
let currentWorkbookFileName = null;
let currentWorkbookFileHandle = null;
let tableData = [];
let colWidths = [];
let rowHeights = [];
let hiddenRows = new Set();
let hiddenCols = new Set();
let frozenRows = 0;
let frozenCols = 0;
let isMouseSelecting = false;
let mouseSelectionMoved = false;
let headerSelectionState = null;
let moveSelectionState = null;
let suppressClickAfterMove = false;
let suppressClickAfterPoint = false;
let resizeState = null;
let freezeDragState = null;
let undoStack = [];
let redoStack = [];
let isRestoringHistory = false;
let isAppInitialized = false;
let isLoadingWorkbook = false;
let autoSaveTimer = null;
let isEditing = false;
// "enter": hücreye yazarak girildi, oklar hücreden çıkar; "edit": F2/çift tık, oklar imleci taşır.
let editMode = "enter";
let formulaPointState = null;
let editBackupValue = "";
let formulaInputBackupValue = "";
let activeFilter = null;
let filterPopupColumn = null;
let charts = [];
let nextChartNumber = 1;
let activeChart = null;
let chartZIndex = 20;
let chartDragState = null;
let chartResizeState = null;
const MAX_HISTORY_SIZE = 60;
const CHART_TYPES = ["bar", "line", "pie", "scatter", "horizontalBar", "area", "doughnut", "radar"];
const COLOR_PALETTE = [
    "#000000", "#434343", "#666666", "#999999", "#cccccc", "#ffffff",
    "#d93025", "#f4511e", "#fbbc04", "#34a853", "#0f9d58", "#00acc1",
    "#1a73e8", "#3f51b5", "#673ab7", "#9c27b0", "#e91e63", "#795548",
    "#f4cccc", "#fce5cd", "#fff2cc", "#d9ead3", "#d0e0e3", "#cfe2f3",
    "#c9daf8", "#d9d2e9", "#ead1dc", "#efefef", "#b7b7b7", "#202124"
];

function normalizeSelectedCell() {
    if (!selectedCell) return;
    if (selectedCell.row >= rowCount) {
        selectedCell.row = rowCount - 1;
    }
    if (selectedCell.col >= colCount) {
        selectedCell.col = colCount - 1;
    }
}
function getColumnLabel(index) {
    let label = "";
    let current = index + 1;

    while (current > 0) {
        const remainder = (current - 1) % 26;
        label = String.fromCharCode(65 + remainder) + label;
        current = Math.floor((current - 1) / 26);
    }

    return label;
}

function getCellName(row, col) {
    return `${getColumnLabel(col)}${row + 1}`;
}

function shiftReferencePoint(point, rowOffset, colOffset) {
    if (point.row !== undefined && !point.rowAbs) point.row += rowOffset;
    if (point.col !== undefined && !point.colAbs) point.col += colOffset;
    return !(point.row < 0 || point.col < 0);
}

/** Kopyalama/taşımada göreli başvuruları kaydırır; tabloya düşmeyen başvuru #REF! olur. */
function adjustFormulaReferences(formula, rowOffset, colOffset) {
    if (!formula || (!rowOffset && !colOffset)) return formula;

    return AwFormula.mapReferences(formula, (ref) => {
        if (!shiftReferencePoint(ref.a, rowOffset, colOffset)) return null;
        if (ref.b && !shiftReferencePoint(ref.b, rowOffset, colOffset)) return null;
        return ref;
    });
}

function countIndexesBefore(indexes, position) {
    return indexes.filter((index) => index < position).length;
}

function mapDeletedAxisPosition(position, deletedIndexes) {
    if (deletedIndexes.includes(position)) return null;
    return position - countIndexesBefore(deletedIndexes, position);
}

function getRemainingAxisBounds(minPosition, maxPosition, deletedIndexes) {
    const remaining = [];

    for (let position = minPosition; position <= maxPosition; position++) {
        if (!deletedIndexes.includes(position)) remaining.push(position);
    }

    if (!remaining.length) return null;

    return {
        min: mapDeletedAxisPosition(remaining[0], deletedIndexes),
        max: mapDeletedAxisPosition(remaining[remaining.length - 1], deletedIndexes)
    };
}

/**
 * Satır/sütun ekleme-silmede bir başvuruyu günceller.
 * change: { mode: "insert", axis: "row" | "column", index, count } ya da
 *         { mode: "delete", axis, indexes: artan sırada }
 */
function adjustReferenceForGridChange(ref, change) {
    const key = change.axis === "row" ? "row" : "col";
    const points = ref.b ? [ref.a, ref.b] : [ref.a];
    if (points[0][key] === undefined) return ref;

    if (change.mode === "insert") {
        points.forEach((point) => {
            if (point[key] >= change.index) point[key] += change.count;
        });
        return ref;
    }

    const deletedIndexes = change.indexes ?? [];
    if (!ref.b) {
        const mapped = mapDeletedAxisPosition(ref.a[key], deletedIndexes);
        if (mapped === null) return null;
        ref.a[key] = mapped;
        return ref;
    }

    const isAscending = ref.a[key] <= ref.b[key];
    const remaining = getRemainingAxisBounds(
        Math.min(ref.a[key], ref.b[key]),
        Math.max(ref.a[key], ref.b[key]),
        deletedIndexes
    );
    if (!remaining) return null;
    ref.a[key] = isAscending ? remaining.min : remaining.max;
    ref.b[key] = isAscending ? remaining.max : remaining.min;
    return ref;
}

function isSameSheetName(a, b) {
    return String(a ?? "").toLocaleLowerCase("tr-TR") === String(b ?? "").toLocaleLowerCase("tr-TR");
}

function getSheetTableData(sheetIndex) {
    return sheetIndex === activeSheetIndex ? tableData : sheets[sheetIndex]?.tableData;
}

function forEachWorkbookFormulaCell(callback) {
    const sheetTotal = Math.max(1, sheets.length);
    for (let sheetIndex = 0; sheetIndex < sheetTotal; sheetIndex++) {
        const data = getSheetTableData(sheetIndex);
        if (!data) continue;
        data.forEach((row, rowIndex) => {
            row?.forEach((cell, colIndex) => {
                if (cell?.formula) callback(cell, sheetIndex, rowIndex, colIndex);
            });
        });
    }
}

/** Etkin sayfadaki ekleme/silmeyi, o sayfaya başvuran bütün formüllere (diğer sayfalar dahil) yansıtır. */
function adjustAllFormulasForGridChange(change) {
    const activeName = sheets[activeSheetIndex]?.name;

    forEachWorkbookFormulaCell((cell, sheetIndex) => {
        cell.formula = AwFormula.mapReferences(cell.formula, (ref) => {
            const pointsToActiveSheet = ref.sheet === null
                ? sheetIndex === activeSheetIndex
                : isSameSheetName(ref.sheet, activeName);
            return pointsToActiveSheet ? adjustReferenceForGridChange(ref, change) : ref;
        });
    });
    adjustChartRangesForGridChange(change);
}

function chartRangeToReference(range) {
    return {
        sheet: null,
        kind: "range",
        a: { row: range.start.row, col: range.start.col, rowAbs: false, colAbs: false },
        b: { row: range.end.row, col: range.end.col, rowAbs: false, colAbs: false }
    };
}

function adjustChartRangeForGridChange(range, change) {
    if (!range) return null;
    if (Array.isArray(range)) {
        const adjusted = range.map((item) => adjustChartRangeForGridChange(item, change));
        return adjusted.some((item) => !item) ? null : adjusted;
    }

    const ref = adjustReferenceForGridChange(chartRangeToReference(range), change);
    if (!ref) return null;
    return {
        start: { row: ref.a.row, col: ref.a.col },
        end: { row: ref.b.row, col: ref.b.col }
    };
}

/** Grafiklerin veri/etiket aralıkları ve başlık başvurusu da satır/sütun değişikliğini izler. */
function adjustChartRangesForGridChange(change) {
    charts.forEach((chart) => {
        if (chart.titleReference) {
            const ref = adjustReferenceForGridChange({
                sheet: null,
                kind: "cell",
                a: { row: chart.titleReference.row, col: chart.titleReference.col }
            }, change);
            chart.titleReference = ref ? { row: ref.a.row, col: ref.a.col } : null;
            if (chart.settings?.titleText && ref) {
                chart.settings.titleText = getCellName(ref.a.row, ref.a.col);
            }
        }

        if (!chart.config) return;
        const xRange = chart.config.xRange ? adjustChartRangeForGridChange(chart.config.xRange, change) : null;
        const yRange = adjustChartRangeForGridChange(chart.config.yRange, change);
        if (!yRange || (chart.config.xRange && !xRange)) {
            chart.config = null;
            showEmptyChartPanel(chart);
            return;
        }
        chart.config.xRange = xRange;
        chart.config.yRange = yRange;
        chart.settings = {
            ...(chart.settings ?? {}),
            labelRangeText: formatChartRange(xRange),
            valueRangeText: formatChartRange(yRange)
        };
    });
    if (activeChart) updateChartSettingsPanel();
}

/** Sayfa adı değişince ona başvuran formüller de yeni adı kullanır. */
function renameSheetReferences(oldName, newName) {
    forEachWorkbookFormulaCell((cell) => {
        cell.formula = AwFormula.mapReferences(cell.formula, (ref) => {
            if (ref.sheet !== null && isSameSheetName(ref.sheet, oldName)) ref.sheet = newName;
            return ref;
        });
    });
}

function getCellEditValue(row, col) {
    if (!isCellWithinBounds(row, col)) return "";

    const cell = tableData[row][col];
    return cell.formula ?? cell.value;
}

function updateFormulaBar() {
    if (!selectedCell || !cellName || !formulaInput) return;

    const { row, col } = selectedCell;
    const editValue = getCellEditValue(row, col);

    cellName.value = getCellName(row, col);
    setFormulaInputValue(editValue);
}

function updateToolbarState() {
    const isRowSelection = selectionMode === "row" && getSelectedRowIndexes().length > 0;
    const isColumnSelection = selectionMode === "column" && getSelectedColumnIndexes().length > 0;
    const selectedRowCount = getSelectedRowIndexes().length;
    const selectedColCount = getSelectedColumnIndexes().length;
    const canUseSelection = Boolean(selectedCell) && !isEditing;
    const canMergeSelection = hasMultiCellActiveRange() && !isEditing;
    const canDeleteRows = isRowSelection && rowCount - selectedRowCount >= MIN_ROW_SIZE;
    const canDeleteCols = isColumnSelection && colCount - selectedColCount >= MIN_COL_SIZE;

    addRowBtn.disabled = !isRowSelection;
    addRowDownBtn.disabled = !isRowSelection;
    removeRowBtn.disabled = !canDeleteRows;
    addColBtn.disabled = !isColumnSelection;
    addColRightBtn.disabled = !isColumnSelection;
    removeColBtn.disabled = !canDeleteCols;
    addRowBtn.title = isRowSelection ? `Üste ${selectedRowCount} satır ekle` : "Satır seç";
    addRowDownBtn.title = isRowSelection ? `Alta ${selectedRowCount} satır ekle` : "Satır seç";
    removeRowBtn.title = isRowSelection ? `${selectedRowCount} satır sil` : "Satır seç";
    addColBtn.title = isColumnSelection ? `Sola ${selectedColCount} sütun ekle` : "Sütun seç";
    addColRightBtn.title = isColumnSelection ? `Sağa ${selectedColCount} sütun ekle` : "Sütun seç";
    removeColBtn.title = isColumnSelection ? `${selectedColCount} sütun sil` : "Sütun seç";
    undoBtn.disabled = undoStack.length === 0;
    redoBtn.disabled = redoStack.length === 0;
    const canSort = canSortActiveRange();
    const hasFilter = Boolean(activeFilter);
    if (sortAscBtn) sortAscBtn.disabled = !canSort;
    if (sortDescBtn) sortDescBtn.disabled = !canSort;
    if (filterBtn) filterBtn.disabled = !canSort;
    filterBtn?.classList.toggle("active", hasFilter);
    if (filterBtn) {
        filterBtn.title = hasFilter ? "Filtreyi kaldır" : "Filtre oluştur";
    }

    [
        boldBtn,
        italicBtn,
        underlineBtn,
        strikethroughBtn,
        fontSizeDecreaseBtn,
        fontSizeIncreaseBtn,
        currencyFormatBtn,
        percentFormatBtn,
        decimalDecreaseBtn,
        decimalIncreaseBtn,
        alignLeftBtn,
        alignCenterBtn,
        alignRightBtn,
        alignJustifyBtn,
        alignTopBtn,
        alignMiddleBtn,
        alignBottomBtn
    ].forEach((button) => {
        if (button) button.disabled = !canUseSelection;
    });
    if (mergeBtn) mergeBtn.disabled = !canMergeSelection;

    const style = selectedCell ? getCellStyle(tableData[selectedCell.row]?.[selectedCell.col]) : createDefaultCellStyle();
    boldBtn?.classList.toggle("active", Boolean(style.bold));
    italicBtn?.classList.toggle("active", Boolean(style.italic));
    underlineBtn?.classList.toggle("active", Boolean(style.underline));
    strikethroughBtn?.classList.toggle("active", Boolean(style.strikeThrough));
    alignLeftBtn?.classList.toggle("active", style.horizontalAlign === "left");
    alignCenterBtn?.classList.toggle("active", style.horizontalAlign === "center");
    alignRightBtn?.classList.toggle("active", style.horizontalAlign === "right");
    alignJustifyBtn?.classList.toggle("active", style.horizontalAlign === "justify");
    alignTopBtn?.classList.toggle("active", style.verticalAlign === "top");
    alignMiddleBtn?.classList.toggle("active", style.verticalAlign === "middle");
    alignBottomBtn?.classList.toggle("active", style.verticalAlign === "bottom");
    const activeTextColor = normalizeColorValue(style.color, "#202124");
    if (textColorInput) textColorInput.value = activeTextColor;
    updateTextColorIndicator(activeTextColor);
    const activeFillColor = normalizeColorValue(style.backgroundColor, "#fff2cc");
    if (fillColorInput) fillColorInput.value = activeFillColor;
    updateFillColorIndicator(activeFillColor);
    updateToolbarGroupState(style, canUseSelection, isRowSelection, isColumnSelection);
    updateEditMenuState();
    updateInsertMenuState();
    updateDataMenuState();
    updateFormatMenuState();
}

function updateTextColorIndicator(color) {
    const normalizedColor = normalizeColorValue(color, "#202124");
    [menuTextColorBtn].forEach((button) => {
        button?.style.setProperty("--text-color-indicator", normalizedColor);
    });
}

function updateFillColorIndicator(color) {
    const normalizedColor = normalizeColorValue(color, "#fff2cc");
    [menuFillColorBtn].forEach((button) => {
        button?.style.setProperty("--fill-color-indicator", normalizedColor);
    });
}

function updateEditMenuState() {
    const canUseSelection = Boolean(selectedCell) && !isEditing;
    const selectedRowCount = getSelectedRowIndexes().length;
    const selectedColCount = getSelectedColumnIndexes().length;
    const canDeleteRows = selectionMode === "row" && selectedRowCount > 0 && rowCount - selectedRowCount >= MIN_ROW_SIZE && !isEditing;
    const canDeleteCols = selectionMode === "column" && selectedColCount > 0 && colCount - selectedColCount >= MIN_COL_SIZE && !isEditing;
    const canDeleteSheet = sheets.length > 1 && !isEditing;
    const canClearCells = canUseSelection && hasClearableContent();
    if (menuUndoBtn) menuUndoBtn.disabled = undoStack.length === 0;
    if (menuRedoBtn) menuRedoBtn.disabled = redoStack.length === 0;
    if (menuCutBtn) menuCutBtn.disabled = !canUseSelection;
    if (menuCopyBtn) menuCopyBtn.disabled = !canUseSelection;
    if (menuPasteBtn) menuPasteBtn.disabled = !canUseSelection;
    if (menuDeleteBtn) menuDeleteBtn.disabled = false;
    editMenu?.querySelectorAll("[data-delete-action]").forEach((button) => {
        const action = button.dataset.deleteAction;
        if (action === "row") button.disabled = !canDeleteRows;
        if (action === "column") button.disabled = !canDeleteCols;
        if (action === "sheet") button.disabled = !canDeleteSheet;
        if (action === "clear") button.disabled = !canClearCells;
    });
}

function getDefaultViewSettings() {
    return {
        toolbar: true,
        formulaBar: true,
        gridlines: true,
        zoom: 100
    };
}

function normalizeZoom(value) {
    const numericValue = Number(value);
    if (!Number.isFinite(numericValue)) return 100;

    const boundedValue = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, numericValue));
    return ZOOM_LEVELS.reduce((closest, level) => (
        Math.abs(level - boundedValue) < Math.abs(closest - boundedValue) ? level : closest
    ), 100);
}

let currentZoom = null;

function getCurrentZoom() {
    if (currentZoom === null) currentZoom = normalizeZoom(loadViewSettings().zoom);
    return currentZoom;
}

function getZoomScale() {
    return getCurrentZoom() / 100;
}

function loadViewSettings() {
    try {
        return {
            ...getDefaultViewSettings(),
            ...JSON.parse(safeStorageGet(VIEW_SETTINGS_KEY) || "{}")
        };
    } catch {
        return getDefaultViewSettings();
    }
}

function saveViewSettings(settings) {
    try {
        localStorage.setItem(VIEW_SETTINGS_KEY, JSON.stringify(settings));
    } catch {
        // Depolama kapalıysa ayar yalnız bu oturumda geçerli olur.
    }
}

function updateViewMenuState(settings = loadViewSettings()) {
    const setCheck = (button, isChecked) => {
        const check = button?.querySelector(".menu-check");
        if (check) check.classList.toggle("unchecked", !isChecked);
    };

    setCheck(menuViewToolbarBtn, settings.toolbar);
    setCheck(menuViewFormulaBtn, settings.formulaBar);
    setCheck(menuViewGridlinesBtn, settings.gridlines);

    const zoom = normalizeZoom(settings.zoom);
    if (zoomValueText) zoomValueText.textContent = `${zoom}%`;
    document.querySelectorAll("[data-zoom-value]").forEach((button) => {
        const isActive = Number(button.dataset.zoomValue) === zoom;
        button.classList.toggle("active", isActive);
        const check = button.querySelector(".menu-check");
        if (check) check.classList.toggle("unchecked", !isActive);
    });
}

function applyViewSettings(settings = loadViewSettings(), shouldSave = false) {
    document.body.classList.toggle("toolbar-hidden", !settings.toolbar);
    document.body.classList.toggle("formula-hidden", !settings.formulaBar);
    document.body.classList.toggle("gridlines-hidden", !settings.gridlines);
    settings.zoom = normalizeZoom(settings.zoom);
    currentZoom = settings.zoom;
    updateViewMenuState(settings);

    if (shouldSave) {
        saveViewSettings(settings);
    }
}

function toggleViewSetting(key) {
    const settings = loadViewSettings();
    settings[key] = !settings[key];
    applyViewSettings(settings, true);
}

function setZoom(zoomValue) {
    const settings = loadViewSettings();
    settings.zoom = normalizeZoom(zoomValue);
    applyViewSettings(settings, true);
    renderTable();
    focusSelectedCell();
}

function updateFormatMenuState() {
    const canUseSelection = Boolean(selectedCell) && !isEditing;
    const canMergeSelection = hasMultiCellActiveRange() && !isEditing;
    [
        menuBoldBtn,
        menuItalicBtn,
        menuUnderlineBtn,
        menuStrikethroughBtn,
        menuFontSizeIncreaseBtn,
        menuFontSizeDecreaseBtn,
        menuTextColorBtn,
        menuFillColorBtn,
        menuAlignBtn,
        menuAlignLeftBtn,
        menuAlignCenterBtn,
        menuAlignRightBtn,
        menuAlignJustifyBtn,
        menuAlignTopBtn,
        menuAlignMiddleBtn,
        menuAlignBottomBtn,
        menuBorderBtn
    ].forEach((button) => {
        if (button) button.disabled = !canUseSelection;
    });
    if (menuMergeBtn) menuMergeBtn.disabled = !canMergeSelection;
}

function updateNumberFormatMenuState() {
    const activeFormat = selectedCell
        ? getCellStyle(tableData[selectedCell.row]?.[selectedCell.col]).numberFormat
        : "automatic";

    numberFormatMenu?.querySelectorAll("[data-number-format]").forEach((button) => {
        const isActive = button.dataset.numberFormat === activeFormat;
        button.classList.toggle("active", isActive);
        const check = button.querySelector(".menu-check");
        if (check) check.classList.toggle("unchecked", !isActive);
    });
}

function updateInsertMenuState() {
    const isRowSelection = selectionMode === "row" && getSelectedRowIndexes().length > 0 && !isEditing;
    const isColumnSelection = selectionMode === "column" && getSelectedColumnIndexes().length > 0 && !isEditing;

    if (menuInsertRowsBtn) menuInsertRowsBtn.disabled = false;
    if (menuInsertColsBtn) menuInsertColsBtn.disabled = false;

    insertMenu?.querySelectorAll("[data-insert-action='row-above'], [data-insert-action='row-below']").forEach((button) => {
        button.disabled = !isRowSelection;
    });
    insertMenu?.querySelectorAll("[data-insert-action='col-left'], [data-insert-action='col-right']").forEach((button) => {
        button.disabled = !isColumnSelection;
    });
}

function canSortActiveRange() {
    if (isEditing) return false;
    if (selectionMode === "column") return getSelectedColumnIndexes().length === 1;

    const range = getActiveRange();
    return Boolean(range) && range.maxRow > range.minRow && range.maxCol >= range.minCol;
}

function updateDataMenuState() {
    const canSort = canSortActiveRange();
    const hasFilter = Boolean(activeFilter);
    if (menuSortAscBtn) menuSortAscBtn.disabled = !canSort;
    if (menuSortDescBtn) menuSortDescBtn.disabled = !canSort;
    if (menuFilterBtn) {
        menuFilterBtn.disabled = !canSort && !hasFilter;
        const label = menuFilterBtn.querySelector("span");
        if (label) label.textContent = hasFilter ? "Filtreyi kaldır" : "Filtre oluştur";
    }
    if (sortAscBtn) sortAscBtn.disabled = !canSort;
    if (sortDescBtn) sortDescBtn.disabled = !canSort;
    if (filterBtn) filterBtn.disabled = !canSort && !hasFilter;
    filterBtn?.classList.toggle("active", hasFilter);
    if (filterBtn) {
        filterBtn.title = hasFilter ? "Filtreyi kaldır" : "Filtre oluştur";
    }
    const isRowSelection = selectionMode === "row" && getSelectedRowIndexes().length > 0;
    const isColumnSelection = selectionMode === "column" && getSelectedColumnIndexes().length > 0;
    if (hideAxisBtn) {
        hideAxisBtn.disabled = !(isRowSelection || isColumnSelection) || isEditing;
        hideAxisBtn.title = isRowSelection
            ? "Seçili satırları gizle"
            : isColumnSelection
                ? "Seçili sütunları gizle"
                : "Satır veya sütun seç";
    }
    if (showAxisBtn) {
        showAxisBtn.disabled = (hiddenRows.size === 0 && hiddenCols.size === 0) || isEditing;
    }
    const canFreezeAxis = isRowSelection || isColumnSelection;
    const freezeAxisButtons = [freezeAxisBtn, menuFreezeAxisBtn].filter(Boolean);
    if (freezeAxisButtons.length) {
        const isSelectedAxisFrozen = getSelectedFreezeAxisState(isRowSelection, isColumnSelection).isFrozen;

        freezeAxisButtons.forEach((button) => {
            button.disabled = !canFreezeAxis || isEditing;
            button.classList.toggle("active", isSelectedAxisFrozen);
        });

        if (isRowSelection) {
            const label = isSelectedAxisFrozen
                ? "Seçilen satırı çöz"
                : "Seçilen satırı dondur";
            freezeAxisButtons.forEach((button) => {
                button.title = label;
                const text = button.querySelector("span");
                if (text) text.textContent = label;
            });
        } else if (isColumnSelection) {
            const label = isSelectedAxisFrozen
                ? "Seçilen sütunu çöz"
                : "Seçilen sütunu dondur";
            freezeAxisButtons.forEach((button) => {
                button.title = label;
                const text = button.querySelector("span");
                if (text) text.textContent = label;
            });
        } else {
            freezeAxisButtons.forEach((button) => {
                button.title = "Satır veya sütun seç";
                const text = button.querySelector("span");
                if (text) text.textContent = "Seçili satır/sütunu dondur";
            });
        }
    }
}

function hideContextMenu() {
    if (!contextMenu) return;

    contextMenu.hidden = true;
}

function hideColorPaletteMenus() {
    document.querySelectorAll(".color-palette-menu").forEach((menu) => {
        menu.hidden = true;
    });
}

function hideZoomMenu() {
    if (!zoomMenu) return;

    zoomMenu.hidden = true;
}

function hideChartTypeMenu() {
    if (!chartSettingsTypeMenu) return;

    chartSettingsTypeMenu.hidden = true;
    chartSettingsTypeBtn?.setAttribute("aria-expanded", "false");
}

function hideFilterPopup() {
    if (!filterPopup) return;

    filterPopup.hidden = true;
    filterPopupColumn = null;
}

function updateTextMenuActiveState() {
    fileMenuBtn?.classList.toggle("active", Boolean(fileMenu && !fileMenu.hidden));
    editMenuBtn?.classList.toggle("active", Boolean(editMenu && !editMenu.hidden));
    viewMenuBtn?.classList.toggle("active", Boolean(viewMenu && !viewMenu.hidden));
    insertMenuBtn?.classList.toggle("active", Boolean(insertMenu && !insertMenu.hidden));
    dataMenuBtn?.classList.toggle("active", Boolean(dataMenu && !dataMenu.hidden));
    formatMenuBtn?.classList.toggle("active", Boolean(formatMenu && !formatMenu.hidden));
    helpMenuBtn?.classList.toggle("active", Boolean(helpMenu && !helpMenu.hidden));
}

function hasOpenTextMenu() {
    return Boolean(
        (fileMenu && !fileMenu.hidden) ||
        (editMenu && !editMenu.hidden) ||
        (viewMenu && !viewMenu.hidden) ||
        (insertMenu && !insertMenu.hidden) ||
        (dataMenu && !dataMenu.hidden) ||
        (formatMenu && !formatMenu.hidden) ||
        (helpMenu && !helpMenu.hidden)
    );
}

let textMenuOpenedAt = 0;

function openTextMenu(menuName) {
    textMenuOpenedAt = performance.now();
    hideHelpMenu();
    hideFileMenu();
    hideEditMenu();
    hideViewMenu();
    hideInsertMenu();
    hideDataMenu();
    hideFormatMenu();
    hideZoomMenu();
    hideContextMenu();
    hideColorPaletteMenus();

    if (menuName === "file" && fileMenu) fileMenu.hidden = false;
    if (menuName === "edit" && editMenu) {
        updateEditMenuState();
        editMenu.hidden = false;
    }
    if (menuName === "view" && viewMenu) {
        updateViewMenuState();
        viewMenu.hidden = false;
    }
    if (menuName === "insert" && insertMenu) {
        updateInsertMenuState();
        insertMenu.hidden = false;
    }
    if (menuName === "data" && dataMenu) {
        updateDataMenuState();
        dataMenu.hidden = false;
    }
    if (menuName === "help" && helpMenu) helpMenu.hidden = false;
    if (menuName === "format" && formatMenu) {
        updateFormatMenuState();
        formatMenu.hidden = false;
    }
    updateTextMenuActiveState();
}

function hideFileMenu() {
    if (!fileMenu) return;

    fileMenu.hidden = true;
    updateTextMenuActiveState();
}

function hideEditMenu() {
    if (!editMenu) return;

    editMenu.hidden = true;
    updateTextMenuActiveState();
}

function hideViewMenu() {
    if (!viewMenu) return;

    viewMenu.hidden = true;
    updateTextMenuActiveState();
}

function hideInsertMenu() {
    if (!insertMenu) return;

    insertMenu.hidden = true;
    updateTextMenuActiveState();
}

function hideDataMenu() {
    if (!dataMenu) return;

    dataMenu.hidden = true;
    updateTextMenuActiveState();
}

function hideFormatMenu() {
    if (!formatMenu) return;

    formatMenu.hidden = true;
    updateTextMenuActiveState();
}

function hideHelpMenu() {
    if (!helpMenu) return;

    helpMenu.hidden = true;
    updateTextMenuActiveState();
}

function showZoomMenu() {
    if (!zoomMenu || !zoomValueBtn) return;

    const buttonRect = zoomValueBtn.getBoundingClientRect();
    zoomMenu.hidden = false;
    updateViewMenuState();
    const menuRect = zoomMenu.getBoundingClientRect();
    const left = Math.min(buttonRect.left, window.innerWidth - menuRect.width - 8);
    const top = Math.min(buttonRect.bottom + 4, window.innerHeight - menuRect.height - 8);

    zoomMenu.style.left = `${Math.max(8, left)}px`;
    zoomMenu.style.top = `${Math.max(8, top)}px`;
}

function createColorPaletteMenu(id, applyColor, resetLabel) {
    const menu = document.createElement("div");
    menu.id = id;
    menu.className = "toolbar-menu color-palette-menu";
    menu.hidden = true;

    const resetButton = document.createElement("button");
    resetButton.type = "button";
    resetButton.className = "color-reset-btn";
    resetButton.dataset.colorReset = "true";
    resetButton.title = resetLabel;
    resetButton.setAttribute("aria-label", resetLabel);
    resetButton.innerHTML = `<span></span>`;
    menu.appendChild(resetButton);

    COLOR_PALETTE.forEach((color) => {
        const button = document.createElement("button");
        button.type = "button";
        button.dataset.color = color;
        button.title = color;
        button.style.backgroundColor = color;
        button.setAttribute("aria-label", color);
        menu.appendChild(button);
    });

    menu.addEventListener("click", (e) => {
        e.stopPropagation();
        const button = e.target.closest("[data-color], [data-color-reset]");
        if (!button) return;

        applyColor(button.dataset.colorReset ? "" : button.dataset.color);
        menu.hidden = true;
    });

    document.body.appendChild(menu);
    return menu;
}

const textColorPaletteMenu = createColorPaletteMenu("text-color-palette-menu", setTextColor, "Otomatik");
const fillColorPaletteMenu = createColorPaletteMenu("fill-color-palette-menu", setFillColor, "Dolgu yok");

function showColorPaletteMenu(menu, anchor) {
    if (!menu || !anchor) return;

    hideColorPaletteMenus();
    hideZoomMenu();
    hideFilterPopup();

    const buttonRect = anchor.getBoundingClientRect();
    menu.hidden = false;
    const menuRect = menu.getBoundingClientRect();
    const left = Math.min(buttonRect.left, window.innerWidth - menuRect.width - 8);
    const top = Math.min(buttonRect.bottom + 4, window.innerHeight - menuRect.height - 8);

    menu.style.left = `${Math.max(8, left)}px`;
    menu.style.top = `${Math.max(8, top)}px`;
}

function clearClipboardState(shouldRender = false, shouldFocus = true) {
    if (!internalClipboard && !copiedRange && !clipboardMode) return false;

    internalClipboard = null;
    copiedRange = null;
    clipboardMode = null;

    if (shouldRender) {
        renderSelection();
        if (shouldFocus) {
            focusSelectedCell();
        }
    }

    return true;
}

function updateContextMenuState() {
    if (!contextMenu) return;

    const isRowContext = contextMenuTarget?.type === "row" && selectionMode === "row";
    const isColumnContext = contextMenuTarget?.type === "column" && selectionMode === "column";
    const isSheetContext = contextMenuTarget?.type === "sheet";
    const isCellContext = contextMenuTarget?.type === "cell" || contextMenuTarget?.type === "all";
    const isSelectionContext = isCellContext || isRowContext || isColumnContext;
    const hasHiddenAxes = hiddenRows.size > 0 || hiddenCols.size > 0;
    const hasSelection = Boolean(selectedCell);
    const selectedRowCount = getSelectedRowIndexes().length || 1;
    const selectedColCount = getSelectedColumnIndexes().length || 1;
    const rowDeleteCount = Math.min(selectedRowCount, Math.max(0, rowCount - MIN_ROW_SIZE));
    const colDeleteCount = Math.min(selectedColCount, Math.max(0, colCount - MIN_COL_SIZE));
    const visibleByAction = {
        cut: isSelectionContext,
        copy: isSelectionContext,
        paste: isSelectionContext,
        "insert-row-above": isRowContext,
        "insert-row-below": isRowContext,
        "delete-row": isRowContext,
        "hide-axis": isRowContext || isColumnContext,
        "freeze-axis": isRowContext || isColumnContext,
        "show-axes": (isRowContext || isColumnContext) && hasHiddenAxes,
        "insert-col-left": isColumnContext,
        "insert-col-right": isColumnContext,
        "delete-col": isColumnContext,
        "add-sheet": isSheetContext,
        "duplicate-sheet": isSheetContext,
        "rename-sheet": isSheetContext,
        "delete-sheet": isSheetContext,
        clear: isSelectionContext,
        note: isCellContext,
        "delete-note": isCellContext && selectionHasNote()
    };
    const stateByAction = {
        cut: hasSelection,
        copy: hasSelection,
        paste: hasSelection,
        "insert-row-above": isRowContext,
        "insert-row-below": isRowContext,
        "delete-row": isRowContext && rowDeleteCount > 0,
        "hide-axis": isRowContext || isColumnContext,
        "freeze-axis": isRowContext || isColumnContext,
        "show-axes": hiddenRows.size > 0 || hiddenCols.size > 0,
        "insert-col-left": isColumnContext,
        "insert-col-right": isColumnContext,
        "delete-col": isColumnContext && colDeleteCount > 0,
        "add-sheet": isSheetContext,
        "duplicate-sheet": isSheetContext,
        "rename-sheet": isSheetContext,
        "delete-sheet": isSheetContext && sheets.length > 1,
        clear: hasSelection && hasClearableContent(),
        note: hasSelection,
        "delete-note": hasSelection
    };

    contextMenu.querySelectorAll("[data-action]").forEach((button) => {
        const action = button.dataset.action;
        button.hidden = !visibleByAction[action];
        button.disabled = !stateByAction[action];
    });
    updateContextMenuSeparators();

    setContextMenuLabel("insert-row-above", `Üste ${selectedRowCount} satır ekle`);
    setContextMenuLabel("insert-row-below", `Alta ${selectedRowCount} satır ekle`);
    setContextMenuLabel("delete-row", `${selectedRowCount} satır sil`);
    setContextMenuLabel(
        "hide-axis",
        isRowContext
            ? `${selectedRowCount} satır gizle`
            : isColumnContext
                ? `${selectedColCount} sütun gizle`
                : "Seçili satır/sütunları gizle"
    );
    setContextMenuLabel(
        "freeze-axis",
        getFreezeAxisLabel(isRowContext, isColumnContext)
    );
    setContextMenuActive("freeze-axis", getSelectedFreezeAxisState(isRowContext, isColumnContext).isFrozen);
    setContextMenuLabel("insert-col-left", `Sola ${selectedColCount} sütun ekle`);
    setContextMenuLabel("insert-col-right", `Sağa ${selectedColCount} sütun ekle`);
    setContextMenuLabel("delete-col", `${selectedColCount} sütun sil`);
    setContextMenuLabel("note", selectedCell && tableData[selectedCell.row]?.[selectedCell.col]?.note ? "Notu düzenle" : "Not ekle");
}

function selectionHasNote() {
    return getActiveRanges().some((range) => {
        for (let r = range.minRow; r <= range.maxRow; r++) {
            for (let c = range.minCol; c <= range.maxCol; c++) {
                if (tableData[r]?.[c]?.note) return true;
            }
        }
        return false;
    });
}

function updateContextMenuSeparators() {
    if (!contextMenu) return;

    const items = [...contextMenu.children];
    items.forEach((item, index) => {
        if (item.tagName !== "HR") return;

        const previousSeparatorIndex = items
            .slice(0, index)
            .map((sibling, siblingIndex) => sibling.tagName === "HR" ? siblingIndex : -1)
            .filter((siblingIndex) => siblingIndex >= 0)
            .pop() ?? -1;
        const nextSeparatorOffset = items
            .slice(index + 1)
            .findIndex((sibling) => sibling.tagName === "HR");
        const nextSeparatorIndex = nextSeparatorOffset >= 0
            ? index + 1 + nextSeparatorOffset
            : items.length;
        const hasVisibleBefore = items
            .slice(previousSeparatorIndex + 1, index)
            .some((sibling) => !sibling.hidden);
        const hasVisibleAfter = items
            .slice(index + 1, nextSeparatorIndex)
            .some((sibling) => !sibling.hidden);

        item.hidden = !(hasVisibleBefore && hasVisibleAfter);
    });
}

function getFreezeAxisLabel(isRowContext, isColumnContext) {
    const { isFrozen } = getSelectedFreezeAxisState(isRowContext, isColumnContext);

    if (isRowContext) {
        return isFrozen
            ? "Seçilen satırı çöz"
            : "Seçilen satırı dondur";
    }

    if (isColumnContext) {
        return isFrozen
            ? "Seçilen sütunu çöz"
            : "Seçilen sütunu dondur";
    }

    return "Seçili satır/sütunu dondur";
}

function getSelectedFreezeAxisState(isRowContext, isColumnContext) {
    if (isRowContext) {
        const rows = getSelectedRowIndexes();
        const selectedFreezeLine = rows.length ? Math.max(...rows) + 1 : 0;

        return {
            selectedFreezeLine,
            isFrozen: selectedFreezeLine > 0 && frozenRows === selectedFreezeLine
        };
    }

    if (isColumnContext) {
        const cols = getSelectedColumnIndexes();
        const selectedFreezeLine = cols.length ? Math.max(...cols) + 1 : 0;

        return {
            selectedFreezeLine,
            isFrozen: selectedFreezeLine > 0 && frozenCols === selectedFreezeLine
        };
    }

    return {
        selectedFreezeLine: 0,
        isFrozen: false
    };
}

function setContextMenuLabel(action, label) {
    const button = contextMenu?.querySelector(`[data-action="${action}"] span`);
    if (button) button.textContent = label;
}

function setContextMenuActive(action, isActive) {
    const button = contextMenu?.querySelector(`[data-action="${action}"]`);
    if (button) button.classList.toggle("active", isActive);
}

function showContextMenu(e, target = null) {
    if (!contextMenu) return;

    e.preventDefault();
    e.stopPropagation();
    contextMenuTarget = target;
    updateContextMenuState();
    contextMenu.hidden = false;

    const menuRect = contextMenu.getBoundingClientRect();
    const left = Math.min(e.clientX, window.innerWidth - menuRect.width - 8);
    const top = Math.min(e.clientY, window.innerHeight - menuRect.height - 8);

    contextMenu.style.left = `${Math.max(8, left)}px`;
    contextMenu.style.top = `${Math.max(8, top)}px`;
}

function getActiveRange() {
    if (selectionRange) {
        return getNormalizedRange(selectionRange);
    }

    if (!selectedCell) return null;

    return {
        minRow: selectedCell.row,
        maxRow: selectedCell.row,
        minCol: selectedCell.col,
        maxCol: selectedCell.col
    };
}

function hasMultiCellActiveRange() {
    const range = getActiveRange();
    if (!range) return false;

    return range.minRow !== range.maxRow || range.minCol !== range.maxCol;
}

function getActiveRanges() {
    const ranges = [];
    const primaryRange = getActiveRange();
    if (primaryRange) ranges.push(primaryRange);

    extraSelections.forEach((range) => {
        const normalizedRange = getNormalizedRange(range);
        if (normalizedRange) ranges.push(normalizedRange);
    });

    return ranges;
}

function formatStatusNumber(value) {
    if (!Number.isFinite(value)) return "";

    return Number.isInteger(value)
        ? String(value)
        : value.toLocaleString("tr-TR", { maximumFractionDigits: 6 });
}

function getSelectionSummary() {
    const ranges = getActiveRanges();
    const seen = new Set();
    let count = 0;
    let numberCount = 0;
    let sum = 0;

    ranges.forEach((range) => {
        for (let r = range.minRow; r <= range.maxRow; r++) {
            for (let c = range.minCol; c <= range.maxCol; c++) {
                const key = `${r}:${c}`;
                if (seen.has(key)) continue;
                seen.add(key);

                const cell = tableData[r]?.[c];
                if (!cell) continue;

                const text = String(cell.value ?? "").trim();
                if (text !== "") {
                    count++;
                }

                const numericValue = parseCellNumber(text);
                if (numericValue !== null && !AwFormula.isErrorText(text)) {
                    numberCount++;
                    sum += numericValue;
                }
            }
        }
    });

    return {
        count,
        numberCount,
        sum,
        average: numberCount ? sum / numberCount : 0
    };
}

function updateStatusSummary() {
    const status = document.getElementById("status-summary");
    if (!status) return;

    status.innerHTML = "";
    const hasRangeSelection = Boolean(selectionRange || extraSelections.length || selectionMode === "row" || selectionMode === "column" || selectionMode === "all");
    if (!hasRangeSelection) {
        return;
    }

    const summary = getSelectionSummary();
    if (!summary.count && !summary.numberCount) {
        return;
    }

    const parts = [`Sayım: ${summary.count}`];
    if (summary.numberCount) {
        parts.unshift(`Ortalama: ${formatStatusNumber(summary.average)}`);
        parts.unshift(`Toplam: ${formatStatusNumber(summary.sum)}`);
    }

    parts.forEach((part) => {
        const item = document.createElement("span");
        item.className = "status-summary-item";
        item.textContent = part;
        status.appendChild(item);
    });
}

function hasClearableContent() {
    const ranges = getActiveRanges();
    if (!ranges.length) return false;

    for (const range of ranges) {
        for (let r = range.minRow; r <= range.maxRow; r++) {
            for (let c = range.minCol; c <= range.maxCol; c++) {
                const cell = tableData[r]?.[c];
                if (cell && (
                    cell.value ||
                    cell.formula ||
                    hasAnyBorder(cell) ||
                    hasNonDefaultStyle(cell) ||
                    cell.merge ||
                    cell.mergedTo
                )) {
                    return true;
                }
            }
        }
    }

    return false;
}

function setClipboardFromSelection(mode = "copy") {
    const range = getActiveRange();
    if (!range) return false;

    internalClipboard = [];
    for (let r = range.minRow; r <= range.maxRow; r++) {
        const row = [];
        for (let c = range.minCol; c <= range.maxCol; c++) {
            row.push(cloneClipboardCellData(tableData[r][c]));
        }
        internalClipboard.push(row);
    }

    copiedRange = {
        start: { row: range.minRow, col: range.minCol },
        end: { row: range.maxRow, col: range.maxCol }
    };
    clipboardMode = mode;
    renderSelection();
    focusSelectedCell();
    return true;
}

function pasteClipboard() {
    if (!internalClipboard || !selectedCell) return false;

    pushHistory();
    const startRow = selectedCell.row;
    const startCol = selectedCell.col;
    const sourceRange = copiedRange ? getNormalizedRange(copiedRange) : null;
    const isCutPaste = clipboardMode === "cut" && sourceRange;
    const requiredRows = startRow + internalClipboard.length;
    const requiredCols = startCol + Math.max(...internalClipboard.map((row) => row.length));

    ensureGridSize(requiredRows, requiredCols);

    const targetRange = {
        minRow: startRow,
        maxRow: startRow + internalClipboard.length - 1,
        minCol: startCol,
        maxCol: requiredCols - 1
    };
    clearMergesIntersectingRange(targetRange);

    for (let r = 0; r < internalClipboard.length; r++) {
        for (let c = 0; c < internalClipboard[r].length; c++) {
            const targetRow = startRow + r;
            const targetCol = startCol + c;
            const formulaOffset = clipboardMode === "copy" && sourceRange
                ? {
                    rowOffset: startRow - sourceRange.minRow,
                    colOffset: startCol - sourceRange.minCol
                }
                : null;

            tableData[targetRow][targetCol] = cloneCellData(internalClipboard[r][c], formulaOffset);
        }
    }

    if (isCutPaste) {
        clearMergesIntersectingRange(sourceRange);
        for (let r = sourceRange.minRow; r <= sourceRange.maxRow; r++) {
            for (let c = sourceRange.minCol; c <= sourceRange.maxCol; c++) {
                const isInsideTarget =
                    r >= targetRange.minRow &&
                    r <= targetRange.maxRow &&
                    c >= targetRange.minCol &&
                    c <= targetRange.maxCol;

                if (!isInsideTarget && r < rowCount && c < colCount) {
                    tableData[r][c] = createEmptyCell();
                }
            }
        }
        internalClipboard = null;
        copiedRange = null;
        clipboardMode = null;
    }

    recalculateAll();
    renderTable();
    refreshChartsForChangedRange(targetRange);
    if (isCutPaste) {
        refreshChartsForChangedRange(sourceRange);
    }
    focusSelectedCell();
    return true;
}

/** "Hücreleri temizle": içerik, biçim, kenarlık, not ve birleştirme silinir. */
function clearSelection() {
    const ranges = getActiveRanges();
    if (!ranges.length) return false;

    pushHistory();
    ranges.forEach((range) => {
        clearMergesIntersectingRange(range);
        for (let r = range.minRow; r <= range.maxRow; r++) {
            for (let c = range.minCol; c <= range.maxCol; c++) {
                tableData[r][c] = createEmptyCell();
            }
        }
    });

    recalculateAll();
    clearClipboardState();
    renderTable();
    ranges.forEach(refreshChartsForChangedRange);
    focusSelectedCell();
    return true;
}

/** Delete/Backspace: yalnız değer ve formül silinir; biçim, kenarlık ve birleştirme kalır. */
function clearSelectionContents() {
    const ranges = getActiveRanges();
    if (!ranges.length) return false;

    let changed = false;
    ranges.forEach((range) => {
        for (let r = range.minRow; r <= range.maxRow; r++) {
            for (let c = range.minCol; c <= range.maxCol; c++) {
                const cell = tableData[r]?.[c];
                if (cell && (cell.value !== "" || cell.formula)) changed = true;
            }
        }
    });
    if (!changed) return false;

    pushHistory();
    ranges.forEach((range) => {
        for (let r = range.minRow; r <= range.maxRow; r++) {
            for (let c = range.minCol; c <= range.maxCol; c++) {
                const cell = tableData[r]?.[c];
                if (!cell) continue;
                cell.value = "";
                cell.formula = null;
            }
        }
    });

    recalculateAll();
    clearClipboardState();
    renderTable();
    ranges.forEach(refreshChartsForChangedRange);
    focusSelectedCell();
    return true;
}

function applyBorderToSelection(action) {
    const ranges = getActiveRanges();
    if (!ranges.length) return false;

    pushHistory();
    ranges.forEach((range) => {
        for (let r = range.minRow; r <= range.maxRow; r++) {
            for (let c = range.minCol; c <= range.maxCol; c++) {
                const borders = action === "all"
                    ? createEmptyBorders()
                    : getCellBorders(tableData[r][c]);

                if (action === "clear") {
                    tableData[r][c].borders = createEmptyBorders();
                    continue;
                }

                if (action === "all") {
                    borders.top = true;
                    borders.left = true;
                    if (r === range.maxRow) borders.bottom = true;
                    if (c === range.maxCol) borders.right = true;
                }

                if (action === "outer") {
                    if (r === range.minRow) borders.top = true;
                    if (r === range.maxRow) borders.bottom = true;
                    if (c === range.minCol) borders.left = true;
                    if (c === range.maxCol) borders.right = true;
                }

                if (action === "inner") {
                    if (r < range.maxRow) borders.bottom = true;
                    if (c < range.maxCol) borders.right = true;
                }

                if (action === "top" && r === range.minRow) borders.top = true;
                if (action === "bottom" && r === range.maxRow) borders.bottom = true;
                if (action === "left" && c === range.minCol) borders.left = true;
                if (action === "right" && c === range.maxCol) borders.right = true;

                tableData[r][c].borders = borders;
            }
        }
    });

    renderTable();
    focusSelectedCell();
    return true;
}

function applyStyleToSelection(updater, options = {}) {
    const ranges = getActiveRanges();
    if (!ranges.length) return false;

    pushHistory();
    ranges.forEach((range) => {
        for (let r = range.minRow; r <= range.maxRow; r++) {
            for (let c = range.minCol; c <= range.maxCol; c++) {
                const cell = tableData[r]?.[c];
                if (!cell) continue;

                const style = getCellStyle(cell);
                updater(style, cell);
                cell.style = style;
            }
        }
    });

    if (options.autoFit) {
        ranges.forEach(fitRangeToContent);
    }

    renderTable();
    focusSelectedCell();
    return true;
}

function toggleStyleProperty(property) {
    if (!selectedCell) return false;

    const currentStyle = getCellStyle(tableData[selectedCell.row]?.[selectedCell.col]);
    const nextValue = !currentStyle[property];
    return applyStyleToSelection((style) => {
        style[property] = nextValue;
    });
}

function changeFontSize(delta) {
    return applyStyleToSelection((style) => {
        const currentSize = Number(style.fontSize) || DEFAULT_FONT_SIZE;
        style.fontSize = Math.max(MIN_FONT_SIZE, Math.min(MAX_FONT_SIZE, currentSize + delta));
    }, { autoFit: true });
}

function setTextColor(color) {
    const hasCustomColor = /^#[0-9a-f]{6}$/i.test(color ?? "");
    const normalizedColor = hasCustomColor ? normalizeColorValue(color, "#202124") : "";
    const indicatorColor = normalizedColor || "#202124";
    if (textColorInput) textColorInput.value = indicatorColor;
    updateTextColorIndicator(indicatorColor);
    return applyStyleToSelection((style) => {
        style.color = normalizedColor;
    });
}

function setFillColor(color) {
    const hasCustomColor = /^#[0-9a-f]{6}$/i.test(color ?? "");
    const normalizedColor = hasCustomColor ? normalizeColorValue(color, "#fff2cc") : "";
    const indicatorColor = normalizedColor || "#fff2cc";
    if (fillColorInput) fillColorInput.value = indicatorColor;
    updateFillColorIndicator(indicatorColor);
    return applyStyleToSelection((style) => {
        style.backgroundColor = normalizedColor;
    });
}

function setHorizontalAlignment(value) {
    return applyStyleToSelection((style) => {
        style.horizontalAlign = value;
    });
}

function setVerticalAlignment(value) {
    return applyStyleToSelection((style) => {
        style.verticalAlign = value;
    });
}

function setNumberFormat(format) {
    return applyStyleToSelection((style) => {
        style.numberFormat = format;
        if (!Number.isInteger(Number(style.decimalPlaces))) {
            style.decimalPlaces = format === "percent" ? 0 : 2;
        }
    });
}

function setNumberFormatWithDecimalPlaces(format, decimalPlaces) {
    return applyStyleToSelection((style) => {
        style.numberFormat = format;
        style.decimalPlaces = Math.max(0, Math.min(8, decimalPlaces));
    });
}

function changeDecimalPlaces(delta) {
    return applyStyleToSelection((style) => {
        const currentPlaces = Number.isInteger(Number(style.decimalPlaces))
            ? Number(style.decimalPlaces)
            : 2;
        style.decimalPlaces = Math.max(0, Math.min(8, currentPlaces + delta));
        if (!["currency", "percent", "number", "date", "time"].includes(style.numberFormat)) {
            style.numberFormat = "number";
        }
    });
}

function rangesIntersect(a, b) {
    return !(
        a.maxRow < b.minRow ||
        a.minRow > b.maxRow ||
        a.maxCol < b.minCol ||
        a.minCol > b.maxCol
    );
}

function getMergeRange(row, col) {
    const cell = tableData[row]?.[col];
    if (!cell) return null;

    if (cell.merge) {
        return {
            minRow: row,
            maxRow: row + cell.merge.rowspan - 1,
            minCol: col,
            maxCol: col + cell.merge.colspan - 1
        };
    }

    if (cell.mergedTo) {
        return getMergeRange(cell.mergedTo.row, cell.mergedTo.col);
    }

    return null;
}

function clearMergeAt(row, col) {
    const cell = tableData[row]?.[col];
    if (!cell?.merge) return;

    const { rowspan, colspan } = cell.merge;
    for (let r = row; r < row + rowspan; r++) {
        for (let c = col; c < col + colspan; c++) {
            if (!tableData[r]?.[c]) continue;
            tableData[r][c].mergedTo = null;
        }
    }

    cell.merge = null;
}

function clearMergesIntersectingRange(range) {
    const parents = [];

    for (let r = 0; r < rowCount; r++) {
        for (let c = 0; c < colCount; c++) {
            const mergeRange = getMergeRange(r, c);
            const isParent = tableData[r][c].merge;

            if (isParent && mergeRange && rangesIntersect(range, mergeRange)) {
                parents.push({ row: r, col: c });
            }
        }
    }

    parents.forEach(({ row, col }) => clearMergeAt(row, col));
}

function toggleMergeSelection() {
    const range = getActiveRange();
    if (!range) return false;

    const isSingleCell =
        range.minRow === range.maxRow &&
        range.minCol === range.maxCol;
    const existingMerge = isSingleCell
        ? getMergeRange(range.minRow, range.minCol)
        : null;

    if (existingMerge) {
        pushHistory();
        clearMergeAt(existingMerge.minRow, existingMerge.minCol);
        renderTable();
        focusSelectedCell();
        return true;
    }

    if (isSingleCell) return false;

    pushHistory();
    clearMergesIntersectingRange(range);

    const parent = tableData[range.minRow][range.minCol];
    parent.merge = {
        rowspan: range.maxRow - range.minRow + 1,
        colspan: range.maxCol - range.minCol + 1
    };
    parent.mergedTo = null;

    for (let r = range.minRow; r <= range.maxRow; r++) {
        for (let c = range.minCol; c <= range.maxCol; c++) {
            if (r === range.minRow && c === range.minCol) continue;

            tableData[r][c].value = "";
            tableData[r][c].formula = null;
            tableData[r][c].borders = createEmptyBorders();
            tableData[r][c].merge = null;
            tableData[r][c].mergedTo = {
                row: range.minRow,
                col: range.minCol
            };
        }
    }

    selectedCell = { row: range.minRow, col: range.minCol };
    selectionRange = null;
    selectionMode = "cell";
    extraSelections = [];
    clearClipboardState();
    renderTable();
    focusSelectedCell();
    return true;
}

function handleContextMenuAction(action) {
    if (action === "cut") copyFromMenu("cut");
    if (action === "copy") copyFromMenu("copy");
    if (action === "paste") pasteFromMenu();
    if (action === "insert-row-above" && contextMenuTarget?.type === "row") insertRowsAboveSelection();
    if (action === "insert-row-below" && contextMenuTarget?.type === "row") insertRowsBelowSelection();
    if (action === "delete-row" && contextMenuTarget?.type === "row") deleteSelectedRows();
    if (action === "hide-axis") hideSelectedRowsOrColumns();
    if (action === "freeze-axis") toggleFreezeSelectedAxis();
    if (action === "show-axes") showHiddenRowsAndColumns();
    if (action === "insert-col-left" && contextMenuTarget?.type === "column") insertColsLeftOfSelection();
    if (action === "insert-col-right" && contextMenuTarget?.type === "column") insertColsRightOfSelection();
    if (action === "delete-col" && contextMenuTarget?.type === "column") deleteSelectedColumns();
    if (action === "add-sheet") addSheet();
    if (action === "duplicate-sheet") duplicateSheet();
    if (action === "rename-sheet") renameActiveSheet();
    if (action === "delete-sheet") deleteActiveSheet();
    if (action === "clear") clearSelection();
    if (action === "note") editNoteForSelection();
    if (action === "delete-note") deleteNoteForSelection();
}

function selectCell(row, col, shouldScroll = false) {
    if (!isCellWithinBounds(row, col)) return false;

    selectSingleCell(row, col);
    renderSelection();
    focusSelectedCell(shouldScroll);
    return true;
}

function isColumnHeaderActive(col) {
    if (!selectedCell) return false;
    if (selectionMode === "all") return true;
    if (selectionMode === "column") {
        return isColumnInColumnSelection(col);
    }
    if (selectionMode === "cell" || selectionMode === "range") return selectedCell.col === col;
    return false;
}

function isRowHeaderActive(row) {
    if (!selectedCell) return false;
    if (selectionMode === "all") return true;
    if (selectionMode === "row") {
        return isRowInRowSelection(row);
    }
    if (selectionMode === "cell" || selectionMode === "range") return selectedCell.row === row;
    return false;
}

function isColumnInColumnSelection(col) {
    if (selectionMode !== "column") return false;

    const ranges = [selectionRange, ...extraSelections].filter(Boolean);
    return ranges.some((range) => {
        const normalizedRange = getNormalizedRange(range);
        return normalizedRange && col >= normalizedRange.minCol && col <= normalizedRange.maxCol;
    });
}

function isRowInRowSelection(row) {
    if (selectionMode !== "row") return false;

    const ranges = [selectionRange, ...extraSelections].filter(Boolean);
    return ranges.some((range) => {
        const normalizedRange = getNormalizedRange(range);
        return normalizedRange && row >= normalizedRange.minRow && row <= normalizedRange.maxRow;
    });
}

function getSelectedColumnIndexes() {
    if (selectionMode !== "column") return [];

    const columns = new Set();
    [selectionRange, ...extraSelections].filter(Boolean).forEach((range) => {
        const normalizedRange = getNormalizedRange(range);
        if (!normalizedRange) return;

        for (let col = normalizedRange.minCol; col <= normalizedRange.maxCol; col++) {
            if (col >= 0 && col < colCount) columns.add(col);
        }
    });

    return [...columns].sort((a, b) => a - b);
}

function getSelectedRowIndexes() {
    if (selectionMode !== "row") return [];

    const rows = new Set();
    [selectionRange, ...extraSelections].filter(Boolean).forEach((range) => {
        const normalizedRange = getNormalizedRange(range);
        if (!normalizedRange) return;

        for (let row = normalizedRange.minRow; row <= normalizedRange.maxRow; row++) {
            if (row >= 0 && row < rowCount) rows.add(row);
        }
    });

    return [...rows].sort((a, b) => a - b);
}

function createColumnSelectionRange(col) {
    return {
        start: { row: 0, col },
        end: { row: rowCount - 1, col }
    };
}

function createRowSelectionRange(row) {
    return {
        start: { row, col: 0 },
        end: { row, col: colCount - 1 }
    };
}

function toggleExtraColumnSelection(col) {
    const existsAt = extraSelections.findIndex((range) => {
        const normalizedRange = getNormalizedRange(range);
        return normalizedRange?.minCol === col && normalizedRange?.maxCol === col;
    });

    if (existsAt >= 0) {
        extraSelections.splice(existsAt, 1);
    } else {
        extraSelections.push(createColumnSelectionRange(col));
    }
}

function toggleExtraRowSelection(row) {
    const existsAt = extraSelections.findIndex((range) => {
        const normalizedRange = getNormalizedRange(range);
        return normalizedRange?.minRow === row && normalizedRange?.maxRow === row;
    });

    if (existsAt >= 0) {
        extraSelections.splice(existsAt, 1);
    } else {
        extraSelections.push(createRowSelectionRange(row));
    }
}

function startHeaderSelection(type, index) {
    headerSelectionState = {
        type,
        start: index,
        moved: false
    };

    if (type === "column") {
        selectedCell = { row: 0, col: index };
        selectionMode = "column";
        selectionRange = createColumnSelectionRange(index);
    } else {
        selectedCell = { row: index, col: 0 };
        selectionMode = "row";
        selectionRange = createRowSelectionRange(index);
    }

    extraSelections = [];
    renderSelection();
    focusSelectedCell();
}

function updateHeaderSelection(type, index) {
    if (!headerSelectionState || headerSelectionState.type !== type) return;
    if (headerSelectionState.start === index && !headerSelectionState.moved) return;

    headerSelectionState.moved = true;
    extraSelections = [];

    if (type === "column") {
        selectionMode = "column";
        selectionRange = {
            start: { row: 0, col: headerSelectionState.start },
            end: { row: rowCount - 1, col: index }
        };
    } else {
        selectionMode = "row";
        selectionRange = {
            start: { row: headerSelectionState.start, col: 0 },
            end: { row: index, col: colCount - 1 }
        };
    }

    renderSelection();
    focusSelectedCell();
}

function startMoveSelection(type, startIndex) {
    moveSelectionState = {
        type,
        startIndex,
        targetIndex: startIndex,
        moved: false
    };
}

function updateMoveSelection(type, targetIndex) {
    if (!moveSelectionState || moveSelectionState.type !== type) return;

    moveSelectionState.targetIndex = targetIndex;
    moveSelectionState.moved = moveSelectionState.startIndex !== targetIndex;
    renderSelection();
    focusSelectedCell();
}

function startCellMove(row, col) {
    const range = getActiveRange();
    if (!range) return false;

    moveSelectionState = {
        type: "cell",
        startIndex: { row, col },
        targetIndex: { row: range.minRow, col: range.minCol },
        sourceRange: { ...range },
        moved: false
    };
    return true;
}

function isNearSelectionEdge(e, cell, row, col) {
    const edgeSize = 6;
    const rect = cell.getBoundingClientRect();
    const visualRange = getVisualCellRange(row, col);
    const ranges = getActiveRanges();

    return ranges.some((range) => {
        if (!rangesIntersect(visualRange, range)) return false;

        const isTopEdge = visualRange.minRow <= range.minRow && e.clientY - rect.top <= edgeSize;
        const isBottomEdge = visualRange.maxRow >= range.maxRow && rect.bottom - e.clientY <= edgeSize;
        const isLeftEdge = visualRange.minCol <= range.minCol && e.clientX - rect.left <= edgeSize;
        const isRightEdge = visualRange.maxCol >= range.maxCol && rect.right - e.clientX <= edgeSize;

        return isTopEdge || isBottomEdge || isLeftEdge || isRightEdge;
    });
}

function updateCellMoveTarget(row, col) {
    if (!moveSelectionState || moveSelectionState.type !== "cell") return;

    moveSelectionState.targetIndex = { row, col };
    moveSelectionState.moved =
        row !== moveSelectionState.sourceRange.minRow ||
        col !== moveSelectionState.sourceRange.minCol;
    renderSelection();
    focusSelectedCell();
}

function getCellMoveTargetRange() {
    if (!moveSelectionState || moveSelectionState.type !== "cell") return null;

    const { sourceRange, targetIndex } = moveSelectionState;
    const rowOffset = targetIndex.row - sourceRange.minRow;
    const colOffset = targetIndex.col - sourceRange.minCol;

    return {
        minRow: sourceRange.minRow + rowOffset,
        maxRow: sourceRange.maxRow + rowOffset,
        minCol: sourceRange.minCol + colOffset,
        maxCol: sourceRange.maxCol + colOffset
    };
}

function selectColumn(col, event = {}) {
    if (!isCellWithinBounds(0, col)) return;

    if (event.shiftKey && selectedCell && selectionMode === "column") {
        selectionMode = "column";
        extraSelections = [];
        selectionRange = {
            start: { row: 0, col: selectedCell.col },
            end: { row: rowCount - 1, col }
        };
        renderSelection();
        focusSelectedCell();
        return;
    }

    if ((event.ctrlKey || event.metaKey) && selectedCell && selectionMode === "column") {
        toggleExtraColumnSelection(col);
        renderSelection();
        focusSelectedCell();
        return;
    }

    selectedCell = { row: 0, col };
    selectionMode = "column";
    extraSelections = [];
    selectionRange = createColumnSelectionRange(col);
    renderSelection();
    focusSelectedCell();
}

function selectRow(row, event = {}) {
    if (!isCellWithinBounds(row, 0)) return;

    if (event.shiftKey && selectedCell && selectionMode === "row") {
        selectionMode = "row";
        extraSelections = [];
        selectionRange = {
            start: { row: selectedCell.row, col: 0 },
            end: { row, col: colCount - 1 }
        };
        renderSelection();
        focusSelectedCell();
        return;
    }

    if ((event.ctrlKey || event.metaKey) && selectedCell && selectionMode === "row") {
        toggleExtraRowSelection(row);
        renderSelection();
        focusSelectedCell();
        return;
    }

    selectedCell = { row, col: 0 };
    selectionMode = "row";
    extraSelections = [];
    selectionRange = createRowSelectionRange(row);
    renderSelection();
    focusSelectedCell();
}

function selectAllCells() {
    selectedCell = { row: 0, col: 0 };
    selectionMode = "all";
    extraSelections = [];
    selectionRange = {
        start: { row: 0, col: 0 },
        end: { row: rowCount - 1, col: colCount - 1 }
    };
    renderSelection();
    focusSelectedCell();
}

function focusSelectedCell(shouldScroll = false) {
    if (!selectedCell) return;

    const cell = getCellElement(selectedCell.row, selectedCell.col);
    if (!cell) return;

    cell.focus({ preventScroll: !shouldScroll });

    if (shouldScroll) {
        cell.scrollIntoView({
            block: "nearest",
            inline: "nearest"
        });
    }
}

function getNormalizedRange(range) {
    if (!range) return null;

    return expandRangeForMerges({
        minRow: Math.min(range.start.row, range.end.row),
        maxRow: Math.max(range.start.row, range.end.row),
        minCol: Math.min(range.start.col, range.end.col),
        maxCol: Math.max(range.start.col, range.end.col)
    });
}

function expandRangeForMerges(range) {
    if (!range) return null;

    let expandedRange = { ...range };
    let didExpand = true;

    while (didExpand) {
        didExpand = false;

        for (let r = 0; r < rowCount; r++) {
            for (let c = 0; c < colCount; c++) {
                const cell = tableData[r]?.[c];
                if (!cell?.merge) continue;

                const mergeRange = getMergeRange(r, c);
                if (!mergeRange || !rangesIntersect(expandedRange, mergeRange)) continue;

                const nextRange = {
                    minRow: Math.min(expandedRange.minRow, mergeRange.minRow),
                    maxRow: Math.max(expandedRange.maxRow, mergeRange.maxRow),
                    minCol: Math.min(expandedRange.minCol, mergeRange.minCol),
                    maxCol: Math.max(expandedRange.maxCol, mergeRange.maxCol)
                };

                if (
                    nextRange.minRow !== expandedRange.minRow ||
                    nextRange.maxRow !== expandedRange.maxRow ||
                    nextRange.minCol !== expandedRange.minCol ||
                    nextRange.maxCol !== expandedRange.maxCol
                ) {
                    expandedRange = nextRange;
                    didExpand = true;
                }
            }
        }
    }

    return expandedRange;
}

function getVisualCellRange(row, col) {
    return getMergeRange(row, col) ?? {
        minRow: row,
        maxRow: row,
        minCol: col,
        maxCol: col
    };
}

function isCellInNormalizedRange(row, col, range) {
    if (!range) return false;

    return rangesIntersect(getVisualCellRange(row, col), range);
}

function isCellInCurrentSelection(row, col) {
    if (selectionRange && isCellInNormalizedRange(row, col, getNormalizedRange(selectionRange))) {
        return true;
    }

    if (extraSelections.some((range) =>
        isCellInNormalizedRange(row, col, getNormalizedRange(range))
    )) {
        return true;
    }

    return (
        selectedCell &&
        selectionMode === "cell" &&
        selectedCell.row === row &&
        selectedCell.col === col
    );
}

function addExtraCellSelection(row, col) {
    const existsAt = extraSelections.findIndex((range) => (
        range.start.row === row &&
        range.end.row === row &&
        range.start.col === col &&
        range.end.col === col
    ));

    if (existsAt >= 0) {
        extraSelections.splice(existsAt, 1);
    } else {
        extraSelections.push({
            start: { row, col },
            end: { row, col }
        });
    }
}

function cloneCellData(cell, formulaOffset = null) {
    const clonedCell = {
        value: cell.value,
        formula: cell.formula,
        borders: { ...getCellBorders(cell) },
        style: { ...getCellStyle(cell) },
        merge: cell.merge ? { ...cell.merge } : null,
        mergedTo: cell.mergedTo ? { ...cell.mergedTo } : null
    };
    if (cell.note) clonedCell.note = cell.note;

    if (formulaOffset && clonedCell.formula) {
        clonedCell.formula = adjustFormulaReferences(
            clonedCell.formula,
            formulaOffset.rowOffset,
            formulaOffset.colOffset
        );
    }

    return clonedCell;
}

function cloneClipboardCellData(cell) {
    const clonedCell = {
        value: cell.value,
        formula: cell.formula,
        borders: { ...getCellBorders(cell) },
        style: { ...getCellStyle(cell) },
        merge: null,
        mergedTo: null
    };
    if (cell.note) clonedCell.note = cell.note;
    return clonedCell;
}

function createEmptyBorders() {
    return {
        top: false,
        right: false,
        bottom: false,
        left: false
    };
}

function getCellBorders(cell) {
    return {
        ...createEmptyBorders(),
        ...(cell?.borders ?? {})
    };
}

function hasAnyBorder(cell) {
    const borders = getCellBorders(cell);
    return borders.top || borders.right || borders.bottom || borders.left;
}

function createDefaultCellStyle() {
    return {
        bold: false,
        italic: false,
        underline: false,
        strikeThrough: false,
        fontSize: DEFAULT_FONT_SIZE,
        color: "#202124",
        backgroundColor: "",
        horizontalAlign: "left",
        verticalAlign: "middle",
        numberFormat: "automatic",
        decimalPlaces: 2
    };
}

function getCellStyle(cell) {
    return {
        ...createDefaultCellStyle(),
        ...(cell?.style ?? {})
    };
}

function hasNonDefaultStyle(cell) {
    const style = getCellStyle(cell);
    const defaults = createDefaultCellStyle();

    return (
        style.bold !== defaults.bold ||
        style.italic !== defaults.italic ||
        style.underline !== defaults.underline ||
        style.strikeThrough !== defaults.strikeThrough ||
        (Number(style.fontSize) || DEFAULT_FONT_SIZE) !== defaults.fontSize ||
        style.color !== defaults.color ||
        style.backgroundColor !== defaults.backgroundColor ||
        style.horizontalAlign !== defaults.horizontalAlign ||
        style.verticalAlign !== defaults.verticalAlign ||
        style.numberFormat !== defaults.numberFormat ||
        (Number(style.decimalPlaces) || 0) !== defaults.decimalPlaces
    );
}

function normalizeColorValue(value, fallback) {
    return /^#[0-9a-f]{6}$/i.test(value ?? "") ? value : fallback;
}

function parseCellNumberForDisplay(cell) {
    return parseCellNumber(cell?.value);
}

function formatCellDateValue(cell) {
    const rawValue = cell?.formula ? cell.value : cell?.value;
    const text = String(rawValue ?? "").trim();
    if (!text) return "";

    const dateMatch = text.match(/^(\d{1,2})[./-](\d{1,2})[./-](\d{2,4})$/);
    if (dateMatch) {
        const day = Number(dateMatch[1]);
        const month = Number(dateMatch[2]);
        const year = Number(dateMatch[3].padStart(4, "20"));
        const date = new Date(year, month - 1, day);
        if (date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day) {
            return [
                String(day).padStart(2, "0"),
                String(month).padStart(2, "0"),
                String(year).padStart(4, "0")
            ].join(".");
        }
    }

    const parsedDate = new Date(text);
    if (Number.isNaN(parsedDate.getTime())) return rawValue ?? "";

    return [
        String(parsedDate.getDate()).padStart(2, "0"),
        String(parsedDate.getMonth() + 1).padStart(2, "0"),
        String(parsedDate.getFullYear()).padStart(4, "0")
    ].join(".");
}

function formatCellTimeValue(cell) {
    const rawValue = cell?.formula ? cell.value : cell?.value;
    const text = String(rawValue ?? "").trim();
    if (!text) return "";

    const timeMatch = text.match(/^(\d{1,2}):(\d{1,2})(?::(\d{1,2}))?$/);
    if (timeMatch) {
        const hours = Number(timeMatch[1]);
        const minutes = Number(timeMatch[2]);
        const seconds = Number(timeMatch[3] ?? 0);
        if (hours < 24 && minutes < 60 && seconds < 60) {
            return [
                String(hours).padStart(2, "0"),
                String(minutes).padStart(2, "0"),
                String(seconds).padStart(2, "0")
            ].join(":");
        }
    }

    const parsedDate = new Date(text);
    if (Number.isNaN(parsedDate.getTime())) return rawValue ?? "";

    return [
        String(parsedDate.getHours()).padStart(2, "0"),
        String(parsedDate.getMinutes()).padStart(2, "0"),
        String(parsedDate.getSeconds()).padStart(2, "0")
    ].join(":");
}

function formatCellDisplayValue(cell) {
    const style = getCellStyle(cell);
    if (style.numberFormat === "date") {
        return formatCellDateValue(cell);
    }
    if (style.numberFormat === "time") {
        return formatCellTimeValue(cell);
    }

    const number = parseCellNumberForDisplay(cell);
    if (number === null) return cell?.value ?? "";
    if (AwFormula.isErrorText(cell?.value)) return cell.value;

    const decimalPlaces = Math.max(0, Math.min(8, Number(style.decimalPlaces) || 0));
    if (style.numberFormat === "currency") {
        return `${number.toLocaleString("tr-TR", {
            minimumFractionDigits: decimalPlaces,
            maximumFractionDigits: decimalPlaces
        })} ₺`;
    }

    if (style.numberFormat === "percent") {
        return `${(number * 100).toLocaleString("tr-TR", {
            minimumFractionDigits: decimalPlaces,
            maximumFractionDigits: decimalPlaces
        })}%`;
    }

    if (style.numberFormat === "number") {
        return number.toLocaleString("tr-TR", {
            minimumFractionDigits: decimalPlaces,
            maximumFractionDigits: decimalPlaces
        });
    }

    // Formül sonuçları Türkçe ondalık virgülüyle gösterilir; yazılan değer yazıldığı gibi kalır.
    if (cell?.formula) {
        return number.toLocaleString("tr-TR", { maximumFractionDigits: 10, useGrouping: false });
    }

    return cell?.value ?? "";
}

function createEmptyCell() {
    return {
        value: "",
        formula: null,
        borders: createEmptyBorders(),
        style: createDefaultCellStyle(),
        merge: null,
        mergedTo: null
    };
}

function ensureGridSize(requiredRows, requiredCols) {
    while (rowCount < requiredRows) {
        rowCount++;
        rowHeights.push(DEFAULT_ROW_HEIGHT);
        tableData.push(Array.from({ length: colCount }, createEmptyCell));
    }

    while (colCount < requiredCols) {
        colCount++;
        colWidths.push(DEFAULT_COL_WIDTH);
        tableData.forEach((row) => {
            row.push(createEmptyCell());
        });
    }
}

function insertRowsAt(index, count) {
    if (count <= 0) return;

    pushHistory();
    const targetIndex = Math.max(0, Math.min(index, rowCount));
    rowCount += count;
    rowHeights.splice(targetIndex, 0, ...Array.from({ length: count }, () => DEFAULT_ROW_HEIGHT));
    hiddenRows = new Set([...hiddenRows].map((row) => row >= targetIndex ? row + count : row));
    if (targetIndex < frozenRows) frozenRows += count;
    tableData.splice(
        targetIndex,
        0,
        ...Array.from({ length: count }, () => Array.from({ length: colCount }, createEmptyCell))
    );
    adjustAllFormulasForGridChange({
        mode: "insert",
        axis: "row",
        index: targetIndex,
        count
    });
    recalculateAll();
    selectedCell = { row: targetIndex, col: selectedCell?.col ?? 0 };
    selectionRange = null;
    selectionMode = "cell";
    extraSelections = [];
    copiedRange = null;
    internalClipboard = null;
    clipboardMode = null;
    normalizeSelectedCell();
    renderTable();
    refreshChartsFromConfigs();
    focusSelectedCell();
}

function insertColsAt(index, count) {
    if (count <= 0) return;

    pushHistory();
    const targetIndex = Math.max(0, Math.min(index, colCount));
    colCount += count;
    colWidths.splice(targetIndex, 0, ...Array.from({ length: count }, () => DEFAULT_COL_WIDTH));
    hiddenCols = new Set([...hiddenCols].map((col) => col >= targetIndex ? col + count : col));
    if (targetIndex < frozenCols) frozenCols += count;
    tableData.forEach((row) => {
        row.splice(targetIndex, 0, ...Array.from({ length: count }, createEmptyCell));
    });
    adjustAllFormulasForGridChange({
        mode: "insert",
        axis: "column",
        index: targetIndex,
        count
    });
    recalculateAll();
    selectedCell = { row: selectedCell?.row ?? 0, col: targetIndex };
    selectionRange = null;
    selectionMode = "cell";
    extraSelections = [];
    copiedRange = null;
    internalClipboard = null;
    clipboardMode = null;
    normalizeSelectedCell();
    renderTable();
    refreshChartsFromConfigs();
    focusSelectedCell();
}

function deleteRowsAt(indexes) {
    const uniqueIndexes = [...new Set(indexes)]
        .filter((index) => index >= 0 && index < rowCount)
        .sort((a, b) => b - a);
    const deleteCount = Math.min(uniqueIndexes.length, Math.max(0, rowCount - MIN_ROW_SIZE));
    if (deleteCount <= 0) return;

    const indexesToDelete = uniqueIndexes.slice(0, deleteCount);
    pushHistory();
    const deletedRowsAscending = [...indexesToDelete].sort((a, b) => a - b);
    indexesToDelete.forEach((targetIndex) => {
        tableData.splice(targetIndex, 1);
        rowHeights.splice(targetIndex, 1);
    });
    rowCount -= indexesToDelete.length;
    hiddenRows = new Set([...hiddenRows]
        .map((row) => mapDeletedAxisPosition(row, deletedRowsAscending))
        .filter((row) => row !== null && row >= 0 && row < rowCount));
    frozenRows = Math.max(0, frozenRows - deletedRowsAscending.filter((row) => row < frozenRows).length);
    adjustAllFormulasForGridChange({
        mode: "delete",
        axis: "row",
        indexes: [...indexesToDelete].sort((a, b) => a - b)
    });
    const topDeletedIndex = Math.min(...indexesToDelete);
    selectedCell = {
        row: Math.min(topDeletedIndex, rowCount - 1),
        col: selectedCell?.col ?? 0
    };
    selectionRange = null;
    selectionMode = "cell";
    extraSelections = [];
    copiedRange = null;
    internalClipboard = null;
    clipboardMode = null;
    recalculateAll();
    normalizeSelectedCell();
    renderTable();
    refreshChartsFromConfigs();
    focusSelectedCell();
}

function deleteColsAt(indexes) {
    const uniqueIndexes = [...new Set(indexes)]
        .filter((index) => index >= 0 && index < colCount)
        .sort((a, b) => b - a);
    const deleteCount = Math.min(uniqueIndexes.length, Math.max(0, colCount - MIN_COL_SIZE));
    if (deleteCount <= 0) return;

    const indexesToDelete = uniqueIndexes.slice(0, deleteCount);
    pushHistory();
    const deletedColsAscending = [...indexesToDelete].sort((a, b) => a - b);
    indexesToDelete.forEach((targetIndex) => {
        colWidths.splice(targetIndex, 1);
        tableData.forEach((row) => {
            row.splice(targetIndex, 1);
        });
    });
    colCount -= indexesToDelete.length;
    hiddenCols = new Set([...hiddenCols]
        .map((col) => mapDeletedAxisPosition(col, deletedColsAscending))
        .filter((col) => col !== null && col >= 0 && col < colCount));
    frozenCols = Math.max(0, frozenCols - deletedColsAscending.filter((col) => col < frozenCols).length);
    adjustAllFormulasForGridChange({
        mode: "delete",
        axis: "column",
        indexes: [...indexesToDelete].sort((a, b) => a - b)
    });
    const leftDeletedIndex = Math.min(...indexesToDelete);
    selectedCell = {
        row: selectedCell?.row ?? 0,
        col: Math.min(leftDeletedIndex, colCount - 1)
    };
    selectionRange = null;
    selectionMode = "cell";
    extraSelections = [];
    copiedRange = null;
    internalClipboard = null;
    clipboardMode = null;
    recalculateAll();
    normalizeSelectedCell();
    renderTable();
    refreshChartsFromConfigs();
    focusSelectedCell();
}

function insertRowsAboveSelection() {
    const rows = getSelectedRowIndexes();
    const count = rows.length || 1;
    const targetIndex = rows.length ? Math.min(...rows) : contextMenuTarget?.row ?? selectedCell?.row ?? 0;
    insertRowsAt(targetIndex, count);
}

function insertRowsBelowSelection() {
    const rows = getSelectedRowIndexes();
    const count = rows.length || 1;
    const targetIndex = rows.length ? Math.max(...rows) + 1 : (contextMenuTarget?.row ?? selectedCell?.row ?? 0) + 1;
    insertRowsAt(targetIndex, count);
}

function insertColsLeftOfSelection() {
    const cols = getSelectedColumnIndexes();
    const count = cols.length || 1;
    const targetIndex = cols.length ? Math.min(...cols) : contextMenuTarget?.col ?? selectedCell?.col ?? 0;
    insertColsAt(targetIndex, count);
}

function insertColsRightOfSelection() {
    const cols = getSelectedColumnIndexes();
    const count = cols.length || 1;
    const targetIndex = cols.length ? Math.max(...cols) + 1 : (contextMenuTarget?.col ?? selectedCell?.col ?? 0) + 1;
    insertColsAt(targetIndex, count);
}

function getCellSortValue(cell) {
    const rawValue = String(cell?.formula ? cell.value : cell?.value ?? "").trim();
    if (rawValue === "") {
        return { type: "blank", value: "" };
    }

    const numberValue = parseCellNumber(rawValue);
    if (numberValue !== null) {
        return { type: "number", value: numberValue };
    }

    return { type: "text", value: rawValue };
}

const sortCollator = new Intl.Collator("tr-TR", { sensitivity: "base", numeric: true });

function compareSortValues(a, b, direction) {
    if (a.type === "blank" && b.type !== "blank") return 1;
    if (a.type !== "blank" && b.type === "blank") return -1;
    if (a.type === "blank" && b.type === "blank") return 0;

    const typeOrder = { number: 0, text: 1 };
    const orderDiff = typeOrder[a.type] - typeOrder[b.type];
    if (orderDiff !== 0) return orderDiff * direction;

    const diff = a.type === "text" ? sortCollator.compare(a.value, b.value) : a.value - b.value;
    return Math.sign(diff) * direction;
}

function rangeHasMerges(range) {
    for (let r = range.minRow; r <= range.maxRow; r++) {
        for (let c = range.minCol; c <= range.maxCol; c++) {
            const cell = tableData[r]?.[c];
            if (cell?.merge || cell?.mergedTo) return true;
        }
    }
    return false;
}

/**
 * Sıralanacak alan ve anahtar sütun. Bir sütun seçiliyse dolu satırların tamamı o sütuna göre
 * sıralanır (satırlar bütün olarak yer değiştirir); ilk satır başlıksa yerinde kalır.
 */
function getSortPlan() {
    const range = getActiveRange();
    if (!range) return null;

    if (selectionMode !== "column") {
        return { range, keyCol: range.minCol };
    }

    const keyCol = selectedCell?.col ?? range.minCol;
    const used = getLastUsedPosition();
    if (used.row < 1) return null;
    const firstCell = tableData[0]?.[keyCol];
    const firstValue = String(firstCell?.value ?? "").trim();
    let hasHeader = false;
    if (firstValue !== "" && parseCellNumber(firstValue) === null) {
        hasHeader = getCellStyle(firstCell).bold;
        for (let r = 1; r <= used.row && !hasHeader; r++) {
            if (parseCellNumber(tableData[r]?.[keyCol]?.value) !== null) hasHeader = true;
        }
    }

    return {
        range: { minRow: hasHeader ? 1 : 0, maxRow: used.row, minCol: 0, maxCol: Math.max(used.col, keyCol) },
        keyCol
    };
}

function sortActiveRange(direction = "asc") {
    const plan = getSortPlan();
    if (!plan || isEditing || plan.range.maxRow <= plan.range.minRow) return false;
    const { range, keyCol } = plan;

    if (rangeHasMerges(range)) {
        showAppMessage("Birleştirilmiş hücre içeren bir alan sıralanamaz. Önce birleştirmeyi kaldırın.");
        return false;
    }

    const directionMultiplier = direction === "desc" ? -1 : 1;
    const isFullWidth = range.minCol === 0 && range.maxCol >= colCount - 1;
    const rows = [];

    for (let row = range.minRow; row <= range.maxRow; row++) {
        rows.push({
            row,
            height: rowHeights[row],
            cells: tableData[row].slice(range.minCol, range.maxCol + 1),
            sortValue: getCellSortValue(tableData[row][keyCol])
        });
    }

    rows.sort((a, b) => {
        const valueDiff = compareSortValues(a.sortValue, b.sortValue, directionMultiplier);
        return valueDiff || (a.row - b.row);
    });

    pushHistory();
    rows.forEach((item, offset) => {
        const targetRow = range.minRow + offset;
        for (let col = range.minCol; col <= range.maxCol; col++) {
            // Satır taşınmış gibi: aynı satıra bakan göreli başvurular yeni satırı gösterir.
            tableData[targetRow][col] = cloneCellData(item.cells[col - range.minCol], {
                rowOffset: targetRow - item.row,
                colOffset: 0
            });
        }
        if (isFullWidth || selectionMode === "column") {
            rowHeights[targetRow] = item.height;
        }
    });

    recalculateAll();
    renderTable();
    refreshChartsForChangedRange(range);
    focusSelectedCell();
    return true;
}

function normalizeFilter(filter) {
    if (!filter?.range || !Number.isInteger(filter.column)) return null;

    const range = {
        minRow: Math.max(0, Math.min(rowCount - 1, Number(filter.range.minRow) || 0)),
        maxRow: Math.max(0, Math.min(rowCount - 1, Number(filter.range.maxRow) || 0)),
        minCol: Math.max(0, Math.min(colCount - 1, Number(filter.range.minCol) || 0)),
        maxCol: Math.max(0, Math.min(colCount - 1, Number(filter.range.maxCol) || 0))
    };

    if (range.maxRow <= range.minRow || range.maxCol < range.minCol) return null;

    return {
        range,
        column: Math.max(range.minCol, Math.min(range.maxCol, filter.column)),
        query: String(filter.query || "")
    };
}

function isRowHiddenByFilter(row) {
    const filter = normalizeFilter(activeFilter);
    if (!filter) return false;
    if (row <= filter.range.minRow || row > filter.range.maxRow) return false;
    if (!filter.query.trim()) return false;

    const cellText = getCellEditableText(row, filter.column).toLocaleLowerCase("tr-TR");
    return !cellText.includes(filter.query.toLocaleLowerCase("tr-TR"));
}

function createFilterFromSelection() {
    const range = getActiveRange();
    if (!range || !canSortActiveRange()) return false;

    activeFilter = {
        range: { ...range },
        column: range.minCol,
        query: ""
    };
    selectedCell = { row: range.minRow, col: range.minCol };

    renderTable();
    focusSelectedCell();
    updateToolbarState();
    scheduleAutoSave();
    return true;
}

function hideSelectedRowsOrColumns() {
    const rows = getSelectedRowIndexes();
    const cols = getSelectedColumnIndexes();

    if (selectionMode === "row" && rows.length) {
        pushHistory();
        rows.forEach((row) => hiddenRows.add(row));
        renderTable();
        focusSelectedCell();
        updateToolbarState();
        scheduleAutoSave();
        return true;
    }

    if (selectionMode === "column" && cols.length) {
        pushHistory();
        cols.forEach((col) => hiddenCols.add(col));
        renderTable();
        focusSelectedCell();
        updateToolbarState();
        scheduleAutoSave();
        return true;
    }

    return false;
}

function showHiddenRowsAndColumns() {
    if (hiddenRows.size === 0 && hiddenCols.size === 0) return false;

    pushHistory();
    hiddenRows.clear();
    hiddenCols.clear();
    renderTable();
    focusSelectedCell();
    updateToolbarState();
    scheduleAutoSave();
    return true;
}

function clampFrozenPanes() {
    frozenRows = Math.max(0, Math.min(rowCount, Number(frozenRows) || 0));
    frozenCols = Math.max(0, Math.min(colCount, Number(frozenCols) || 0));
}

function toggleFreezeSelectedAxis() {
    const rows = getSelectedRowIndexes();
    const cols = getSelectedColumnIndexes();

    if (selectionMode === "row" && rows.length) {
        const nextFrozenRows = Math.max(...rows) + 1;
        pushHistory();
        frozenRows = frozenRows === nextFrozenRows ? 0 : nextFrozenRows;
        clampFrozenPanes();
        renderTable();
        focusSelectedCell();
        updateToolbarState();
        scheduleAutoSave();
        return true;
    }

    if (selectionMode === "column" && cols.length) {
        const nextFrozenCols = Math.max(...cols) + 1;
        pushHistory();
        frozenCols = frozenCols === nextFrozenCols ? 0 : nextFrozenCols;
        clampFrozenPanes();
        renderTable();
        focusSelectedCell();
        updateToolbarState();
        scheduleAutoSave();
        return true;
    }

    return false;
}

function removeFreezeDividers() {
    tableArea?.querySelectorAll(".freeze-divider").forEach((divider) => divider.remove());
}

function updateFreezeDividerPositions() {
    if (!tableArea) return;

    const rowDivider = tableArea.querySelector(".freeze-row-divider");
    if (rowDivider) {
        const top = Number(rowDivider.dataset.freezeTop) || 0;
        rowDivider.style.top = `${tableArea.scrollTop + top - 2}px`;
        rowDivider.style.left = `${tableArea.scrollLeft}px`;
        rowDivider.style.width = `${tableArea.clientWidth}px`;
    }

    const colDivider = tableArea.querySelector(".freeze-col-divider");
    if (colDivider) {
        const left = Number(colDivider.dataset.freezeLeft) || 0;
        colDivider.style.left = `${tableArea.scrollLeft + left - 2}px`;
        colDivider.style.top = `${tableArea.scrollTop}px`;
        colDivider.style.height = `${tableArea.clientHeight}px`;
    }
}

function getFreezeDividerMetrics() {
    const zoomScale = getZoomScale();
    let frozenTop = DEFAULT_ROW_HEIGHT;
    let frozenLeft = 46;

    for (let row = 0; row < frozenRows; row++) {
        if (hiddenRows.has(row) || isRowHiddenByFilter(row)) continue;
        frozenTop += Math.round((rowHeights[row] ?? DEFAULT_ROW_HEIGHT) * zoomScale);
    }

    for (let col = 0; col < frozenCols; col++) {
        if (hiddenCols.has(col)) continue;
        frozenLeft += Math.round((colWidths[col] ?? DEFAULT_COL_WIDTH) * zoomScale);
    }

    return { frozenTop, frozenLeft };
}

function refreshFreezeDividers() {
    const { frozenTop, frozenLeft } = getFreezeDividerMetrics();
    renderFreezeDividers(frozenTop, frozenLeft);
}

function renderFreezeDividers(frozenTop, frozenLeft) {
    if (!tableArea) return;

    removeFreezeDividers();

    if (frozenRows > 0) {
        const rowDivider = document.createElement("div");
        rowDivider.className = "freeze-divider freeze-row-divider";
        rowDivider.dataset.freezeTop = String(frozenTop);
        rowDivider.title = "Donmuş satır sınırını taşı";
        rowDivider.addEventListener("mousedown", (e) => startFreezeDividerDrag(e, "row"));
        tableArea.appendChild(rowDivider);
    }

    if (frozenCols > 0) {
        const colDivider = document.createElement("div");
        colDivider.className = "freeze-divider freeze-col-divider";
        colDivider.dataset.freezeLeft = String(frozenLeft);
        colDivider.title = "Donmuş sütun sınırını taşı";
        colDivider.addEventListener("mousedown", (e) => startFreezeDividerDrag(e, "column"));
        tableArea.appendChild(colDivider);
    }

    updateFreezeDividerPositions();
}

function startFreezeDividerDrag(e, type) {
    e.preventDefault();
    e.stopPropagation();

    pushHistory();
    freezeDragState = {
        type,
        startRows: frozenRows,
        startCols: frozenCols
    };
    tableArea?.querySelector(`.freeze-${type === "row" ? "row" : "col"}-divider`)?.classList.add("dragging");
}

function getFreezeRowFromPointer(clientY) {
    const tableRect = table.getBoundingClientRect();
    const contentY = clientY - tableRect.top;
    const headerHeight = DEFAULT_ROW_HEIGHT;
    if (contentY <= headerHeight) return 0;

    let bottom = headerHeight;
    for (let row = 0; row < rowCount; row++) {
        if (hiddenRows.has(row) || isRowHiddenByFilter(row)) continue;
        bottom += Math.round((rowHeights[row] ?? DEFAULT_ROW_HEIGHT) * getZoomScale());
        if (contentY < bottom) return row + 1;
    }

    return rowCount;
}

function getFreezeColFromPointer(clientX) {
    const tableRect = table.getBoundingClientRect();
    const contentX = clientX - tableRect.left;
    const rowHeaderWidth = 46;
    if (contentX <= rowHeaderWidth) return 0;

    let right = rowHeaderWidth;
    for (let col = 0; col < colCount; col++) {
        if (hiddenCols.has(col)) continue;
        right += Math.round((colWidths[col] ?? DEFAULT_COL_WIDTH) * getZoomScale());
        if (contentX < right) return col + 1;
    }

    return colCount;
}

function updateFreezeDividerDrag(e) {
    if (!freezeDragState) return false;

    if (freezeDragState.type === "row") {
        const nextFrozenRows = getFreezeRowFromPointer(e.clientY);
        if (nextFrozenRows !== frozenRows) {
            frozenRows = nextFrozenRows;
            renderTable();
        }
        return true;
    }

    const nextFrozenCols = getFreezeColFromPointer(e.clientX);
    if (nextFrozenCols !== frozenCols) {
        frozenCols = nextFrozenCols;
        renderTable();
    }
    return true;
}

function finishFreezeDividerDrag() {
    if (!freezeDragState) return false;

    const changed = frozenRows !== freezeDragState.startRows || frozenCols !== freezeDragState.startCols;
    freezeDragState = null;
    tableArea?.querySelectorAll(".freeze-divider.dragging").forEach((divider) => divider.classList.remove("dragging"));
    updateToolbarState();
    if (changed) scheduleAutoSave();
    return true;
}

function hasHiddenRowAfter(row) {
    if (row < 0 || row >= rowCount - 1) return false;
    if (!hiddenRows.has(row + 1)) return false;

    for (let nextRow = row + 2; nextRow < rowCount; nextRow++) {
        if (!hiddenRows.has(nextRow)) return !isRowHiddenByFilter(nextRow);
    }

    return false;
}

function hasHiddenRowBefore(row) {
    if (row <= 0 || row >= rowCount) return false;
    if (!hiddenRows.has(row - 1)) return false;

    for (let prevRow = row - 2; prevRow >= 0; prevRow--) {
        if (!hiddenRows.has(prevRow)) return !isRowHiddenByFilter(prevRow);
    }

    return false;
}

function hasHiddenColAfter(col) {
    if (col < 0 || col >= colCount - 1) return false;
    if (!hiddenCols.has(col + 1)) return false;

    for (let nextCol = col + 2; nextCol < colCount; nextCol++) {
        if (!hiddenCols.has(nextCol)) return true;
    }

    return false;
}

function hasHiddenColBefore(col) {
    if (col <= 0 || col >= colCount) return false;
    if (!hiddenCols.has(col - 1)) return false;

    for (let prevCol = col - 2; prevCol >= 0; prevCol--) {
        if (!hiddenCols.has(prevCol)) return true;
    }

    return false;
}

function toggleFilterFromSelection() {
    if (activeFilter) {
        return clearActiveFilter();
    }

    return createFilterFromSelection();
}

function applyFilterValue(column, query) {
    const filter = normalizeFilter(activeFilter);
    if (!filter || column < filter.range.minCol || column > filter.range.maxCol) return false;

    activeFilter = {
        ...filter,
        column,
        query: String(query || "").trim()
    };
    selectedCell = { row: filter.range.minRow, col: column };
    hideFilterPopup();
    renderTable();
    focusSelectedCell();
    updateToolbarState();
    scheduleAutoSave();
    return true;
}

function showFilterPopup(anchor, column) {
    const filter = normalizeFilter(activeFilter);
    if (!filter || !filterPopup || !filterPopupInput) return false;

    filterPopupColumn = column;
    const headerName = getCellEditableText(filter.range.minRow, column) || getCellName(filter.range.minRow, column);
    if (filterPopupTitle) filterPopupTitle.textContent = `${headerName} filtresi`;
    filterPopupInput.value = column === filter.column ? filter.query : "";

    const anchorRect = anchor.getBoundingClientRect();
    filterPopup.hidden = false;
    const popupRect = filterPopup.getBoundingClientRect();
    const left = Math.min(anchorRect.left, window.innerWidth - popupRect.width - 8);
    const top = Math.min(anchorRect.bottom + 6, window.innerHeight - popupRect.height - 8);

    filterPopup.style.left = `${Math.max(8, left)}px`;
    filterPopup.style.top = `${Math.max(8, top)}px`;
    filterPopupInput.focus();
    filterPopupInput.select();
    return true;
}

function clearActiveFilter() {
    if (!activeFilter) return false;

    activeFilter = null;
    renderTable();
    focusSelectedCell();
    updateToolbarState();
    scheduleAutoSave();
    return true;
}

function deleteSelectedRows() {
    const rows = getSelectedRowIndexes();
    deleteRowsAt(rows.length ? rows : [contextMenuTarget?.row ?? selectedCell?.row ?? 0]);
}

function deleteSelectedColumns() {
    const cols = getSelectedColumnIndexes();
    deleteColsAt(cols.length ? cols : [contextMenuTarget?.col ?? selectedCell?.col ?? 0]);
}

function getCellSearchText(row, col) {
    const cell = tableData[row]?.[col];
    if (!cell) return "";

    return `${cell.formula ?? ""}\n${cell.value ?? ""}`;
}

function getCellEditableText(row, col) {
    const cell = tableData[row]?.[col];
    if (!cell) return "";

    return cell.formula ?? cell.value ?? "";
}

function escapeRegExp(text) {
    return String(text).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function setCellText(row, col, text) {
    const cell = tableData[row]?.[col];
    if (!cell) return false;

    setCellInput(cell, text);
    return true;
}

function replaceInCell(row, col, query, replacement, replaceAll = false) {
    const normalizedQuery = query.trim();
    if (!normalizedQuery) return false;

    const originalText = getCellEditableText(row, col);
    const flags = replaceAll ? "gi" : "i";
    const pattern = new RegExp(escapeRegExp(normalizedQuery), flags);
    if (!pattern.test(originalText)) return false;

    const nextText = originalText.replace(pattern, replacement);
    return setCellText(row, col, nextText);
}

function updateFindCount() {
    if (!findCount) return;

    findCount.textContent = findResults.length
        ? `${findResultIndex + 1}/${findResults.length}`
        : "0/0";
}

function runFindQuery(query, preferredStart = selectedCell) {
    findResults = [];
    findResultIndex = -1;
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
        updateFindCount();
        return;
    }

    for (let r = 0; r < rowCount; r++) {
        for (let c = 0; c < colCount; c++) {
            if (getCellSearchText(r, c).toLowerCase().includes(normalizedQuery)) {
                findResults.push({ row: r, col: c });
            }
        }
    }

    if (findResults.length) {
        const startRow = preferredStart?.row ?? 0;
        const startCol = preferredStart?.col ?? 0;
        const nextIndex = findResults.findIndex((result) => (
            result.row > startRow ||
            (result.row === startRow && result.col >= startCol)
        ));
        findResultIndex = nextIndex >= 0 ? nextIndex : 0;
    }

    updateFindCount();
}

function goToFindResult(index) {
    if (!findResults.length) {
        updateFindCount();
        return false;
    }

    findResultIndex = (index + findResults.length) % findResults.length;
    const result = findResults[findResultIndex];
    selectCell(result.row, result.col);
    focusSelectedCell(true);
    updateFindCount();
    findInput?.focus();
    findInput?.select();
    return true;
}

function findNext(step = 1) {
    if (!findInput) return false;

    if (!findResults.length) {
        runFindQuery(findInput.value);
    }

    return goToFindResult(findResultIndex + step);
}

function replaceCurrentFindResult() {
    if (!findInput || !replaceInput) return false;
    const query = findInput.value.trim();
    if (!query) return false;

    if (!findResults.length) {
        runFindQuery(query);
    }

    if (!findResults.length || findResultIndex < 0) {
        updateFindCount();
        return false;
    }

    const result = findResults[findResultIndex];
    pushHistory();
    const changed = replaceInCell(result.row, result.col, query, replaceInput.value, false);
    if (!changed) {
        undoStack.pop();
        return false;
    }

    recalculateAll();
    renderTable();
    refreshChartsForChangedCell(result.row, result.col);
    runFindQuery(query, { row: result.row, col: result.col });

    if (findResults.length) {
        goToFindResult(findResultIndex);
    } else {
        selectedCell = { row: result.row, col: result.col };
        updateFormulaBar();
        updateFindCount();
        focusSelectedCell();
    }

    return true;
}

function replaceAllFindResults() {
    if (!findInput || !replaceInput) return false;
    const query = findInput.value.trim();
    if (!query) return false;

    let changeCount = 0;
    pushHistory();

    for (let r = 0; r < rowCount; r++) {
        for (let c = 0; c < colCount; c++) {
            if (replaceInCell(r, c, query, replaceInput.value, true)) {
                changeCount++;
            }
        }
    }

    if (!changeCount) {
        undoStack.pop();
        updateFindCount();
        return false;
    }

    recalculateAll();
    renderTable();
    refreshChartsFromConfigs();
    runFindQuery(query);
    if (findCount) {
        findCount.textContent = `${changeCount} değişti`;
    }
    focusSelectedCell();
    return true;
}

function openFindPanel() {
    if (!findPanel || !findInput) return;

    if (isEditing) {
        exitEditMode(true);
    }

    findPanel.hidden = false;
    runFindQuery(findInput.value);
    findInput.focus();
    findInput.select();
}

function toggleFindPanel() {
    if (!findPanel || findPanel.hidden) {
        openFindPanel();
    } else {
        closeFindPanel();
    }
}

function closeFindPanel() {
    if (!findPanel) return;

    findPanel.hidden = true;
    findResults = [];
    findResultIndex = -1;
    updateFindCount();
    focusSelectedCell();
}

function moveSelectedCellsTo(targetRow, targetCol) {
    const ranges = getActiveRanges();
    const sourceRange = getActiveRange();
    if (!ranges.length || !sourceRange) return false;

    const rowOffset = targetRow - sourceRange.minRow;
    const colOffset = targetCol - sourceRange.minCol;
    if (rowOffset === 0 && colOffset === 0) return false;

    const sourceCells = [];
    const seen = new Set();
    ranges.forEach((range) => {
        for (let r = range.minRow; r <= range.maxRow; r++) {
            for (let c = range.minCol; c <= range.maxCol; c++) {
                const key = `${r}:${c}`;
                if (seen.has(key)) continue;
                seen.add(key);
                sourceCells.push({
                    row: r,
                    col: c,
                    targetRow: r + rowOffset,
                    targetCol: c + colOffset,
                    cell: cloneCellData(tableData[r][c], { rowOffset, colOffset })
                });
            }
        }
    });

    const requiredRows = Math.max(...sourceCells.map((item) => item.targetRow)) + 1;
    const requiredCols = Math.max(...sourceCells.map((item) => item.targetCol)) + 1;
    if (Math.min(...sourceCells.map((item) => item.targetRow)) < 0) return false;
    if (Math.min(...sourceCells.map((item) => item.targetCol)) < 0) return false;

    pushHistory();
    ensureGridSize(requiredRows, requiredCols);

    sourceCells.forEach(({ row, col }) => {
        tableData[row][col] = createEmptyCell();
    });
    clearMergesIntersectingRange({
        minRow: sourceRange.minRow + rowOffset,
        maxRow: sourceRange.maxRow + rowOffset,
        minCol: sourceRange.minCol + colOffset,
        maxCol: sourceRange.maxCol + colOffset
    });

    sourceCells.forEach(({ targetRow: row, targetCol: col, cell }) => {
        if (cell.mergedTo) {
            cell.mergedTo = {
                row: cell.mergedTo.row + rowOffset,
                col: cell.mergedTo.col + colOffset
            };
        }
        tableData[row][col] = cell;
    });

    selectedCell = { row: sourceRange.minRow + rowOffset, col: sourceRange.minCol + colOffset };
    selectionRange = {
        start: { row: sourceRange.minRow + rowOffset, col: sourceRange.minCol + colOffset },
        end: { row: sourceRange.maxRow + rowOffset, col: sourceRange.maxCol + colOffset }
    };
    selectionMode = "range";
    extraSelections = extraSelections.map((range) => ({
        start: { row: range.start.row + rowOffset, col: range.start.col + colOffset },
        end: { row: range.end.row + rowOffset, col: range.end.col + colOffset }
    }));
    clearClipboardState();
    recalculateAll();
    renderTable();
    refreshChartsForChangedRange(sourceRange);
    refreshChartsForChangedRange(selectionRange ? getNormalizedRange(selectionRange) : sourceRange);
    focusSelectedCell();
    return true;
}

function moveSelectedRowsTo(targetIndex) {
    const selectedRows = getSelectedRowIndexes();
    if (!selectedRows.length || selectedRows.includes(targetIndex)) return false;

    const rowsAscending = [...selectedRows].sort((a, b) => a - b);
    const rowsDescending = [...selectedRows].sort((a, b) => b - a);
    const movedHeights = rowsAscending.map((row) => rowHeights[row]);
    let insertionIndex = Math.max(0, Math.min(targetIndex, rowCount));
    insertionIndex -= rowsAscending.filter((row) => row < insertionIndex).length;
    const movedRows = rowsAscending.map((row, moveIndex) => {
        const rowOffset = insertionIndex + moveIndex - row;
        return tableData[row].map((cell) => cloneCellData(cell, { rowOffset, colOffset: 0 }));
    });

    pushHistory();
    rowsDescending.forEach((row) => {
        tableData.splice(row, 1);
        rowHeights.splice(row, 1);
    });
    tableData.splice(insertionIndex, 0, ...movedRows);
    rowHeights.splice(insertionIndex, 0, ...movedHeights);

    selectedCell = { row: insertionIndex, col: 0 };
    selectionMode = "row";
    extraSelections = [];
    selectionRange = {
        start: { row: insertionIndex, col: 0 },
        end: { row: insertionIndex + movedRows.length - 1, col: colCount - 1 }
    };
    clearClipboardState();
    recalculateAll();
    renderTable();
    refreshChartsFromConfigs();
    focusSelectedCell();
    return true;
}

function moveSelectedColumnsTo(targetIndex) {
    const selectedCols = getSelectedColumnIndexes();
    if (!selectedCols.length || selectedCols.includes(targetIndex)) return false;

    const colsAscending = [...selectedCols].sort((a, b) => a - b);
    const colsDescending = [...selectedCols].sort((a, b) => b - a);
    const movedWidths = colsAscending.map((col) => colWidths[col]);
    let insertionIndex = Math.max(0, Math.min(targetIndex, colCount));
    insertionIndex -= colsAscending.filter((col) => col < insertionIndex).length;
    const movedCellsByRow = tableData.map((row) => colsAscending.map((col, moveIndex) => {
        const colOffset = insertionIndex + moveIndex - col;
        return cloneCellData(row[col], { rowOffset: 0, colOffset });
    }));

    pushHistory();
    colsDescending.forEach((col) => {
        colWidths.splice(col, 1);
        tableData.forEach((row) => row.splice(col, 1));
    });
    colWidths.splice(insertionIndex, 0, ...movedWidths);
    tableData.forEach((row, rowIndex) => {
        row.splice(insertionIndex, 0, ...movedCellsByRow[rowIndex]);
    });

    selectedCell = { row: 0, col: insertionIndex };
    selectionMode = "column";
    extraSelections = [];
    selectionRange = {
        start: { row: 0, col: insertionIndex },
        end: { row: rowCount - 1, col: insertionIndex + movedWidths.length - 1 }
    };
    clearClipboardState();
    recalculateAll();
    renderTable();
    refreshChartsFromConfigs();
    focusSelectedCell();
    return true;
}

function finishMoveSelection() {
    if (!moveSelectionState) return;

    const state = moveSelectionState;
    moveSelectionState = null;
    if (!state.moved) return;

    suppressClickAfterMove = true;
    if (state.type === "cell") {
        moveSelectedCellsTo(state.targetIndex.row, state.targetIndex.col);
    }
    if (state.type === "row") {
        moveSelectedRowsTo(state.targetIndex);
    }
    if (state.type === "column") {
        moveSelectedColumnsTo(state.targetIndex);
    }
}

function cloneRange(range) {
    if (!range) return null;

    return {
        start: { ...range.start },
        end: { ...range.end }
    };
}

function cloneChartRange(range) {
    if (!range) return null;
    if (Array.isArray(range)) return range.map(cloneChartRange).filter(Boolean);

    return cloneRange(range);
}

function cloneFilter(filter) {
    if (!filter) return null;

    return {
        range: { ...filter.range },
        column: filter.column,
        query: filter.query
    };
}

function cloneTableData(data) {
    return data.map((row) => row.map((cell) => cloneCellData(cell)));
}

function createBlankTableData(rows, cols) {
    return Array.from({ length: rows }, () =>
        Array.from({ length: cols }, () => createEmptyCell())
    );
}

function cloneChartConfig(config) {
    if (!config) return null;

    return {
        xRange: cloneChartRange(config.xRange),
        yRange: cloneChartRange(config.yRange),
        type: CHART_TYPES.includes(config.type) ? config.type : "bar",
        showGridlines: config.showGridlines ?? true,
        showTrendline: config.showTrendline ?? true,
        xAxisMin: getOptionalFiniteNumber(config.xAxisMin),
        xAxisMax: getOptionalFiniteNumber(config.xAxisMax),
        yAxisMin: getOptionalFiniteNumber(config.yAxisMin),
        yAxisMax: getOptionalFiniteNumber(config.yAxisMax)
    };
}

function getFiniteNumber(value, fallback) {
    const number = Number(value);
    return Number.isFinite(number) ? number : fallback;
}

function getOptionalFiniteNumber(value) {
    const number = Number(value);
    return Number.isFinite(number) ? number : null;
}

function formatChartAxisBoundText(value) {
    const number = getOptionalFiniteNumber(value);
    return number === null
        ? ""
        : number.toLocaleString("tr-TR", { maximumFractionDigits: 8 });
}

function cloneChartState(chart) {
    const elementLeft = Number.parseFloat(chart.element?.style.left);
    const elementTop = Number.parseFloat(chart.element?.style.top);
    const elementWidth = Number.parseFloat(chart.element?.style.width);
    const elementHeight = Number.parseFloat(chart.element?.style.height);

    return {
        id: Number(chart.id) || 1,
        title: String(chart.title || `Grafik ${Number(chart.id) || 1}`),
        config: cloneChartConfig(chart.config),
        settings: { ...(chart.settings ?? {}) },
        color: chart.color ? { ...chart.color } : null,
        dataColors: Array.isArray(chart.dataColors) ? chart.dataColors.map((color) => ({ ...color })) : [],
        titleReference: chart.titleReference ? { ...chart.titleReference } : null,
        left: Number.isFinite(elementLeft) ? elementLeft : getFiniteNumber(chart.element?.offsetLeft, 96),
        top: Number.isFinite(elementTop) ? elementTop : getFiniteNumber(chart.element?.offsetTop, 64),
        width: Number.isFinite(elementWidth) ? elementWidth : getFiniteNumber(chart.element?.offsetWidth, 420),
        height: Number.isFinite(elementHeight) ? elementHeight : getFiniteNumber(chart.element?.offsetHeight, 280),
        minimized: chart.element?.classList.contains("minimized") ?? false,
        restoreState: chart.restoreState ? { ...chart.restoreState } : null
    };
}

function cloneSavedChartState(chart) {
    if (!chart) return null;

    return {
        id: Number(chart.id) || 1,
        title: String(chart.title || `Grafik ${Number(chart.id) || 1}`),
        config: cloneChartConfig(chart.config),
        settings: { ...(chart.settings ?? {}) },
        color: chart.color ? { ...chart.color } : null,
        dataColors: Array.isArray(chart.dataColors) ? chart.dataColors.map((color) => ({ ...color })) : [],
        titleReference: chart.titleReference ? { ...chart.titleReference } : null,
        left: getFiniteNumber(chart.left, 96),
        top: getFiniteNumber(chart.top, 64),
        width: getFiniteNumber(chart.width, 420),
        height: getFiniteNumber(chart.height, 280),
        minimized: Boolean(chart.minimized),
        restoreState: chart.restoreState ? { ...chart.restoreState } : null
    };
}

let nextSheetId = 1;
const sheetHistories = new Map();

function createSheetId() {
    return `s${Date.now().toString(36)}${(nextSheetId++).toString(36)}`;
}

function createSheetState(name, id = sheets[activeSheetIndex]?.id ?? createSheetId()) {
    return {
        id,
        name,
        rowCount,
        colCount,
        selectedCell: selectedCell ? { ...selectedCell } : { row: 0, col: 0 },
        selectionRange: cloneRange(selectionRange),
        selectionMode,
        activeFilter: cloneFilter(activeFilter),
        tableData: cloneTableData(tableData),
        colWidths: [...colWidths],
        rowHeights: [...rowHeights],
        hiddenRows: [...hiddenRows],
        hiddenCols: [...hiddenCols],
        frozenRows,
        frozenCols,
        charts: charts.map(cloneChartState).filter(Boolean),
        nextChartNumber,
        activeChartId: activeChart?.id ?? null
    };
}

function createBlankSheetState(name) {
    return {
        id: createSheetId(),
        name,
        rowCount: 100,
        colCount: 26,
        selectedCell: { row: 0, col: 0 },
        selectionRange: null,
        selectionMode: "cell",
        activeFilter: null,
        tableData: createBlankTableData(100, 26),
        colWidths: Array.from({ length: 26 }, () => DEFAULT_COL_WIDTH),
        rowHeights: Array.from({ length: 100 }, () => DEFAULT_ROW_HEIGHT),
        hiddenRows: [],
        hiddenCols: [],
        frozenRows: 0,
        frozenCols: 0,
        charts: [],
        nextChartNumber: 1,
        activeChartId: null
    };
}

function cloneSheetState(sheet, name) {
    return {
        id: createSheetId(),
        name,
        rowCount: sheet.rowCount,
        colCount: sheet.colCount,
        selectedCell: sheet.selectedCell ? { ...sheet.selectedCell } : { row: 0, col: 0 },
        selectionRange: cloneRange(sheet.selectionRange),
        selectionMode: sheet.selectionMode,
        activeFilter: cloneFilter(sheet.activeFilter),
        tableData: cloneTableData(sheet.tableData),
        colWidths: [...sheet.colWidths],
        rowHeights: [...sheet.rowHeights],
        hiddenRows: [...(sheet.hiddenRows ?? [])],
        hiddenCols: [...(sheet.hiddenCols ?? [])],
        frozenRows: Math.max(0, Math.min(sheet.rowCount, Number(sheet.frozenRows) || 0)),
        frozenCols: Math.max(0, Math.min(sheet.colCount, Number(sheet.frozenCols) || 0)),
        charts: Array.isArray(sheet.charts) ? sheet.charts.map(cloneSavedChartState).filter(Boolean) : [],
        nextChartNumber: Math.max(1, Number(sheet.nextChartNumber) || 1),
        activeChartId: sheet.activeChartId ?? null
    };
}

function hasCellContent(cell) {
    return Boolean(
        cell?.value ||
        cell?.formula ||
        hasAnyBorder(cell) ||
        hasNonDefaultStyle(cell) ||
        cell?.merge ||
        cell?.mergedTo
    );
}

function isSheetEmpty(sheet) {
    if (!sheet) return true;

    if ((Number(sheet.rowCount) || 0) !== 100 || (Number(sheet.colCount) || 0) !== 26) return false;
    if (sheet.activeFilter) return false;
    if ((sheet.hiddenRows?.length ?? 0) > 0 || (sheet.hiddenCols?.length ?? 0) > 0) return false;
    if ((Number(sheet.frozenRows) || 0) > 0 || (Number(sheet.frozenCols) || 0) > 0) return false;
    if ((sheet.charts?.length ?? 0) > 0) return false;
    if ((sheet.rowHeights ?? []).some((height) => height !== DEFAULT_ROW_HEIGHT)) return false;
    if ((sheet.colWidths ?? []).some((width) => width !== DEFAULT_COL_WIDTH)) return false;

    return !(sheet.tableData ?? []).some((row) =>
        row.some((cell) => hasCellContent(cell))
    );
}

function captureCurrentSheet() {
    if (!sheets[activeSheetIndex]) return;

    const { id, name } = sheets[activeSheetIndex];
    sheets[activeSheetIndex] = createSheetState(name, id);
    // Geri al/yinele geçmişi her sayfada ayrı tutulur; sayfa değiştirince kaybolmaz.
    sheetHistories.set(id, { undoStack, redoStack });
}

function applySheetState(sheet) {
    rowCount = sheet.rowCount;
    colCount = sheet.colCount;
    selectedCell = sheet.selectedCell ? { ...sheet.selectedCell } : { row: 0, col: 0 };
    selectionRange = cloneRange(sheet.selectionRange);
    selectionMode = sheet.selectionMode;
    activeFilter = cloneFilter(sheet.activeFilter);
    tableData = cloneTableData(sheet.tableData);
    colWidths = [...sheet.colWidths];
    rowHeights = [...sheet.rowHeights];
    hiddenRows = new Set(sheet.hiddenRows ?? []);
    hiddenCols = new Set(sheet.hiddenCols ?? []);
    frozenRows = Math.max(0, Math.min(rowCount, Number(sheet.frozenRows) || 0));
    frozenCols = Math.max(0, Math.min(colCount, Number(sheet.frozenCols) || 0));
    extraSelections = [];
    copiedRange = null;
    internalClipboard = null;
    clipboardMode = null;
    isEditing = false;
    const history = sheetHistories.get(sheet.id);
    undoStack = history?.undoStack ?? [];
    redoStack = history?.redoStack ?? [];
    clearChartWorkspace();
    nextChartNumber = Math.max(1, Number(sheet.nextChartNumber) || 1);
    restoreChartWorkspace(sheet.charts, sheet.activeChartId);
}

function updateSheetRenameInputWidth(input) {
    const characterCount = Math.max(4, input.value.length + 1);
    input.style.width = `${characterCount}ch`;
}

function updateSheetDragOverVisual(index) {
    sheetDragOverIndex = index;
    sheetTabs?.querySelectorAll(".sheet-tab").forEach((tab, tabIndex) => {
        tab.classList.toggle("drag-over", tabIndex === index);
    });
}

function renderSheetTabs() {
    if (!sheetTabs) return;

    sheetTabs.innerHTML = "";
    sheets.forEach((sheet, index) => {
        if (index === renamingSheetIndex) {
            const input = document.createElement("input");
            input.type = "text";
            input.className = `sheet-tab sheet-tab-editor${index === activeSheetIndex ? " active" : ""}`;
            input.value = sheet.name;
            input.spellcheck = false;
            updateSheetRenameInputWidth(input);

            let isCancelled = false;
            input.addEventListener("input", () => {
                updateSheetRenameInputWidth(input);
            });
            input.addEventListener("keydown", (e) => {
                if (e.key === "Enter") {
                    e.preventDefault();
                    finishSheetRename(index, input.value, true);
                }

                if (e.key === "Escape") {
                    e.preventDefault();
                    isCancelled = true;
                    finishSheetRename(index, input.value, false);
                }
            });
            input.addEventListener("blur", () => {
                if (!isCancelled) {
                    finishSheetRename(index, input.value, true);
                }
            });

            sheetTabs.appendChild(input);
            setTimeout(() => {
                input.focus();
                input.select();
            }, 0);
            return;
        }

        const button = document.createElement("button");
        button.type = "button";
        button.className = `sheet-tab${index === activeSheetIndex ? " active" : ""}${index === sheetDragOverIndex ? " drag-over" : ""}`;
        button.draggable = true;
        button.textContent = sheet.name;
        button.addEventListener("dragstart", (e) => {
            draggingSheetIndex = index;
            sheetDragOverIndex = index;
            e.dataTransfer.effectAllowed = "move";
            e.dataTransfer.setData("text/plain", String(index));
            button.classList.add("dragging");
        });
        button.addEventListener("dragend", () => {
            draggingSheetIndex = null;
            sheetDragOverIndex = null;
            renderSheetTabs();
        });
        button.addEventListener("dragover", (e) => {
            if (draggingSheetIndex === null || draggingSheetIndex === index) return;

            e.preventDefault();
            e.dataTransfer.dropEffect = "move";
            if (sheetDragOverIndex !== index) {
                updateSheetDragOverVisual(index);
            }
        });
        button.addEventListener("drop", (e) => {
            e.preventDefault();
            const fromIndex = draggingSheetIndex ?? Number(e.dataTransfer.getData("text/plain"));
            draggingSheetIndex = null;
            sheetDragOverIndex = null;
            reorderSheet(fromIndex, index);
        });
        button.addEventListener("click", () => {
            if (index === activeSheetIndex) return;

            captureCurrentSheet();
            activeSheetIndex = index;
            applySheetState(sheets[activeSheetIndex]);
            renderSheetTabs();
            renderTable();
            focusSelectedCell();
        });
        button.addEventListener("contextmenu", (e) => {
            if (index !== activeSheetIndex) {
                captureCurrentSheet();
                activeSheetIndex = index;
                applySheetState(sheets[activeSheetIndex]);
                renderSheetTabs();
                renderTable();
            }
            showContextMenu(e, { type: "sheet", index });
        });
        button.addEventListener("dblclick", () => {
            startSheetRename(index);
        });
        sheetTabs.appendChild(button);
    });

    const addButton = document.createElement("button");
    addButton.type = "button";
    addButton.className = "sheet-add-btn";
    addButton.title = "Sayfa ekle";
    addButton.setAttribute("aria-label", "Sayfa ekle");
    addButton.textContent = "+";
    addButton.addEventListener("click", () => {
        addSheet();
    });
    sheetTabs.appendChild(addButton);

    const statusSummary = document.createElement("div");
    statusSummary.id = "status-summary";
    statusSummary.setAttribute("aria-live", "polite");
    sheetTabs.appendChild(statusSummary);
    updateStatusSummary();
}

function getNextSheetName() {
    const names = new Set(sheets.map((sheet) => sheet.name.toLocaleLowerCase("tr-TR")));
    let number = sheets.length + 1;
    while (names.has(`sayfa${number}`)) number++;
    return `Sayfa${number}`;
}

function addSheet() {
    if (isEditing) exitEditMode(true);
    captureCurrentSheet();
    sheets.push(createBlankSheetState(getNextSheetName()));
    activeSheetIndex = sheets.length - 1;
    applySheetState(sheets[activeSheetIndex]);
    renderSheetTabs();
    renderTable();
    focusSelectedCell();
}

function getUniqueSheetName(baseName) {
    const existingNames = new Set(sheets.map((sheet) => sheet.name));
    let candidate = `${baseName} kopya`;
    let counter = 2;

    while (existingNames.has(candidate)) {
        candidate = `${baseName} kopya ${counter}`;
        counter++;
    }

    return candidate;
}

function duplicateSheet() {
    const sourceIndex = contextMenuTarget?.index ?? activeSheetIndex;
    captureCurrentSheet();
    const sourceSheet = sheets[sourceIndex];
    if (!sourceSheet) return false;

    const copyName = getUniqueSheetName(sourceSheet.name);
    const copy = cloneSheetState(sourceSheet, copyName);
    const insertIndex = sourceIndex + 1;

    sheets.splice(insertIndex, 0, copy);
    activeSheetIndex = insertIndex;
    applySheetState(sheets[activeSheetIndex]);
    renderSheetTabs();
    renderTable();
    focusSelectedCell();
    return true;
}

function renameActiveSheet() {
    startSheetRename(contextMenuTarget?.index ?? activeSheetIndex);
}

function startSheetRename(index) {
    if (!sheets[index]) return;

    if (index !== activeSheetIndex) {
        captureCurrentSheet();
        activeSheetIndex = index;
        applySheetState(sheets[activeSheetIndex]);
        renderTable();
    }

    renamingSheetIndex = index;
    renderSheetTabs();
}

function finishSheetRename(index, name, shouldSave) {
    if (!sheets[index]) return;
    if (renamingSheetIndex !== index) return;

    if (shouldSave) {
        const trimmedName = name.trim().replace(/[\[\]:*?/\\]/g, " ").slice(0, 31).trim();
        const oldName = sheets[index].name;
        const isTaken = sheets.some((sheet, sheetIndex) => sheetIndex !== index && isSameSheetName(sheet.name, trimmedName));
        if (trimmedName && trimmedName !== oldName && !isTaken) {
            captureCurrentSheet();
            sheets[index].name = trimmedName;
            renameSheetReferences(oldName, trimmedName);
            recalculateAll();
            renderTable();
            scheduleAutoSave();
        } else if (isTaken) {
            showAppMessage(`"${trimmedName}" adlı bir sayfa zaten var.`);
        }
    }

    renamingSheetIndex = null;
    renderSheetTabs();
}

function reorderSheet(fromIndex, toIndex) {
    if (fromIndex === toIndex) return false;
    if (!sheets[fromIndex] || !sheets[toIndex]) return false;

    captureCurrentSheet();
    const [movedSheet] = sheets.splice(fromIndex, 1);
    sheets.splice(toIndex, 0, movedSheet);

    if (activeSheetIndex === fromIndex) {
        activeSheetIndex = toIndex;
    } else if (fromIndex < activeSheetIndex && toIndex >= activeSheetIndex) {
        activeSheetIndex--;
    } else if (fromIndex > activeSheetIndex && toIndex <= activeSheetIndex) {
        activeSheetIndex++;
    }

    applySheetState(sheets[activeSheetIndex]);
    renderSheetTabs();
    renderTable();
    focusSelectedCell();
    return true;
}

async function deleteActiveSheet() {
    if (sheets.length <= 1) return false;

    if (isEditing) exitEditMode(true);
    captureCurrentSheet();
    const sheet = sheets[activeSheetIndex];
    if (!isSheetEmpty(sheet)) {
        const sheetName = sheet?.name || "Bu sayfa";
        const shouldDelete = await showAppConfirm(`"${sheetName}" boş değil. Silinen sayfa geri alınamaz. Yine de silinsin mi?`, {
            confirmText: "Sil",
            danger: true
        });
        if (!shouldDelete) return false;
    }

    sheetHistories.delete(sheet.id);
    sheets.splice(activeSheetIndex, 1);
    activeSheetIndex = Math.max(0, activeSheetIndex - 1);
    applySheetState(sheets[activeSheetIndex]);
    recalculateAll();
    renderSheetTabs();
    renderTable();
    focusSelectedCell();
    return true;
}

function getNextSaveNumber() {
    const storedValue = Number(safeStorageGet(SAVE_NAME_COUNTER_KEY));
    return Number.isInteger(storedValue) && storedValue > 0 ? storedValue : 1;
}

function getDefaultSaveBaseName() {
    return `awcell${getNextSaveNumber()}`;
}

function updateNextSaveNumber(fileName) {
    const currentNumber = getNextSaveNumber();
    const match = fileName.match(/^awcell(\d+)(?:\.awc|\.json)?$/i);
    const usedNumber = match ? Number(match[1]) : currentNumber;
    const nextNumber = Math.max(currentNumber + 1, usedNumber + 1);

    safeStorageSet(SAVE_NAME_COUNTER_KEY, String(nextNumber));
}

function sanitizeFileName(name) {
    return name
        .trim()
        .replace(/[<>:"/\\|?*\x00-\x1F]/g, "_")
        .replace(/\.+$/g, "");
}

function ensureSaveExtension(fileName) {
    if (/\.awc$/i.test(fileName)) return fileName;
    if (/\.json$/i.test(fileName)) return fileName.replace(/\.json$/i, ".awc");
    return `${fileName}.awc`;
}

function getFileExtension(fileName) {
    const match = fileName.match(/\.([^.]+)$/);
    return match ? match[1].toLowerCase() : "";
}

function getFileBaseName(fileName) {
    return String(fileName || "").replace(/\.[^.]+$/, "");
}

function setCurrentWorkbookFile(fileName, handle = null) {
    if (getFileExtension(fileName) !== "awc") return;

    currentWorkbookFileName = fileName;
    currentWorkbookFileHandle = handle;
    document.title = `${fileName} - awCELL`;
}

function clearCurrentWorkbookFile() {
    currentWorkbookFileName = null;
    currentWorkbookFileHandle = null;
    document.title = "awCELL";
}

async function createNewWorkbook() {
    const hasContent = sheets.length > 1 || !isSheetEmpty(createSheetState(sheets[activeSheetIndex]?.name ?? "Sayfa1"));
    if (hasContent && !(await showAppConfirm("Açık çalışma kapatılıp boş bir dosya açılsın mı? Kaydedilmemiş değişiklikler kaybolur.", {
        confirmText: "Yeni dosya",
        danger: true
    }))) {
        return false;
    }
    if (isEditing) exitEditMode(false);

    isLoadingWorkbook = true;
    rowCount = 100;
    colCount = 26;
    selectedCell = { row: 0, col: 0 };
    selectionRange = null;
    selectionMode = "cell";
    extraSelections = [];
    internalClipboard = null;
    copiedRange = null;
    clipboardMode = null;
    contextMenuTarget = null;
    findResults = [];
    findResultIndex = -1;
    activeFilter = null;
    hiddenRows = new Set();
    hiddenCols = new Set();
    frozenRows = 0;
    frozenCols = 0;
    activeSheetIndex = 0;
    renamingSheetIndex = null;
    undoStack = [];
    redoStack = [];
    sheetHistories.clear();
    importedFileBaseName = null;
    isEditing = false;
    editBackupValue = "";
    formulaInputBackupValue = "";
    clearCurrentWorkbookFile();
    safeStorageRemove(AUTOSAVE_KEY);

    clearChartWorkspace();
    sheets = [createBlankSheetState("Sayfa1")];
    applySheetState(sheets[activeSheetIndex]);
    renderSheetTabs();
    renderTable();
    focusSelectedCell();
    isLoadingWorkbook = false;
    saveAutoSavedWorkbook();
    return true;
}

let importedFileBaseName = null;

function getCurrentSaveBaseName() {
    if (currentWorkbookFileName) return getFileBaseName(currentWorkbookFileName);
    return importedFileBaseName ? sanitizeFileName(importedFileBaseName) || getDefaultSaveBaseName() : getDefaultSaveBaseName();
}

/** Kayıtta yalnız varsayılandan farklı alanlar yazılır; boş hücre null olur (dosya küçük kalır). */
function compactCellForSave(cell) {
    if (!cell) return null;

    const compact = {};
    if (cell.value !== "" && cell.value !== null && cell.value !== undefined) compact.value = cell.value;
    if (cell.formula) compact.formula = cell.formula;

    const defaults = createDefaultCellStyle();
    const style = {};
    Object.entries(getCellStyle(cell)).forEach(([key, value]) => {
        if (value !== defaults[key]) style[key] = value;
    });
    if (Object.keys(style).length) compact.style = style;

    const borders = Object.fromEntries(Object.entries(getCellBorders(cell)).filter(([, value]) => value));
    if (Object.keys(borders).length) compact.borders = borders;
    if (cell.merge) compact.merge = { ...cell.merge };
    if (cell.mergedTo) compact.mergedTo = { ...cell.mergedTo };
    if (cell.note) compact.note = cell.note;

    return Object.keys(compact).length ? compact : null;
}

function compactTableDataForSave(data) {
    let lastRow = -1;
    const rows = data.map((row, rowIndex) => {
        const cells = row.map(compactCellForSave);
        while (cells.length && cells[cells.length - 1] === null) cells.pop();
        if (cells.length) lastRow = rowIndex;
        return cells;
    });
    return rows.slice(0, lastRow + 1);
}

function createSavePayload() {
    captureCurrentSheet();

    return {
        app: "awCELL",
        version: 1,
        savedAt: new Date().toISOString(),
        activeSheetIndex,
        sheets: sheets.map((sheet) => ({
            ...sheet,
            selectedCell: sheet.selectedCell ? { ...sheet.selectedCell } : { row: 0, col: 0 },
            selectionRange: cloneRange(sheet.selectionRange),
            activeFilter: cloneFilter(sheet.activeFilter),
            tableData: compactTableDataForSave(sheet.tableData),
            colWidths: [...sheet.colWidths],
            rowHeights: [...sheet.rowHeights],
            hiddenRows: [...(sheet.hiddenRows ?? [])],
            hiddenCols: [...(sheet.hiddenCols ?? [])],
            charts: Array.isArray(sheet.charts) ? sheet.charts.map(cloneSavedChartState).filter(Boolean) : [],
            nextChartNumber: Math.max(1, Number(sheet.nextChartNumber) || 1),
            activeChartId: sheet.activeChartId ?? null
        }))
    };
}

function saveAutoSavedWorkbook() {
    if (!isAppInitialized || isLoadingWorkbook) return;

    try {
        localStorage.setItem(AUTOSAVE_KEY, JSON.stringify(createSavePayload()));
    } catch {
        // localStorage doluysa sessiz geç; normal dosyaya kaydetme çalışmaya devam eder.
    }
}

function scheduleAutoSave() {
    if (!isAppInitialized || isLoadingWorkbook) return;

    window.clearTimeout(autoSaveTimer);
    autoSaveTimer = window.setTimeout(saveAutoSavedWorkbook, 600);
}

function loadAutoSavedWorkbook() {
    const storedPayload = safeStorageGet(AUTOSAVE_KEY);
    if (!storedPayload) return false;

    try {
        isLoadingWorkbook = true;
        loadWorkbookPayload(JSON.parse(storedPayload));
        return true;
    } catch {
        safeStorageRemove(AUTOSAVE_KEY);
        return false;
    } finally {
        isLoadingWorkbook = false;
    }
}

function isPageReload() {
    const navigationEntry = performance.getEntriesByType?.("navigation")?.[0];
    if (navigationEntry?.type) {
        return navigationEntry.type === "reload";
    }

    return performance.navigation?.type === performance.navigation?.TYPE_RELOAD;
}

function normalizeImportedCell(cell) {
    const formula = typeof cell?.formula === "string" && cell.formula.startsWith("=") ? cell.formula : null;
    const normalizedCell = {
        value: cell?.value === null || cell?.value === undefined ? "" : String(cell.value),
        formula,
        borders: { ...getCellBorders(cell) },
        style: { ...getCellStyle(cell) },
        merge: cell?.merge ? { ...cell.merge } : null,
        mergedTo: cell?.mergedTo ? { ...cell.mergedTo } : null
    };
    if (typeof cell?.note === "string" && cell.note) normalizedCell.note = cell.note;
    return normalizedCell;
}

/** Bozuk birleştirme bilgisi (sınır dışına taşan ya da sahipsiz hücre) temizlenir. */
function repairImportedMerges(tableDataValue, rowCountValue, colCountValue) {
    for (let r = 0; r < rowCountValue; r++) {
        for (let c = 0; c < colCountValue; c++) {
            const cell = tableDataValue[r][c];
            if (cell.merge) {
                const rowspan = Math.max(1, Math.min(Number(cell.merge.rowspan) || 1, rowCountValue - r));
                const colspan = Math.max(1, Math.min(Number(cell.merge.colspan) || 1, colCountValue - c));
                cell.merge = rowspan > 1 || colspan > 1 ? { rowspan, colspan } : null;
            }
            cell.mergedTo = null;
        }
    }
    for (let r = 0; r < rowCountValue; r++) {
        for (let c = 0; c < colCountValue; c++) {
            const merge = tableDataValue[r][c].merge;
            if (!merge) continue;
            for (let mr = r; mr < r + merge.rowspan; mr++) {
                for (let mc = c; mc < c + merge.colspan; mc++) {
                    if (mr === r && mc === c) continue;
                    const child = tableDataValue[mr][mc];
                    child.merge = null;
                    child.mergedTo = { row: r, col: c };
                }
            }
        }
    }
}

function normalizeImportedRange(range, rowCountValue, colCountValue) {
    if (!range?.start || !range?.end) return null;

    return {
        start: {
            row: Math.max(0, Math.min(rowCountValue - 1, Number(range.start.row) || 0)),
            col: Math.max(0, Math.min(colCountValue - 1, Number(range.start.col) || 0))
        },
        end: {
            row: Math.max(0, Math.min(rowCountValue - 1, Number(range.end.row) || 0)),
            col: Math.max(0, Math.min(colCountValue - 1, Number(range.end.col) || 0))
        }
    };
}

function normalizeImportedChartRange(range, rowCountValue, colCountValue) {
    if (!range) return null;
    if (Array.isArray(range)) {
        const ranges = range
            .map((item) => normalizeImportedChartRange(item, rowCountValue, colCountValue))
            .filter(Boolean);
        return ranges.length ? ranges : null;
    }

    return normalizeImportedRange(range, rowCountValue, colCountValue);
}

function isCellWithinImportedBounds(row, col, rowCountValue, colCountValue) {
    return (
        Number.isInteger(row) &&
        Number.isInteger(col) &&
        row >= 0 &&
        row < rowCountValue &&
        col >= 0 &&
        col < colCountValue
    );
}

function normalizeImportedChartState(chart, rowCountValue, colCountValue, index) {
    if (!chart) return null;

    const type = CHART_TYPES.includes(chart.config?.type) ? chart.config.type : "bar";
    const xRange = normalizeImportedChartRange(chart.config?.xRange, rowCountValue, colCountValue);
    const yRange = normalizeImportedChartRange(chart.config?.yRange, rowCountValue, colCountValue);
    const id = Math.max(1, Number(chart.id) || index + 1);
    const settings = {
        ...(chart.settings ?? {}),
        type: CHART_TYPES.includes(chart.settings?.type) ? chart.settings.type : type,
        showGridlines: chart.settings?.showGridlines ?? chart.config?.showGridlines ?? true,
        showTrendline: chart.settings?.showTrendline ?? chart.config?.showTrendline ?? true,
        xAxisMin: getOptionalFiniteNumber(chart.settings?.xAxisMin ?? chart.config?.xAxisMin),
        xAxisMax: getOptionalFiniteNumber(chart.settings?.xAxisMax ?? chart.config?.xAxisMax),
        yAxisMin: getOptionalFiniteNumber(chart.settings?.yAxisMin ?? chart.config?.yAxisMin),
        yAxisMax: getOptionalFiniteNumber(chart.settings?.yAxisMax ?? chart.config?.yAxisMax)
    };

    return {
        id,
        title: String(chart.title || settings.title || `Grafik ${id}`),
        config: yRange ? {
            xRange,
            yRange,
            type,
            showGridlines: chart.config?.showGridlines ?? settings.showGridlines,
            showTrendline: chart.config?.showTrendline ?? settings.showTrendline,
            xAxisMin: getOptionalFiniteNumber(chart.config?.xAxisMin ?? settings.xAxisMin),
            xAxisMax: getOptionalFiniteNumber(chart.config?.xAxisMax ?? settings.xAxisMax),
            yAxisMin: getOptionalFiniteNumber(chart.config?.yAxisMin ?? settings.yAxisMin),
            yAxisMax: getOptionalFiniteNumber(chart.config?.yAxisMax ?? settings.yAxisMax)
        } : null,
        settings,
        color: chart.color ? { ...chart.color } : null,
        dataColors: Array.isArray(chart.dataColors) ? chart.dataColors.map((color) => ({ ...color })) : [],
        titleReference: chart.titleReference &&
            Number.isInteger(chart.titleReference.row) &&
            Number.isInteger(chart.titleReference.col) &&
            isCellWithinImportedBounds(chart.titleReference.row, chart.titleReference.col, rowCountValue, colCountValue)
            ? { row: chart.titleReference.row, col: chart.titleReference.col }
            : null,
        left: Math.max(0, getFiniteNumber(chart.left, 96)),
        top: Math.max(0, getFiniteNumber(chart.top, 64)),
        width: Math.max(220, getFiniteNumber(chart.width, 420)),
        height: Math.max(32, getFiniteNumber(chart.height, 280)),
        minimized: Boolean(chart.minimized),
        restoreState: chart.restoreState ? { ...chart.restoreState } : null
    };
}

function normalizeImportedFilter(filter, rowCountValue, colCountValue) {
    if (!filter?.range) return null;

    const range = {
        minRow: Math.max(0, Math.min(rowCountValue - 1, Number(filter.range.minRow) || 0)),
        maxRow: Math.max(0, Math.min(rowCountValue - 1, Number(filter.range.maxRow) || 0)),
        minCol: Math.max(0, Math.min(colCountValue - 1, Number(filter.range.minCol) || 0)),
        maxCol: Math.max(0, Math.min(colCountValue - 1, Number(filter.range.maxCol) || 0))
    };

    if (range.maxRow <= range.minRow || range.maxCol < range.minCol) return null;

    return {
        range,
        column: Math.max(range.minCol, Math.min(range.maxCol, Number(filter.column) || range.minCol)),
        query: String(filter.query || "")
    };
}

function normalizeImportedSheet(sheet, index) {
    const safeRowCount = Math.min(AwFileIO.MAX_IMPORT_ROWS, Math.max(MIN_ROW_SIZE, Math.floor(Number(sheet?.rowCount)) || 100));
    const safeColCount = Math.min(AwFileIO.MAX_IMPORT_COLS, Math.max(MIN_COL_SIZE, Math.floor(Number(sheet?.colCount)) || 26));
    const safeTableData = [];

    for (let r = 0; r < safeRowCount; r++) {
        const row = [];
        for (let c = 0; c < safeColCount; c++) {
            row.push(normalizeImportedCell(sheet?.tableData?.[r]?.[c]));
        }
        safeTableData.push(row);
    }
    const normalizedCharts = Array.isArray(sheet?.charts)
        ? sheet.charts
            .map((chart, chartIndex) => normalizeImportedChartState(chart, safeRowCount, safeColCount, chartIndex))
            .filter(Boolean)
        : [];
    const nextImportedChartNumber = Math.max(
        1,
        Number(sheet?.nextChartNumber) || 1,
        ...normalizedCharts.map((chart) => chart.id + 1)
    );

    repairImportedMerges(safeTableData, safeRowCount, safeColCount);

    return {
        id: createSheetId(),
        name: String(sheet?.name || `Sayfa${index + 1}`).slice(0, 31),
        rowCount: safeRowCount,
        colCount: safeColCount,
        selectedCell: {
            row: Math.max(0, Math.min(safeRowCount - 1, Number(sheet?.selectedCell?.row) || 0)),
            col: Math.max(0, Math.min(safeColCount - 1, Number(sheet?.selectedCell?.col) || 0))
        },
        selectionRange: normalizeImportedRange(sheet?.selectionRange, safeRowCount, safeColCount),
        selectionMode: ["cell", "range", "row", "column", "all"].includes(sheet?.selectionMode)
            ? sheet.selectionMode
            : "cell",
        activeFilter: normalizeImportedFilter(sheet?.activeFilter, safeRowCount, safeColCount),
        tableData: safeTableData,
        colWidths: Array.from({ length: safeColCount }, (_, col) =>
            Math.max(MIN_COL_WIDTH, Number(sheet?.colWidths?.[col]) || DEFAULT_COL_WIDTH)
        ),
        rowHeights: Array.from({ length: safeRowCount }, (_, row) =>
            Math.max(MIN_ROW_HEIGHT, Number(sheet?.rowHeights?.[row]) || DEFAULT_ROW_HEIGHT)
        ),
        hiddenRows: Array.isArray(sheet?.hiddenRows)
            ? sheet.hiddenRows
                .map((row) => Number(row))
                .filter((row) => Number.isInteger(row) && row >= 0 && row < safeRowCount)
            : [],
        hiddenCols: Array.isArray(sheet?.hiddenCols)
            ? sheet.hiddenCols
                .map((col) => Number(col))
                .filter((col) => Number.isInteger(col) && col >= 0 && col < safeColCount)
            : [],
        frozenRows: Math.max(0, Math.min(safeRowCount, Number(sheet?.frozenRows) || 0)),
        frozenCols: Math.max(0, Math.min(safeColCount, Number(sheet?.frozenCols) || 0)),
        charts: normalizedCharts,
        nextChartNumber: nextImportedChartNumber,
        activeChartId: sheet?.activeChartId ?? null
    };
}

function loadWorkbookPayload(payload) {
    if (payload?.app !== "awCELL" || !Array.isArray(payload.sheets) || payload.sheets.length === 0) {
        throw new Error("Geçersiz awCELL dosyası.");
    }

    if (isEditing) exitEditMode(false);
    sheets = payload.sheets.map(normalizeImportedSheet);
    activeSheetIndex = Math.max(0, Math.min(sheets.length - 1, Number(payload.activeSheetIndex) || 0));
    sheetHistories.clear();
    undoStack = [];
    redoStack = [];
    renamingSheetIndex = null;
    extraSelections = [];
    importedFileBaseName = null;
    clearClipboardState();
    applySheetState(sheets[activeSheetIndex]);
    normalizeSelectedCell();
    recalculateAll();
    renderSheetTabs();
    renderTable();
    focusSelectedCell();
    scheduleAutoSave();
}

const OPENABLE_EXTENSIONS = ["awc", "json", "xlsx", "xlsm", "ods", "csv", "tsv", "txt"];
const OPEN_FILE_TYPES = [
    {
        description: "Elektronik tablolar (.awc, .xlsx, .ods, .csv)",
        accept: {
            "application/json": [".awc"],
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
            "application/vnd.oasis.opendocument.spreadsheet": [".ods"],
            "text/csv": [".csv", ".tsv", ".txt"]
        }
    }
];

/** Başka bir biçimden gelen sayfaları awCELL yüküne çevirir. */
function createImportedPayload(result) {
    return {
        app: "awCELL",
        version: 1,
        activeSheetIndex: result.activeSheetIndex ?? 0,
        sheets: result.sheets
    };
}

async function openWorkbookFile(file, handle = null) {
    if (!file) return false;

    const extension = getFileExtension(file.name);
    if (extension === "xls") {
        throw new Error("Eski Excel (.xls) dosyaları açılamıyor. Dosyayı Excel ya da LibreOffice'te .xlsx olarak kaydedip yeniden açın.");
    }
    if (!OPENABLE_EXTENSIONS.includes(extension)) {
        throw new Error("Bu dosya türü açılamıyor. awCELL .awc, .xlsx, .ods ve .csv dosyalarını açar.");
    }

    if (extension === "awc" || extension === "json") {
        const payload = JSON.parse(await file.text());
        loadWorkbookPayload(payload);
        setCurrentWorkbookFile(file.name, handle);
        return true;
    }

    const buffer = await file.arrayBuffer();
    let result;
    if (extension === "xlsx" || extension === "xlsm") {
        result = await AwFileIO.importXlsx(buffer);
    } else if (extension === "ods") {
        result = await AwFileIO.importOds(buffer);
    } else {
        result = AwFileIO.importCsv(buffer, getFileBaseName(file.name).slice(0, 31) || "Sayfa1");
    }

    loadWorkbookPayload(createImportedPayload(result));
    clearCurrentWorkbookFile();
    document.title = `${file.name} - awCELL`;
    importedFileBaseName = getFileBaseName(file.name);
    if (result.warnings?.length) {
        showAppMessage(result.warnings.join("\n"), "Dosyanın bir bölümü alınmadı");
    }
    return true;
}

async function openWorkbook() {
    if ("showOpenFilePicker" in window) {
        const [handle] = await window.showOpenFilePicker({
            types: OPEN_FILE_TYPES,
            multiple: false
        });
        const file = await handle.getFile();
        await openWorkbookFile(file, handle);
        return true;
    }

    if (!openFileInput) return false;

    openFileInput.value = "";
    openFileInput.click();
    return true;
}

async function runOpenWorkbook() {
    hideFileMenu();
    if (isEditing) exitEditMode(true);
    try {
        await openWorkbook();
    } catch (error) {
        if (error?.name !== "AbortError") {
            showAppMessage(error?.message || "Dosya açılamadı.", "Dosya açılamadı");
        }
    }
}

const SAVE_FORMATS = [
    { value: "awc", label: "awCELL dosyası (.awc)" },
    { value: "xlsx", label: "Excel çalışma kitabı (.xlsx)" },
    { value: "ods", label: "LibreOffice Calc (.ods)" },
    { value: "pdf", label: "PDF belgesi (.pdf)" },
    { value: "csv", label: "CSV, yalnız bu sayfa (.csv)" },
    { value: "xls", label: "Excel 2003 XML (.xls)" }
];

function createAwcBlob(payload) {
    return new Blob([JSON.stringify(payload)], {
        type: "application/json"
    });
}

async function createBlobForFileName(fileName, payload) {
    const extension = getFileExtension(fileName);
    if (extension === "xls") {
        return new Blob([AwFileIO.buildXmlSpreadsheet(payload)], { type: "application/vnd.ms-excel" });
    }
    if (extension === "xlsx") {
        return new Blob([AwFileIO.buildXlsx(payload)], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    }
    if (extension === "ods") {
        return new Blob([AwFileIO.buildOds(payload)], { type: "application/vnd.oasis.opendocument.spreadsheet" });
    }
    if (extension === "csv") {
        return new Blob([AwFileIO.buildCsv(payload.sheets[payload.activeSheetIndex] ?? payload.sheets[0])], { type: "text/csv;charset=utf-8" });
    }
    if (extension === "pdf") return createPdfBlob();
    return createAwcBlob(payload);
}

function downloadSaveFile(blob, fileName) {
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 30_000);
}

async function writeSaveFile(blob, fileName, types = [AWC_FILE_TYPE]) {
    if ("showSaveFilePicker" in window) {
        const handle = await window.showSaveFilePicker({
            suggestedName: fileName,
            types
        });
        const writable = await handle.createWritable();
        await writable.write(blob);
        await writable.close();
        return {
            fileName: handle.name || fileName,
            handle
        };
    }

    downloadSaveFile(blob, fileName);
    return {
        fileName,
        handle: null
    };
}

async function writeSaveAsFile(defaultName) {
    if ("showSaveFilePicker" in window) {
        const handle = await window.showSaveFilePicker({
            suggestedName: `${defaultName}.awc`,
            types: SAVE_AS_FILE_TYPES
        });
        let fileName = handle.name || `${defaultName}.awc`;
        if (!getFileExtension(fileName)) fileName = `${fileName}.awc`;
        const payload = createSavePayload();
        const blob = await createBlobForFileName(fileName, payload);
        const writable = await handle.createWritable();

        await writable.write(blob);
        await writable.close();
        updateNextSaveNumber(fileName);
        setCurrentWorkbookFile(fileName, getFileExtension(fileName) === "awc" ? handle : null);
        return true;
    }

    const result = await showAppDialog({
        title: "Farklı kaydet",
        message: "Dosya adı ve biçimi:",
        input: { value: defaultName, placeholder: "Dosya adı" },
        select: { options: SAVE_FORMATS, value: "awc" },
        confirmText: "Kaydet",
        cancelText: "Vazgeç"
    });
    if (!result.confirmed) return false;

    const safeName = sanitizeFileName(result.value.replace(/\.(awc|xls|xlsx|ods|pdf|csv)$/i, ""));
    if (!safeName) return false;

    const fileName = `${safeName}.${result.selected}`;
    const payload = createSavePayload();
    const blob = await createBlobForFileName(fileName, payload);
    downloadSaveFile(blob, fileName);
    updateNextSaveNumber(fileName);
    setCurrentWorkbookFile(fileName);
    return true;
}

async function saveWorkbook() {
    try {
        if (currentWorkbookFileHandle) {
            const blob = createAwcBlob(createSavePayload());
            const writable = await currentWorkbookFileHandle.createWritable();
            await writable.write(blob);
            await writable.close();
            updateNextSaveNumber(currentWorkbookFileName);
            showToast("Kaydedildi");
            return true;
        }

        const defaultName = getCurrentSaveBaseName();
        let fileName = ensureSaveExtension(defaultName);
        if (!("showSaveFilePicker" in window)) {
            const result = await showAppDialog({
                title: "Kaydet",
                message: "Dosya adı:",
                input: { value: defaultName },
                confirmText: "Kaydet",
                cancelText: "Vazgeç"
            });
            if (!result.confirmed) return false;
            const safeName = sanitizeFileName(result.value);
            if (!safeName) return false;
            fileName = ensureSaveExtension(safeName);
        }

        const blob = createAwcBlob(createSavePayload());
        const saved = await writeSaveFile(blob, fileName);
        setCurrentWorkbookFile(saved.fileName, saved.handle);
        updateNextSaveNumber(saved.fileName);
        return true;
    } catch (error) {
        if (error?.name !== "AbortError") {
            showAppMessage("Dosya kaydedilemedi.", "Kaydetme hatası");
        }
        return false;
    }
}

async function saveWorkbookAs() {
    const defaultName = getCurrentSaveBaseName();

    try {
        return await writeSaveAsFile(defaultName);
    } catch (error) {
        if (error?.name !== "AbortError") {
            showAppMessage("Dosya kaydedilemedi.", "Kaydetme hatası");
        }
        return false;
    }
}

let toastTimer = null;

function showToast(message) {
    const toast = document.getElementById("app-toast");
    if (!toast) return;
    toast.textContent = message;
    toast.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
        toast.hidden = true;
    }, 1800);
}

function createHistorySnapshot() {
    return {
        rowCount,
        colCount,
        selectedCell: selectedCell ? { ...selectedCell } : null,
        selectionRange: cloneRange(selectionRange),
        selectionMode,
        activeFilter: cloneFilter(activeFilter),
        tableData: cloneTableData(tableData),
        colWidths: [...colWidths],
        rowHeights: [...rowHeights],
        hiddenRows: [...hiddenRows],
        hiddenCols: [...hiddenCols],
        frozenRows,
        frozenCols
    };
}

function restoreHistorySnapshot(snapshot) {
    isRestoringHistory = true;

    rowCount = snapshot.rowCount;
    colCount = snapshot.colCount;
    selectedCell = snapshot.selectedCell ? { ...snapshot.selectedCell } : { row: 0, col: 0 };
    selectionRange = cloneRange(snapshot.selectionRange);
    selectionMode = snapshot.selectionMode;
    activeFilter = cloneFilter(snapshot.activeFilter);
    tableData = cloneTableData(snapshot.tableData);
    colWidths = [...snapshot.colWidths];
    rowHeights = [...snapshot.rowHeights];
    hiddenRows = new Set(snapshot.hiddenRows ?? []);
    hiddenCols = new Set(snapshot.hiddenCols ?? []);
    frozenRows = Math.max(0, Math.min(rowCount, Number(snapshot.frozenRows) || 0));
    frozenCols = Math.max(0, Math.min(colCount, Number(snapshot.frozenCols) || 0));
    extraSelections = [];
    copiedRange = null;
    internalClipboard = null;
    clipboardMode = null;
    isEditing = false;
    editBackupValue = "";

    renderTable();
    focusSelectedCell();
    isRestoringHistory = false;
}

function pushHistory() {
    if (isRestoringHistory) return;

    undoStack.push(createHistorySnapshot());
    if (undoStack.length > MAX_HISTORY_SIZE) {
        undoStack.shift();
    }
    redoStack = [];
    updateToolbarState();
}

function undo() {
    if (undoStack.length === 0) return;

    redoStack.push(createHistorySnapshot());
    const snapshot = undoStack.pop();
    restoreHistorySnapshot(snapshot);
    updateToolbarState();
}

function redo() {
    if (redoStack.length === 0) return;

    undoStack.push(createHistorySnapshot());
    const snapshot = redoStack.pop();
    restoreHistorySnapshot(snapshot);
    updateToolbarState();
}

function setColumnWidth(element, col) {
    const width = Math.max(24, Math.round((colWidths[col] ?? DEFAULT_COL_WIDTH) * getZoomScale()));
    element.style.width = `${width}px`;
    element.style.minWidth = `${width}px`;
    element.style.maxWidth = `${width}px`;
}

function setRowHeight(element, row) {
    const height = Math.max(18, Math.round((rowHeights[row] ?? DEFAULT_ROW_HEIGHT) * getZoomScale()));
    element.style.height = `${height}px`;
}

function applyColumnWidth(col) {
    document
        .querySelectorAll(`[data-col="${col}"]`)
        .forEach((element) => setColumnWidth(element, col));
}

function applyRowHeight(row) {
    document
        .querySelectorAll(`[data-row="${row}"]`)
        .forEach((element) => setRowHeight(element, row));
}

function startColumnResize(e, col) {
    e.preventDefault();
    e.stopPropagation();
    if (e.detail > 1) return;
    pushHistory();

    resizeState = {
        type: "column",
        index: col,
        startPosition: e.clientX,
        startSize: colWidths[col] ?? DEFAULT_COL_WIDTH
    };
}

function startRowResize(e, row) {
    e.preventDefault();
    e.stopPropagation();
    if (e.detail > 1) return;
    pushHistory();

    resizeState = {
        type: "row",
        index: row,
        startPosition: e.clientY,
        startSize: rowHeights[row] ?? DEFAULT_ROW_HEIGHT
    };
}

function getDisplayText(row, col) {
    const cell = tableData[row]?.[col];
    if (!cell) return "";

    return cell.formula ?? cell.value ?? "";
}

function getCellFontSize(row, col) {
    const style = getCellStyle(tableData[row]?.[col]);
    return Math.max(MIN_FONT_SIZE, Math.min(MAX_FONT_SIZE, Number(style.fontSize) || DEFAULT_FONT_SIZE));
}

function getTextLineMetrics(row, col) {
    const text = getDisplayText(row, col);
    const lines = text ? text.split(/\r\n|\r|\n/) : [""];
    const fontSize = getCellFontSize(row, col);
    const longestLineLength = Math.max(...lines.map((line) => line.length), 1);

    return {
        lineCount: lines.length,
        fontSize,
        estimatedWidth: longestLineLength * fontSize * 0.62 + 24,
        estimatedHeight: lines.length * (fontSize + 7) + 6
    };
}

function fitColumnToContent(col, shouldApply = true, minWidth = MIN_COL_WIDTH) {
    const headerWidth = getColumnLabel(col).length * DEFAULT_FONT_SIZE * 0.72 + 24;
    let width = headerWidth;

    for (let row = 0; row < rowCount; row++) {
        width = Math.max(width, getTextLineMetrics(row, col).estimatedWidth);
    }

    colWidths[col] = Math.max(minWidth, Math.min(360, Math.ceil(width)));
    if (shouldApply) applyColumnWidth(col);
}

function fitRowToContent(row, shouldApply = true, minHeight = MIN_ROW_HEIGHT) {
    let height = DEFAULT_ROW_HEIGHT;

    for (let col = 0; col < colCount; col++) {
        height = Math.max(height, getTextLineMetrics(row, col).estimatedHeight);
    }

    rowHeights[row] = Math.max(minHeight, Math.min(160, Math.ceil(height)));
    if (shouldApply) applyRowHeight(row);
}

function fitRangeToContent(range) {
    if (!range) return;

    for (let col = range.minCol; col <= range.maxCol; col++) {
        fitColumnToContent(col, false, DEFAULT_COL_WIDTH);
    }

    for (let row = range.minRow; row <= range.maxRow; row++) {
        fitRowToContent(row, false, DEFAULT_ROW_HEIGHT);
    }
}

function autoFitColumn(col) {
    pushHistory();
    fitColumnToContent(col);
}

function autoFitRow(row) {
    pushHistory();
    fitRowToContent(row);
}
// MODEL INITIALIZE
function initData() {
    tableData = [];
    colWidths = Array.from({ length: colCount }, () => DEFAULT_COL_WIDTH);
    rowHeights = Array.from({ length: rowCount }, () => DEFAULT_ROW_HEIGHT);
    frozenRows = 0;
    frozenCols = 0;

    for (let r = 0; r < rowCount; r++) {
        const row = [];
        for (let c = 0; c < colCount; c++) {
            row.push(createEmptyCell());
        }
        tableData.push(row);
    }
}
// RENDER TABLE FROM MODEL
function escapeHtml(value) {
    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}

const SELECTION_CLASSES = [
    "selected", "selection-handle-cell", "range-selected",
    "selection-range", "selection-top", "selection-bottom", "selection-left", "selection-right",
    "copied-range", "copied-top", "copied-bottom", "copied-left", "copied-right",
    "move-target-cell", "move-target-range", "move-target-top", "move-target-bottom", "move-target-left", "move-target-right",
    "selection-move-cursor"
];

/** Seçim aralıkları bir kez hesaplanır; hücre başına bütün tabloyu taramak gerekmez. */
function createSelectionContext() {
    return {
        primary: selectionRange ? getNormalizedRange(selectionRange) : null,
        extras: extraSelections.map(getNormalizedRange).filter(Boolean),
        copied: copiedRange ? getNormalizedRange(copiedRange) : null,
        moveTarget: getCellMoveTargetRange()
    };
}

function pushRangeBoundaryClasses(classes, row, col, range, prefix) {
    const visualRange = getVisualCellRange(row, col);
    classes.push(`${prefix}-range`);
    if (visualRange.minRow <= range.minRow) classes.push(`${prefix}-top`);
    if (visualRange.maxRow >= range.maxRow) classes.push(`${prefix}-bottom`);
    if (visualRange.minCol <= range.minCol) classes.push(`${prefix}-left`);
    if (visualRange.maxCol >= range.maxCol) classes.push(`${prefix}-right`);
}

function getCellSelectionClasses(row, col, context) {
    const classes = [];

    if (selectedCell && selectedCell.row === row && selectedCell.col === col) {
        classes.push("selected");
        if (!context.primary && context.extras.length === 0) classes.push("selection-handle-cell");
    }

    if (context.primary && isCellInNormalizedRange(row, col, context.primary)) {
        classes.push("range-selected");
        pushRangeBoundaryClasses(classes, row, col, context.primary, "selection");
        const visualRange = getVisualCellRange(row, col);
        if (visualRange.maxRow === context.primary.maxRow && visualRange.maxCol === context.primary.maxCol) {
            classes.push("selection-handle-cell");
        }
    }

    context.extras.forEach((range) => {
        if (isCellInNormalizedRange(row, col, range)) {
            classes.push("range-selected");
            pushRangeBoundaryClasses(classes, row, col, range, "selection");
        }
    });

    if (context.copied && isCellInNormalizedRange(row, col, context.copied)) {
        const range = context.copied;
        classes.push("copied-range");
        if (row === range.minRow) classes.push("copied-top");
        if (row === range.maxRow) classes.push("copied-bottom");
        if (col === range.minCol) classes.push("copied-left");
        if (col === range.maxCol) classes.push("copied-right");
    }

    if (context.moveTarget && isCellInNormalizedRange(row, col, context.moveTarget)) {
        classes.push("move-target-cell");
        pushRangeBoundaryClasses(classes, row, col, context.moveTarget, "move-target");
    }

    return classes;
}

function getColumnHeaderClasses(col) {
    const classes = [];
    if (isColumnHeaderActive(col)) classes.push("active-header");
    if (moveSelectionState?.type === "column" && moveSelectionState.targetIndex === col) classes.push("move-target-header");
    return classes;
}

function getRowHeaderClasses(row) {
    const classes = [];
    if (isRowHeaderActive(row)) classes.push("active-header");
    if (moveSelectionState?.type === "row" && moveSelectionState.targetIndex === row) classes.push("move-target-header");
    return classes;
}

/** Yalnız seçim değiştiğinde tabloyu yeniden kurmadan sınıfları günceller. */
function renderSelection() {
    if (!table.rows.length) {
        renderTable();
        return;
    }

    const context = createSelectionContext();
    // Yalnız önceden işaretli hücrelere ve yeni seçim aralıklarına dokunulur.
    const targets = new Set(decoratedCellElements);
    const addRange = (range) => {
        if (!range) return;
        for (let r = Math.max(0, range.minRow); r <= Math.min(rowCount - 1, range.maxRow); r++) {
            for (let c = Math.max(0, range.minCol); c <= Math.min(colCount - 1, range.maxCol); c++) {
                const element = cellElements.get(`${r}:${c}`);
                if (element) targets.add(element);
            }
        }
    };
    if (selectedCell) addRange(getVisualCellRange(selectedCell.row, selectedCell.col));
    addRange(context.primary);
    context.extras.forEach(addRange);
    addRange(context.copied);
    addRange(context.moveTarget);

    const nextDecorated = new Set();
    targets.forEach((td) => {
        if (td.classList.contains("editing")) {
            nextDecorated.add(td);
            return;
        }
        td.classList.remove(...SELECTION_CLASSES);
        const classes = getCellSelectionClasses(Number(td.dataset.row), Number(td.dataset.col), context);
        if (classes.length) {
            td.classList.add(...classes);
            nextDecorated.add(td);
        }
    });
    decoratedCellElements = nextDecorated;
    table.querySelectorAll("th.column-header").forEach((th) => {
        th.classList.remove("active-header", "move-target-header");
        const classes = getColumnHeaderClasses(Number(th.dataset.col));
        if (classes.length) th.classList.add(...classes);
    });
    table.querySelectorAll("th.row-header").forEach((th) => {
        th.classList.remove("active-header", "move-target-header");
        const classes = getRowHeaderClasses(Number(th.dataset.row));
        if (classes.length) th.classList.add(...classes);
    });
    table.querySelector(".corner-header")?.classList.toggle("active-header", selectionMode === "all");

    updateFormulaBar();
    updateToolbarState();
    updateStatusSummary();
}

function getCellSizeStyle(row, col, merge, zoomScale) {
    if (merge) {
        let width = 0;
        for (let c = col; c < col + merge.colspan; c++) {
            if (!hiddenCols.has(c)) width += colWidths[c] ?? DEFAULT_COL_WIDTH;
        }
        let height = 0;
        for (let r = row; r < row + merge.rowspan; r++) {
            if (isRowVisible(r)) height += rowHeights[r] ?? DEFAULT_ROW_HEIGHT;
        }
        const zoomedWidth = Math.max(24, Math.round(width * zoomScale));
        const zoomedHeight = Math.max(18, Math.round(height * zoomScale));
        return `width:${zoomedWidth}px;min-width:${zoomedWidth}px;max-width:${zoomedWidth}px;height:${zoomedHeight}px;`;
    }

    const width = Math.max(24, Math.round((colWidths[col] ?? DEFAULT_COL_WIDTH) * zoomScale));
    const height = Math.max(18, Math.round((rowHeights[row] ?? DEFAULT_ROW_HEIGHT) * zoomScale));
    return `width:${width}px;min-width:${width}px;max-width:${width}px;height:${height}px;`;
}

function renderTable() {
    clampFrozenPanes();

    const zoomScale = getZoomScale();
    const headerHeight = DEFAULT_ROW_HEIGHT;
    const rowHeaderWidth = 46;
    const frozenRowTops = new Map();
    const frozenColLefts = new Map();
    let frozenTop = headerHeight;
    let frozenLeft = rowHeaderWidth;

    for (let r = 0; r < frozenRows; r++) {
        if (!isRowVisible(r)) continue;
        frozenRowTops.set(r, frozenTop);
        frozenTop += Math.round((rowHeights[r] ?? DEFAULT_ROW_HEIGHT) * zoomScale);
    }

    for (let c = 0; c < frozenCols; c++) {
        if (hiddenCols.has(c)) continue;
        frozenColLefts.set(c, frozenLeft);
        frozenLeft += Math.round((colWidths[c] ?? DEFAULT_COL_WIDTH) * zoomScale);
    }
    renderFreezeDividers(frozenTop, frozenLeft);

    const selectionContext = createSelectionContext();
    const filter = normalizeFilter(activeFilter);
    const highlightChart = activeChart?.config ? activeChart : null;
    const html = [];

    // Başlık satırı
    html.push(`<tr><th class="corner-header${selectionMode === "all" ? " active-header" : ""}" title="Tümünü seç"></th>`);
    for (let c = 0; c < colCount; c++) {
        if (hiddenCols.has(c)) continue;

        const classes = ["column-header", ...getColumnHeaderClasses(c)];
        if (hasHiddenColAfter(c)) classes.push("hidden-col-after");
        if (hasHiddenColBefore(c)) classes.push("hidden-col-before");
        const width = Math.max(24, Math.round((colWidths[c] ?? DEFAULT_COL_WIDTH) * zoomScale));
        let style = `width:${width}px;min-width:${width}px;max-width:${width}px;`;
        if (frozenColLefts.has(c)) {
            classes.push("frozen-pane-header");
            style += `left:${frozenColLefts.get(c)}px;z-index:6;`;
        }
        html.push(`<th class="${classes.join(" ")}" data-col="${c}" style="${style}">${getColumnLabel(c)}<span class="col-resize-handle"></span></th>`);
    }
    html.push("</tr>");

    // Satırlar
    for (let r = 0; r < rowCount; r++) {
        if (hiddenRows.has(r) || (filter && isRowHiddenByFilter(r))) continue;

        const rowHeaderClasses = ["row-header", ...getRowHeaderClasses(r)];
        if (hasHiddenRowAfter(r)) rowHeaderClasses.push("hidden-row-after");
        if (hasHiddenRowBefore(r)) rowHeaderClasses.push("hidden-row-before");
        const rowHeight = Math.max(18, Math.round((rowHeights[r] ?? DEFAULT_ROW_HEIGHT) * zoomScale));
        let rowHeaderStyle = `height:${rowHeight}px;`;
        if (frozenRowTops.has(r)) {
            rowHeaderClasses.push("frozen-pane-header");
            rowHeaderStyle += `top:${frozenRowTops.get(r)}px;z-index:7;`;
        }
        html.push(`<tr><th class="${rowHeaderClasses.join(" ")}" data-row="${r}" style="${rowHeaderStyle}">${r + 1}<span class="row-resize-handle"></span></th>`);

        const rowData = tableData[r];
        for (let c = 0; c < colCount; c++) {
            if (hiddenCols.has(c)) continue;
            const cell = rowData[c];
            if (cell.mergedTo) continue;

            const cellStyle = getCellStyle(cell);
            const classes = getCellSelectionClasses(r, c, selectionContext);
            const merge = cell.merge;
            let attributes = `data-row="${r}" data-col="${c}" tabindex="-1"`;
            if (merge) {
                attributes += ` colspan="${merge.colspan}" rowspan="${merge.rowspan}"`;
                classes.push("merged-cell");
            }

            let style = getCellSizeStyle(r, c, merge, zoomScale);
            const decorations = [];
            if (cellStyle.underline) decorations.push("underline");
            if (cellStyle.strikeThrough) decorations.push("line-through");
            const fontSize = Math.max(6, Math.round(Math.max(MIN_FONT_SIZE, Math.min(MAX_FONT_SIZE, Number(cellStyle.fontSize) || DEFAULT_FONT_SIZE)) * zoomScale));
            if (cellStyle.bold) style += "font-weight:700;";
            if (cellStyle.italic) style += "font-style:italic;";
            if (decorations.length) style += `text-decoration:${decorations.join(" ")};`;
            if (fontSize !== DEFAULT_FONT_SIZE) style += `font-size:${fontSize}px;`;
            const color = normalizeColorValue(cellStyle.color, "#202124");
            if (color !== "#202124") style += `color:${color};`;
            if (cellStyle.horizontalAlign !== "left") style += `text-align:${cellStyle.horizontalAlign};`;
            if (cellStyle.verticalAlign !== "middle") style += `vertical-align:${cellStyle.verticalAlign};`;

            let background = cellStyle.backgroundColor ? normalizeColorValue(cellStyle.backgroundColor, "") : "";
            if (highlightChart && isCellInRange(r, c, highlightChart.config.xRange)) {
                background = highlightChart.color?.labelHighlight ?? "#e6f4ea";
            }
            if (highlightChart && isCellInRange(r, c, highlightChart.config.yRange)) {
                background = highlightChart.color?.dataHighlight ?? "#ceead6";
            }
            if (background) style += `background-color:${background};`;

            const hasFrozenRow = frozenRowTops.has(r);
            const hasFrozenCol = frozenColLefts.has(c);
            if (hasFrozenRow || hasFrozenCol) {
                classes.push("frozen-pane-cell");
                style += "position:sticky;";
                if (hasFrozenRow) style += `top:${frozenRowTops.get(r)}px;`;
                if (hasFrozenCol) style += `left:${frozenColLefts.get(c)}px;`;
                style += `z-index:${hasFrozenRow && hasFrozenCol ? 7 : hasFrozenRow ? 5 : 3};`;
            }

            const borders = getCellBorders(cell);
            if (borders.top) classes.push("cell-border-top");
            if (borders.right) classes.push("cell-border-right");
            if (borders.bottom) classes.push("cell-border-bottom");
            if (borders.left) classes.push("cell-border-left");

            const displayText = formatCellDisplayValue(cell);
            if (cell.formula && AwFormula.isErrorText(cell.value)) classes.push("cell-error");
            if (cell.note) {
                classes.push("has-note");
                attributes += ` title="${escapeHtml(cell.note)}"`;
            }

            let filterButton = "";
            if (filter && r === filter.range.minRow && c >= filter.range.minCol && c <= filter.range.maxCol) {
                classes.push("filter-header-cell");
                if (c === filter.column && filter.query) classes.push("filter-active-cell");
                filterButton = `<button type="button" class="cell-filter-btn" data-filter-col="${c}" title="Filtre seçenekleri"><img src="icons/filter.svg" alt="" /></button>`;
            }

            html.push(`<td ${attributes}${classes.length ? ` class="${classes.join(" ")}"` : ""} style="${style}">${escapeHtml(displayText)}${filterButton}</td>`);
        }
        html.push("</tr>");
    }

    table.innerHTML = html.join("");
    indexCellElements();

    updateFormulaBar();
    updateToolbarState();
    updateStatusSummary();
    scheduleAutoSave();
}

/* Tablo olayları: hücre başına dinleyici yerine tabloda tek bir dinleyici (olay yetkilendirme). */
let lastHoverKey = null;

function getEventCellPosition(td) {
    return { row: Number(td.dataset.row), col: Number(td.dataset.col) };
}

function selectSingleCell(row, col) {
    selectedCell = { row, col };
    selectionRange = null;
    selectionMode = "cell";
    extraSelections = [];
}

function handleTableMouseDown(e) {
    hideColorPaletteMenus();

    const resizeHandle = e.target.closest(".col-resize-handle, .row-resize-handle");
    if (resizeHandle) {
        if (e.button !== 0) return;
        const th = resizeHandle.closest("th");
        if (resizeHandle.classList.contains("col-resize-handle")) startColumnResize(e, Number(th.dataset.col));
        else startRowResize(e, Number(th.dataset.row));
        return;
    }

    if (e.target.closest(".cell-filter-btn")) {
        e.preventDefault();
        e.stopPropagation();
        return;
    }

    const th = e.target.closest("th");
    if (th) {
        if (e.button !== 0 || resizeState || e.shiftKey || e.ctrlKey || e.metaKey) return;
        if (th.classList.contains("corner-header")) return;
        if (isEditing) exitEditMode(true);

        if (th.classList.contains("column-header")) {
            const col = Number(th.dataset.col);
            if (selectionMode === "column" && isColumnInColumnSelection(col)) startMoveSelection("column", col);
            else startHeaderSelection("column", col);
        } else if (th.classList.contains("row-header")) {
            const row = Number(th.dataset.row);
            if (selectionMode === "row" && isRowInRowSelection(row)) startMoveSelection("row", row);
            else startHeaderSelection("row", row);
        }
        e.preventDefault();
        return;
    }

    const td = e.target.closest("td[data-row]");
    if (!td || e.button !== 0 || resizeState) return;
    const { row: r, col: c } = getEventCellPosition(td);

    if (isEditing) {
        if (td.classList.contains("editing")) return;
        if (canInsertFormulaReference()) {
            e.preventDefault();
            suppressClickAfterPoint = true;
            startFormulaPointReference(r, c);
        }
        return;
    }

    if (e.detail > 1) {
        clearClipboardState();
        selectSingleCell(r, c);
        renderSelection();
        enterEditMode(r, c);
        e.preventDefault();
        return;
    }

    if (e.shiftKey || e.ctrlKey || e.metaKey) return;

    if (isCellInCurrentSelection(r, c) && isNearSelectionEdge(e, td, r, c) && startCellMove(r, c)) {
        e.preventDefault();
        return;
    }

    isMouseSelecting = true;
    mouseSelectionMoved = false;
    selectSingleCell(r, c);
    renderSelection();
    focusSelectedCell();
    e.preventDefault();
}

function handleTableMouseOver(e) {
    const target = e.target.closest("td[data-row], th.column-header, th.row-header");
    if (!target) return;
    const key = target.tagName === "TD"
        ? `${target.dataset.row}:${target.dataset.col}`
        : `${target.classList.contains("column-header") ? "c" : "r"}${target.dataset.col ?? target.dataset.row}`;
    if (key === lastHoverKey) return;
    lastHoverKey = key;

    if (target.classList.contains("column-header")) {
        const col = Number(target.dataset.col);
        updateMoveSelection("column", col);
        updateHeaderSelection("column", col);
        return;
    }
    if (target.classList.contains("row-header")) {
        const row = Number(target.dataset.row);
        updateMoveSelection("row", row);
        updateHeaderSelection("row", row);
        return;
    }

    const { row: r, col: c } = getEventCellPosition(target);
    if (formulaPointState?.dragging) {
        updateFormulaPointReference(r, c);
        return;
    }
    updateCellMoveTarget(r, c);
    if (!isMouseSelecting || !selectedCell) return;
    if (selectedCell.row === r && selectedCell.col === c && !selectionRange) return;

    mouseSelectionMoved = true;
    selectionMode = "range";
    extraSelections = [];
    selectionRange = {
        start: { ...selectedCell },
        end: { row: r, col: c }
    };
    renderSelection();
    focusSelectedCell();
}

function handleTableMouseMove(e) {
    const td = e.target.closest("td[data-row]");
    if (!td || isEditing || resizeState || moveSelectionState || isMouseSelecting) return;
    const { row: r, col: c } = getEventCellPosition(td);
    td.classList.toggle("selection-move-cursor", isCellInCurrentSelection(r, c) && isNearSelectionEdge(e, td, r, c));
}

function handleTableMouseOut(e) {
    const td = e.target.closest("td[data-row]");
    if (td && !td.contains(e.relatedTarget)) td.classList.remove("selection-move-cursor");
    if (!table.contains(e.relatedTarget)) lastHoverKey = null;
}

function handleTableClick(e) {
    if (e.target.closest(".col-resize-handle, .row-resize-handle")) {
        e.stopPropagation();
        return;
    }

    const filterButton = e.target.closest(".cell-filter-btn");
    if (filterButton) {
        e.preventDefault();
        e.stopPropagation();
        showFilterPopup(filterButton, Number(filterButton.dataset.filterCol));
        return;
    }

    if (suppressClickAfterPoint) {
        suppressClickAfterPoint = false;
        return;
    }

    const th = e.target.closest("th");
    if (th) {
        if (suppressClickAfterMove) {
            suppressClickAfterMove = false;
            e.preventDefault();
            return;
        }
        if (headerSelectionState?.moved) {
            e.preventDefault();
            return;
        }
        if (isEditing) exitEditMode(true);
        if (th.classList.contains("corner-header")) selectAllCells();
        else if (th.classList.contains("column-header")) selectColumn(Number(th.dataset.col), e);
        else if (th.classList.contains("row-header")) selectRow(Number(th.dataset.row), e);
        return;
    }

    const td = e.target.closest("td[data-row]");
    if (!td || td.classList.contains("editing")) return;
    const { row: r, col: c } = getEventCellPosition(td);

    if (suppressClickAfterMove) {
        suppressClickAfterMove = false;
        e.preventDefault();
        return;
    }
    if (mouseSelectionMoved) {
        mouseSelectionMoved = false;
        e.preventDefault();
        return;
    }

    if (isEditing) exitEditMode(true);

    if ((e.ctrlKey || e.metaKey) && selectedCell) {
        addExtraCellSelection(r, c);
        selectionMode = "range";
    } else if (e.shiftKey && selectedCell) {
        selectionMode = "range";
        extraSelections = [];
        selectionRange = {
            start: { ...selectedCell },
            end: { row: r, col: c }
        };
    } else {
        selectSingleCell(r, c);
    }

    renderSelection();
    focusSelectedCell();
}

function handleTableDoubleClick(e) {
    const resizeHandle = e.target.closest(".col-resize-handle, .row-resize-handle");
    if (resizeHandle) {
        e.preventDefault();
        e.stopPropagation();
        const th = resizeHandle.closest("th");
        if (resizeHandle.classList.contains("col-resize-handle")) autoFitColumn(Number(th.dataset.col));
        else autoFitRow(Number(th.dataset.row));
        return;
    }

    const td = e.target.closest("td[data-row]");
    if (!td || isEditing) return;
    const { row: r, col: c } = getEventCellPosition(td);
    clearClipboardState();
    selectSingleCell(r, c);
    renderSelection();
    enterEditMode(r, c);
}

function handleTableContextMenu(e) {
    e.preventDefault();
    const th = e.target.closest("th");
    if (th) {
        if (isEditing) exitEditMode(true);
        if (th.classList.contains("corner-header")) {
            selectAllCells();
            showContextMenu(e, { type: "all" });
        } else if (th.classList.contains("column-header")) {
            const col = Number(th.dataset.col);
            if (!(selectionMode === "column" && isColumnInColumnSelection(col))) selectColumn(col);
            showContextMenu(e, { type: "column", col });
        } else if (th.classList.contains("row-header")) {
            const row = Number(th.dataset.row);
            if (!(selectionMode === "row" && isRowInRowSelection(row))) selectRow(row);
            showContextMenu(e, { type: "row", row });
        }
        return;
    }

    const td = e.target.closest("td[data-row]");
    if (!td) {
        hideContextMenu();
        return;
    }
    if (td.classList.contains("editing")) return;
    if (isEditing) exitEditMode(true);

    const { row: r, col: c } = getEventCellPosition(td);
    if (!isCellInCurrentSelection(r, c)) {
        selectSingleCell(r, c);
        renderSelection();
    }
    showContextMenu(e, { type: "cell", row: r, col: c });
}

table.addEventListener("mousedown", handleTableMouseDown);
table.addEventListener("mouseover", handleTableMouseOver);
table.addEventListener("mousemove", handleTableMouseMove);
table.addEventListener("mouseout", handleTableMouseOut);
table.addEventListener("click", handleTableClick);
table.addEventListener("dblclick", handleTableDoubleClick);
table.addEventListener("contextmenu", handleTableContextMenu);

// === ARAÇ ÇUBUĞU GRUPLARI ===
// Çubukta grup başına tek düğme ve ▾; tıklayınca açılır, aynı anda tek pencere açık kalır. Sığmayan
// öğeler sondan başlayarak ☰ menüsüne geçer; orada gruplar yerinde (akordeon gibi) açılır. Düğmeler
// aynı öğeler olarak taşınır: kimlikleri, olay dinleyicileri ve durumları tek kopyadır.
// Kurallar: docs/yol-haritasi.md, "Ortak araç çubuğu stili".

function getToolbarGroupParts(group) {
    return {
        button: group.querySelector(".tb-group-btn"),
        panel: group.querySelector(".tb-panel"),
        main: group.querySelector(".tb-split-main")
    };
}

function isInToolbarMenu(element) {
    return Boolean(toolbarMenu?.contains(element));
}

function positionToolbarPanel(group) {
    const { panel } = getToolbarGroupParts(group);
    if (!panel) return;
    if (isInToolbarMenu(group)) {
        panel.style.left = "";
        panel.style.top = "";
        panel.style.maxHeight = "";
        return;
    }
    const groupRect = group.getBoundingClientRect();
    const top = groupRect.bottom + 4;
    panel.style.maxHeight = `${Math.max(120, window.innerHeight - top - TOOLBAR_SCREEN_MARGIN)}px`;
    const panelWidth = panel.getBoundingClientRect().width;
    const left = Math.min(groupRect.left, window.innerWidth - panelWidth - TOOLBAR_SCREEN_MARGIN);
    panel.style.left = `${Math.max(TOOLBAR_SCREEN_MARGIN, left)}px`;
    panel.style.top = `${top}px`;
}

function setToolbarGroupOpen(group, open) {
    const { button, panel } = getToolbarGroupParts(group);
    if (!button || !panel) return;
    panel.hidden = !open;
    button.setAttribute("aria-expanded", String(open));
    group.classList.toggle("open", open);
    if (open) positionToolbarPanel(group);
}

function closeToolbarGroups(except = null) {
    toolbarGroups.forEach((group) => {
        if (group !== except && !getToolbarGroupParts(group).panel?.hidden) setToolbarGroupOpen(group, false);
    });
}

function positionToolbarMenu() {
    if (!toolbarMenu || !toolbarMenuBtn || toolbarMenu.hidden) return;
    const buttonRect = toolbarMenuBtn.getBoundingClientRect();
    const top = buttonRect.bottom + 4;
    toolbarMenu.style.top = `${top}px`;
    toolbarMenu.style.right = `${Math.max(TOOLBAR_SCREEN_MARGIN, window.innerWidth - buttonRect.right)}px`;
    toolbarMenu.style.maxHeight = `${Math.max(160, window.innerHeight - top - TOOLBAR_SCREEN_MARGIN)}px`;
}

function setToolbarMenuOpen(open) {
    if (!toolbarMenu || !toolbarMenuBtn) return;
    if (!open) toolbarGroups.filter(isInToolbarMenu).forEach((group) => setToolbarGroupOpen(group, false));
    toolbarMenu.hidden = !open;
    toolbarMenuBtn.setAttribute("aria-expanded", String(open));
    const label = open ? "Menüyü kapat" : "Menüyü aç";
    toolbarMenuBtn.title = label;
    toolbarMenuBtn.setAttribute("aria-label", label);
    const icon = toolbarMenuBtn.querySelector("svg");
    if (icon) icon.innerHTML = open ? TOOLBAR_CLOSE_ICON : TOOLBAR_MENU_ICON;
    toolbarMenuBtn.classList.toggle("active", open);
    if (open) positionToolbarMenu();
}

function hasOpenToolbarPopup() {
    return (toolbarMenu && !toolbarMenu.hidden) ||
        toolbarGroups.some((group) => !getToolbarGroupParts(group).panel?.hidden);
}

function closeToolbarPopups() {
    closeToolbarGroups();
    setToolbarMenuOpen(false);
}

/** Satırı tek satırda tutar: sığmayan öğeler sondan başlayarak ☰ menüsüne geçer. */
function fitToolbar() {
    if (!toolbarRow || !toolbarOverflow || !toolbarMenu || !toolbarMenuBtn) return;
    const placementBefore = toolbarItems.map(isInToolbarMenu).join();
    toolbarMenuBtn.hidden = true;
    toolbarItems.forEach((item) => toolbarOverflow.before(item));
    const overflows = () => toolbarRow.scrollWidth > toolbarRow.clientWidth + 1;
    if (overflows()) {
        toolbarMenuBtn.hidden = false;
        for (let index = toolbarItems.length - 1; index >= 0 && overflows(); index--) {
            toolbarMenu.prepend(toolbarItems[index]);
        }
    }
    if (toolbarItems.map(isInToolbarMenu).join() !== placementBefore) {
        closeToolbarPopups();
        return;
    }
    if (!toolbarMenuBtn.hidden) positionToolbarMenu();
    else setToolbarMenuOpen(false);
    toolbarGroups.forEach((group) => {
        if (!getToolbarGroupParts(group).panel?.hidden) positionToolbarPanel(group);
    });
}

function setToolbarSplitTarget(group, target) {
    const { main } = getToolbarGroupParts(group);
    if (!main || !target) return;
    toolbarSplitTargets.set(group, target);
    const icon = target.querySelector("img")?.getAttribute("src");
    const mainIcon = main.querySelector("img");
    if (icon && mainIcon) mainIcon.setAttribute("src", icon);
    main.title = target.title;
    main.setAttribute("aria-label", target.title);
    main.disabled = target.disabled;
    // Varsayılan seçenek (sola, dikey orta) her boş hücrede etkin olduğu için ana düğmeyi basılı göstermez.
    main.classList.toggle("active", target.classList.contains("active") && !target.hasAttribute("data-tb-default"));
}

function setupToolbarPalette(section, applyColor, input) {
    const grid = section?.querySelector(".tb-palette");
    if (!section || !grid) return;
    COLOR_PALETTE.forEach((color) => {
        const swatch = document.createElement("button");
        swatch.type = "button";
        swatch.className = "tb-swatch";
        swatch.dataset.color = color;
        swatch.title = color;
        swatch.setAttribute("aria-label", color);
        swatch.style.backgroundColor = color;
        grid.appendChild(swatch);
    });
    section.addEventListener("click", (e) => {
        const button = e.target.closest("button");
        if (!button || button.disabled) return;
        if (button.dataset.color) {
            applyColor(button.dataset.color);
        } else if (button.hasAttribute("data-color-reset")) {
            applyColor("");
        } else if (button.hasAttribute("data-color-custom") && input) {
            try {
                if (typeof input.showPicker === "function") input.showPicker();
                else input.click();
            } catch {
                input.click();
            }
        }
    });
}

function markToolbarPalette(section, color) {
    if (!section) return;
    const active = /^#[0-9a-f]{6}$/i.test(color ?? "") ? color.toLowerCase() : "";
    section.querySelectorAll(".tb-swatch").forEach((swatch) => {
        swatch.classList.toggle("selected", swatch.dataset.color.toLowerCase() === active);
    });
    section.querySelector("[data-color-reset]")?.classList.toggle("selected", !active);
}

/** updateToolbarState'in grup kısmı: durum işaretleri, bölünmüş düğmeler, ipuçları, boş grupların kapanması. */
function updateToolbarGroupState(style, canUseSelection, isRowSelection, isColumnSelection) {
    const textGroup = document.querySelector('[data-tb-group="text"]');
    if (textGroup) {
        textGroup.querySelectorAll(".tb-color-section button").forEach((button) => {
            button.disabled = !canUseSelection;
        });
        // Varsayılan yazı rengi "Otomatik" sayılır; boş hücre de bu rengi taşır.
        const defaults = createDefaultCellStyle();
        const isDefaultColor = (value) => !value || String(value).toLowerCase() === String(defaults.color).toLowerCase();
        const textColor = isDefaultColor(style.color) ? "" : style.color;
        markToolbarPalette(textGroup.querySelector('[data-tb-palette="text"]'), textColor);
        markToolbarPalette(textGroup.querySelector('[data-tb-palette="fill"]'), style.backgroundColor);
        const hasTextStyle = Boolean(style.bold || style.italic || style.underline || style.strikeThrough ||
            textColor || style.backgroundColor || (style.fontSize && style.fontSize !== defaults.fontSize));
        getToolbarGroupParts(textGroup).button?.classList.toggle("has-state", hasTextStyle);
    }
    document.querySelectorAll("[data-tb-border]").forEach((button) => {
        button.disabled = !canUseSelection;
    });
    numberFormatMenu?.querySelectorAll("[data-number-format]").forEach((button) => {
        button.disabled = !canUseSelection;
    });
    updateNumberFormatMenuState();
    const filterLabel = filterBtn?.querySelector(".tb-label");
    if (filterLabel) filterLabel.textContent = activeFilter ? "Filtreyi kaldır" : "Filtre oluştur";
    document.querySelectorAll('[data-tb-hint="rows"]').forEach((hint) => { hint.hidden = isRowSelection; });
    document.querySelectorAll('[data-tb-hint="cols"]').forEach((hint) => { hint.hidden = isColumnSelection; });

    toolbarGroups.forEach((group) => {
        const { button, panel } = getToolbarGroupParts(group);
        if (!button || !panel) return;
        if (group.classList.contains("tb-split")) {
            setToolbarSplitTarget(group, toolbarSplitTargets.get(group) ?? panel.querySelector("button"));
        }
        if (group.hasAttribute("data-tb-keep-enabled")) return;
        const actions = Array.from(panel.querySelectorAll("button"));
        const disabled = actions.length > 0 && actions.every((action) => action.disabled);
        button.disabled = disabled;
        if (disabled && !panel.hidden) setToolbarGroupOpen(group, false);
    });
}

function setupToolbarGroups() {
    if (!toolbarRow || toolbarRow.dataset.groupsReady === "true") return;
    toolbarRow.dataset.groupsReady = "true";

    setupToolbarPalette(document.querySelector('[data-tb-palette="text"]'), setTextColor, textColorInput);
    setupToolbarPalette(document.querySelector('[data-tb-palette="fill"]'), setFillColor, fillColorInput);

    toolbarGroups.forEach((group) => {
        const { button, panel, main } = getToolbarGroupParts(group);
        if (!button || !panel) return;

        button.addEventListener("click", () => {
            const opening = panel.hidden;
            closeToolbarGroups(group);
            if (!isInToolbarMenu(group)) setToolbarMenuOpen(false);
            hideZoomMenu();
            hideColorPaletteMenus();
            setToolbarGroupOpen(group, opening);
        });

        // Yakalama evresinde: düğmenin kendi işi (bazıları olayı durdurur) bundan sonra çalışır.
        panel.addEventListener("click", (e) => {
            const action = e.target.closest("button");
            if (!action || action.disabled) return;
            if (main && action.matches(".icon-btn")) setToolbarSplitTarget(group, action);
            if (!group.hasAttribute("data-tb-stay-open")) closeToolbarPopups();
        }, true);

        if (main) {
            setToolbarSplitTarget(group, panel.querySelector("button"));
            main.addEventListener("click", () => {
                const target = toolbarSplitTargets.get(group);
                if (target && !target.disabled) target.click();
            });
        }
    });

    document.getElementById("border-group-panel")?.addEventListener("click", (e) => {
        const button = e.target.closest("[data-tb-border]");
        if (button && !button.disabled) applyBorderToSelection(button.dataset.tbBorder);
    });

    // ☰ menüsündeki tek düğmeler (Grafik, Birleştir…) işini yapınca menüyü kapatır. Grup başlıkları
    // ve grupların içi kendi kuralına uyar; Yakınlaştırma kendi listesini açtığı için menüyü kapatmaz.
    toolbarMenu?.addEventListener("click", (e) => {
        const action = e.target.closest("button");
        if (!action || action.disabled || action.closest(".tb-group") || action === zoomValueBtn) return;
        setToolbarMenuOpen(false);
    }, true);

    toolbarMenuBtn?.addEventListener("click", () => {
        const opening = Boolean(toolbarMenu?.hidden);
        closeToolbarGroups();
        hideZoomMenu();
        setToolbarMenuOpen(opening);
    });
    setToolbarMenuOpen(false);

    // Dışarıya dokununca kapanır. Yakalama evresinde, çünkü tablo kendi olaylarını durdurabilir.
    document.addEventListener("pointerdown", (e) => {
        const target = e.target;
        if (!(target instanceof Node)) return;
        if (toolbarMenu && !toolbarMenu.hidden && !toolbarMenu.contains(target) && !toolbarMenuBtn?.contains(target)) {
            setToolbarMenuOpen(false);
        }
        toolbarGroups.forEach((group) => {
            if (!getToolbarGroupParts(group).panel?.hidden && !group.contains(target)) setToolbarGroupOpen(group, false);
        });
    }, true);

    document.addEventListener("keydown", (e) => {
        if (e.key !== "Escape" || !hasOpenToolbarPopup()) return;
        e.preventDefault();
        e.stopPropagation();
        const openGroup = toolbarGroups.find((group) => !getToolbarGroupParts(group).panel?.hidden);
        const focusTarget = openGroup && !isInToolbarMenu(openGroup) ? getToolbarGroupParts(openGroup).button : toolbarMenuBtn;
        closeToolbarPopups();
        if (focusTarget && !focusTarget.hidden) focusTarget.focus();
    }, true);

    fitToolbar();
    if (window.ResizeObserver) new ResizeObserver(() => fitToolbar()).observe(toolbarRow);
    else window.addEventListener("resize", fitToolbar);
    document.fonts?.ready?.then(fitToolbar).catch(() => {});
}

setupToolbarGroups();
// === EVENTS ===
undoBtn.addEventListener("click", undo);
redoBtn.addEventListener("click", redo);

zoomValueBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    hideContextMenu();
    hideFilterPopup();
    hideFileMenu();
    hideEditMenu();
    hideViewMenu();
    hideInsertMenu();
    hideDataMenu();
    hideFormatMenu();

    if (zoomMenu?.hidden) {
        showZoomMenu();
    } else {
        hideZoomMenu();
    }
});

fileMenuBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    hideContextMenu();
    hideFilterPopup();
    hideEditMenu();
    hideViewMenu();
    hideInsertMenu();
    hideDataMenu();
    hideFormatMenu();
    if (fileMenu) {
        fileMenu.hidden = !fileMenu.hidden;
        updateTextMenuActiveState();
    }
});

fileMenuBtn?.addEventListener("mouseenter", () => {
    if (hasOpenTextMenu()) openTextMenu("file");
});

openFileBtn?.addEventListener("click", runOpenWorkbook);

printFileBtn?.addEventListener("click", () => {
    hideFileMenu();
    printActiveSheet();
});

newFileBtn?.addEventListener("click", () => {
    hideFileMenu();
    createNewWorkbook();
});

openFileInput?.addEventListener("change", async () => {
    const file = openFileInput.files?.[0];
    if (!file) return;

    try {
        await openWorkbookFile(file);
    } catch (error) {
        showAppMessage(error?.message || "Dosya açılamadı.", "Dosya açılamadı");
    }
});

saveFileBtn?.addEventListener("click", async () => {
    hideFileMenu();
    await saveWorkbook();
});

saveAsFileBtn?.addEventListener("click", async () => {
    hideFileMenu();
    await saveWorkbookAs();
});

editMenuBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    hideContextMenu();
    hideFilterPopup();
    hideFileMenu();
    hideViewMenu();
    hideInsertMenu();
    hideDataMenu();
    hideFormatMenu();
    updateEditMenuState();
    if (editMenu) {
        editMenu.hidden = !editMenu.hidden;
        updateTextMenuActiveState();
    }
});

editMenuBtn?.addEventListener("mouseenter", () => {
    if (hasOpenTextMenu()) openTextMenu("edit");
});

menuUndoBtn?.addEventListener("click", () => {
    hideEditMenu();
    undo();
});

menuRedoBtn?.addEventListener("click", () => {
    hideEditMenu();
    redo();
});

menuCutBtn?.addEventListener("click", () => {
    hideEditMenu();
    copyFromMenu("cut");
});

menuCopyBtn?.addEventListener("click", () => {
    hideEditMenu();
    copyFromMenu("copy");
});

menuPasteBtn?.addEventListener("click", () => {
    hideEditMenu();
    pasteFromMenu();
});

menuFindBtn?.addEventListener("click", () => {
    hideEditMenu();
    openFindPanel();
});

editMenu?.addEventListener("click", (e) => {
    const button = e.target.closest("[data-delete-action]");
    if (!button || button.disabled) return;

    e.stopPropagation();
    hideEditMenu();

    if (button.dataset.deleteAction === "row") deleteSelectedRows();
    if (button.dataset.deleteAction === "column") deleteSelectedColumns();
    if (button.dataset.deleteAction === "sheet") deleteActiveSheet();
    if (button.dataset.deleteAction === "clear") clearSelection();
});

viewMenuBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    hideContextMenu();
    hideFilterPopup();
    hideFileMenu();
    hideEditMenu();
    hideDataMenu();
    hideInsertMenu();
    hideFormatMenu();
    updateViewMenuState();
    if (viewMenu) {
        viewMenu.hidden = !viewMenu.hidden;
        updateTextMenuActiveState();
    }
});

viewMenuBtn?.addEventListener("mouseenter", () => {
    if (hasOpenTextMenu()) openTextMenu("view");
});

menuViewToolbarBtn?.addEventListener("click", () => {
    toggleViewSetting("toolbar");
    hideViewMenu();
});

menuViewFormulaBtn?.addEventListener("click", () => {
    toggleViewSetting("formulaBar");
    hideViewMenu();
});

menuViewGridlinesBtn?.addEventListener("click", () => {
    toggleViewSetting("gridlines");
    hideViewMenu();
});

formatMenuBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    hideContextMenu();
    hideFilterPopup();
    hideFileMenu();
    hideEditMenu();
    hideViewMenu();
    hideInsertMenu();
    hideDataMenu();
    updateFormatMenuState();
    if (formatMenu) {
        formatMenu.hidden = !formatMenu.hidden;
        updateTextMenuActiveState();
    }
});

formatMenuBtn?.addEventListener("mouseenter", () => {
    if (hasOpenTextMenu()) openTextMenu("format");
});

// Fare başka bir menü başlığına gelince menü açılır; hemen ardından gelen tıklama onu kapatmasın.
document.querySelector(".text-menu")?.addEventListener("click", (e) => {
    if (e.target.closest(".menu-shell > button") && performance.now() - textMenuOpenedAt < 500) {
        e.stopPropagation();
    }
}, true);

helpMenuBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    const wasOpen = Boolean(helpMenu && !helpMenu.hidden);
    openTextMenu(wasOpen ? null : "help");
});

helpMenuBtn?.addEventListener("mouseenter", () => {
    if (hasOpenTextMenu()) openTextMenu("help");
});

helpMenu?.addEventListener("click", (e) => {
    const button = e.target.closest("[data-help-action]");
    if (!button) return;
    e.stopPropagation();
    hideHelpMenu();
    if (button.dataset.helpAction === "functions") showFunctionHelp();
    if (button.dataset.helpAction === "shortcuts") showShortcutHelp();
});

const FUNCTION_HELP = [
    ["TOPLA / SUM", "=TOPLA(A1:A10)", "Sayıları toplar."],
    ["ORTALAMA / AVERAGE", "=ORTALAMA(B2:B30)", "Ortalamayı bulur."],
    ["MİN, MAK / MIN, MAX", "=MAK(B2:B30)", "En küçük / en büyük değer."],
    ["BAĞ_DEĞ_SAY / COUNT", "=BAĞ_DEĞ_SAY(B2:B30)", "Sayı içeren hücreleri sayar."],
    ["BAĞ_DEĞ_DOLU_SAY / COUNTA", "=BAĞ_DEĞ_DOLU_SAY(A2:A30)", "Boş olmayan hücreleri sayar."],
    ["EĞER / IF", "=EĞER(B2>=50;\"Geçti\";\"Kaldı\")", "Koşula göre değer verir."],
    ["EĞERSAY / COUNTIF", "=EĞERSAY(B2:B30;\">=50\")", "Koşulu sağlayanları sayar."],
    ["ETOPLA / SUMIF", "=ETOPLA(A2:A30;\"Ali\";B2:B30)", "Koşulu sağlayanları toplar."],
    ["EĞERORTALAMA / AVERAGEIF", "=EĞERORTALAMA(B2:B30;\">0\")", "Koşulu sağlayanların ortalaması."],
    ["ÇOKEĞERSAY, ÇOKETOPLA", "=ÇOKEĞERSAY(B2:B30;\">=50\";C2:C30;\"9-A\")", "Birden çok koşul."],
    ["YUVARLA / ROUND", "=YUVARLA(B2;2)", "Basamağa yuvarlar (YUKARIYUVARLA, AŞAĞIYUVARLA)."],
    ["VE, YADA, DEĞİL / AND, OR, NOT", "=VE(B2>=50;C2>=50)", "Mantıksal işlemler."],
    ["EĞERHATA / IFERROR", "=EĞERHATA(A1/B1;0)", "Hata yerine başka değer gösterir."],
    ["DÜŞEYARA / VLOOKUP", "=DÜŞEYARA(\"Ayşe\";A2:C30;3;YANLIŞ)", "Tabloda arar (YATAYARA, KAÇINCI, İNDİS)."],
    ["RANK, BÜYÜK, KÜÇÜK", "=RANK(B2;B$2:B$30)", "Sıralama ve k. büyük/küçük değer."],
    ["ORTANCA, STDSAPMA", "=ORTANCA(B2:B30)", "Ortanca ve standart sapma."],
    ["MUTLAK, KAREKÖK, KUVVET, MOD, TAMSAYI, Pİ", "=KAREKÖK(16)", "Matematik işlevleri."],
    ["BİRLEŞTİR, SOLDAN, SAĞDAN, PARÇAAL", "=BİRLEŞTİR(A2;\" \";B2)", "Metin işlevleri (UZUNLUK, BÜYÜKHARF, KÜÇÜKHARF, KIRP)."],
    ["BUGÜN, ŞİMDİ", "=BUGÜN()", "Bugünün tarihi."],
    ["Başka sayfa", "='Sayfa 2'!B4", "Başka sayfadaki hücre."]
];

function showFunctionHelp() {
    const lines = FUNCTION_HELP.map(([name, example, description]) => `${name}\n   ${example}  —  ${description}`);
    showAppDialog({
        title: "Formüller",
        message: "Formül = ile başlar. Türkçe Excel'deki gibi ; ile ayırıp ondalıkta virgül kullanın: =YUVARLA(2,345;2). "
            + "İngilizce yazım da geçer: =ROUND(2.345,2). Formül yazarken bir hücreye tıklamak başvurusunu ekler.\n\n"
            + lines.join("\n")
    });
}

function showShortcutHelp() {
    showAppDialog({
        title: "Klavye kısayolları",
        message: [
            "Ctrl+S  Kaydet   ·   Ctrl+Shift+S  Farklı kaydet",
            "Ctrl+O  Aç   ·   Ctrl+P  Yazdır",
            "Ctrl+Z  Geri al   ·   Ctrl+Y  Yinele",
            "Ctrl+C / Ctrl+X / Ctrl+V  Kopyala / Kes / Yapıştır (Excel ile de)",
            "Ctrl+B / Ctrl+I / Ctrl+U  Kalın / İtalik / Altı çizili",
            "Ctrl+F  Ara ve değiştir   ·   Ctrl+A  Tümünü seç",
            "F2  Hücreyi düzenle   ·   Delete  İçeriği sil",
            "Enter / Tab  Aşağı / sağa geç (Shift ile geri)",
            "Alt+Enter  Hücrede yeni satır",
            "Ctrl+ok tuşları  Verinin kenarına atla",
            "Shift+ok tuşları  Seçimi genişlet",
            "Ctrl+Home / Ctrl+End  İlk / son dolu hücre"
        ].join("\n")
    });
}

insertMenuBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    const wasOpen = Boolean(insertMenu && !insertMenu.hidden);
    hideContextMenu();
    hideFilterPopup();
    hideFileMenu();
    hideEditMenu();
    hideViewMenu();
    hideInsertMenu();
    hideDataMenu();
    hideFormatMenu();
    updateInsertMenuState();
    if (insertMenu) {
        insertMenu.hidden = wasOpen;
        updateTextMenuActiveState();
    }
});

insertMenuBtn?.addEventListener("mouseenter", () => {
    if (hasOpenTextMenu()) openTextMenu("insert");
});

insertMenu?.addEventListener("click", (e) => {
    const button = e.target.closest("[data-insert-action]");
    if (!button || button.disabled) return;

    e.stopPropagation();
    hideInsertMenu();

    if (button.dataset.insertAction === "row-above") insertRowsAboveSelection();
    if (button.dataset.insertAction === "row-below") insertRowsBelowSelection();
    if (button.dataset.insertAction === "col-left") insertColsLeftOfSelection();
    if (button.dataset.insertAction === "col-right") insertColsRightOfSelection();
    if (button.dataset.insertAction === "chart") insertChartFromSelection();
    if (button.dataset.insertAction === "sheet") addSheet();
});

dataMenuBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    const wasOpen = Boolean(dataMenu && !dataMenu.hidden);
    hideContextMenu();
    hideFileMenu();
    hideEditMenu();
    hideViewMenu();
    hideInsertMenu();
    hideDataMenu();
    hideFormatMenu();
    updateDataMenuState();
    if (dataMenu) {
        dataMenu.hidden = wasOpen;
        updateTextMenuActiveState();
    }
});

dataMenuBtn?.addEventListener("mouseenter", () => {
    if (hasOpenTextMenu()) openTextMenu("data");
});

function handleZoomChoice(button, shouldHideViewMenu = false) {
    if (!button) return false;

    const value = Number(button.dataset.zoomValue);
    if (!ZOOM_LEVELS.includes(value)) return false;

    setZoom(value);
    hideZoomMenu();
    if (shouldHideViewMenu) hideViewMenu();
    return true;
}

viewMenu?.addEventListener("click", (e) => {
    const zoomButton = e.target.closest("[data-zoom-value]");
    if (zoomButton) {
        e.stopPropagation();
        handleZoomChoice(zoomButton, true);
    }
});

zoomMenu?.addEventListener("click", (e) => {
    const zoomButton = e.target.closest("[data-zoom-value]");
    if (zoomButton) {
        e.stopPropagation();
        handleZoomChoice(zoomButton);
    }
});

menuSortAscBtn?.addEventListener("click", () => {
    hideDataMenu();
    sortActiveRange("asc");
});

menuSortDescBtn?.addEventListener("click", () => {
    hideDataMenu();
    sortActiveRange("desc");
});

menuFilterBtn?.addEventListener("click", () => {
    hideDataMenu();
    toggleFilterFromSelection();
});

sortAscBtn?.addEventListener("click", () => {
    hideContextMenu();
    sortActiveRange("asc");
});

sortDescBtn?.addEventListener("click", () => {
    hideContextMenu();
    sortActiveRange("desc");
});

filterBtn?.addEventListener("click", () => {
    hideContextMenu();
    hideFilterPopup();
    toggleFilterFromSelection();
});

hideAxisBtn?.addEventListener("click", () => {
    hideContextMenu();
    hideFilterPopup();
    hideSelectedRowsOrColumns();
});

showAxisBtn?.addEventListener("click", () => {
    hideContextMenu();
    hideFilterPopup();
    showHiddenRowsAndColumns();
});

tableArea?.addEventListener("scroll", updateFreezeDividerPositions);

window.addEventListener("mouseup", () => {
    finishFreezeDividerDrag();
});

freezeAxisBtn?.addEventListener("click", () => {
    if (freezeAxisBtn.disabled) return;
    hideContextMenu();
    hideFilterPopup();
    toggleFreezeSelectedAxis();
});

menuFreezeAxisBtn?.addEventListener("click", () => {
    if (menuFreezeAxisBtn.disabled) return;
    hideViewMenu();
    hideContextMenu();
    hideFilterPopup();
    toggleFreezeSelectedAxis();
});

insertChartBtn?.addEventListener("click", () => {
    hideContextMenu();
    hideFilterPopup();
    insertChartFromSelection();
});

chartSettingsCloseBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    closeChartSettingsPanel();
});

chartSettingsTitleInput?.addEventListener("input", updateChartTitleFromPanel);
chartSettingsTypeBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    if (!chartSettingsTypeMenu) return;

    const willOpen = chartSettingsTypeMenu.hidden;
    chartSettingsTypeMenu.hidden = !willOpen;
    chartSettingsTypeBtn.setAttribute("aria-expanded", String(willOpen));
});
chartSettingsTypeMenu?.addEventListener("click", (e) => {
    e.stopPropagation();
    const button = e.target.closest("[data-chart-type]");
    if (!button) return;

    setChartSettingsType(button.dataset.chartType);
    hideChartTypeMenu();
    applyChartSettingsFromPanel();
});
chartSettingsLabelRangeInput?.addEventListener("change", applyChartSettingsFromPanel);
chartSettingsValueRangeInput?.addEventListener("change", applyChartSettingsFromPanel);
chartSettingsGridlinesInput?.addEventListener("change", applyChartSettingsFromPanel);
chartSettingsTrendlineInput?.addEventListener("change", applyChartSettingsFromPanel);
chartSettingsXMinInput?.addEventListener("change", applyChartSettingsFromPanel);
chartSettingsXMaxInput?.addEventListener("change", applyChartSettingsFromPanel);
chartSettingsYMinInput?.addEventListener("change", applyChartSettingsFromPanel);
chartSettingsYMaxInput?.addEventListener("change", applyChartSettingsFromPanel);

filterPopupApplyBtn?.addEventListener("click", () => {
    if (filterPopupColumn === null) return;
    applyFilterValue(filterPopupColumn, filterPopupInput?.value ?? "");
});

filterPopupClearBtn?.addEventListener("click", () => {
    if (filterPopupColumn === null) return;
    applyFilterValue(filterPopupColumn, "");
});

filterPopupInput?.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        if (filterPopupColumn !== null) {
            applyFilterValue(filterPopupColumn, filterPopupInput.value);
        }
    }
    if (e.key === "Escape") {
        e.preventDefault();
        hideFilterPopup();
        focusSelectedCell();
    }
});

document.querySelectorAll(".text-menu > button").forEach((button) => {
    button.addEventListener("mouseenter", () => {
        if (!hasOpenTextMenu()) return;

        hideFileMenu();
        hideEditMenu();
        hideViewMenu();
        hideInsertMenu();
        hideDataMenu();
        hideFormatMenu();
    });
});

function runFormatMenuAction(action) {
    if (!selectedCell || isEditing) return;

    if (action === "text-color" || action === "fill-color") {
        hideContextMenu();
        showColorPaletteMenu(
            action === "text-color" ? textColorPaletteMenu : fillColorPaletteMenu,
            action === "text-color" ? menuTextColorBtn : menuFillColorBtn
        );
        hideFormatMenu();
        return;
    }

    hideFormatMenu();
    hideContextMenu();

    if (action === "bold") toggleStyleProperty("bold");
    if (action === "italic") toggleStyleProperty("italic");
    if (action === "underline") toggleStyleProperty("underline");
    if (action === "strikethrough") toggleStyleProperty("strikeThrough");
    if (action === "font-size-increase") changeFontSize(1);
    if (action === "font-size-decrease") changeFontSize(-1);
    if (action === "align-left") setHorizontalAlignment("left");
    if (action === "align-center") setHorizontalAlignment("center");
    if (action === "align-right") setHorizontalAlignment("right");
    if (action === "align-justify") setHorizontalAlignment("justify");
    if (action === "align-top") setVerticalAlignment("top");
    if (action === "align-middle") setVerticalAlignment("middle");
    if (action === "align-bottom") setVerticalAlignment("bottom");
    if (action === "merge") toggleMergeSelection();
}

menuBoldBtn?.addEventListener("click", () => runFormatMenuAction("bold"));
menuItalicBtn?.addEventListener("click", () => runFormatMenuAction("italic"));
menuUnderlineBtn?.addEventListener("click", () => runFormatMenuAction("underline"));
menuStrikethroughBtn?.addEventListener("click", () => runFormatMenuAction("strikethrough"));
menuFontSizeIncreaseBtn?.addEventListener("click", () => runFormatMenuAction("font-size-increase"));
menuFontSizeDecreaseBtn?.addEventListener("click", () => runFormatMenuAction("font-size-decrease"));
menuTextColorBtn?.addEventListener("click", () => runFormatMenuAction("text-color"));
menuFillColorBtn?.addEventListener("click", () => runFormatMenuAction("fill-color"));
menuAlignLeftBtn?.addEventListener("click", () => runFormatMenuAction("align-left"));
menuAlignCenterBtn?.addEventListener("click", () => runFormatMenuAction("align-center"));
menuAlignRightBtn?.addEventListener("click", () => runFormatMenuAction("align-right"));
menuAlignJustifyBtn?.addEventListener("click", () => runFormatMenuAction("align-justify"));
menuAlignTopBtn?.addEventListener("click", () => runFormatMenuAction("align-top"));
menuAlignMiddleBtn?.addEventListener("click", () => runFormatMenuAction("align-middle"));
menuAlignBottomBtn?.addEventListener("click", () => runFormatMenuAction("align-bottom"));
menuMergeBtn?.addEventListener("click", () => runFormatMenuAction("merge"));
menuBorderBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    e.preventDefault();
});

formatMenu?.addEventListener("click", (e) => {
    const formatButton = e.target.closest("[data-format-action]");
    if (formatButton && !formatButton.disabled) {
        e.stopPropagation();
        runFormatMenuAction(formatButton.dataset.formatAction);
        return;
    }

    const borderButton = e.target.closest("[data-border-action]");
    if (borderButton && !borderButton.disabled) {
        e.stopPropagation();
        hideFormatMenu();
        hideContextMenu();
        applyBorderToSelection(borderButton.dataset.borderAction);
    }
});

mergeBtn?.addEventListener("click", () => {
    hideContextMenu();
    toggleMergeSelection();
});

boldBtn?.addEventListener("click", () => {
    hideContextMenu();
    toggleStyleProperty("bold");
});

italicBtn?.addEventListener("click", () => {
    hideContextMenu();
    toggleStyleProperty("italic");
});

underlineBtn?.addEventListener("click", () => {
    hideContextMenu();
    toggleStyleProperty("underline");
});

strikethroughBtn?.addEventListener("click", () => {
    hideContextMenu();
    toggleStyleProperty("strikeThrough");
});

fontSizeDecreaseBtn?.addEventListener("click", () => {
    hideContextMenu();
    changeFontSize(-1);
});

fontSizeIncreaseBtn?.addEventListener("click", () => {
    hideContextMenu();
    changeFontSize(1);
});

currencyFormatBtn?.addEventListener("click", () => {
    hideContextMenu();
    setNumberFormat("currency");
});

percentFormatBtn?.addEventListener("click", () => {
    hideContextMenu();
    setNumberFormat("percent");
});

decimalDecreaseBtn?.addEventListener("click", () => {
    hideContextMenu();
    changeDecimalPlaces(-1);
});

decimalIncreaseBtn?.addEventListener("click", () => {
    hideContextMenu();
    changeDecimalPlaces(1);
});

numberFormatMenu?.addEventListener("click", (e) => {
    e.stopPropagation();
    const button = e.target.closest("[data-number-format]");
    if (!button || button.disabled) return;

    if (button.dataset.numberFormat === "number") {
        setNumberFormatWithDecimalPlaces("number", 2);
    } else {
        setNumberFormat(button.dataset.numberFormat);
    }
    updateNumberFormatMenuState();
});

textColorInput?.addEventListener("input", () => {
    setTextColor(textColorInput.value);
});

fillColorInput?.addEventListener("input", () => {
    setFillColor(fillColorInput.value);
});

findToggleBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    hideContextMenu();
    hideFileMenu();
    hideEditMenu();
    hideViewMenu();
    hideFormatMenu();
    toggleFindPanel();
});

findInput?.addEventListener("input", () => {
    runFindQuery(findInput.value);
    updateFindCount();
});

findInput?.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        findNext(e.shiftKey ? -1 : 1);
    }
    if (e.key === "Escape") {
        e.preventDefault();
        closeFindPanel();
    }
});

replaceInput?.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        if (e.shiftKey) {
            replaceAllFindResults();
        } else {
            replaceCurrentFindResult();
        }
    }
    if (e.key === "Escape") {
        e.preventDefault();
        closeFindPanel();
    }
});

findPrevBtn?.addEventListener("click", () => {
    findNext(-1);
});

findNextBtn?.addEventListener("click", () => {
    findNext(1);
});

replaceBtn?.addEventListener("click", () => {
    replaceCurrentFindResult();
});

replaceAllBtn?.addEventListener("click", () => {
    replaceAllFindResults();
});

findCloseBtn?.addEventListener("click", () => {
    closeFindPanel();
});

alignLeftBtn?.addEventListener("click", () => {
    hideContextMenu();
    setHorizontalAlignment("left");
});

alignCenterBtn?.addEventListener("click", () => {
    hideContextMenu();
    setHorizontalAlignment("center");
});

alignRightBtn?.addEventListener("click", () => {
    hideContextMenu();
    setHorizontalAlignment("right");
});

alignJustifyBtn?.addEventListener("click", () => {
    hideContextMenu();
    setHorizontalAlignment("justify");
});

alignTopBtn?.addEventListener("click", () => {
    hideContextMenu();
    setVerticalAlignment("top");
});

alignMiddleBtn?.addEventListener("click", () => {
    hideContextMenu();
    setVerticalAlignment("middle");
});

alignBottomBtn?.addEventListener("click", () => {
    hideContextMenu();
    setVerticalAlignment("bottom");
});

addRowBtn.addEventListener("click", () => {
    if (addRowBtn.disabled) return;
    insertRowsAboveSelection();
});
addRowDownBtn.addEventListener("click", () => {
    if (addRowDownBtn.disabled) return;
    insertRowsBelowSelection();
});
removeRowBtn.addEventListener("click", () => {
    if (removeRowBtn.disabled) return;
    deleteSelectedRows();
});
addColBtn.addEventListener("click", () => {
    if (addColBtn.disabled) return;
    insertColsLeftOfSelection();
});
addColRightBtn.addEventListener("click", () => {
    if (addColRightBtn.disabled) return;
    insertColsRightOfSelection();
});
removeColBtn.addEventListener("click", () => {
    if (removeColBtn.disabled) return;
    deleteSelectedColumns();
});
function placeCursorAtEnd(element) {
    const range = document.createRange();
    const selection = window.getSelection();
    range.selectNodeContents(element);
    range.collapse(false);
    selection.removeAllRanges();
    selection.addRange(range);
}

function insertTextAtCursor(text) {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);
    range.deleteContents();
    const node = document.createTextNode(text);
    range.insertNode(node);
    range.setStartAfter(node);
    range.collapse(true);
    selection.removeAllRanges();
    selection.addRange(range);
}

function handleEditingCellInput() {
    formulaPointState = null;
    syncFormulaBarFromEditingCell();
}

function setFormulaInputValue(value) {
    formulaInput.value = value;
    formulaInputBackupValue = value;
}

function getActiveEditingCell() {
    if (!isEditing || !selectedCell) return null;

    return getCellElement(selectedCell.row, selectedCell.col);
}

function syncFormulaBarFromEditingCell() {
    const cell = getActiveEditingCell();
    if (!cell) return;

    formulaInput.value = cell.textContent;
}

function syncEditingCellFromFormulaBar() {
    const cell = getActiveEditingCell();
    if (!cell) return;

    cell.textContent = formulaInput.value;
}

function isRowVisible(row) {
    return !hiddenRows.has(row) && !isRowHiddenByFilter(row);
}

function isColVisible(col) {
    return !hiddenCols.has(col);
}

function stepVisibleRow(row, delta) {
    let next = row;
    do {
        next += delta;
    } while (next >= 0 && next < rowCount && !isRowVisible(next));
    return next < 0 || next >= rowCount ? row : next;
}

function stepVisibleCol(col, delta) {
    let next = col;
    do {
        next += delta;
    } while (next >= 0 && next < colCount && !isColVisible(next));
    return next < 0 || next >= colCount ? col : next;
}

/** Birleştirilmiş hücrenin içindeki bir konum, birleştirmenin sol üst hücresine çevrilir. */
function resolveMergedPosition(position) {
    const target = tableData[position.row]?.[position.col]?.mergedTo;
    return target ? { row: target.row, col: target.col } : position;
}

function getCellPositionAfterArrowKey(row, col, key) {
    const visual = getVisualCellRange(row, col);
    switch (key) {
        case "ArrowUp":
            return resolveMergedPosition({ row: stepVisibleRow(visual.minRow, -1), col });
        case "ArrowDown":
            return resolveMergedPosition({ row: stepVisibleRow(visual.maxRow, 1), col });
        case "ArrowLeft":
            return resolveMergedPosition({ row, col: stepVisibleCol(visual.minCol, -1) });
        case "ArrowRight":
            return resolveMergedPosition({ row, col: stepVisibleCol(visual.maxCol, 1) });
        default:
            return { row, col };
    }
}

function cellHasValue(row, col) {
    const cell = tableData[row]?.[col];
    return Boolean(cell && (cell.formula || String(cell.value ?? "") !== ""));
}

/** Ctrl+ok: dolu bölgenin kenarına ya da sonraki dolu hücreye atlar (Excel davranışı). */
function getDataEdgePosition(row, col, key) {
    const vertical = key === "ArrowUp" || key === "ArrowDown";
    const delta = key === "ArrowUp" || key === "ArrowLeft" ? -1 : 1;
    const step = (position) => (vertical
        ? { row: stepVisibleRow(position.row, delta), col: position.col }
        : { row: position.row, col: stepVisibleCol(position.col, delta) });
    const same = (a, b) => a.row === b.row && a.col === b.col;

    let current = { row, col };
    let next = step(current);
    if (same(current, next)) return current;

    if (cellHasValue(current.row, current.col) && cellHasValue(next.row, next.col)) {
        while (!same(current, next) && cellHasValue(next.row, next.col)) {
            current = next;
            next = step(current);
        }
        return current;
    }

    current = next;
    while (!cellHasValue(current.row, current.col)) {
        next = step(current);
        if (same(current, next)) return current;
        current = next;
    }
    return current;
}

function getLastUsedPosition() {
    let maxRow = 0;
    let maxCol = 0;
    for (let r = 0; r < rowCount; r++) {
        for (let c = 0; c < colCount; c++) {
            if (cellHasValue(r, c)) {
                maxRow = Math.max(maxRow, r);
                maxCol = Math.max(maxCol, c);
            }
        }
    }
    return { row: maxRow, col: maxCol };
}

function handleEditingCellKeydown(e) {
    if (e.altKey && e.key === "Enter") {
        e.preventDefault();
        e.stopPropagation();
        insertTextAtCursor("\n");
        syncFormulaBarFromEditingCell();
        return;
    }

    if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        // F2 ya da çift tıkla açılan düzenlemede oklar imleci metin içinde taşır.
        if (editMode === "edit" || !selectedCell || e.shiftKey) return;

        e.preventDefault();
        e.stopPropagation();

        const { row, col } = selectedCell;
        const targetCell = getCellPositionAfterArrowKey(row, col, e.key);

        exitEditMode(true);
        selectCell(targetCell.row, targetCell.col, true);
    }
}

function handleEditingCellPaste(e) {
    // Biçimli içerik hücreye HTML olarak girmesin; yalnız düz metin yapıştırılır.
    e.preventDefault();
    const text = e.clipboardData?.getData("text/plain") ?? "";
    insertTextAtCursor(text.replace(/\r\n?/g, "\n").replace(/\n$/, ""));
    syncFormulaBarFromEditingCell();
}

/* FORMÜL FONKSİYONLARI */
function cellRefToIndex(ref) {
    const match = ref.match(/^\$?([A-Z]+)\$?(\d+)$/);
    if (!match) return null;

    const colLetters = match[1];
    const rowNumber = parseInt(match[2], 10);

    let col = 0;
    for (let i = 0; i < colLetters.length; i++) {
        col = col * 26 + (colLetters.charCodeAt(i) - 64);
    }

    return {
        row: rowNumber - 1,
        col: col - 1
    };
}

function isCellWithinBounds(row, col) {
    return (
        row >= 0 &&
        row < rowCount &&
        col >= 0 &&
        col < colCount
    );
}

function isRangeWithinBounds(start, end) {
    return (
        start &&
        end &&
        isCellWithinBounds(start.row, start.col) &&
        isCellWithinBounds(end.row, end.col)
    );
}

function getWorkbookAccessor() {
    return {
        sheetCount: Math.max(1, sheets.length),
        getSheetName: (index) => sheets[index]?.name ?? (index === activeSheetIndex ? "Sayfa1" : ""),
        getSize: (index) => (index === activeSheetIndex
            ? { rows: rowCount, cols: colCount }
            : { rows: sheets[index]?.rowCount ?? 0, cols: sheets[index]?.colCount ?? 0 }),
        getCell: (index, row, col) => getSheetTableData(index)?.[row]?.[col] ?? null
    };
}

/** Bütün sayfalardaki formülleri yeniden hesaplar; döngüsel başvurular #DÖNGÜ! olur. */
function recalculateAll() {
    const chartSignaturesBefore = captureChartDependencySignatures();
    const evaluator = AwFormula.createEvaluator(getWorkbookAccessor());

    forEachWorkbookFormulaCell((cell, sheetIndex, row, col) => {
        cell.value = AwFormula.valueToStorage(evaluator.getValue(sheetIndex, row, col));
    });

    refreshChartsWithChangedCalculatedValues(chartSignaturesBefore);
}

/** Hücre metnini sayıya çevirir ("3,5" ve "3.5" geçer); sayı değilse null. */
function parseCellNumber(value) {
    return AwFormula.parseNumber(value);
}

function setCellInput(cell, text) {
    const value = String(text ?? "");
    if (value.startsWith("=") && value.length > 1) {
        cell.formula = value;
    } else {
        cell.formula = null;
        cell.value = value;
    }
}

// renderTable sonrası hücre öğeleri bir kez dizinlenir; seçimde querySelector gerekmez.
let cellElements = new Map();
let decoratedCellElements = new Set();

function indexCellElements() {
    cellElements = new Map();
    decoratedCellElements = new Set();
    table.querySelectorAll("td[data-row]").forEach((td) => {
        cellElements.set(`${td.dataset.row}:${td.dataset.col}`, td);
        if (td.className) decoratedCellElements.add(td);
    });
}

function getCellElement(row, col) {
    const element = cellElements.get(`${row}:${col}`);
    if (element?.isConnected) return element;
    return table.querySelector(`td[data-row="${row}"][data-col="${col}"]`);
}

function enterEditMode(row, col, initialChar = null) {
    if (internalClipboard || copiedRange || clipboardMode) {
        clearClipboardState(true, false);
    }

    const cell = getCellElement(row, col);
    if (!cell) return;

    isEditing = true;
    editMode = initialChar === null ? "edit" : "enter";
    formulaPointState = null;
    editBackupValue = getCellEditValue(row, col);
    updateToolbarState();

    cell.contentEditable = "true";
    cell.classList.add("editing");
    cell.addEventListener("keydown", handleEditingCellKeydown);
    cell.addEventListener("input", handleEditingCellInput);
    cell.addEventListener("paste", handleEditingCellPaste);
    cell.textContent = initialChar !== null ? initialChar : editBackupValue;
    formulaInput.value = cell.textContent;
    cell.focus({ preventScroll: true });
    placeCursorAtEnd(cell);
}

function exitEditMode(save = true) {
    if (!isEditing || !selectedCell) return;

    const { row, col } = selectedCell;
    const cell = getCellElement(row, col);
    const text = cell ? cell.textContent.replace(/ /g, " ").trim() : editBackupValue;
    const changed = save && text !== editBackupValue;

    if (cell) {
        cell.removeEventListener("input", handleEditingCellInput);
        cell.removeEventListener("keydown", handleEditingCellKeydown);
        cell.removeEventListener("paste", handleEditingCellPaste);
        cell.contentEditable = "false";
        cell.classList.remove("editing");
    }

    isEditing = false;
    editBackupValue = "";
    formulaPointState = null;

    if (changed) {
        pushHistory();
        setCellInput(tableData[row][col], text);
        recalculateAll();
    }

    renderTable();
    if (changed) refreshChartsForChangedCell(row, col);
}

function commitFormulaInput() {
    if (!selectedCell) return;

    const { row, col } = selectedCell;
    const text = formulaInput.value.trim();

    if (text === formulaInputBackupValue) return;

    if (isEditing) {
        const cell = getActiveEditingCell();
        if (cell) {
            cell.textContent = formulaInput.value;
        }
        exitEditMode(true);
        return;
    }

    pushHistory();
    setCellInput(tableData[row][col], text);
    recalculateAll();
    clearClipboardState();
    renderTable();
    refreshChartsForChangedCell(row, col);
}

/** Formül yazılırken bir hücreye tıklanırsa başvurusu formüle eklenir (sürüklenirse aralık). */
function canInsertFormulaReference() {
    if (!isEditing) return false;
    const text = getActiveEditingCell()?.textContent ?? "";
    if (!text.startsWith("=")) return false;
    if (formulaPointState) return true;
    return /[=(,;+\-*/^&<>:]\s*$/.test(text);
}

function updateFormulaPointReference(row, col) {
    const cell = getActiveEditingCell();
    if (!cell || !formulaPointState) return;

    const { anchor, prefix } = formulaPointState;
    const start = getCellName(Math.min(anchor.row, row), Math.min(anchor.col, col));
    const end = getCellName(Math.max(anchor.row, row), Math.max(anchor.col, col));
    cell.textContent = `${prefix}${start === end ? start : `${start}:${end}`}`;
    placeCursorAtEnd(cell);
    syncFormulaBarFromEditingCell();
}

function startFormulaPointReference(row, col) {
    const cell = getActiveEditingCell();
    if (!cell) return;

    const text = cell.textContent;
    const prefix = formulaPointState && !formulaPointState.dragging
        ? text.slice(0, formulaPointState.prefix.length)
        : text;
    formulaPointState = { anchor: { row, col }, prefix, dragging: true };
    updateFormulaPointReference(row, col);
}

function commitCellNameInput() {
    const index = cellRefToIndex(cellName.value.trim().toUpperCase());

    if (index && selectCell(index.row, index.col)) {
        focusSelectedCell(true);
        return;
    }

    updateFormulaBar();
}

cellName.addEventListener("focus", () => {
    cellName.select();
});

cellName.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        commitCellNameInput();
    }

    if (e.key === "Escape") {
        e.preventDefault();
        clearClipboardState(true);
        updateFormulaBar();
        focusSelectedCell();
    }
});

cellName.addEventListener("blur", updateFormulaBar);

formulaInput.addEventListener("keydown", (e) => {
    if (e.altKey && e.key === "Enter" && isEditing) {
        e.preventDefault();
        e.stopPropagation();
        const start = formulaInput.selectionStart;
        const end = formulaInput.selectionEnd;
        const value = formulaInput.value;
        formulaInput.value = `${value.slice(0, start)}\n${value.slice(end)}`;
        formulaInput.selectionStart = start + 1;
        formulaInput.selectionEnd = start + 1;
        syncEditingCellFromFormulaBar();
        return;
    }

    if (e.key === "Enter") {
        e.preventDefault();
        commitFormulaInput();
        focusSelectedCell();
    }

    if (e.key === "Escape") {
        e.preventDefault();
        clearClipboardState(true);
        if (isEditing) {
            exitEditMode(false);
        } else {
            updateFormulaBar();
        }
        focusSelectedCell();
    }
});

formulaInput.addEventListener("beforeinput", () => {
    if (!isEditing) {
        clearClipboardState(true, false);
    }
});

formulaInput.addEventListener("input", () => {
    if (isEditing) {
        syncEditingCellFromFormulaBar();
    }
});

formulaInput.addEventListener("blur", () => {
    if (selectedCell) {
        commitFormulaInput();
    }
});

window.addEventListener("pointerdown", (e) => {
    const isTextMenuTarget =
        fileMenu?.contains(e.target) ||
        fileMenuBtn?.contains(e.target) ||
        editMenu?.contains(e.target) ||
        editMenuBtn?.contains(e.target) ||
        viewMenu?.contains(e.target) ||
        viewMenuBtn?.contains(e.target) ||
        insertMenu?.contains(e.target) ||
        insertMenuBtn?.contains(e.target) ||
        dataMenu?.contains(e.target) ||
        dataMenuBtn?.contains(e.target) ||
        formatMenu?.contains(e.target) ||
        formatMenuBtn?.contains(e.target) ||
        helpMenu?.contains(e.target) ||
        helpMenuBtn?.contains(e.target);

    if (!isTextMenuTarget) {
        hideFileMenu();
        hideEditMenu();
        hideViewMenu();
        hideInsertMenu();
        hideDataMenu();
        hideFormatMenu();
        hideHelpMenu();
    }
}, true);

window.addEventListener("click", (e) => {
    if (contextMenu && !contextMenu.contains(e.target)) {
        hideContextMenu();
    }
    if (
        !e.target.closest(".color-palette-menu") &&
        !menuTextColorBtn?.contains(e.target) &&
        !menuFillColorBtn?.contains(e.target)
    ) {
        hideColorPaletteMenus();
    }
    if (zoomMenu && !zoomMenu.contains(e.target) && !zoomValueBtn?.contains(e.target)) {
        hideZoomMenu();
    }
    if (
        chartSettingsTypeMenu &&
        !chartSettingsTypeMenu.contains(e.target) &&
        !chartSettingsTypeBtn?.contains(e.target)
    ) {
        hideChartTypeMenu();
    }
    if (fileMenu && !fileMenu.contains(e.target) && !fileMenuBtn?.contains(e.target)) {
        hideFileMenu();
    }
    if (editMenu && !editMenu.contains(e.target) && !editMenuBtn?.contains(e.target)) {
        hideEditMenu();
    }
    if (viewMenu && !viewMenu.contains(e.target) && !viewMenuBtn?.contains(e.target)) {
        hideViewMenu();
    }
    if (insertMenu && !insertMenu.contains(e.target) && !insertMenuBtn?.contains(e.target)) {
        hideInsertMenu();
    }
    if (dataMenu && !dataMenu.contains(e.target) && !dataMenuBtn?.contains(e.target)) {
        hideDataMenu();
    }
    if (formatMenu && !formatMenu.contains(e.target) && !formatMenuBtn?.contains(e.target)) {
        hideFormatMenu();
    }
    if (helpMenu && !helpMenu.contains(e.target) && !helpMenuBtn?.contains(e.target)) {
        hideHelpMenu();
    }
    if (
        filterPopup &&
        !filterPopup.contains(e.target) &&
        !e.target.closest(".cell-filter-btn")
    ) {
        hideFilterPopup();
    }
});

window.addEventListener("mousedown", (e) => {
    if (e.button !== 0) return;
    if (contextMenu && !contextMenu.contains(e.target)) {
        hideContextMenu();
    }
});

table?.addEventListener("mousedown", () => {
    hideColorPaletteMenus();
}, true);

window.addEventListener("contextmenu", (e) => {
    const isSpreadsheetTarget = e.target.closest(
        "#data-table td, #data-table th, #sheet-tabs .sheet-tab"
    );

    if (!isSpreadsheetTarget) {
        hideContextMenu();
    }
});

window.addEventListener("scroll", hideContextMenu, true);
window.addEventListener("scroll", hideColorPaletteMenus, true);
window.addEventListener("scroll", hideFilterPopup, true);
window.addEventListener("scroll", hideZoomMenu, true);
window.addEventListener("scroll", hideChartTypeMenu, true);
window.addEventListener("scroll", hideFileMenu, true);
window.addEventListener("scroll", hideEditMenu, true);
window.addEventListener("scroll", hideViewMenu, true);
window.addEventListener("scroll", hideInsertMenu, true);
window.addEventListener("scroll", hideFormatMenu, true);
tableArea?.addEventListener("scroll", () => {
    charts
        .filter((chart) => chart.element.classList.contains("minimized"))
        .forEach(positionMinimizedChartWindow);
});
window.addEventListener("resize", () => {
    charts
        .filter((chart) => chart.element.classList.contains("minimized"))
        .forEach(positionMinimizedChartWindow);
});

window.addEventListener("beforeunload", () => {
    if (isEditing) {
        exitEditMode(true);
    }
    window.clearTimeout(autoSaveTimer);
    saveAutoSavedWorkbook();
});

contextMenu?.addEventListener("click", (e) => {
    e.stopPropagation();
    const button = e.target.closest("[data-action]");
    if (button && !button.disabled) {
        handleContextMenuAction(button.dataset.action);
    }
    hideContextMenu();
});

window.addEventListener("mousemove", (e) => {
    if (freezeDragState) {
        e.preventDefault();
        updateFreezeDividerDrag(e);
        return;
    }

    if (chartResizeState) {
        e.preventDefault();
        resizeChartWindow(e);
        return;
    }

    if (chartDragState) {
        e.preventDefault();
        const chart = chartDragState.chart;
        const position = clampChartWindowPosition(
            chart,
            chartDragState.left + e.clientX - chartDragState.pointerX,
            chartDragState.top + e.clientY - chartDragState.pointerY
        );
        chart.element.style.left = `${position.left}px`;
        chart.element.style.top = `${position.top}px`;
        return;
    }

    if (!resizeState) return;

    if (resizeState.type === "column") {
        const width = Math.max(
            MIN_COL_WIDTH,
            resizeState.startSize + e.clientX - resizeState.startPosition
        );
        colWidths[resizeState.index] = width;
        applyColumnWidth(resizeState.index);
        if (resizeState.index < frozenCols) refreshFreezeDividers();
    }

    if (resizeState.type === "row") {
        const height = Math.max(
            MIN_ROW_HEIGHT,
            resizeState.startSize + e.clientY - resizeState.startPosition
        );
        rowHeights[resizeState.index] = height;
        applyRowHeight(resizeState.index);
        if (resizeState.index < frozenRows) refreshFreezeDividers();
    }
});

window.addEventListener("mouseup", () => {
    if (chartDragState || chartResizeState) {
        scheduleAutoSave();
    }
    chartDragState = null;
    chartResizeState = null;
    finishMoveSelection();
    isMouseSelecting = false;
    headerSelectionState = null;
    resizeState = null;
});

/* ---------- Klavye ---------- */

function isTextEntryTarget(element) {
    if (!element) return false;
    return (
        element.tagName === "INPUT" ||
        element.tagName === "TEXTAREA" ||
        element.tagName === "SELECT" ||
        (element.isContentEditable && !element.closest("#data-table"))
    );
}

function moveSelectionTo(position, extend = false) {
    const target = resolveMergedPosition(position);
    if (extend && selectedCell) {
        extraSelections = [];
        selectionRange = {
            start: selectionRange ? { ...selectionRange.start } : { ...selectedCell },
            end: { ...target }
        };
        selectionMode = "range";
    } else {
        selectSingleCell(target.row, target.col);
    }
    renderSelection();
    if (extend) {
        getCellElement(target.row, target.col)?.scrollIntoView({ block: "nearest", inline: "nearest" });
        focusSelectedCell();
    } else {
        focusSelectedCell(true);
    }
}

function commitEditAndMove(dRow, dCol) {
    if (!selectedCell) return;
    const { row, col } = selectedCell;
    exitEditMode(true);
    let target = { row, col };
    if (dRow) target = getCellPositionAfterArrowKey(row, col, dRow > 0 ? "ArrowDown" : "ArrowUp");
    if (dCol) target = getCellPositionAfterArrowKey(row, col, dCol > 0 ? "ArrowRight" : "ArrowLeft");
    selectCell(target.row, target.col, true);
}

function getPageRowStep() {
    const visibleHeight = tableArea?.clientHeight ?? 600;
    return Math.max(1, Math.floor(visibleHeight / (DEFAULT_ROW_HEIGHT * getZoomScale())) - 2);
}

window.addEventListener("keydown", (e) => {
    if (appDialog?.open) return;

    const mod = e.ctrlKey || e.metaKey;
    const isAltGraph = e.ctrlKey && e.altKey;

    if (mod && !e.altKey && !e.shiftKey && e.code === "KeyF") {
        e.preventDefault();
        openFindPanel();
        return;
    }
    if (mod && !e.altKey && e.code === "KeyS") {
        e.preventDefault();
        if (isEditing) exitEditMode(true);
        if (e.shiftKey) saveWorkbookAs();
        else saveWorkbook();
        return;
    }
    if (mod && !e.altKey && !e.shiftKey && e.code === "KeyO") {
        e.preventDefault();
        runOpenWorkbook();
        return;
    }
    if (mod && !e.altKey && !e.shiftKey && e.code === "KeyP") {
        e.preventDefault();
        if (isEditing) exitEditMode(true);
        printActiveSheet();
        return;
    }

    if (e.key === "Escape") {
        if (findPanel && !findPanel.hidden) {
            e.preventDefault();
            closeFindPanel();
            return;
        }
        hideContextMenu();
        hideFileMenu();
        hideEditMenu();
        hideViewMenu();
        hideInsertMenu();
        hideDataMenu();
        hideFormatMenu();
        hideHelpMenu();
        if (!isEditing && clearClipboardState(true)) {
            e.preventDefault();
            return;
        }
    }

    if (isTextEntryTarget(document.activeElement)) return;
    if (!selectedCell) return;
    const { row, col } = selectedCell;

    // DÜZENLEME
    if (isEditing) {
        if (e.key === "Enter" && !e.altKey) {
            e.preventDefault();
            commitEditAndMove(e.shiftKey ? -1 : 1, 0);
            return;
        }
        if (e.key === "Tab") {
            e.preventDefault();
            commitEditAndMove(0, e.shiftKey ? -1 : 1);
            return;
        }
        if (e.key === "Escape") {
            e.preventDefault();
            exitEditMode(false);
            focusSelectedCell();
        }
        return;
    }

    if (mod && !isAltGraph) {
        switch (e.code) {
            case "KeyZ":
                e.preventDefault();
                if (e.shiftKey) redo();
                else undo();
                return;
            case "KeyY":
                e.preventDefault();
                redo();
                return;
            case "KeyA":
                e.preventDefault();
                selectAllCells();
                return;
            case "KeyB":
                e.preventDefault();
                toggleStyleProperty("bold");
                return;
            case "KeyI":
                e.preventDefault();
                toggleStyleProperty("italic");
                return;
            case "KeyU":
                e.preventDefault();
                toggleStyleProperty("underline");
                return;
            case "KeyC":
            case "KeyX":
                // Asıl iş "copy"/"cut" olayında; olay gelmezse (eski tarayıcı) yedek yol çalışır.
                startKeyboardCopy(e.code === "KeyX" ? "cut" : "copy");
                return;
            case "Home":
                e.preventDefault();
                moveSelectionTo({ row: stepVisibleRow(-1, 1), col: stepVisibleCol(-1, 1) }, e.shiftKey);
                return;
            case "End":
                e.preventDefault();
                moveSelectionTo(getLastUsedPosition(), e.shiftKey);
                return;
            default:
                break;
        }
        if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
            e.preventDefault();
            const base = e.shiftKey && selectionRange ? selectionRange.end : selectedCell;
            moveSelectionTo(getDataEdgePosition(base.row, base.col, e.key), e.shiftKey);
        }
        return;
    }

    if (e.key === "Delete" || e.key === "Backspace") {
        e.preventDefault();
        clearSelectionContents();
        return;
    }

    if (e.key === "F2") {
        e.preventDefault();
        clearClipboardState();
        enterEditMode(row, col);
        return;
    }

    if (e.key === "Enter") {
        e.preventDefault();
        moveSelectionTo(getCellPositionAfterArrowKey(row, col, e.shiftKey ? "ArrowUp" : "ArrowDown"));
        return;
    }

    if (e.key === "Tab") {
        e.preventDefault();
        moveSelectionTo(getCellPositionAfterArrowKey(row, col, e.shiftKey ? "ArrowLeft" : "ArrowRight"));
        return;
    }

    if (e.key === "Home") {
        e.preventDefault();
        moveSelectionTo({ row: e.shiftKey && selectionRange ? selectionRange.end.row : row, col: stepVisibleCol(-1, 1) }, e.shiftKey);
        return;
    }

    if (e.key === "PageDown" || e.key === "PageUp") {
        e.preventDefault();
        const base = e.shiftKey && selectionRange ? selectionRange.end : selectedCell;
        let target = base.row;
        for (let i = 0; i < getPageRowStep(); i++) target = stepVisibleRow(target, e.key === "PageDown" ? 1 : -1);
        moveSelectionTo({ row: target, col: base.col }, e.shiftKey);
        return;
    }

    if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        e.preventDefault();
        const base = e.shiftKey && selectionRange ? selectionRange.end : selectedCell;
        moveSelectionTo(getCellPositionAfterArrowKey(base.row, base.col, e.key), e.shiftKey);
        return;
    }

    // Yazmaya başlamak hücreyi düzenlemeye açar (AltGr ile yazılan @, € gibi karakterler dahil).
    if (e.key.length === 1 && (!e.altKey || isAltGraph) && (!mod || isAltGraph)) {
        e.preventDefault();
        clearClipboardState();
        enterEditMode(row, col, e.key);
    }
});

/* ---------- Pano (sistem panosuyla da çalışır) ---------- */

let lastClipboardText = null;
let pendingKeyboardCopy = null;

function normalizeClipboardText(text) {
    return String(text ?? "").replace(/\r\n?/g, "\n").replace(/\n+$/, "");
}

function getActiveRangeClipboardData() {
    const range = getActiveRange();
    if (!range) return { text: "", html: "" };

    const textRows = [];
    const htmlRows = [];
    for (let r = range.minRow; r <= range.maxRow; r++) {
        if (!isRowVisible(r) && selectionMode !== "cell") continue;
        const textCells = [];
        const htmlCells = [];
        for (let c = range.minCol; c <= range.maxCol; c++) {
            const cell = tableData[r]?.[c];
            const display = cell?.mergedTo ? "" : formatCellDisplayValue(cell);
            textCells.push(/[\t\n"]/.test(display) ? `"${display.replace(/"/g, '""')}"` : display);
            const style = getCellStyle(cell);
            const css = [
                style.bold ? "font-weight:bold" : "",
                style.italic ? "font-style:italic" : "",
                style.backgroundColor ? `background:${style.backgroundColor}` : "",
                style.color && style.color !== "#202124" ? `color:${style.color}` : ""
            ].filter(Boolean).join(";");
            htmlCells.push(`<td${css ? ` style="${css}"` : ""}>${escapeHtml(display).replace(/\n/g, "<br>")}</td>`);
        }
        textRows.push(textCells.join("\t"));
        htmlRows.push(`<tr>${htmlCells.join("")}</tr>`);
    }

    return {
        text: textRows.join("\n"),
        html: `<table>${htmlRows.join("")}</table>`
    };
}

function copySelectionToClipboard(mode) {
    const data = getActiveRangeClipboardData();
    setClipboardFromSelection(mode);
    lastClipboardText = normalizeClipboardText(data.text);
    return data;
}

function writeSystemClipboard(text) {
    navigator.clipboard?.writeText?.(text).catch(() => {});
}

function startKeyboardCopy(mode) {
    pendingKeyboardCopy = mode;
    setTimeout(() => {
        // "copy" olayı gelmediyse panoya yine de yazılır.
        if (pendingKeyboardCopy === mode) {
            pendingKeyboardCopy = null;
            const data = copySelectionToClipboard(mode);
            writeSystemClipboard(data.text);
        }
    }, 0);
}

function shouldHandleGridClipboard() {
    return Boolean(selectedCell) && !isEditing && !appDialog?.open && !isTextEntryTarget(document.activeElement);
}

function handleClipboardCopy(e, mode) {
    if (!shouldHandleGridClipboard()) return;
    e.preventDefault();
    pendingKeyboardCopy = null;
    const data = copySelectionToClipboard(mode);
    e.clipboardData?.setData("text/plain", data.text);
    e.clipboardData?.setData("text/html", data.html);
}

document.addEventListener("copy", (e) => handleClipboardCopy(e, "copy"));
document.addEventListener("cut", (e) => handleClipboardCopy(e, "cut"));
document.addEventListener("paste", (e) => {
    if (!shouldHandleGridClipboard()) return;
    e.preventDefault();
    const text = e.clipboardData?.getData("text/plain") ?? "";
    pasteFromText(text);
});

function pasteFromText(text) {
    if (internalClipboard && (lastClipboardText === null || normalizeClipboardText(text) === lastClipboardText || text === "")) {
        return pasteClipboard();
    }
    if (text === "") return false;
    return pasteExternalText(text);
}

/** Excel, LibreOffice ya da bir web sayfasından kopyalanan sekmeli metni yapıştırır (biçim korunur). */
function pasteExternalText(text) {
    if (!selectedCell) return false;
    const rows = AwFileIO.parseDelimited(normalizeClipboardText(text), "\t");
    if (!rows.length) return false;

    const activeRange = getActiveRange();
    const isSingleValue = rows.length === 1 && rows[0].length === 1;
    const startRow = activeRange?.minRow ?? selectedCell.row;
    const startCol = activeRange?.minCol ?? selectedCell.col;
    const height = isSingleValue && activeRange ? activeRange.maxRow - activeRange.minRow + 1 : rows.length;
    const width = isSingleValue && activeRange
        ? activeRange.maxCol - activeRange.minCol + 1
        : Math.max(...rows.map((row) => row.length));

    pushHistory();
    ensureGridSize(startRow + height, startCol + width);
    const targetRange = { minRow: startRow, maxRow: startRow + height - 1, minCol: startCol, maxCol: startCol + width - 1 };
    if (!isSingleValue) clearMergesIntersectingRange(targetRange);

    for (let r = 0; r < height; r++) {
        for (let c = 0; c < width; c++) {
            const cell = tableData[startRow + r][startCol + c];
            if (cell.mergedTo) continue;
            const value = isSingleValue ? rows[0][0] : rows[r]?.[c] ?? "";
            setCellInput(cell, value);
        }
    }

    clearClipboardState();
    selectedCell = { row: startRow, col: startCol };
    if (height > 1 || width > 1) {
        selectionRange = { start: { row: startRow, col: startCol }, end: { row: targetRange.maxRow, col: targetRange.maxCol } };
        selectionMode = "range";
    }
    recalculateAll();
    renderTable();
    refreshChartsForChangedRange(targetRange);
    focusSelectedCell();
    return true;
}

async function pasteFromMenu() {
    if (internalClipboard) {
        let systemText = null;
        try {
            systemText = await navigator.clipboard?.readText?.();
        } catch {
            systemText = null;
        }
        if (systemText === null || systemText === undefined || normalizeClipboardText(systemText) === lastClipboardText) {
            return pasteClipboard();
        }
        return pasteExternalText(systemText);
    }

    try {
        const text = await navigator.clipboard.readText();
        return pasteFromText(text);
    } catch {
        showAppMessage("Tarayıcı panoyu okumaya izin vermedi. Yapıştırmak için Ctrl+V kullanın.");
        return false;
    }
}

function copyFromMenu(mode) {
    const data = copySelectionToClipboard(mode);
    writeSystemClipboard(data.text);
}

/* ---------- İletişim kutuları (alert/confirm/prompt yerine) ---------- */

const appDialog = document.getElementById("app-dialog");

function showAppDialog({ title = "awCELL", message = "", input = null, select = null, confirmText = "Tamam", cancelText = null, danger = false } = {}) {
    return new Promise((resolve) => {
        if (!appDialog) {
            resolve({ confirmed: true, value: input?.value ?? "" });
            return;
        }

        const titleElement = appDialog.querySelector(".app-dialog-title");
        const messageElement = appDialog.querySelector(".app-dialog-message");
        const fieldsElement = appDialog.querySelector(".app-dialog-fields");
        const confirmButton = appDialog.querySelector(".app-dialog-confirm");
        const cancelButton = appDialog.querySelector(".app-dialog-cancel");

        titleElement.textContent = title;
        messageElement.textContent = message;
        messageElement.hidden = !message;
        fieldsElement.replaceChildren();
        confirmButton.textContent = confirmText;
        confirmButton.classList.toggle("danger", danger);
        cancelButton.textContent = cancelText ?? "";
        cancelButton.hidden = !cancelText;

        let inputElement = null;
        let selectElement = null;
        if (input) {
            inputElement = document.createElement(input.multiline ? "textarea" : "input");
            inputElement.className = "app-dialog-input";
            inputElement.value = input.value ?? "";
            inputElement.placeholder = input.placeholder ?? "";
            inputElement.spellcheck = false;
            if (input.multiline) inputElement.rows = 5;
            fieldsElement.appendChild(inputElement);
        }
        if (select) {
            selectElement = document.createElement("select");
            selectElement.className = "app-dialog-select";
            select.options.forEach((option) => {
                const element = document.createElement("option");
                element.value = option.value;
                element.textContent = option.label;
                selectElement.appendChild(element);
            });
            selectElement.value = select.value ?? select.options[0]?.value;
            fieldsElement.appendChild(selectElement);
        }

        const finish = (confirmed) => {
            appDialog.removeEventListener("close", onClose);
            confirmButton.removeEventListener("click", onConfirm);
            cancelButton.removeEventListener("click", onCancel);
            appDialog.removeEventListener("keydown", onKeydown);
            if (appDialog.open) appDialog.close();
            resolve({
                confirmed,
                value: inputElement?.value ?? "",
                selected: selectElement?.value ?? null
            });
            focusSelectedCell();
        };
        const onConfirm = () => finish(true);
        const onCancel = () => finish(false);
        const onClose = () => finish(false);
        const onKeydown = (event) => {
            event.stopPropagation();
            if (event.key === "Enter" && !(event.target.tagName === "TEXTAREA" && !event.ctrlKey)) {
                event.preventDefault();
                finish(true);
            }
        };

        confirmButton.addEventListener("click", onConfirm);
        cancelButton.addEventListener("click", onCancel);
        appDialog.addEventListener("close", onClose);
        appDialog.addEventListener("keydown", onKeydown);
        appDialog.showModal();
        (inputElement ?? selectElement ?? confirmButton).focus();
        inputElement?.select?.();
    });
}

function showAppMessage(message, title = "awCELL") {
    return showAppDialog({ title, message });
}

async function showAppConfirm(message, options = {}) {
    const result = await showAppDialog({
        title: options.title ?? "awCELL",
        message,
        confirmText: options.confirmText ?? "Evet",
        cancelText: options.cancelText ?? "Vazgeç",
        danger: options.danger ?? false
    });
    return result.confirmed;
}

/* ---------- Notlar ---------- */

async function editNoteForSelection() {
    if (!selectedCell) return false;
    const { row, col } = selectedCell;
    const cell = tableData[row]?.[col];
    if (!cell) return false;

    const result = await showAppDialog({
        title: `${getCellName(row, col)} notu`,
        input: { value: cell.note ?? "", multiline: true, placeholder: "Not yazın" },
        confirmText: "Kaydet",
        cancelText: "Vazgeç"
    });
    if (!result.confirmed) return false;

    const note = result.value.trim();
    if (note === (cell.note ?? "")) return false;
    pushHistory();
    if (note) cell.note = note;
    else delete cell.note;
    renderTable();
    focusSelectedCell();
    return true;
}

function deleteNoteForSelection() {
    const ranges = getActiveRanges();
    let changed = false;
    ranges.forEach((range) => {
        for (let r = range.minRow; r <= range.maxRow; r++) {
            for (let c = range.minCol; c <= range.maxCol; c++) {
                if (tableData[r]?.[c]?.note) changed = true;
            }
        }
    });
    if (!changed) return false;

    pushHistory();
    ranges.forEach((range) => {
        for (let r = range.minRow; r <= range.maxRow; r++) {
            for (let c = range.minCol; c <= range.maxCol; c++) {
                if (tableData[r]?.[c]) delete tableData[r][c].note;
            }
        }
    });
    renderTable();
    focusSelectedCell();
    return true;
}

/* ---------- Yazdırma ve PDF ---------- */

function getPrintableSheets(onlyActive) {
    captureCurrentSheet();
    const list = onlyActive ? [sheets[activeSheetIndex]] : sheets;
    return list.filter(Boolean);
}

function renderPrintPages(sheetList) {
    return sheetList.flatMap((sheet) => AwFileIO.renderSheetPages(sheet, {
        formatCell: formatCellDisplayValue,
        scale: 2
    }));
}

async function printActiveSheet() {
    const pages = renderPrintPages(getPrintableSheets(true));
    if (!pages.length) {
        showAppMessage("Bu sayfada yazdırılacak bir şey yok.");
        return false;
    }

    const isLandscape = pages[0].widthPt > pages[0].heightPt;
    const frame = document.createElement("iframe");
    frame.className = "print-frame";
    frame.setAttribute("aria-hidden", "true");
    document.body.appendChild(frame);
    const doc = frame.contentDocument;
    doc.open();
    doc.write(`<!DOCTYPE html><html><head><meta charset="utf-8"><title>${escapeHtml(sheets[activeSheetIndex]?.name ?? "awCELL")}</title>`
        + `<style>@page{size:A4 ${isLandscape ? "landscape" : "portrait"};margin:0}html,body{margin:0;padding:0}`
        + `img{display:block;width:100%;height:auto;page-break-after:always;break-after:page}img:last-child{page-break-after:auto;break-after:auto}</style></head><body>`
        + pages.map((page) => `<img src="${page.canvas.toDataURL("image/png")}" alt="">`).join("")
        + "</body></html>");
    doc.close();

    await Promise.all([...doc.images].map((image) => (image.complete ? null : new Promise((resolve) => {
        image.onload = resolve;
        image.onerror = resolve;
    }))));
    frame.contentWindow.focus();
    frame.contentWindow.print();
    setTimeout(() => frame.remove(), 60_000);
    return true;
}

function canvasToJpegBytes(canvas) {
    return new Promise((resolve, reject) => {
        canvas.toBlob(async (blob) => {
            if (!blob) {
                reject(new Error("Sayfa görüntüsü oluşturulamadı."));
                return;
            }
            resolve(new Uint8Array(await blob.arrayBuffer()));
        }, "image/jpeg", 0.92);
    });
}

async function createPdfBlob() {
    const pages = renderPrintPages(getPrintableSheets(false));
    if (!pages.length) {
        const blank = AwFileIO.renderSheetPages({
            name: "",
            rowCount: 1,
            colCount: 1,
            tableData: [[{ value: " ", style: {} }]],
            colWidths: [84],
            rowHeights: [26]
        }, { formatCell: () => "", scale: 1 });
        pages.push(...blank);
    }
    const pdfPages = [];
    for (const page of pages) {
        pdfPages.push({
            jpeg: await canvasToJpegBytes(page.canvas),
            pixelWidth: page.canvas.width,
            pixelHeight: page.canvas.height,
            widthPt: page.widthPt,
            heightPt: page.heightPt
        });
    }
    return new Blob([AwFileIO.buildPdf(pdfPages, getCurrentSaveBaseName())], { type: "application/pdf" });
}

/* ---------- Önceki oturumu geri yükleme ---------- */

const PREVIOUS_SESSION_KEY = "awcell.previousSession";

function safeStorageGet(key) {
    try {
        return localStorage.getItem(key);
    } catch {
        return null;
    }
}

function safeStorageSet(key, value) {
    try {
        localStorage.setItem(key, value);
        return true;
    } catch {
        return false;
    }
}

function safeStorageRemove(key) {
    try {
        localStorage.removeItem(key);
    } catch {
        // Depolama kapalı.
    }
}

/** Sekme kapanıp yeniden açılınca son çalışma kendiliğinden yüklenmez; geri yükleme önerilir. */
function offerPreviousSessionRestore() {
    const stored = safeStorageGet(PREVIOUS_SESSION_KEY);
    const bar = document.getElementById("restore-bar");
    if (!stored || !bar) return;

    if (!storedWorkbookHasContent(stored)) {
        safeStorageRemove(PREVIOUS_SESSION_KEY);
        return;
    }
    const payload = JSON.parse(stored);

    const savedAt = payload.savedAt ? new Date(payload.savedAt) : null;
    const when = savedAt && !Number.isNaN(savedAt.getTime())
        ? savedAt.toLocaleString("tr-TR", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" })
        : "";
    bar.querySelector(".restore-bar-text").textContent =
        `Son çalışmanız bulundu${when ? ` (${when})` : ""}. Geri yüklemek ister misiniz?`;
    bar.hidden = false;

    const close = () => {
        bar.hidden = true;
        safeStorageRemove(PREVIOUS_SESSION_KEY);
    };
    bar.querySelector(".restore-bar-restore").onclick = () => {
        close();
        try {
            isLoadingWorkbook = true;
            loadWorkbookPayload(payload);
        } finally {
            isLoadingWorkbook = false;
        }
        scheduleAutoSave();
    };
    bar.querySelector(".restore-bar-dismiss").onclick = close;
}

function storedWorkbookHasContent(text) {
    try {
        const payload = JSON.parse(text);
        return payload?.app === "awCELL" && Array.isArray(payload.sheets) &&
            payload.sheets.some((sheet, index) => !isSheetEmpty(normalizeImportedSheet(sheet, index)));
    } catch {
        return false;
    }
}

// INIT
applyViewSettings();
const isReload = isPageReload();
if (!isReload) {
    // Yeni açılışta son çalışma ayrı bir anahtara alınır; boş bir oturum eski yedeği ezmez.
    const stored = safeStorageGet(AUTOSAVE_KEY);
    if (stored && storedWorkbookHasContent(stored)) safeStorageSet(PREVIOUS_SESSION_KEY, stored);
    safeStorageRemove(AUTOSAVE_KEY);
}
if (!(isReload && loadAutoSavedWorkbook())) {
    initData();
    sheets = [createSheetState("Sayfa1")];
    recalculateAll();
    renderSheetTabs();
    renderTable();
}
isAppInitialized = true;
scheduleAutoSave();
focusSelectedCell();
if (!isReload) offerPreviousSessionRestore();

function isCellInRange(row, col, range) {
    if (!range) return false;
    if (Array.isArray(range)) {
        return range.some((item) => isCellInRange(row, col, item));
    }

    const minRow = Math.min(range.start.row, range.end.row);
    const maxRow = Math.max(range.start.row, range.end.row);
    const minCol = Math.min(range.start.col, range.end.col);
    const maxCol = Math.max(range.start.col, range.end.col);

    return (
        row >= minRow && row <= maxRow &&
        col >= minCol && col <= maxCol
    );
}

function formatChartRange(range) {
    if (Array.isArray(range)) {
        return range.map(formatChartRange).filter(Boolean).join(";");
    }
    if (!range?.start || !range?.end) return "";

    const start = getCellName(range.start.row, range.start.col);
    const end = getCellName(range.end.row, range.end.col);
    return start === end ? start : `${start}:${end}`;
}

function parseChartRangeInput(value) {
    const text = String(value ?? "").trim().toUpperCase();
    if (!text) return null;

    const ranges = text.split(";").map((part) => part.trim()).filter(Boolean).map((part) => {
        const refs = part.split(":");
        const [startRef, endRef = startRef] = refs;
        if (!startRef || refs.length > 2) return null;

        const start = cellRefToIndex(startRef);
        const end = cellRefToIndex(endRef);
        if (!isRangeWithinBounds(start, end)) return null;

        return { start, end };
    });

    if (!ranges.length || ranges.some((range) => !range)) return null;
    return ranges.length === 1 ? ranges[0] : ranges;
}

function getChartRangeValues(range, numeric = false) {
    if (!range) return null;
    if (Array.isArray(range)) {
        const values = [];
        for (const item of range) {
            const itemValues = getChartRangeValues(item, numeric);
            if (!itemValues) return null;
            values.push(...itemValues);
        }
        return values;
    }

    const minRow = Math.min(range.start.row, range.end.row);
    const maxRow = Math.max(range.start.row, range.end.row);
    const minCol = Math.min(range.start.col, range.end.col);
    const maxCol = Math.max(range.start.col, range.end.col);
    const values = [];

    for (let r = minRow; r <= maxRow; r++) {
        for (let c = minCol; c <= maxCol; c++) {
            const value = tableData[r]?.[c]?.value;
            if (!numeric) {
                values.push(value);
                continue;
            }

            const number = chartNumber(value);
            if (Number.isNaN(number)) return null;
            values.push(number);
        }
    }

    return values;
}

/** Grafik için hücre değeri: boş → 0, "3,5" → 3.5, sayı değilse NaN. */
function chartNumber(value) {
    const text = String(value ?? "").trim();
    if (text === "") return 0;
    return parseCellNumber(text) ?? NaN;
}

function createDefaultChartLabels(count) {
    return Array.from({ length: count }, () => "");
}

function createChartColor() {
    const hue = Math.floor(Math.random() * 360);
    return {
        hue,
        base: `hsl(${hue}, 72%, 45%)`,
        fill: `hsla(${hue}, 72%, 45%, 0.6)`,
        dataHighlight: `hsla(${hue}, 72%, 45%, 0.34)`,
        labelHighlight: `hsla(${hue}, 72%, 45%, 0.16)`
    };
}

function ensureChartDataColors(chart, count) {
    if (!Array.isArray(chart.dataColors)) {
        chart.dataColors = [];
    }
    while (chart.dataColors.length < count) {
        chart.dataColors.push(createChartColor());
    }
    chart.dataColors = chart.dataColors.slice(0, count);
    chart.color = chart.dataColors[0] ?? createChartColor();
}

function getHorizontalNumericChartValues(row, minCol, maxCol) {
    const values = [];
    let hasNumericValue = false;

    for (let c = minCol; c <= maxCol; c++) {
        const valueText = String(tableData[row]?.[c]?.value ?? "").trim();
        const value = chartNumber(valueText);
        if (Number.isNaN(value)) return null;
        if (valueText !== "") hasNumericValue = true;
        values.push(value);
    }

    return hasNumericValue ? values : null;
}

function getTwoRowChartSelection(range) {
    if (!range || range.maxRow - range.minRow !== 1 || range.maxCol <= range.minCol) return null;

    const bottomValues = getHorizontalNumericChartValues(range.maxRow, range.minCol, range.maxCol);
    const topValues = getHorizontalNumericChartValues(range.minRow, range.minCol, range.maxCol);
    const valueRow = bottomValues ? range.maxRow : (topValues ? range.minRow : null);
    if (valueRow === null) return null;

    const labelRow = valueRow === range.maxRow ? range.minRow : range.maxRow;
    const values = valueRow === range.maxRow ? bottomValues : topValues;
    const labels = [];

    for (let c = range.minCol; c <= range.maxCol; c++) {
        labels.push(tableData[labelRow]?.[c]?.value ?? "");
    }

    return {
        data: { labels, values },
        config: {
            xRange: {
                start: { row: labelRow, col: range.minCol },
                end: { row: labelRow, col: range.maxCol }
            },
            yRange: {
                start: { row: valueRow, col: range.minCol },
                end: { row: valueRow, col: range.maxCol }
            },
            type: "bar"
        }
    };
}

function getSingleRowLabelValueChartSelection(range) {
    if (!range || range.minRow !== range.maxRow || range.maxCol - range.minCol !== 1) return null;

    const labelText = String(tableData[range.minRow]?.[range.minCol]?.value ?? "").trim();
    if (labelText === "" || parseCellNumber(labelText) !== null) return null;

    const valueText = String(tableData[range.minRow]?.[range.maxCol]?.value ?? "").trim();
    const value = chartNumber(valueText);
    if (Number.isNaN(value)) return null;

    return {
        data: { labels: [labelText], values: [value] },
        config: {
            xRange: {
                start: { row: range.minRow, col: range.minCol },
                end: { row: range.minRow, col: range.minCol }
            },
            yRange: {
                start: { row: range.minRow, col: range.maxCol },
                end: { row: range.minRow, col: range.maxCol }
            },
            type: "bar"
        }
    };
}

function getChartDataFromSelection() {
    const range = getActiveRange();
    if (!range) return null;

    const { minRow, maxRow, minCol, maxCol } = range;
    const twoRowSelection = getTwoRowChartSelection(range);
    if (twoRowSelection) return twoRowSelection.data;
    const singleRowLabelValueSelection = getSingleRowLabelValueChartSelection(range);
    if (singleRowLabelValueSelection) return singleRowLabelValueSelection.data;

    const labels = [];
    const values = [];
    const isSingleRow = minRow === maxRow;
    const isSingleCol = minCol === maxCol;
    const hasLabelColumn = !isSingleRow && !isSingleCol && maxCol > minCol;
    const valueCol = hasLabelColumn ? minCol + 1 : minCol;

    if (isSingleRow) {
        for (let c = minCol; c <= maxCol; c++) {
            const value = chartNumber(tableData[minRow]?.[c]?.value);
            if (Number.isNaN(value)) return null;

            labels.push("");
            values.push(value);
        }
    } else {
        for (let r = minRow; r <= maxRow; r++) {
            const value = chartNumber(tableData[r]?.[valueCol]?.value);
            if (Number.isNaN(value)) return null;

            labels.push(hasLabelColumn ? tableData[r]?.[minCol]?.value : "");
            values.push(value);
        }
    }

    return { labels, values };
}

function createChartWindow(config = null, data = null, savedState = null, shouldActivate = true) {
    if (!chartWindows) return null;

    const chartNumber = savedState?.id ?? nextChartNumber++;
    nextChartNumber = Math.max(nextChartNumber, chartNumber + 1);
    const settings = {
        title: savedState?.settings?.title ?? savedState?.title ?? `Grafik ${chartNumber}`,
        titleText: savedState?.settings?.titleText ?? savedState?.title ?? `Grafik ${chartNumber}`,
        type: savedState?.settings?.type ?? config?.type ?? "bar",
        labelRangeText: savedState?.settings?.labelRangeText ?? formatChartRange(config?.xRange),
        valueRangeText: savedState?.settings?.valueRangeText ?? formatChartRange(config?.yRange),
        showGridlines: savedState?.settings?.showGridlines ?? config?.showGridlines ?? true,
        showTrendline: savedState?.settings?.showTrendline ?? config?.showTrendline ?? true,
        xAxisMin: getOptionalFiniteNumber(savedState?.settings?.xAxisMin ?? config?.xAxisMin),
        xAxisMax: getOptionalFiniteNumber(savedState?.settings?.xAxisMax ?? config?.xAxisMax),
        yAxisMin: getOptionalFiniteNumber(savedState?.settings?.yAxisMin ?? config?.yAxisMin),
        yAxisMax: getOptionalFiniteNumber(savedState?.settings?.yAxisMax ?? config?.yAxisMax),
        xAxisMinText: savedState?.settings?.xAxisMinText ?? formatChartAxisBoundText(savedState?.settings?.xAxisMin ?? config?.xAxisMin),
        xAxisMaxText: savedState?.settings?.xAxisMaxText ?? formatChartAxisBoundText(savedState?.settings?.xAxisMax ?? config?.xAxisMax),
        yAxisMinText: savedState?.settings?.yAxisMinText ?? formatChartAxisBoundText(savedState?.settings?.yAxisMin ?? config?.yAxisMin),
        yAxisMaxText: savedState?.settings?.yAxisMaxText ?? formatChartAxisBoundText(savedState?.settings?.yAxisMax ?? config?.yAxisMax)
    };
    const chart = {
        id: chartNumber,
        title: savedState?.title ?? settings.title ?? `Grafik ${chartNumber}`,
        config,
        color: savedState?.color ? { ...savedState.color } : createChartColor(),
        dataColors: Array.isArray(savedState?.dataColors) ? savedState.dataColors.map((color) => ({ ...color })) : [],
        settings,
        element: document.createElement("section"),
        canvas: document.createElement("canvas"),
        instance: null,
        restoreState: savedState?.restoreState ? { ...savedState.restoreState } : null
    };
    chart.titleReference = savedState?.titleReference ? { ...savedState.titleReference } : null;

    chart.element.className = "chart-panel";
    chart.element.style.left = `${savedState?.left ?? 96 + ((chartNumber - 1) % 6) * 28}px`;
    chart.element.style.top = `${savedState?.top ?? 64 + ((chartNumber - 1) % 6) * 28}px`;
    if (savedState?.width) chart.element.style.width = `${savedState.width}px`;
    if (savedState?.height) chart.element.style.height = `${savedState.height}px`;
    chart.element.innerHTML = `
        <div class="chart-titlebar">
            <span class="chart-window-title"></span>
            <div class="chart-window-actions">
                <button class="chart-minimize-btn" type="button" title="Simge durumuna küçült">−</button>
                <button class="chart-close-btn" type="button" title="Kapat">×</button>
            </div>
        </div>
        <div class="chart-window-body">
            <div class="chart-placeholder">Geçerli Bir Veri Aralığı Seçin</div>
        </div>
        <div class="chart-resize-handle resize-n" data-chart-resize="n"></div>
        <div class="chart-resize-handle resize-e" data-chart-resize="e"></div>
        <div class="chart-resize-handle resize-s" data-chart-resize="s"></div>
        <div class="chart-resize-handle resize-w" data-chart-resize="w"></div>
        <div class="chart-resize-handle resize-ne" data-chart-resize="ne"></div>
        <div class="chart-resize-handle resize-se" data-chart-resize="se"></div>
        <div class="chart-resize-handle resize-sw" data-chart-resize="sw"></div>
        <div class="chart-resize-handle resize-nw" data-chart-resize="nw"></div>
    `;

    chart.element.querySelector(".chart-window-title").textContent = chart.title;
    chart.element.querySelector(".chart-window-body").appendChild(chart.canvas);
    chartWindows.appendChild(chart.element);
    charts.push(chart);
    bindChartWindowEvents(chart);
    if (shouldActivate) {
        setActiveChart(chart, false);
    }

    if (data) {
        drawChart(chart, data.labels, data.values, config.type);
    } else {
        showEmptyChartPanel(chart);
    }
    if (savedState?.minimized) {
        chart.restoreState = savedState.restoreState ?? {
            left: savedState.left ?? chart.element.offsetLeft,
            top: savedState.top ?? chart.element.offsetTop,
            width: savedState.width ?? chart.element.offsetWidth,
            height: savedState.height ?? chart.element.offsetHeight
        };
        chart.element.classList.add("minimized");
        chart.element.style.width = "220px";
        chart.element.style.height = "32px";
        updateChartMinimizeButton(chart, true);
        positionMinimizedChartWindow(chart);
    }

    if (shouldActivate) {
        scheduleAutoSave();
    }
    return chart;
}

function bindChartWindowEvents(chart) {
    chart.element.addEventListener("mousedown", (e) => {
        if (e.target.closest(".chart-window-actions")) return;
        if (chart.element.classList.contains("minimized")) return;

        setActiveChart(chart);
    });

    chart.element.querySelector(".chart-close-btn")?.addEventListener("click", (e) => {
        e.stopPropagation();
        closeChartWindow(chart);
    });

    chart.element.querySelector(".chart-minimize-btn")?.addEventListener("click", (e) => {
        e.stopPropagation();
        toggleChartMinimize(chart);
    });

    chart.element.querySelector(".chart-window-actions")?.addEventListener("mousedown", (e) => {
        e.stopPropagation();
    });

    chart.element.querySelector(".chart-titlebar")?.addEventListener("mousedown", (e) => {
        if (e.button !== 0 || e.target.closest(".chart-window-actions")) return;
        if (chart.element.classList.contains("minimized")) return;

        e.preventDefault();
        e.stopPropagation();
        setActiveChart(chart);
        chartDragState = {
            chart,
            pointerX: e.clientX,
            pointerY: e.clientY,
            left: chart.element.offsetLeft,
            top: chart.element.offsetTop
        };
    });

    chart.element.querySelectorAll("[data-chart-resize]").forEach((handle) => {
        handle.addEventListener("mousedown", (e) => {
            if (e.button !== 0 || chart.element.classList.contains("minimized")) return;

            e.preventDefault();
            e.stopPropagation();
            chartResizeState = {
                chart,
                direction: handle.dataset.chartResize,
                pointerX: e.clientX,
                pointerY: e.clientY,
                left: chart.element.offsetLeft,
                top: chart.element.offsetTop,
                width: chart.element.offsetWidth,
                height: chart.element.offsetHeight
            };
        });
    });
}

function setChartTitle(chart, title) {
    if (!chart) return;

    const cleanTitle = String(title ?? "").trim() || `Grafik ${chart.id}`;
    chart.title = cleanTitle;
    chart.element.querySelector(".chart-window-title").textContent = cleanTitle;
    if (chart.instance?.data?.datasets?.[0]) {
        chart.instance.data.datasets[0].label = cleanTitle;
        chart.instance.update();
    }
    if (activeChart === chart && chartSettingsTitle) {
        chartSettingsTitle.textContent = `${cleanTitle} Ayarlar`;
    }
}

function getChartTitleReference(titleText) {
    const text = String(titleText ?? "").trim().toUpperCase();
    if (!/^\$?[A-Z]+\$?\d+$/.test(text)) return null;

    const index = cellRefToIndex(text);
    return isCellWithinBounds(index?.row, index?.col) ? index : null;
}

function resolveChartTitle(chart, titleText) {
    const reference = getChartTitleReference(titleText);
    if (!reference) return String(titleText ?? "").trim();

    return tableData[reference.row]?.[reference.col]?.value ?? "";
}

function applyChartTitle(chart, titleText) {
    if (!chart) return;

    const rawTitle = String(titleText ?? "").trim();
    const resolvedTitle = resolveChartTitle(chart, rawTitle);
    chart.titleReference = getChartTitleReference(rawTitle);
    setChartTitle(chart, resolvedTitle || `Grafik ${chart.id}`);
    chart.settings = {
        ...(chart.settings ?? {}),
        titleText: rawTitle,
        title: chart.title
    };
}

function showEmptyChartPanel(chart) {
    if (!chart?.element) return;

    chart.element.classList.add("empty");
    chart.element.classList.remove("minimized");
    updateChartMinimizeButton(chart, false);
    if (chart.instance) {
        chart.instance.destroy();
        chart.instance = null;
    }
}

function setActiveChart(chart, shouldRenderTable = true) {
    if (!chart) return;

    const previousActiveChart = activeChart;
    activeChart = chart;
    chart.element.style.zIndex = String(++chartZIndex);
    charts.forEach((item) => {
        item.element.classList.toggle("active", item === chart);
    });
    updateChartSettingsPanel();
    if (shouldRenderTable && previousActiveChart !== chart) {
        renderTable();
    }
}

function updateChartSettingsPanel() {
    if (!activeChart || !chartSettingsPanel) return;

    chartSettingsPanel.hidden = false;
    chartSettingsPanel.style.zIndex = String(++chartZIndex);
    if (chartSettingsTitle) chartSettingsTitle.textContent = `${activeChart.title} Ayarlar`;
    if (chartSettingsTitleInput) chartSettingsTitleInput.value = activeChart.settings?.titleText ?? activeChart.settings?.title ?? activeChart.title;
    setChartSettingsType(activeChart.settings?.type ?? activeChart.config?.type ?? "bar");
    if (chartSettingsLabelRangeInput) {
        chartSettingsLabelRangeInput.value = activeChart.settings?.labelRangeText ?? formatChartRange(activeChart.config?.xRange);
    }
    if (chartSettingsValueRangeInput) {
        chartSettingsValueRangeInput.value = activeChart.settings?.valueRangeText ?? formatChartRange(activeChart.config?.yRange);
    }
    if (chartSettingsGridlinesInput) {
        chartSettingsGridlinesInput.checked = activeChart.settings?.showGridlines ?? activeChart.config?.showGridlines ?? true;
    }
    if (chartSettingsTrendlineInput) {
        chartSettingsTrendlineInput.checked = activeChart.settings?.showTrendline ?? activeChart.config?.showTrendline ?? true;
    }
    if (chartSettingsXMinInput) chartSettingsXMinInput.value = activeChart.settings?.xAxisMinText ?? "";
    if (chartSettingsXMaxInput) chartSettingsXMaxInput.value = activeChart.settings?.xAxisMaxText ?? "";
    if (chartSettingsYMinInput) chartSettingsYMinInput.value = activeChart.settings?.yAxisMinText ?? "";
    if (chartSettingsYMaxInput) chartSettingsYMaxInput.value = activeChart.settings?.yAxisMaxText ?? "";
    positionMinimizedChartWindows();
}

function getChartSettingsType() {
    return chartSettingsTypeInput?.dataset.value ?? "bar";
}

function setChartSettingsType(type) {
    const safeType = CHART_TYPES.includes(type) ? type : "bar";
    const selectedOption = chartSettingsTypeMenu?.querySelector(`[data-chart-type="${safeType}"]`);

    if (chartSettingsTypeInput) chartSettingsTypeInput.dataset.value = safeType;
    if (chartSettingsTypeBtn && selectedOption) {
        chartSettingsTypeBtn.innerHTML = selectedOption.innerHTML;
    }
    chartSettingsTypeMenu?.querySelectorAll("[data-chart-type]").forEach((button) => {
        const isActive = button.dataset.chartType === safeType;
        button.classList.toggle("active", isActive);
        button.setAttribute("aria-selected", String(isActive));
    });
    updateChartGridlinesVisibility(safeType);
}

function updateChartGridlinesVisibility(type = getChartSettingsType()) {
    if (!chartSettingsGridlinesField) return;

    chartSettingsGridlinesField.hidden = ["pie", "doughnut"].includes(type);
    if (chartSettingsTrendlineField) {
        chartSettingsTrendlineField.hidden = type !== "scatter";
    }
    if (chartSettingsAxisBounds) {
        chartSettingsAxisBounds.hidden = type !== "scatter";
    }
}

function closeChartSettingsPanel() {
    if (!chartSettingsPanel) return;

    chartSettingsPanel.hidden = true;
    positionMinimizedChartWindows();
}

function clearChartWorkspace() {
    charts.forEach((chart) => {
        chart.instance?.destroy();
    });
    charts = [];
    activeChart = null;
    chartDragState = null;
    chartResizeState = null;
    nextChartNumber = 1;
    chartWindows?.replaceChildren();
    closeChartSettingsPanel();
}

function restoreChartWorkspace(savedCharts = [], savedActiveChartId = null) {
    if (!Array.isArray(savedCharts) || savedCharts.length === 0) return;

    const restoredCharts = savedCharts
        .map(cloneSavedChartState)
        .filter(Boolean)
        .map((savedChart) => {
            const data = savedChart.config ? buildChartDataFromConfig(savedChart.config) : null;
            return createChartWindow(savedChart.config, data, savedChart, false);
        })
        .filter(Boolean);

    restoredCharts
        .filter((chart) => chart.element.classList.contains("minimized"))
        .forEach(positionMinimizedChartWindow);

    const activeSavedChartId = Number(savedActiveChartId);
    const activeSavedChart = restoredCharts.find((chart) => chart.id === activeSavedChartId);
    if (activeSavedChart && !activeSavedChart.element.classList.contains("minimized")) {
        setActiveChart(activeSavedChart, false);
    } else {
        closeChartSettingsPanel();
    }
}

function clearActiveChart(chart, shouldRenderTable = true) {
    if (activeChart !== chart) return;

    activeChart = null;
    charts.forEach((item) => {
        item.element.classList.remove("active");
    });
    closeChartSettingsPanel();
    if (shouldRenderTable) {
        renderTable();
    }
}

function getScatterTrendlineData(points) {
    if (!Array.isArray(points) || points.length < 2) return null;

    const validPoints = points.filter((point) => Number.isFinite(point.x) && Number.isFinite(point.y));
    if (validPoints.length < 2) return null;

    const n = validPoints.length;
    const sumX = validPoints.reduce((sum, point) => sum + point.x, 0);
    const sumY = validPoints.reduce((sum, point) => sum + point.y, 0);
    const sumXY = validPoints.reduce((sum, point) => sum + point.x * point.y, 0);
    const sumXX = validPoints.reduce((sum, point) => sum + point.x * point.x, 0);
    const denominator = n * sumXX - sumX * sumX;
    if (denominator === 0) return null;

    const slope = (n * sumXY - sumX * sumY) / denominator;
    const intercept = (sumY - slope * sumX) / n;
    const minX = Math.min(...validPoints.map((point) => point.x));
    const maxX = Math.max(...validPoints.map((point) => point.x));

    return [
        { x: minX, y: slope * minX + intercept },
        { x: maxX, y: slope * maxX + intercept }
    ];
}

function getNiceChartStep(value, shouldRound) {
    if (!Number.isFinite(value) || value <= 0) return 1;

    const exponent = Math.floor(Math.log10(value));
    const fraction = value / (10 ** exponent);
    let niceFraction;

    if (shouldRound) {
        if (fraction < 1.5) niceFraction = 1;
        else if (fraction < 3) niceFraction = 2;
        else if (fraction < 7) niceFraction = 5;
        else niceFraction = 10;
    } else if (fraction <= 1) {
        niceFraction = 1;
    } else if (fraction <= 2) {
        niceFraction = 2;
    } else if (fraction <= 5) {
        niceFraction = 5;
    } else {
        niceFraction = 10;
    }

    return niceFraction * (10 ** exponent);
}

function getNiceChartAxisBounds(min, max, targetTickCount = 6) {
    if (!Number.isFinite(min) || !Number.isFinite(max)) {
        return { min, max, stepSize: undefined, precision: undefined };
    }

    const paddingBase = max - min;
    const padding = paddingBase === 0
        ? Math.max(Math.abs(min), Math.abs(max), 1) * 0.08
        : Math.abs(paddingBase) * 0.08;
    const paddedMin = min - padding;
    const paddedMax = max + padding;
    const niceRange = getNiceChartStep(paddedMax - paddedMin, false);
    const stepSize = getNiceChartStep(niceRange / Math.max(targetTickCount - 1, 1), true);
    const niceMin = Math.floor(paddedMin / stepSize) * stepSize;
    const niceMax = Math.ceil(paddedMax / stepSize) * stepSize;

    return {
        min: niceMin,
        max: niceMax,
        stepSize,
        precision: stepSize >= 1 ? 0 : undefined
    };
}

function parseChartAxisBoundInput(value) {
    const text = String(value ?? "").trim();
    if (!text) return null;

    const compactText = text.replace(/\s+/g, "");
    let normalizedText = compactText;

    if (compactText.includes(",")) {
        normalizedText = compactText.replace(/\./g, "").replace(",", ".");
    } else if ((compactText.match(/\./g) ?? []).length > 1 || /^\d{1,3}(\.\d{3})+$/.test(compactText)) {
        normalizedText = compactText.replace(/\./g, "");
    }

    const number = Number(normalizedText);
    return Number.isFinite(number) ? number : null;
}

function getManualAxisBounds(config) {
    const xMin = getOptionalFiniteNumber(config?.xAxisMin);
    const xMax = getOptionalFiniteNumber(config?.xAxisMax);
    const yMin = getOptionalFiniteNumber(config?.yAxisMin);
    const yMax = getOptionalFiniteNumber(config?.yAxisMax);

    return {
        xMin: xMin !== null && (xMax === null || xMin < xMax) ? xMin : null,
        xMax: xMax !== null && (xMin === null || xMax > xMin) ? xMax : null,
        yMin: yMin !== null && (yMax === null || yMin < yMax) ? yMin : null,
        yMax: yMax !== null && (yMin === null || yMax > yMin) ? yMax : null
    };
}

function drawChart(chart, labels, values, type) {
    chart.element.classList.remove("empty", "minimized");
    updateChartMinimizeButton(chart, false);
    const hasVisibleLabels = labels.some((label) => String(label ?? "").trim() !== "");
    const minValue = Math.min(...values);
    const maxValue = Math.max(...values);
    const chartType = type === "horizontalBar" ? "bar" : (type === "area" ? "line" : type);
    const hasCartesianScale = !["pie", "doughnut", "radar"].includes(chartType);
    const showGridlines = chart.config?.showGridlines ?? chart.settings?.showGridlines ?? true;
    const showTrendline = chart.config?.showTrendline ?? chart.settings?.showTrendline ?? true;
    const numericLabels = labels.map((label) => parseCellNumber(label) ?? NaN);
    const hasNumericScatterLabels = type === "scatter" && numericLabels.every((value) => Number.isFinite(value));
    const scatterXValues = values.map((_, index) => hasNumericScatterLabels ? numericLabels[index] : index + 1);
    const scatterData = values.map((value, index) => ({
        x: scatterXValues[index],
        y: value
    }));
    const scatterTrendlineData = type === "scatter" && showTrendline ? getScatterTrendlineData(scatterData) : null;
    const trendlineYValues = scatterTrendlineData?.map((point) => point.y) ?? [];
    const chartMinValue = type === "scatter" && trendlineYValues.length
        ? Math.min(minValue, ...trendlineYValues)
        : minValue;
    const chartMaxValue = type === "scatter" && trendlineYValues.length
        ? Math.max(maxValue, ...trendlineYValues)
        : maxValue;
    const minScatterX = Math.min(...scatterXValues);
    const maxScatterX = Math.max(...scatterXValues);
    const manualAxisBounds = getManualAxisBounds(chart.config);
    const autoScatterXBounds = getNiceChartAxisBounds(minScatterX, maxScatterX);
    const autoScatterYBounds = getNiceChartAxisBounds(chartMinValue, chartMaxValue);
    const scatterXBounds = {
        ...autoScatterXBounds,
        min: manualAxisBounds.xMin ?? autoScatterXBounds.min,
        max: manualAxisBounds.xMax ?? autoScatterXBounds.max
    };
    const scatterYBounds = {
        ...autoScatterYBounds,
        min: manualAxisBounds.yMin ?? autoScatterYBounds.min,
        max: manualAxisBounds.yMax ?? autoScatterYBounds.max
    };
    ensureChartDataColors(chart, values.length);
    const pointColors = chart.dataColors.map((color) => color.fill);
    const pointBorderColors = chart.dataColors.map((color) => color.base);
    const blackStrokeTypes = ["bar", "horizontalBar", "line", "area", "pie", "doughnut"];
    const arcLegendLabels = Chart.overrides?.[chartType]?.plugins?.legend?.labels;
    const arcLegendOnClick = Chart.overrides?.[chartType]?.plugins?.legend?.onClick;
    const chartLabelPlugin = {
        id: "awcellChartLabels",
        afterDatasetsDraw(chartInstance) {
            if (!hasVisibleLabels || !["pie", "doughnut"].includes(chartType)) return;

            const { ctx } = chartInstance;
            const meta = chartInstance.getDatasetMeta(0);
            ctx.save();
            ctx.font = "600 12px Arial, sans-serif";
            meta.data.forEach((element, index) => {
                if (!chartInstance.getDataVisibility(index)) return;

                const label = String(chartInstance.data.labels[index] ?? "").trim();
                if (!label) return;

                const text = label.length > 16 ? `${label.slice(0, 15)}...` : label;
                const { x, y } = element.tooltipPosition();
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";

                ctx.lineWidth = 3;
                ctx.strokeStyle = "rgba(255,255,255,0.85)";
                ctx.fillStyle = "#202124";
                ctx.strokeText(text, x, y);
                ctx.fillText(text, x, y);
            });
            ctx.restore();
        }
    };

    if (chart.instance) {
        chart.instance.destroy();
    }

    chart.instance = new Chart(chart.canvas, {
        type: chartType,
        data: {
            labels,
            datasets: [{
                label: chart.title,
                data: type === "scatter" ? scatterData : values,
                backgroundColor: type === "area" ? chart.color?.fill : pointColors,
                borderColor: blackStrokeTypes.includes(type) ? "#000000" : pointBorderColors,
                borderWidth: type === "line" || type === "area" ? 2 : 1,
                fill: type === "area",
                showLine: type === "line" || type === "area",
                tension: 0,
                pointBackgroundColor: pointBorderColors,
                pointBorderColor: type === "line" || type === "area" ? "#000000" : pointBorderColors
            }, ...(scatterTrendlineData ? [{
                label: "Eğilim çizgisi",
                data: scatterTrendlineData,
                type: "line",
                borderColor: "#000000",
                borderWidth: 2,
                borderDash: [6, 4],
                backgroundColor: "transparent",
                fill: false,
                pointRadius: 0,
                pointHitRadius: 0,
                tension: 0
            }] : [])]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: type === "horizontalBar" ? "y" : "x",
            plugins: {
                legend: {
                    display: (["pie", "doughnut"].includes(chartType) && hasVisibleLabels) || type === "line",
                    labels: {
                        generateLabels(chartInstance) {
                            if (type !== "line") {
                                return arcLegendLabels?.generateLabels
                                    ? arcLegendLabels.generateLabels(chartInstance)
                                    : Chart.defaults.plugins.legend.labels.generateLabels(chartInstance);
                            }

                            const defaultLabels = Chart.defaults.plugins.legend.labels.generateLabels(chartInstance);
                            const datasetLabel = defaultLabels[0];
                            return [
                                datasetLabel,
                                {
                                    ...datasetLabel,
                                    text: "Çizgi",
                                    hidden: chartInstance.data.datasets[0]?.showLine === false,
                                    datasetIndex: 0,
                                    lineOnly: true
                                }
                            ];
                        }
                    },
                    onClick(e, legendItem, legend) {
                        if (type !== "line") {
                            if (arcLegendOnClick) {
                                arcLegendOnClick(e, legendItem, legend);
                            } else {
                                Chart.defaults.plugins.legend.onClick(e, legendItem, legend);
                            }
                            return;
                        }

                        if (!legendItem.lineOnly) {
                            Chart.defaults.plugins.legend.onClick(e, legendItem, legend);
                            return;
                        }

                        const dataset = legend.chart.data.datasets[legendItem.datasetIndex];
                        dataset.showLine = dataset.showLine === false;
                        legend.chart.update();
                    }
                }
            },
            scales: chartType === "radar" ? {
                r: {
                    beginAtZero: minValue >= 0,
                    grid: {
                        display: showGridlines
                    },
                    angleLines: {
                        display: showGridlines
                    },
                    pointLabels: {
                        display: hasVisibleLabels
                    }
                }
            } : (!hasCartesianScale ? {} : {
                x: {
                    min: type === "scatter" ? scatterXBounds.min : undefined,
                    max: type === "scatter" ? scatterXBounds.max : undefined,
                    beginAtZero: type === "horizontalBar",
                    grid: {
                        display: showGridlines
                    },
                    ticks: {
                        display: type === "horizontalBar" || type === "scatter" ? true : hasVisibleLabels,
                        stepSize: type === "scatter" ? scatterXBounds.stepSize : undefined,
                        precision: type === "scatter" ? scatterXBounds.precision : undefined
                    }
                },
                y: {
                    min: type === "scatter" ? scatterYBounds.min : undefined,
                    max: type === "scatter" ? scatterYBounds.max : undefined,
                    beginAtZero: type !== "scatter" && type !== "horizontalBar",
                    grid: {
                        display: showGridlines
                    },
                    ticks: {
                        display: type === "horizontalBar" ? hasVisibleLabels : true,
                        stepSize: type === "scatter" ? scatterYBounds.stepSize : undefined,
                        precision: type === "scatter" ? scatterYBounds.precision : undefined
                    }
                }
            })
        },
        plugins: hasVisibleLabels && ["pie", "doughnut"].includes(chartType) ? [chartLabelPlugin] : []
    });
}

function buildChartDataFromConfig(config) {
    if (!config?.yRange) return null;

    const values = getChartRangeValues(config.yRange, true);
    if (!values || values.length === 0) return null;

    const labelValues = config.xRange ? getChartRangeValues(config.xRange) : null;
    const labels = labelValues?.length === values.length
        ? labelValues
        : createDefaultChartLabels(values.length);

    return { labels, values };
}

function refreshChartFromConfig(chart) {
    if (!chart?.config) return;
    if (chart.element.classList.contains("minimized")) return;

    const data = buildChartDataFromConfig(chart.config);
    if (!data) {
        showEmptyChartPanel(chart);
        return;
    }

    drawChart(chart, data.labels, data.values, chart.config.type);
}

function refreshChartsFromConfigs() {
    charts.forEach(refreshChartFromConfig);
}

function getChartDependencySignature(chart) {
    if (!chart?.config) return null;

    const titleValue = chart.titleReference
        ? tableData[chart.titleReference.row]?.[chart.titleReference.col]?.value ?? ""
        : "";
    const labels = chart.config.xRange ? getChartRangeValues(chart.config.xRange) : null;
    const values = chart.config.yRange ? getChartRangeValues(chart.config.yRange, true) : null;

    return JSON.stringify({ titleValue, labels, values });
}

function captureChartDependencySignatures() {
    if (!charts.length) return null;

    return new Map(charts.map((chart) => [chart, getChartDependencySignature(chart)]));
}

function refreshChartsWithChangedCalculatedValues(previousSignatures) {
    if (!previousSignatures) return;

    charts.forEach((chart) => {
        if (!previousSignatures.has(chart)) return;

        const previousSignature = previousSignatures.get(chart);
        const nextSignature = getChartDependencySignature(chart);
        if (previousSignature === nextSignature) return;

        if (chart.titleReference) {
            applyChartTitle(chart, chart.settings?.titleText ?? chart.title);
        }
        refreshChartFromConfig(chart);
    });
}

function chartUsesCell(chart, row, col) {
    return (
        (chart.titleReference?.row === row && chart.titleReference?.col === col) ||
        isCellInRange(row, col, chart.config?.xRange) ||
        isCellInRange(row, col, chart.config?.yRange)
    );
}

function chartRangeIntersects(range, chartRange) {
    if (!range || !chartRange) return false;
    if (Array.isArray(chartRange)) {
        return chartRange.some((item) => chartRangeIntersects(range, item));
    }

    const normalizedChartRange = {
        minRow: Math.min(chartRange.start.row, chartRange.end.row),
        maxRow: Math.max(chartRange.start.row, chartRange.end.row),
        minCol: Math.min(chartRange.start.col, chartRange.end.col),
        maxCol: Math.max(chartRange.start.col, chartRange.end.col)
    };

    return !(
        range.maxRow < normalizedChartRange.minRow ||
        range.minRow > normalizedChartRange.maxRow ||
        range.maxCol < normalizedChartRange.minCol ||
        range.minCol > normalizedChartRange.maxCol
    );
}

function chartUsesRange(chart, range) {
    return (
        chartRangeIntersects(range, chart.config?.xRange) ||
        chartRangeIntersects(range, chart.config?.yRange) ||
        (
            chart.titleReference &&
            chart.titleReference.row >= range.minRow &&
            chart.titleReference.row <= range.maxRow &&
            chart.titleReference.col >= range.minCol &&
            chart.titleReference.col <= range.maxCol
        )
    );
}

function refreshChartsForChangedCell(row, col) {
    charts.forEach((chart) => {
        if (!chartUsesCell(chart, row, col)) return;

        if (chart.titleReference?.row === row && chart.titleReference?.col === col) {
            applyChartTitle(chart, chart.settings?.titleText ?? chart.title);
        }
        refreshChartFromConfig(chart);
    });
}

function refreshChartsForChangedRange(range) {
    charts.forEach((chart) => {
        if (!chartUsesRange(chart, range)) return;

        if (
            chart.titleReference &&
            chart.titleReference.row >= range.minRow &&
            chart.titleReference.row <= range.maxRow &&
            chart.titleReference.col >= range.minCol &&
            chart.titleReference.col <= range.maxCol
        ) {
            applyChartTitle(chart, chart.settings?.titleText ?? chart.title);
        }
        refreshChartFromConfig(chart);
    });
}

function applyChartSettingsFromPanel() {
    if (!activeChart) return;

    const type = getChartSettingsType();
    const title = chartSettingsTitleInput?.value ?? activeChart.title;
    const labelRangeText = chartSettingsLabelRangeInput?.value ?? "";
    const valueRangeText = chartSettingsValueRangeInput?.value ?? "";
    const showGridlines = chartSettingsGridlinesInput?.checked ?? true;
    const showTrendline = chartSettingsTrendlineInput?.checked ?? true;
    const xAxisMinText = chartSettingsXMinInput?.value ?? "";
    const xAxisMaxText = chartSettingsXMaxInput?.value ?? "";
    const yAxisMinText = chartSettingsYMinInput?.value ?? "";
    const yAxisMaxText = chartSettingsYMaxInput?.value ?? "";
    const xAxisMin = parseChartAxisBoundInput(xAxisMinText);
    const xAxisMax = parseChartAxisBoundInput(xAxisMaxText);
    const yAxisMin = parseChartAxisBoundInput(yAxisMinText);
    const yAxisMax = parseChartAxisBoundInput(yAxisMaxText);
    const xRange = labelRangeText.trim() ? parseChartRangeInput(labelRangeText) : null;
    const yRange = parseChartRangeInput(valueRangeText);

    applyChartTitle(activeChart, title);
    activeChart.settings = {
        ...(activeChart.settings ?? {}),
        type,
        labelRangeText,
        valueRangeText,
        showGridlines,
        showTrendline,
        xAxisMin,
        xAxisMax,
        yAxisMin,
        yAxisMax,
        xAxisMinText,
        xAxisMaxText,
        yAxisMinText,
        yAxisMaxText
    };

    if ((labelRangeText.trim() && !xRange) || !yRange) {
        activeChart.config = null;
        showEmptyChartPanel(activeChart);
        renderTable();
        scheduleAutoSave();
        return;
    }

    activeChart.config = { xRange, yRange, type, showGridlines, showTrendline, xAxisMin, xAxisMax, yAxisMin, yAxisMax };
    refreshChartFromConfig(activeChart);
    renderTable();
    scheduleAutoSave();
}

function updateChartTitleFromPanel() {
    if (!activeChart) return;

    applyChartTitle(activeChart, chartSettingsTitleInput?.value ?? activeChart.title);
    scheduleAutoSave();
}

function clearSelectionRangeAfterChartInsert() {
    selectionRange = null;
    extraSelections = [];
    selectionMode = "cell";
}

function insertChartFromSelection() {
    const data = getChartDataFromSelection();
    if (!data) {
        createChartWindow();
        clearSelectionRangeAfterChartInsert();
        renderTable();
        return;
    }

    const range = getActiveRange();
    const twoRowSelection = getTwoRowChartSelection(range);
    if (twoRowSelection) {
        createChartWindow(twoRowSelection.config, twoRowSelection.data);
        clearSelectionRangeAfterChartInsert();
        renderTable();
        return;
    }
    const singleRowLabelValueSelection = getSingleRowLabelValueChartSelection(range);
    if (singleRowLabelValueSelection) {
        createChartWindow(singleRowLabelValueSelection.config, singleRowLabelValueSelection.data);
        clearSelectionRangeAfterChartInsert();
        renderTable();
        return;
    }

    const isSingleRow = range.minRow === range.maxRow;
    const isSingleCol = range.minCol === range.maxCol;
    const hasLabelColumn = !isSingleRow && !isSingleCol && range.maxCol > range.minCol;
    const config = {
        xRange: hasLabelColumn ? {
            start: { row: range.minRow, col: range.minCol },
            end: { row: range.maxRow, col: range.minCol }
        } : null,
        yRange: {
            start: { row: range.minRow, col: hasLabelColumn ? range.minCol + 1 : range.minCol },
            end: {
                row: range.maxRow,
                col: isSingleRow ? range.maxCol : (hasLabelColumn ? range.minCol + 1 : range.minCol)
            }
        },
        type: "bar"
    };
    createChartWindow(config, data);
    clearSelectionRangeAfterChartInsert();
    renderTable();
}

function closeChartWindow(chart) {
    if (!chart) return;

    clearActiveChart(chart);
    if (chart.instance) {
        chart.instance.destroy();
    }
    chart.element.remove();
    charts = charts.filter((item) => item !== chart);
    chartDragState = null;
    chartResizeState = null;
    charts
        .filter((item) => item.element.classList.contains("minimized"))
        .forEach(positionMinimizedChartWindow);
    renderTable();
    scheduleAutoSave();
}

function updateChartMinimizeButton(chart, isMinimized) {
    const button = chart.element.querySelector(".chart-minimize-btn");
    if (!button) return;

    if (isMinimized) {
        button.innerHTML = `
            <svg class="chart-restore-icon" viewBox="0 0 24 24" aria-hidden="true">
                <rect x="6" y="4.5" width="12" height="11" rx="1.2" fill="none" stroke="currentColor" stroke-width="1.8" />
            </svg>
        `;
    } else {
        button.textContent = "−";
    }
    button.title = isMinimized ? "Geri yükle" : "Simge durumuna küçült";
}

function toggleChartMinimize(chart) {
    if (!chart?.element) return;

    if (chart.element.classList.contains("minimized")) {
        chart.element.classList.remove("minimized");
        if (chart.restoreState) {
            chart.element.style.left = `${chart.restoreState.left}px`;
            chart.element.style.top = `${chart.restoreState.top}px`;
            chart.element.style.width = `${chart.restoreState.width}px`;
            chart.element.style.height = `${chart.restoreState.height}px`;
        }
        updateChartMinimizeButton(chart, false);
        refreshChartFromConfig(chart);
        chart.instance?.resize();
        setActiveChart(chart);
        scheduleAutoSave();
        return;
    }

    chart.restoreState = {
        left: chart.element.offsetLeft,
        top: chart.element.offsetTop,
        width: chart.element.offsetWidth,
        height: chart.element.offsetHeight
    };
    chart.element.classList.add("minimized");
    chart.element.style.width = "220px";
    chart.element.style.height = "32px";
    updateChartMinimizeButton(chart, true);
    clearActiveChart(chart);
    positionMinimizedChartWindows();
    scheduleAutoSave();
}

function clampChartWindowPosition(chart, left, top) {
    if (!tableArea || !chart?.element) return { left, top };

    const maxLeft = Math.max(0, tableArea.scrollLeft + tableArea.clientWidth - chart.element.offsetWidth);
    const maxTop = Math.max(0, tableArea.scrollTop + tableArea.clientHeight - chart.element.offsetHeight);
    return {
        left: Math.max(tableArea.scrollLeft, Math.min(left, maxLeft)),
        top: Math.max(tableArea.scrollTop, Math.min(top, maxTop))
    };
}

function getMinimizedChartIndex(chart) {
    return charts.filter((item) => item.element.classList.contains("minimized")).indexOf(chart);
}

function positionMinimizedChartWindows() {
    requestAnimationFrame(() => {
        charts
            .filter((item) => item.element.classList.contains("minimized"))
            .forEach(positionMinimizedChartWindow);
    });
}

function positionMinimizedChartWindow(chart) {
    if (!tableArea || !chart?.element) return;

    const index = Math.max(0, getMinimizedChartIndex(chart));
    const width = chart.element.offsetWidth;
    const height = chart.element.offsetHeight;
    const left = tableArea.scrollLeft + tableArea.clientWidth - width - 12;
    const top = tableArea.scrollTop + tableArea.clientHeight - height - 12 - (index * (height + 6));
    const position = clampChartWindowPosition(chart, left, top);
    chart.element.style.left = `${position.left}px`;
    chart.element.style.top = `${position.top}px`;
}

function resizeChartWindow(e) {
    if (!chartResizeState || !tableArea) return;

    const dx = e.clientX - chartResizeState.pointerX;
    const dy = e.clientY - chartResizeState.pointerY;
    const chart = chartResizeState.chart;
    const direction = chartResizeState.direction;
    const minWidth = 280;
    const minHeight = 180;
    const maxWidth = Math.max(minWidth, tableArea.clientWidth - 16);
    const maxHeight = Math.max(minHeight, tableArea.clientHeight - 16);
    let left = chartResizeState.left;
    let top = chartResizeState.top;
    let width = chartResizeState.width;
    let height = chartResizeState.height;

    if (direction.includes("e")) {
        width = Math.max(minWidth, Math.min(maxWidth, chartResizeState.width + dx));
    }
    if (direction.includes("s")) {
        height = Math.max(minHeight, Math.min(maxHeight, chartResizeState.height + dy));
    }
    if (direction.includes("w")) {
        width = Math.max(minWidth, Math.min(maxWidth, chartResizeState.width - dx));
        left = chartResizeState.left + chartResizeState.width - width;
    }
    if (direction.includes("n")) {
        height = Math.max(minHeight, Math.min(maxHeight, chartResizeState.height - dy));
        top = chartResizeState.top + chartResizeState.height - height;
    }

    const position = clampChartWindowPosition(chart, left, top);
    chart.element.style.left = `${position.left}px`;
    chart.element.style.top = `${position.top}px`;
    chart.element.style.width = `${width}px`;
    chart.element.style.height = `${height}px`;
    chart.instance?.resize();
}
