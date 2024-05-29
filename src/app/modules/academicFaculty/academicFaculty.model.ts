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
academicFacultySchema.pre('save', async function (next) {
  const isFacultyExist = await AcademicFaculty.findOne({
    name: this.name,
  });
  if (isFacultyExist) {
    return next(new Error('Academic Faculty already exists'));
  }
  next();
});
export const AcademicFaculty = model<TAcademicFaculty>(
  'AcademicFaculty',
  academicFacultySchema,
);
