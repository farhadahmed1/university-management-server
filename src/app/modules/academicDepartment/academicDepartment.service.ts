import { TAcademicDepartment } from './academicDepartment.interface';
import { AcademicDepartment } from './academicDepartment.model';

const createAcademicDepartmentInDB = async (payload: TAcademicDepartment) => {
  const academicFaculty = new AcademicDepartment(payload);
  const result = await academicFaculty.save(); // built in instance method
  return result;
};
const getAllAcademicDepartmentFromDB = async () => {
  const result = await AcademicDepartment.find();
  return result;
};
const getSingleAcademicDepartmentFromDB = async (_id: string) => {
  const result = await AcademicDepartment.findOne({ _id });
  //const result = await AcademicFaculty.aggregate([{ $match: { _id: _id } }]);
  return result;
};

const updateAcademicDepartmentFromDB = async (
  _id: string,
  updateFields: Partial<TAcademicDepartment>,
) => {
  const result = await AcademicDepartment.updateOne(
    { _id },
    { $set: updateFields },
  );
  return result;
};

export const AcademicDepartmentService = {
  createAcademicDepartmentInDB,
  getAllAcademicDepartmentFromDB,
  getSingleAcademicDepartmentFromDB,
  updateAcademicDepartmentFromDB,
};
