import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, AlertCircle, ArrowRight, Github, Mail, Phone, MapPin, Loader2, Linkedin } from 'lucide-react';
import { Lead, LeadType } from '../types';
import { LogoKLight } from './LogoK';

interface FooterProps {
  onAddLead: (lead: Omit<Lead, 'id' | 'timestamp' | 'status'>) => void;
}

const COUNTRY_CODES = [
  { code: '+91', country: 'IN', flag: '🇮🇳' },
  { code: '+1', country: 'US', flag: '🇺🇸' },
  { code: '+44', country: 'GB', flag: '🇬🇧' },
  { code: '+971', country: 'AE', flag: '🇦🇪' },
  { code: '+86', country: 'CN', flag: '🇨🇳' },
  { code: '+880', country: 'BD', flag: '🇧🇩' },
  { code: '+84', country: 'VN', flag: '🇻🇳' },
  { code: '+49', country: 'DE', flag: '🇩🇪' },
  // Additional comprehensive trading/global nations
  { code: '+20', country: 'EG', flag: '🇪🇬' },
  { code: '+27', country: 'ZA', flag: '🇿🇦' },
  { code: '+30', country: 'GR', flag: '🇬🇷' },
  { code: '+31', country: 'NL', flag: '🇳🇱' },
  { code: '+32', country: 'BE', flag: '🇧🇪' },
  { code: '+33', country: 'FR', flag: '🇫🇷' },
  { code: '+34', country: 'ES', flag: '🇪🇸' },
  { code: '+36', country: 'HU', flag: '🇭🇺' },
  { code: '+39', country: 'IT', flag: '🇮🇹' },
  { code: '+40', country: 'RO', flag: '🇷🇴' },
  { code: '+41', country: 'CH', flag: '🇨🇭' },
  { code: '+43', country: 'AT', flag: '🇦🇹' },
  { code: '+45', country: 'DK', flag: '🇩🇰' },
  { code: '+46', country: 'SE', flag: '🇸🇪' },
  { code: '+47', country: 'NO', flag: '🇳🇴' },
  { code: '+48', country: 'PL', flag: '🇵🇱' },
  { code: '+51', country: 'PE', flag: '🇵🇪' },
  { code: '+52', country: 'MX', flag: '🇲🇽' },
  { code: '+54', country: 'AR', flag: '🇦🇷' },
  { code: '+55', country: 'BR', flag: '🇧🇷' },
  { code: '+56', country: 'CL', flag: '🇨🇱' },
  { code: '+57', country: 'CO', flag: '🇨🇴' },
  { code: '+58', country: 'VE', flag: '🇻🇪' },
  { code: '+60', country: 'MY', flag: '🇲🇾' },
  { code: '+61', country: 'AU', flag: '🇦🇺' },
  { code: '+62', country: 'ID', flag: '🇮🇩' },
  { code: '+63', country: 'PH', flag: '🇵🇭' },
  { code: '+64', country: 'NZ', flag: '🇳🇿' },
  { code: '+65', country: 'SG', flag: '🇸🇬' },
  { code: '+66', country: 'TH', flag: '🇹🇭' },
  { code: '+7', country: 'RU', flag: '🇷🇺' },
  { code: '+81', country: 'JP', flag: '🇯🇵' },
  { code: '+82', country: 'KR', flag: '🇰🇷' },
  { code: '+852', country: 'HK', flag: '🇭🇰' },
  { code: '+855', country: 'KH', flag: '🇰🇭' },
  { code: '+856', country: 'LA', flag: '🇱🇦' },
  { code: '+886', country: 'TW', flag: '🇹🇼' },
  { code: '+90', country: 'TR', flag: '🇹🇷' },
  { code: '+92', country: 'PK', flag: '🇵🇰' },
  { code: '+94', country: 'LK', flag: '🇱🇰' },
  { code: '+95', country: 'MM', flag: '🇲🇲' },
  { code: '+98', country: 'IR', flag: '🇮🇷' },
  { code: '+212', country: 'MA', flag: '🇲🇦' },
  { code: '+213', country: 'DZ', flag: '🇩🇿' },
  { code: '+233', country: 'GH', flag: '🇬🇭' },
  { code: '+234', country: 'NG', flag: '🇳🇬' },
  { code: '+251', country: 'ET', flag: '🇪🇹' },
  { code: '+254', country: 'KE', flag: '🇰🇪' },
  { code: '+255', country: 'TZ', flag: '🇹🇿' },
  { code: '+256', country: 'UG', flag: '🇺🇬' },
  { code: '+351', country: 'PT', flag: '🇵🇹' },
  { code: '+352', country: 'LU', flag: '🇱🇺' },
  { code: '+353', country: 'IE', flag: '🇮🇪' },
  { code: '+354', country: 'IS', flag: '🇮🇸' },
  { code: '+356', country: 'MT', flag: '🇲🇹' },
  { code: '+357', country: 'CY', flag: '🇨🇾' },
  { code: '+358', country: 'FI', flag: '🇫🇮' },
  { code: '+359', country: 'BG', flag: '🇧🇬' },
  { code: '+370', country: 'LT', flag: '🇱🇹' },
  { code: '+371', country: 'LV', flag: '🇱🇻' },
  { code: '+372', country: 'EE', flag: '🇪🇪' },
  { code: '+374', country: 'AM', flag: '🇦🇲' },
  { code: '+380', country: 'UA', flag: '🇺🇦' },
  { code: '+381', country: 'RS', flag: '🇷🇸' },
  { code: '+385', country: 'HR', flag: '🇭🇷' },
  { code: '+386', country: 'SI', flag: '🇸🇮' },
  { code: '+420', country: 'CZ', flag: '🇨🇿' },
  { code: '+421', country: 'SK', flag: '🇸🇰' },
  { code: '+502', country: 'GT', flag: '🇬🇹' },
  { code: '+503', country: 'SV', flag: '🇸🇻' },
  { code: '+504', country: 'HN', flag: '🇭🇳' },
  { code: '+505', country: 'NI', flag: '🇳🇮' },
  { code: '+506', country: 'CR', flag: '🇨🇷' },
  { code: '+507', country: 'PA', flag: '🇵🇦' },
  { code: '+591', country: 'BO', flag: '🇧🇴' },
  { code: '+593', country: 'EC', flag: '🇪🇨' },
  { code: '+595', country: 'PY', flag: '🇵🇾' },
  { code: '+598', country: 'UY', flag: '🇺🇾' },
  { code: '+960', country: 'MV', flag: '🇲🇻' },
  { code: '+961', country: 'LB', flag: '🇱🇧' },
  { code: '+962', country: 'JO', flag: '🇯🇴' },
  { code: '+964', country: 'IQ', flag: '🇮🇶' },
  { code: '+965', country: 'KW', flag: '🇰🇼' },
  { code: '+966', country: 'SA', flag: '🇸🇦' },
  { code: '+968', country: 'OM', flag: '🇴🇲' },
  { code: '+972', country: 'IL', flag: '🇮🇱' },
  { code: '+973', country: 'BH', flag: '🇧🇭' },
  { code: '+974', country: 'QA', flag: '🇶🇦' },
  { code: '+976', country: 'MN', flag: '🇲🇳' },
  { code: '+977', country: 'NP', flag: '🇳🇵' },
  { code: '+994', country: 'AZ', flag: '🇦🇿' },
  { code: '+995', country: 'GE', flag: '🇬🇪' },
  { code: '+998', country: 'UZ', flag: '🇺🇿' }
];

