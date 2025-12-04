import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MessageSquare, Search, HelpCircle, LayoutDashboard, User, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Navbar() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");
  const { user, role, signOut, hasRole } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  const showAdminLink = user && hasRole('staff');

  return (
    <header className="sticky top-0 z-50 glass">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 font-semibold text-lg">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <MessageSquare className="w-4 h-4 text-primary-foreground" />
            </div>
            <span>ComplaintHub</span>
          </Link>

          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              asChild
              className={cn(location.pathname === "/submit" && "bg-accent")}
            >
              <Link to="/submit">
                <MessageSquare className="w-4 h-4 mr-1" />
                Submit
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              asChild
              className={cn(location.pathname === "/track" && "bg-accent")}
            >
              <Link to="/track">
                <Search className="w-4 h-4 mr-1" />
                Track
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              asChild
              className={cn(location.pathname === "/faq" && "bg-accent")}
            >
              <Link to="/faq">
                <HelpCircle className="w-4 h-4 mr-1" />
                FAQ
              </Link>
            </Button>
            
            {showAdminLink && (
              <>
                <div className="w-px h-6 bg-border mx-2" />
                <Button
                  variant={isAdmin ? "default" : "outline"}
                  size="sm"
                  asChild
                >
                  <Link to="/admin">
                    <LayoutDashboard className="w-4 h-4 mr-1" />
                    Admin
                  </Link>
                </Button>
              </>
            )}
            
            <div className="w-px h-6 bg-border mx-2" />
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <User className="w-4 h-4 mr-1" />
                    <span className="max-w-24 truncate">{user.email?.split('@')[0]}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <div className="px-2 py-1.5 text-sm">
                    <p className="font-medium truncate">{user.email}</p>
                    <p className="text-xs text-muted-foreground capitalize">Role: {role || 'user'}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="outline" size="sm" asChild>
                <Link to="/auth">
                  <User className="w-4 h-4 mr-1" />
                  Sign In
                </Link>
              </Button>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
