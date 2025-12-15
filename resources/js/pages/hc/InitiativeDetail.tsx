import ActionPlanModal from '@/components/hc/ActionPlanModal';
import HcFooter from '@/components/hc/HcFooter';
import HcSubHeader from '@/components/hc/HcSubHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { useFlashMessages } from '@/hooks/use-flash-messages';
import AppLayoutFull from '@/layouts/app-layout-full';
import { Head, Link, router } from '@inertiajs/react';
import { ArrowLeft, Plus } from 'lucide-react';
import { useState } from 'react';
import { ActionPlan, InitiativeDetailProps } from '@/types/hc';

export default function InitiativeDetail({
    initiative,
}: InitiativeDetailProps) {
    // Initialize flash messages hook
    useFlashMessages();

    // Extract data from initiative object
    const actionPlan = initiative.actionPlans || [];
    const risks = initiative.risks?.map((risk) => risk.risk_description) || [];
    const mitigations =
        initiative.riskMitigations?.map(
            (mitigation) => mitigation.mitigation_description,
        ) || [];
    const dependencies =
        initiative.dependencies?.map((dep) => dep.dependency_description) || [];
    const supportSystems =
        initiative.supportSystems?.map((system) => system.system_description) ||
        [];

    // State untuk modal operasional Action Plan
    const [showModal, setShowModal] = useState(false);
    const [modalMode, setModalMode] = useState<
        'view' | 'edit' | 'create' | 'delete'
    >('view');
    const [selectedActionPlan, setSelectedActionPlan] =
        useState<ActionPlan | null>(null);



    // Fungsi untuk memformat tanggal menjadi format 'Jan-Mar 2026' atau 'Jan 2026'
    const formatDueDate = (startDate?: string, endDate?: string): string => {
        if (!endDate) return '-';

        const monthNames = [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
        ];

        try {
            const end = new Date(endDate);
            const endMonth = monthNames[end.getMonth()];
            const endYear = end.getFullYear();

            // Jika ada start_date, format sebagai rentang
            if (startDate) {
                const start = new Date(startDate);
                const startMonth = monthNames[start.getMonth()];
                const startYear = start.getFullYear();

                // Jika tahun sama, tampilkan 'Jan-Mar 2026'
                if (startYear === endYear) {
                    // Jika bulan sama, tampilkan 'Jan 2026'
                    if (startMonth === endMonth) {
                        return `${startMonth} ${startYear}`;
                    }
                    return `${startMonth}-${endMonth} ${endYear}`;
                } else {
                    // Jika tahun berbeda, tampilkan 'Jan 2025-Mar 2026'
                    return `${startMonth} ${startYear}-${endMonth} ${endYear}`;
                }
            } else {
                // Jika hanya ada end_date, tampilkan 'Mar 2026'
                return `${endMonth} ${endYear}`;
            }
        } catch (error) {
            console.error('Error formatting date:', error);
            return endDate;
        }
    };

    // Mock current date untuk testing - ubah tanggal sesuai kebutuhan testing
    // ==================== START TESTING BLOCK ====================
    // Untuk production: comment out seluruh block ini sampai END TESTING BLOCK
    // const MOCK_CURRENT_DATE = new Date('2026-01-15'); // Testing Januari 2026
    // const MOCK_CURRENT_DATE = new Date('2025-12-15'); // Testing Desember 2025
    // const MOCK_CURRENT_DATE = new Date('2026-02-15'); // Testing Februari 2026
    // ===================== END TESTING BLOCK =====================

    // Fungsi untuk mengambil progress bulan ini
    const getCurrentMonthProgress = (item: ActionPlan): number => {
        if (!item.monthly_progress || item.monthly_progress.length === 0) {
            return 0;
        }

        // Gunakan mock date untuk testing, atau current date untuk production
        // @ts-ignore - MOCK_CURRENT_DATE mungkin undefined di production
        const currentDate = (typeof MOCK_CURRENT_DATE !== 'undefined') ? MOCK_CURRENT_DATE : new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1; // JavaScript months are 0-indexed

        const currentMonthData = item.monthly_progress.find(
            (progress) => progress.year === currentYear && progress.month === currentMonth
        );

        return currentMonthData ? Number(currentMonthData.progress) : 0;
    };

    // Fungsi untuk formatting persentase
    const formatPercentage = (value: number | string | undefined): string => {
        const numValue = Number(value) || 0;
        return numValue.toFixed(2);
    };

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
        // Ensure the item has an ID before proceeding
        if (!item.id) {
            console.error('Action plan does not have an ID:', item);
            return;
        }
        setSelectedActionPlan(item);
        setModalMode('edit');
        setShowModal(true);
    };

    const handleDelete = (item: ActionPlan) => {
        console.log('Deleting action plan:', item);
        // Ensure the item has an ID before proceeding
        if (!item.id) {
            console.error('Action plan does not have an ID:', item);
            return;
        }
        setSelectedActionPlan(item);
        setModalMode('delete');
        setShowModal(true);
    };

    const handleSave = async (data: ActionPlan) => {
        // Get initiative ID from the URL or initiative data
        const initiativeCode = initiative.code;

        // Konversi tipe data untuk API
        const apiData = {
            ...data,
            activity_number:
                typeof data.activity_number === 'string'
                    ? parseInt(data.activity_number)
                    : data.activity_number,
            display_order:
                typeof data.display_order === 'string'
                    ? parseInt(data.display_order)
                    : data.display_order,
            // Remove initiative_id from data for create operation since it's set in the controller
            initiative_id:
                modalMode === 'create' ? undefined : data.initiative_id,
            // Ensure monthly_progress is passed if present
            monthly_progress:
                data.monthly_progress_inputs || data.monthly_progress,
        };

        try {
            if (modalMode === 'create') {
                router.post(
                    `/initiatives/${initiativeCode}/action-plans`,
                    apiData as any,
                    {
                        onSuccess: () => {
                            setShowModal(false);
                            // Refresh data using Inertia's reload method
                            router.reload({ only: ['initiative'] });
                        },
                        onError: (errors) => {
                            console.error('Error saving action plan:', errors);
                            // Show error messages to user
                            if (errors) {
                                Object.keys(errors).forEach((key) => {
                                    console.error(`${key}: ${errors[key]}`);
                                });
                            }
                        },
                    },
                );
            } else {
                router.put(`/action-plans/${data.id}`, apiData as any, {
                    onSuccess: () => {
                        setShowModal(false);
                        // Refresh data using Inertia's reload method
                        router.reload({ only: ['initiative'] });
                    },
                    onError: (errors) => {
                        console.error('Error saving action plan:', errors);
                        // Show error messages to user
                        if (errors) {
                            Object.keys(errors).forEach((key) => {
                                console.error(`${key}: ${errors[key]}`);
                            });
                        }
                    },
                });
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleDeleteConfirm = async (id: number) => {
        // Validate ID before proceeding
        if (!id || id === undefined || id === null) {
            console.error('Invalid action plan ID:', id);
            return;
        }

        try {
            router.delete(`/action-plans/${id}`, {
                onSuccess: () => {
                    setShowModal(false);
                    // Refresh data using Inertia's reload method
                    router.reload({ only: ['initiative'] });
                },
                onError: (errors) => {
                    console.error('Error deleting action plan:', errors);
                },
            });
        } catch (error) {
            console.error('Error:', error);
        }
    };



    const parentingModel = [
        { label: 'Sentralisasi', color: 'bg-blue-600' },
        { label: 'Koordinasi', color: 'bg-yellow-400' },
        { label: 'Desentralisasi', color: 'bg-green-600' },
    ];

    return (
        <AppLayoutFull
            title="HC Initiative Detail"
            description="Human Capital Initiative Detail View"
        >
            <Head title="Initiative Detail - Human Capital PalmCo" />
            <HcSubHeader
                title="PTPN IV Palmco HC INITIATIVE STRATEGY"
                subtitle=""
            />

            {/* Header */}
            <div className="border-b border-gray-200 bg-white">
                <div className="container mx-auto px-4 py-3 sm:px-6 lg:px-8">
                    <Link
                        href={initiative.pilar_number ? `/list?pilar=${initiative.pilar_number}` : "/list"}
                        className="flex items-center gap-2 transition-opacity hover:opacity-70"
                    >
                        <ArrowLeft className="h-5 w-5 text-gray-600" />
                        <span className="text-sm text-gray-600">
                            Back to Initiatives
                        </span>
                    </Link>
                </div>
            </div>

            {/* Title Banner */}
            <div className="bg-primary text-primary-foreground">
                <div className="container mx-auto px-4 py-3 sm:px-6 lg:px-8">
                    <h1 className="text-lg font-bold sm:text-xl">
                        {initiative.pilar}{' '}
                        <span className="font-normal italic">
                            ({initiative.code})
                        </span>
                    </h1>
                </div>
            </div>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
                    {/* Left Column */}
                    <div className="lg:col-span-8">
                        {/* Top Section - Initiative Details */}
                        <Card className="mb-6">
                            <CardHeader>
                                <CardTitle>Initiative Details</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Table className="border-collapse text-[11px]">
                                    <TableBody>
                                        {/* Initiative Strategic */}
                                        <TableRow>
                                            <TableCell className="w-28 border bg-accent px-3 py-2 align-top font-bold whitespace-normal text-accent-foreground">
                                                Inisiatif
                                                <br />
                                                Strategis
                                            </TableCell>
                                            <TableCell
                                                className="border px-3 py-2 align-top font-bold whitespace-normal text-gray-900"
                                                colSpan={6}
                                            >
                                                {initiative.title}
                                            </TableCell>
                                        </TableRow>

                                        {/* Initiative Description */}
                                        <TableRow>
                                            <TableCell className="border bg-accent px-3 py-2 align-top font-bold whitespace-normal text-accent-foreground">
                                                Deskripsi
                                                <br />
                                                Inisiatif &<br />
                                                Manfaat
                                            </TableCell>
                                            <TableCell
                                                className="border px-3 py-2 text-justify align-top leading-relaxed whitespace-normal text-gray-800"
                                                colSpan={6}
                                            >
                                                {initiative.description}
                                            </TableCell>
                                        </TableRow>

                                        {/* Duration */}
                                        <TableRow>
                                            <TableCell className="border bg-accent px-3 py-2 align-top font-bold whitespace-normal text-accent-foreground">
                                                Duration
                                            </TableCell>
                                            <TableCell
                                                className="border px-3 py-2 align-top whitespace-normal text-gray-900 italic"
                                                colSpan={6}
                                            >
                                                {initiative.duration}
                                            </TableCell>
                                        </TableRow>

                                        {/* Stream Lead */}
                                        <TableRow>
                                            <TableCell className="border bg-accent px-3 py-2 align-top font-bold whitespace-normal text-accent-foreground">
                                                Stream Lead
                                            </TableCell>
                                            <TableCell
                                                className="border px-3 py-2 align-top font-bold whitespace-normal text-gray-900"
                                                colSpan={6}
                                            >
                                                {initiative.pic}
                                            </TableCell>
                                        </TableRow>

                                        {/* Budget Type */}
                                        <TableRow>
                                            <TableCell className="border bg-accent px-3 py-2 align-top font-bold whitespace-normal text-accent-foreground">
                                                {initiative.budgetType}
                                            </TableCell>
                                            <TableCell
                                                className="border px-3 py-2 align-top font-bold whitespace-normal text-gray-900 italic"
                                                colSpan={6}
                                            >
                                                {initiative.budgetAmount}
                                            </TableCell>
                                        </TableRow>

                                        {/* KPIs Section */}
                                        <TableRow>
                                            <TableCell
                                                className="w-16 border bg-accent px-3 py-2 text-center align-top font-bold whitespace-normal text-accent-foreground"
                                                rowSpan={4}
                                            >
                                                KPI's
                                            </TableCell>
                                            <TableHead className="border bg-gray-200 px-3 py-2 text-center align-top font-bold whitespace-normal text-gray-900">
                                                Metric
                                            </TableHead>
                                            <TableHead className="w-16 border bg-gray-200 px-3 py-2 text-center align-top font-bold whitespace-normal text-gray-900">
                                                UOM
                                            </TableHead>
                                            <TableHead className="w-32 border bg-gray-200 px-3 py-2 text-center align-top font-bold whitespace-normal text-gray-900">
                                                Target
                                            </TableHead>
                                        </TableRow>

                                        <TableRow>
                                            <TableCell className="border px-3 py-2 align-top whitespace-normal text-gray-800">
                                                {
                                                    initiative.kpis[0]
                                                        ?.metric_name
                                                }
                                            </TableCell>
                                            <TableCell className="border px-3 py-2 text-center align-top whitespace-normal text-gray-800">
                                                {initiative.kpis[0]?.uom}
                                            </TableCell>
                                            <TableCell className="border px-3 py-2 text-center align-top font-bold whitespace-normal text-gray-900">
                                                {initiative.kpis[0]?.target}
                                            </TableCell>
                                        </TableRow>

                                        <TableRow>
                                            <TableCell className="border px-3 py-2 align-top whitespace-normal text-gray-800">
                                                {
                                                    initiative.kpis[1]
                                                        ?.metric_name
                                                }
                                            </TableCell>
                                            <TableCell className="border px-3 py-2 text-center align-top whitespace-normal text-gray-800">
                                                {initiative.kpis[1]?.uom}
                                            </TableCell>
                                            <TableCell className="border px-3 py-2 text-center align-top font-bold whitespace-normal text-gray-900">
                                                {initiative.kpis[1]?.target}
                                            </TableCell>
                                        </TableRow>

                                        <TableRow>
                                            <TableCell className="border px-3 py-2 align-top whitespace-normal text-gray-800">
                                                {
                                                    initiative.kpis[2]
                                                        ?.metric_name
                                                }
                                            </TableCell>
                                            <TableCell className="border px-3 py-2 text-center align-top whitespace-normal text-gray-800">
                                                {initiative.kpis[2]?.uom}
                                            </TableCell>
                                            <TableCell className="border px-3 py-2 text-center align-top font-bold whitespace-normal text-gray-900">
                                                {initiative.kpis[2]?.target}
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>

                        {/* Action Plan */}
                        <Card className="mb-6">
                            <CardHeader className="flex flex-row items-center justify-between">
                                <CardTitle>
                                    Action Plan, Roadmap, and Milestones
                                </CardTitle>
                                <Button
                                    onClick={handleAddNew}
                                    className="flex items-center gap-2"
                                >
                                    <Plus className="h-4 w-4" />
                                    Add Action Plan
                                </Button>
                            </CardHeader>
                            <CardContent>
                                <Table className="border">
                                    <TableHeader>
                                        <TableRow className="bg-accent">
                                            <TableHead className="w-16 border border-gray-300">
                                                No
                                            </TableHead>
                                            <TableHead className="w-96 border border-gray-300">
                                                Activity
                                            </TableHead>
                                            <TableHead className="w-16 border border-gray-300 text-center">
                                                PM
                                            </TableHead>
                                            <TableHead className="w-24 border border-gray-300 text-center">
                                                Due Date
                                            </TableHead>
                                            <TableHead className="w-24 border border-gray-300 text-center">
                                                Bulan Ini
                                            </TableHead>
                                            <TableHead className="w-24 border border-gray-300 text-center">
                                                sd. Bulan ini
                                            </TableHead>
                                            <TableHead className="w-24 border border-gray-300 text-center">
                                                Actions
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {actionPlan.map((item, index) => (
                                            <TableRow
                                                key={index}
                                                className="cursor-pointer hover:bg-gray-50"
                                            >
                                                <TableCell
                                                    className="border border-gray-300 text-center"
                                                    onClick={() =>
                                                        handleRowClick(item)
                                                    }
                                                >
                                                    {item.activity_number || ''}
                                                </TableCell>
                                                <TableCell
                                                    className="max-w-xs border border-gray-300 whitespace-normal"
                                                    onClick={() =>
                                                        handleRowClick(item)
                                                    }
                                                >
                                                    {item.activity_name || ''}
                                                </TableCell>
                                                <TableCell
                                                    className="border border-gray-300 text-center"
                                                    onClick={() =>
                                                        handleRowClick(item)
                                                    }
                                                >
                                                    <div
                                                        className={`inline-block h-3 w-3 rounded-full ${
                                                            item.project_manager_status ===
                                                            'green'
                                                                ? 'bg-green-500'
                                                                : item.project_manager_status ===
                                                                    'yellow'
                                                                  ? 'bg-yellow-400'
                                                                  : item.project_manager_status ===
                                                                      'red'
                                                                    ? 'bg-red-500'
                                                                    : 'bg-blue-500'
                                                        }`}
                                                    ></div>
                                                </TableCell>
                                                <TableCell
                                                    className="border border-gray-300 text-center"
                                                    onClick={() =>
                                                        handleRowClick(item)
                                                    }
                                                >
                                                    {formatDueDate(
                                                        item.start_date || '',
                                                        item.end_date || '',
                                                    )}
                                                </TableCell>
                                                <TableCell
                                                    className="border border-gray-300 text-center"
                                                    onClick={() =>
                                                        handleRowClick(item)
                                                    }
                                                >
                                                    {formatPercentage(getCurrentMonthProgress(item))}%
                                                </TableCell>
                                                <TableCell
                                                    className="border border-gray-300 text-center"
                                                    onClick={() =>
                                                        handleRowClick(item)
                                                    }
                                                >
                                                    {formatPercentage(item.cumulative_progress)}%
                                                </TableCell>
                                                <TableCell className="border border-gray-300 text-center">
                                                    <div className="flex justify-center gap-2">
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleEdit(
                                                                    item,
                                                                );
                                                            }}
                                                        >
                                                            Edit
                                                        </Button>
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleDelete(
                                                                    item,
                                                                );
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
                                <div className="flex flex-wrap justify-center gap-4 py-4">
                                    {parentingModel.map((model, index) => (
                                        <div
                                            key={index}
                                            className="text-center"
                                        >
                                            <div
                                                className={`h-16 w-16 rounded-full ${model.color} mx-auto mb-2 flex items-center justify-center text-xs font-bold text-white`}
                                            >
                                                {index + 1}
                                            </div>
                                            <div className="text-xs font-medium">
                                                {model.label}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6 lg:col-span-4">
                        {/* Risk */}
                        <Card className="mb-6">
                            <CardHeader>
                                <CardTitle>Risk</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2 py-2">
                                    {risks.map((risk, index) => (
                                        <li
                                            key={index}
                                            className="flex items-start text-sm"
                                        >
                                            <span className="mr-2 text-destructive">
                                                •
                                            </span>
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
                                        <li
                                            key={index}
                                            className="flex items-start text-sm"
                                        >
                                            <span className="mr-2 text-green-600">
                                                •
                                            </span>
                                            {mitigation}
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>

                        {/* Dependencies */}
                        <Card className="mb-6">
                            <CardHeader>
                                <CardTitle>
                                    Dependencies with Other Initiatives and
                                    Teams
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2 py-2">
                                    {dependencies.map((dep, index) => (
                                        <li
                                            key={index}
                                            className="flex items-start text-sm"
                                        >
                                            <span className="mr-2 text-blue-600">
                                                •
                                            </span>
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
                                        <li
                                            key={index}
                                            className="flex items-start text-sm"
                                        >
                                            <span className="mr-2 text-purple-600">
                                                •
                                            </span>
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
                onSave={handleSave}
                onDelete={handleDeleteConfirm}
            />

            <HcFooter />
        </AppLayoutFull>
    );
}
