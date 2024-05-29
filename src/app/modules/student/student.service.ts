import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';

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

const updateStudentFromDB = async (
  id: string,
  updateFields: Partial<TStudent>,
) => {
  const result = await Student.updateOne({ id }, { $set: updateFields });
  return result;
};

export const StudentService = {
  getAllStudentsFromDB,
  getSingleStudentsFromDB,
  deleteStudentsFromDB,
  updateStudentFromDB,
};
