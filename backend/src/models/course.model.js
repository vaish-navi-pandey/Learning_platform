import { model, Schema } from 'mongoose';

// Define the Course schema
export const CourseSchema = new Schema(
  {
    title: { type: String, required: true }, // Title of the course
    duration: { type: String, required: true }, // Duration of the course
    price: { type: Number, required: false },
    favorite: { type: Boolean, default: false },
    origin: { type: [String], required: false },
    rating: { type: Number, default: 0 }, // Rating of the course
    description: { type: [String], required: true },
    modules: { type: [String], required: true },
    imageUrl: { type: String, required: true },
    tags: { type: [String] },

  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },

    timestamps: true, // Timestamps for createdAt and updatedAt
  }
);

// Create and export the Course model
export const CourseModel = model('course', CourseSchema);
