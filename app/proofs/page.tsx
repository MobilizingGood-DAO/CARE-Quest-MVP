import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  getCompletedCommitments,
  getProject, 
  commitmentTypeLabels,
} from "@/lib/data";
import { ExternalLink, Shield, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function ProofsPage() {
  const completedCommitments = getCompletedCommitments();

  return (
    <div className="container py-8 px-4 md:px-6">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-green-500/10">
            <Shield className="h-6 w-6 text-green-400" />
          </div>
          <h1 className="text-3xl font-bold">Proof Registry</h1>
        </div>
        <p className="text-muted-foreground">
          Verified completions with attached proof of follow-through
        </p>
      </div>

      {/* Stats */}
      <Card className="bg-green-500/5 border-green-500/20 mb-8">
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-green-500/20">
              <CheckCircle2 className="h-8 w-8 text-green-400" />
            </div>
            <div>
              <div className="text-3xl font-bold text-green-400">{completedCommitments.length}</div>
              <p className="text-muted-foreground">Verified Completions</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Proofs Table */}
      <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>All Verified Proofs</CardTitle>
          <CardDescription>
            Commitments that have been completed with verifiable proof
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Project</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Commitment Type</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Description</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Proof Link</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Completed Date</th>
                </tr>
              </thead>
              <tbody>
                {completedCommitments.map((commitment) => {
                  const project = getProject(commitment.project_id);
                  return (
                    <tr key={commitment.id} className="border-b border-border/30 hover:bg-muted/20 transition-colors">
                      <td className="py-4 px-4">
                        <Link 
                          href={`/projects/${commitment.project_id}`} 
                          className="font-medium hover:text-primary transition-colors"
                        >
                          {project?.project_name || 'Unknown'}
                        </Link>
                      </td>
                      <td className="py-4 px-4">
                        <Badge variant="outline" className="bg-primary/10 border-primary/30 text-primary">
                          {commitmentTypeLabels[commitment.commitment_type]}
                        </Badge>
                      </td>
                      <td className="py-4 px-4 text-muted-foreground max-w-xs">
                        {commitment.description}
                      </td>
                      <td className="py-4 px-4">
                        {commitment.proof_url && (
                          <a 
                            href={commitment.proof_url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md bg-green-500/10 text-green-400 hover:bg-green-500/20 transition-colors text-sm"
                          >
                            View Proof <ExternalLink className="h-3 w-3" />
                          </a>
                        )}
                      </td>
                      <td className="py-4 px-4 text-muted-foreground text-sm">
                        {commitment.completed_at && new Date(commitment.completed_at).toLocaleDateString('en-US', {
                          month: 'short',
                          year: 'numeric'
                        })}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {completedCommitments.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              No verified proofs yet. Be the first to complete a commitment!
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
