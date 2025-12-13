import React from 'react';
import { Building2, Calendar } from 'lucide-react';
import AppLayoutFull from '@/layouts/app-layout-full';
import { Head } from '@inertiajs/react';
import HcSubHeader from '@/components/hc-sub-header';
import { Link } from '@inertiajs/react';
import HcFooter from '@/components/hc-footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

export default function List() {
    const roadmapData = [
        {
            pilar: 'Strategy & Corporate Culture',
            no: 1,
            rows: [
                {
                    no: 1,
                    items: [
                        { code: 'P1.1.1', year: 2026, title: 'Integrated Human Capital Management Implementation Alignment' },
                        { code: 'P1.2.1', year: 2027, title: 'Organizational Alignment for Operational Excellence & Business Expansion' },
                        { code: 'P1.3.1', year: 2028, title: 'Established Culture Governance & Standardized Cultural Practices Across Units' },
                        { code: 'P1.4.1', year: 2029, title: 'Digital Culture Transformation for Sustainable Growth' },
                        { code: 'P1.5.1', year: 2030, title: 'Global Innovation and Culture Excellence' }
                    ]
                },
                {
                    no: 2,
                    items: [
                        { code: 'P1.1.2', year: 2026, title: 'Corporate Strategy Alignment & Structure Optimization' },
                        { code: 'P1.2.2', year: 2027, title: 'Digital Strategic Alignment & HCBP Deployment' },
                        { code: 'P1.3.2', year: 2028, title: 'Harmonized Digital Culture Practices Across the Organization' },
                        { code: 'P1.4.2', year: 2029, title: 'Agile Organization for Business Excellence' },
                        { code: 'P1.5.2', year: 2030, title: 'Strategic Partnership and Ecosystem Development' }
                    ]
                },
                {
                    no: 3,
                    items: [
                        { code: 'P1.1.3', year: 2026, title: 'Culture Foundation and Change Management' },
                        { code: 'P1.2.3', year: 2027, title: 'Strengthened Organization Structure (Shared Service and Digital Organization)' },
                        { code: 'P1.3.3', year: 2028, title: 'Digital adoption & innovation to enable business expansion' },
                        { code: 'P1.4.3', year: 2029, title: 'HC Change Enablement & Adoption Excellence' },
                        { code: 'P1.5.3', year: 2030, title: 'Talent Mobility and Knowledge Management' }
                    ]
                },
                {
                    no: 4,
                    items: [
                        { code: 'P1.1.4', year: 2026, title: 'Digital Readiness Assessment' },
                        { code: 'P1.2.4', year: 2027, title: 'Strengthened Organization Structure (Agile Organization)' },
                        { code: 'P1.3.4', year: 2028, title: 'Winning Culture for Global Competitiveness' },
                        { code: 'P1.4.4', year: 2029, title: 'Digital Transformation Excellence' },
                        { code: 'P1.5.4', year: 2030, title: 'Future-Ready Workforce Architecture' }
                    ]
                },
                {
                    no: 5,
                    items: [
                        { code: 'P1.1.5', year: 2026, title: 'Performance Management Integration' },
                        { code: 'P1.2.5', year: 2027, title: 'Strengthened Organization Structure (Organization Excellence Validation)' },
                        { code: 'P1.3.5', year: 2028, title: 'Continuous transformation & world-class competitiveness' },
                        { code: 'P1.4.5', year: 2029, title: 'Operational Excellence and Scalability' },
                        { code: 'P1.5.5', year: 2030, title: 'Global Talent and Innovation Ecosystem' }
                    ]
                }
            ]
        },
        {
            pilar: 'Learning & Leadership Development',
            no: 2,
            rows: [
                {
                    no: 1,
                    items: [
                        { code: 'P2.1.1', year: 2026, title: 'Foundational Capability Acceleration' },
                        { code: 'P2.2.1', year: 2027, title: 'Digital Learning Readiness' },
                        { code: 'P2.3.1', year: 2028, title: 'Enhanced HC Team Capability' },
                        { code: 'P2.4.1', year: 2029, title: 'Leadership Excellence and Succession Planning' },
                        { code: 'P2.5.1', year: 2030, title: 'Global Leadership Development Program' }
                    ]
                },
                {
                    no: 2,
                    items: [
                        { code: 'P2.1.2', year: 2026, title: 'Strategic Skills & Certification' },
                        { code: 'P2.2.2', year: 2027, title: 'LMS Implementation & Content Digitalization' },
                        { code: 'P2.3.2', year: 2028, title: 'HC Business Partner Plantation Foundation' },
                        { code: 'P2.4.2', year: 2029, title: 'Advanced Leadership Analytics' },
                        { code: 'P2.5.2', year: 2030, title: 'Executive Coaching and Mentorship' }
                    ]
                },
                {
                    no: 3,
                    items: [
                        { code: 'P2.1.3', year: 2026, title: 'Integrated Productivity Learning Program' },
                        { code: 'P2.2.3', year: 2027, title: 'Integrated Digital Learning System' },
                        { code: 'P2.3.3', year: 2028, title: 'Advanced HCBP Plantation Capability' },
                        { code: 'P2.4.3', year: 2029, title: 'Talent Development and Career Pathing' },
                        { code: 'P2.5.3', year: 2030, title: 'Innovation and Entrepreneurship Program' }
                    ]
                },
                {
                    no: 4,
                    items: [
                        { code: 'P2.1.4', year: 2026, title: 'Competency & Career Integration' },
                        { code: 'P2.2.4', year: 2027, title: 'AI-Enabled Learning Analytics' },
                        { code: 'P2.3.4', year: 2028, title: 'Data-Driven HCBP Plantation' },
                        { code: 'P2.4.4', year: 2029, title: 'Skills Gap Analysis and Development' },
                        { code: 'P2.5.4', year: 2030, title: 'Continuous Learning Culture' }
                    ]
                },
                {
                    no: 5,
                    items: [
                        { code: 'P2.1.5', year: 2026, title: 'Future Skills for Global Readiness' },
                        { code: 'P2.2.5', year: 2027, title: 'Next-Gen Learning Experience' },
                        { code: 'P2.3.5', year: 2028, title: 'Advanced HCBP Plantation Capability' },
                        { code: 'P2.4.5', year: 2029, title: 'Knowledge Management System' },
                        { code: 'P2.5.5', year: 2030, title: 'Digital Learning Innovation Hub' }
                    ]
                }
            ]
        }
    ];

    const years = [
        { year: 2026, theme: 'Accelerating Human Capital Foundation for Operational Excellence' },
        { year: 2027, theme: 'Strengthening Digital Human Capital Management for Business Expansion' },
        { year: 2028, theme: 'Empowering Digital Workforce & Systems for Business Expansion and Sustainable Growth' },
        { year: 2029, theme: 'Accelerating Human Capital Integration for Nation Wide Scale Expansion' },
        { year: 2030, theme: 'Empowering Workforce Capabilities Through Innovation Breakthrough for Global Readiness' }
    ];

    const phases = [
        { title: 'Solidify the Core', color: 'bg-accent' },
        { title: 'Digital Synergy for Business Expansion and Sustainable Growth', color: 'bg-sidebar-primary' },
        { title: 'Achieving Excellence and Global Readiness', color: 'bg-primary' }
    ];

    return (
        <AppLayoutFull title="HC Roadmap PTPN IV Palmco 2026 - 2030" description="Human Capital Roadmap list view">
            <Head title="Dashboard Human Capital PalmCo" />
            <main className="min-h-screen w-full bg-white">
                {/* Header */}
                <HcSubHeader />

                {/* Table */}
                <main className="container mx-auto mt-4 px-2 sm:px-4 lg:px-6">
                    <Card>
                        <CardHeader className="py-3">
                            <CardTitle>HC Roadmap PTPN IV Palmco 2026 - 2030</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse border border-gray-300 text-xs sm:text-sm min-w-[800px]">
                                    <thead>
                                        {/* Phase Row */}
                                        <tr>
                                            <th className="border border-gray-300 p-3 bg-muted" colSpan={2}></th>
                                            <th className={`border border-gray-300 p-3 text-xs sm:text-sm font-bold text-accent-foreground bg-accent`} colSpan={1}>
                                                {phases[0].title}
                                            </th>
                                            <th className={`border border-gray-300 p-3 text-xs sm:text-sm font-bold text-primary-foreground bg-sidebar-primary`} colSpan={2}>
                                                {phases[1].title}
                                            </th>
                                            <th className={`border border-gray-300 p-3 text-xs sm:text-sm font-bold text-primary-foreground bg-primary`} colSpan={2}>
                                                {phases[2].title}
                                            </th>
                                        </tr>
                                        {/* Year Headers Row */}
                                        <tr className="bg-primary text-primary-foreground">
                                            <th className="border border-gray-300 p-2 sm:p-3 text-left font-bold" rowSpan={2}>Pilar</th>
                                            <th className="border border-gray-300 p-2 sm:p-3 text-center font-bold" rowSpan={2}>No</th>
                                            {years.map((year) => (
                                                <th key={year.year} className="border border-gray-300 p-2 sm:p-3 text-center font-bold">
                                                    <div className="text-lg sm:text-xl font-black mb-1">{year.year}</div>
                                                    <div className="text-xs italic font-normal leading-tight">{year.theme}</div>
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {roadmapData.map((section, sectionIndex) => (
                                            <React.Fragment key={sectionIndex}>
                                                {/* All rows for this pillar */}
                                                {section.rows.map((row, rowIndex) => (
                                                    <tr key={rowIndex}>
                                                        {rowIndex === 0 && (
                                                            <td
                                                                className="border border-gray-300 p-3 sm:p-4 bg-primary text-primary-foreground font-bold text-sm sm:text-base align-middle"
                                                                rowSpan={section.rows.length}
                                                            >
                                                                {section.pilar}
                                                            </td>
                                                        )}
                                                        <td className="border border-gray-300 p-2 sm:p-3 bg-sidebar-primary text-primary-foreground text-center font-bold align-middle">
                                                            {row.no}
                                                        </td>
                                                        {row.items.map((item, itemIndex) => (
                                                            <td
                                                                key={itemIndex}
                                                                className={`border border-gray-300 p-2 sm:p-3 align-middle ${item.year === 2026 ? 'bg-muted' :
                                                                        item.year <= 2028 ? 'bg-sidebar-accent' : 'bg-accent'
                                                                    }`}
                                                            >
                                                                <Link
                                                                    href="/detail"
                                                                    className="block hover:opacity-80 transition-opacity"
                                                                >
                                                                    <div className="font-bold text-primary mb-1">[{item.code}]</div>
                                                                    <div className="text-gray-800 leading-tight">{item.title}</div>
                                                                </Link>
                                                            </td>
                                                        ))}
                                                    </tr>
                                                ))}
                                            </React.Fragment>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>
                </main>

                <HcFooter />

            </main>
        </AppLayoutFull>
    );
}
