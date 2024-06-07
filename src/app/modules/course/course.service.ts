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

const updateCourseIntoDB = async (id: string, payload: Partial<TCourse>) => {
  const { preRequisiteCourses, ...remainingCourseData } = payload;

  // const modifiedUpdatedData: Record<string, unknown> = {
  //   ...remainingCourse,
  // };

  // if (preRequisiteCourses && Object.keys(preRequisiteCourses).length) {
  //   for (const [key, value] of Object.entries(preRequisiteCourses)) {
  //     modifiedUpdatedData[`name.${key}`] = value;
  //   }
  // }

  // step1 : basic course info update
  const updateBasicCourseInfo = await Course.findByIdAndUpdate(
    id,
    remainingCourseData,
    {
      new: true,
      runValidators: true,
    },
  );

  // check  if there is any pre requisite courses to update
  if (preRequisiteCourses && preRequisiteCourses.length > 0) {
    // filter out the deleted files
    const deletedPreRequisites = preRequisiteCourses
      .filter((el) => el.course && el.isDeleted)
      .map((el) => el.course);

    const deletedPreRequisiteCourses = await Course.findByIdAndUpdate(id, {
      $pull: {
        preRequisiteCourses: {
          course: { $in: deletedPreRequisites },
        },
      },
    });
    // filter out the new course fields
    const newPreRequisites = preRequisiteCourses?.filter(
      (el) => el.course && !el.isDeleted,
    );
    const newPreRequisiteCourses = await Course.findByIdAndUpdate(id, {
      $addToSet: { preRequisiteCourses: { $each: newPreRequisites } },
    });
  }
  const result = await Course.findById(id).populate(
    'preRequisiteCourses.course',
  );
  return result;
};

export const CourseServices = {
  createCourseIntoDB,
  getAllCoursesFromBD,
  getSingleCourseFromBD,
  deleteCourseFromBD,
  updateCourseIntoDB,
};
