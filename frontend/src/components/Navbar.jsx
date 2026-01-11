import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HeartPulse } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Navbar = () => {
    const location = useLocation();
    const isActive = (path) => location.pathname === path;

    return (
        <nav className="bg-background/80 backdrop-blur-md border-b sticky top-0 z-50">
            <div className="container mx-auto px-6 h-16 flex justify-between items-center">
                <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-foreground tracking-tight hover:opacity-90 transition-opacity">
                    <div className="bg-primary/10 p-2 rounded-lg">
                        <HeartPulse className="w-6 h-6 text-primary" />
                    </div>
                    Cardio<span className="text-primary">Analyser</span>
                </Link>
                <div className="hidden md:flex items-center space-x-8">
                    <NavLink to="/" active={isActive('/')}>Overview</NavLink>
                    <NavLink to="/about" active={isActive('/about')}>Methodology</NavLink>
                    <NavLink to="/disclaimer" active={isActive('/disclaimer')}>Legal</NavLink>
                </div>
                <Button asChild size="default" className="shadow-lg shadow-primary/25 font-semibold">
                    <Link to="/predict">
                        Check Health
                    </Link>
                </Button>
            </div>
        </nav>
    );
};

const NavLink = ({ to, children, active }) => (
    <Link
        to={to}
        className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            active ? 'text-primary' : 'text-muted-foreground'
        )}
    >
        {children}
    </Link>
);

export default Navbar;
