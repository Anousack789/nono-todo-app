export interface ILogin {
  username: string;
  password: string;
}

export interface IRegister {
  email: string;
  username: string;
  password: string;
  fullname: string;
  birthday: string;
  gender: string;
  phoneNumber: string;
}

export interface IRegisterForm extends IRegister {
  retryPassword: string;
}

export interface IChangePassword {
  oldPassword: string;
  newPassword: string;
}
