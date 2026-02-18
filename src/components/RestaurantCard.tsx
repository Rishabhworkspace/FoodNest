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
                <div className="relative h-full bg-white rounded-3xl overflow-hidden border border-border/50 shadow-sm hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 ease-out">
                    {/* Image Container */}
                    <div className="relative h-56 overflow-hidden">
                        <motion.img
                            src={restaurant.image}
                            alt={restaurant.name}
                            className="w-full h-full object-cover"
                            animate={{ scale: isHovered ? 1.05 : 1 }}
                            transition={{ duration: 0.7, ease: "easeOut" }}
                            loading="lazy"
                        />

                        {/* Gradient Overlays */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

                        {/* Top Badges */}
                        <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                            <div className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-foreground shadow-sm">
                                {restaurant.priceRange}
                            </div>
                            <div className={cn(
                                "px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md shadow-sm",
                                restaurant.isOpen ? "bg-primary/90 text-white" : "bg-destructive/90 text-white"
                            )}>
                                {restaurant.isOpen ? 'Open Now' : 'Closed'}
                            </div>
                        </div>

                        {/* Bottom Info on Image */}
                        <div className="absolute bottom-4 left-4 text-white">
                            <div className="flex items-center gap-1.5 text-xs font-medium bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full w-fit mb-2">
                                <MapPin className="w-3 h-3 text-accent" />
                                <span>{restaurant.distance}</span>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 flex flex-col h-[calc(100%-14rem)]">
                        <div className="flex justify-between items-start gap-2 mb-3">
                            <h3 className="font-heading font-bold text-xl text-foreground leading-tight group-hover:text-primary transition-colors">
                                {restaurant.name}
                            </h3>
                            <div className="flex items-center gap-1 bg-secondary px-2 py-1 rounded-lg shrink-0">
                                <Star className="w-3.5 h-3.5 text-orange-500 fill-orange-500" />
                                <span className="text-sm font-bold text-foreground">{restaurant.rating}</span>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-4">
                            {restaurant.cuisine.slice(0, 3).map((c) => (
                                <span key={c} className="text-xs px-2.5 py-1 rounded-full bg-secondary text-muted-foreground font-medium">
                                    {c}
                                </span>
                            ))}
                        </div>

                        <div className="mt-auto pt-4 border-t border-dashed border-border flex items-center gap-3 overflow-hidden">
                            {restaurant.tags.slice(0, 3).map((tag) => (
                                <div key={tag} className="flex items-center gap-1.5 text-xs text-muted-foreground whitespace-nowrap">
                                    <span className="text-primary/70">{tagIcons[tag]}</span>
                                    <span className="capitalize">{tag.replace(/-/g, ' ')}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
