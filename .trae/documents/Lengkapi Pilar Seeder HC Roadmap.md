## Analisis Lengkap

* **Current State**: Seeder hanya memiliki 2 pilar (1-2) dengan data spesifik
* **Target**: Dashboard memiliki 5 pilar (1-5) dengan data lengkap setiap tahun
* **Gap**: Pilar 3-5 tidak ada di seeder, hanya menggunakan data generic

## Rencana Implementasi

### 1. Update Method `seedPillars()`
* Tambah Pilar 3: Talent Management
* Tambah Pilar 4: Performance & Reward Management  
* Tambah Pilar 5: HC Governance, IR & Policy

### 2. Tambah Method Seeding Baru
* `seedPillar3Initiatives()` - 15 initiatives (3 kode × 5 tahun)
* `seedPillar4Initiatives()` - 15 initiatives (3 kode × 5 tahun)  
* `seedPillar5Initiatives()` - 15 initiatives (3 kode × 5 tahun)

### 3. Update Method `run()`
* Tambah pemanggilan 3 method seeding baru

## Detail Data yang Akan Ditambahkan

### Pilar 3: Talent Management
* **3.1**: Strategic Workforce Planning & Capability Alignment
* **3.2**: Integrated Talent Management System
* **3.3**: High-Impact Talent Mobility & Leadership Acceleration

### Pilar 4: Performance & Reward Management  
* **4.1**: Integrated Performance Management System
* **4.2**: Excellence Performance Driven Culture
* **4.3**: Competitive Remuneration & Total Reward

### Pilar 5: HC Governance, IR & Policy
* **5.1**: Integrated HCIS
* **5.2**: Employee & Industrial Relations
* **5.3**: HC Good Governance & Policy

### Setiap Initiative Akan Memiliki
* 5 data (2026-2030) dengan progresif improvement
* Action plans, KPIs, risks, dependencies
* Budget yang meningkat setiap tahun
* Parenting model assignment

## Total Data Baru
* **3 pilar baru** × **3 kode pilar** × **5 tahun** = **45 initiatives**
* Setiap initiative memiliki data lengkap (action plans, KPIs, risks, dll)