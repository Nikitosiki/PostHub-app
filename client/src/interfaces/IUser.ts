export interface IUser {
  id: string;
  name: string;
  role: string;
  email: string;
  gender: string | null;
  image_url: string | null;
  reg_date: Date;
}
