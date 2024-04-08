export type UserAuth = {
  id: number;
  first_name: string;
  middle_name?: string;
  last_name: string;
  contact_number: string;
  email: string;
  role: Role;
};

export type Role = "student" | "teacher" | "admin";

export type User = {
  id: number;
  first_name: string;
  middle_name?: string;
  last_name: string;
  contact_number: string;
  email: string;
  role: Role;
};

export type Register = {
  first_name: string;
  middle_name?: string;
  last_name: string;
  contact_number: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export type PageProps<
  T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
  auth: {
    user: UserAuth;
  };
};
