export interface IUser {
  id: number;
  name: string;
  role: string;
  age: number | null;
  email: string;
  gender: string | null;
  image_url: string | null;
  reg_date: Date;
}
