export type AccommodationKey = "kursi-roda" | "isyarat" | "screen-reader" | "tertulis" | "remote" | "fleksibel" | "mentor" | "tenang";
export interface SeedJob { id: string; title: string; companyId: string; category: string; location: string; remote: boolean; deadline: string; description: string; criteria: string[]; accommodations: AccommodationKey[]; skills: string[]; experienceMin: number; cover: string; }
export interface SeedCompany { id: string; name: string; city: string; logo: string; about: string; }
export interface SeedProfile { id: string; role: "talent" | "company"; name: string; email: string; city: string; skills: string[]; experienceYears: number; disabilities: string[]; needs: AccommodationKey[]; category: string; }
export interface SeedData { jobs: SeedJob[]; companies: SeedCompany[]; demoTalent: SeedProfile; demoCompany: SeedProfile; }
