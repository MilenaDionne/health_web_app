enum Role{
  doctor= 'Doctor',
  nurse= 'Nurse',
  chargeNurse= 'Charge Nurse'
}
export interface User { // Base class for  Firebase auth. Do not modify.
  email: string;
  firstName?: string;
  lastName?: string;
  uid: string;
  displayName?: string;
}

export interface MedicalStaff extends User { // base staff class. Extend to make Doctor and Nurse classes
  role: Role;
  employeeNumber: number;
  phoneNumber?: number;
}
