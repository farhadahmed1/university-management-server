import config from '../../config';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generatedStudentId } from './user.utils';

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  // create a new user object

  const userData: Partial<TUser> = {};
  // if password is not provided then use the default password
  userData.password = password || (config.default_password as string);

  // set student  role
  userData.role = 'student';
  // Id generator function

  // find academic semester info

  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  );

  // set manually generated id
  userData.id = await generatedStudentId(admissionSemester);
  // create a new user
  const newUser = await User.create(userData);

  // create a  student
  if (Object.keys(newUser).length) {
    // set id , _id as user
    payload.id = newUser.id; // embedding id
    payload.user = newUser._id; // reference Id
    const newStudent = await Student.create(payload);
    return newStudent;
  }
  return newUser;
};

export const UserService = {
  createStudentIntoDB,
};
