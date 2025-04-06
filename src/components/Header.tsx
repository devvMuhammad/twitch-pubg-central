
import { Button } from "@/components/ui/button";
import { Twitch } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gaming-darker/80 backdrop-blur-lg border-b border-pubg/20">
      <div className="container mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Twitch className="h-6 w-6 text-pubg" />
          <span className="font-bold text-xl text-white">PUBG Central</span>
        </div>
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#features" className="text-sm text-gray-300 hover:text-white transition-colors">Features</a>
          <a href="#streams" className="text-sm text-gray-300 hover:text-white transition-colors">Streams</a>
          <a href="#rankings" className="text-sm text-gray-300 hover:text-white transition-colors">Rankings</a>
          <Link to="/lobby" className="text-sm text-gray-300 hover:text-white transition-colors">Lobby</Link>
        </nav>
        <div className="flex items-center space-x-4">
          <Link to="/login">
            <Button variant="ghost" className="text-gray-300 hover:text-white">Login</Button>
          </Link>
          <Link to="/signup">
            <Button className="bg-pubg hover:bg-pubg-light text-white">Sign Up</Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
