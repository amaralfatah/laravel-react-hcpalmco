export interface Kpi {
    metric_name: string;
    uom: string;
    target: string;
    current_value?: number;
    achievement_percentage?: number;
}

export interface ActionPlan {
    id?: number;
    activity_number: string | number;
    activity_name: string;
    project_manager_status: string;
    start_date?: string;
    end_date?: string;
    display_order?: number;
    initiative_id?: number;
    monthly_progress?: MonthlyProgress[];
    monthly_progress_inputs?: Record<string, number>;
    duration_months?: number; // Computed from backend
    weight_percentage?: number; // Computed from backend
    cumulative_progress?: number; // Computed from backend
    yearly_impact?: number; // Computed from backend
}

export interface MonthlyProgress {
    id?: number;
    year: number;
    month: number;
    progress: number | string;
    monthly_contribution?: number;
}

export interface Risk {
    risk_description: string;
}

export interface RiskMitigation {
    mitigation_description: string;
}

export interface Dependency {
    dependency_description: string;
}

export interface SupportSystem {
    system_description: string;
}

export interface ParentingModel {
    model_name: string;
}

export interface Initiative {
    code: string;
    title: string;
    description: string;
    pilar: string;
    pilar_number?: number;
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

export interface InitiativeDetailProps {
    initiative: Initiative;
}
