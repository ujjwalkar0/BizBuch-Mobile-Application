export type RegisterPayload = {
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  password: string;
  confirm_password: string;
};

export type AuthResponse = {
  token: string;
};
