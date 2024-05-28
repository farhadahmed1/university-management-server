import catchAsync from '../../middlewares/catchAsync';
import { AcademicSemesterServices } from './academicSemester.service';

const createAcademicSemester = catchAsync(async (req, res) => {
  const academicSemesterData = req.body;
  const result =
    await AcademicSemesterServices.createAcademicSemesterIntoDB(
      academicSemesterData,
    );
  res.status(200).json({
    success: true,
    message: 'Academic semester is created successfully',
    data: result,
  });
});

export const AcademicSemesterController = {
  createAcademicSemester,
};
