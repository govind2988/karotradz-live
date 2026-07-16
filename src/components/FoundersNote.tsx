import React from 'react';
import { ShieldCheck, Mail } from 'lucide-react';

export default function FoundersNote() {
  return (
    <section className="py-16 md:py-20 border-b border-gray-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-gray-50 border border-gray-200 p-8 md:p-12 space-y-6 relative overflow-hidden shadow-sm rounded-4xl">
          {/* Subtle top indicator */}
          <div className="flex items-center gap-2 text-brand-orange text-[10px] font-sans font-bold uppercase tracking-[0.2em]">
            <ShieldCheck className="w-4 h-4 text-brand-orange" />
            <span>Operational Integrity Disclosure</span>
          </div>

          <div className="space-y-4">
            <h3 className="font-sans font-bold text-2xl md:text-3xl text-editorial-dark tracking-tight">
              A Note on Our Pre-Launch Status
            </h3>
            
            <div className="font-sans text-sm md:text-base leading-relaxed text-editorial-dark/80 space-y-4 font-normal">
              <p>
                <b>Dear Trade Partner,</b>
              </p>
              <p>
                We started KaroTradz with a single, firm conviction: that Indian manufacturers deserve direct, friction-free access to the global market, and international buyers deserve absolute cost transparency. 
              </p>
              <p>
                As we build towards our official launch, we believe that true trust begins with complete honesty. <strong>KaroTradz is currently in pre-launch.</strong> We do not have live transactions, active ocean freight bookings, or registered operational factories on our platform yet. 
              </p>
              <p>
                What you see today is our MVP (Minimum Viable Product): a functional <strong>Landed Cost Engine</strong> configured for Gujarat trade corridors, our <strong>document-based verification protocol</strong> (GST, PAN, Aadhaar check), and our self-serve lead subscription models. Everything shown here is a precise simulation of what is coming.
              </p>
              <p>
                We are actively onboarding our first cohort of pioneering manufacturers across Gujarat (focusing on <em>Textiles</em>, <em>Ceramics</em>, and <em>Auto Components</em>) and importing partners in the UAE/GCC, UK, USA, Australia, and Germany. 
              </p>
              <p>
                If you believe in transparent, secure, middleman-free trade, we invite you to register for early access. Let's build the future of global export, honestly.
              </p>
            </div>
          </div>

          {/* Signature Block */}
          <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            
            <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-black text-sm">KV</div>

            <div>
               <span className="font-sans font-extrabold text-editorial-dark text-base tracking-tight block">Kishan Vaghani</span>
                <span className="font-sans text-[11px] font-medium text-gray-400 tracking-wider block">FOUNDER & CEO, <span className="font-mono text-[10px] text-gray-500">Ahmedabad, Gujarat</span></span>
                
            </div>
            </div>
            
            <div>
              <a
                href="mailto:kishan.vaghani@karotradz.com" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 border border-gray-400 hover:border-brand-orange text-xs font-sans font-bold uppercase tracking-wider text-editorial-dark hover:text-brand-orange transition-colors bg-gray-50/50 rounded-4xl"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Contact Founder</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
