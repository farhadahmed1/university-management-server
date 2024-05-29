import { Schema, model } from 'mongoose';
import { TAcademicFaculty } from './academicFaculty.interface';
const academicFacultySchema = new Schema<TAcademicFaculty>(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'Name is required'],
      unique: true,
    },
  },
  {
    timestamps: true,
  },
);

export const AcademicFaculty = model<TAcademicFaculty>(
  'AcademicFaculty',
  academicFacultySchema,
);
