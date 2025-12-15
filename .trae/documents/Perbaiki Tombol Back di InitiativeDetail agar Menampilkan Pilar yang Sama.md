## Rencana Perbaikan Konsistensi Data

### Masalah Utama:

Data pada tabel dan modal ActionPlan menampilkan nilai yang berbeda karena:

1. **Sumber data berbeda** - tabel pakai data backend, modal hitung ulang di frontend
2. **Transformasi data tidak konsisten** - format monthly progress berbeda
3. **Perhitungan metrics berbeda** - backend vs frontend calculation logic
4. **Timing refresh data** - modal tidak selalu dapat data terbaru

### Solusi yang Akan Diimplementasikan:

#### 1. **Standardisasi Sumber Data**

* Pastikan modal menggunakan data yang sama dengan tabel

* Tambahkan computed fields dari backend ke modal state

* Hapus perhitungan duplikat di frontend

#### 2. **Sinkronisasi Transformasi Data**

* Standardisasi format monthly progress di seluruh aplikasi

* Pastikan transformasi `monthly_progress` → `monthly_progress_inputs` konsisten

* Tambahkan validasi untuk memastikan data integrity

#### 3. **Perbaikan Flow Data**

* Pastikan modal menerima data terbaru setelah operasi CRUD

* Tambahkan mekanisme refresh otomatis untuk modal

* Perbaiki state management untuk menghindari stale data

#### 4. **Testing & Validation**

* Tambahkan validasi untuk memastikan konsistensi data

* Test semua skenario CRUD untuk memastikan sinkronisasi

* Verifikasi perhitungan metrics sama antara backend dan frontend

### File yang Akan Dimodifikasi:

* `ActionPlanModal.tsx` - standardisasi data source dan transformasi

* `InitiativeDetail.tsx` - perbaikan data flow dan refresh logic

* `calculations.ts` - sinkronisasi calculation logic dengan backend

