import { connect, set } from 'mongoose';
import { UserModel } from '../models/user.model.js';
import { sample_users } from '../data.js';
import { sample_courses } from '../data.js';
import bcrypt from 'bcryptjs';
import { CourseModel } from '../models/course.model.js';
const PASSWORD_HASH_SALT_ROUNDS = 10;
set('strictQuery', true);

export const dbconnect = async () => {
  try {
    connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await seedUsers();
    await seedCourses();
    console.log('connect successfully---');
  } catch (error) {
    console.log(error);
  }
};

async function seedUsers() {
  const usersCount = await UserModel.countDocuments();
  if (usersCount > 0) {
    console.log('Users seed is already done!');
    return;
  }

  for (let user of sample_users) {
    user.password = await bcrypt.hash(user.password, PASSWORD_HASH_SALT_ROUNDS);
    await UserModel.create(user);
  }

  console.log('Users seed is done!');
}

async function seedCourses() {
  const courses = await CourseModel.countDocuments();
  if (courses > 0) {
    console.log('Courses seed is already done!');
    return;
  }

  for (const course of sample_courses) {
    course.imageUrl = `/courses/${course.imageUrl}`;
    await CourseModel.create(course);
  }

  console.log('Courses seed Is Done!');
}