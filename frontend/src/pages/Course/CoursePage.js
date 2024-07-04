import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Price from '../../components/Price/Price';
import StarRating from '../../components/StarRating/StarRating';
import Tags from '../../components/Tags/Tags';
import { getById } from '../../services/courseService';
import { enrollInCourse } from '../../services/enrollmentService';
import classes from './coursePage.module.css';
import NotFound from '../../components/NotFound/NotFound';

export default function CoursePage() {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const data = await getById(id);
        setCourse(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  const handleEnroll = async () => {
    try {
      await enrollInCourse(id);
      alert('You have enrolled in the course!');
      // Optional: Redirect to "My Courses" page or update state to reflect enrollment
    } catch (err) {
      console.error('Failed to enroll:', err);
      alert('Failed to enroll in the course. Please try again later.');
    }
  };

  if (loading) return <NotFound message="Loading Course Details..." linkText="Back To Homepage" />;

  if (error) return <NotFound message="Course Not Found!" linkText="Back To Homepage" />;

  return (
    <div className={classes.container}>
      {course ? (
        <>
          <img className={classes.image} src={`${course.imageUrl}`} alt={course.title} />
          <div className={classes.details}>
            <div className={classes.header}>
              <h1 className={classes.title}>{course.title}</h1>
              <div className={classes.rating}>
                <StarRating stars={course.rating} size={25} />
              </div>
              <div className={course.favorite ? classes.favorite : classes.notFavorite}>
                ❤
              </div>
            </div>
            <div className={classes.instructor}>
              <strong>Instructor:</strong> {course.instructor}
            </div>
            <div className={classes.tags}>
              {course.tags && <Tags tags={course.tags.map(tag => ({ name: tag }))} />}
            </div>
            <div className={classes.description}>
              <h2>Course Description</h2>
              {course.description && course.description.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
            <div className={classes.modules}>
              <h2>Course Modules</h2>
              <ul>
                {course.modules.map((module, index) => (
                  <li key={index}>{module}</li>
                ))}
              </ul>
            </div>
            <div className={classes.price}>
              <Price price={course.price} />
            </div>
            <button className={classes.enrollButton} onClick={handleEnroll}>
              Enroll Now
            </button>
          </div>
        </>
      ) : (
        <NotFound message="Loading Course Details..." linkText="Back To Homepage" />
      )}
    </div>
  );
}
