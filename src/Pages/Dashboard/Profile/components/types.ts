export interface IPersonalInfo {
  title: string;
  firstname: string;
  middlename: string;
  lastname: string;
  gender: string;
  email: string;
  picture: string;
  nationality: string;
  phone: string;
  address: string;
  emergencyContactName: string;
  emergencyContactEmail: string;
  emergencyContactPhone: string;
}

export interface IEducation {
  name: string;
  location: string;
  startYear: string;
  endYear: string;
  qualificationObtained: string;
}

export interface IWork {
  id: string;
  companyName: string;
  startDate: Date;
  endDate?: Date;
  role: string;
  summary: string;
  isCurrent: boolean;
}
