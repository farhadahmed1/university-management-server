export type TUser = {
  id: string;
  password: string;
  needPassword: boolean;
  role: 'admin' | 'student' | 'faculty';
  status: 'in-progress' | 'blocked';
  isDelete: boolean;
};
