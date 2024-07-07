// src/services/enrollmentService.js

import axios from 'axios';
import { getUser } from './userService'; // Assuming this retrieves the authenticated user's token

// Service to enroll in a course
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
// Service to fetch the details of a specific course by ID
export const getCourseById = async (courseId) => {
  try {
    const user = getUser();
    const token = user?.token;
    const response = await axios.get(
      `/api/courses/${courseId}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching course details:', error);
    throw error;
  }
};

// Service to fetch the user's specific course progress
export const getUserCourseProgress = async (courseId) => {
  try {
    const user = getUser();
    const token = user?.token;
    const response = await axios.get(
      `/api/enroll/${courseId}/progress`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching user course progress:', error);
    throw error;
  }
};

// Service to update the progress of a PDF module in a course
export const updatePdfProgress = async (courseId, pdfUrl, completed) => {
  try {
    const user = getUser();
    const token = user?.token;
    const response = await axios.patch(
      `/api/enroll/${courseId}/pdf-progress`,
      { pdfUrl, completed },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error updating PDF progress:', error);
    throw error;
  }
};
