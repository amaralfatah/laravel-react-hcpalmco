## Analisis & Usulan Refactor Struktur Folder

### Masalah Saat Ini:
1. **Nama file tidak konsisten**: `dashboard.tsx` vs `dashboards.tsx`
2. **Struktur datar**: Semua page di root `/pages` tanpa pengelompokan
3. **Tidak ada pemisahan domain**: HC-related pages bercampur dengan generic pages

### Usulan Struktur Baru:

```
resources/js/
├── pages/
│   ├── hc/                          # Human Capital domain
│   │   ├── Dashboard.tsx           # Rename dari dashboards.tsx
│   │   ├── RoadmapList.tsx         # Rename dari list.tsx  
│   │   └── InitiativeDetail.tsx    # Rename dari detail.tsx
│   ├── auth/                       # Authentication pages
│   └── settings/                   # Settings pages
├── components/
│   ├── hc/                         # HC-specific components
│   │   ├── HcHeader.tsx
│   │   ├── HcSubHeader.tsx
│   │   ├── HcFooter.tsx
│   │   └── ActionPlanModal.tsx
│   └── ui/                         # Generic UI components
└── types/
    ├── hc/                         # HC-specific types
    │   ├── roadmap.ts
    │   ├── initiative.ts
    │   └── action-plan.ts
    └── index.d.ts
```

### Rencana Implementasi:
1. **Buat struktur folder baru** (`/pages/hc/`, `/components/hc/`, `/types/hc/`)
2. **Rename file** untuk konsistensi:
   - `dashboards.tsx` → `Dashboard.tsx`
   - `list.tsx` → `RoadmapList.tsx` 
   - `detail.tsx` → `InitiativeDetail.tsx`
3. **Pindahkan file** ke folder yang sesuai
4. **Extract types** ke dedicated files
5. **Update import paths** di semua file yang terpengaruh
6. **Update route references** di Laravel backend

### Benefits:
- **Domain separation**: HC-related code terorganisasi
- **Scalability**: Mudah tambah fitur HC baru
- **Maintainability**: Lebih mudah cari dan maintain code
- **Consistency**: Naming convention yang jelas