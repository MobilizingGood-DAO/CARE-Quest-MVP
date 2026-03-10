import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getLeaderboard } from "@/lib/data";
import { Trophy, Medal, Award, Star, Shield, Heart } from "lucide-react";

function getBadges(stats: { proofScore: number; completed: number; projects: number }) {
  const badges = [];
  
  if (stats.proofScore >= 6) {
    badges.push({ label: "Steward Builder", icon: Shield, color: "bg-primary/10 text-primary border-primary/30" });
  }
  if (stats.completed >= 3) {
    badges.push({ label: "Proof Champion", icon: Award, color: "bg-green-500/10 text-green-400 border-green-500/30" });
  }
  if (stats.projects >= 2) {
    badges.push({ label: "Ecosystem Supporter", icon: Heart, color: "bg-pink-500/10 text-pink-400 border-pink-500/30" });
  }
  
  return badges;
}

function getRankIcon(rank: number) {
  switch (rank) {
    case 1:
      return <Trophy className="h-5 w-5 text-yellow-400" />;
    case 2:
      return <Medal className="h-5 w-5 text-gray-400" />;
    case 3:
      return <Medal className="h-5 w-5 text-amber-600" />;
    default:
      return <span className="text-muted-foreground font-mono">{rank}</span>;
  }
}

export default function LeaderboardPage() {
  const leaderboard = getLeaderboard();

  return (
    <div className="container py-8 px-4 md:px-6">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-yellow-500/10">
            <Trophy className="h-6 w-6 text-yellow-400" />
          </div>
          <h1 className="text-3xl font-bold">Builder Leaderboard</h1>
        </div>
        <p className="text-muted-foreground">
          Builders ranked by Proof Score: Completed Commitments + Verified Proofs
        </p>
      </div>

      {/* Top 3 Builders */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        {leaderboard.slice(0, 3).map((builder, index) => {
          const badges = getBadges(builder.stats);
          const rank = index + 1;
          
          return (
            <Card 
              key={builder.id} 
              className={`bg-card/50 border-border/50 backdrop-blur-sm ${
                rank === 1 ? 'md:order-2 ring-2 ring-yellow-500/30' : 
                rank === 2 ? 'md:order-1' : 
                'md:order-3'
              }`}
            >
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
                    rank === 1 ? 'bg-yellow-500/20 ring-2 ring-yellow-500/50' :
                    rank === 2 ? 'bg-gray-500/20' :
                    'bg-amber-600/20'
                  }`}>
                    {getRankIcon(rank)}
                  </div>
                  
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-lg font-bold text-primary mb-2">
                    {builder.github_username.charAt(0).toUpperCase()}
                  </div>
                  
                  <h3 className="font-semibold text-lg">{builder.github_username}</h3>
                  
                  <div className="mt-4 flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-400" />
                    <span className="text-2xl font-bold">{builder.stats.proofScore}</span>
                    <span className="text-muted-foreground text-sm">Proof Score</span>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 mt-4 w-full text-center">
                    <div>
                      <div className="font-semibold">{builder.stats.projects}</div>
                      <div className="text-xs text-muted-foreground">Projects</div>
                    </div>
                    <div>
                      <div className="font-semibold">{builder.stats.commitments}</div>
                      <div className="text-xs text-muted-foreground">Commits</div>
                    </div>
                    <div>
                      <div className="font-semibold text-green-400">{builder.stats.completed}</div>
                      <div className="text-xs text-muted-foreground">Done</div>
                    </div>
                  </div>
                  
                  {badges.length > 0 && (
                    <div className="flex flex-wrap justify-center gap-2 mt-4">
                      {badges.map((badge) => (
                        <Badge 
                          key={badge.label} 
                          variant="outline" 
                          className={`${badge.color} text-xs`}
                        >
                          <badge.icon className="h-3 w-3 mr-1" />
                          {badge.label}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Full Leaderboard Table */}
      <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Full Rankings</CardTitle>
          <CardDescription>All builders ranked by ecosystem contribution</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground w-16">Rank</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Builder</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Projects</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Commitments</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Completed</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Proof Score</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Badges</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((builder, index) => {
                  const badges = getBadges(builder.stats);
                  const rank = index + 1;
                  
                  return (
                    <tr key={builder.id} className="border-b border-border/30 hover:bg-muted/20 transition-colors">
                      <td className="py-4 px-4">
                        <div className="flex items-center justify-center w-8 h-8">
                          {getRankIcon(rank)}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold text-primary">
                            {builder.github_username.charAt(0).toUpperCase()}
                          </div>
                          <span className="font-medium">{builder.github_username}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-muted-foreground">{builder.stats.projects}</td>
                      <td className="py-4 px-4 text-muted-foreground">{builder.stats.commitments}</td>
                      <td className="py-4 px-4">
                        <span className="text-green-400">{builder.stats.completed}</span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-400" />
                          <span className="font-bold">{builder.stats.proofScore}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex flex-wrap gap-1">
                          {badges.map((badge) => (
                            <Badge 
                              key={badge.label} 
                              variant="outline" 
                              className={`${badge.color} text-xs`}
                            >
                              <badge.icon className="h-3 w-3" />
                            </Badge>
                          ))}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Scoring Info */}
      <Card className="mt-8 bg-card/30 border-border/30">
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-4">How Proof Score Works</h3>
          <div className="grid sm:grid-cols-2 gap-4 text-sm text-muted-foreground">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center shrink-0">
                <span className="text-green-400 font-bold">+1</span>
              </div>
              <div>
                <p className="font-medium text-foreground">Completed Commitment</p>
                <p>Each commitment marked as completed adds 1 point</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <span className="text-primary font-bold">+1</span>
              </div>
              <div>
                <p className="font-medium text-foreground">Verified Proof</p>
                <p>Each completion with attached proof adds 1 additional point</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
