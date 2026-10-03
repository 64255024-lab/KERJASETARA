import type { AccommodationKey } from "./types";

// Bentuk baris DB (snake_case) dan bentuk pakai di UI (camelCase).
// Mapping terjadi di satu tempat: lib/repos.ts.
export interface DbCompany {
  id: string;
  name: string;
  city: string;
  logo: string;
  about: string;
  owner_id: string | null;
}

export interface DbJob {
  id: string;
  title: string;
  company_id: string;
  category: string;
  location: string;
  remote: boolean;
  deadline: string | null;
  description: string;
  criteria: string[];
  accommodations: AccommodationKey[];
  skills: string[];
  experience_min: number;
  checklist: string[];
  cover: string;
  owner_id: string | null;
  company?: DbCompany;
}

export interface DbProfile {
  id: string;
  role: "talent" | "company";
  name: string;
  email: string;
  city: string;
  skills: string[];
  experience_years: number;
  disabilities: string[];
  needs: AccommodationKey[];
  category: string;
}

export interface DbApplication {
  id: string;
  user_id: string;
  job_id: string;
  message: string;
  created_at: string;
  job?: DbJob;
  applicant?: Pick<
    DbProfile,
    "id" | "name" | "email" | "city" | "skills" | "experience_years" | "category" | "role"
  >;
}
