import httpStatus from 'http-status';
import catchAsync from '../../middlewares/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CourseServices } from './course.service';

const createCourse = catchAsync(async (req, res) => {
  const result = await CourseServices.createCourseIntoDB(req.body);
  res.status(200).json({
    success: true,
    message: ' Course created successfully',
    data: result,
  });
});

const getAllCourses = catchAsync(async (req, res) => {
  const result = await CourseServices.getAllCoursesFromBD(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course are received successfully',
    data: result,
  });
});

const getSingleCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CourseServices.getSingleCourseFromBD(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'single Course received successfully',
    data: result,
  });
});

const deleteCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CourseServices.deleteCourseFromBD(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: ' Course deleted successfully',
    data: result,
  });
});
// const updateSingleAcademicFaculty = catchAsync(async (req, res) => {
//   const { facultyId } = req.params;
//   const updateFields = req.body;
//   const result = await AcademicFacultyService.updateAcademicFacultyFromDB(
//     facultyId,
//     updateFields,
//   );
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Academic Faculty is updated successfully',
//     data: result,
//   });
// });
export const CourseController = {
  createCourse,
  getAllCourses,
  getSingleCourse,
  deleteCourse,
};
