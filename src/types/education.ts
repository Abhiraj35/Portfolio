export interface educationSchema {
  institution: string;
  degree: string;
  start: string; 
  end?: string; 
  logo?: string;
  href?: string;
  description?: string[]; 
  links?: { name: string; href: string; icon?: string }[];
}