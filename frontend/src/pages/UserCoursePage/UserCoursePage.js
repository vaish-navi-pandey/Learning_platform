// src/pages/UserCourse/UserCoursePage.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
    getCourseById,
    getUserCourseProgress,
    updatePdfProgress,
} from '../../services/enrollmentService';
import classes from './userCoursePage.module.css';

const UserCoursePage = () => {
    const { id } = useParams(); // Get the course ID from the URL
    const [course, setCourse] = useState(null);
    const [progress, setProgress] = useState(new Map());
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCourseData = async () => {
            try {
                setLoading(true);

                // Fetch course details
                const courseData = await getCourseById(id);
                setCourse(courseData);

                // Fetch user-specific course progress
                const progressData = await getUserCourseProgress(id);
                if (progressData) {
                    setProgress(new Map(Object.entries(progressData.progress || {})));
                }
            } catch (err) {
                setError('Failed to load course data.');
                console.error('Failed to fetch course details', err);
            } finally {
                setLoading(false);
            }
        };

        fetchCourseData();
    }, [id]);

    const handlePdfToggle = async (pdfUrl) => {
        const completed = !progress.get(pdfUrl);
        setProgress(new Map(progress.set(pdfUrl, completed)));

        try {
            await updatePdfProgress(id, pdfUrl, completed);
        } catch (error) {
            console.error('Failed to update PDF progress', error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!course) {
        return <div>Course not found</div>;
    }

    return (
        <div className={classes.courseDetails}>
            <h1>{course.title}</h1>
            <p>{course.description.join(' ')}</p>
            <h2>Study Materials</h2>
            <ul>
                {course.modules && course.modules.length > 0 ? (
                    course.modules.map((module, index) => (
                        <li key={index}>
                            <input
                                type="checkbox"
                                checked={progress.get(module.url) || false}
                                onChange={() => handlePdfToggle(module.url)}
                            />
                            <a href={module.url} target="_blank" rel="noopener noreferrer">
                                {module.title || `Module ${index + 1}`}
                            </a>
                        </li>
                    ))
                ) : (
                    <li>No modules available.</li>
                )}
            </ul>
        </div>
    );
};

export default UserCoursePage;
