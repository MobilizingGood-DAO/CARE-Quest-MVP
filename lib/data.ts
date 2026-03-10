// Types
export interface Builder {
  id: string;
  github_username: string;
  wallet_address: string | null;
  created_at: string;
}

export interface Project {
  id: string;
  builder_id: string;
  project_name: string;
  description: string;
  github_repo: string | null;
  created_at: string;
}

export type CommitmentType = 
  | 'financial_support'
  | 'dev_support'
  | 'design_support'
  | 'mentorship'
  | 'open_source';

export type CommitmentStatus = 'pending' | 'active' | 'completed';

export type AmountUnit = 'percent' | 'hours' | 'usd' | 'deliverable';

export interface Commitment {
  id: string;
  project_id: string;
  commitment_type: CommitmentType;
  description: string;
  optional_amount: number | null;
  optional_amount_unit: AmountUnit | null;
  proof_url: string | null;
  status: CommitmentStatus;
  created_at: string;
  completed_at: string | null;
}

// Mock Data
export const builders: Builder[] = [
  {
    id: '1',
    github_username: 'devsam',
    wallet_address: '0x1234...5678',
    created_at: '2025-11-15T10:00:00Z',
  },
  {
    id: '2',
    github_username: 'alice',
    wallet_address: '0x8765...4321',
    created_at: '2025-12-01T14:30:00Z',
  },
  {
    id: '3',
    github_username: 'builderbob',
    wallet_address: '0xabcd...efgh',
    created_at: '2026-01-10T09:15:00Z',
  },
  {
    id: '4',
    github_username: 'carol_dev',
    wallet_address: null,
    created_at: '2026-01-20T16:45:00Z',
  },
  {
    id: '5',
    github_username: 'dave_builds',
    wallet_address: '0x9999...1111',
    created_at: '2026-02-01T11:00:00Z',
  },
];

export const projects: Project[] = [
  {
    id: '1',
    builder_id: '1',
    project_name: 'Alpha Protocol',
    description: 'DeFi lending protocol for the Avalanche ecosystem',
    github_repo: 'https://github.com/devsam/alpha-protocol',
    created_at: '2025-11-20T10:00:00Z',
  },
  {
    id: '2',
    builder_id: '1',
    project_name: 'Care Labs',
    description: 'Community coordination tools for DAOs',
    github_repo: 'https://github.com/devsam/care-labs',
    created_at: '2025-12-15T14:30:00Z',
  },
  {
    id: '3',
    builder_id: '2',
    project_name: 'OpenMesh',
    description: 'Open-source mesh networking for Web3',
    github_repo: 'https://github.com/alice/openmesh',
    created_at: '2026-01-05T09:15:00Z',
  },
  {
    id: '4',
    builder_id: '3',
    project_name: 'BuildDAO',
    description: 'DAO tooling and governance infrastructure',
    github_repo: 'https://github.com/builderbob/builddao',
    created_at: '2026-01-15T16:45:00Z',
  },
  {
    id: '5',
    builder_id: '4',
    project_name: 'DevKit',
    description: 'Developer toolkit for Avalanche builders',
    github_repo: 'https://github.com/carol_dev/devkit',
    created_at: '2026-02-01T11:00:00Z',
  },
  {
    id: '6',
    builder_id: '5',
    project_name: 'ChainBridge',
    description: 'Cross-chain bridge infrastructure',
    github_repo: null,
    created_at: '2026-02-10T08:30:00Z',
  },
];

