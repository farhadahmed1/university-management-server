import { Request, Response } from 'express';
import { StudentService } from './student.service';
import studentValidationSchema from './student.validator';

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body;

    // student validation  Zad using
    const zodParsedData = studentValidationSchema.parse(studentData);
    // will call service function  to send this data business logic all append services file
    const result = await StudentService.createStudentInDB(zodParsedData);

    // send response

    res.status(200).json({
      success: true,
      message: 'student created successfully',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'student are not created ',
      data: err,
    });
    console.log(err);
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentService.getAllStudentsFromDB();
    res.status(200).json({
      success: true,
      message: 'Students are received successfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await StudentService.getSingleStudentsFromDB(studentId);
    res.status(200).json({
      success: true,
      message: 'Student is received successfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};
export const StudentController = {
  createStudent,
  getAllStudents,
  getSingleStudent,
};
