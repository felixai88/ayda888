
# JANGAN LUPA GANTI
- di code.gs: ID SPREADSHEET
- di code.gs: NAMA SPREADSHEET
- di html: GS_URL
- di html: ganti CLIENT_ID
- di html: FOLDER_ID

# Cara Penggunaan
- Untuk upload file ke Google Drive, email harus terdaftar di console.cloud.google oleh pemilik
- Login dengan akun yang bisa mengakses ke API Google Drive (max 100 akun)
- Setelah login akan dapat "access token" dengan expiry 1 jam.
- Jika lewat 1 jam, token akan expired dan harus login lagi. (Loginnya mudah. cuma 2 click saja)
- Jika Upload ke Google Drive gagal, maka data lainnya juga tidak akan masuk ke spreadsheet. (bisa di kirim ulang lagi)

# Boost speed: 7-8 detik => 2-3 detik
- Ganti function call yang berat menjadi function call yg ringan di code.gs (appendRow => setValues)
- Ganti metode upload file, dari yang mengupload menggunakan "base64" menjadi "Google Drive API"
- Langsung Upload file ke Google Drive segera setelah file di input (tidak menunggu submission)
- Hapus/Ganti code yang tidak dipakai

# Boost Speed Alternative: MultiThread Concept 2-3 detik => ~0.5 detik
- Bisa menginput data lain selagi submission masih diproses

# Addictional Features
- Ada Animasi supaya tau kapan proses selesai/gagal
- Ada Resend button
- Ada History submission (sementara, karena tidak pakai backend)
