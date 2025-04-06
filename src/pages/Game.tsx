
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Globe, Monitor, Gamepad2, Smartphone, User, Users, Clock, Twitch, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

// Types for our game
type MatchMode = "Solo" | "Duo" | "Squad";
type MatchMap = "Erangel" | "Miramar" | "Sanhok" | "Vikendi" | "Taego";
type Platform = "PC" | "Xbox" | "PlayStation" | "Mobile";
type Region = "North America" | "Europe" | "Asia" | "South America" | "Oceania";

interface Player {
  id: string;
  name: string;
  twitchName: string | null;
  avatarUrl: string;
}

interface Team {
  id: string;
  players: Player[];
  isFilled: boolean;
}

const Game = () => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  
  // Mock game data
  const [gameData, setGameData] = useState<{
    id: string;
    name: string;
    mode: MatchMode;
    map: MatchMap;
    platform: Platform;
    region: Region;
    maxPlayers: number;
    currentPlayers: number;
    status: "open" | "ongoing" | "completed";
    timeCreated: string;
    host: {
      name: string;
      avatarUrl: string;
      rank: string;
    };
    teams: Team[];
  } | null>(null);

  useEffect(() => {
    // Simulate fetching game data
    setTimeout(() => {
      // Generate mock data based on the match ID
      const mockGame = generateMockGameData(id || "1");
      setGameData(mockGame);
      setLoading(false);
    }, 1000);
  }, [id]);

  // Generate mock player data
  const generateMockGameData = (gameId: string) => {
    // Determine game mode based on ID to simulate different modes
    const modeNum = parseInt(gameId) % 3;
    const mode: MatchMode = modeNum === 0 ? "Solo" : modeNum === 1 ? "Duo" : "Squad";
    
    // Calculate team size and number of teams based on mode
    const teamSize = mode === "Solo" ? 1 : mode === "Duo" ? 2 : 4;
    const totalTeams = mode === "Solo" ? 100 : mode === "Duo" ? 50 : 25;
    
    // Generate teams with varying fill status
    const teams: Team[] = [];
    for (let i = 0; i < totalTeams; i++) {
      const isFilled = Math.random() > 0.7; // 30% chance of being unfilled
      const teamPlayers: Player[] = [];
      
      if (isFilled) {
        // Generate players for filled teams
        for (let j = 0; j < teamSize; j++) {
          const hasTwitch = Math.random() > 0.4; // 60% chance of having Twitch
          teamPlayers.push({
            id: `player-${i}-${j}`,
            name: `Player${i}${j}`,
            twitchName: hasTwitch ? `twitchPlayer${i}${j}` : null,
            avatarUrl: `https://i.pravatar.cc/150?img=${(i * teamSize + j) % 70}`
          });
        }
      }
      
      teams.push({
        id: `team-${i}`,
        players: teamPlayers,
        isFilled
      });
    }

    return {
      id: gameId,
      name: `Battle Royale ${gameId}`,
      mode,
      map: ["Erangel", "Miramar", "Sanhok", "Vikendi", "Taego"][parseInt(gameId) % 5] as MatchMap,
      platform: ["PC", "Xbox", "PlayStation", "Mobile"][parseInt(gameId) % 4] as Platform,
      region: ["North America", "Europe", "Asia", "South America", "Oceania"][parseInt(gameId) % 5] as Region,
      maxPlayers: mode === "Solo" ? 100 : mode === "Duo" ? 100 : 100,
      currentPlayers: Math.floor(Math.random() * (mode === "Solo" ? 100 : mode === "Duo" ? 100 : 100)),
      status: ["open", "ongoing", "completed"][parseInt(gameId) % 3] as "open" | "ongoing" | "completed",
      timeCreated: "30 minutes ago",
      host: {
        name: "HostPlayer123",
        avatarUrl: "https://i.pravatar.cc/150?img=1",
        rank: "Diamond"
      },
      teams
    };
  };

  const getPlatformIcon = (platform: Platform) => {
    switch (platform) {
      case 'PC':
        return <Monitor className="h-4 w-4" />;
      case 'Xbox':
      case 'PlayStation':
        return <Gamepad2 className="h-4 w-4" />;
      case 'Mobile':
        return <Smartphone className="h-4 w-4" />;
      default:
        return <Gamepad2 className="h-4 w-4" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gaming-darker text-white pt-20 pb-12 flex items-center justify-center">
        <div className="animate-pulse">Loading match data...</div>
      </div>
    );
  }

  if (!gameData) {
    return (
      <div className="min-h-screen bg-gaming-darker text-white pt-20 pb-12 flex items-center justify-center">
        <div>Match not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gaming-darker text-white pt-20 pb-12">
      <div className="container mx-auto px-4">
        {/* Back button and game header */}
        <div className="flex flex-col mb-6">
          <Link to="/lobby" className="text-gray-400 hover:text-white mb-2 inline-flex items-center w-fit">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Lobby
          </Link>
          <div className="flex justify-between items-center">
            <h1 className="text-2xl md:text-3xl font-bold">{gameData.name}</h1>
            <Badge 
              variant={gameData.status === 'open' ? 'default' : gameData.status === 'ongoing' ? 'secondary' : 'outline'}
              className={`${gameData.status === 'open' ? 'bg-pubg' : gameData.status === 'ongoing' ? 'bg-accent' : 'border-pubg text-pubg'}`}
            >
              {gameData.status === 'open' ? 'Recruiting' : gameData.status === 'ongoing' ? 'Live' : 'Completed'}
            </Badge>
          </div>
        </div>

        {/* Game info and host section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Host details card */}
          <Card className="border-pubg/20 bg-gaming-light">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-white">Host</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12 border-2 border-pubg">
                  <AvatarImage src={gameData.host.avatarUrl} alt={gameData.host.name} />
                  <AvatarFallback className="bg-pubg text-white">{gameData.host.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-white">{gameData.host.name}</p>
                  <p className="text-xs text-gray-400">{gameData.host.rank} Rank</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Match details card */}
          <Card className="border-pubg/20 bg-gaming-light md:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-white">Match Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-xs text-gray-400">Game Mode</p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <Users className="h-4 w-4 text-pubg" />
                    <p className="text-white">{gameData.mode}</p>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-gray-400">Region</p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <Globe className="h-4 w-4 text-pubg" />
                    <p className="text-white">{gameData.region}</p>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-gray-400">Platform</p>
                  <div className="flex items-center gap-1.5 mt-1">
                    {getPlatformIcon(gameData.platform)}
                    <p className="text-white">{gameData.platform}</p>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-gray-400">Map</p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <MapPin className="h-4 w-4 text-pubg" />
                    <p className="text-white">{gameData.map}</p>
                  </div>
                </div>
              </div>

              <Separator className="my-3 bg-gaming-darker/50" />

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1.5">
                  <User className="h-4 w-4 text-pubg" />
                  <p className="text-sm text-white">{gameData.currentPlayers}/{gameData.maxPlayers} Players</p>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-pubg" />
                  <p className="text-sm text-white">Created {gameData.timeCreated}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Teams section */}
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-4">Teams</h2>
          
          <div className={`grid gap-3 ${
            gameData.mode === 'Solo' ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8' : 
            gameData.mode === 'Duo' ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5' : 
            'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
          }`}>
            {gameData.teams.map((team, index) => (
              <TeamCard key={team.id} team={team} mode={gameData.mode} teamNumber={index + 1} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Component for rendering a team card
const TeamCard = ({ team, mode, teamNumber }: { team: Team; mode: MatchMode; teamNumber: number }) => {
  return (
    <Card className={`border-pubg/10 ${team.isFilled ? 'bg-gaming-light' : 'bg-gaming-darker/60 border-dashed border-gaming-light/30'} overflow-hidden`}>
      <CardHeader className="py-2 px-3 bg-gaming-darker/50">
        <div className="flex justify-between items-center">
          <CardTitle className="text-sm text-white">Team {teamNumber}</CardTitle>
          {!team.isFilled && (
            <Badge variant="outline" className="text-xs border-gaming-light/40 text-gray-400">
              Empty
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {team.isFilled ? (
          <div className={`grid ${mode === 'Squad' ? 'grid-cols-2' : 'grid-cols-1'} gap-px bg-gaming-darker/30`}>
            {team.players.map((player) => (
              <PlayerCard key={player.id} player={player} />
            ))}
          </div>
        ) : (
          <div className="p-4 text-center text-xs text-gray-400">
            Waiting for players...
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// Component for rendering a player card
const PlayerCard = ({ player }: { player: Player }) => {
  const hasTwitch = !!player.twitchName;
  
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div className={`p-2 ${hasTwitch ? 'bg-gaming-light cursor-pointer hover:bg-pubg/10 transition-colors' : 'bg-gaming-light'}`}>
          {hasTwitch ? (
            <a 
              href={`https://twitch.tv/${player.twitchName}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="block"
            >
              <PlayerCardContent player={player} />
            </a>
          ) : (
            <PlayerCardContent player={player} />
          )}
        </div>
      </HoverCardTrigger>
      {hasTwitch && (
        <HoverCardContent className="w-80 bg-gaming-darker border-pubg/20 p-0 overflow-hidden">
          <div className="p-4">
            <div className="flex items-center gap-3 mb-2">
              <Avatar className="h-10 w-10 border-2 border-pubg">
                <AvatarImage src={player.avatarUrl} alt={player.name} />
                <AvatarFallback className="bg-pubg text-white">{player.name.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-white">{player.name}</p>
                <p className="text-xs text-purple-300 flex items-center gap-1">
                  <Twitch className="h-3 w-3" />
                  {player.twitchName}
                </p>
              </div>
            </div>
            <Button 
              variant="default" 
              className="w-full bg-[#9146FF] hover:bg-[#7E69AB] text-white"
              onClick={() => window.open(`https://twitch.tv/${player.twitchName}`, '_blank')}
            >
              <Twitch className="h-4 w-4 mr-2" />
              Watch Stream
            </Button>
          </div>
        </HoverCardContent>
      )}
    </HoverCard>
  );
};

// Reusable component for player card content
const PlayerCardContent = ({ player }: { player: Player }) => {
  const hasTwitch = !!player.twitchName;
  
  return (
    <div className="flex items-center gap-2">
      <Avatar className={`h-6 w-6 ${hasTwitch ? 'border border-purple-400' : ''}`}>
        <AvatarImage src={player.avatarUrl} alt={player.name} />
        <AvatarFallback className="text-[10px]">{player.name.substring(0, 2).toUpperCase()}</AvatarFallback>
      </Avatar>
      <div className="overflow-hidden">
        <p className="text-xs text-white truncate">{player.name}</p>
        {hasTwitch && (
          <p className="text-[10px] text-purple-300 flex items-center gap-0.5 truncate">
            <Twitch className="h-2.5 w-2.5" />
            {player.twitchName}
          </p>
        )}
      </div>
    </div>
  );
};

export default Game;
