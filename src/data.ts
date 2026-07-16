import { Manufacturer, ProductCategory } from './types';

export const MANUFACTURERS: Manufacturer[] = [
  {
    id: 'm1',
    name: 'Anand Auto Tech',
    city: 'Jamnagar',
    state: 'Gujarat',
    category: 'auto_components',
    productType: 'Precision Gears & Engine Components',
    verified: true,
    rating: 4.8,
    certifications: ['ISO 9001:2015', 'CE Certified', 'RoHS Compliant'],
    employees: 120,
    yearEstablished: 1998,
    capacity: '50 Tons/Month'
  },
  {
    id: 'm2',
    name: 'Suryoday Textiles',
    city: 'Surat',
    state: 'Gujarat',
    category: 'textiles',
    productType: 'Premium Cotton Fabrics & Organic Yarn',
    verified: true,
    rating: 4.9,
    certifications: ['GOTS Certified', 'OEKO-TEX Standard 100', 'ISO 14001'],
    employees: 350,
    yearEstablished: 2004,
    capacity: '500,000 Meters/Month'
  },
  {
    id: 'm3',
    name: 'Morbi Ceramic Giftware',
    city: 'Morbi',
    state: 'Gujarat',
    category: 'giftware',
    productType: 'Handcrafted Stoneware & Ceramic Giftware',
    verified: true,
    rating: 4.7,
    certifications: ['ISO 9001:2015', 'CE Marking', 'SGS Approved'],
    employees: 280,
    yearEstablished: 2011,
    capacity: '120,000 Sq Meters/Month'
  },
  {
    id: 'm4',
    name: 'Gujarat Loomcraft',
    city: 'Ahmedabad',
    state: 'Gujarat',
    category: 'textiles',
    productType: 'Jacquard Weaves & Home Furnishings',
    verified: true,
    rating: 4.6,
    certifications: ['SA 8000', 'ISO 9001'],
    employees: 180,
    yearEstablished: 1995,
    capacity: '200,000 Units/Month'
  },
  {
    id: 'm5',
    name: 'Morbi Porcelain Giftware',
    city: 'Morbi',
    state: 'Gujarat',
    category: 'giftware',
    productType: 'Artisanal Vases & Custom Mug Collections',
    verified: true,
    rating: 4.8,
    certifications: ['ISO 9001:2015', 'Green Label', 'CE Approved'],
    employees: 410,
    yearEstablished: 2015,
    capacity: '250,000 Sq Meters/Month'
  },
  {
    id: 'm6',
    name: 'Jamnagar Precision Auto',
    city: 'Jamnagar',
    state: 'Gujarat',
    category: 'auto_components',
    productType: 'Suspension Linkages & Brake Assemblies',
    verified: true,
    rating: 4.7,
    certifications: ['ISO 9001', 'API 6D Spec', 'UL Listed'],
    employees: 95,
    yearEstablished: 2001,
    capacity: '35 Tons/Month'
  }
];

export interface PresetDetails {
  category: ProductCategory;
  label: string;
  factory: string;
  destination: string;
  quantity: number;
  unitPrice: number;
  baseFreight: number;
  dutyRate: number; // percentage
  insuranceRate: number; // percentage
  inlandCost: number;
}

export const CALCULATOR_PRESETS: Record<ProductCategory, PresetDetails> = {
  textiles: {
    category: 'textiles',
    label: 'Cotton Textiles',
    factory: 'Surat, Gujarat',
    destination: 'Rotterdam, NL',
    quantity: 12000,
    unitPrice: 4.00,
    baseFreight: 5200,
    dutyRate: 8, // 8% duty
    insuranceRate: 0.5, // 0.5%
    inlandCost: 1800
  },
  auto_components: {
    category: 'auto_components',
    label: 'Auto Components',
    factory: 'Jamnagar, Gujarat',
    destination: 'New Jersey, US',
    quantity: 40000,
    unitPrice: 2.00,
    baseFreight: 7500,
    dutyRate: 4.5,
    insuranceRate: 0.4,
    inlandCost: 2200
  },
  giftware: {
    category: 'giftware',
    label: 'Ceramic Giftware',
    factory: 'Morbi, Gujarat',
    destination: 'Hamburg, DE',
    quantity: 8000,
    unitPrice: 8.00,
    baseFreight: 6400,
    dutyRate: 12,
    insuranceRate: 0.8,
    inlandCost: 1950
  }
};

export const FACTORIES = [
  'Surat, Gujarat',
  'Jamnagar, Gujarat',
  'Morbi, Gujarat',
  'Ahmedabad, Gujarat',
  'Rajkot, Gujarat'
];

export const DESTINATIONS = [
  'Dubai, UAE',
  'Rotterdam, NL',
  'New Jersey, US',
  'Hamburg, DE',
  'Antwerp, BE',
  'Los Angeles, US',
  'Tokyo, JP',
  'London, UK'
];
