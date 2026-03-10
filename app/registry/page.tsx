import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  commitments, 
  getProject, 
  commitmentTypeLabels,
  statusColors,
  type Commitment 
} from "@/lib/data";
import { ExternalLink, FileText } from "lucide-react";
import Link from "next/link";

function CommitmentRow({ commitment }: { commitment: Commitment }) {
  const project = getProject(commitment.project_id);
  
  return (
    <tr className="border-b border-border/30 hover:bg-muted/20 transition-colors">
      <td className="py-4 px-4">
        <Link href={`/projects/${commitment.project_id}`} className="font-medium hover:text-primary transition-colors">
          {project?.project_name || 'Unknown'}
        </Link>
      </td>
      <td className="py-4 px-4">
        <Badge variant="outline" className="bg-primary/10 border-primary/30 text-primary">
          {commitmentTypeLabels[commitment.commitment_type]}
        </Badge>
      </td>
      <td className="py-4 px-4 text-muted-foreground">
        {commitment.description}
      </td>
      <td className="py-4 px-4">
        {commitment.optional_amount && commitment.optional_amount_unit && (
          <span className="text-sm">
            {commitment.optional_amount} {commitment.optional_amount_unit}
          </span>
        )}
      </td>
      <td className="py-4 px-4">
        <span className={`px-2 py-1 text-xs rounded-full border ${statusColors[commitment.status]}`}>
          {commitment.status.charAt(0).toUpperCase() + commitment.status.slice(1)}
        </span>
      </td>
      <td className="py-4 px-4">
        {commitment.proof_url ? (
          <a 
            href={commitment.proof_url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-primary hover:underline text-sm"
          >
            View <ExternalLink className="h-3 w-3" />
          </a>
        ) : (
          <span className="text-muted-foreground">—</span>
        )}
      </td>
      <td className="py-4 px-4 text-muted-foreground text-sm">
        {new Date(commitment.created_at).toLocaleDateString('en-US', {
          month: 'short',
          year: 'numeric'
        })}
      </td>
    </tr>
  );
}

export default function RegistryPage() {
  const sortedCommitments = [...commitments].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  const statusCounts = {
    pending: commitments.filter(c => c.status === 'pending').length,
    active: commitments.filter(c => c.status === 'active').length,
    completed: commitments.filter(c => c.status === 'completed').length,
  };

  return (
    <div className="container py-8 px-4 md:px-6">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-primary/10">
            <FileText className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-3xl font-bold">Commitment Registry</h1>
        </div>
        <p className="text-muted-foreground">All registered commitments in the ecosystem</p>
      </div>

      {/* Status Summary */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <Card className="bg-yellow-500/5 border-yellow-500/20">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-yellow-400">{statusCounts.pending}</div>
            <p className="text-sm text-muted-foreground">Pending</p>
          </CardContent>
        </Card>
        <Card className="bg-blue-500/5 border-blue-500/20">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-blue-400">{statusCounts.active}</div>
            <p className="text-sm text-muted-foreground">Active</p>
          </CardContent>
        </Card>
        <Card className="bg-green-500/5 border-green-500/20">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-400">{statusCounts.completed}</div>
            <p className="text-sm text-muted-foreground">Completed</p>
          </CardContent>
        </Card>
      </div>

      {/* Commitments Table */}
      <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>All Commitments</CardTitle>
          <CardDescription>
            {commitments.length} total commitments registered
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Project</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Type</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Description</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Amount</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Proof</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Registered</th>
                </tr>
              </thead>
              <tbody>
                {sortedCommitments.map((commitment) => (
                  <CommitmentRow key={commitment.id} commitment={commitment} />
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
