import Link from 'next/link';
import { MapPin, Mail, Instagram, Twitter, Github, Utensils, Heart } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-secondary/30 pt-20 pb-10 relative overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
                    {/* Brand */}
                    <div className="lg:col-span-1">
                        <Link href="/" className="flex items-center gap-2 mb-6 group">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform duration-300">
                                <Utensils className="w-5 h-5 text-white" />
                            </div>
                            <span className="font-heading font-bold text-xl text-foreground">
                                Food<span className="text-primary">Nest</span>
                            </span>
                        </Link>
                        <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                            Discover the extraordinary. FoodNest connects you with the best dining experiences, curated just for your mood and taste.
                        </p>
                        <div className="flex items-center gap-3">
                            {[Instagram, Twitter, Github].map((Icon, i) => (
                                <button
                                    key={i}
                                    className="w-10 h-10 rounded-full bg-white border border-border hover:border-primary/50 hover:bg-primary/5 flex items-center justify-center transition-all duration-300 group/icon"
                                >
                                    <Icon className="w-4 h-4 text-muted-foreground group-hover/icon:text-primary transition-colors" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="font-heading font-bold text-foreground mb-6">Explore</h4>
                        <ul className="space-y-3">
                            {['Trending Restaurants', 'New Arrivals', 'Best Rated', 'Collections', 'Experiences'].map((item) => (
                                <li key={item}>
                                    <Link href="/explore" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-heading font-bold text-foreground mb-6">Cuisines</h4>
                        <ul className="space-y-3">
                            {['Italian', 'Japanese', 'Indian', 'Mexican', 'Thai', 'Healthy'].map((item) => (
                                <li key={item}>
                                    <Link href="/explore" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter / Contact */}
                    <div>
                        <h4 className="font-heading font-bold text-foreground mb-6">Stay in loop</h4>
                        <div className="flex gap-2 mb-6">
                            <input
                                type="email"
                                placeholder="Enter email"
                                className="bg-white border border-border rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary/50 w-full"
                            />
                            <button className="bg-primary text-white rounded-xl px-4 py-2.5 hover:bg-primary/90 transition-colors">
                                Go
                            </button>
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                <MapPin className="w-4 h-4 text-primary" />
                                <span>Bangalore, India</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                <Mail className="w-4 h-4 text-primary" />
                                <span>hello@foodnest.app</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
