// src/pages/Course/CoursePage.js

import React, { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import axios from 'axios';
import classes from './coursePage.module.css';

const CoursePage = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch course details
    const fetchCourseDetails = async () => {
      try {
        const { data } = await axios.get(`/api/courses/${id}`);
        setCourse(data);
      } catch (error) {
        console.error('Failed to fetch course details', error);
      }
    };

    // Check if user is enrolled
    const checkEnrollment = async () => {
      try {
        const { data } = await axios.get('/api/enroll/my-courses', {
          headers: { access_token: localStorage.getItem('access_token') },
        });
        const enrolledCourse = data.find((course) => course._id === id);
        if (enrolledCourse) {
          setIsEnrolled(true);
        }
      } catch (error) {
        console.error('Failed to check enrollment', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
    checkEnrollment();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (isEnrolled) {
    // Redirect to the user-specific course page if enrolled
    return <Navigate to={`/user-course/${id}`} />;
  }

  if (!course) {
    return <div>Course not found</div>;
  }

  return (
    <div className={classes.coursePage}>
      <img src={course.imageUrl} alt={course.title} />
      <h1>{course.title}</h1>
      <p>{course.description.join(' ')}</p>
      {/* You can add an enrollment button here if needed */}
    </div>
  );
};

export default CoursePage;
