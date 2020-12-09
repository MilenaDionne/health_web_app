
export interface PatientFile {
  controlName: string;
  defaultValue: unknown;
  icon: string;
  isOnlyForRegister: boolean;
  label: string;
  placeholder: string;
  type: string;
  validators: string[];
}

export const PatientFormFields: PatientFile[] = [
  {
    controlName: 'firstName',
    isOnlyForRegister: true,
    label: 'First Name',
    type: 'text',
    defaultValue: null,
    placeholder: 'John',
    icon: 'create',
    validators: ['required'],
  },
  {
    controlName: 'lastName',
    isOnlyForRegister: true,
    label: 'Last Name',
    type: 'text',
    defaultValue: null,
    placeholder: 'Smith',
    icon: 'create',
    validators: ['required'],
  },
  {
    controlName: 'email',
    isOnlyForRegister: false,
    label: 'Email',
    type: 'text',
    defaultValue: null,
    placeholder: 'johnsmith@email.com',
    icon: 'email',
    validators: ['required', 'email'],
  },
  {
    controlName: 'employeeNumber',
    isOnlyForRegister: true,
    label: 'Employee Number',
    type: 'number',
    defaultValue: null,
    placeholder: '300034572',
    icon: 'account_box',
    validators: ['required'],
  },
  {
    controlName: 'password',
    isOnlyForRegister: false,
    label: 'Password',
    type: 'password',
    defaultValue: null,
    placeholder: '********',
    icon: 'lock',
    validators: ['required'],
  },
  {
    controlName: 'role',
    isOnlyForRegister: true,
    label: 'role',
    type: 'string',
    defaultValue: null,
    placeholder: '********',
    icon: 'local_hospital',
    validators: ['required'],
  }
];
