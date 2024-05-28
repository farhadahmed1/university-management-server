import {
  TAcademicSemester,
  TAcademicSemesterNameCodeMapper,
} from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
  // semester name --> semester code

  const academicSemesterNameCodeMapper: TAcademicSemesterNameCodeMapper = {
    Autumn: '01',
    Summer: '02',
    Fall: '03',
  };

  // Fall
  if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new Error('Academic Semester Name and Code does not match');
  }
  const result = await AcademicSemester.create(payload);
  return result;
};

const getAllAcademicSemesterIntoDB = async () => {
  const result = await AcademicSemester.find();
  return result;
};
const getSingleAcademicSemesterIntoDB = async (_id: string) => {
  const result = await AcademicSemester.findOne({ _id });
  //const result = await AcademicSemester.aggregate([{ $match: { _id: _id } }]);
  return result;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const updateAcademicSemesterIntoDB = async (_id: string, updateFields: any) => {
  const result = await AcademicSemester.updateOne(
    { _id },
    { $set: updateFields },
  );
  return result;
};

export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
  getAllAcademicSemesterIntoDB,
  getSingleAcademicSemesterIntoDB,
  updateAcademicSemesterIntoDB,
};
