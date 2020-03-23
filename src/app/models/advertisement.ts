import { Employer } from './employer';

export interface Advertisement {
  id: number;
  name: String;  // title
  description: String; // description
  disclaimer: String; // ex. rodo note
  experience: String; // experience ex. MID
  employment: String; // employment ex. B2B
  salary_from: Number;    // wageMax
  salary_to: Number;    // wageMin
  currency: String;  // currency ex. PLN
  city: String;
  street: String;
  remote: number; // isRemote
  tech_stack: {name: String, level: String}[] // jobRequirements <!-- TODO:FIX -->
  technology: String;
  contact: String;
  website: String;
  expires_at: String;
  created_at: String;
  updated_at: String;
  employer: Employer;
}
