import { TAcademicFaculty } from './academicFaculty.interface';
import { AcademicFaculty } from './academicFaculty.model';

const createAcademicFacultyInDB = async (payload: TAcademicFaculty) => {
  const academicFaculty = new AcademicFaculty(payload);
  const result = await academicFaculty.save(); // built in instance method
  return result;
};
const getAllAcademicFacultyFromDB = async () => {
  const result = await AcademicFaculty.find();
  return result;
};
const getSingleAcademicFacultyFromDB = async (_id: string) => {
  const result = await AcademicFaculty.findOne({ _id });
  //const result = await AcademicFaculty.aggregate([{ $match: { _id: _id } }]);
  return result;
};

const updateAcademicFacultyFromDB = async (
  _id: string,
  updateFields: Partial<TAcademicFaculty>,
) => {
  const result = await AcademicFaculty.updateOne(
    { _id },
    { $set: updateFields },
  );
  return result;
};

export const AcademicFacultyService = {
  createAcademicFacultyInDB,
  getAllAcademicFacultyFromDB,
  getSingleAcademicFacultyFromDB,
  updateAcademicFacultyFromDB,
};
