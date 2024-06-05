import { Schema, model } from 'mongoose';

// import bcrypt from 'bcrypt';
import { FacultyMethod, TFaculty, TUserName } from './faculty.interface';
import { BloodGroup, Gender } from './faculty.constant';
//import config from '../../config';

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    trim: true,
    required: [true, 'First Name is required'],
    maxLength: [20, 'First name can not exceed 20 characters'],
  },
  middleName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, 'Last Name is required'],
  },
});

const facultySchema = new Schema<TFaculty, FacultyMethod>(
  {
    id: {
      type: String,
      required: [true, 'ID is required'],
      unique: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User id is required'],
      unique: true,
      ref: 'User',
    },
    designation: {
      type: String,
      required: [true, 'Designation is required'],
    },
    name: {
      type: userNameSchema,
      required: [true, 'Name is required'],
    },
    gender: {
      type: String,
      enum: {
        values: Gender,
        message: '{VALUE} is not a valid gender',
      },
      required: [true, 'Gender is required'],
    },
    dateOfBirth: { type: Date },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    contactNo: { type: String, required: [true, 'Contact number is required'] },
    emergencyContactNo: {
      type: String,
      required: [true, 'Emergency contact number is required'],
    },
    bloodGroup: {
      type: String,
      enum: {
        values: BloodGroup,
        message: '{VALUE} is not a valid blood group',
      },
    },
    presentAddress: {
      type: String,
      required: [true, 'Present address is required'],
    },
    permanentAddress: {
      type: String,
      required: [true, 'Permanent address is required'],
    },
    profileImg: { type: String },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      required: [true, 'academicDepartment id is required'],
      ref: 'AcademicDepartment',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

//virtual added

facultySchema.virtual('fullName').get(function () {
  return `${this.name?.firstName} ${this.name?.middleName} ${this.name?.lastName}`;
});

facultySchema.virtual('fullName').set(function (fullName: string) {
  const [firstName, middleName, lastName] = fullName.split(' ');
  this.name.firstName = firstName;
  this.name.middleName = middleName;
  this.name.lastName = lastName;
});

// Query middleware
//student email validation
facultySchema.pre('save', async function (next) {
  const isStudentExist = await Faculty.findOne({
    email: this.email,
  });
  if (isStudentExist) {
    return next(new Error('This Faculty already exists'));
  }
  next();
});
facultySchema.pre('find', async function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
facultySchema.pre('findOne', async function (next) {
  this.findOne({ isDeleted: { $ne: true } });
  next();
});
facultySchema.pre('aggregate', async function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});
// creating a custom method

facultySchema.methods.isUserExists = async function name(id: string) {
  const existingFaculty = await Faculty.findOne({ id });
  return existingFaculty;
};

export const Faculty = model<TFaculty, FacultyMethod>('Faculty', facultySchema);
