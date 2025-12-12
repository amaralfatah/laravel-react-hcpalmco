import { Head } from '@inertiajs/react';
import AppLayoutFull from '@/layouts/app-layout-full';
import HcHeader from '@/components/hc-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building2, Users, BookOpen, TrendingUp, Target, Settings, Database, BarChart3, Sprout, CheckCircle2, Shield, Award, Zap, BookOpenCheck } from 'lucide-react';

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
            <div className="min-h-screen w-full bg-white">
                <HcHeader
                    logo="/images/danantara-logo.png"
                    rightLogo="/images/holding-logo.png"
                    navigation={navigation}
                />

                {/* Corporate Vision Header - Dark Teal */}
                <section id="corporate-vision" className="bg-[#0A5F6F] text-white py-3">
                    <div className="container mx-auto px-8">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-semibold uppercase tracking-wide">Corporate Vision</span>
                        </div>
                    </div>
                </section>

                {/* Hero Section with Palm Tree Icon */}
                <section className="bg-gradient-to-b from-[#0A5F6F] to-[#0D7589] text-white py-12">
                    <div className="container mx-auto px-8">
                        <div className="text-center">
                            <div className="flex items-center justify-center mb-4">
                                <div className="w-20 h-20 flex items-center justify-center">
                                   <img src="/images/palmco-logo.png" alt="Palmco Logo" className="w-full h-full object-contain brightness-0 invert" />
                                </div>
                            </div>
                            <h1 className="text-2xl font-bold italic mb-2">
                                Well Diversified & Sustainable Agro-Industri Company
                            </h1>
                        </div>
                    </div>
                </section>

                {/* Business Prior Header */}
                <section className="bg-[#0A5F6F] text-white py-3">
                    <div className="container mx-auto px-8">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-semibold uppercase tracking-wide">Business Prior</span>
                        </div>
                    </div>
                </section>

                {/* Value Creation Section */}
                <section id="value-creation" className="bg-[#0D7589] py-8">
                    <div className="container mx-auto px-8">
                        <div className="text-center mb-6">
                            <h2 className="text-3xl font-bold text-white italic">Value Creation</h2>
                        </div>
                        <div className="grid grid-cols-5 gap-4">
                            {valueCreationItems.map((item, index) => (
                                <div key={index} className="bg-[#0A5F6F] border-2 border-white/30 p-6 text-center">
                                    <div className="text-white">
                                        <p className="text-sm font-semibold leading-tight">{item.title}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* HC Vision Header */}
                <section id="hc-vision" className="bg-[#0A5F6F] text-white py-3">
                    <div className="container mx-auto px-8">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-semibold uppercase tracking-wide">HC Vision</span>
                        </div>
                    </div>
                </section>

                {/* Vision Statement */}
                <section className="bg-[#0D7589] py-10">
                    <div className="container mx-auto px-8">
                        <div className="text-center mb-6">
                            <h3 className="text-2xl font-bold text-white mb-4">Human Capital Vision</h3>
                        </div>
                        <div className="max-w-5xl mx-auto">
                            <p className="text-center text-lg text-white leading-relaxed italic">
                                "Empower a <span className="text-yellow-300 font-semibold">skilled, growth-oriented workforce</span> to drive{' '}
                                <span className="text-yellow-300 font-semibold">sustainable value creation</span>, support{' '}
                                <span className="text-yellow-300 font-semibold">business expansion</span>, and enable{' '}
                                <span className="text-yellow-300 font-semibold">agile transformation</span> through{' '}
                                <span className="text-yellow-300 font-semibold">digitalization</span>."
                            </p>
                        </div>
                    </div>
                </section>

                {/* HC Attribute Header */}
                <section id="hc-attribute" className="bg-[#0A5F6F] text-white py-3">
                    <div className="container mx-auto px-8">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-semibold uppercase tracking-wide">HC Attribute</span>
                        </div>
                    </div>
                </section>

                {/* Implementation Initiatives */}
                <section className="bg-[#0D7589] py-10">
                    <div className="container mx-auto px-8">
                        <div className="grid grid-cols-4 gap-6">
                            {implementationInitiatives.map((initiative, index) => (
                                <div key={index} className="bg-[#0A5F6F] border-2 border-white/20 p-6">
                                    <h3 className="text-white font-bold text-sm mb-4 pb-3 border-b border-yellow-400">
                                        {initiative.title}
                                    </h3>
                                    <ul className="space-y-2">
                                        {initiative.items.map((item, itemIndex) => (
                                            <li key={itemIndex} className="flex items-start gap-2 text-xs text-white">
                                                <span className="text-yellow-400 font-bold mt-0.5">•</span>
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* HC Pillars Header */}
                <section id="hc-pillars" className="bg-[#0A5F6F] text-white py-3">
                    <div className="container mx-auto px-8">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-semibold uppercase tracking-wide">HC Pillars</span>
                        </div>
                    </div>
                </section>

                {/* 5 Pillars Section */}
                <section className="bg-[#0D7589] py-12">
                    <div className="container mx-auto px-8">
                        <div className="text-center mb-10">
                            <h2 className="text-4xl font-bold text-white mb-2">5 Pilar HC PTPN III (Persero)</h2>
                        </div>

                        <div className="grid grid-cols-5 gap-6">
                            {pillars.map((pillar) => (
                                <div key={pillar.number} className="bg-white overflow-hidden">
                                    {/* Header dengan gradient kuning-orange */}
                                    <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-center py-5 px-4">
                                        <div className="text-[#0A5F6F] font-black text-3xl mb-2">
                                            PILAR {pillar.number}
                                        </div>
                                        <div className="text-[#0A5F6F] font-bold text-xs leading-tight uppercase">
                                            {pillar.title}
                                        </div>
                                    </div>

                                    {/* Content items */}
                                    <div className="p-4 space-y-3 bg-gray-50">
                                        {pillar.items.map((item) => (
                                            <div key={item.code} className="bg-white border border-gray-200 p-3">
                                                <div className="text-red-600 font-bold text-xs mb-1">
                                                    {item.code}
                                                </div>
                                                <div className="text-gray-800 text-xs italic font-medium leading-tight">
                                                    {item.title}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <section className="bg-[#0A5F6F] py-6">
                    <div className="container mx-auto px-8">
                        <div className="text-center text-white text-sm">
                            <p>© 2024 PTPN IV PALMCO - Human Capital Division</p>
                        </div>
                    </div>
                </section>
            </div>
        </AppLayoutFull>
    );
}
