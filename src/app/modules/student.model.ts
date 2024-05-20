import { Schema, model } from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';
import {
  StudentMethods,
  StudentModel,
  TGuardian,
  TLocalGuardian,
  TStudent,
  TUserName,
} from './student/student.interface';
import config from '../config';

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

const studentSchema = new Schema<TStudent, StudentModel, StudentMethods>(
  {
    id: { type: String, required: [true, 'Id is required '], unique: true },
    password: {
      type: String,
      required: [true, 'Password is required '],
      maxLength: [20, 'Password can not more then be 20 characters'],
    }, // Assuming 'id' is a student ID
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
    isDeleted: { type: Boolean, default: false },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

//virtual added

studentSchema.virtual('fullName').get(function () {
  return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`;
});

studentSchema.virtual('fullName').set(function (fullName: string) {
  const [firstName, middleName, lastName] = fullName.split(' ');
  this.name.firstName = firstName;
  this.name.middleName = middleName;
  this.name.lastName = lastName;
});

// document middleware
// create a pre save middleware
studentSchema.pre('save', async function (next) {
  // console.log(this, ' post hook : we saved our data');
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});
// create a post save middleware password hashing
studentSchema.post('save', async function (doc, next) {
  doc.password = '';
  next();
});
// Query middleware
studentSchema.pre('find', async function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
studentSchema.pre('findOne', async function (next) {
  this.findOne({ isDeleted: { $ne: true } });
  next();
});
studentSchema.pre('aggregate', async function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});
// creating a custom method

studentSchema.methods.isUserExists = async function name(id: string) {
  const existingStudent = await Student.findOne({ id });
  return existingStudent;
};

export const Student = model<TStudent, StudentModel>('Student', studentSchema);
