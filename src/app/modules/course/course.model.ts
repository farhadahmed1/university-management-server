import { Schema, model } from 'mongoose';
import { TCourse, TPreRequisiteCourses } from './course.interface';

const preRequisiteCoursesSchema = new Schema<TPreRequisiteCourses>({
  course: {
    type: Schema.Types.ObjectId,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const courseSchema = new Schema<TCourse>({
  title: {
    type: String,
    trim: true,
    required: [true, 'Name is required'],
    unique: true,
  },
  prefix: {
    type: String,
    trim: true,
    required: [true, 'Name is required'],
  },
  code: {
    type: Number,
    trim: true,
    required: [true, 'Name is required'],
  },
  credits: {
    type: Number,
    trim: true,
    required: [true, 'Name is required'],
  },
  preRequisiteCourses: [preRequisiteCoursesSchema],
});

export const Course = model<TCourse>('Course', courseSchema);
