import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Filter, ShieldCheck, Star, Sparkles, Building, Calendar, Users, Award, Database, RefreshCw, X, ChevronRight } from 'lucide-react';
import { Manufacturer, ProductCategory } from '../types';
import { MANUFACTURERS } from '../data';

interface DirectoryProps {
  onSelectManufacturerPreset: (category: ProductCategory, factory: string) => void;
}

export default function ManufacturerDirectory({ onSelectManufacturerPreset }: DirectoryProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'all'>('all');
  const [activeDetailsId, setActiveDetailsId] = useState<string | null>(null);

  // Filter logic
  const filteredManufacturers = MANUFACTURERS.filter((item) => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.productType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.city.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <section id="directory-preview" className="py-20 md:py-28 bg-gray-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column — Title & Subtext */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
            <span className="font-sans text-[10px] font-bold text-brand-orange uppercase tracking-[0.2em] block">
              TRUSTED & COMPLIANT DIRECTORY
            </span>
            <h2 className="font-sans font-bold text-3xl sm:text-4xl lg:text-5xl text-editorial-dark tracking-tighter leading-tight">
              Verified manufacturers. Verified products. <span className="text-brand-orange font-extrabold">Before you ever see them.</span>
            </h2>
            <p className="font-sans text-editorial-dark/70 text-sm sm:text-base leading-relaxed">
              Every manufacturer on KaroTradz is admin-reviewed for company and product verification. Filter by category, region, certification, and Incoterms, then compare landed cost side by side.
            </p>

            <div className="bg-white border border-gray-200 p-4 font-sans text-[10px] text-gray-400 leading-normal rounded-md">
              Illustrative directory preview. Live listings open as manufacturers complete verification in Gujarat's manufacturing hubs.
            </div>
          </div>

          {/* Right Column — Rich Interactive List with Search & Detail Accordions */}
          <div className="lg:col-span-7 bg-white border border-gray-200 p-6 sm:p-8 space-y-6 shadow-none rounded-2xl">
            
            <div className="space-y-4">
              <span className="font-sans text-[9px] font-bold text-gray-400 uppercase tracking-[0.2em] block">
                GUJARAT EXPORT HUB INDEX
              </span>

              {/* Search & Category Filter Controls */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                <div className="relative sm:col-span-7">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search supplier or HS material code..."
                    className="w-full bg-gray-50 border border-gray-200 px-10 py-2.5 text-xs font-sans text-editorial-dark focus:outline-none focus:ring-1 focus:ring-brand-orange focus:bg-white focus:border-brand-orange transition-all placeholder:text-gray-400 rounded-2xl  "
                  />
                </div>

                <div className="sm:col-span-5">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value as ProductCategory | 'all')}
                    className="w-full bg-gray-50 border border-gray-200 px-3 py-2.5 text-xs font-sans text-editorial-dark focus:outline-none focus:ring-1 focus:ring-brand-orange focus:border-brand-orange rounded-2xl   cursor-pointer"
                  >
                    <option value="all">All Sectors</option>
                    <option value="textiles">Cotton Textiles</option>
                    <option value="auto_components">Auto Components</option>
                    <option value="giftware">Ceramic Giftware</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Manufacturer Cards List */}
            <div className="space-y-4">
              {filteredManufacturers.length > 0 ? (
                filteredManufacturers.map((m) => {
                  const isExpanded = activeDetailsId === m.id;
                  return (
                    <div 
                      key={m.id}
                      className={`border transition-all duration-300 rounded-2xl ${
                        isExpanded ? 'border-brand-orange bg-brand-orange/[0.02]' : 'border-gray-200 hover:border-gray-300 bg-white'
                      }`}
                    >
                      {/* Main Summary Panel */}
                      <div 
                        onClick={() => setActiveDetailsId(isExpanded ? null : m.id)}
                        className="p-5 flex items-center justify-between gap-2 cursor-pointer"
                      >
<div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center flexShrink-0"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-factory text-orange-500"><path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"></path><path d="M17 18h1"></path><path d="M12 18h1"></path><path d="M7 18h1"></path></svg></div>

                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-sans font-bold text-editorial-dark text-sm sm:text-base hover:text-brand-orange transition-colors">
                              {m.name}
                            </h4>
                            <span className="flex items-center gap-1 font-mono text-[8px] font-bold text-emerald-700 bg-emerald-500/5 px-2 py-0.5 border border-emerald-500/10 uppercase tracking-[0.1em] rounded-full">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                              <span>Verified</span>
                            </span>
                          </div>
                          
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-editorial-dark/50 font-sans">
                            <span>{m.city}, {m.state}</span>
                            <span className="text-editorial-dark/20">•</span>
                            <span className="font-medium text-editorial-dark/75">{m.productType}</span>
                          </div>
                        </div>

                        </div>

                        <div className="flex items-center gap-3">
                          {/* Rating display */}
                          <div className="flex items-center gap-1 text-brand-orange font-mono text-xs font-bold">
                            <Star className="w-3.5 h-3.5 fill-brand-orange stroke-brand-orange" />
                            <span>{m.rating}</span>
                          </div>
                          <ChevronRight className={`w-4 h-4 text-editorial-dark/40 transition-transform duration-300 ${isExpanded ? 'rotate-90 text-brand-orange' : ''}`} />
                        </div>
                      </div>

                      {/* Expandable Verification Accordion */}
                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="overflow-hidden bg-editorial-sand border-t border-editorial-dark/10 rounded-2xl"
                          >
                            <div className="p-5 space-y-4 text-xs font-sans text-editorial-dark/70">
                              
                              {/* Tech Specifications Grid */}
                              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-brand-beige p-4 border border-editorial-dark/10 rounded-md">
                                <div>
                                  <span className="font-mono text-[8px] text-editorial-dark/40 block uppercase tracking-[0.1em] mb-0.5">ESTABLISHED</span>
                                  <span className="font-sans font-bold text-editorial-dark text-xs flex items-center gap-1">
                                    <Calendar className="w-3.5 h-3.5 text-editorial-dark/40" />
                                    <span>{m.yearEstablished}</span>
                                  </span>
                                </div>
                                <div>
                                  <span className="font-mono text-[8px] text-editorial-dark/40 block uppercase tracking-[0.1em] mb-0.5">LABOR FORCE</span>
                                  <span className="font-sans font-bold text-editorial-dark text-xs flex items-center gap-1">
                                    <Users className="w-3.5 h-3.5 text-editorial-dark/40" />
                                    <span>{m.employees} Employees</span>
                                  </span>
                                </div>
                                <div className="col-span-2">
                                  <span className="font-mono text-[8px] text-editorial-dark/40 block uppercase tracking-[0.1em] mb-0.5">PRODUCTION CAPACITY</span>
                                  <span className="font-sans font-bold text-editorial-dark text-xs flex items-center gap-1">
                                    <Building className="w-3.5 h-3.5 text-editorial-dark/40" />
                                    <span>{m.capacity}</span>
                                  </span>
                                </div>
                              </div>

                              {/* Certifications & Badges */}
                              <div className="space-y-1.5">
                                <span className="font-mono text-[8px] text-editorial-dark/40 uppercase tracking-[0.15em] block font-bold">
                                  COMPLIANCE & SECURITY AUDIT
                                </span>
                                <div className="flex flex-wrap gap-2 pt-1">
                                  {m.certifications.map((cert) => (
                                    <span 
                                      key={cert}
                                      className="inline-flex items-center gap-1 font-sans text-[10px] font-bold text-editorial-dark bg-brand-beige border border-editorial-dark/15 px-2.5 py-1 rounded-sm"
                                    >
                                      <Award className="w-3 h-3 text-brand-orange" />
                                      <span>{cert}</span>
                                    </span>
                                  ))}
                                </div>
                              </div>

                              {/* Preset integration button */}
                              <div className="pt-2 border-t border-editorial-dark/10 flex justify-between items-center flex-wrap gap-2">
                                <span className="font-mono text-[8px] text-editorial-dark/40 uppercase tracking-[0.1em]">
                                  COMPLIANCE SCORE: 100/100
                                </span>
                                <button
                                  type="button"
                                  onClick={() => {
                                    onSelectManufacturerPreset(m.category, `${m.city}, ${m.state}`);
                                    // Smooth scroll to Wedge Calculator
                                    const calc = document.getElementById('buyers');
                                    calc?.scrollIntoView({ behavior: 'smooth' });
                                  }}
                                  className="inline-flex items-center gap-1.5 font-mono text-[9px] font-bold text-brand-orange hover:text-editorial-dark bg-brand-orange/5 px-4 py-2 border border-brand-orange/20 rounded-full transition-all cursor-pointer uppercase tracking-[0.1em]"
                                >
                                  <RefreshCw className="w-3.5 h-3.5" />
                                  <span>SIMULATE LANDED COST</span>
                                </button>
                              </div>

                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                    </div>
                  );
                })
              ) : (
                <div className="text-center py-12 border border-dashed border-editorial-dark/15 bg-editorial-sand/40 font-sans text-editorial-dark/50 text-sm">
                  No active suppliers found matching "{searchTerm}" or sector filter.
                </div>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
