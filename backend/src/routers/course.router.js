import { Router } from 'express';
import { CourseModel } from '../models/course.model.js';
import handler from 'express-async-handler';
import admin from '../middleware/admin.mid.js';
import auth from '../middleware/auth.mid.js';


const router = Router();



// Get all courses
router.get(
  '/',
  handler(async (req, res) => {
    const courses = await CourseModel.find({});
    res.send(courses);
  })
);


// Inside course.router.js
router.post(
  '/',
  admin,
  handler(async (req, res) => {
    try {
      const {
        title,
        duration,
        price,
        favorite,
        origin,
        rating,
        description,
        imageUrl,
        tags,
        modules
      } = req.body;

      // Log the received data for debugging
      console.log('Received data:', req.body);

      const course = new CourseModel({
        title,
        duration,
        price,
        favorite,
        origin: origin.split(','),
        rating,
        description: description.split('\n'),
        modules: modules ? modules.split(',') : [],
        imageUrl,
        tags: tags.split(',')
      });

      await course.save();

      // Send a proper JSON response
      res.status(201).send({ message: 'Course added successfully', course });
    } catch (error) {
      // Log the error for debugging
      console.error('Error while adding course:', error);
      res.status(500).send({ error: 'Failed to add course' });
    }
  })
);



// Update an existing course
router.put(
  '/',
  auth,
  handler(async (req, res) => {
    const { id, title, duration, price, favorite, imageUrl, origin, rating, description, tags } = req.body;

    await CourseModel.updateOne(
      { _id: id },
      {
        title,
        duration,
        price,
        favorite,
        imageUrl,
        origin: origin.split ? origin.split(',') : origin,
        rating,
        description: description.split ? description.split('\n') : description,
        tags: tags.split ? tags.split(',') : tags,
      }
    );

    res.send();
  })
);

// Delete a course by ID
router.delete(
  '/:courseId',
  admin,
  handler(async (req, res) => {
    const { courseId } = req.params;
    await CourseModel.deleteOne({ _id: courseId });
    res.send();
  })
);

// Get a list of unique tags with their count
router.get(
  '/tags',
  handler(async (req, res) => {
    const tags = await CourseModel.aggregate([
      {
        $unwind: '$tags',
      },
      {
        $group: {
          _id: '$tags',
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          name: '$_id',
          count: '$count',
        },
      },
    ]).sort({ count: -1 });

    const all = {
      name: 'All',
      count: await CourseModel.countDocuments(),
    };

    tags.unshift(all);

    res.send(tags);
  })
);

// Search for courses by title
router.get(
  '/search/:searchTerm',
  handler(async (req, res) => {
    const { searchTerm } = req.params;
    const searchRegex = new RegExp(searchTerm, 'i');

    const courses = await CourseModel.find({ title: { $regex: searchRegex } });
    res.send(courses);
  })
);

// Get courses by tag
router.get(
  '/tag/:tag',
  handler(async (req, res) => {
    const { tag } = req.params;
    const courses = await CourseModel.find({ tags: tag });
    res.send(courses);
  })
);

// Get a course by ID
router.get(
  '/:courseId',
  handler(async (req, res) => {
    const { courseId } = req.params;
    const course = await CourseModel.findById(courseId);
    res.send(course);
  })
);

export default router;
