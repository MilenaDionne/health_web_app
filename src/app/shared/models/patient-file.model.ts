export interface PatientFile{
  id: string;
  patientId: string;
  firstName: string;
  lastName: string;
  email?: string;
  phoneNumber?: string;
  divisionId?: string;
  prescription?: string;
}
