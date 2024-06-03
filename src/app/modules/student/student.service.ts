import mongoose from 'mongoose';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { User } from '../user/user.model';

const getAllStudentsFromDB = async (query: Record<string, undefined>) => {
  const queryObj = { ...query };

  // {{email: {$regex:query.searchTerm , $optioons:i }}
  const studentSearchableFields = [
    'email',
    'name.firstName',
    'presentAddress',
    'name.lastName',
    'contactNo',
  ];
  let searchTerm = ' ';
  if (query?.searchTerm) {
    searchTerm = query?.searchTerm as string;
  }

  const searchQuery = Student.find({
    $or: studentSearchableFields.map((field) => ({
      [field]: {
        $regex: searchTerm,
        $options: 'i',
      },
    })),
  });

  // filtering
  const excludeFields = ['searchTerm', 'sort', 'limit'];

  excludeFields.forEach((el) => delete queryObj[el]);
  const filterQuery = searchQuery
    .find(queryObj)
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  // sorting
  let sort = '-createdAt';
  if (query?.sort) {
    sort = query?.sort as string;
  }

  const sortQuery = filterQuery.sort(sort);

  // limiting
  let limit = 1;
  if (query?.limit) {
    limit = query?.limit as number;
  }
  const limitQuery = await sortQuery.limit(limit);
  return limitQuery;
};

// get single student
const getSingleStudentsFromDB = async (id: string) => {
  const result = await Student.findOne({ id })
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  //const result = await Student.aggregate([{ $match: { id: id } }]);
  return result;
};
const deleteStudentsFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const deletedStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session: session },
    );

    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete Student');
    }
    const deletedUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session: session },
    );

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete User');
    }
    await session.commitTransaction();
    await session.endSession();

    return deletedStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(' Failed to delete student');
  }
};

const updateStudentInToDB = async (id: string, payload: Partial<TStudent>) => {
  const { name, guardian, localGuardian, ...remainingStudentData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }
  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdatedData[`guardian.${key}`] = value;
    }
  }

  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdatedData[`localGuardian.${key}`] = value;
    }
  }
  console.log(modifiedUpdatedData);

  const result = await Student.findOneAndUpdate({ id }, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });
  return result;
};

export const StudentService = {
  getAllStudentsFromDB,
  getSingleStudentsFromDB,
  deleteStudentsFromDB,
  updateStudentInToDB,
};
