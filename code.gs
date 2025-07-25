const SS_ID = "1dA6sUr9wQXpfmNCB4hx6fbDvp3EmpeQuDShKg7EK4a8";
const SHEET_NAME = "AYDA 88";

const ss = SpreadsheetApp.openById(SS_ID);
const sheet = ss.getSheetByName(SHEET_NAME);

function setupOnce() {
  const props = PropertiesService.getScriptProperties();
  const setupDone = props.getProperty("formattedColumn");

  if (setupDone) {
    return;
  }
  sheet.getRange("I:I").setNumberFormat("#,##0");

  props.setProperty("formattedColumn", "true");
  Logger.log("Column formatting applied.");
}

function doPost(e) {
  setupOnce();
  try {
    const data = JSON.parse(e.postData.contents);

    // Simpan ke Google Sheets
    const row = [
      data.tangalin,
      data.namaD,
      data.NOPOL,
      data.NOKON,
      data.bankd,
      data.norekd,
      data.namaBTB,
      data.ketd,
      data.notf,
      data.cab,
      data.fileLink
    ];

    const lock = LockService.getScriptLock();
    lock.waitLock(2000);

    const props = PropertiesService.getScriptProperties();
    let nextRow = Number(props.getProperty('NEXT_ROW'));
    if (!nextRow) {
      // First time only: pay the cost once
      nextRow = sheet.getLastRow() + 1;
    }

    sheet.getRange(nextRow, 1, 1, row.length).setValues([row]);

    // Bump the counter
    props.setProperty('NEXT_ROW', String(nextRow + 1));
    lock.releaseLock();

    return ContentService.createTextOutput(
      JSON.stringify({ success: true, message: "Data berhasil dikirim" })
    )
    .setMimeType(ContentService.MimeType.JSON)

  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ success: false, message: err })
    )
    .setMimeType(ContentService.MimeType.JSON)
  }
}

function doOptions() {
  return ContentService.createTextOutput("")
    .setHeaders({
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    });
}
