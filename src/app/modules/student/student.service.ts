import { Student } from './student.model';
import { TStudent } from './student.interface';

const createStudentInDB = async (studentData: TStudent) => {
  // const result = await StudentModel.create(student); // built in static method
  const student = new Student(studentData); // create an instance
  if (await student.isUserExists(studentData.id)) {
    throw new Error('User already exists !');
  }

  const result = await student.save(); // built in instance method
  return result;
};
const getAllStudentsFromDB = async () => {
  const result = await Student.find();
  return result;
};
const getSingleStudentsFromDB = async (id: string) => {
  // const result = await Student.findOne({ id });
  const result = await Student.aggregate([{ $match: { id: id } }]);
  return result;
};
const deleteStudentsFromDB = async (id: string) => {
  const result = await Student.updateOne({ id }, { isDeleted: true });
  return result;
};

const updateStudentFromDB = async (id: string, updateFields: any) => {
  const result = await Student.updateOne({ id }, { $set: updateFields });
  return result;
};

export const StudentService = {
  createStudentInDB,
  getAllStudentsFromDB,
  getSingleStudentsFromDB,
  deleteStudentsFromDB,
  updateStudentFromDB,
};
