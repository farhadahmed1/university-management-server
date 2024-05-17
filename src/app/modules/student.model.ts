import { Schema, model } from 'mongoose';
import {
  Guardian,
  LocalGuardian,
  Student,
  UserName,
} from './student/student.interface';

const userNameSchema = new Schema<UserName>({
  firstName: { type: String, required: true },
  middleName: String,
  lastName: { type: String, required: true },
});

const guardianSchema = new Schema<Guardian>({
  fatherName: String,
  fatherOccupation: String,
  fatherContactNo: String,
  motherName: String,
  motherOccupation: String,
  motherContactNo: String,
});

const localGuardianSchema = new Schema<LocalGuardian>({
  name: { type: String, required: true },
  occupation: String,
  contactNo: String,
  address: { type: String, required: true },
});

const studentSchema = new Schema<Student>({
  id: { type: String, required: true, unique: true }, // Assuming 'id' is a student ID
  name: userNameSchema,
  gender: { type: String, enum: ['male', 'female'] },
  dateOfBirth: Date,
  email: { type: String, required: true, unique: true },
  contactNo: String,
  emergencyContact: String,
  bloodGroup: {
    type: String,
    enum: ['A+', 'B+', 'AB+', 'O+', 'A-', 'B-', 'AB-', 'O-'],
  },
  permanentAddress: String,
  presentAddress: { type: String, required: true },
  guardian: guardianSchema,
  localGuardian: localGuardianSchema,
  profileImg: String,
  isActive: { type: String, enum: ['active', 'disabled'], default: 'active' },
});

export const StudentModel = model<Student>('Student', studentSchema);
