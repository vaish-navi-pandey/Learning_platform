// src/services/enrollmentService.js

import axios from 'axios';
import { getUser } from './userService'; // Assuming you have a method to get the authenticated user and their token

export const enrollInCourse = async (courseId) => {
  try {
    const user = getUser();
    const token = user?.token; // Replace with actual method to get the token
    const response = await axios.post(
      '/api/enroll',
      { courseId },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Include token in headers
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error enrolling in course:', error);
    throw error;
  }
};

export const getEnrolledCourses = async () => {
    try {
      const user = getUser();
      const token = user?.token; 
      const response = await axios.get(
        '/api/enroll/my-courses',
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, 
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching enrolled courses:', error);
      throw error;
    }
  };
