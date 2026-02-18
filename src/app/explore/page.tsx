'use client';

import { useState, useMemo, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
    SlidersHorizontal,
    Map,
    LayoutGrid,
    ArrowUpDown,
    X,
    Utensils,
    Search
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import RestaurantCard from '@/components/RestaurantCard';
import FilterSidebar from '@/components/FilterSidebar';
import { restaurants, filterOptions, moods } from '@/data/restaurants';
import { cn } from '@/lib/utils';
import { Suspense } from 'react';

type FilterState = {
    dietary: string[];
    cuisine: string[];
    budget: string[];
    experience: string[];
};

function ExploreContent() {
    const searchParams = useSearchParams();
    const initialQuery = searchParams.get('q') || '';
    const initialMood = searchParams.get('mood') || '';
    const initialFilter = searchParams.get('filter') || '';

    const [searchQuery, setSearchQuery] = useState(initialQuery);
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
    const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
    const [sortBy, setSortBy] = useState('relevance');
    const [isSortOpen, setIsSortOpen] = useState(false);

    // Initialize filters
    const getInitialFilters = (): FilterState => {
        const filters: FilterState = {
            dietary: [],
            cuisine: [],
            budget: [],
            experience: [],
        };

        if (initialMood) {
            const mood = moods.find((m) => m.id === initialMood);
            if (mood) filters.experience = mood.filterTags;
        }

        if (initialFilter) {
            switch (initialFilter) {
                case 'veg-only': filters.dietary = ['veg-only']; break;
                case 'study-cafes': filters.experience = ['study-friendly']; break;
                case 'budget-eats': filters.budget = ['₹']; break;
                case 'romantic-dinner': filters.experience = ['date-night']; break;
                case 'italian': filters.cuisine = ['Italian']; break;
                case 'late-night': filters.experience = ['late-night']; break;
                case 'rooftop': filters.experience = ['rooftop']; break;
                case 'bakery': filters.cuisine = ['Bakery']; break;
            }
        }
        return filters;
    };

    const [activeFilters, setActiveFilters] = useState<FilterState>(getInitialFilters);
    const [location, setLocation] = useState('Bangalore');

    const handleFilterChange = useCallback((category: keyof FilterState, value: string) => {
        setActiveFilters((prev) => ({
            ...prev,
            [category]: prev[category].includes(value)
                ? prev[category].filter((v) => v !== value)
                : [...prev[category], value],
        }));
    }, []);

    const clearAllFilters = useCallback(() => {
        setActiveFilters({ dietary: [], cuisine: [], budget: [], experience: [] });
    }, []);

    // Filter Logic
    const filteredRestaurants = useMemo(() => {
        let result = [...restaurants];

        // Filter by location first
        result = result.filter(r => r.city === location);

        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            result = result.filter(r =>
                r.name.toLowerCase().includes(q) ||
                r.cuisine.some(c => c.toLowerCase().includes(q)) ||
                r.tags.some(t => t.toLowerCase().includes(q)) ||
                r.description.toLowerCase().includes(q)
            );
        }

        if (activeFilters.dietary.length > 0) {
            result = result.filter(r => activeFilters.dietary.some(d => r.dietary.includes(d) || (d === 'veg-only' && r.isVeg)));
        }
        if (activeFilters.cuisine.length > 0) {
            result = result.filter(r => activeFilters.cuisine.some(c => r.cuisine.includes(c)));
        }
        if (activeFilters.budget.length > 0) {
            result = result.filter(r => activeFilters.budget.includes(r.priceRange));
        }
        if (activeFilters.experience.length > 0) {
            result = result.filter(r => activeFilters.experience.some(e => r.experience.includes(e)));
        }

        switch (sortBy) {
            case 'rating': result.sort((a, b) => b.rating - a.rating); break;
            case 'distance': result.sort((a, b) => a.distanceMinutes - b.distanceMinutes); break;
            case 'price-low': result.sort((a, b) => a.priceRange.length - b.priceRange.length); break;
            case 'price-high': result.sort((a, b) => b.priceRange.length - a.priceRange.length); break;
        }

        return result;
    }, [searchQuery, activeFilters, sortBy, location]); // Added location dependency

    const totalActive = Object.values(activeFilters).reduce((acc, curr) => acc + curr.length, 0);

    return (
        <div className="min-h-screen bg-background">
            <Navbar selectedLocation={location} setSelectedLocation={setLocation} />


            <div className="pt-24 pb-12 min-h-screen">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8"
                    >
                        <h1 className="font-heading font-bold text-3xl sm:text-4xl text-foreground mb-3">
                            Explore Restaurants
                        </h1>
                        <p className="text-muted-foreground text-lg">
                            Find your next meal from our curated list of {filteredRestaurants.length} places.
                        </p>
                    </motion.div>

                    {/* Mobile Controls */}
                    <div className="flex flex-wrap items-center gap-3 mb-6 lg:hidden">
                        <button
                            onClick={() => setIsMobileFilterOpen(true)}
                            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-white text-sm font-medium text-foreground hover:bg-secondary transition-colors"
                        >
                            <SlidersHorizontal className="w-4 h-4" />
                            Filters
                            {totalActive > 0 && (
                                <span className="w-5 h-5 rounded-full bg-primary text-white text-xs flex items-center justify-center font-bold">
                                    {totalActive}
                                </span>
                            )}
                        </button>

                        <div className="flex bg-secondary/50 p-1 rounded-xl">
                            <button
                                onClick={() => setViewMode('list')}
                                className={cn("p-2 rounded-lg transition-all", viewMode === 'list' ? "bg-white shadow-sm text-primary" : "text-muted-foreground")}
                            >
                                <LayoutGrid className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => setViewMode('map')}
                                className={cn("p-2 rounded-lg transition-all", viewMode === 'map' ? "bg-white shadow-sm text-primary" : "text-muted-foreground")}
                            >
                                <Map className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Desktop Sidebar */}
                        <div className="hidden lg:block w-72 shrink-0">
                            <FilterSidebar
                                activeFilters={activeFilters}
                                onFilterChange={handleFilterChange}
                                onClearAll={clearAllFilters}
                            />
                        </div>

                        {/* Results */}
                        <div className="flex-1">
                            <div className="hidden lg:flex items-center justify-between mb-6">
                                <div className="text-sm text-muted-foreground">Showing <span className="font-bold text-foreground">{filteredRestaurants.length}</span> results</div>

                                <div className="flex items-center gap-3">
                                    <div className="flex bg-secondary/50 p-1 rounded-xl">
                                        <button
                                            onClick={() => setViewMode('list')}
                                            className={cn("px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-2", viewMode === 'list' ? "bg-white shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground")}
                                        >
                                            <LayoutGrid className="w-4 h-4" /> List
                                        </button>
                                        <button
                                            onClick={() => setViewMode('map')}
                                            className={cn("px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-2", viewMode === 'map' ? "bg-white shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground")}
                                        >
                                            <Map className="w-4 h-4" /> Map
                                        </button>
                                    </div>

                                    <div className="relative">
                                        <button
                                            onClick={() => setIsSortOpen(!isSortOpen)}
                                            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-white text-sm font-medium hover:bg-secondary/50 transition-colors"
                                        >
                                            <ArrowUpDown className="w-4 h-4 text-muted-foreground" />
                                            Sort by
                                        </button>
                                        <AnimatePresence>
                                            {isSortOpen && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: 10 }}
                                                    className="absolute right-0 top-full mt-2 bg-white rounded-xl shadow-xl border border-border py-1 min-w-[200px] z-30"
                                                >
                                                    {filterOptions.sort.map((opt) => (
                                                        <button
                                                            key={opt.id}
                                                            onClick={() => {
                                                                setSortBy(opt.id);
                                                                setIsSortOpen(false);
                                                            }}
                                                            className={cn(
                                                                "w-full text-left px-4 py-2.5 text-sm transition-colors",
                                                                sortBy === opt.id ? "bg-primary/5 text-primary font-bold" : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                                                            )}
                                                        >
                                                            {opt.label}
                                                        </button>
                                                    ))}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>
                            </div>

                            {/* Active Chips */}
                            <AnimatePresence>
                                {totalActive > 0 && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="flex flex-wrap gap-2 mb-6 overflow-hidden"
                                    >
                                        {Object.entries(activeFilters).flatMap(([category, values]) =>
                                            values.map((v) => (
                                                <motion.button
                                                    key={`${category}-${v}`}
                                                    initial={{ scale: 0.8, opacity: 0 }}
                                                    animate={{ scale: 1, opacity: 1 }}
                                                    onClick={() => handleFilterChange(category as keyof FilterState, v)}
                                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary text-white text-xs font-bold hover:bg-primary/90 transition-colors"
                                                >
                                                    {v.replace(/-/g, ' ')}
                                                    <X className="w-3 h-3" />
                                                </motion.button>
                                            ))
                                        )}
                                        <button onClick={clearAllFilters} className="text-sm text-muted-foreground hover:text-primary underline decoration-dotted underline-offset-4">
                                            Clear all
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {viewMode === 'list' ? (
                                filteredRestaurants.length === 0 ? (
                                    <div className="text-center py-20 bg-secondary/30 rounded-3xl border border-dashed border-border">
                                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                                            <Utensils className="w-8 h-8 text-muted-foreground" />
                                        </div>
                                        <h3 className="font-heading font-bold text-xl text-foreground mb-2">No matches found</h3>
                                        <p className="text-muted-foreground mb-6 max-w-sm mx-auto">We couldn't find any restaurants matching your specific cravings. Try refreshing the filters.</p>
                                        <button onClick={clearAllFilters} className="px-6 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-colors">
                                            Reset Filters
                                        </button>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                                        <AnimatePresence mode="popLayout">
                                            {filteredRestaurants.map((restaurant, i) => (
                                                <RestaurantCard
                                                    key={restaurant.id}
                                                    restaurant={restaurant}
                                                    index={i}
                                                />
                                            ))}
                                        </AnimatePresence>
                                    </div>
                                )
                            ) : (
                                <div className="bg-white rounded-3xl border border-border overflow-hidden shadow-sm h-[600px] sticky top-24">
                                    <iframe
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0 }}
                                        loading="lazy"
                                        src={`https://www.google.com/maps?q=12.9716,77.5946&z=14&output=embed`}
                                        title="Restaurant Map"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <FilterSidebar
                activeFilters={activeFilters}
                onFilterChange={handleFilterChange}
                onClearAll={clearAllFilters}
                isMobile
                isOpen={isMobileFilterOpen}
                onClose={() => setIsMobileFilterOpen(false)}
            />

            <Footer />
        </div>
    );
}

export default function ExplorePage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
                    <div className="font-heading font-bold text-lg text-primary animate-pulse">Loading Taste...</div>
                </div>
            </div>
        }>
            <ExploreContent />
        </Suspense>
    );
}
