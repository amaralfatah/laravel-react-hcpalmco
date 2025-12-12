import { Head } from '@inertiajs/react';
import AppLayoutFull from '@/layouts/app-layout-full';
import HcHeader from '@/components/hc-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sprout, Users, Target, TrendingUp, Settings } from 'lucide-react';

export default function Dashboards() {
    const navigation = [
        { title: 'Corporate Vision', href: '#corporate-vision' },
        { title: 'Value Creation', href: '#value-creation' },
        { title: 'HC Vision', href: '#hc-vision' },
        { title: 'HC Attribute', href: '#hc-attribute' },
        { title: 'HC Pillars', href: '#hc-pillars' }
    ];

    const valueCreationItems = [
        {
            title: 'Strengthening Feedstock & Upstream Expansion',
            icon: Sprout,
        },
        {
            title: 'Smallholders Enterprise Integration',
            icon: Users,
        },
        {
            title: 'Downstream Establishment',
            icon: Target,
        },
        {
            title: 'Green Businesses Acceleration',
            icon: TrendingUp,
        },
        {
            title: 'Next Level Transformation',
            icon: Settings,
        }
    ];

    const implementationInitiatives = [
        {
            title: 'Kebijakan & Standar Proses',
            items: [
                'Peraturan Direksi',
                'Dokumen Tata Kelola',
                'Standar Formasi',
                'SOP'
            ]
        },
        {
            title: 'Sistem Implementasi Proses',
            items: [
                'Workflow Chart',
                'Pedoman/Petunjuk Teknis'
            ]
        },
        {
            title: 'Infrastruktur Pendukung & Teknologi',
            items: [
                'PalmCo Learning Management System',
                'Agro Performance Management System (APMS)',
                'Agro Talent Management System (ATMS)',
                'Agro Culture Management System (ACMS)'
            ]
        },
        {
            title: 'Mekanisme Kontrol, Monitoring & Review Efektivitas',
            items: [
                'HC Initiatives Project',
                'Evaluasi Bulanan Regional dan HO',
                'Rapat Gabungan (RAGAB)',
                'Management Review Cycle (MRC)'
            ]
        }
    ];

    const pillars = [
        {
            number: 1,
            title: 'HC Strategy & Corporate Culture',
            color: 'bg-[#0A5F6F]',
            items: [
                { code: '1.1', title: 'Advanced HC Operating Model' },
                { code: '1.2', title: 'Agile Organization Design' },
                { code: '1.3', title: 'Excellence Corporate Culture' }
            ]
        },
        {
            number: 2,
            title: 'Learning & Leadership Development',
            color: 'bg-[#0A5F6F]',
            items: [
                { code: '2.1', title: 'Holistic Learning & Capability Development' },
                { code: '2.2', title: 'Learning Technology Acceleration' },
                { code: '2.3', title: 'HC Team Capability Mastery' }
            ]
        },
        {
            number: 3,
            title: 'Talent Management',
            color: 'bg-[#0A5F6F]',
            items: [
                { code: '3.1', title: 'Strategic Workforce Planning & Capability Alignment' },
                { code: '3.2', title: 'Integrated Talent Management System' },
                { code: '3.3', title: 'High-Impact Talent Mobility & Leadership Acceleration' }
            ]
        },
        {
            number: 4,
            title: 'Performance & Reward Management',
            color: 'bg-[#0A5F6F]',
            items: [
                { code: '4.1', title: 'Integrated Performance Management System' },
                { code: '4.2', title: 'Excellence Performance Driven Culture' },
                { code: '4.3', title: 'Competitive Remuneration & Total Reward' }
            ]
        },
        {
            number: 5,
            title: 'HC Governance, IR & Policy',
            color: 'bg-[#0A5F6F]',
            items: [
                { code: '5.1', title: 'Integrated HCIS' },
                { code: '5.2', title: 'Employee & Industrial Relations (Harmonized Professional Productive)' },
                { code: '5.3', title: 'HC Good Governance & Policy' }
            ]
        }
    ];

    return (
        <AppLayoutFull title="Dashboard Human Capital PalmCo" description="Corporate Vision and Human Capital Strategy Dashboard">
            <Head title="Dashboard Human Capital PalmCo" />
            <main className="min-h-screen w-full bg-white">
                <HcHeader
                    logo="/images/danantara-logo.png"
                    rightLogo="/images/holding-logo.png"
                    navigation={navigation}
                />

                <header id="corporate-vision" className="bg-[#0A5F6F] text-white py-2 sm:py-3">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xs sm:text-sm font-semibold uppercase tracking-wide">Corporate Vision</h2>
                        </div>
                    </div>
                </header>

                <section className="bg-gradient-to-b from-[#0A5F6F] to-[#0D7589] text-white py-8 sm:py-12" aria-labelledby="hero-title">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <div className="flex items-center justify-center mb-3 sm:mb-4">
                                <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center">
                                   <img src="/images/palmco-logo.png" alt="PalmCo - Well Diversified & Sustainable Agro-Industri Company Logo" className="w-full h-full object-contain brightness-0 invert" />
                                </div>
                            </div>
                            <h1 id="hero-title" className="text-lg sm:text-xl lg:text-2xl font-bold italic mb-2 px-2">
                                Well Diversified & Sustainable Agro-Industri Company
                            </h1>
                        </div>
                    </div>
                </section>

                <header className="bg-[#0A5F6F] text-white py-2 sm:py-3">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xs sm:text-sm font-semibold uppercase tracking-wide">Business Prior</h2>
                        </div>
                    </div>
                </header>

                {/* Value Creation Section */}
                <section id="value-creation" className="bg-[#0D7589] py-6 sm:py-8">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-4 sm:mb-6">
                            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white italic">Value Creation</h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                            {valueCreationItems.map((item, index) => (
                                <div key={index} className="bg-[#0A5F6F] border-2 border-white/30 p-4 sm:p-6 flex items-center justify-center min-h-[80px]">
                                    <p className="text-xs sm:text-sm font-semibold leading-tight text-white text-center">{item.title}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <header id="hc-vision" className="bg-[#0A5F6F] text-white py-2 sm:py-3">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xs sm:text-sm font-semibold uppercase tracking-wide">HC Vision</h2>
                        </div>
                    </div>
                </header>

                <section className="bg-[#0D7589] py-8 sm:py-10" aria-labelledby="hc-vision-title">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-4 sm:mb-6">
                            <h2 id="hc-vision-title" className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">Human Capital Vision</h2>
                        </div>
                        <div className="max-w-4xl lg:max-w-5xl mx-auto px-2 sm:px-0">
                            <blockquote className="text-center text-sm sm:text-base lg:text-lg text-white leading-relaxed italic">
                                "Empower a <span className="text-white font-bold underline decoration-2 decoration-yellow-400">skilled, growth-oriented workforce</span> to drive{' '}
                                <span className="text-white font-bold underline decoration-2 decoration-yellow-400">sustainable value creation</span>, support{' '}
                                <span className="text-white font-bold underline decoration-2 decoration-yellow-400">business expansion</span>, and enable{' '}
                                <span className="text-white font-bold underline decoration-2 decoration-yellow-400">agile transformation</span> through{' '}
                                <span className="text-white font-bold underline decoration-2 decoration-yellow-400">digitalization</span>."
                            </blockquote>
                        </div>
                    </div>
                </section>

                <header id="hc-attribute" className="bg-[#0A5F6F] text-white py-2 sm:py-3">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xs sm:text-sm font-semibold uppercase tracking-wide">HC Attribute</h2>
                        </div>
                    </div>
                </header>

                <section className="bg-[#0D7589] py-8 sm:py-10" aria-labelledby="implementation-title">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 id="implementation-title" className="sr-only">Implementation Initiatives</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                            {implementationInitiatives.map((initiative, index) => (
                                <article key={index} className="bg-[#0A5F6F] border-2 border-white/20 p-4 sm:p-6">
                                    <h3 className="text-white font-bold text-xs sm:text-sm mb-3 sm:mb-4 pb-2 sm:pb-3 border-b border-yellow-400">
                                        {initiative.title}
                                    </h3>
                                    <ul className="space-y-1 sm:space-y-2">
                                        {initiative.items.map((item, itemIndex) => (
                                            <li key={itemIndex} className="flex items-start gap-2 text-xs text-white">
                                                <span className="text-yellow-400 font-bold mt-0.5" aria-hidden="true">•</span>
                                                <span className="text-xs leading-tight">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                <header id="hc-pillars" className="bg-[#0A5F6F] text-white py-2 sm:py-3">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xs sm:text-sm font-semibold uppercase tracking-wide">HC Pillars</h2>
                        </div>
                    </div>
                </header>

                <section className="bg-[#0D7589] py-8 sm:py-12" aria-labelledby="pillars-title">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-6 sm:mb-8 lg:mb-10">
                            <h2 id="pillars-title" className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2 px-2">5 Pilar HC PTPN III (Persero)</h2>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 lg:gap-6">
                            {pillars.map((pillar) => (
                                <article key={pillar.number} className="bg-white overflow-hidden">
                                    <header className="bg-[#0A5F6F] text-center py-3 sm:py-4 lg:py-5 px-3 sm:px-4">
                                        <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-1 sm:mb-2">
                                            PILAR {pillar.number}
                                        </h3>
                                        <div className="text-white text-xs leading-tight">
                                            {pillar.title}
                                        </div>
                                    </header>

                                    <div className="p-3 sm:p-4 space-y-2 sm:space-y-3 bg-gray-50">
                                        {pillar.items.map((item) => (
                                            <div key={item.code} className="bg-white border border-gray-200 p-2 sm:p-3">
                                                <h4 className="text-red-600 font-bold text-xs mb-1">
                                                    {item.code}
                                                </h4>
                                                <p className="text-gray-800 text-xs italic font-medium leading-tight">
                                                    {item.title}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                <footer className="bg-[#0A5F6F] py-4 sm:py-6">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center text-white text-xs sm:text-sm">
                            <p>© 2024 PTPN IV PALMCO - Human Capital Division</p>
                        </div>
                    </div>
                </footer>
            </main>
        </AppLayoutFull>
    );
}
