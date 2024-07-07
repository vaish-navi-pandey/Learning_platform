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


    const course = await CourseModel.findById(courseId);
    if (!course) {
      return res.status(BAD_REQUEST).send('Course not found');
    }

    const existingEnrollment = await EnrolledCourseModel.findOne({ user: userId, course: courseId });
    if (existingEnrollment) {
      return res.status(BAD_REQUEST).send('User already enrolled in this course');
    }


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

      const enrollments = await EnrolledCourseModel.find({ user: userId }).populate({
        path: 'course',
        model: 'course',
        select: 'title description imageUrl modules',
      });

      const enrolledCourses = enrollments.map(enrollment => enrollment.course);
      res.send(enrolledCourses);
    } catch (error) {
      console.error('Failed to fetch enrolled courses:', error);
      res.status(500).send('Failed to fetch enrolled courses');
    }
  })
);


router.patch(
  '/:courseId/pdf-progress',
  handler(async (req, res) => {
    const { courseId } = req.params;
    const { pdfUrl, completed } = req.body;
    const userId = req.user.id;

    const enrolledCourse = await EnrolledCourseModel.findOne({ user: userId, course: courseId });
    if (!enrolledCourse) {
      return res.status(404).send('Enrollment not found');
    }

    enrolledCourse.progress.set(pdfUrl, completed);
    await enrolledCourse.save();

    res.send(enrolledCourse);
  })
);


export default router;
