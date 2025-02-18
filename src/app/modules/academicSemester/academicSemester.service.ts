import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import {
  academicSemesterNameCodeMapper,
  AcademicSemesterSearchableFields,
} from './academicSemester.constant';
import { TAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';
import QueryBuilder from '../../builder/QueryBuilder';

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
  // semester name --> semester code

  // Fall
  if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new AppError(
      httpStatus.NOT_ACCEPTABLE,
      'Academic Semester Name and Code does not match',
    );
  }
  const result = await AcademicSemester.create(payload);
  return result;
};
const getAllAcademicSemesterIntoDB = async (query: Record<string, unknown>) => {
  const academicSemesterQuery = new QueryBuilder(AcademicSemester.find(), query)
    .search(AcademicSemesterSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await academicSemesterQuery.modelQuery;
  //const meta = await academicSemesterQuery.;

  return {
    //meta,
    result,
  };
};

// const getAllAcademicSemesterIntoDB = async () => {
//   const result = await AcademicSemester.find();
//   return result;
// };
const getSingleAcademicSemesterIntoDB = async (_id: string) => {
  const result = await AcademicSemester.findOne({ _id });
  //const result = await AcademicSemester.aggregate([{ $match: { _id: _id } }]);
  return result;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const updateAcademicSemesterIntoDB = async (
  _id: string,
  payload: Partial<TAcademicSemester>,
) => {
  if (
    payload.name &&
    payload.code &&
    academicSemesterNameCodeMapper[payload.name] !== payload.code
  ) {
    throw new AppError(
      httpStatus.NOT_ACCEPTABLE,
      'Academic Semester Name and Code does not match',
    );
  }
  const result = await AcademicSemester.updateOne({ _id }, { $set: payload });
  return result;
};

export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
  getAllAcademicSemesterIntoDB,
  getSingleAcademicSemesterIntoDB,
  updateAcademicSemesterIntoDB,
};
