function doPost(e) {

  try {
    const data = JSON.parse(e.postData.contents);

    // Simpan file ke Google Drive
    let fileUrl = "", fileId = "";
    if (data.file && data.mimeType && data.filename) {
      const fileBlob = Utilities.newBlob(
        Utilities.base64Decode(data.file),
        data.mimeType,
        data.filename
      );
      const folder = DriveApp.getFolderById("146pYLo88z3GsZOf4FRiOdyxNQKUnAeOM");
      const file = folder.createFile(fileBlob);
      file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
      fileUrl = file.getUrl();
      fileId = file.getId();
    }

    // Simpan ke Google Sheets
    const ss = SpreadsheetApp.openById("1dA6sUr9wQXpfmNCB4hx6fbDvp3EmpeQuDShKg7EK4a8");
    const sheet = ss.getSheetByName("AYDA 88");
    sheet.appendRow([
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
      fileUrl
    ]);

    const lastRow = sheet.getLastRow();
    sheet.getRange(lastRow, 9).setNumberFormat("#,##0");

    return ContentService.createTextOutput(
      JSON.stringify({ success: true, message: "Data berhasil dikirim", fileUrl })
    )
    .setMimeType(ContentService.MimeType.JSON)

  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ success: false, message: "Data gagal dikirim" })
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
