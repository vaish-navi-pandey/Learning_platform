import React from 'react';
import { Link } from 'react-router-dom';
import Price from '../Price/Price';
import StarRating from '../StarRating/StarRating';
import classes from './thumbnails.module.css';

export default function Thumbnails({ courses }) {
  // Ensure courses is always defined and is an array
  if (!courses || !Array.isArray(courses) || courses.length === 0) {
    return <div></div>; // Display a message if there are no courses
  }

  return (
    <ul className={classes.list}>
      {courses.map(course => (
        <li key={course.id}>
          <Link to={`/course/${course.id}`}>
            <img
              className={classes.image}
              src={`${course.imageUrl}`} // Ensure the correct path for images
              alt={course.title} // Use course.title for alt text
            />

            <div className={classes.content}>
              <div className={classes.name}>{course.title}</div>
              <span
                className={`${classes.favorite} ${
                  course.favorite ? '' : classes.not
                }`}
              >
                ❤
              </span>
              <div className={classes.stars}>
                <StarRating stars={course.rating} />
              </div>
              <div className={classes.course_item_footer}> {/* Updated class name */}
                <div className={classes.origins}>
                  {course.origin && course.origin.length > 0 ? (
                    course.origin.map(origin => (
                      <span key={origin}>{origin}</span>
                    ))
                  ) : (
                    <span>Unknown origin</span> // Fallback if origin is not provided
                  )}
                </div>
                <div className={classes.duration}> {/* Updated to duration */}
                  <span></span>
                  {course.duration ? course.duration : 'N/A'} {/* Fallback if duration is not provided */}
                </div>
              </div>
              <div className={classes.price}>
                <Price price={course.price} />
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
