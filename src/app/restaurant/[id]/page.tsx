'use client';

import { useState, use } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowLeft,
    Star,
    MapPin,
    Clock,
    Phone,
    Navigation,
    Share2,
    Heart,
    Leaf,
    Wifi,
    TreePine,
    ChevronRight,
    Users,
    TrendingUp,
    Utensils,
    PawPrint,
    Sun,
    Music,
    GraduationCap,
    Moon,
    CheckCircle2
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { restaurants } from '@/data/restaurants';
import { cn } from '@/lib/utils';

type TabId = 'overview' | 'menu' | 'photos' | 'reviews' | 'map';

export default function RestaurantDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = use(params);
    const [activeTab, setActiveTab] = useState<TabId>('overview');
    const [isSaved, setIsSaved] = useState(false);

    const restaurant = restaurants.find((r) => r.id === id);

    if (!restaurant) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="text-center">
                    <div className="flex justify-center mb-6">
                        <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center">
                            <Utensils className="w-8 h-8 text-muted-foreground" />
                        </div>
                    </div>
                    <h2 className="font-heading text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60 mb-2">
                        Restaurant not found
                    </h2>
                    <p className="text-muted-foreground mb-8">
                        We couldn&apos;t find the restaurant you&apos;re looking for.
                    </p>
                    <Link
                        href="/explore"
                        className="px-8 py-3 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/20"
                    >
                        Browse Restaurants
                    </Link>
                </div>
            </div>
        );
    }

    const tabs: { id: TabId; label: string }[] = [
        { id: 'overview', label: 'Overview' },
        { id: 'menu', label: 'Menu' },
        { id: 'photos', label: 'Photos' },
        { id: 'reviews', label: 'Reviews' },
        { id: 'map', label: 'Location' },
    ];

    const handleGetDirections = () => {
        window.open(
            `https://www.google.com/maps/dir/?api=1&destination=${restaurant.lat},${restaurant.lng}`,
            '_blank'
        );
    };

    const tagIcons: Record<string, React.ReactNode> = {
        wifi: <Wifi className="w-4 h-4" />,
        'outdoor-seating': <TreePine className="w-4 h-4" />,
        'pet-friendly': <PawPrint className="w-4 h-4" />,
        rooftop: <Sun className="w-4 h-4" />,
        'live-music': <Music className="w-4 h-4" />,
        'student-budget': <GraduationCap className="w-4 h-4" />,
        'late-night': <Moon className="w-4 h-4" />,
        'quick-bite': <Clock className="w-4 h-4" />,
        organic: <Leaf className="w-4 h-4" />,
    };

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            {/* Cinematic Hero */}
            <div className="relative h-[60vh] lg:h-[70vh] w-full overflow-hidden">
                <motion.div
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 10, ease: "linear" }}
                    className="absolute inset-0"
                >
                    <img
                        src={restaurant.image}
                        alt={restaurant.name}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-background" />
                </motion.div>

                <div className="absolute inset-0 pt-20 pb-12 flex items-end">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="max-w-3xl"
                        >
                            <div className="flex flex-wrap gap-2 mb-4">
                                {restaurant.isOpen ? (
                                    <span className="px-3 py-1 rounded-full bg-green-500 text-white text-xs font-bold shadow-lg">Open Now</span>
                                ) : (
                                    <span className="px-3 py-1 rounded-full bg-red-500 text-white text-xs font-bold shadow-lg">Closed</span>
                                )}
                                <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold border border-white/20">{restaurant.priceRange}</span>
                            </div>

                            <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 drop-shadow-xl text-balance tracking-tight">
                                {restaurant.name}
                            </h1>

                            <div className="flex flex-wrap items-center gap-6 text-white/90 font-medium text-sm sm:text-base">
                                <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/10">
                                    <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                                    <span className="font-bold text-white text-lg">{restaurant.rating}</span>
                                    <span className="text-white/70">({restaurant.reviewCount} reviews)</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-5 h-5 text-white" />
                                    <span>{restaurant.distance}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="w-5 h-5 text-white" />
                                    <span>{restaurant.openingHours}</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Floating Back Button */}
                <Link
                    href="/explore"
                    className="absolute top-24 left-4 sm:left-8 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-white/20 transition-all group z-50"
                >
                    <ArrowLeft className="w-6 h-6 text-white group-hover:-translate-x-1 transition-transform" />
                </Link>

                {/* Floating Actions */}
                <div className="absolute top-24 right-4 sm:right-8 flex gap-3 z-50">
                    <button className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-white/20 transition-all">
                        <Share2 className="w-5 h-5 text-white" />
                    </button>
                    <button
                        onClick={() => setIsSaved(!isSaved)}
                        className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-white/20 transition-all"
                    >
                        <Heart
                            className={cn("w-5 h-5 transition-colors", isSaved ? "text-red-500 fill-red-500" : "text-white")}
                        />
                    </button>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20 pb-20">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Main Content */}
                    <div className="flex-1 min-w-0">
                        {/* Navigation Tabs */}
                        <div className="bg-white/80 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl mb-8 sticky top-24 z-30 px-2 sm:px-4">
                            <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-2">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={cn(
                                            "relative px-4 sm:px-6 py-3 text-sm font-bold rounded-xl transition-all whitespace-nowrap",
                                            activeTab === tab.id
                                                ? "text-primary bg-primary/10"
                                                : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                                        )}
                                    >
                                        {tab.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Tab Content */}
                        <div className="min-h-[400px]">
                            {activeTab === 'overview' && (
                                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                                    <div className="glass-panel p-6 sm:p-8 rounded-3xl">
                                        <h3 className="font-heading font-bold text-xl mb-4 text-foreground">About</h3>
                                        <p className="text-muted-foreground leading-loose text-lg">{restaurant.description}</p>
                                    </div>

                                    {/* Highlights */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="glass-panel p-6 rounded-3xl flex flex-col gap-3 group hover:border-primary/30 transition-colors">
                                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform"><Utensils className="w-5 h-5" /></div>
                                            <div>
                                                <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Best Dish</div>
                                                <div className="font-bold text-lg text-foreground">{restaurant.bestDish}</div>
                                            </div>
                                        </div>
                                        <div className="glass-panel p-6 rounded-3xl flex flex-col gap-3 group hover:border-primary/30 transition-colors">
                                            <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent group-hover:scale-110 transition-transform"><Users className="w-5 h-5" /></div>
                                            <div>
                                                <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Good For</div>
                                                <div className="font-bold text-lg text-foreground">{restaurant.goodFor.join(", ")}</div>
                                            </div>
                                        </div>
                                        <div className="glass-panel p-6 rounded-3xl flex flex-col gap-3 group hover:border-primary/30 transition-colors">
                                            <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform"><TrendingUp className="w-5 h-5" /></div>
                                            <div>
                                                <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Peak Hours</div>
                                                <div className="font-bold text-lg text-foreground">{restaurant.peakHours}</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Amenities */}
                                    <div className="glass-panel p-8 rounded-3xl">
                                        <h3 className="font-heading font-bold text-xl mb-6">Amenities & Vibes</h3>
                                        <div className="flex flex-wrap gap-3">
                                            {restaurant.tags.map((tag) => (
                                                <div key={tag} className="flex items-center gap-2 px-4 py-3 rounded-xl bg-secondary/50 border border-secondary hover:border-primary/20 transition-colors">
                                                    <span className="text-primary">{tagIcons[tag]}</span>
                                                    <span className="font-medium capitalize text-sm">{tag.replace(/-/g, ' ')}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {activeTab === 'menu' && (
                                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                                    <div className="glass-panel rounded-3xl divide-y divide-border/40 overflow-hidden">
                                        {restaurant.menu.map((item, i) => (
                                            <div key={i} className="p-6 flex items-start justify-between gap-4 hover:bg-secondary/20 transition-colors group">
                                                <div>
                                                    <div className="flex items-center gap-3 mb-1">
                                                        <div className={cn("w-4 h-4 rounded border flex items-center justify-center", item.isVeg ? "border-green-600" : "border-red-600")}>
                                                            <div className={cn("w-2 h-2 rounded-full", item.isVeg ? "bg-green-600" : "bg-red-600")} />
                                                        </div>
                                                        <h4 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">{item.name}</h4>
                                                        {item.isBestSeller && <span className="bg-amber-100 text-amber-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">Bestseller</span>}
                                                    </div>
                                                    <div className="text-sm text-muted-foreground font-medium pl-7">{item.category}</div>
                                                </div>
                                                <div className="text-lg font-bold">₹{item.price}</div>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {activeTab === 'photos' && (
                                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {restaurant.photos.map((photo, i) => (
                                        <div key={i} className="aspect-square rounded-2xl overflow-hidden group relative cursor-zoom-in">
                                            <img src={photo} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </div>
                                    ))}
                                </motion.div>
                            )}
                        </div>
                    </div>

                    {/* Sidebar / Info Card */}
                    <div className="w-full lg:w-96 shrink-0 space-y-6">
                        <div className="glass-panel p-6 rounded-3xl sticky top-24">
                            <h3 className="font-heading font-bold text-xl mb-6">Contact & Location</h3>

                            <div className="space-y-6">
                                <div className="flex gap-4">
                                    <MapPin className="w-6 h-6 text-primary shrink-0" />
                                    <div>
                                        <p className="text-sm text-foreground mb-1 leading-snug font-medium">{restaurant.address}</p>
                                        <p className="text-xs text-muted-foreground">{restaurant.distance} away</p>
                                    </div>
                                </div>

                                <iframe
                                    src={`https://www.google.com/maps?q=${restaurant.lat},${restaurant.lng}&z=16&output=embed`}
                                    className="w-full h-40 rounded-xl border border-border/50"
                                    loading="lazy"
                                />

                                <div className="flex gap-3">
                                    <button onClick={handleGetDirections} className="flex-1 bg-primary text-white py-3.5 rounded-xl font-bold text-sm shadow-lg shadow-primary/25 hover:bg-primary/90 transition-all flex items-center justify-center gap-2">
                                        <Navigation className="w-4 h-4" />
                                        Directions
                                    </button>
                                    <button className="flex-1 bg-white border border-border text-foreground py-3.5 rounded-xl font-bold text-sm hover:bg-secondary transition-all flex items-center justify-center gap-2">
                                        <Phone className="w-4 h-4" />
                                        Call
                                    </button>
                                </div>
                            </div>

                            <div className="mt-8 pt-6 border-t border-dashed border-border/60">
                                <h4 className="font-bold text-sm mb-4">Opening Hours</h4>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Mon - Fri</span>
                                        <span className="font-medium text-foreground">{restaurant.openingHours}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Sat - Sun</span>
                                        <span className="font-medium text-foreground">{restaurant.openingHours}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
