import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import WedgeCalculator from './components/WedgeCalculator';
import ServiceModels from './components/ServiceModels';
import ManufacturerDirectory from './components/ManufacturerDirectory';
import FoundersNote from './components/FoundersNote';
import Footer from './components/Footer';
import BackgroundMusic from './components/BackgroundMusic';
import { Lead, ProductCategory } from './types';

export default function App() {
  const handleAddLead = async (newLead: Omit<Lead, 'id' | 'timestamp' | 'status'>) => {
    // Save to localStorage for persistent local state
    const existingLeads = JSON.parse(localStorage.getItem('karotradz_leads') || '[]');
    const leadWithMeta = {
      ...newLead,
      id: `lead_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString(),
      status: 'pending'
    };
    existingLeads.push(leadWithMeta);
    localStorage.setItem('karotradz_leads', JSON.stringify(existingLeads));
    
    // Log to console for audit & debugging
    console.log('Successfully registered lead locally:', leadWithMeta);

    // Asynchronously dispatch email notification via our Express backend
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newLead),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to dispatch email');
      }
      console.log('Email inquiry dispatched successfully:', data);
    } catch (err) {
      console.error('Error dispatching inquiry email:', err);
    }
  };

  const handleScrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSelectManufacturerPreset = (category: ProductCategory, factory: string) => {
    // Dispatch custom event to let the WedgeCalculator update its states
    window.dispatchEvent(new CustomEvent('simulate-preset', { detail: { category, factory } }));
  };

  return (
    <div className="min-h-screen bg-brand-beige font-sans text-editorial-dark selection:bg-brand-orange selection:text-brand-beige antialiased">
      {/* Navigation Header */}
      <Header onScrollToSection={handleScrollToSection} />

      {/* Main Sections */}
      <main>
        {/* Hero Section & Onboarding Form */}
        <Hero onAddLead={handleAddLead} />

        {/* How It Works Horizontal Interactive Timeline */}
        <HowItWorks />

        {/* Landed Cost Wedge Calculator */}
        <WedgeCalculator />

        {/* Brand Service Models Cards */}
        <ServiceModels />

        {/* Verified Manufacturer Directory Index */}
        <ManufacturerDirectory onSelectManufacturerPreset={handleSelectManufacturerPreset} />

        {/* Founder Note Regarding Pre-Launch Status */}
        <FoundersNote />
      </main>

      {/* Footer Section & Bottom Form */}
      <Footer onAddLead={handleAddLead} />

      {/* Floating Audio Controller */}
      <BackgroundMusic />
    </div>
  );
}
