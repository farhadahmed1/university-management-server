import { TCourse } from './course.interface';
import { Course } from './course.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { CourseSearchableFields } from './course.constant';

const createCourseIntoDB = async (payload: TCourse) => {
  const result = await Course.create(payload);
  return result;
};

const getAllCoursesFromBD = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(
    Course.find().populate('preRequisiteCourses.course'),
    query,
  )
    .search(CourseSearchableFields)
    .fields()
    .filter()
    .sort()
    .paginate();
  const result = await courseQuery.modelQuery;
  return result;
};
const getSingleCourseFromBD = async (id: string) => {
  const result = await Course.findById(id).populate(
    'preRequisiteCourses.course',
  );
  return result;
};
const deleteCourseFromBD = async (id: string) => {
  const result = await Course.findByIdAndUpdate(
    id,
    {
      isDeleted: true,
    },
    {
      new: true,
    },
  );
  return result;
};

const updateCourseIntoDB = async (_id: string, payload: Partial<TCourse>) => {
  const { preRequisiteCourses, ...remainingCourse } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingCourse,
  };

  if (preRequisiteCourses && Object.keys(preRequisiteCourses).length) {
    for (const [key, value] of Object.entries(preRequisiteCourses)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  const result = await Course.findByIdAndUpdate({ _id }, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });
  return result;
};

export const CourseServices = {
  createCourseIntoDB,
  getAllCoursesFromBD,
  getSingleCourseFromBD,
  deleteCourseFromBD,
  updateCourseIntoDB,
};
