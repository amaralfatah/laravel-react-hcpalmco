import { ArrowLeft, Plus } from 'lucide-react';
import AppLayoutFull from '@/layouts/app-layout-full';
import { Head } from '@inertiajs/react';
import HcSubHeader from '@/components/hc-sub-header';
import HcFooter from '@/components/hc-footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Link, router } from '@inertiajs/react';
import { useState } from 'react';
import ActionPlanModal from '@/components/ActionPlanModal';
import { useFlashMessages } from '@/hooks/use-flash-messages';

// Define TypeScript interfaces for the data structure
interface Kpi {
    metric_name: string;
    uom: string;
    target: string;
}

interface ActionPlan {
    id?: number;
    activity_number: string;
    activity_name: string;
    project_manager_status: string;
    due_date: string;
    current_month_progress: string;
    cumulative_progress: string;
    display_order?: number;
}

interface Risk {
    risk_description: string;
}

interface RiskMitigation {
    mitigation_description: string;
}

interface Dependency {
    dependency_description: string;
}

interface SupportSystem {
    system_description: string;
}

interface ParentingModel {
    model_name: string;
}

interface Initiative {
    code: string;
    title: string;
    description: string;
    pilar: string;
    duration: string;
    pic: string;
    budgetType: string;
    budgetAmount: string;
    kpis: Kpi[];
    actionPlans: ActionPlan[];
    risks: Risk[];
    riskMitigations: RiskMitigation[];
    dependencies: Dependency[];
    supportSystems: SupportSystem[];
    parentingModels: ParentingModel[];
}

interface InitiativeDetailProps {
    initiative: Initiative;
}

