import { UserService } from './user.service';
import catchAsync from '../../middlewares/catchAsync';

const createStudent = catchAsync(async (req, res) => {
  const { password, student: studentData } = req.body;
  const result = await UserService.createStudentIntoDB(password, studentData);
  res.status(200).json({
    success: true,
    message: 'student created successfully',
    data: result,
  });
});

const createFaculty = catchAsync(async (req, res) => {
  const { password, faculty: facultyData } = req.body;
  const result = await UserService.createFacultyIntoDB(password, facultyData);
  res.status(200).json({
    success: true,
    message: 'Faculty created successfully',
    data: result,
  });
});

export const UserController = {
  createStudent,
  createFaculty,
};
