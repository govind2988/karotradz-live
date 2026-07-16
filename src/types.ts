export type LeadType = 'manufacturer' | 'buyer';

export interface Lead {
  id: string;
  email: string;
  type: LeadType;
  timestamp: string;
  companyName?: string;
  city?: string;
  industry?: string;
  phone?: string;
  status: 'pending' | 'reviewed' | 'approved';
}

export type ProductCategory = 'textiles' | 'auto_components' | 'giftware';

export interface CalculatorState {
  category: ProductCategory;
  quantity: number;
  unitPrice: number;
  factoryLocation: string;
  destination: string;
  productCost: number;
  freight: number;
  duties: number;
  insurance: number;
  inlandTransport: number;
  landedCostTotal: number;
  landedCostPerUnit: number;
}

export interface Manufacturer {
  id: string;
  name: string;
  city: string;
  state: string;
  category: ProductCategory;
  productType: string;
  verified: boolean;
  rating: number;
  certifications: string[];
  employees: number;
  yearEstablished: number;
  capacity: string;
}
