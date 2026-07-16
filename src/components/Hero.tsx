import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, AlertCircle, CheckCircle, Ticket, Building, Compass, Loader2 } from 'lucide-react';
import { Lead, LeadType } from '../types';

interface HeroProps {
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

export default function Hero({ onAddLead }: HeroProps) {
  const [leadType, setLeadType] = useState<LeadType>('manufacturer');
  const [email, setEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [city, setCity] = useState('');
  const [industry, setIndustry] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [mobileNumber, setMobileNumber] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ticketNo, setTicketNo] = useState('');
  const [customField, setCustomField] = useState('');

  const handleTypeChange = (type: LeadType) => {
    setLeadType(type);
    setError(null);
  };

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
    if (!companyName.trim()) {
      setError(leadType === 'manufacturer' ? 'Please enter your factory or company name.' : 'Please enter your sourcing company name.');
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

    // Simulate database write/network latency for excellent user feedback
    setTimeout(() => {
      // Call callback to store in localState/localStorage
      onAddLead({
        email: email.trim(),
        type: leadType,
        companyName: companyName.trim() || undefined,
        city: city.trim() || undefined,
        industry: industry.trim(),
        phone: `${countryCode} ${mobileNumber.trim()}`,
      });

      // Generate random Ticket Number e.g. KT-GUJ-9204
      const rand = Math.floor(1000 + Math.random() * 9000);
      setTicketNo(`KT-${leadType === 'manufacturer' ? 'MFG' : 'BYR'}-${rand}`);
      setIsSubmitted(true);
      setIsSubmitting(false);
      setError(null);
    }, 1200);
  };

  const handleReset = () => {
    setEmail('');
    setCompanyName('');
    setCity('');
    setIndustry('');
    setCustomField('');
    setCountryCode('+91');
    setMobileNumber('');
    setIsSubmitted(false);
    setError(null);
  };

  return (
    <section id="early-access" className="pt-28 pb-20 md:pt-36 md:pb-28 bg-white overflow-hidden border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          
          {/* Left Column - Headline Content */}
          <div className="lg:col-span-6 space-y-8">
            {/* Status indicator with green dot */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 bg-gray-50/40 backdrop-blur-md border border-gray-300 rounded-full shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05),0_1px_2px_rgba(0,0,0,0.02)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]"></span>
              </span>
              <span className="font-sans text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.18em] text-editorial-dark/85">
                EMPOWERING MSMEs TO TRADE GLOBALLY
              </span>
            </div>

            {/* Core Punchy Headings - Non-italic, bold sans-serif */}
            <h1 className="font-sans font-extrabold text-6xl sm:text-7xl lg:text-8xl text-editorial-dark tracking-tighter leading-[1.0] flex flex-col select-none">
              <motion.span
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-editorial-dark hover:translate-x-1 transition-transform duration-300"
              >
                Verify.
              </motion.span>
              <motion.span
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-editorial-dark hover:translate-x-1 transition-transform duration-300"
              >
                Calculate.
              </motion.span>
              <motion.span
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-editorial-dark hover:translate-x-1 transition-transform duration-300"
              >
                Export.
              </motion.span>
            </h1>

            {/* Paragraph Text - Sans-serif, no border, gray/charcoal */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-gray-600 text-lg sm:text-xl font-sans font-normal leading-relaxed max-w-xl"
            >
              KaroTradz connects verified Indian manufacturers with verified global buyers, and shows the true delivered cost before either side commits.
            </motion.p>

            {/* Secondary Explanatory Paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-gray-400 text-xs sm:text-sm font-sans leading-relaxed max-w-xl"
            >
              No more guessing at freight, duties, and port fees after the invoice lands. No more unverified middlemen taking a cut with no accountability.
            </motion.p>
          </div>

          {/* Right Column - Interactive Form Box */}
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-editorial-sand border border-gray-200 p-6 sm:p-8 rounded-4xl shadow-none relative overflow-hidden"
            >
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.div
                    key="form-view"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    <div className="space-y-1">
                      <span className="font-sans text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] block">
                        EARLY ACCESS
                      </span>
                      <h2 className="font-sans font-bold text-xl sm:text-2xl text-editorial-dark tracking-tight leading-snug">
                        We're onboarding the first manufacturers and buyers now.
                      </h2>
                    </div>

                    {/* Animated Selector Slider Tabs */}
                    <div className="bg-gray-200/50 p-1 flex relative rounded-4xl w-full border border-gray-200/80">
                      <div className="grid grid-cols-2 w-full relative z-10">
                        <button
                          type="button"
                          disabled={isSubmitting}
                          onClick={() => handleTypeChange('manufacturer')}
                          className={`py-2.5 text-[9px] sm:text-[10px] font-bold tracking-[0.15em] uppercase rounded-4xl  transition-colors duration-300 text-center ${
                            isSubmitting ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'
                          } ${
                            leadType === 'manufacturer' ? 'text-white' : 'text-gray-500 hover:text-editorial-dark'
                          }`}
                        >
                          I MANUFACTURE
                        </button>
                        <button
                          type="button"
                          disabled={isSubmitting}
                          onClick={() => handleTypeChange('buyer')}
                          className={`py-2.5 text-[9px] sm:text-[10px] font-bold tracking-[0.15em] uppercase transition-colors duration-300 text-center ${
                            isSubmitting ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'
                          } ${
                            leadType === 'buyer' ? 'text-white' : 'text-gray-500 hover:text-editorial-dark'
                          }`}
                        >
                          I WANT TO IMPORT
                        </button>
                      </div>

                      {/* Sliding background */}
                      <motion.div
                        className="absolute top-1 bottom-1 left-1 bg-editorial-dark rounded-2xl   z-0"
                        layoutId="activeTabBg"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        style={{
                          width: 'calc(50% - 4px)',
                          left: leadType === 'manufacturer' ? '4px' : 'calc(50%)',
                        }}
                      />
                    </div>

                    {/* Form Fields - Role-Segmented Layout */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-3">
                        {/* Row 1: Email Address */}
                        <div className="space-y-1">
                          <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider">
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
                            className={`w-full border px-4 py-3 text-sm font-sans text-editorial-dark rounded-2xl   focus:outline-none focus:ring-1 transition-all placeholder:text-gray-400 ${
                              isSubmitting ? 'bg-gray-50 text-gray-400 cursor-not-allowed border-gray-100' : 'bg-white border-gray-200 focus:ring-brand-orange focus:border-brand-orange'
                            } ${
                              error && (!email.trim() || !validateEmail(email))
                                ? 'border-brand-orange ring-1 ring-brand-orange/35' 
                                : ''
                            }`}
                          />
                        </div>

                        {/* Row 2: Company Name (Role-Specific) */}
                        {leadType === 'manufacturer' ? (
                          <div className="space-y-1">
                            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                              Factory / Company Name <span className="text-brand-orange">*</span>
                            </label>
                            <input
                              type="text"
                              value={companyName}
                              disabled={isSubmitting}
                              onChange={(e) => {
                                setCompanyName(e.target.value);
                                setError(null);
                              }}
                              placeholder="e.g. Gujarat Loomcraft Ltd."
                              className={`w-full border px-4 py-3 text-sm font-sans text-editorial-dark rounded-2xl   focus:outline-none focus:ring-1 transition-all placeholder:text-gray-400 ${
                                isSubmitting ? 'bg-gray-50 text-gray-400 cursor-not-allowed border-gray-100' : 'bg-white border-gray-200 focus:ring-brand-orange focus:border-brand-orange'
                              } ${
                                error && !companyName.trim() ? 'border-brand-orange ring-1 ring-brand-orange/35' : ''
                              }`}
                            />
                          </div>
                        ) : (
                          <div className="space-y-1">
                            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                              Sourcing Company Name <span className="text-brand-orange">*</span>
                            </label>
                            <input
                              type="text"
                              value={companyName}
                              disabled={isSubmitting}
                              onChange={(e) => {
                                setCompanyName(e.target.value);
                                setError(null);
                              }}
                              placeholder="e.g. Dubai Trade Corp"
                              className={`w-full border px-4 py-3 text-sm font-sans text-editorial-dark rounded-2xl   focus:outline-none focus:ring-1 transition-all placeholder:text-gray-400 ${
                                isSubmitting ? 'bg-gray-50 text-gray-400 cursor-not-allowed border-gray-100' : 'bg-white border-gray-200 focus:ring-brand-orange focus:border-brand-orange'
                              } ${
                                error && !companyName.trim() ? 'border-brand-orange ring-1 ring-brand-orange/35' : ''
                              }`}
                            />
                          </div>
                        )}

                        {/* Row 3: Industry & Mobile Number merged horizontally side-by-side for BOTH roles */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {/* Industry Sector */}
                          <div className="space-y-1">
                            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                              Industry Sector <span className="text-brand-orange">*</span>
                            </label>
                            <input
                              type="text"
                              value={industry}
                              disabled={isSubmitting}
                              onChange={(e) => {
                                setIndustry(e.target.value);
                                setError(null);
                              }}
                              placeholder="e.g. Textiles, Ceramics"
                              className={`w-full border px-4 py-3 text-sm font-sans text-editorial-dark rounded-2xl   focus:outline-none focus:ring-1 transition-all placeholder:text-gray-400 ${
                                isSubmitting ? 'bg-gray-50 text-gray-400 cursor-not-allowed border-gray-100' : 'bg-white border-gray-200 focus:ring-brand-orange focus:border-brand-orange'
                              } ${
                                error && !industry.trim() ? 'border-brand-orange ring-1 ring-brand-orange/35' : ''
                              }`}
                            />
                          </div>

                          {/* Mobile Number */}
                          <div className="space-y-1">
                            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                              Mobile Number <span className="text-brand-orange">*</span>
                            </label>
                            <div className={`flex items-stretch border rounded-2xl focus-within:ring-1 transition-all ${
                              isSubmitting ? 'bg-gray-50 border-gray-100' : 'bg-white border-gray-200 focus-within:ring-brand-orange focus-within:border-brand-orange'
                            } ${
                              error && (!mobileNumber.trim() || !validatePhone(mobileNumber)) ? 'border-brand-orange ring-1 ring-brand-orange/35' : ''
                            }`}>
                              <select
                                value={countryCode}
                                disabled={isSubmitting}
                                onChange={(e) => setCountryCode(e.target.value)}
                                className="w-[80px] flex-shrink-0 bg-gray-50 border-r border-gray-200 pl-3 pr-5 py-3 text-sm font-sans text-editorial-dark focus:outline-none cursor-pointer rounded-2xl appearance-none"
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
                                className="w-full min-w-0 flex-1 bg-transparent px-4 py-3 text-sm font-sans text-editorial-dark focus:outline-none placeholder:text-gray-400"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Row 4: Optional Target Import Volume for Importers Only */}
                        {leadType === 'importer' && (
                          <div className="space-y-1">
                            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                              Target Import Volume
                            </label>
                            <input
                              type="text"
                              value={customField}
                              disabled={isSubmitting}
                              onChange={(e) => setCustomField(e.target.value)}
                              placeholder="e.g. 3 containers/month"
                              className="w-full border border-gray-200 px-4 py-3 text-sm font-sans text-editorial-dark rounded-2xl   focus:outline-none focus:ring-1 focus:ring-brand-orange focus:border-brand-orange transition-all placeholder:text-gray-400"
                            />
                          </div>
                        )}
                      </div>

                      {/* Request Early Access Button */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full bg-brand-orange text-white font-sans text-[10px] font-bold tracking-[0.15em] uppercase py-3.5 hover:bg-editorial-dark hover:text-white transition-all rounded-2xl flex items-center justify-center gap-1.5 ${
                          isSubmitting ? 'opacity-80 cursor-not-allowed' : 'cursor-pointer'
                        }`}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            <span>PROCESSING REQUEST...</span>
                          </>
                        ) : (
                          <>
                            <span>REQUEST EARLY ACCESS</span>
                            <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </button>

                      {/* Error Alert Box */}
                      <AnimatePresence>
                        {error && (
                          <motion.div
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            className="flex items-center gap-1.5 bg-brand-orange text-white text-xs px-3 py-2 border border-brand-orange/20 shadow-md"
                          >
                            <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                            <span className="font-semibold">{error}</span>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </form>

                    <p className="font-sans text-[11px] text-gray-400 text-center leading-normal pt-2">
                      No spam, no reselling your data
                    </p>
                  </motion.div>
                ) : (
                  /* Success State - Gorgeous Admission Ticket */
                  <motion.div
                    key="success-view"
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
                    className="text-center py-4 space-y-6"
                  >
                    <motion.div
                      variants={{
                        hidden: { scale: 0.6, opacity: 0 },
                        visible: { scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 260, damping: 20 } },
                      }}
                      className="flex justify-center"
                    >
                      <div className="w-16 h-16 rounded-full bg-brand-orange/5 border-4 border-brand-orange flex items-center justify-center text-brand-orange shadow-inner">
                        <CheckCircle className="w-8 h-8" />
                      </div>
                    </motion.div>

                    <motion.div
                      variants={{
                        hidden: { y: 15, opacity: 0 },
                        visible: { y: 0, opacity: 1, transition: { ease: 'easeOut', duration: 0.5 } },
                      }}
                      className="space-y-1"
                    >
                      <h3 className="font-sans font-bold text-2xl text-editorial-dark tracking-tight">
                        You are on the list!
                      </h3>
                      <p className="font-sans text-xs text-gray-500 max-w-sm mx-auto">
                        Thank you for registering. Our team is verifying early access partners sequentially.
                      </p>
                    </motion.div>

                    {/* Virtual Admission Ticket */}
                    <motion.div
                      variants={{
                        hidden: { y: 30, scale: 0.95, opacity: 0 },
                        visible: { y: 0, scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 180, damping: 22 } },
                      }}
                      className="bg-white border border-dashed border-gray-300 p-5 rounded-2xl   text-left relative overflow-hidden shadow-md"
                    >
                      {/* Background decorative watermark */}
                      <div className="absolute right-0 bottom-0 opacity-[0.02] text-brand-orange transform translate-x-4 translate-y-4">
                        <Ticket className="w-36 h-36" />
                      </div>

                      <div className="flex justify-between items-start">
                        <div>
                          <span className="font-sans text-[9px] font-bold text-brand-orange tracking-widest block uppercase">
                            OFFICIAL PASS
                          </span>
                          <span className="font-sans font-bold text-lg text-editorial-dark leading-tight">
                            Early Access Program
                          </span>
                        </div>
                        <div className="bg-editorial-dark text-white font-mono text-[9px] font-bold px-2.5 py-0.5 rounded-2xl  ">
                          {leadType.toUpperCase()}
                        </div>
                      </div>

                      <div className="border-t border-gray-100 my-4" />

                      <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-[11px] font-sans">
                        <div>
                          <span className="text-gray-400 block font-mono text-[9px] uppercase tracking-wider">EMAIL</span>
                          <span className="font-medium text-editorial-dark break-all">{email}</span>
                        </div>
                        <div>
                          <span className="text-gray-400 block font-mono text-[9px] uppercase tracking-wider">TICKET NO</span>
                          <span className="font-mono font-bold text-brand-orange text-xs">{ticketNo}</span>
                        </div>
                      </div>

                      <div className="border-t border-dashed border-gray-200 my-4" />

                      <div className="flex justify-between items-center text-[10px] font-mono text-gray-400">
                        <span>KAROTRADZ NETWORK</span>
                        <span>GUJARAT, INDIA</span>
                      </div>
                    </motion.div>

                    <motion.button
                      variants={{
                        hidden: { opacity: 0 },
                        visible: { opacity: 1, transition: { delay: 0.8 } },
                      }}
                      type="button"
                      onClick={handleReset}
                      className="font-sans text-xs font-bold text-gray-500 hover:text-brand-orange underline tracking-wider transition-colors cursor-pointer block mx-auto"
                    >
                      REGISTER ANOTHER ACCOUNT
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
