import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Calculator, Ship, ArrowRight, ShieldCheck, FileCheck, Truck } from 'lucide-react';

interface TimelineStep {
  num: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  problem: string;
  solution: string;
  details: string[];
}

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps: TimelineStep[] = [
    {
      num: '01',
      label: 'VERIFY',
      icon: Search,
      title: 'Document-Based Verification',
      problem: 'Unverified directories and fraudulent claims make international supplier search risky.',
      solution: 'KaroTradz performs rigorous, document-based verification for every manufacturer and buyer on the platform.',
      details: [
        'Verification of active business registration (GST, PAN, and Aadhaar card checks).',
        'Authentication of import-export credentials (IEC, trade licenses, and custom clearance history).',
        'Validation of product standards and manufacturer certifications (GOTS, ISO, CE) via official registries.',
        'Verified manufacturers. Verified products. Displaying only fully compliant suppliers.'
      ]
    },
    {
      num: '02',
      label: 'CALCULATE',
      icon: Calculator,
      title: 'True Landed Cost Calculations',
      problem: 'FOB factory quotes hide enormous costs in ocean freight, customs duties, port handling, and inland transport.',
      solution: 'Instantly calculate your true delivered cost to any destination port or warehouse.',
      details: [
        'Real-time port-to-port and inland distance freight calculations.',
        'Dynamic duties and local tariff estimates according to HS Codes.',
        'Port handling, documentation, and local transport pricing built-in.',
        'Unified multi-currency conversions for simple direct comparisons.'
      ]
    },
    {
      num: '03',
      label: 'EXPORT',
      icon: Ship,
      title: 'Seamless End-to-End Execution (Roadmap)',
      problem: 'Filing complex international trade documentation and organizing ocean logistics is incredibly painful.',
      solution: 'Our upcoming Full-Service agency tier (Tier 2 Roadmap) is designed to manage the physical and bureaucratic pipeline.',
      details: [
        'Comprehensive documentation filing: bills of lading, certificates of origin (Upcoming Tier 2).',
        'Customs clearance in India and destination countries (Upcoming Tier 2).',
        'Last-mile inland delivery coordinates from ports to warehouse (Upcoming Tier 2).',
        'Assisted progress milestones and verified shipping updates.'
      ]
    }
  ];

  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-white border-y border-gray-100">
      {/* Dynamic crawling dashed line styles */}
      <style>{`
        @keyframes march {
          from {
            stroke-dashoffset: 0;
          }
          to {
            stroke-dashoffset: -14;
          }
        }
        .animate-march {
          animation: march 0.6s linear infinite;
        }
      `}</style>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="space-y-4 max-w-3xl mb-16">
          <span className="font-sans text-[10px] font-bold text-brand-orange uppercase tracking-[0.2em] block">
            Why KaroTradz?
          </span>
          <h2 className="font-sans font-bold text-3xl sm:text-4xl lg:text-5xl text-editorial-dark tracking-tighter leading-tight">
            Export should not require <span className="text-brand-orange font-extrabold">guesswork</span> or a trusted uncle in the trade.
          </h2>
          <p className="font-sans text-editorial-dark/70 text-sm sm:text-base max-w-2xl">
            International procurement from India has traditionally been complex, opaque, and highly reliant on intermediaries. KaroTradz digitizes and simplifies the entire flow.
          </p>
        </div>

        {/* Interactive Indicator Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-gray-100 pb-3 mb-8 gap-2">
          <span className="font-sans text-[10px] font-bold text-gray-500 uppercase tracking-[0.15em] flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-orange animate-pulse" />
            OPERATIONAL PIPELINE TRACKER
          </span>
          <span className="font-sans text-[10px] text-brand-orange font-bold uppercase tracking-[0.12em]">
            Interactive — Click each step below to explore details
          </span>
        </div>

        {/* Timeline Horizontal Line / Selector Row */}
        <div className="relative mb-12 sm:mb-16">
          {/* Connector Line Background & Active Animated Dashed Line */}
          <div className="absolute top-[32px] left-[16%] right-[16%] h-[4px] z-0 hidden md:block">
            <svg className="absolute inset-0 w-full h-full overflow-visible" fill="none">
              {/* Gray background dashed line */}
              <line 
                x1="0" 
                y1="2" 
                x2="100%" 
                y2="2" 
                stroke="#E5E7EB" 
                strokeWidth="2" 
                strokeDasharray="8 6" 
              />
              {/* Active Orange crawling animated dashed line with smooth width transition */}
              <motion.line 
                x1="0" 
                y1="2" 
                animate={{ 
                  x2: `${(activeStep / (steps.length - 1)) * 100}%`
                }}
                transition={{ 
                  duration: 0.4, 
                  ease: 'easeInOut' 
                }}
                stroke="#FF5500" 
                strokeWidth="2" 
                strokeDasharray="8 6"
                className="animate-march"
              />
            </svg>
          </div>

          {/* Timeline Nodes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 relative z-10">
            {steps.map((step, idx) => {
              const IconComponent = step.icon;
              const isActive = activeStep === idx;
              
              return (
                <button
                  key={step.num}
                  onClick={() => setActiveStep(idx)}
                  className="flex flex-col items-center group focus:outline-none text-center md:text-left cursor-pointer"
                >
                  {/* Circle indicator */}
                  <div className="flex items-center justify-center mb-4 md:mb-6">
                    <motion.div
                      animate={{
                        scale: isActive ? 1.1 : 1,
                        backgroundColor: isActive ? '#FF5500' : '#FFFFFF',
                        borderColor: isActive ? '#FF5500' : '#111111'
                      }}
                      transition={{ duration: 0.2 }}
                      className="w-16 h-16 rounded-full border flex items-center justify-center text-editorial-dark/40 shadow-none relative group-hover:border-brand-orange bg-transparent"
                    >
                      <IconComponent className={`w-5 h-5 transition-colors duration-200 ${isActive ? 'text-white' : 'text-editorial-dark/50 group-hover:text-brand-orange'}`} />
                      
                      {/* Decorative outer pulse for active node */}
                      {isActive && (
                        <span className="absolute inset-0 rounded-full border border-brand-orange/20 animate-ping" />
                      )}
                    </motion.div>
                  </div>

                  {/* Labels */}
                  <span className="font-sans text-[10px] font-bold text-gray-400 tracking-[0.2em] block uppercase mb-1">
                    {step.num} — {step.label}
                  </span>
                  <span className={`font-sans font-bold text-xs tracking-[0.15em] uppercase transition-colors ${isActive ? 'text-brand-orange' : 'text-editorial-dark/50 group-hover:text-editorial-dark'}`}>
                    {step.label}
                  </span>

                  {/* Interactive status badge */}
                  <span className={`font-sans text-[8px] font-bold tracking-[0.1em] uppercase mt-2 px-2 py-0.5 border rounded-2xl   transition-all duration-200 ${
                    isActive 
                      ? 'bg-brand-orange/10 border-brand-orange/30 text-brand-orange font-bold' 
                      : 'border-gray-200 text-gray-400 group-hover:border-brand-orange/30 group-hover:text-brand-orange'
                  }`}>
                    {isActive ? 'Active' : 'Click to View'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Detail Card with AnimatePresence */}
        <div className="bg-editorial-sand border border-gray-200 rounded-2xl   shadow-none p-6 sm:p-10 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >
              {/* Left description column */}
              <div className="lg:col-span-6 space-y-6">
                <div>
                  <span className="font-sans text-brand-orange font-bold text-[10px] tracking-[0.2em] uppercase block mb-1">
                    STEP {steps[activeStep].num} — {steps[activeStep].label}
                  </span>
                  <h3 className="font-sans font-bold text-2xl sm:text-3xl text-editorial-dark tracking-tight leading-none">
                    {steps[activeStep].title}
                  </h3>
                </div>

                <div className="space-y-4">
                  <div className="border-l border-brand-orange pl-4">
                    <h4 className="font-sans text-[9px] font-bold text-brand-orange uppercase tracking-[0.2em] mb-1">THE HEADWIND</h4>
                    <p className="font-sans text-xs sm:text-sm text-editorial-dark/70 leading-normal">
                      {steps[activeStep].problem}
                    </p>
                  </div>

                  <div className="border-l border-editorial-dark pl-4">
                    <h4 className="font-sans text-[9px] font-bold text-editorial-dark uppercase tracking-[0.2em] mb-1">OUR SOLUTION</h4>
                    <p className="font-sans text-xs sm:text-sm text-editorial-dark font-semibold leading-normal">
                      {steps[activeStep].solution}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right list column */}
              <div className="lg:col-span-6 bg-white p-6 border border-gray-200 rounded-2xl   h-full flex flex-col justify-between">
                <span className="font-sans text-[9px] font-bold text-gray-400 uppercase tracking-[0.2em] block mb-4">
                  OPERATIONAL CHECKPOINTS
                </span>
                <ul className="space-y-3">
                  {steps[activeStep].details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-brand-orange/5 border border-brand-orange/20 flex items-center justify-center text-brand-orange flex-shrink-0 mt-0.5">
                        <ArrowRight className="w-3 h-3" />
                      </div>
                      <span className="font-sans text-xs sm:text-sm text-editorial-dark/85 leading-normal">
                        {detail}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center text-[9px] font-sans font-semibold text-gray-300">
                  <span>SYSTEM ONLINE</span>
                  <span>100% TRANS-BORDER</span>
                </div>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
