import React, { useEffect, useReducer } from 'react';
import Thumbnails from '../../components/Thumbnails/Thumbnails'; // Assuming this is reusable, adjust as needed
import { getAll,search,getAllByTag,getAllTags, } from '../../services/courseService'; // Adjust service import for courses
import { useParams } from 'react-router-dom';
import Tags from '../../components/Tags/Tags';
import NotFound from '../../components/NotFound/NotFound';

import Search from '../../components/Search/Search';
const initialState = {
  courses: [],tags: []
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'COURSES_LOADED':
      return { ...state, courses: action.payload };
      case 'TAGS_LOADED':
        return { ...state, tags: action.payload };
    default:
      return state;
  }
};

export default function HomePage() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { courses,tags } = state;
  const { searchTerm,tag } = useParams();
  
  useEffect(() => {
    getAllTags().then(tags => dispatch({ type: 'TAGS_LOADED', payload: tags }));

    const loadCourses = tag
      ? getAllByTag(tag)
      : searchTerm
      ? search(searchTerm)
      : getAll();

    loadCourses.then(courses => dispatch({ type: 'COURSES_LOADED', payload: courses }));
  }, [searchTerm, tag]);

  return (
    <>
      <Search/>
      <Tags tags={tags}/>
      {courses.length === 0 && <NotFound linkText="Reset Search" />}
      <Thumbnails courses={courses} /> {/* Adjust props as per your Thumbnails component */}
    </>
  );
}
