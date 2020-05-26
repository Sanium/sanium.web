import { Employer } from './Employer';

export interface Advertisement {
  id: number;
  name: string;  // title
  description: string; // description
  disclaimer: string; // ex. rodo note
  experience: string; // experience ex. MID
  employment: string; // employment ex. B2B
  salary_from: number;    // wageMax
  salary_to: number;    // wageMin
  currency: string;  // currency ex. PLN
  city: string;
  street: string;
  remote: number; // isRemote
  tech_stack: {tag: string}[] // jobRequirements
  technology: string; // Filtering purposes
  contact: string;  // For advertisement (not employer)
  website: string; // ?
  expires_at: string;
  created_at: string;
  updated_at: string;
  employer: Employer;
}
