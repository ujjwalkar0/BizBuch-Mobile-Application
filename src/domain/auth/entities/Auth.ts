export type RegisterPayload = {
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  password: string;
  confirm_password: string;
  recaptcha_token: string;
};

export type LoginPayload = {
  username: string;
  password: string;
};

export type AuthResponse = {
  access: string;
  refresh: string;
};
