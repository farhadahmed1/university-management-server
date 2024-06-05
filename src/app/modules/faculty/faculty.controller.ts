import { FacultyService } from './faculty.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../middlewares/catchAsync';
import { RequestHandler } from 'express';

const getAllFaculties: RequestHandler = catchAsync(async (req, res) => {
  const result = await FacultyService.getAllFacultyFromDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty are received successfully',
    data: result,
  });
});

const getSingleFaculties = catchAsync(async (req, res) => {
  const { facultyId } = req.params;
  const result = await FacultyService.getSingleFacultyFromDB(facultyId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'single Faculty received successfully',
    data: result,
  });
});

const deleteFaculties = catchAsync(async (req, res) => {
  const { facultyId } = req.params;
  const result = await FacultyService.deleteFacultyFromDB(facultyId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty is deleted successfully',
    data: result,
  });
});
const updateFaculties = catchAsync(async (req, res) => {
  const { facultyId } = req.params;
  const { faculty } = req.body;
  const result = await FacultyService.updateFacultyInToDB(facultyId, faculty);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty is updated successfully',
    data: result,
  });
});
export const FacultyController = {
  getAllFaculties,
  updateFaculties,
  deleteFaculties,
  getSingleFaculties,
};