export const commitments: Commitment[] = [
  {
    id: '1',
    project_id: '1',
    commitment_type: 'dev_support',
    description: '20 hours helping new teams integrate with our protocol',
    optional_amount: 20,
    optional_amount_unit: 'hours',
    proof_url: null,
    status: 'active',
    created_at: '2025-11-25T10:00:00Z',
    completed_at: null,
  },
  {
    id: '2',
    project_id: '2',
    commitment_type: 'financial_support',
    description: '2% of Build Games winnings to ecosystem fund',
    optional_amount: 2,
    optional_amount_unit: 'percent',
    proof_url: null,
    status: 'pending',
    created_at: '2025-12-20T14:30:00Z',
    completed_at: null,
  },
  {
    id: '3',
    project_id: '3',
    commitment_type: 'open_source',
    description: 'Publish SDK improvements for community use',
    optional_amount: 1,
    optional_amount_unit: 'deliverable',
    proof_url: 'https://github.com/alice/openmesh-sdk/releases/v2.0',
    status: 'completed',
    created_at: '2026-01-10T09:15:00Z',
    completed_at: '2026-02-15T12:00:00Z',
  },
  {
    id: '4',
    project_id: '4',
    commitment_type: 'mentorship',
    description: 'Mentor 3 new builder teams through their first deployment',
    optional_amount: 3,
    optional_amount_unit: 'deliverable',
    proof_url: 'https://twitter.com/builderbob/status/mentorship-complete',
    status: 'completed',
    created_at: '2026-01-20T16:45:00Z',
    completed_at: '2026-02-28T10:30:00Z',
  },
  {
    id: '5',
    project_id: '5',
    commitment_type: 'design_support',
    description: 'UI/UX review sessions for ecosystem projects',
    optional_amount: 10,
    optional_amount_unit: 'hours',
    proof_url: null,
    status: 'active',
    created_at: '2026-02-05T11:00:00Z',
    completed_at: null,
  },
  {
    id: '6',
    project_id: '6',
    commitment_type: 'financial_support',
    description: 'Allocate $5000 to ecosystem grants',
    optional_amount: 5000,
    optional_amount_unit: 'usd',
    proof_url: 'https://snowtrace.io/tx/0xabc123',
    status: 'completed',
    created_at: '2026-02-15T08:30:00Z',
    completed_at: '2026-03-01T14:00:00Z',
  },
  {
    id: '7',
    project_id: '1',
    commitment_type: 'open_source',
    description: 'Release protocol contracts under MIT license',
    optional_amount: 1,
    optional_amount_unit: 'deliverable',
    proof_url: 'https://github.com/devsam/alpha-protocol/blob/main/LICENSE',
    status: 'completed',
    created_at: '2025-12-01T10:00:00Z',
    completed_at: '2025-12-20T16:00:00Z',
  },
  {
    id: '8',
    project_id: '3',
    commitment_type: 'dev_support',
    description: '15 hours of technical support for integration partners',
    optional_amount: 15,
    optional_amount_unit: 'hours',
    proof_url: null,
    status: 'active',
    created_at: '2026-02-01T09:00:00Z',
    completed_at: null,
  },
  {
    id: '9',
    project_id: '2',
    commitment_type: 'mentorship',
    description: 'Weekly office hours for DAO governance questions',
    optional_amount: 8,
    optional_amount_unit: 'hours',
    proof_url: 'https://calendar.google.com/carelab-office-hours',
    status: 'completed',
    created_at: '2026-01-01T12:00:00Z',
    completed_at: '2026-02-28T18:00:00Z',
  },
  {
    id: '10',
    project_id: '4',
    commitment_type: 'financial_support',
    description: '1% of protocol revenue to builder fund',
    optional_amount: 1,
    optional_amount_unit: 'percent',
    proof_url: null,
    status: 'pending',
    created_at: '2026-03-01T10:00:00Z',
    completed_at: null,
  },
];

// Helper functions
export function getProject(projectId: string): Project | undefined {
  return projects.find(p => p.id === projectId);
}

export function getBuilder(builderId: string): Builder | undefined {
  return builders.find(b => b.id === builderId);
}

export function getProjectCommitments(projectId: string): Commitment[] {
  return commitments.filter(c => c.project_id === projectId);
}

export function getBuilderProjects(builderId: string): Project[] {
  return projects.filter(p => p.builder_id === builderId);
}

export function getCommitmentWithProject(commitment: Commitment) {
  const project = getProject(commitment.project_id);
  const builder = project ? getBuilder(project.builder_id) : undefined;
  return { ...commitment, project, builder };
}

export function getCompletedCommitments(): Commitment[] {
  return commitments.filter(c => c.status === 'completed' && c.proof_url);
}

export function getBuilderStats(builderId: string) {
  const builderProjects = getBuilderProjects(builderId);
  const projectIds = builderProjects.map(p => p.id);
  const builderCommitments = commitments.filter(c => projectIds.includes(c.project_id));
  const completedCommitments = builderCommitments.filter(c => c.status === 'completed');
  const verifiedProofs = completedCommitments.filter(c => c.proof_url);
  
  return {
    projects: builderProjects.length,
    commitments: builderCommitments.length,
    completed: completedCommitments.length,
    proofScore: completedCommitments.length + verifiedProofs.length,
  };
}

export function getLeaderboard() {
  return builders
    .map(builder => ({
      ...builder,
      stats: getBuilderStats(builder.id),
    }))
    .sort((a, b) => b.stats.proofScore - a.stats.proofScore);
}

export function getMetrics() {
  const activeBuilders = new Set(projects.map(p => p.builder_id)).size;
  const registeredCommitments = commitments.length;
  const completedCommitments = commitments.filter(c => c.status === 'completed').length;
  const totalHours = commitments
    .filter(c => c.optional_amount_unit === 'hours' && c.optional_amount)
    .reduce((sum, c) => sum + (c.optional_amount || 0), 0);
  const totalValue = commitments
    .filter(c => c.optional_amount_unit === 'usd' && c.optional_amount)
    .reduce((sum, c) => sum + (c.optional_amount || 0), 0);
  
  return {
    activeBuilders,
    registeredCommitments,
    completedCommitments,
    supportHours: totalHours,
    totalValue,
  };
}

export function getCommitmentTypeDistribution() {
  const distribution: Record<CommitmentType, number> = {
    financial_support: 0,
    dev_support: 0,
    design_support: 0,
    mentorship: 0,
    open_source: 0,
  };
  
  commitments.forEach(c => {
    distribution[c.commitment_type]++;
  });
  
  return Object.entries(distribution).map(([type, count]) => ({
    type: type.replace('_', ' '),
    count,
  }));
}

export const commitmentTypeLabels: Record<CommitmentType, string> = {
  financial_support: 'Financial Support',
  dev_support: 'Dev Support',
  design_support: 'Design Support',
  mentorship: 'Mentorship',
  open_source: 'Open Source',
};

export const statusColors: Record<CommitmentStatus, string> = {
  pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  active: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  completed: 'bg-green-500/20 text-green-400 border-green-500/30',
};
