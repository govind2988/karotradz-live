import { useState } from 'react';
import { motion } from 'motion/react';
import { Check, ShieldCheck, Zap, Coins, ClipboardList, Send, ArrowRight } from 'lucide-react';

export default function ServiceModels() {
  const [selectedProfile, setSelectedProfile] = useState<'emerging' | 'established'>('established');

  return (
    <section id="manufacturers" className="py-20 md:py-28 bg-white border-b border-gray-100 text-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="space-y-4 max-w-3xl mx-auto mb-16">
          <span className="font-sans text-[10px] font-bold text-brand-orange uppercase tracking-[0.2em] block">
            FOR MANUFACTURERS
          </span>
          <h2 className="font-sans font-bold text-3xl sm:text-4xl lg:text-5xl text-editorial-dark tracking-tighter leading-tight">
            Choose how much of the export process you <span className="text-brand-orange font-extrabold">want to own</span>.
          </h2>
          <p className="font-sans text-editorial-dark/70 text-sm sm:text-base leading-relaxed">
            We provide options for both manufacturers seeking a turn-key export division and those who already have mature logistics teams and simply require verified global lead flow.
          </p>

          {/* Mini Interactive Filter: Vibe Check */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <span className="font-sans text-[10px] text-gray-400 font-bold uppercase tracking-[0.15em]">Your Profile:</span>
            <div className="inline-flex bg-gray-200/50 p-1 border rounded-4xl border-gray-200/80">
              <button
                type="button"
                onClick={() => setSelectedProfile('emerging')}
                className={`px-4 py-1.5 text-xs font-sans font-bold transition-all cursor-pointer ${
                  selectedProfile === 'emerging'
                    ? 'bg-editorial-dark text-white rounded-4xl'
                    : 'text-gray-500 hover:text-editorial-dark '
                }`}
              >
                New to Direct Export
              </button>
              <button
                type="button"
                onClick={() => setSelectedProfile('established')}
                className={`px-4 py-1.5 text-xs font-sans font-bold transition-all cursor-pointer ${
                  selectedProfile === 'established'
                    ? 'bg-editorial-dark text-white rounded-4xl'
                    : 'text-gray-500 hover:text-editorial-dark'
                }`}
              >
                Established Exporter
              </button>
            </div>
          </div>

          {/* Dynamic Alert Banner based on Profile Toggle */}
          <div className="mt-6 bg-editorial-sand/50 border border-editorial-dark/10 p-5 transition-all rounded-2xl">
            {selectedProfile === 'established' ? (
              <div className="flex gap-3 items-center">
                <span className="bg-emerald-500/10 text-emerald-700 font-mono text-[9px] font-bold px-4 py-2 border border-emerald-500/20 uppercase tracking-wider mt-0.5 rounded-2xl  ">
                  ● ACTIVE AT LAUNCH
                </span>
                <div className="space-y-1">
                  <p className="font-sans font-bold text-xs text-editorial-dark">Recommended: Model 02 — Lead Subscription (Tier 1)</p>
                  <p className="font-sans text-xs text-editorial-dark/70 leading-relaxed">
                    This model is fully active and live. For established factories in Gujarat with shipping resources, this connects you directly to verified GCC, UK, and USA buyers with zero transaction commission.
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex gap-3 items-center">
                <span className="bg-amber-500/15 text-brand-orange font-mono text-[9px] font-bold px-4 py-2 border border-brand-orange/30 uppercase tracking-wider mt-0.5 rounded-2xl  ">
                  COMING SOON
                </span>
                <div className="space-y-1">
                  <p className="font-sans font-bold text-xs text-editorial-dark">Model 01 — Full-Service Export (Tier 2 Roadmap)</p>
                  <p className="font-sans text-xs text-editorial-dark/70 leading-relaxed">
                    If you are new to direct export and lack an in-house logistics team, our upcoming Tier 2 Full-Service model is designed for you. Register today to lock in your priority spot on the post-launch roadmap waitlist.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          
          {/* Card 1: Full-Service Export (POST-LAUNCH ROADMAP) */}
          <motion.div
            animate={{
              borderColor: selectedProfile === 'emerging' ? '#FF5500' : 'rgba(18, 18, 18, 0.1)',
              scale: selectedProfile === 'emerging' ? 1.01 : 1,
            }}
            transition={{ duration: 0.3 }}
            className={`border-2 p-8 flex flex-col justify-between relative shadow-none h-full bg-editorial-dark text-white rounded-2xl`}
          >
            {/* Top-right Tag */}
            <div className="text-center mb-4 md:absolute top-8 right-8 md:text-right">
              <span className="bg-amber-500/20 text-brand-orange font-mono text-[9px] font-bold tracking-[0.15em] px-3 py-1 uppercase rounded-2xl   border border-brand-orange/30 block mb-1">
                COMING SOON
              </span>
              <span className="text-[8px] font-mono text-white/40 tracking-wider">POST-LAUNCH TIER</span>
            </div>

            <div className="space-y-6">
              <div className="space-y-1">
                <span className="font-mono text-[9px] text-brand-orange font-bold uppercase tracking-[0.2em] block">
                  MODEL 01 (ROADMAP)
                </span>
                <h3 className="font-sans font-bold text-2xl sm:text-3xl tracking-tight text-white">
                  Full-Service Export
                </h3>
                <span className="font-mono text-xs text-white/50 font-medium tracking-wide block pt-1">
                  Commission on order value • Future Release
                </span>
              </div>

              <p className="font-sans text-white/80 text-xs sm:text-sm leading-relaxed">
                For manufacturers who want to focus entirely on production quality and let our upcoming professional agency team handle global sales, customs filing, and container logistics. <span className="text-brand-orange font-bold">Currently in pre-launch.</span>
              </p>

              <div className="border-t border-white/10 my-6" />

              <span className="font-sans text-[10px] text-white/40 font-bold uppercase tracking-wider block">
                WHAT IS INCLUDED IN ROADMAP
              </span>
              <ul className="space-y-3">
                {[
                  'KaroTradz manages buyer communication, pricing, and documentation.',
                  'Complete customs filing, clearance, and ocean container scheduling.',
                  'Milestone-based payment structures protected by Indian regulatory protocols.',
                  'Automated translation and technical documentation handling.'
                ].map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-brand-orange/15 border border-brand-orange/30 flex items-center justify-center text-brand-orange flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3" />
                    </div>
                    <span className="font-sans text-xs text-white/80 leading-normal">{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-8 mt-6 border-t border-white/10 flex justify-between items-center">
              <span className="font-sans text-[9px] text-brand-orange font-bold tracking-[0.1em]">BEST FOR EXPORT-READY TEAMS</span>
              <button 
                type="button"
                onClick={() => {
                  const el = document.getElementById('early-access');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group inline-flex items-center gap-1.5 text-xs font-sans font-bold text-white hover:text-brand-orange transition-colors cursor-pointer"
              >
                <span>Join Tier 2 Waitlist</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>

          {/* Card 2: Lead Subscription (SELF-SERVE) */}
          <motion.div
            animate={{
              borderColor: selectedProfile === 'established' ? '#FF5500' : 'rgba(18, 18, 18, 0.1)',
              scale: selectedProfile === 'established' ? 1.01 : 1,
            }}
            transition={{ duration: 0.3 }}
            className={`border-2 p-8 flex flex-col justify-between relative shadow-none h-full bg-editorial-sand text-editorial-dark rounded-2xl`}
          >
            {/* Top-right Tag */}
            <div className="text-center mb-4 md:absolute top-8 right-8 md:text-right">
              <span className="bg-emerald-50 text-emerald-800 font-mono text-[9px] font-bold tracking-[0.15em] px-3 py-1 uppercase rounded-2xl   border border-emerald-200 block mb-1">
                LIVE AT LAUNCH
              </span>
              <span className="text-[8px] font-mono text-editorial-dark/40 tracking-wider font-bold">TIER 1 ACTIVE</span>
            </div>

            <div className="space-y-6">
              <div className="space-y-1">
                <span className="font-mono text-[9px] text-brand-orange font-bold uppercase tracking-[0.2em] block">
                  MODEL 02 (PRIMARY)
                </span>
                <h3 className="font-sans font-bold text-2xl sm:text-3xl tracking-tight text-editorial-dark">
                  Lead Subscription
                </h3>
                <span className="font-mono text-xs text-brand-orange font-bold tracking-wide block pt-1">
                  Flat monthly subscription • Available Now
                </span>
              </div>

              <p className="font-sans text-editorial-dark/70 text-xs sm:text-sm leading-relaxed">
                For mature manufacturers who already have dedicated internal export operations and custom brokers, but need qualified direct buyer introductions.
              </p>

              <div className="border-t border-editorial-dark/10 my-6" />

              <span className="font-mono text-[9px] text-editorial-dark/40 font-bold uppercase tracking-wider block">
                WHAT IS INCLUDED IN MEMBERSHIP
              </span>
              <ul className="space-y-3">
                {[
                  'Featured placement in our Verified Gujarat Manufacturer Directory.',
                  'Direct messaging channels to registered, verified global buyers.',
                  'Complete access to our self-serve logistics and duty calculators.',
                  'Real-time tender and request-for-quote feeds categorized by HS code.'
                ].map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-editorial-dark/5 border border-editorial-dark/15 flex items-center justify-center text-editorial-dark flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3" />
                    </div>
                    <span className="font-sans text-xs text-editorial-dark/80 leading-normal">{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-8 mt-6 border-t border-editorial-dark/10 flex justify-between items-center">
              <span className="font-mono text-[9px] text-editorial-dark/50 font-bold tracking-[0.1em]">BEST FOR HIGH-VOLUME RUNS</span>
              <button 
                type="button"
                onClick={() => {
                  const el = document.getElementById('early-access');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group inline-flex items-center gap-1.5 text-xs font-sans font-bold text-editorial-dark hover:text-brand-orange transition-colors cursor-pointer"
              >
                <span>Subscribe Now (Live)</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
