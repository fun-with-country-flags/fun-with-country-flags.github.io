export interface VoteRequest {
  flagCode: string;
  sessionId: string;
}

export interface VoteResponse {
  success: boolean;
  voteId?: number;
  timestamp?: string;
  error?: string;
  code?: string;
}

export interface LeaderboardEntry {
  flagCode: string;
  flagName: string;
  emoji: string;
  voteCount: number;
  rank: number;
}

export interface LeaderboardResponse {
  leaderboard: LeaderboardEntry[];
  totalVotes: number;
  lastUpdated: string;
}

export interface ErrorResponse {
  success: false;
  error: string;
  code: string;
}
