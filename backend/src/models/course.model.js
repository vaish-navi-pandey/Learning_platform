import { model, Schema } from 'mongoose';

// Define the Course schema
const ModuleSchema = new Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
});

export const CourseSchema = new Schema(
  {
    title: { type: String, required: true },
    duration: { type: String, required: true },
    price: { type: Number, required: false },
    favorite: { type: Boolean, default: false },
    origin: { type: [String], required: false },
    rating: { type: Number, default: 0 },
    description: { type: [String], required: true },
    imageUrl: { type: String, required: true },
    tags: { type: [String] },
    modules: [ModuleSchema],  // Ensure modules are defined as an array of ModuleSchema
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
    timestamps: true,
  }
);

export const CourseModel = model('course', CourseSchema);
