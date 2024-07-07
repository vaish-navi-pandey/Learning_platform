import { Router } from 'express';
import { CourseModel } from '../models/course.model.js';
import handler from 'express-async-handler';
import admin from '../middleware/admin.mid.js';
import auth from '../middleware/auth.mid.js';


const router = Router();

router.get(
  '/',
  handler(async (req, res) => {
    const courses = await CourseModel.find({});
    res.send(courses);
  })
);



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


      res.status(201).send({ message: 'Course added successfully', course });
    } catch (error) {

      console.error('Error while adding course:', error);
      res.status(500).send({ error: 'Failed to add course' });
    }
  })
);



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

router.delete(
  '/:courseId',
  admin,
  handler(async (req, res) => {
    const { courseId } = req.params;
    await CourseModel.deleteOne({ _id: courseId });
    res.send();
  })
);


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


router.get(
  '/search/:searchTerm',
  handler(async (req, res) => {
    const { searchTerm } = req.params;
    const searchRegex = new RegExp(searchTerm, 'i');

    const courses = await CourseModel.find({ title: { $regex: searchRegex } });
    res.send(courses);
  })
);


router.get(
  '/tag/:tag',
  handler(async (req, res) => {
    const { tag } = req.params;
    const courses = await CourseModel.find({ tags: tag });
    res.send(courses);
  })
);

router.get(
  '/:courseId',
  handler(async (req, res) => {
    const { courseId } = req.params;
    const course = await CourseModel.findById(courseId);
    res.send(course);
  })
);

router.get(
  '/:courseId/pdfs',
  auth,
  handler(async (req, res) => {
    const { courseId } = req.params;
    const course = await CourseModel.findById(courseId);

    if (!course) {
      return res.status(404).send({ message: 'Course not found' });
    }

    
    const pdfs = course.modules.split(',').map(url => url.trim());

    res.send(pdfs);
  })
);


export default router;
