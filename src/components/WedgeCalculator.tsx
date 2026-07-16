import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calculator, 
  HelpCircle, 
  ArrowRight, 
  DollarSign, 
  Scale, 
  Ship, 
  Landmark, 
  ShieldAlert, 
  Truck, 
  Info, 
  CheckCircle2, 
  Percent, 
  AlertCircle 
} from 'lucide-react';
import { ProductCategory, CalculatorState } from '../types';
import { CALCULATOR_PRESETS, FACTORIES, DESTINATIONS, PresetDetails } from '../data';
import LogoK from './LogoK';

type IncotermType = 'EXW' | 'FOB' | 'CIF' | 'DDP';
type ShipmentModeType = 'LCL' | '20FT' | '40FT';

export default function WedgeCalculator() {
  const [activeTab, setActiveTab] = useState<ProductCategory>('textiles');
  
  // Custom states which initialize from presets but can be edited by the user
  const [quantity, setQuantity] = useState<number>(12000);
  const [unitPrice, setUnitPrice] = useState<number>(4.00);
  const [factory, setFactory] = useState<string>('Surat, Gujarat');
  const [destination, setDestination] = useState<string>('Rotterdam, NL');
  const [incoterm, setIncoterm] = useState<IncotermType>('FOB');
  const [shipmentMode, setShipmentMode] = useState<ShipmentModeType>('20FT');
  
  // Quick tooltip states
  const [hoveredCost, setHoveredCost] = useState<string | null>(null);

  // User feedback on calculations accuracy
  const [feedbackSubmitted, setFeedbackSubmitted] = useState<boolean>(false);
  const [feedbackType, setFeedbackType] = useState<'yes' | 'no' | null>(null);

  const handleTabSelect = (cat: ProductCategory) => {
    setActiveTab(cat);
    const preset = CALCULATOR_PRESETS[cat];
    setQuantity(preset.quantity);
    setUnitPrice(preset.unitPrice);
    setFactory(preset.factory);
    setDestination(preset.destination);
    setFeedbackSubmitted(false);
    setFeedbackType(null);
    
    // Set natural shipping mode defaults for volumes
    if (preset.quantity < 5000) {
      setShipmentMode('LCL');
    } else if (preset.quantity < 20000) {
      setShipmentMode('20FT');
    } else {
      setShipmentMode('40FT');
    }
  };

  // Custom event listener for external simulation triggers (e.g. from the Directory)
  useEffect(() => {
    const handlePreset = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail) {
        const cat = detail.category as ProductCategory;
        setActiveTab(cat);
        const preset = CALCULATOR_PRESETS[cat];
        setQuantity(preset.quantity);
        setUnitPrice(preset.unitPrice);
        setFactory(detail.factory || preset.factory);
        setDestination(preset.destination);
        
        if (preset.quantity < 5000) {
          setShipmentMode('LCL');
        } else if (preset.quantity < 20000) {
          setShipmentMode('20FT');
        } else {
          setShipmentMode('40FT');
        }
        
        // Auto scroll to calculator
        const el = document.getElementById('buyers');
        el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };
    window.addEventListener('simulate-preset', handlePreset);
    return () => window.removeEventListener('simulate-preset', handlePreset);
  }, []);

  // Detailed B2B Landed Cost Calculation Engine
  const calculateCostsDetail = () => {
    const preset = CALCULATOR_PRESETS[activeTab];
    const rawGoodsFob = quantity * unitPrice;
    
    // 1. Origin Inland Logistics & Port THC (Terminal Handling Charge)
    let originInlandAndThc = 1200; // Base inland
    if (incoterm === 'EXW') {
      originInlandAndThc = 280;
    } else if (shipmentMode === 'LCL') {
      originInlandAndThc = Math.max(350, Math.round(quantity * 0.05));
    } else if (shipmentMode === '40FT') {
      originInlandAndThc = 1850;
    }
    
    // 2. Ocean Freight Port-to-Port
    let baseOceanFreight = 4500;
    switch (destination) {
      case 'Rotterdam, NL': baseOceanFreight = 4500; break;
      case 'New Jersey, US': baseOceanFreight = 6800; break;
      case 'Hamburg, DE': baseOceanFreight = 4750; break;
      case 'Antwerp, BE': baseOceanFreight = 4600; break;
      case 'Los Angeles, US': baseOceanFreight = 5900; break;
      case 'Tokyo, JP': baseOceanFreight = 3100; break;
      case 'London, UK': baseOceanFreight = 4850; break;
    }
    
    let oceanFreight = baseOceanFreight;
    if (shipmentMode === 'LCL') {
      // Per item shipping cost for LCL volume
      oceanFreight = Math.max(850, Math.round(quantity * 0.16));
    } else if (shipmentMode === '40FT') {
      oceanFreight = Math.round(baseOceanFreight * 1.55);
    }
    
    // 3. Marine Cargo Transit Insurance (Standard: 0.35% of Cargo CIF Value)
    const insurance = Math.round((rawGoodsFob + oceanFreight) * 0.0035);
    
    // 4. Customs Duty & Regulatory Filing
    const customBrokerFilingFee = 350;
    const categoryDutyPercentage = preset.dutyRate; // textiles=8, auto_components=4.5, giftware=12
    const baseForDuty = rawGoodsFob + oceanFreight + insurance;
    const customsDuty = Math.round(baseForDuty * (categoryDutyPercentage / 100)) + customBrokerFilingFee;
    
    // 5. Destination Clearance, Port THC & Local Door Delivery
    let destinationDelivery = 1400;
    if (shipmentMode === 'LCL') {
      destinationDelivery = Math.max(450, Math.round(quantity * 0.06) + 300);
    } else if (shipmentMode === '40FT') {
      destinationDelivery = 1950;
    }
    
    // Calculate Totals Based on Selected Incoterms
    const shownOriginInland = incoterm === 'EXW' ? originInlandAndThc : 0;
    const shownOceanFreight = (incoterm === 'EXW' || incoterm === 'FOB') ? oceanFreight : 0;
    const shownInsurance = (incoterm === 'EXW' || incoterm === 'FOB') ? insurance : 0;
    const shownDuty = incoterm !== 'DDP' ? customsDuty : 0;
    const shownDelivery = destinationDelivery;

    const grandLandedTotal = rawGoodsFob + shownOriginInland + shownOceanFreight + shownInsurance + shownDuty + shownDelivery;
    const karoTradzFee = 0;
    const unitLandedCost = grandLandedTotal / quantity;

    // Split responsibility indicators for educational display
    const payerInfo = {
      EXW: {
        origin: 'Buyer Pays Direct',
        freight: 'Buyer Pays Direct',
        insurance: 'Buyer Pays Direct',
        duty: 'Buyer Pays Direct',
        delivery: 'Buyer Pays Direct',
        invoiceFromSupplier: rawGoodsFob,
        otherCostsToBuyer: grandLandedTotal - rawGoodsFob
      },
      FOB: {
        origin: 'Supplier Covers',
        freight: 'Buyer Pays Direct',
        insurance: 'Buyer Pays Direct',
        duty: 'Buyer Pays Direct',
        delivery: 'Buyer Pays Direct',
        invoiceFromSupplier: rawGoodsFob, 
        otherCostsToBuyer: grandLandedTotal - rawGoodsFob
      },
      CIF: {
        origin: 'Supplier Covers',
        freight: 'Supplier Covers',
        insurance: 'Supplier Covers',
        duty: 'Buyer Pays Direct',
        delivery: 'Buyer Pays Direct',
        invoiceFromSupplier: rawGoodsFob + oceanFreight + insurance,
        otherCostsToBuyer: customsDuty + destinationDelivery
      },
      DDP: {
        origin: 'Supplier Covers',
        freight: 'Supplier Covers',
        insurance: 'Supplier Covers',
        duty: 'Supplier Covers',
        delivery: 'Buyer Pays Direct',
        invoiceFromSupplier: rawGoodsFob + oceanFreight + insurance + customsDuty,
        otherCostsToBuyer: destinationDelivery
      }
    };

    return {
      rawGoodsFob,
      originInlandAndThc: shownOriginInland,
      oceanFreight: shownOceanFreight,
      insurance: shownInsurance,
      customsDuty: shownDuty,
      destinationDelivery: shownDelivery,
      karoTradzFee,
      grandLandedTotal,
      unitLandedCost,
      payerBreakdown: payerInfo[incoterm]
    };
  };

  const costResult = calculateCostsDetail();

  const handleEmailRequest = () => {
    const subject = `KaroTradz Quotation Simulation: ${activeTab.toUpperCase()} (${quantity} units)`;
    const body = `Hi KaroTradz Trade Team,\n\nI have run a landed cost simulation on the website and would like to request a formal, legally guaranteed door-to-door quotation.\n\nSIMULATION PROFILE:\n----------------------\nSector Category: ${activeTab.toUpperCase()}\nOrder Quantity: ${quantity.toLocaleString()} units\nEstimated Unit Price: ${formatCurr(unitPrice)} USD\nIncoterm: ${incoterm}\nShipment Mode: ${shipmentMode}\nFactory Hub Location: ${factory}\nDestination Port: ${destination}\n\nCALCULATED LANDED METRICS:\n----------------------\nFOB Product Cost: ${formatCurr(costResult.rawGoodsFob)}\nOrigin Inland & THC: ${formatCurr(costResult.originInlandAndThc)} (${incoterm === 'EXW' ? 'Buyer Direct' : 'Covered in Quote'})\nOcean Freight: ${formatCurr(costResult.oceanFreight)} (${incoterm === 'EXW' || incoterm === 'FOB' ? 'Buyer Direct' : 'Covered in Quote'})\nInsurance: ${formatCurr(costResult.insurance)}\nDuties & Filings: ${formatCurr(costResult.customsDuty)} (${incoterm === 'DDP' ? 'Covered in Quote' : 'Buyer Direct'})\nDestination Clearance & Logistics: ${formatCurr(costResult.destinationDelivery)}\n\nESTIMATED TRUE TOTAL DELIVERED COST: ${formatCurr(costResult.grandLandedTotal)} USD\nESTIMATED LANDED COST PER UNIT: ${formatCurr(costResult.unitLandedCost)} USD\n\nPlease verify factory availability in Gujarat and email me back with the official cargo booking proposal.\n\nBest regards,\n[My Name]\n[My Company Name]`;

    const mailtoUrl = `mailto:info@karotradz.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
  };

  // Helper to format currency
  const formatCurr = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: val % 1 === 0 ? 0 : 2
    }).format(val);
  };

  return (
    <section id="buyers" className="py-20 md:py-28 bg-gray-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="space-y-4 max-w-4xl">
          <span className="font-sans text-[10px] font-bold text-brand-orange uppercase tracking-[0.2em] block">
            For Buyers - THE WEDGE LANDED COST ENGINE
          </span>
          <h2 className="font-sans font-bold text-3xl sm:text-4xl lg:text-5xl text-editorial-dark tracking-tighter leading-tight">
            See the landed cost <span className="text-brand-orange font-extrabold">before</span> you pick a factory.
          </h2>
          <p className="font-sans text-editorial-dark/70 text-sm sm:text-base leading-relaxed max-w-3xl">
            This is an early demo of the Landed Cost Engine we're building — using indicative benchmark rates for now. We're actively developing the full version with live freight and duty data. Try it, and tell us what would make it more useful.
          </p>
        </div>

        {/* Outer Grid: Two main columns for Configuration vs Receipt Output */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT PANEL: Trade Lane & Shipment Configurator (6 Columns) */}
          <div className="lg:col-span-6 bg-gray-50 border border-gray-200 p-6 sm:p-8 space-y-8 rounded-2xl  ">
            
            {/* Header and Preset Tabs */}
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                <h3 className="font-sans font-bold text-sm text-editorial-dark uppercase tracking-wider flex items-center gap-2">
                  <Calculator className="w-4 h-4 text-brand-orange" />
                  <span>1. Shipment Parameters</span>
                </h3>
                <span className="font-mono text-[9px] rounded-2xl bg-brand-orange text-white px-2.5 py-0.5 font-bold uppercase tracking-wider">
                  Live Calculator
                </span>
              </div>
              
              <div className="space-y-1.5">
                <label className="font-sans text-[10px] font-bold text-gray-400 uppercase tracking-widest block">
                  Select Product Sector Preset
                </label>
                <div className="grid grid-cols-3 gap-2 bg-gray-200/50 p-1 border border-gray-200/80 rounded-4xl">
                  {(Object.keys(CALCULATOR_PRESETS) as ProductCategory[]).map((cat) => {
                    const preset = CALCULATOR_PRESETS[cat];
                    const isSelected = activeTab === cat;
                    return (
                      <button
                        key={cat}
                        onClick={() => handleTabSelect(cat)}
                        className={`py-2.5 text-[9px] sm:text-[10px] font-sans font-bold tracking-[0.1em] uppercase transition-all text-center cursor-pointer  ${
                          isSelected
                            ? 'bg-editorial-dark text-white !rounded-4xl'
                            : 'text-gray-500 hover:text-editorial-dark '
                        }`}
                      >
                        {preset.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Quantity and Price Sliders */}
            <div className="space-y-5">
              {/* Order Quantity Selector */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-sans">
                  <span className="text-gray-500 font-semibold flex items-center gap-1">
                    Order Volume <span className="text-gray-400 font-normal">(units)</span>
                  </span>
                  <div className="flex items-center gap-1.5">
                    <input
                      type="number"
                      value={quantity}
                      min="500"
                      max="200000"
                      step="500"
                      onChange={(e) => setQuantity(Math.max(500, Number(e.target.value)))}
                      className="w-20 font-mono font-bold text-right text-editorial-dark bg-white border border-gray-200 px-1.5 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-brand-orange focus:border-brand-orange"
                    />
                    <span className="text-[10px] font-bold text-gray-400 font-mono">PCS</span>
                  </div>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="100000"
                  step="1000"
                  value={quantity > 100000 ? 100000 : quantity}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setQuantity(val);
                  }}
                  className="w-full h-1 bg-gray-200 rounded appearance-none cursor-pointer accent-brand-orange"
                />
              </div>

              {/* Dynamic Unit Price Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-sans">
                  <span className="text-gray-500 font-semibold flex items-center gap-1">
                    {incoterm === 'EXW' && 'EXW Factory Unit Price'}
                    {incoterm === 'FOB' && 'FOB Unit Price'}
                    {incoterm === 'CIF' && 'CIF Unit Price'}
                    {incoterm === 'DDP' && 'DDP Unit Price'}{' '}
                    <span className="text-gray-400 font-normal">(USD)</span>
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs text-gray-400 font-bold">$</span>
                    <input
                      type="number"
                      value={unitPrice}
                      min="0.10"
                      max="100.00"
                      step="0.05"
                      onChange={(e) => setUnitPrice(Math.max(0.10, Number(e.target.value)))}
                      className="w-20 font-mono font-bold text-right text-editorial-dark bg-white border border-gray-200 px-1.5 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-brand-orange focus:border-brand-orange"
                    />
                    <span className="text-[10px] font-bold text-gray-400 font-mono">{incoterm}</span>
                  </div>
                </div>
                <input
                  type="range"
                  min="0.50"
                  max="20.00"
                  step="0.10"
                  value={unitPrice > 20 ? 20 : unitPrice}
                  onChange={(e) => setUnitPrice(Number(e.target.value))}
                  className="w-full h-1 bg-gray-200 rounded appearance-none cursor-pointer accent-brand-orange"
                />
              </div>
            </div>

            {/* Incoterms Selector Panel */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="font-sans text-[10px] font-bold text-gray-400 uppercase tracking-widest block">
                  Select Commercial Incoterm
                </label>
                <span className="font-mono text-[9px] text-brand-orange font-bold flex items-center gap-1">
                  <Percent className="w-3 h-3" /> Responsibility Shift
                </span>
              </div>
              
              <div className="grid grid-cols-4 gap-1 bg-gray-200/50 p-1 border border-gray-200/80 rounded-2xl">
                {(['EXW', 'FOB', 'CIF', 'DDP'] as IncotermType[]).map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => setIncoterm(term)}
                    className={`py-2 text-[10px] font-sans font-bold transition-all text-center cursor-pointer ${
                      incoterm === term
                        ? 'bg-brand-orange text-white'
                        : 'text-gray-500 hover:text-editorial-dark'
                    }`}
                  >
                    {term}
                  </button>
                ))}
              </div>

              {/* Incoterm Explanation Box */}
              <div className="bg-white border border-gray-200 p-3.5 text-xs font-sans leading-relaxed text-editorial-dark/70 space-y-1">
                {incoterm === 'EXW' && (
                  <>
                    <strong className="text-editorial-dark">EXW (Ex Works):</strong> Buyer is responsible for all costs from the factory gate including origin trucking, port handling, ocean freight, insurance, import duties, and delivery.
                  </>
                )}
                {incoterm === 'FOB' && (
                  <>
                    <strong className="text-editorial-dark">FOB (Free on Board):</strong> Gujarat manufacturer covers origin trucking and terminal export loading. Buyer pays for ocean shipping, marine cargo insurance, import duties, and local warehouse trucking.
                  </>
                )}
                {incoterm === 'CIF' && (
                  <>
                    <strong className="text-editorial-dark">CIF (Cost Insurance Freight):</strong> Supplier covers ocean freight and marine insurance to destination port. Buyer pays import duties and inland delivery only.
                  </>
                )}
                {incoterm === 'DDP' && (
                  <>
                    <strong className="text-editorial-dark">DDP (Delivered Duty Paid):</strong> Supplier covers everything including import duties. Buyer only pays for local warehouse delivery.
                  </>
                )}
              </div>
            </div>

            {/* Container Load & Shipment Mode Toggles */}
            <div className="space-y-2">
              <label className="font-sans text-[10px] font-bold text-gray-400 uppercase tracking-widest block">
                Logistics Container Type
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['LCL', '20FT', '40FT'] as ShipmentModeType[]).map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setShipmentMode(mode)}
                    className={`py-3 text-xs font-sans font-bold border transition-all text-center cursor-pointer flex flex-col items-center justify-center rounded-2xl   bg-white ${
                      shipmentMode === mode
                        ? 'border-editorial-dark text-editorial-dark ring-1 ring-editorial-dark bg-gray-50'
                        : 'border-gray-200 text-gray-500 hover:border-gray-300 hover:text-editorial-dark'
                    }`}
                  >
                    <span className="text-[11px] uppercase tracking-wide">
                      {mode === 'LCL' ? 'Shared LCL' : mode === '20FT' ? '20ft FCL' : '40ft FCL'}
                    </span>
                    <span className="text-[8px] font-mono text-gray-400 mt-0.5 font-normal">
                      {mode === 'LCL' ? 'Loose Cargo' : mode === '20FT' ? 'Standard 20t' : 'High-Cube 40t'}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Dropdowns for Origins & Destinations */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="font-sans text-[9px] font-bold text-gray-400 uppercase tracking-widest block">
                  Gujarat Origin Hub
                </label>
                <select
                  value={factory}
                  onChange={(e) => setFactory(e.target.value)}
                  className="w-full bg-white border border-gray-200 px-3 py-2.5 text-xs font-sans text-editorial-dark focus:outline-none focus:ring-1 focus:ring-brand-orange focus:border-brand-orange cursor-pointer"
                >
                  {FACTORIES.map((fac) => (
                    <option key={fac} value={fac}>{fac}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="font-sans text-[9px] font-bold text-gray-400 uppercase tracking-widest block">
                  Destination Port
                </label>
                <select
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full bg-white border border-gray-200 px-3 py-2.5 text-xs font-sans text-editorial-dark focus:outline-none focus:ring-1 focus:ring-brand-orange focus:border-brand-orange cursor-pointer"
                >
                  {DESTINATIONS.map((dest) => (
                    <option key={dest} value={dest}>{dest}</option>
                  ))}
                </select>
              </div>
            </div>

          </div>

          {/* RIGHT PANEL: Live Calculation Invoice/Receipt (6 Columns) */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="bg-white border-2 border-editorial-dark p-6 sm:p-8 space-y-6 rounded-2xl   relative overflow-hidden shadow-sm">
              {/* Top watermark stamp for verified computation */}
              <div className="absolute right-6 top-6 opacity-[0.03] text-editorial-dark pointer-events-none">
                <LogoK className="w-36 h-36" />
              </div>
              
              {/* Card Header Section: Simulated Summary */}
              <div className="space-y-1 border-b border-gray-100 pb-4">
                <div className="flex justify-between items-center">
                  <span className="font-sans text-[10px] font-bold text-gray-400 uppercase tracking-widest block">
                    Calculated Result Manifest
                  </span>
                  <div className="flex items-center gap-1.5 font-mono text-[9px] font-bold text-[#10B981] bg-emerald-50 px-2 py-0.5 border border-emerald-100 uppercase tracking-wider rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                    <span>VERIFIED TRADE RATE</span>
                  </div>
                </div>
                <h4 className="font-sans font-bold text-lg text-editorial-dark">
                  Landed Quote Estimate
                </h4>
              </div>

              {/* Big Landed Cost Hero Display */}
              <div className="bg-brand-orange/[0.03] border border-brand-orange/20 p-5 sm:p-6 rounded-2xl   space-y-1.5 text-center sm:text-left">
                <span className="font-sans text-[9px] font-bold text-brand-orange tracking-[0.2em] uppercase block">
                  TRUE ESTIMATED LANDED COST / UNIT
                </span>
                
                <div className="flex flex-col sm:flex-row items-baseline justify-center sm:justify-start gap-1">
                  <span className="font-sans font-black text-5xl sm:text-6xl text-brand-orange tracking-tighter leading-none">
                    {formatCurr(costResult.unitLandedCost)}
                  </span>
                  <span className="font-mono text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                    USD Delivered
                  </span>
                </div>
                
                <div className="flex flex-wrap justify-center sm:justify-start items-center gap-2 pt-2 text-[10px] text-gray-500 font-sans">
                  <span className="font-bold">Summary:</span>
                  <span>{quantity.toLocaleString()} units</span>
                  <span>·</span>
                  <span>Shipped via {shipmentMode}</span>
                  <span>·</span>
                  <span>{incoterm} Terms</span>
                </div>
              </div>

              {/* Itemized Manifest Table */}
              <div className="space-y-3.5 font-sans text-xs">
                <div className="flex justify-between items-center text-[10px] font-bold text-gray-400 uppercase tracking-wider border-b border-dashed border-gray-200 pb-1.5">
                  <span>Logistics Cost Item</span>
                  <span className="text-right">Estimated Cost</span>
                </div>

                {/* 1. FOB Goods Cost */}
                <div 
                  className="flex justify-between items-center relative py-1 hover:bg-gray-50 px-1 transition-colors group cursor-pointer"
                  onMouseEnter={() => setHoveredCost('goods')}
                  onMouseLeave={() => setHoveredCost(null)}
                >
                  <div className="flex items-center gap-1.5">
                    <DollarSign className="w-3.5 h-3.5 text-gray-400" />
                    <span className="text-editorial-dark font-medium underline decoration-dotted decoration-gray-300">
                      FOB Product Goods Value
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-mono font-bold text-editorial-dark">
                      {formatCurr(costResult.rawGoodsFob)}
                    </span>
                    <span className="block text-[8px] font-mono text-gray-400">
                      Invoice Value
                    </span>
                  </div>
                </div>

                {/* 2. Origin Inland Logistics */}
                <div 
                  className="flex justify-between items-center py-1 hover:bg-gray-50 px-1 transition-colors cursor-pointer"
                  onMouseEnter={() => setHoveredCost('origin')}
                  onMouseLeave={() => setHoveredCost(null)}
                >
                  <div className="flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-gray-400" />
                    <span className="text-editorial-dark underline decoration-dotted decoration-gray-300">
                      Origin Transport & THC (Gujarat)
                    </span>
                  </div>
                  <div className="text-right">
                    <span className={`font-mono font-bold ${incoterm === 'EXW' ? 'text-editorial-dark' : 'text-gray-400'}`}>
                      {incoterm === 'EXW' ? formatCurr(costResult.originInlandAndThc) : '$0'}
                    </span>
                    <span className="block text-[8px] font-sans font-bold text-gray-400 uppercase tracking-tight">
                      {incoterm === 'EXW' ? 'Buyer Direct' : 'Supplier Covered'}
                    </span>
                  </div>
                </div>

                {/* 3. Ocean Shipping */}
                <div 
                  className="flex justify-between items-center py-1 hover:bg-gray-50 px-1 transition-colors cursor-pointer"
                  onMouseEnter={() => setHoveredCost('ocean')}
                  onMouseLeave={() => setHoveredCost(null)}
                >
                  <div className="flex items-center gap-1.5">
                    <Ship className="w-3.5 h-3.5 text-gray-400" />
                    <span className="text-editorial-dark underline decoration-dotted decoration-gray-300">
                      Ocean Transit {shipmentMode === 'LCL' ? 'LCL shared' : 'FCL container'}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className={`font-mono font-bold ${(incoterm === 'EXW' || incoterm === 'FOB') ? 'text-editorial-dark' : 'text-gray-400'}`}>
                      { (incoterm === 'EXW' || incoterm === 'FOB') ? formatCurr(costResult.oceanFreight) : '$0' }
                    </span>
                    <span className="block text-[8px] font-sans font-bold text-gray-400 uppercase tracking-tight">
                      { (incoterm === 'EXW' || incoterm === 'FOB') ? 'Buyer Direct' : 'Supplier Covered' }
                    </span>
                  </div>
                </div>

                {/* 4. Cargo Transit Insurance */}
                <div 
                  className="flex justify-between items-center py-1 hover:bg-gray-50 px-1 transition-colors cursor-pointer"
                  onMouseEnter={() => setHoveredCost('insurance')}
                  onMouseLeave={() => setHoveredCost(null)}
                >
                  <div className="flex items-center gap-1.5">
                    <ShieldAlert className="w-3.5 h-3.5 text-gray-400" />
                    <span className="text-editorial-dark underline decoration-dotted decoration-gray-300">
                      Marine Transit Insurance (0.35%)
                    </span>
                  </div>
                  <div className="text-right">
                    <span className={`font-mono font-bold ${(incoterm === 'EXW' || incoterm === 'FOB') ? 'text-editorial-dark' : 'text-gray-400'}`}>
                      { (incoterm === 'EXW' || incoterm === 'FOB') ? formatCurr(costResult.insurance) : '$0' }
                    </span>
                    <span className="block text-[8px] font-sans font-bold text-gray-400 uppercase tracking-tight">
                      { (incoterm === 'EXW' || incoterm === 'FOB') ? 'Buyer Direct' : 'Supplier Covered' }
                    </span>
                  </div>
                </div>

                {/* 5. Destination Clearance & Duty */}
                <div 
                  className="flex justify-between items-center py-1 hover:bg-gray-50 px-1 transition-colors cursor-pointer"
                  onMouseEnter={() => setHoveredCost('duty')}
                  onMouseLeave={() => setHoveredCost(null)}
                >
                  <div className="flex items-center gap-1.5">
                    <Landmark className="w-3.5 h-3.5 text-gray-400" />
                    <span className="text-editorial-dark underline decoration-dotted decoration-gray-300">
                      Import Duties & Custom Clearance
                    </span>
                  </div>
                  <div className="text-right">
                    <span className={`font-mono font-bold ${incoterm !== 'DDP' ? 'text-editorial-dark' : 'text-gray-400'}`}>
                      { incoterm !== 'DDP' ? formatCurr(costResult.customsDuty) : '$0' }
                    </span>
                    <span className="block text-[8px] font-sans font-bold text-gray-400 uppercase tracking-tight">
                      { incoterm !== 'DDP' ? `${CALCULATOR_PRESETS[activeTab].dutyRate}% Duty + Filing` : 'Supplier Covered' }
                    </span>
                  </div>
                </div>

                {/* 6. Destination Clearance & Local Trucking */}
                <div 
                  className="flex justify-between items-center py-1 hover:bg-gray-50 px-1 transition-colors cursor-pointer"
                  onMouseEnter={() => setHoveredCost('delivery')}
                  onMouseLeave={() => setHoveredCost(null)}
                >
                  <div className="flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-gray-400" />
                    <span className="text-editorial-dark underline decoration-dotted decoration-gray-300">
                      Destination Clearance & Trucking
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-mono font-bold text-editorial-dark">
                      { formatCurr(costResult.destinationDelivery) }
                    </span>
                    <span className="block text-[8px] font-sans font-bold text-gray-400 uppercase tracking-tight">
                      Buyer Direct
                    </span>
                  </div>
                </div>

                {/* Dynamic Explanations Overlay */}
                <div className="min-h-[48px] bg-gray-50 border border-gray-100 p-2 text-[11px] text-gray-500 rounded-2xl   leading-relaxed">
                  {hoveredCost === 'goods' && "FOB (Free on Board) factory price in Gujarat. The core invoice cost from the manufacturer for high-quality verified export items."}
                  {hoveredCost === 'origin' && "Origin transport covers freight carriage from the factory hub (Surat/Jamnagar/Morbi) to Gujarat's major export ports, plus terminal handling charges."}
                  {hoveredCost === 'ocean' && `Port-to-port ocean freight transit from Mundra/Pipavav, India, to ${destination} for a ${shipmentMode === 'LCL' ? 'shared LCL shipment volume' : shipmentMode === '20FT' ? 'full standard 20ft container load' : 'large capacity 40ft high-cube container load'}.`}
                  {hoveredCost === 'insurance' && "Marine cargo insurance covering 110% of the combined value against maritime hazards, damage, and transit losses."}
                  {hoveredCost === 'duty' && `Customs broker clearance filing fees and local state import tariff duty rates (${CALCULATOR_PRESETS[activeTab].dutyRate}%) calculated according to HS product codes.`}
                  {hoveredCost === 'delivery' && "Destination port terminal handling charges, cargo stripping, customs entry filing, and local trucking from arrival port directly to your warehouse."}
                  {!hoveredCost && "💡 Hover or tap on any cost line item above to reveal a detailed breakdown of its logistics function and trade lanes standard."}
                </div>

                {/* Totals Section */}
                <div className="border-t border-gray-200 pt-3 space-y-2">
                  
                  {/* Visual Cost Percentage Bar */}
                  <div className="space-y-1">
                    <div className="h-2 w-full bg-gray-100 flex overflow-hidden">
                      <div 
                        className="bg-editorial-dark h-full transition-all duration-300" 
                        style={{ width: `${(costResult.rawGoodsFob / costResult.grandLandedTotal) * 100}%` }}
                        title="FOB Goods"
                      />
                      <div 
                        className="bg-brand-orange h-full transition-all duration-300" 
                        style={{ width: `${((costResult.oceanFreight + costResult.originInlandAndThc + costResult.insurance) / costResult.grandLandedTotal) * 100}%` }}
                        title="Freight & Insurance"
                      />
                      <div 
                        className="bg-[#A39A90] h-full transition-all duration-300" 
                        style={{ width: `${(costResult.customsDuty / costResult.grandLandedTotal) * 100}%` }}
                        title="Duties"
                      />
                      <div 
                        className="bg-[#D1CFC9] h-full transition-all duration-300" 
                        style={{ width: `${(costResult.destinationDelivery / costResult.grandLandedTotal) * 100}%` }}
                        title="Local Handling"
                      />
                    </div>
                    
                    <div className="grid grid-cols-4 text-[8px] font-mono text-gray-400 pt-1 tracking-tight">
                      <span className="truncate flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-editorial-dark inline-block flex-shrink-0" /> Goods
                      </span>
                      <span className="truncate flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-brand-orange inline-block flex-shrink-0" /> Freight
                      </span>
                      <span className="truncate flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-[#A39A90] inline-block flex-shrink-0" /> Duty
                      </span>
                      <span className="truncate flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-[#D1CFC9] inline-block flex-shrink-0" /> Port Delivery
                      </span>
                    </div>
                  </div>

                  <div className="border-t border-dashed border-gray-200 pt-2.5 space-y-2">
                    {/* Incoterm billing split indicator */}
                    <div className="flex justify-between items-center text-[11px] font-sans">
                      <span className="text-gray-500 font-medium">Invoice Value from Supplier ({incoterm}):</span>
                      <span className="font-mono font-bold text-editorial-dark">
                        {formatCurr(costResult.payerBreakdown.invoiceFromSupplier)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-[11px] font-sans border-b border-gray-100 pb-2">
                      <span className="text-gray-500 font-medium">Direct Duties, Port Clearing & Agency Fees:</span>
                      <span className="font-mono font-bold text-editorial-dark">
                        {formatCurr(costResult.payerBreakdown.otherCostsToBuyer)}
                      </span>
                    </div>

                    {/* Grand Landed Sum */}
                    <div className="flex justify-between items-center text-xs rounded-md font-sans font-bold text-white bg-editorial-dark p-4 border border-editorial-dark">
                      <span className="uppercase tracking-[0.15em]  font-sans text-[10px]">TOTAL ESTIMATED LANDED INVESTMENT</span>
                      <span className="font-mono text-base">{formatCurr(costResult.grandLandedTotal)}</span>
                    </div>
                  </div>
                  
                </div>

                {/* Email Call-to-action button */}
                <a
                 
                  className="w-full bg-brand-orange text-white font-sans text-[10px] font-bold tracking-[0.2em] uppercase py-4 hover:bg-editorial-dark active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2 rounded-2xl"
                  href='#early-access'
                >
                  <span>Talk to Our Trade Team</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>

                {/* Feedback Prompt below the quote button */}
                <div className="pt-4 border-t border-gray-100 space-y-2.5 text-center" id="estimate-accuracy-feedback">
                  <AnimatePresence mode="wait">
                    {!feedbackSubmitted ? (
                      <motion.div
                        key="prompt"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="space-y-2"
                      >
                        <span className="font-sans text-[11px] text-gray-500 font-medium block">
                          Does this estimate look accurate to you?
                        </span>
                        <div className="flex justify-center gap-3">
                          <button
                            type="button"
                            onClick={() => {
                              setFeedbackType('yes');
                              setFeedbackSubmitted(true);
                            }}
                            className="px-4 py-1.5 border border-gray-200 hover:border-brand-orange text-[10px] font-sans font-bold text-gray-600 hover:text-brand-orange transition-colors rounded-2xl   bg-gray-50/50 cursor-pointer"
                          >
                            👍 Yes, seems realistic
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setFeedbackType('no');
                              setFeedbackSubmitted(true);
                            }}
                            className="px-4 py-1.5 border border-gray-200 hover:border-brand-orange text-[10px] font-sans font-bold text-gray-600 hover:text-brand-orange transition-colors rounded-2xl   bg-gray-50/50 cursor-pointer"
                          >
                            👎 No, rates are off
                          </button>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="thanks"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-emerald-50 text-emerald-800 p-2.5 border border-emerald-100 text-[10px] font-sans"
                      >
                        {feedbackType === 'yes' ? (
                          <span>Thank you! We continuously benchmark ocean rates to keep estimates accurate.</span>
                        ) : (
                          <span>Thanks for flagging! Our logistics desk will review shipping rates for this corridor immediately.</span>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

              </div>

              {/* Disclaimer bottom text */}
              <p className="font-sans text-[10px] text-gray-400 leading-normal flex items-start gap-1.5 border-t border-gray-100 pt-4">
                <ShieldAlert className="w-3.5 h-3.5 text-gray-300 flex-shrink-0 mt-0.5" />
                <span>Disclaimer: Calculations are indicative estimates only based on standard shipping benchmarks, current port rates, and prevailing customs classification data. Final quotes are subject to cargo dimensions, carrier schedules, and custom validation at the time of export.</span>
              </p>

            </div>
            
          </div>

        </div>

      </div>
    </section>
  );
}
