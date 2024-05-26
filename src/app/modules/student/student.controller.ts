import { Request, Response } from 'express';
import { StudentService } from './student.service';

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentService.getAllStudentsFromDB();
    res.status(200).json({
      success: true,
      message: 'Students are received successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'some think is wrong',
      data: err,
    });
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
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'some think is wrong',
      data: err,
    });
  }
};

const deleteStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await StudentService.deleteStudentsFromDB(studentId);
    res.status(200).json({
      success: true,
      message: 'Student is deleted successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'some think is wrong',
      data: err,
    });
  }
};
const updateSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const updateFields = req.body;
    const result = await StudentService.updateStudentFromDB(
      studentId,
      updateFields,
    );
    res.status(200).json({
      success: true,
      message: 'Student is updated successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      data: err,
    });
  }
};
export const StudentController = {
  getAllStudents,
  getSingleStudent,
  deleteStudent,
  updateSingleStudent,
};
