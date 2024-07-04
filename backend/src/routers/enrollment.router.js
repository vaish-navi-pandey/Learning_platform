// src/routers/enrollment.router.js

import { Router } from 'express';
import handler from 'express-async-handler';
import auth from '../middleware/auth.mid.js';
import { EnrolledCourseModel } from '../models/enrolledCourse.model.js';
import { CourseModel } from '../models/course.model.js';
import { UserModel } from '../models/user.model.js';
import { BAD_REQUEST } from '../constants/httpStatus.js';

const router = Router();
router.use(auth);

router.post(
  '/',
  handler(async (req, res) => {
    const { courseId } = req.body;
    const userId = req.user.id;

    // Check if the course exists
    const course = await CourseModel.findById(courseId);
    if (!course) {
      return res.status(BAD_REQUEST).send('Course not found');
    }

    // Check if the user is already enrolled
    const existingEnrollment = await EnrolledCourseModel.findOne({ user: userId, course: courseId });
    if (existingEnrollment) {
      return res.status(BAD_REQUEST).send('User already enrolled in this course');
    }

    // Create new enrollment record
    const enrolledCourse = new EnrolledCourseModel({ user: userId, course: courseId });
    await enrolledCourse.save();

    res.status(201).send(enrolledCourse);
  })
);

router.get(
  '/my-courses',
  handler(async (req, res) => {
    try {
      const userId = req.user.id;
      // Populate the course details along with the enrollments
      const enrollments = await EnrolledCourseModel.find({ user: userId }).populate('course');
      const enrolledCourses = enrollments.map(enrollment => enrollment.course);
      res.send(enrolledCourses);
    } catch (error) {
      console.error('Failed to fetch enrolled courses:', error);
      res.status(500).send('Failed to fetch enrolled courses');
    }
  })
);


export default router;
