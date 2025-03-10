export interface User {
  index?: number;
  id: number;
  name: string;
  email: string;
  password: string;
  full_name: string;
  role: number;
  status: number;
  created_by: number;
}

export interface UserUpdatePayload {
  index?: number;
  id: number;
  name: string;
  email: string;
  password: string;
  full_name: string;
  role: number;
  status: number;
  created_by: number;
}