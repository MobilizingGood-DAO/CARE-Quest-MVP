import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  getMetrics, 
  commitments as allCommitments,
  commitmentTypeLabels,
} from "@/lib/data";
import { Users, Briefcase, BarChart3, DollarSign } from "lucide-react";
import Link from "next/link";

const programs = [
  { name: "Build Games", count: 0 },
  { name: "Codebase", count: 0 },
  { name: "InfraBUIDL()", count: 0 },
  { name: "Other", count: 0 },
  { name: "Retro9000", count: 0 },
];

function MetricCard({ 
  title, 
  value, 
  icon: Icon, 
  accentWidth,
}: { 
  title: string; 
  value: number | string; 
  icon: React.ElementType;
  accentWidth: string;
}) {
  return (
    <Card className="relative overflow-hidden bg-card border-border">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-lg bg-primary/10">
            <Icon className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold mt-1">{value}</p>
          </div>
        </div>
      </CardContent>
      <div className={`absolute bottom-0 left-0 h-1 bg-primary ${accentWidth}`} />
    </Card>
  );
}

function ProgramCard({ name, count }: { name: string; count: number }) {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold">{name}</CardTitle>
          <span className="text-xs px-2 py-1 rounded bg-muted text-muted-foreground">
            {count} projects
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">No projects yet</p>
      </CardContent>
    </Card>
  );
}

export default function DashboardPage() {
  const metrics = getMetrics();

  return (
    <div className="container py-8 px-4 md:px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Overview of all builder commitments to public goods</p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <MetricCard
          title="Total Builders"
          value={metrics.activeBuilders}
          icon={Users}
          accentWidth="w-1/4"
        />
        <MetricCard
          title="Total Projects"
          value={metrics.registeredCommitments}
          icon={Briefcase}
          accentWidth="w-1/2"
        />
        <MetricCard
          title="Avg Pledge"
          value={`${5.0}%`}
          icon={BarChart3}
          accentWidth="w-3/4"
        />
        <MetricCard
          title="Est. Pledge Value"
          value={`$${metrics.totalValue.toLocaleString()}`}
          icon={DollarSign}
          accentWidth="w-full"
        />
      </div>

      {/* Program Cards */}
      <div className="space-y-4 mb-8">
        {programs.map((program) => (
          <ProgramCard key={program.name} name={program.name} count={program.count} />
        ))}
      </div>

      {/* All Commitments */}
      <Card className="bg-card border-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>All Commitments</CardTitle>
            <Button asChild variant="outline" size="sm">
              <Link href="/register">Add New</Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
          <p className="text-muted-foreground mb-4">No commitments yet</p>
          <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link href="/register">Be the first to pledge</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
