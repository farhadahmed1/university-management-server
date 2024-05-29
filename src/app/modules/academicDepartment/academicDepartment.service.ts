import { TAcademicDepartment } from './academicDepartment.interface';
import { AcademicDepartment } from './academicDepartment.model';

const createAcademicDepartmentInDB = async (payload: TAcademicDepartment) => {
  const academicFaculty = new AcademicDepartment(payload);
  const result = await academicFaculty.save(); // built in instance method
  return result;
};
const getAllAcademicDepartmentFromDB = async () => {
  const result = await AcademicDepartment.find().populate('academicFaculty');
  return result;
};
const getSingleAcademicDepartmentFromDB = async (_id: string) => {
  const result = await AcademicDepartment.findOne({ _id }).populate(
    'academicFaculty',
  );
  // const objectId = new ObjectId(_id);
  // const result = await AcademicDepartment.aggregate([
  //   { $match: { _id: objectId } },
  // ]);

  return result;
};

const updateAcademicDepartmentFromDB = async (
  _id: string,
  updateFields: Partial<TAcademicDepartment>,
) => {
  const result = await AcademicDepartment.findOneAndUpdate(
    { _id },
    { $set: updateFields },
    {
      new: true,
    },
  );
  return result;
};

export const AcademicDepartmentService = {
  createAcademicDepartmentInDB,
  getAllAcademicDepartmentFromDB,
  getSingleAcademicDepartmentFromDB,
  updateAcademicDepartmentFromDB,
};
