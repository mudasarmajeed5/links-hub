import React from "react";

interface SpotifyPlayerProps {
  spotifyUrl?: string;
}

const SpotifyPlayer: React.FC<SpotifyPlayerProps> = ({ spotifyUrl }) => {
  // Function to convert normal Spotify link to embed format
  const getEmbedUrl = (url: string | undefined): string => {
    if (!url) return "";
    try {
      const urlObj = new URL(url);
      const pathParts = urlObj.pathname.split("/");
      if (pathParts.length >= 3 && pathParts[1] === "track") {
        return `https://open.spotify.com/embed/track/${pathParts[2]}`;
      }
    } catch (error) {
      console.error("Invalid Spotify URL", error);
    }
    return "";
  };

  const embedUrl = getEmbedUrl(spotifyUrl);

  return (
    <>
      {embedUrl && (
        <iframe
          className="relative z-10"
          src={embedUrl}
          width="300"
          height="80"
          allow="encrypted-media"
          style={{
            position: "fixed",
            bottom: "20px",
            left: "20px",
            background: "transparent",
          }}
          title="Spotify Player"
        />
      )}
    </>
  );
};

export default SpotifyPlayer;
