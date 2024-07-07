import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/Home/HomePage';
import CoursePage from './pages/Course/CoursePage';
import LoginPage from './pages/Login/LoginPage';
import RegisterPage from './pages/Register/RegisterPage';
import AuthRoute from './components/AuthRoute/AuthRoute';
import AdminRoute from './components/AdminRoute/AdminRoute';
import ProfilePage from './pages/Profile/ProfilePage';
import DashboardPage from './pages/Dashboard/DashboardPage';
import MyCoursesPage from './pages/MyCourses/MyCoursesPage';
import CoursesAdminPage from './pages/CoursesAdmin/CoursesAdminPage';
import CourseEditPage from './pages/CourseEdit/CourseEditPage';
import UserCoursePage from './pages/UserCoursePage/UserCoursePage';
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/search/:searchTerm" element={<HomePage />} />
      <Route path="/tag/:tag" element={<HomePage />} />
      <Route path="/course/:id" element={<CoursePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/user-course/:id" element={<UserCoursePage />} />

      <Route
        path="/profile"
        element={
          <AuthRoute>
            <ProfilePage />
          </AuthRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <AuthRoute>
            <DashboardPage />
          </AuthRoute>
        }
      />
      <Route
        path="/my-course"
        element={
          <AuthRoute>
            <MyCoursesPage />
          </AuthRoute>
        }
      />
      <Route
        path="/admin/courses/:searchTerm?"
        element={
          <AdminRoute>
            <CoursesAdminPage />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/addCourse"
        element={
          <AdminRoute>
            <CourseEditPage />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/editCourse/:courseId"
        element={
          <AdminRoute>
            <CourseEditPage />
          </AdminRoute>
        }
      />
    </Routes>
  );
}