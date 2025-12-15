import React from 'react';
import AppLayoutFull from '@/layouts/app-layout-full';
import { Head, usePage } from '@inertiajs/react';
import HcSubHeader from '@/components/hc/HcSubHeader';
import { Link } from '@inertiajs/react';
import HcFooter from '@/components/hc/HcFooter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ListProps, RoadmapItem, RoadmapRow, RoadmapSection, Year } from '@/types/hc';

export default function RoadmapList({ roadmapData, years, phases }: ListProps) {
    const { url } = usePage();
    const urlParams = new URLSearchParams(url.split('?')[1]);
    const selectedPilar = urlParams.get('pilar');

    // Filter data berdasarkan pilar yang dipilih
    const filteredRoadmapData = selectedPilar
        ? roadmapData.filter(section => section.no === parseInt(selectedPilar))
        : roadmapData;

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
                            <CardTitle>
                                HC Roadmap PTPN IV Palmco 2026 - 2030
                                {selectedPilar && (
                                    <span className="block text-sm font-normal text-gray-600 mt-1">
                                        Pilar {selectedPilar}
                                    </span>
                                )}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse border border-gray-300 text-xs sm:text-sm min-w-[800px]">
                                    <thead>
                                        {/* Phase Row */}
                                        <tr>
                                            <th className="border border-gray-300 p-3 bg-muted" colSpan={2}></th>
                                            {phases && phases.length > 0 && (
                                                <th className={`border border-gray-300 p-3 text-xs sm:text-sm font-bold text-accent-foreground bg-accent`} colSpan={1}>
                                                    {phases[0]?.title || 'Phase 1'}
                                                </th>
                                            )}
                                            {phases && phases.length > 1 && (
                                                <th className={`border border-gray-300 p-3 text-xs sm:text-sm font-bold text-primary-foreground bg-sidebar-primary`} colSpan={2}>
                                                    {phases[1]?.title || 'Phase 2'}
                                                </th>
                                            )}
                                            {phases && phases.length > 2 && (
                                                <th className={`border border-gray-300 p-3 text-xs sm:text-sm font-bold text-primary-foreground bg-primary`} colSpan={2}>
                                                    {phases[2]?.title || 'Phase 3'}
                                                </th>
                                            )}
                                        </tr>
                                        {/* Year Headers Row */}
                                        <tr className="bg-primary text-primary-foreground">
                                            <th className="border border-gray-300 p-2 sm:p-3 text-left font-bold" rowSpan={2}>Pilar</th>
                                            <th className="border border-gray-300 p-2 sm:p-3 text-center font-bold" rowSpan={2}>No</th>
                                            {years.map((year: Year) => (
                                                <th key={year.year} className="border border-gray-300 p-2 sm:p-3 text-center font-bold">
                                                    <div className="text-lg sm:text-xl font-black mb-1">{year.year}</div>
                                                    <div className="text-xs italic font-normal leading-tight">{year.theme}</div>
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredRoadmapData.map((section: RoadmapSection, sectionIndex: number) => (
                                            <React.Fragment key={sectionIndex}>
                                                {/* All rows for this pillar */}
                                                {section.rows.map((row: RoadmapRow, rowIndex: number) => (
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
                                                        {row.items.map((item: RoadmapItem, itemIndex: number) => (
                                                            <td
                                                                key={itemIndex}
                                                                className={`border border-gray-300 p-2 sm:p-3 align-middle ${item.year === 2026 ? 'bg-muted' :
                                                                        item.year <= 2028 ? 'bg-sidebar-accent' : 'bg-accent'
                                                                    }`}
                                                            >
                                                                <Link
                                                                    href={`/detail?code=${item.code}`}
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
