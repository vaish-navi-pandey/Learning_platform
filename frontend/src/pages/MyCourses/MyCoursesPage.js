// src/pages/MyCourses/MyCoursesPage.js

import React, { useEffect, useState } from 'react';
import { getEnrolledCourses } from '../../services/enrollmentService';
import CourseCard from '../../components/CourseCard/CourseCard';
import classes from './myCoursesPage.module.css';

export default function MyCoursesPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      try {
        const data = await getEnrolledCourses();
        setCourses(data);
      } catch (err) {
        console.error('Error while fetching courses:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEnrolledCourses();
  }, []);

  if (loading) return <div>Loading your courses...</div>;
  if (error) return <div>Failed to load courses. Please try again later.</div>;

  return (
    <div className={classes.container}>
      <h1>My Courses</h1>
      <div className={classes.courseList}>
        {courses.length > 0 ? (
          courses.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))
        ) : (
          <p>You are not enrolled in any courses yet.</p>
        )}
      </div>
    </div>
  );
}
