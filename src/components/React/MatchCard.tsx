import React, { useState, useEffect } from 'react';

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
  kickoffTime?: string; // ISO date string for countdown
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
  kickoffTime,
}: MatchCardProps) {
  // Simple string check - no .src property needed
  const homeLogoSrc = homeLogo || undefined;
  const awayLogoSrc = awayLogo || undefined;
  const competitionLogoSrc = competitionLogo || undefined;

  // State for countdown
  const [countdownText, setCountdownText] = useState<string>("");

  // Handle countdown for upcoming matches
  useEffect(() => {
    if (status === "UPCOMING" && kickoffTime) {
      const updateCountdown = () => {
        const now = new Date();
        const kickoff = new Date(kickoffTime);
        const diff = kickoff.getTime() - now.getTime();

        if (diff <= 0) {
          setCountdownText("KICKOFF SOON");
        } else {
          const days = Math.floor(diff / (1000 * 60 * 60 * 24));
          const hours = Math.floor((diff % (86400000)) / 3600000);
          const minutes = Math.floor((diff % 3600000) / 60000);

          if (days > 0) {
            setCountdownText(`${days}d ${hours}h`);
          } else if (hours > 0) {
            setCountdownText(`${hours}h ${minutes}m`);
          } else {
            setCountdownText(`${minutes}m`);
          }
        }
      };

      updateCountdown();
      const interval = setInterval(updateCountdown, 60000); // Update every minute

      return () => clearInterval(interval);
    } else if (status === "LIVE") {
      setCountdownText("");
    }
  }, [status, kickoffTime]);

  // Determine status class
  const getStatusClass = () => {
    switch(status) {
      case 'LIVE':
        return 'status live';
      case 'UPCOMING':
        return 'status upcoming';
      default:
        return 'status';
    }
  };

  // Get display text for status badge
  const getDisplayText = () => {
    if (status === "UPCOMING" && countdownText) {
      return countdownText;
    }
    return status;
  };

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
        <span className={getStatusClass()}>
          {getDisplayText()}
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