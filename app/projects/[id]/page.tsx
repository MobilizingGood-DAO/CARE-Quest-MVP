import { notFound } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  projects,
  getProject, 
  getBuilder,
  getProjectCommitments,
  commitmentTypeLabels,
  statusColors,
} from "@/lib/data";
import { 
  ExternalLink, 
  Github, 
  Calendar,
  FileText,
  CheckCircle2,
  Clock,
  ArrowUpRight
} from "lucide-react";
import Link from "next/link";

export function generateStaticParams() {
  return projects.map((project) => ({
    id: project.id,
  }));
}

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = getProject(id);
  
  if (!project) {
    notFound();
  }

  const builder = getBuilder(project.builder_id);
  const projectCommitments = getProjectCommitments(id);
  const completedCount = projectCommitments.filter(c => c.status === 'completed').length;
  const activeCount = projectCommitments.filter(c => c.status === 'active').length;

  return (
    <div className="container py-8 px-4 md:px-6">
      {/* Project Header */}
      <div className="mb-8">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">{project.project_name}</h1>
            <p className="text-muted-foreground max-w-2xl">{project.description}</p>
          </div>
          {project.github_repo && (
            <a 
              href={project.github_repo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border/50 bg-card/50 hover:bg-muted/50 transition-colors"
            >
              <Github className="h-4 w-4" />
              View on GitHub
              <ArrowUpRight className="h-3 w-3" />
            </a>
          )}
        </div>

        <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
          {builder && (
            <Link href={`/leaderboard`} className="flex items-center gap-2 hover:text-primary transition-colors">
              <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
                {builder.github_username.charAt(0).toUpperCase()}
              </div>
              {builder.github_username}
            </Link>
          )}
          <span className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            Created {new Date(project.created_at).toLocaleDateString('en-US', {
              month: 'long',
              year: 'numeric'
            })}
          </span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card className="bg-card/50 border-border/50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold">{projectCommitments.length}</div>
                <p className="text-sm text-muted-foreground">Commitments</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card/50 border-border/50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-500/10">
                <Clock className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <div className="text-2xl font-bold">{activeCount}</div>
                <p className="text-sm text-muted-foreground">Active</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card/50 border-border/50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-500/10">
                <CheckCircle2 className="h-5 w-5 text-green-400" />
              </div>
              <div>
                <div className="text-2xl font-bold">{completedCount}</div>
                <p className="text-sm text-muted-foreground">Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card/50 border-border/50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-accent/10">
                <ExternalLink className="h-5 w-5 text-accent" />
              </div>
              <div>
                <div className="text-2xl font-bold">
                  {projectCommitments.filter(c => c.proof_url).length}
                </div>
                <p className="text-sm text-muted-foreground">Proofs</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Commitments List */}
        <Card className="lg:col-span-2 bg-card/50 border-border/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Registered Commitments</CardTitle>
            <CardDescription>All commitments made by this project</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {projectCommitments.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">No commitments registered yet</p>
              ) : (
                projectCommitments.map((commitment) => (
                  <div 
                    key={commitment.id}
                    className="p-4 rounded-lg border border-border/30 bg-background/50"
                  >
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <Badge variant="outline" className="bg-primary/10 border-primary/30 text-primary">
                        {commitmentTypeLabels[commitment.commitment_type]}
                      </Badge>
                      <span className={`px-2 py-1 text-xs rounded-full border ${statusColors[commitment.status]}`}>
                        {commitment.status.charAt(0).toUpperCase() + commitment.status.slice(1)}
                      </span>
                    </div>
                    <p className="text-sm mb-3">{commitment.description}</p>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>
                        {commitment.optional_amount && commitment.optional_amount_unit && (
                          <span className="text-foreground font-medium">
                            {commitment.optional_amount} {commitment.optional_amount_unit}
                          </span>
                        )}
                      </span>
                      {commitment.proof_url && (
                        <a 
                          href={commitment.proof_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline flex items-center gap-1"
                        >
                          View Proof <ExternalLink className="h-3 w-3" />
                        </a>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Timeline */}
        <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Commitment Timeline</CardTitle>
            <CardDescription>Activity history</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <div className="absolute left-3 top-0 bottom-0 w-px bg-border/50" />
              <div className="space-y-6">
                {projectCommitments
                  .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
                  .map((commitment) => (
                    <div key={commitment.id} className="relative pl-8">
                      <div className={`absolute left-0 w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        commitment.status === 'completed' 
                          ? 'bg-green-500/20 border-green-500/50' 
                          : commitment.status === 'active'
                          ? 'bg-blue-500/20 border-blue-500/50'
                          : 'bg-yellow-500/20 border-yellow-500/50'
                      }`}>
                        {commitment.status === 'completed' ? (
                          <CheckCircle2 className="h-3 w-3 text-green-400" />
                        ) : commitment.status === 'active' ? (
                          <Clock className="h-3 w-3 text-blue-400" />
                        ) : (
                          <div className="w-2 h-2 rounded-full bg-yellow-400" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium">
                          {commitmentTypeLabels[commitment.commitment_type]}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Registered {new Date(commitment.created_at).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </p>
                        {commitment.completed_at && (
                          <p className="text-xs text-green-400 mt-1">
                            Completed {new Date(commitment.completed_at).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