export default function Footer({ onAddLead }: FooterProps) {
  const [email, setEmail] = useState('');
  const [leadType, setLeadType] = useState<LeadType>('manufacturer');
  const [industry, setIndustry] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [mobileNumber, setMobileNumber] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (val: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(val);
  };

  const validatePhone = (val: string) => {
    const digitsOnly = val.replace(/\D/g, '');
    return digitsOnly.length >= 7 && digitsOnly.length <= 15;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!email.trim()) {
      setError('Please fill out the email field.');
      return;
    }
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!industry.trim()) {
      setError('Please enter your industry sector.');
      return;
    }
    if (!mobileNumber.trim()) {
      setError('Please enter your mobile number.');
      return;
    }
    if (!validatePhone(mobileNumber)) {
      setError('Please enter a valid mobile number (7 to 15 digits).');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    // Simulate server write latency
    setTimeout(() => {
      onAddLead({
        email: email.trim(),
        type: leadType,
        industry: industry.trim(),
        phone: `${countryCode} ${mobileNumber.trim()}`,
      });

      setIsSuccess(true);
      setIsSubmitting(false);
      setError(null);
    }, 1200);
  };

  return (
    <footer className="bg-editorial-dark text-brand-beige pt-20 pb-8 border-t border-editorial-dark/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Call to Action Box — Page 6 style */}
        <div className="bg-editorial-sand text-editorial-dark border border-gray-200 p-8 sm:p-12 rounded-2xl   grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-6 space-y-4">
            <h3 className="font-sans font-bold text-3xl sm:text-4xl text-editorial-dark tracking-tighter leading-tight">
              Ready to export <span className="text-brand-orange font-extrabold">without the guesswork</span>?
            </h3>
            <p className="font-sans text-editorial-dark/70 text-xs sm:text-sm leading-relaxed max-w-lg">
              Tell us whether you manufacture or you're sourcing from India, and get matched to verified buyers as the directory fills in.
            </p>
          </div>

          <div className="lg:col-span-6">
            <AnimatePresence mode="wait">
              {!isSuccess ? (
                <motion.div
                  key="bottom-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  {/* Small tabs */}
                  <div className="flex bg-white p-1 border border-gray-200 w-full max-w-lg rounded-2xl">
                    <button
                      type="button"
                      disabled={isSubmitting}
                      onClick={() => setLeadType('manufacturer')}
                      className={`flex-1 py-1.5 text-[9px] font-sans font-bold tracking-[0.1em] uppercase transition-colors ${
                        isSubmitting ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'
                      } ${
                        leadType === 'manufacturer' ? 'bg-editorial-dark text-white' : 'text-gray-500 hover:text-editorial-dark'
                      }`}
                    >
                      I MANUFACTURE
                    </button>
                    <button
                      type="button"
                      disabled={isSubmitting}
                      onClick={() => setLeadType('buyer')}
                      className={`flex-1 py-1.5 text-[9px] font-sans font-bold tracking-[0.1em] uppercase transition-colors ${
                        isSubmitting ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'
                      } ${
                        leadType === 'buyer' ? 'bg-editorial-dark text-white' : 'text-gray-500 hover:text-editorial-dark'
                      }`}
                    >
                      I WANT TO IMPORT
                    </button>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-3 max-w-lg">
                    <div className="space-y-1">
                      <label className="block text-[9px] font-bold text-gray-500 uppercase tracking-wider">
                        Email Address <span className="text-brand-orange">*</span>
                      </label>
                      <input
                        type="text"
                        value={email}
                        disabled={isSubmitting}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          setError(null);
                        }}
                        placeholder="you@company.com"
                        className={`w-full border px-4 py-2.5 text-xs font-sans text-editorial-dark rounded-2xl   focus:outline-none focus:ring-1 focus:ring-brand-orange focus:border-brand-orange transition-all placeholder:text-gray-400 ${
                          isSubmitting ? 'bg-gray-150 text-gray-400 cursor-not-allowed border-gray-100' : 'bg-white border-gray-200'
                        } ${
                          error && (!email.trim() || !validateEmail(email)) ? 'border-brand-orange ring-1 ring-brand-orange/30' : ''
                        }`}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="block text-[9px] font-bold text-gray-500 uppercase tracking-wider">
                          Industry <span className="text-brand-orange">*</span>
                        </label>
                        <input
                          type="text"
                          value={industry}
                          disabled={isSubmitting}
                          onChange={(e) => {
                            setIndustry(e.target.value);
                            setError(null);
                          }}
                          placeholder="e.g. Textiles, Ceramics, Auto Components"
                          className={`w-full border px-4 py-2.5 text-xs font-sans text-editorial-dark rounded-2xl   focus:outline-none focus:ring-1 border-gray-200 focus:ring-brand-orange focus:border-brand-orange transition-all placeholder:text-gray-400 ${
                            isSubmitting ? 'bg-gray-150 text-gray-400 cursor-not-allowed border-gray-100' : 'bg-white'
                          } ${
                            error && !industry.trim() ? 'border-brand-orange ring-1 ring-brand-orange/30' : ''
                          }`}
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="block text-[9px] font-bold text-gray-500 uppercase tracking-wider">
                          Mobile Number <span className="text-brand-orange">*</span>
                        </label>
                        <div className={`flex items-stretch border rounded-2xl   focus-within:ring-1 transition-all ${
                          isSubmitting ? 'bg-gray-150 border-gray-100' : 'bg-white border-gray-200 focus-within:ring-brand-orange focus-within:border-brand-orange'
                        } ${
                          error && (!mobileNumber.trim() || !validatePhone(mobileNumber)) ? 'border-brand-orange ring-1 ring-brand-orange/30' : ''
                        }`}>
                          <select
                            value={countryCode}
                            disabled={isSubmitting}
                            onChange={(e) => setCountryCode(e.target.value)}
                            className="w-[80px] flex-shrink-0 bg-gray-50 border-r border-gray-200 pl-3 pr-5 py-2.5 text-xs font-sans text-editorial-dark focus:outline-none cursor-pointer rounded-2xl   appearance-none"
                            style={{
                              backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236B7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3E%3C/svg%3E")`,
                              backgroundPosition: 'right 6px center',
                              backgroundSize: '1rem 1rem',
                              backgroundRepeat: 'no-repeat'
                            }}
                          >
                            {COUNTRY_CODES.map((item) => (
                              <option key={`${item.country}-${item.code}`} value={item.code}>
                                {item.flag} {item.code}
                              </option>
                            ))}
                          </select>
                          <input
                            type="tel"
                            value={mobileNumber}
                            disabled={isSubmitting}
                            onChange={(e) => {
                              setMobileNumber(e.target.value);
                              setError(null);
                            }}
                            placeholder="Phone"
                            className="w-full min-w-0 flex-1 bg-transparent px-4 py-2.5 text-xs font-sans text-editorial-dark focus:outline-none placeholder:text-gray-400"
                          />
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full bg-brand-orange text-white font-sans text-[10px] font-bold tracking-[0.15em] py-3 hover:bg-editorial-dark hover:text-white transition-colors rounded-2xl   flex items-center justify-center gap-1.5 uppercase ${
                        isSubmitting ? 'opacity-80 cursor-not-allowed' : 'cursor-pointer'
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>PROCESSING ACCESS...</span>
                        </>
                      ) : (
                        <>
                          <span>REQUEST ACCESS</span>
                          <ArrowRight className="w-3 h-3" />
                        </>
                      )}
                    </button>

                    {/* Validation error popup */}
                    <AnimatePresence>
                      {error && (
                        <motion.div
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 5 }}
                          className="flex items-center gap-1 bg-brand-orange text-white text-[10px] px-2.5 py-1.5 shadow-md border border-brand-orange/20"
                        >
                          <AlertCircle className="w-3 h-3 flex-shrink-0" />
                          <span>{error}</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </form>
                  <span className="font-sans text-[10px] text-gray-400 block pt-1">
                    No spam, no reselling your data.
                  </span>
                </motion.div>
              ) : (
                <motion.div
                  key="bottom-success"
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.15,
                        delayChildren: 0.1,
                      },
                    },
                  }}
                  className="bg-white border border-emerald-200 text-emerald-800 p-6 flex items-center gap-4 max-w-lg shadow-md"
                >
                  <motion.div
                    variants={{
                      hidden: { scale: 0, opacity: 0 },
                      visible: { scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 300, damping: 18 } },
                    }}
                  >
                    <CheckCircle className="w-8 h-8 text-emerald-600 flex-shrink-0" />
                  </motion.div>
                  <motion.div
                    variants={{
                      hidden: { x: 15, opacity: 0 },
                      visible: { x: 0, opacity: 1, transition: { ease: 'easeOut', duration: 0.4 } },
                    }}
                    className="space-y-0.5"
                  >
                    <h4 className="font-sans font-bold text-sm text-editorial-dark">Successfully Registered!</h4>
                    <p className="font-sans text-xs text-editorial-dark/70">Your registration has been logged on the KaroTradz roster.</p>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

        {/* Directory/Footer Map Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-xs font-sans text-brand-beige/65">
          <div className="space-y-4">
            <span className="font-mono text-[12px] text-brand-beige font-bold tracking-[0.15em] block uppercase">SECTORS</span>
            <ul className="space-y-2">
              <li><span className="hover:text-brand-orange cursor-pointer transition-colors">Cotton Textiles & Fabric</span></li>
              <li><span className="hover:text-brand-orange cursor-pointer transition-colors">Precision Brass Fittings</span></li>
              <li><span className="hover:text-brand-orange cursor-pointer transition-colors">Morbi Porcelain Slabs</span></li>
              <li><span className="hover:text-brand-orange cursor-pointer transition-colors">Agricultural Commodities</span></li>
            </ul>
          </div>

          <div className="space-y-4">
            <span className="font-mono text-[12px] text-brand-beige font-bold tracking-[0.15em] block uppercase">TRADE CORRIDORS</span>
            <ul className="space-y-2">
              <li><span className="hover:text-brand-orange cursor-pointer transition-colors">Gujarat to Dubai (UAE)</span></li>
              <li><span className="hover:text-brand-orange cursor-pointer transition-colors">Gujarat to Rotterdam (NL)</span></li>
              <li><span className="hover:text-brand-orange cursor-pointer transition-colors">Gujarat to New York (US)</span></li>
              <li><span className="hover:text-brand-orange cursor-pointer transition-colors">Gujarat to Sydney (AU)</span></li>
            </ul>
          </div>

          <div className="space-y-4">
            <span className="font-mono text-[12px] text-brand-beige font-bold tracking-[0.15em] block uppercase">RESOURCES</span>
            <ul className="space-y-2">
              <li><span className="hover:text-brand-orange cursor-pointer transition-colors">Landed Cost Simulator</span></li>
              <li><span className="hover:text-brand-orange cursor-pointer transition-colors">Taxes & Tariffs Directory</span></li>
              <li><span className="hover:text-brand-orange cursor-pointer transition-colors">Gujarat Industry Index</span></li>
            </ul>
          </div>

          <div className="space-y-4">
            <span className="font-mono text-[12px] text-brand-beige font-bold tracking-[0.15em] block uppercase">CONTACT INTEL</span>
            <ul className="space-y-2.5">
              <li className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-brand-orange" /> <span>Ahmedabad, Gujarat, India</span></li>
              <li className="flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-brand-orange" /> <a href="mailto:info@karotradz.com" className="hover:text-brand-orange transition-colors">info@karotradz.com</a></li>
              <li className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-brand-orange" /> <a href="tel:+919638296899" className="hover:text-brand-orange transition-colors">+91 96382 96899</a></li>
              <li className="flex items-center gap-2"><Linkedin className="w-3.5 h-3.5 text-brand-orange" /> <a href="https://www.linkedin.com/company/karotradz" target="_blank" rel="noopener noreferrer" className="hover:text-brand-orange transition-colors">LinkedIn</a></li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-brand-beige/10 mb-8" />

        {/* Brand Bar — Exactly matches Page 6 bottom reference */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center text-brand-orange">
              <LogoKLight className="h-8" />
            </div>
           
          </div>

          <span className="font-mono text-[9px] sm:text-[10px] text-brand-beige/40 tracking-[0.15em] font-bold uppercase">
            GUJARAT, INDIA · GLOBAL TRADE, VERIFIED.
          </span>

          <span className="font-mono text-[12px] text-brand-beige/30">
            © {new Date().getFullYear()} KaroTradz. All rights reserved.
          </span>
        </div>

      </div>
    </footer>
  );
}