export default function InitiativeDetail({ initiative }: InitiativeDetailProps) {
    // Initialize flash messages hook
    useFlashMessages();
    
    // Extract data from initiative object
    const actionPlan = initiative.actionPlans || [];
    const risks = initiative.risks?.map(risk => risk.risk_description) || [];
    const mitigations = initiative.riskMitigations?.map(mitigation => mitigation.mitigation_description) || [];
    const dependencies = initiative.dependencies?.map(dep => dep.dependency_description) || [];
    const supportSystems = initiative.supportSystems?.map(system => system.system_description) || [];
    
    // State untuk modal operasional Action Plan
    const [showModal, setShowModal] = useState(false);
    const [modalMode, setModalMode] = useState<'view' | 'edit' | 'create' | 'delete'>('view');
    const [selectedActionPlan, setSelectedActionPlan] = useState<ActionPlan | null>(null);
    
    // Fungsi handler untuk operasi modal
    const handleRowClick = (item: ActionPlan) => {
        setSelectedActionPlan(item);
        setModalMode('view');
        setShowModal(true);
    };
    
    const handleAddNew = () => {
        setSelectedActionPlan(null);
        setModalMode('create');
        setShowModal(true);
    };
    
    const handleEdit = (item: ActionPlan) => {
        setSelectedActionPlan(item);
        setModalMode('edit');
        setShowModal(true);
    };
    
    const handleDelete = (item: ActionPlan) => {
        setSelectedActionPlan(item);
        setModalMode('delete');
        setShowModal(true);
    };
    
    const handleSave = async (data: ActionPlan) => {
        // Konversi tipe data untuk API
        const apiData = {
            ...data,
            activity_number: typeof data.activity_number === 'string' 
                ? parseInt(data.activity_number) 
                : data.activity_number,
            current_month_progress: typeof data.current_month_progress === 'string' 
                ? parseFloat(data.current_month_progress) 
                : data.current_month_progress,
            cumulative_progress: typeof data.cumulative_progress === 'string' 
                ? parseFloat(data.cumulative_progress) 
                : data.cumulative_progress,
        };
        
        try {
            if (modalMode === 'create') {
                router.post(`/initiatives/${initiative.code}/action-plans`, apiData, {
                    onSuccess: () => {
                        setShowModal(false);
                        // Refresh data using Inertia's reload method
                        router.reload({ only: ['initiative'] });
                    },
                    onError: (errors) => {
                        console.error('Error saving action plan:', errors);
                    }
                });
            } else {
                router.put(`/action-plans/${data.id}`, apiData, {
                    onSuccess: () => {
                        setShowModal(false);
                        // Refresh data using Inertia's reload method
                        router.reload({ only: ['initiative'] });
                    },
                    onError: (errors) => {
                        console.error('Error saving action plan:', errors);
                    }
                });
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    
    const handleDeleteConfirm = async (id: number) => {
        try {
            router.delete(`/action-plans/${id}`, {
                onSuccess: () => {
                    setShowModal(false);
                    // Refresh data using Inertia's reload method
                    router.reload({ only: ['initiative'] });
                },
                onError: (errors) => {
                    console.error('Error deleting action plan:', errors);
                }
            });
        } catch (error) {
            console.error('Error:', error);
        }
    };

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
                            <CardContent>
                                <Table className="text-[11px] border-collapse">
                                    <TableBody>
                                        {/* Initiative Strategic */}
                                        <TableRow>
                                            <TableCell className="bg-accent px-3 py-2 border  font-bold text-accent-foreground align-top w-28 whitespace-normal">
                                                Inisiatif<br />Strategis
                                            </TableCell>
                                            <TableCell className="px-3 py-2 border  font-bold text-gray-900 align-top whitespace-normal" colSpan={6}>
                                                {initiative.title}
                                            </TableCell>
                                        </TableRow>

                                        {/* Initiative Description */}
                                        <TableRow>
                                            <TableCell className="bg-accent px-3 py-2 border  font-bold text-accent-foreground align-top whitespace-normal">
                                                Deskripsi<br />Inisiatif &<br />Manfaat
                                            </TableCell>
                                            <TableCell className="px-3 py-2 border  text-gray-800 leading-relaxed text-justify align-top whitespace-normal" colSpan={6}>
                                                {initiative.description}
                                            </TableCell>
                                        </TableRow>

                                        {/* Duration */}
                                        <TableRow>
                                            <TableCell className="bg-accent px-3 py-2 border  font-bold text-accent-foreground align-top whitespace-normal">
                                                Duration
                                            </TableCell>
                                            <TableCell className="px-3 py-2 border  text-gray-900 align-top italic whitespace-normal" colSpan={6}>
                                                {initiative.duration}
                                            </TableCell>
                                        </TableRow>

                                        {/* Stream Lead */}
                                        <TableRow>
                                            <TableCell className="bg-accent px-3 py-2 border  font-bold text-accent-foreground align-top whitespace-normal">
                                                Stream Lead
                                            </TableCell>
                                            <TableCell className="px-3 py-2 border  font-bold text-gray-900 align-top whitespace-normal" colSpan={6}>
                                                {initiative.pic}
                                            </TableCell>
                                        </TableRow>

                                        {/* Budget Type */}
                                        <TableRow>
                                            <TableCell className="bg-accent px-3 py-2 border  font-bold text-accent-foreground align-top whitespace-normal">
                                                {initiative.budgetType}
                                            </TableCell>
                                            <TableCell className="px-3 py-2 border  font-bold text-gray-900 align-top italic whitespace-normal" colSpan={6}>
                                                {initiative.budgetAmount}
                                            </TableCell>
                                        </TableRow>

                                        {/* KPIs Section */}
                                        <TableRow>
                                            <TableCell className="bg-accent px-3 py-2 border  font-bold text-accent-foreground align-top text-center w-16 whitespace-normal" rowSpan={4}>
                                                KPI's
                                            </TableCell>
                                            <TableHead className="bg-gray-200 px-3 py-2 border  font-bold text-gray-900 align-top text-center whitespace-normal">
                                                Metric
                                            </TableHead>
                                            <TableHead className="bg-gray-200 px-3 py-2 border  font-bold text-gray-900 align-top text-center whitespace-normal">
                                                Value
                                            </TableHead>
                                            <TableHead className="bg-gray-200 px-3 py-2 border  font-bold text-gray-900 text-center align-top w-16 whitespace-normal">
                                                UOM
                                            </TableHead>
                                            <TableHead className="bg-gray-200 px-3 py-2 border  font-bold text-gray-900 text-center align-top w-16 whitespace-normal">
                                                Value
                                            </TableHead>
                                            <TableHead className="bg-gray-200 px-3 py-2 border  font-bold text-gray-900 text-center align-top w-32 whitespace-normal">
                                                Target
                                            </TableHead>
                                            <TableHead className="bg-gray-200 px-3 py-2 border  font-bold text-gray-900 text-center align-top whitespace-normal">
                                                Value
                                            </TableHead>
                                        </TableRow>

                                        <TableRow>
                                            <TableCell className="px-3 py-2 border  text-gray-800 align-top whitespace-normal">
                                                {initiative.kpis[0]?.metric_name}
                                            </TableCell>
                                            <TableCell className="px-3 py-2 border  text-gray-800 align-top whitespace-normal"></TableCell>
                                            <TableCell className="px-3 py-2 border  text-center text-gray-800 align-top whitespace-normal">
                                                {initiative.kpis[0]?.uom}
                                            </TableCell>
                                            <TableCell className="px-3 py-2 border  text-center text-gray-800 align-top whitespace-normal"></TableCell>
                                            <TableCell className="px-3 py-2 border  text-center font-bold text-gray-900 align-top whitespace-normal">
                                                {initiative.kpis[0]?.target}
                                            </TableCell>
                                            <TableCell className="px-3 py-2 border  text-center text-gray-800 align-top whitespace-normal"></TableCell>
                                        </TableRow>

                                        <TableRow>
                                            <TableCell className="px-3 py-2 border  text-gray-800 align-top whitespace-normal">
                                                {initiative.kpis[1]?.metric_name}
                                            </TableCell>
                                            <TableCell className="px-3 py-2 border  text-gray-800 align-top whitespace-normal"></TableCell>
                                            <TableCell className="px-3 py-2 border  text-center text-gray-800 align-top whitespace-normal">
                                                {initiative.kpis[1]?.uom}
                                            </TableCell>
                                            <TableCell className="px-3 py-2 border  text-center text-gray-800 align-top whitespace-normal"></TableCell>
                                            <TableCell className="px-3 py-2 border  text-center font-bold text-gray-900 align-top whitespace-normal">
                                                {initiative.kpis[1]?.target}
                                            </TableCell>
                                            <TableCell className="px-3 py-2 border  text-center text-gray-800 align-top whitespace-normal"></TableCell>
                                        </TableRow>

                                        <TableRow>
                                            <TableCell className="px-3 py-2 border  text-gray-800 align-top whitespace-normal">
                                                {initiative.kpis[2]?.metric_name}
                                            </TableCell>
                                            <TableCell className="px-3 py-2 border  text-gray-800 align-top whitespace-normal"></TableCell>
                                            <TableCell className="px-3 py-2 border  text-center text-gray-800 align-top whitespace-normal">
                                                {initiative.kpis[2]?.uom}
                                            </TableCell>
                                            <TableCell className="px-3 py-2 border  text-center text-gray-800 align-top whitespace-normal"></TableCell>
                                            <TableCell className="px-3 py-2 border  text-center font-bold text-gray-900 align-top whitespace-normal">
                                                {initiative.kpis[2]?.target}
                                            </TableCell>
                                            <TableCell className="px-3 py-2 border  text-center text-gray-800 align-top whitespace-normal"></TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>

                        {/* Action Plan */}
                        <Card className="mb-6">
                            <CardHeader className="flex flex-row items-center justify-between">
                                <CardTitle>Action Plan, Roadmap, and Milestones</CardTitle>
                                <Button onClick={handleAddNew} className="flex items-center gap-2">
                                    <Plus className="w-4 h-4" />
                                    Add Action Plan
                                </Button>
                            </CardHeader>
                            <CardContent>
                                <Table className='border'>
                                    <TableHeader>
                                        <TableRow className="bg-accent">
                                            <TableHead className="w-16 border border-gray-300">No</TableHead>
                                            <TableHead className="w-96 border border-gray-300">Activity</TableHead>
                                            <TableHead className="w-16 text-center border border-gray-300">PM</TableHead>
                                            <TableHead className="w-24 text-center border border-gray-300">Due Date</TableHead>
                                            <TableHead className="w-24 text-center border border-gray-300">Bulan Ini</TableHead>
                                            <TableHead className="w-24 text-center border border-gray-300">sd. Bulan Ini</TableHead>
                                            <TableHead className="w-24 text-center border border-gray-300">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {actionPlan.map((item, index) => (
                                            <TableRow key={index} className="cursor-pointer hover:bg-gray-50">
                                                <TableCell 
                                                    className="text-center border border-gray-300"
                                                    onClick={() => handleRowClick(item)}
                                                >
                                                    {item.activity_number}
                                                </TableCell>
                                                <TableCell 
                                                    className="max-w-xs whitespace-normal border border-gray-300"
                                                    onClick={() => handleRowClick(item)}
                                                >
                                                    {item.activity_name}
                                                </TableCell>
                                                <TableCell 
                                                    className="text-center border border-gray-300"
                                                    onClick={() => handleRowClick(item)}
                                                >
                                                    <div className={`inline-block w-3 h-3 rounded-full ${
                                                        item.project_manager_status === 'green' ? 'bg-green-500' :
                                                        item.project_manager_status === 'yellow' ? 'bg-yellow-400' : 'bg-blue-500'
                                                    }`}></div>
                                                </TableCell>
                                                <TableCell 
                                                    className="text-center border border-gray-300"
                                                    onClick={() => handleRowClick(item)}
                                                >
                                                    {item.due_date}
                                                </TableCell>
                                                <TableCell 
                                                    className="text-center border border-gray-300"
                                                    onClick={() => handleRowClick(item)}
                                                >
                                                    {item.current_month_progress}%
                                                </TableCell>
                                                <TableCell 
                                                    className="text-center border border-gray-300"
                                                    onClick={() => handleRowClick(item)}
                                                >
                                                    {item.cumulative_progress}%
                                                </TableCell>
                                                <TableCell className="text-center border border-gray-300">
                                                    <div className="flex justify-center gap-2">
                                                        <Button 
                                                            variant="outline" 
                                                            size="sm" 
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleEdit(item);
                                                            }}
                                                        >
                                                            Edit
                                                        </Button>
                                                        <Button 
                                                            variant="outline" 
                                                            size="sm" 
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleDelete(item);
                                                            }}
                                                        >
                                                            Delete
                                                        </Button>
                                                    </div>
                                                </TableCell>
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
            
            {/* Action Plan Modal */}
            <ActionPlanModal
                show={showModal}
                mode={modalMode}
                actionPlan={selectedActionPlan}
                initiativeKpis={initiative.kpis}
                onClose={() => setShowModal(false)}
                onSave={handleSave as any}
                onDelete={handleDeleteConfirm}
            />
            
            <HcFooter />
        </AppLayoutFull>
    );
}
