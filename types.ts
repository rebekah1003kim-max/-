
export enum Page {
  HOME = 'home',
  CASES = 'cases',
  ABOUT = 'about',
  CONTACT = 'contact',
  CASE_DETAIL = 'case_detail',
  ADMIN = 'admin'
}

export interface ProductionCase {
  id: string;
  category: string;
  title: string;
  thumbnail: string;
  overview: {
    type: string;
    industry: string;
    purpose: string;
    location: string;
    duration: string;
  };
  requirements: string[];
  solution: {
    design: string;
    wiring: string;
    safety: string;
    test: string;
  };
  technologies: string[];
  results: {
    efficiency: string;
    stability: string;
    maintenance: string;
  };
  images: string[];
}

export interface InquiryFormData {
  company: string;
  name: string;
  phone: string;
  email: string;
  vehicleType: string;
  purpose: string;
  hasExistingSystem: string;
  deadline: string;
  budget: string;
  message: string;
}
