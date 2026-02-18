import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal } from 'lucide-react';
import { filterOptions } from '@/data/restaurants';
import { cn } from '@/lib/utils';

interface FilterSidebarProps {
    activeFilters: {
        dietary: string[];
        cuisine: string[];
        budget: string[];
        experience: string[];
    };
    onFilterChange: (
        category: keyof FilterSidebarProps['activeFilters'],
        value: string
    ) => void;
    onClearAll: () => void;
    isMobile?: boolean;
    isOpen?: boolean;
    onClose?: () => void;
}

export default function FilterSidebar({
    activeFilters,
    onFilterChange,
    onClearAll,
    isMobile = false,
    isOpen = true,
    onClose,
}: FilterSidebarProps) {
    const totalActive =
        activeFilters.dietary.length +
        activeFilters.cuisine.length +
        activeFilters.budget.length +
        activeFilters.experience.length;

    // Mobile bottom sheet
    if (isMobile) {
        return (
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
                            onClick={onClose}
                        />
                        <motion.div
                            initial={{ y: '100%' }}
                            animate={{ y: 0 }}
                            exit={{ y: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            className="fixed bottom-0 left-0 right-0 z-50 bg-background rounded-t-[2rem] max-h-[85vh] overflow-y-auto flex flex-col shadow-2xl"
                        >
                            <div className="p-6 overflow-y-auto flex-1">
                                <FilterContent
                                    activeFilters={activeFilters}
                                    onFilterChange={onFilterChange}
                                    onClearAll={onClearAll}
                                    totalActive={totalActive}
                                />
                            </div>
                            <div className="p-4 border-t border-border bg-background sticky bottom-0 z-10">
                                <button
                                    onClick={onClose}
                                    className="w-full py-4 rounded-xl bg-primary text-white font-bold text-base shadow-lg shadow-primary/25 hover:scale-[1.02] active:scale-[0.98] transition-all"
                                >
                                    Show Results
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        );
    }

    // Desktop sidebar
    return (
        <div className="glass-panel p-6 rounded-3xl sticky top-24">
            <FilterContent
                activeFilters={activeFilters}
                onFilterChange={onFilterChange}
                onClearAll={onClearAll}
                totalActive={totalActive}
            />
        </div>
    );
}

function FilterContent({
    activeFilters,
    onFilterChange,
    onClearAll,
    totalActive
}: {
    activeFilters: FilterSidebarProps['activeFilters'],
    onFilterChange: FilterSidebarProps['onFilterChange'],
    onClearAll: FilterSidebarProps['onClearAll'],
    totalActive: number
}) {
    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-border/50">
                <div className="flex items-center gap-2">
                    <div className="p-2 bg-primary/10 rounded-lg text-primary">
                        <SlidersHorizontal className="w-4 h-4" />
                    </div>
                    <h3 className="font-heading font-bold text-lg text-foreground">
                        Filters
                    </h3>
                    {totalActive > 0 && (
                        <span className="w-5 h-5 rounded-full bg-primary text-white text-xs flex items-center justify-center font-bold">
                            {totalActive}
                        </span>
                    )}
                </div>
                {totalActive > 0 && (
                    <button
                        onClick={onClearAll}
                        className="text-xs text-primary hover:text-primary/80 font-bold uppercase tracking-wide"
                    >
                        Reset
                    </button>
                )}
            </div>

            {/* Dietary */}
            <FilterSection
                title="Dietary"
                options={filterOptions.dietary}
                active={activeFilters.dietary}
                onChange={(v) => onFilterChange('dietary', v)}
            />

            {/* Cuisine */}
            <FilterSection
                title="Cuisine"
                options={filterOptions.cuisine}
                active={activeFilters.cuisine}
                onChange={(v) => onFilterChange('cuisine', v)}
            />

            {/* Budget */}
            <FilterSection
                title="Budget"
                options={filterOptions.budget}
                active={activeFilters.budget}
                onChange={(v) => onFilterChange('budget', v)}
            />

            {/* Experience */}
            <FilterSection
                title="Experience"
                options={filterOptions.experience}
                active={activeFilters.experience}
                onChange={(v) => onFilterChange('experience', v)}
            />
        </div>
    );
}

function FilterSection({
    title,
    options,
    active,
    onChange,
}: {
    title: string;
    options: { id: string; label: string }[];
    active: string[];
    onChange: (value: string) => void;
}) {
    return (
        <div>
            <h4 className="font-bold text-foreground mb-3 text-sm uppercase tracking-wider">{title}</h4>
            <div className="flex flex-wrap gap-2">
                {options.map((opt) => {
                    const isActive = active.includes(opt.id);
                    return (
                        <button
                            key={opt.id}
                            onClick={() => onChange(opt.id)}
                            className={cn(
                                "px-3 py-1.5 rounded-lg text-sm font-medium transition-all border select-none",
                                isActive
                                    ? "bg-primary text-white border-primary shadow-md shadow-primary/20"
                                    : "bg-white text-muted-foreground border-border hover:border-primary/30 hover:bg-secondary"
                            )}
                        >
                            {opt.label}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
