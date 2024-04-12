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

export type Enrollment = {
  id: number;
  enrolled_at: Date;
  year: string;
  level: string;
  section: string;
  tuition_plan: string;
  status: "pending" | "done";
  student_id: number;
  payment_receipt_url: string;
};

export type AcademicYear = {
  id: number;
  year: string;
  start_at: Date;
  end_at: Date;
  status: "upcoming" | "open" | "ongoing" | "finished";
};

export type Route = {
  name: string;
  path: string;
  icon?: JSX.Element;
};

// export type AdminEnrollment = AcademicYear & {
//   student_count: number;
// };

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
