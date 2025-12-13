import React from 'react';
import { ArrowLeft } from 'lucide-react';
import AppLayoutFull from '@/layouts/app-layout-full';
import { Head } from '@inertiajs/react';
import HcSubHeader from '@/components/hc-sub-header';
import HcFooter from '@/components/hc-footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Link } from '@inertiajs/react';

export default function InitiativeDetail() {
    const initiative = {
        code: 'P2.1.1',
        title: 'Foundational Capability Acceleration',
        pilar: 'Pilar #2 - Learning & Leadership Development',
        duration: 'Januari 2026 - Desember 2026',
        streamLead: 'Stream Lead',
        pic: 'Kasubdiv Pengembangan SDM',
        budgetType: 'OPEX or CAPEX',
        budgetAmount: 'OPEX = Rp. 1 M',
        description: 'Program penguatan kapabilitas karyawan dan lini pengawasan melalui finalisasi peta kompetensi, penyusunan kurikulum pembelajaran berbasis kompetensi (role-based), serta implementasi pelatihan untuk meningkatkan kesiapan organisasi menghadapi tuntutan produktivitas dan transformasi perusahaan dengan tujuan meningkatnya kompetensi kerja, keseragaman standar peran, peningkatan produktivitas, dan terciptanya budaya kinerja kuat.',
        kpis: [
            { metric: 'CLI Karpel', uom: '%', target: '100% Terlaksana' },
            { metric: 'Jumlah modul pelatihan teknis yang selesai', uom: 'Modul', target: '> 24 modul prioritas' },
            { metric: 'Jam pelatihan Mandor I', uom: 'Hours', target: '> 20 JPL/Orang' }
        ]
    };

    const actionPlan = [
        {
            no: 1,
            activity: 'Pembentukan Struktur PalmCo Knowledge Management Center',
            pm: 'blue',
            dueDate: 'Jan-Mar 2026'
        },
        {
            no: 2,
            activity: 'Pengukuran CLI Karyawan Pelaksana Bidang Keuangan dan Personalia',
            pm: 'green',
            dueDate: 'Jan-Feb 2026'
        },
        {
            no: 3,
            activity: 'Penyusunan kurikulum pembelajaran berbasis kompetensi (role-based learning path)',
            pm: 'blue',
            dueDate: 'Mei - Juni 2026'
        },
        {
            no: 4,
            activity: 'Pelaksanaan Supervisory Bootcamp (Mandor I)',
            pm: 'green',
            dueDate: 'Juli - Ags 2026'
        },
        {
            no: 5,
            activity: 'Digitalisasi Pembelajaran dan Evaluasi Pembelajaran',
            pm: 'yellow',
            dueDate: 'Jan - Des 2026'
        },
        {
            no: 6,
            activity: 'Pengukuran CLI Karyawan Pelaksana Bidang Tanaman dan Tekpol',
            pm: 'green',
            dueDate: 'Sep - Des 2026'
        }
    ];

    const risks = [
        'Resistensi dari lini operasional akibat perubahan program pembelajaran',
        'Keterbatasan instruktur internal pada unit kebun/pabrik',
        'Keterbatasan waktu peserta untuk mengikuti pelatihan',
        'Ketidaksiapan data kompetensi yang terintegrasi'
    ];

    const mitigations = [
        'Sosialisasi intensif manfaat kurikulum baru ke Regional',
        'Team of Trainer bagi Trainer regional untuk melatih Karyawan',
        'Penjadwalan pelatihan secara terstruktur dan fleksibel',
        'Komitmen Penggunaan Aplikasi Pengembangan SDM'
    ];

    const dependencies = [
        'Seluruh Divisi PTPN IV',
        'Bagian SDM dan Sistem Manajemen Regional dan Anper',
        'PT LPP Agro Nusantara dan Learning Partner PTPN IV lainnya'
    ];

    const supportSystems = [
        'Integrated LMS–PALMS (LinkedIn Learning, AgroNow, PALAPA)',
        'Anggaran Pengembangan SDM',
        'Resources (Modul, Lokasi Pelaksanaan)',
        'Trainer/Narasumber Internal dan Eksternal',
        'Tim fasilitator internal dan master trainer',
        'Dukungan komunikasi internal (sosialisasi ke seluruh unit)'
    ];

    const parentingModel = [
        { label: 'Sentralisasi', color: 'bg-blue-600' },
        { label: 'Koordinasi', color: 'bg-yellow-400' },
        { label: 'Desentralisasi', color: 'bg-green-600' }
    ];

    return (
        <AppLayoutFull title="HC Initiative Detail" description="Human Capital Initiative Detail View">
            <Head title="Initiative Detail - Human Capital PalmCo" />
            <HcSubHeader title="PTPN IV Palmco HC INITIATIVE STRATEGY" subtitle="" />

            {/* Header */}
            <div className="bg-white border-b border-gray-200">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3">
                    <Link href="/list" className="flex items-center gap-2 hover:opacity-70 transition-opacity">
                        <ArrowLeft className="w-5 h-5 text-gray-600" />
                        <span className="text-sm text-gray-600">Back to Initiatives</span>
                    </Link>
                </div>
            </div>

            {/* Title Banner */}
            <div className="bg-primary text-primary-foreground">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3">
                    <h1 className="text-lg sm:text-xl font-bold">
                        {initiative.pilar} <span className="font-normal italic">({initiative.code})</span>
                    </h1>
                </div>
            </div>



            {/* Main Content */}
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Left Column */}
                    <div className="lg:col-span-8">
                        {/* Top Section - Initiative Details */}
                        <Card className="mb-6">
                            <CardHeader>
                                <CardTitle>Initiative Details</CardTitle>
                            </CardHeader>
                            <CardContent className="p-0">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-[11px] border-collapse">
                                        <tbody>
                                            {/* Row 1 */}
                                            <tr>
                                                <td className="bg-accent px-3 py-2 border border-gray-800 font-bold text-accent-foreground align-top w-28">
                                                    Inisiatif<br />Strategis
                                                </td>
                                                <td className="px-3 py-2 border border-gray-800 font-bold text-gray-900 align-top" colSpan={3}>
                                                    {initiative.title}
                                                </td>
                                                <td className="bg-accent px-3 py-2 border border-gray-800 font-bold text-accent-foreground align-top text-center w-16" rowSpan={4}>
                                                    KPI's
                                                </td>
                                                <td className="bg-white px-3 py-2 border border-gray-800 font-bold text-gray-900 align-top">
                                                    Metric
                                                </td>
                                                <td className="bg-white px-3 py-2 border border-gray-800 font-bold text-gray-900 text-center align-top w-16">
                                                    UOM
                                                </td>
                                                <td className="bg-white px-3 py-2 border border-gray-800 font-bold text-gray-900 text-center align-top w-32">
                                                    Target
                                                </td>
                                            </tr>

                                            {/* Row 2 */}
                                            <tr>
                                                <td className="bg-accent px-3 py-2 border border-gray-800 font-bold text-accent-foreground align-top" rowSpan={3}>
                                                    Deskripsi<br />Inisiatif &<br />Manfaat
                                                </td>
                                                <td className="px-3 py-2 border border-gray-800 text-gray-800 leading-relaxed text-justify align-top" rowSpan={3}>
                                                    {initiative.description}
                                                </td>
                                                <td className="bg-accent px-3 py-2 border border-gray-800 font-bold text-accent-foreground align-top w-24">
                                                    Duration
                                                </td>
                                                <td className="px-3 py-2 border border-gray-800 text-gray-900 align-top italic w-48">
                                                    {initiative.duration}
                                                </td>
                                                <td className="px-3 py-2 border border-gray-800 text-gray-800 align-top">
                                                    {initiative.kpis[0].metric}
                                                </td>
                                                <td className="px-3 py-2 border border-gray-800 text-center text-gray-800 align-top">
                                                    {initiative.kpis[0].uom}
                                                </td>
                                                <td className="px-3 py-2 border border-gray-800 text-center font-bold text-gray-900 align-top">
                                                    {initiative.kpis[0].target}
                                                </td>
                                            </tr>

                                            {/* Row 3 */}
                                            <tr>
                                                <td className="bg-accent px-3 py-2 border border-gray-800 font-bold text-accent-foreground align-top">
                                                    Stream Lead
                                                </td>
                                                <td className="px-3 py-2 border border-gray-800 font-bold text-gray-900 align-top">
                                                    {initiative.pic}
                                                </td>
                                                <td className="px-3 py-2 border border-gray-800 text-gray-800 align-top">
                                                    {initiative.kpis[1].metric}
                                                </td>
                                                <td className="px-3 py-2 border border-gray-800 text-center text-gray-800 align-top">
                                                    {initiative.kpis[1].uom}
                                                </td>
                                                <td className="px-3 py-2 border border-gray-800 text-center font-bold text-gray-900 align-top">
                                                    {initiative.kpis[1].target}
                                                </td>
                                            </tr>

                                            {/* Row 4 */}
                                            <tr>
                                                <td className="bg-accent px-3 py-2 border border-gray-800 font-bold text-accent-foreground align-top">
                                                    {initiative.budgetType}
                                                </td>
                                                <td className="px-3 py-2 border border-gray-800 font-bold text-gray-900 align-top italic">
                                                    {initiative.budgetAmount}
                                                </td>
                                                <td className="px-3 py-2 border border-gray-800 text-gray-800 align-top">
                                                    {initiative.kpis[2].metric}
                                                </td>
                                                <td className="px-3 py-2 border border-gray-800 text-center text-gray-800 align-top">
                                                    {initiative.kpis[2].uom}
                                                </td>
                                                <td className="px-3 py-2 border border-gray-800 text-center font-bold text-gray-900 align-top">
                                                    {initiative.kpis[2].target}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Action Plan */}
                        <Card className="mb-6">
                            <CardHeader>
                                <CardTitle>Action Plan, Roadmap, and Milestones</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow className="bg-muted">
                                            <TableHead className="w-16">No</TableHead>
                                            <TableHead>Activity</TableHead>
                                            <TableHead className="w-16 text-center">PM</TableHead>
                                            <TableHead className="w-24 text-center">Due Date</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {actionPlan.map((item, index) => (
                                            <TableRow key={index}>
                                                <TableCell className="text-center">{item.no}</TableCell>
                                                <TableCell>{item.activity}</TableCell>
                                                <TableCell className="text-center">
                                                    <div className={`inline-block w-3 h-3 rounded-full ${
                                                        item.pm === 'green' ? 'bg-green-500' :
                                                        item.pm === 'yellow' ? 'bg-yellow-400' : 'bg-blue-500'
                                                    }`}></div>
                                                </TableCell>
                                                <TableCell className="text-center">{item.dueDate}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>

                        {/* Parenting Model */}
                        <Card className="mb-6">
                            <CardHeader>
                                <CardTitle>Parenting Model</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-wrap gap-4 justify-center py-4">
                                    {parentingModel.map((model, index) => (
                                        <div key={index} className="text-center">
                                            <div className={`w-16 h-16 rounded-full ${model.color} mx-auto mb-2 flex items-center justify-center text-white font-bold text-xs`}>
                                                {index + 1}
                                            </div>
                                            <div className="text-xs font-medium">{model.label}</div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column */}
                    <div className="lg:col-span-4 space-y-6">
                        {/* Risk */}
                        <Card className="mb-6">
                            <CardHeader>
                                <CardTitle>Risk</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2 py-2">
                                    {risks.map((risk, index) => (
                                        <li key={index} className="text-sm flex items-start">
                                            <span className="text-destructive mr-2">•</span>
                                            {risk}
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>

                        {/* Risk Mitigation */}
                        <Card className="mb-6">
                            <CardHeader>
                                <CardTitle>Risk Mitigation</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2 py-2">
                                    {mitigations.map((mitigation, index) => (
                                        <li key={index} className="text-sm flex items-start">
                                            <span className="text-green-600 mr-2">•</span>
                                            {mitigation}
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>

                        {/* Dependencies */}
                        <Card className="mb-6">
                            <CardHeader>
                                <CardTitle>Dependencies with Other Initiatives and Teams</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2 py-2">
                                    {dependencies.map((dep, index) => (
                                        <li key={index} className="text-sm flex items-start">
                                            <span className="text-blue-600 mr-2">•</span>
                                            {dep}
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>

                        {/* Support System */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Support System</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2 py-2">
                                    {supportSystems.map((system, index) => (
                                        <li key={index} className="text-sm flex items-start">
                                            <span className="text-purple-600 mr-2">•</span>
                                            {system}
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>

            <HcFooter />
        </AppLayoutFull>
    );
}
