export interface Skill {
  name: string;
  matched: boolean;
  confidence: number;
}

export interface Experience {
  title: string;
  company: string;
  duration: string;
  description: string;
}

export interface Education {
  degree: string;
  institution: string;
  year: string;
}

export interface BestMatch {
  role: string;
  matchPercentage: number;
  confidence: number;
}

export interface ResumeData {
  name: string;
  email: string;
  phone: string;
  skills: Skill[];
  experience: Experience[];
  education: Education[];
  bestMatch: BestMatch;
}
