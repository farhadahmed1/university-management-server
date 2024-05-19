import { Schema, model } from 'mongoose';
import validator from 'validator';
import {
  StudentMethods,
  StudentModel,
  TGuardian,
  TLocalGuardian,
  TStudent,
  TUserName,
} from './student/student.interface';

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    trim: true,
    required: [true, 'First Name is required'],
    maxLength: [20, 'First name can not exceed 20 characters'],

    // validation functions
    // validate: {
    //   validator: function (value: string) {
    //     const capitalizedStr = value.charAt(0).toUpperCase() + value.slice(1);
    //     return capitalizedStr === value;
    //   },
    //   message: '{VALUE} is not in capitalized format',
    // },
  },
  middleName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, 'Last Name is required'],
    //   validate: {
    //     validator: (value: string) => validator.isAlpha(value),
    //   },
    //   message: '{VALUE} is not valid',
    // },
  },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: String,
  fatherOccupation: String,
  fatherContactNo: String,
  motherName: String,
  motherOccupation: String,
  motherContactNo: String,
});

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: { type: String, trim: true, required: true },
  occupation: String,
  contactNo: String,
  address: { type: String, required: true },
});

const studentSchema = new Schema<TStudent, StudentModel, StudentMethods>({
  id: { type: String, required: true, unique: true }, // Assuming 'id' is a student ID
  name: {
    type: userNameSchema,
    required: true,
  },
  gender: {
    type: String,
    // enum: {
    //   values: ['male', 'female', 'other'],
    //   message:
    //     "The gender field can only be one of the following :'male','female', or :'other'.",
    // },
  },
  dateOfBirth: Date,
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please enter a valid email'],
  },
  contactNo: {
    type: String,
    required: [true, 'Contact number is required'],
  },
  emergencyContact: String,
  bloodGroup: {
    type: String,
    enum: ['A+', 'B+', 'AB+', 'O+', 'A-', 'B-', 'AB-', 'O-'],
  },
  permanentAddress: String,
  presentAddress: { type: String, required: true },
  guardian: {
    type: guardianSchema,
    required: true,
  },
  localGuardian: {
    type: localGuardianSchema,
    required: true,
  },
  profileImg: String,
  isActive: { type: String, enum: ['active', 'disabled'], default: 'active' },
});

studentSchema.methods.isUserExists = async function name(id: string) {
  const existingStudent = await Student.findOne({ id });
  return existingStudent;
};

export const Student = model<TStudent, StudentModel>('Student', studentSchema);
