'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import {
    Search,
    MapPin,
    Menu,
    X,
    ChevronDown,
    Utensils,
    Compass,
    User
} from 'lucide-react';
import { cn } from '@/lib/utils';

const locations = ['Bangalore', 'Mumbai', 'Delhi', 'Hyderabad', 'Pune'];

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLocationOpen, setIsLocationOpen] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState(locations[0]);
    const [searchQuery, setSearchQuery] = useState('');
    const [scrolled, setScrolled] = useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        setScrolled(latest > 20);
    });

    return (
        <header className={cn(
            "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out px-4 sm:px-6 lg:px-8 py-4",
            scrolled ? "py-2" : "py-4"
        )}>
            <motion.nav
                layout
                className={cn(
                    "mx-auto max-w-7xl rounded-2xl transition-all duration-300",
                    scrolled ? "glass-panel px-6 py-2" : "bg-transparent px-2 py-2"
                )}
            >
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2.5 group">
                        <div className="relative w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 shadow-lg shadow-primary/20 group-hover:shadow-primary/40 transition-all duration-300 overflow-hidden">
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                            <Utensils className="w-5 h-5 text-white relative z-10" />
                        </div>
                        <span className="font-heading font-bold text-xl tracking-tight text-foreground group-hover:text-primary transition-colors">
                            Food<span className="text-primary">Nest</span>
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-6">
                        {/* Location Selector */}
                        <div className="relative">
                            <button
                                onClick={() => setIsLocationOpen(!isLocationOpen)}
                                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/50 hover:bg-secondary/80 text-sm font-medium transition-colors border border-transparent hover:border-border"
                            >
                                <MapPin className="w-3.5 h-3.5 text-primary" />
                                <span>{selectedLocation}</span>
                                <ChevronDown className={cn("w-3 h-3 text-muted-foreground transition-transform duration-200", isLocationOpen && "rotate-180")} />
                            </button>

                            <AnimatePresence>
                                {isLocationOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 8, scale: 0.95 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute top-full mt-2 left-0 bg-white/90 backdrop-blur-xl rounded-xl shadow-xl border border-white/20 py-1.5 min-w-[160px] flex flex-col gap-0.5 overflow-hidden z-20"
                                    >
                                        {locations.map((loc) => (
                                            <button
                                                key={loc}
                                                onClick={() => {
                                                    setSelectedLocation(loc);
                                                    setIsLocationOpen(false);
                                                }}
                                                className={cn(
                                                    "text-left px-4 py-2 text-sm transition-colors flex items-center gap-2 hover:bg-primary/5",
                                                    selectedLocation === loc ? "text-primary font-semibold bg-primary/5" : "text-muted-foreground"
                                                )}
                                            >
                                                {selectedLocation === loc && <motion.div layoutId="activeLoc" className="w-1 h-3.5 rounded-full bg-primary absolute left-0" />}
                                                {loc}
                                            </button>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Search Bar */}
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                            </div>
                            <input
                                type="text"
                                className="block w-full pl-10 pr-3 py-1.5 border-none rounded-full leading-5 bg-secondary/50 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all duration-300 w-[200px] focus:w-[280px] sm:text-sm"
                                placeholder="Search restaurants..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3">
                        <Link href="/explore" className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-foreground hover:bg-secondary/80 transition-all hover:scale-105 active:scale-95">
                            <Compass className="w-4 h-4" />
                            <span>Explore</span>
                        </Link>

                        <button className="relative w-10 h-10 rounded-full bg-secondary/50 hover:bg-primary hover:text-white flex items-center justify-center transition-all duration-300 group overflow-hidden">
                            <User className="w-5 h-5 relative z-10" />
                            <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                        </button>

                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden w-10 h-10 rounded-full bg-secondary/50 hover:bg-secondary flex items-center justify-center transition-colors"
                        >
                            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="md:hidden overflow-hidden"
                        >
                            <div className="pt-4 pb-2 space-y-3">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                    <input
                                        type="text"
                                        placeholder="Search..."
                                        className="w-full pl-9 pr-4 py-2.5 bg-secondary/50 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-primary/30"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>
                                <div className="space-y-1">
                                    <Link href="/explore" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-foreground hover:bg-secondary/50 transition-colors">
                                        <Compass className="w-5 h-5 text-primary" />
                                        <span className="font-medium">Explore</span>
                                    </Link>
                                    <button className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-foreground hover:bg-secondary/50 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <MapPin className="w-5 h-5 text-primary" />
                                            <span className="font-medium">{selectedLocation}</span>
                                        </div>
                                        <ChevronDown className="w-4 h-4 text-muted-foreground" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.nav>
        </header>
    );
}
