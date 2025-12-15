## Perubahan yang akan dilakukan:

### 1. Modifikasi Header Tabel (lines 442-470)
- Hapus kolom: Duration (Mo), Weight (%), Avg Progress, Yearly Impact
- Tambah kolom: "Bulan Ini" dan "sd. Bulan ini"

### 2. Modifikasi Body Tabel (lines 472-604)
- Hapus TableCell untuk kolom yang dihapus
- Tambah 2 TableCell baru untuk "Bulan Ini" dan "sd. Bulan ini"

### 3. Tambah Fungsi Helper
- Buat fungsi `getCurrentMonthProgress()` untuk mengambil progress bulan ini dari `monthly_progress`
- Buat fungsi `getCumulativeProgressUntilCurrentMonth()` untuk menghitung progress kumulatif sampai bulan ini

### 4. Update Width Classes
- Sesuaikan lebar kolom yang tersisa agar proporsional

**Data yang akan ditampilkan:**
- "Bulan Ini": Progress untuk bulan dan tahun saat ini dari `monthly_progress`
- "sd. Bulan ini": Total progress kumulatif dari awal sampai bulan ini

Perubahan ini memanfaatkan data `monthly_progress` yang sudah tersedia dalam interface ActionPlan.