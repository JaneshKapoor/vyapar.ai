"use client";

import { useParams } from "next/navigation";
import { ReportView } from "@/components/report/ReportView";

export default function ProjectPage() {
    const params = useParams();
    const id = params.id as string;

    return <ReportView projectId={id} isDemo={false} />;
}
