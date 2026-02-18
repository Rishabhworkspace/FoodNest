'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Star, MapPin, Clock, Wifi, TreePine, Leaf, PawPrint, Sun, Music, GraduationCap, Moon } from 'lucide-react';
import { Restaurant } from '@/data/restaurants';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface RestaurantCardProps {
    restaurant: Restaurant;
    index?: number;
}

export default function RestaurantCard({
    restaurant,
    index = 0,
}: RestaurantCardProps) {
    const [isHovered, setIsHovered] = useState(false);

    const tagIcons: Record<string, React.ReactNode> = {
        wifi: <Wifi className="w-3 h-3" />,
        'outdoor-seating': <TreePine className="w-3 h-3" />,
        'pet-friendly': <PawPrint className="w-3 h-3" />,
        rooftop: <Sun className="w-3 h-3" />,
        'live-music': <Music className="w-3 h-3" />,
        'student-budget': <GraduationCap className="w-3 h-3" />,
        'late-night': <Moon className="w-3 h-3" />,
        'quick-bite': <Clock className="w-3 h-3" />,
        organic: <Leaf className="w-3 h-3" />,
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className="group h-full"
        >
            <Link href={`/restaurant/${restaurant.id}`} className="block h-full">
                <div className="relative h-full bg-white rounded-[2rem] overflow-hidden border border-border/50 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 ease-out flex flex-col">
                    {/* Image Container - Taller and more immersive */}
                    <div className="relative h-64 overflow-hidden">
                        <motion.img
                            src={restaurant.image}
                            alt={restaurant.name}
                            className="w-full h-full object-cover"
                            animate={{ scale: isHovered ? 1.05 : 1 }}
                            transition={{ duration: 0.7, ease: "easeOut" }}
                            loading="lazy"
                        />

                        {/* Gradient Overlays */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90" />

                        {/* Top Badges */}
                        <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-10">
                            <div className="flex gap-2">
                                <div className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white border border-white/20 shadow-sm">
                                    {restaurant.cuisine[0]}
                                </div>
                            </div>
                            <div className={cn(
                                "px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md shadow-sm flex items-center gap-1",
                                restaurant.isOpen ? "bg-emerald-500/90 text-white" : "bg-rose-500/90 text-white"
                            )}>
                                <Clock className="w-3 h-3" />
                                {restaurant.isOpen ? 'Open' : 'Closed'}
                            </div>
                        </div>

                        {/* Floating Rating Badge */}
                        <div className="absolute bottom-4 right-4 z-10">
                            <div className="flex items-center gap-1 bg-white px-2.5 py-1.5 rounded-xl shadow-lg">
                                <Star className="w-3.5 h-3.5 text-orange-500 fill-orange-500" />
                                <span className="text-sm font-bold text-foreground">{restaurant.rating}</span>
                                <span className="text-[10px] text-muted-foreground font-medium">({restaurant.reviewCount})</span>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 flex flex-col flex-1 relative">
                        {/* Price & Distance Row */}
                        <div className="flex items-center justify-between mb-2 text-xs font-medium text-muted-foreground">
                            <div className="flex items-center gap-3">
                                <span className="text-primary bg-primary/5 px-2 py-0.5 rounded-md border border-primary/10">{restaurant.priceRange}</span>
                                <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {restaurant.distance}</span>
                            </div>
                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {restaurant.distanceMinutes} min</span>
                        </div>

                        <h3 className="font-heading font-bold text-xl text-foreground leading-tight mb-2 group-hover:text-primary transition-colors line-clamp-1">
                            {restaurant.name}
                        </h3>

                        <p className="text-muted-foreground text-sm line-clamp-2 mb-4 flex-1">
                            {restaurant.description}
                        </p>

                        <div className="mt-auto pt-4 border-t border-dashed border-border flex items-center gap-3 overflow-hidden">
                            {restaurant.tags.slice(0, 2).map((tag) => (
                                <div key={tag} className="flex items-center gap-1.5 text-xs text-muted-foreground whitespace-nowrap bg-secondary/50 px-2 py-1 rounded-lg">
                                    <span className="text-primary/70">{tagIcons[tag]}</span>
                                    <span className="capitalize">{tag.replace(/-/g, ' ')}</span>
                                </div>
                            ))}
                            {restaurant.tags.length > 2 && (
                                <span className="text-xs text-muted-foreground">+{restaurant.tags.length - 2} more</span>
                            )}
                        </div>
                    </div>

                    {/* Hover Glow Effect */}
                    <div className={cn(
                        "absolute inset-0 border-2 border-primary/0 rounded-[2rem] pointer-events-none transition-all duration-500",
                        isHovered && "border-primary/10"
                    )} />
                </div>
            </Link>
        </motion.div>
    );
}
