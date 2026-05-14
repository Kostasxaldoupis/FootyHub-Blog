type MatchCardProps = {
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  competition: string;
  competitionLogo?: string;
  status: string;
  homeLogo?: string;
  awayLogo?: string;
};

export default function MatchCard({
  homeTeam,
  awayTeam,
  homeScore,
  awayScore,
  competition,
  competitionLogo,
  status,
  homeLogo,
  awayLogo,
}: MatchCardProps) {
  // Simple string check - no .src property needed
  const homeLogoSrc = homeLogo || undefined;
  const awayLogoSrc = awayLogo || undefined;
  const competitionLogoSrc = competitionLogo || undefined;

  return (
    <div className="match-card-modern">
      {/* Top bar with competition and status */}
      <div className="match-header">
        <div className="competition-wrapper">
          {competitionLogoSrc && (
            <img 
              src={competitionLogoSrc} 
              alt={competition} 
              className="competition-logo"
            />
          )}
          <span className="competition">{competition}</span>
        </div>
        <span className={`status ${status === 'LIVE' ? 'live' : ''}`}>
          {status}
        </span>
      </div>

      {/* Score section */}
      <div className="match-body">
        {/* Home Team */}
        <div className="team-container">
          {homeLogoSrc && (
            <img src={homeLogoSrc} alt={homeTeam} className="team-logo-modern" />
          )}
          <span className="team-name-modern">{homeTeam}</span>
          <span className="team-score-modern">{homeScore}</span>
        </div>

        {/* VS / Score Separator */}
        <div className="score-divider">
          <span>—</span>
        </div>

        {/* Away Team */}
        <div className="team-container">
          <span className="team-score-modern">{awayScore}</span>
          <span className="team-name-modern">{awayTeam}</span>
          {awayLogoSrc && (
            <img src={awayLogoSrc} alt={awayTeam} className="team-logo-modern" />
          )}
        </div>
      </div>
    </div>
  );
}