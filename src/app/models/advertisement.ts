export class Advertisement {
  id: String;
  title: String;
  description: String;
  rodoNote: String;
  wageMax: Number;
  wageMin: Number;
  currencyId: String;
  city: String;
  street: String;
  isRemote: Boolean;
  jobRequirements: {name: String, level: Number}[];
  contractType: String;
  experience: String;
  category: String;
  contactUrl: String;
  isExpiring?: Boolean;
}
