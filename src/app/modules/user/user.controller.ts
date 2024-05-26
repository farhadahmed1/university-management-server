import { Request, Response } from 'express';
import { UserService } from './user.service';

const createStudent = async (req: Request, res: Response) => {
  try {
    const { password, student: studentData } = req.body;

    // student validation  Zad using
    // const zodParsedData =
    //   userValidation.userValidationSchema.parse(studentData);
    // will call service function  to send this data business logic all append services file
    const result = await UserService.createStudentIntoDB(password, studentData);

    // send response

    res.status(200).json({
      success: true,
      message: 'student created successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'student are not created ',
      data: err,
    });
  }
};

export const UserController = {
  createStudent,
};
