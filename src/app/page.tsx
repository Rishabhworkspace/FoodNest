'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  Search,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Crown,
  Zap,
  ChevronRight,
  Leaf,
  Book,
  Wallet,
  Heart,
  Pizza,
  Moon,
  Sun,
  Cake,
  Coffee,
  Laptop,
  Users,
  PartyPopper,
  Star,
  MapPin,
  Utensils
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import RestaurantCard from '@/components/RestaurantCard';
import { restaurants, quickFilters, moods } from '@/data/restaurants';
import { cn } from '@/lib/utils';

const IconMap: Record<string, React.ElementType> = {
  leaf: Leaf,
  book: Book,
  wallet: Wallet,
  heart: Heart,
  pizza: Pizza,
  moon: Moon,
  sun: Sun,
  cake: Cake,
  coffee: Coffee,
  laptop: Laptop,
  users: Users,
  party: PartyPopper,
};

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeQuickFilter, setActiveQuickFilter] = useState<string | null>(null);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);

  // Trending: highest rated
  const trendingRestaurants = useMemo(
    () => [...restaurants].sort((a, b) => b.reviewCount - a.reviewCount).slice(0, 6),
    []
  );

  // Top picks: highest rated
  const topPicks = useMemo(
    () => [...restaurants].sort((a, b) => b.rating - a.rating).slice(0, 4),
    []
  );

  // Decide for me: random 3
  // Decide for me: random 3
  const [decideForMe, setDecideForMe] = useState(() => {
    return restaurants.filter((r) => r.isOpen).slice(0, 3);
  });

  useEffect(() => {
    const open = restaurants.filter((r) => r.isOpen);
    setDecideForMe([...open].sort(() => Math.random() - 0.5).slice(0, 3));
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground font-body">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Abstract Background Shapes */}
        <motion.div style={{ y: y1 }} className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[100px] pointer-events-none -z-10" />
        <motion.div style={{ y: y2 }} className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[80px] pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <div className="flex-1 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6 border border-primary/20"
              >
                <Sparkles className="w-4 h-4" />
                <span>Discover Food, Reimagined</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-heading font-bold text-5xl sm:text-6xl lg:text-7xl leading-[1.1] mb-6 text-balance"
              >
                Taste the <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">Extraordinary</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
              >
                Find the perfect cafe or restaurant near you in seconds. Smart filters, mood-based discovery, and curated picks tailored just for you.
              </motion.p>

              {/* Search Bar */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="relative max-w-lg mx-auto lg:mx-0 group"
              >
                <div className="absolute inset-0 bg-primary/20 rounded-3xl blur-xl group-hover:bg-primary/30 transition-all opacity-50"></div>
                <div className="relative bg-white/80 backdrop-blur-xl border border-white/40 shadow-xl rounded-3xl p-2 flex items-center cursor-text transition-all focus-within:ring-2 focus-within:ring-primary/50 focus-within:scale-[1.02]">
                  <Search className="w-6 h-6 text-muted-foreground ml-4" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search customized cravings..."
                    className="flex-1 bg-transparent border-none focus:ring-0 text-foreground placeholder:text-muted-foreground px-4 py-3 min-w-0"
                  />
                  <Link
                    href={`/explore${searchQuery ? `?q=${encodeURIComponent(searchQuery)}` : ''}`}
                    className="bg-primary text-white rounded-2xl px-6 py-3 font-semibold hover:bg-primary/90 transition-all flex items-center gap-2 shadow-lg shadow-primary/20"
                  >
                    <span className="hidden sm:inline">Search</span>
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </motion.div>
            </div>

            {/* Right Side Visuals - Floating Cards */}
            <div className="flex-1 w-full relative hidden lg:block h-[600px]">
              <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="absolute top-10 right-0 w-80 z-20"
              >
                <div className="glass-panel p-4 rounded-3xl rotate-[-6deg] hover:rotate-0 transition-transform duration-500">
                  <img src="https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=2787&auto=format&fit=crop" className="w-full h-48 object-cover rounded-2xl mb-4" alt="Food" />
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-bold text-lg">Fresh Salads</h4>
                      <div className="flex text-amber-500 text-xs"><Star className="w-3 h-3 fill-current" /> 4.9</div>
                    </div>
                    <div className="bg-primary text-white p-2 rounded-full"><ArrowRight className="w-4 h-4" /></div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="absolute bottom-20 left-10 w-72 z-10"
              >
                <div className="glass-panel p-4 rounded-3xl rotate-[6deg] hover:rotate-0 transition-transform duration-500">
                  <img src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=2814&auto=format&fit=crop" className="w-full h-40 object-cover rounded-2xl mb-4" alt="Pizza" />
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-bold text-lg">Italian Pizza</h4>
                      <div className="flex text-amber-500 text-xs"><Star className="w-3 h-3 fill-current" /> 4.7</div>
                    </div>
                    <div className="bg-accent text-white p-2 rounded-full"><ArrowRight className="w-4 h-4" /></div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Filters */}
      <section className="py-6 border-y border-border/40 bg-background/60 backdrop-blur-xl sticky top-[72px] z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1 mask-gradient-right">
            {quickFilters.map((filter) => {
              const Icon = IconMap[filter.icon as string] || Sparkles;
              const isActive = activeQuickFilter === filter.id;
              return (
                <button
                  key={filter.id}
                  onClick={() => setActiveQuickFilter(isActive ? null : filter.id)}
                  className={cn(
                    "shrink-0 px-4 py-2 rounded-2xl text-sm font-medium transition-all duration-300 flex items-center gap-2 border backdrop-blur-md",
                    isActive
                      ? "bg-primary text-white border-primary/50 shadow-[0_0_20px_rgba(45,90,39,0.3)] scale-105"
                      : "bg-white/40 border-black/5 hover:bg-white/80 hover:border-black/10 text-muted-foreground hover:text-foreground hover:scale-[1.02]"
                  )}
                >
                  <Icon className={cn("w-4 h-4", isActive ? "text-white" : "text-primary")} />
                  {filter.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mood Section */}
      <section className="py-24 bg-background relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <h2 className="font-heading font-bold text-4xl sm:text-5xl mb-6 text-balance">
              Match your <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-orange-500">vibe</span>
            </h2>
            <p className="text-lg text-muted-foreground/80 max-w-xl mx-auto">
              Whether you need to focus, party, or relax, we have curated lists just for you.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6"
          >
            {moods.map((mood) => {
              const Icon = IconMap[mood.icon as string] || Sparkles;
              return (
                <motion.div
                  key={mood.id}
                  variants={itemVariants}
                >
                  <Link href={`/explore?mood=${mood.id}`}>
                    <div className="relative h-64 rounded-[2rem] overflow-hidden group cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                      <div className="absolute inset-0">
                        <img
                          src={mood.image}
                          alt={mood.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        <div className={cn("absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500 bg-gradient-to-br", mood.gradient)} />
                      </div>

                      <div className="absolute inset-0 p-6 flex flex-col justify-end">
                        <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mb-3 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <h3 className="font-bold text-white text-xl mb-1 transform translate-y-0 group-hover:-translate-y-1 transition-transform duration-300">{mood.title}</h3>
                        <p className="text-white/80 text-xs line-clamp-2 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-75">
                          {mood.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Popular Section */}
      <section className="py-20 bg-secondary/30 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="flex items-center gap-2 text-primary font-bold mb-2 uppercase tracking-wider text-sm">
                <TrendingUp className="w-4 h-4" /> Popular
              </div>
              <h2 className="font-heading font-bold text-3xl sm:text-4xl text-foreground">Trending Nearby</h2>
            </div>
            <Link href="/explore" className="group flex items-center gap-2 font-semibold text-primary hover:text-primary/80 transition-colors">
              View all <div className="bg-primary/10 rounded-full p-1 group-hover:bg-primary group-hover:text-white transition-all"><ChevronRight className="w-4 h-4" /></div>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {trendingRestaurants.map((restaurant, i) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Decide For Me (Interactive) */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary-900 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <motion.div style={{ y: y1 }} className="absolute -top-1/2 -left-1/4 w-[1000px] h-[1000px] bg-primary-600/30 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 text-center md:text-left text-white">
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="inline-block p-4 bg-white/10 backdrop-blur-md rounded-2xl mb-6 border border-white/20"
              >
                <Zap className="w-8 h-8 text-yellow-400 fill-yellow-400" />
              </motion.div>
              <h2 className="font-heading font-bold text-4xl sm:text-5xl mb-6">Can't Decide?</h2>
              <p className="text-xl text-primary-100 mb-8 max-w-lg">Let our AI-powered curation engine pick the perfect spot for you based on current vibes, timing, and your location.</p>
              <button className="px-8 py-4 bg-white text-primary-900 rounded-2xl font-bold text-lg hover:scale-105 active:scale-95 transition-all shadow-xl shadow-black/20 flex items-center gap-3 mx-auto md:mx-0">
                <Sparkles className="w-5 h-5 text-accent" />
                Spin the Wheel
              </button>
            </div>

            <div className="flex-1 w-full relative">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {decideForMe.slice(0, 2).map((restaurant, i) => (
                  <motion.div
                    key={restaurant.id}
                    className={cn("transform", i === 1 ? "sm:translate-y-12" : "")}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.2 }}
                  >
                    <RestaurantCard restaurant={restaurant} index={i} />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Curated Top Picks */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-8">
            <Crown className="w-6 h-6 text-yellow-500 fill-yellow-500" />
            <h2 className="font-heading font-bold text-3xl">Curated Top Picks</h2>
          </div>

          <div className="flex gap-6 overflow-x-auto no-scrollbar pb-8 snap-x snap-mandatory">
            {topPicks.map((restaurant, i) => (
              <div key={restaurant.id} className="min-w-[300px] sm:min-w-[350px] snap-center">
                <RestaurantCard restaurant={restaurant} index={i} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
