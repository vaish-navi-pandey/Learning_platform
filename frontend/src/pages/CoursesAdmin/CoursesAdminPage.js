import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getAll, search } from '../../services/courseService'; // Use the correct service methods
import classes from './coursesAdminPage.module.css';
import NotFound from '../../components/NotFound/NotFound';
import Title from '../../components/Title/Title';
import Search from '../../components/Search/Search';

export default function CoursesAdminPage() {
    const [courses, setCourses] = useState([]);
    const { searchTerm } = useParams();

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const fetchedCourses = searchTerm ? await search(searchTerm) : await getAll();
                setCourses(fetchedCourses);
            } catch (error) {
                console.error('Error loading courses:', error);
            }
        };

        fetchCourses();
    }, [searchTerm]);

    const CoursesNotFound = () => {
        if (courses && courses.length > 0) return null;

        return searchTerm ? (
            <NotFound linkRoute="/admin/courses" linkText="Show All" />
        ) : (
            <NotFound linkRoute="/dashboard" linkText="Back to Dashboard!" />
        );
    };

    return (
        <div className={classes.container}>
            <div className={classes.list}>
                <Title title="Manage Courses" margin="1rem auto" />
                <Search
                    searchRoute="/admin/courses/"
                    defaultRoute="/admin/courses"
                    margin="1rem 0"
                    placeholder="Search Courses"
                />
                <Link to="/admin/addCourse" className={classes.add_course}>
                    Add Course +
                </Link>
                <CoursesNotFound />
                {courses &&
                    courses.map(course => (
                        <div key={course.id} className={classes.list_item}>
                            <img src={course.imageUrl} alt={course.name} />
                            <Link to={'/course/' + course.id}>{course.name}</Link>
                            <div className={classes.duration}>Duration: {course.duration} hours</div>
                            <div className={classes.actions}>
                                <Link to={'/admin/editCourse/' + course.id}>Edit</Link>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
}
