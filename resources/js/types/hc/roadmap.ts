export interface RoadmapItem {
    code: string;
    year: number;
    title: string;
}

export interface RoadmapRow {
    no: number;
    items: RoadmapItem[];
}

export interface RoadmapSection {
    pilar: string;
    no: number;
    rows: RoadmapRow[];
}

export interface Year {
    year: number;
    theme: string;
}

export interface Phase {
    title: string;
}

export interface ListProps {
    roadmapData: RoadmapSection[];
    years: Year[];
    phases: Phase[];
}