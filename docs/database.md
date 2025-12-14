-- ============================================
-- PTPN IV PALMCO HC ROADMAP DATABASE SCHEMA
-- ============================================

-- Table 1: Phases (Master Data untuk Fase)
CREATE TABLE phases (
    id INT PRIMARY KEY AUTO_INCREMENT,
    phase_number INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    color_class VARCHAR(100),
    start_year INT NOT NULL,
    end_year INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table 2: Years (Master Data untuk Tahun dan Tema)
CREATE TABLE years (
    id INT PRIMARY KEY AUTO_INCREMENT,
    year INT NOT NULL UNIQUE,
    theme TEXT NOT NULL,
    phase_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (phase_id) REFERENCES phases(id) ON DELETE SET NULL
);

-- Table 3: Pillars (Pilar Strategis)
CREATE TABLE pillars (
    id INT PRIMARY KEY AUTO_INCREMENT,
    pillar_number INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    display_order INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table 4: Initiatives (Inisiatif Strategis)
CREATE TABLE initiatives (
    id INT PRIMARY KEY AUTO_INCREMENT,
    code VARCHAR(50) NOT NULL UNIQUE,
    title VARCHAR(500) NOT NULL,
    year INT NOT NULL,
    pillar_id INT NOT NULL,
    row_number INT NOT NULL,
    description TEXT,
    duration_start DATE,
    duration_end DATE,
    stream_lead VARCHAR(255),
    pic VARCHAR(255),
    budget_type ENUM('OPEX', 'CAPEX', 'MIXED') DEFAULT 'OPEX',
    budget_amount DECIMAL(15, 2),
    budget_currency VARCHAR(10) DEFAULT 'IDR',
    status ENUM('planning', 'in_progress', 'completed', 'on_hold', 'cancelled') DEFAULT 'planning',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (pillar_id) REFERENCES pillars(id) ON DELETE CASCADE,
    FOREIGN KEY (year) REFERENCES years(year) ON DELETE CASCADE
);

-- Table 5: KPIs (Key Performance Indicators)
CREATE TABLE kpis (
    id INT PRIMARY KEY AUTO_INCREMENT,
    initiative_id INT NOT NULL,
    metric_name VARCHAR(500) NOT NULL,
    uom VARCHAR(50) NOT NULL, -- Unit of Measurement
    target VARCHAR(255) NOT NULL,
    actual_value VARCHAR(255),
    achievement_percentage DECIMAL(5, 2),
    display_order INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (initiative_id) REFERENCES initiatives(id) ON DELETE CASCADE
);

-- Table 6: Action Plans (Rencana Aksi)
CREATE TABLE action_plans (
    id INT PRIMARY KEY AUTO_INCREMENT,
    initiative_id INT NOT NULL,
    activity_number INT NOT NULL,
    activity_name TEXT NOT NULL,
    project_manager_status ENUM('green', 'yellow', 'red', 'blue') DEFAULT 'blue',
    due_date VARCHAR(50),
    current_month_progress DECIMAL(5, 2) DEFAULT 0.00,
    cumulative_progress DECIMAL(5, 2) DEFAULT 0.00,
    display_order INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (initiative_id) REFERENCES initiatives(id) ON DELETE CASCADE
);

-- Table 7: Risks (Risiko)
CREATE TABLE risks (
    id INT PRIMARY KEY AUTO_INCREMENT,
    initiative_id INT NOT NULL,
    risk_description TEXT NOT NULL,
    severity ENUM('low', 'medium', 'high', 'critical') DEFAULT 'medium',
    probability ENUM('low', 'medium', 'high') DEFAULT 'medium',
    display_order INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (initiative_id) REFERENCES initiatives(id) ON DELETE CASCADE
);

-- Table 8: Risk Mitigations (Mitigasi Risiko)
CREATE TABLE risk_mitigations (
    id INT PRIMARY KEY AUTO_INCREMENT,
    risk_id INT,
    initiative_id INT NOT NULL,
    mitigation_description TEXT NOT NULL,
    status ENUM('planned', 'in_progress', 'completed') DEFAULT 'planned',
    display_order INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (risk_id) REFERENCES risks(id) ON DELETE SET NULL,
    FOREIGN KEY (initiative_id) REFERENCES initiatives(id) ON DELETE CASCADE
);

-- Table 9: Dependencies (Ketergantungan)
CREATE TABLE dependencies (
    id INT PRIMARY KEY AUTO_INCREMENT,
    initiative_id INT NOT NULL,
    dependency_description TEXT NOT NULL,
    dependency_type ENUM('internal', 'external', 'cross_functional') DEFAULT 'internal',
    display_order INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (initiative_id) REFERENCES initiatives(id) ON DELETE CASCADE
);

-- Table 10: Support Systems (Sistem Pendukung)
CREATE TABLE support_systems (
    id INT PRIMARY KEY AUTO_INCREMENT,
    initiative_id INT NOT NULL,
    system_description TEXT NOT NULL,
    system_type VARCHAR(100),
    display_order INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (initiative_id) REFERENCES initiatives(id) ON DELETE CASCADE
);

-- Table 11: Parenting Models (Model Parenting)
CREATE TABLE parenting_models (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    color_class VARCHAR(100),
    display_order INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table 12: Initiative Parenting (Relasi Inisiatif dengan Model Parenting)
CREATE TABLE initiative_parenting (
    id INT PRIMARY KEY AUTO_INCREMENT,
    initiative_id INT NOT NULL,
    parenting_model_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (initiative_id) REFERENCES initiatives(id) ON DELETE CASCADE,
    FOREIGN KEY (parenting_model_id) REFERENCES parenting_models(id) ON DELETE CASCADE,
    UNIQUE KEY unique_initiative_parenting (initiative_id, parenting_model_id)
);

-- ============================================
-- SAMPLE DATA INSERTION
-- ============================================

-- Insert Phases
INSERT INTO phases (phase_number, title, color_class, start_year, end_year) VALUES
(1, 'Solidify the Core', 'bg-accent', 2026, 2026),
(2, 'Digital Synergy for Business Expansion and Sustainable Growth', 'bg-sidebar-primary', 2027, 2028),
(3, 'Achieving Excellence and Global Readiness', 'bg-primary', 2029, 2030);

-- Insert Years
INSERT INTO years (year, theme, phase_id) VALUES
(2026, 'Accelerating Human Capital Foundation for Operational Excellence', 1),
(2027, 'Strengthening Digital Human Capital Management for Business Expansion', 2),
(2028, 'Empowering Digital Workforce & Systems for Business Expansion and Sustainable Growth', 2),
(2029, 'Accelerating Human Capital Integration for Nation Wide Scale Expansion', 3),
(2030, 'Empowering Workforce Capabilities Through Innovation Breakthrough for Global Readiness', 3);

-- Insert Pillars
INSERT INTO pillars (pillar_number, name, display_order) VALUES
(1, 'Strategy & Corporate Culture', 1),
(2, 'Learning & Leadership Development', 2);

-- Insert Parenting Models
INSERT INTO parenting_models (name, color_class, display_order) VALUES
('Sentralisasi', 'bg-blue-600', 1),
('Koordinasi', 'bg-yellow-400', 2),
('Desentralisasi', 'bg-green-600', 3);

-- Insert Sample Initiative (P2.1.1)
INSERT INTO initiatives (code, title, year, pillar_id, row_number, description, duration_start, duration_end, stream_lead, pic, budget_type, budget_amount) VALUES
('P2.1.1', 'Foundational Capability Acceleration', 2026, 2, 1, 
'Program penguatan kapabilitas karyawan dan lini pengawasan melalui finalisasi peta kompetensi, penyusunan kurikulum pembelajaran berbasis kompetensi (role-based), serta implementasi pelatihan untuk meningkatkan kesiapan organisasi menghadapi tuntutan produktivitas dan transformasi perusahaan dengan tujuan meningkatnya kompetensi kerja, keseragaman standar peran, peningkatan produktivitas, dan terciptanya budaya kinerja kuat.',
'2026-01-01', '2026-12-31', 'Stream Lead', 'Kasubdiv Pengembangan SDM', 'OPEX', 1000000000);

-- Insert KPIs for P2.1.1
INSERT INTO kpis (initiative_id, metric_name, uom, target, display_order) VALUES
(1, 'CLI Karpel', '%', '100% Terlaksana', 1),
(1, 'Jumlah modul pelatihan teknis yang selesai', 'Modul', '> 24 modul prioritas', 2),
(1, 'Jam pelatihan Mandor I', 'Hours', '> 20 JPL/Orang', 3);

-- Insert Action Plans for P2.1.1
INSERT INTO action_plans (initiative_id, activity_number, activity_name, project_manager_status, due_date, current_month_progress, cumulative_progress, display_order) VALUES
(1, 1, 'Pembentukan Struktur PalmCo Knowledge Management Center', 'blue', 'Jan-Mar 2026', 8, 92, 1),
(1, 2, 'Pengukuran CLI Karyawan Pelaksana Bidang Keuangan dan Personalia', 'green', 'Jan-Feb 2026', 0, 100, 2),
(1, 3, 'Penyusunan kurikulum pembelajaran berbasis kompetensi (role-based learning path)', 'blue', 'Mei - Juni 2026', 12, 68, 3),
(1, 4, 'Pelaksanaan Supervisory Bootcamp (Mandor I)', 'green', 'Juli - Ags 2026', 18, 42, 4),
(1, 5, 'Digitalisasi Pembelajaran dan Evaluasi Pembelajaran', 'yellow', 'Jan - Des 2026', 6, 38, 5),
(1, 6, 'Pengukuran CLI Karyawan Pelaksana Bidang Tanaman dan Tekpol', 'green', 'Sep - Des 2026', 3, 15, 6);

-- Insert Risks for P2.1.1
INSERT INTO risks (initiative_id, risk_description, display_order) VALUES
(1, 'Resistensi dari lini operasional akibat perubahan program pembelajaran', 1),
(1, 'Keterbatasan instruktur internal pada unit kebun/pabrik', 2),
(1, 'Keterbatasan waktu peserta untuk mengikuti pelatihan', 3),
(1, 'Ketidaksiapan data kompetensi yang terintegrasi', 4);

-- Insert Risk Mitigations for P2.1.1
INSERT INTO risk_mitigations (initiative_id, mitigation_description, display_order) VALUES
(1, 'Sosialisasi intensif manfaat kurikulum baru ke Regional', 1),
(1, 'Team of Trainer bagi Trainer regional untuk melatih Karyawan', 2),
(1, 'Penjadwalan pelatihan secara terstruktur dan fleksibel', 3),
(1, 'Komitmen Penggunaan Aplikasi Pengembangan SDM', 4);

-- Insert Dependencies for P2.1.1
INSERT INTO dependencies (initiative_id, dependency_description, display_order) VALUES
(1, 'Seluruh Divisi PTPN IV', 1),
(1, 'Bagian SDM dan Sistem Manajemen Regional dan Anper', 2),
(1, 'PT LPP Agro Nusantara dan Learning Partner PTPN IV lainnya', 3);

-- Insert Support Systems for P2.1.1
INSERT INTO support_systems (initiative_id, system_description, display_order) VALUES
(1, 'Integrated LMS—PALMS (LinkedIn Learning, AgroNow, PALAPA)', 1),
(1, 'Anggaran Pengembangan SDM', 2),
(1, 'Resources (Modul, Lokasi Pelaksanaan)', 3),
(1, 'Trainer/Narasumber Internal dan Eksternal', 4),
(1, 'Tim fasilitator internal dan master trainer', 5),
(1, 'Dukungan komunikasi internal (sosialisasi ke seluruh unit)', 6);

-- ============================================
-- USEFUL QUERIES
-- ============================================

-- Query untuk List View (roadmap table)
-- SELECT 
--     p.name as pilar,
--     i.row_number,
--     i.code,
--     i.title,
--     i.year
-- FROM initiatives i
-- JOIN pillars p ON i.pillar_id = p.id
-- ORDER BY p.display_order, i.row_number, i.year;

-- Query untuk Detail View
-- SELECT 
--     i.*,
--     p.name as pilar_name,
--     y.theme as year_theme
-- FROM initiatives i
-- JOIN pillars p ON i.pillar_id = p.id
-- JOIN years y ON i.year = y.year
-- WHERE i.code = 'P2.1.1';

-- Query untuk mendapatkan semua data lengkap inisiatif
-- SELECT 
--     i.*,
--     p.name as pilar_name,
--     (SELECT JSON_ARRAYAGG(JSON_OBJECT('metric', metric_name, 'uom', uom, 'target', target))
--      FROM kpis WHERE initiative_id = i.id ORDER BY display_order) as kpis,
--     (SELECT JSON_ARRAYAGG(JSON_OBJECT('no', activity_number, 'activity', activity_name, 'pm', project_manager_status, 'dueDate', due_date, 'currentMonth', current_month_progress, 'cumulative', cumulative_progress))
--      FROM action_plans WHERE initiative_id = i.id ORDER BY display_order) as action_plans
-- FROM initiatives i
-- JOIN pillars p ON i.pillar_id = p.id
-- WHERE i.code = 'P2.1.1';