// src/components/CourseCard/CourseCard.js

import React from 'react';
import { Link } from 'react-router-dom';
import classes from './courseCard.module.css';

export default function CourseCard({ course }) {
  return (
    <div className={classes.courseCard}>
      <img src={course.imageUrl} alt={course.title} />
      <h2>{course.title}</h2>
      <p>{course.instructor}</p>
      <Link to={`/course/${course._id}`}>View Course</Link>
    </div>
  );
}
