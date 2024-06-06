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
  const result = await courseQuery;
  return result;
};
const getSingleCourseFromBD = async (id: string) => {
  const result = await Course.findById(id);
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

export const CourseServices = {
  createCourseIntoDB,
  getAllCoursesFromBD,
  getSingleCourseFromBD,
  deleteCourseFromBD,
};
