import axios from 'axios';

// Fetch all courses
export const getAll = async () => {
  const { data } = await axios.get('/api/courses'); // Changed endpoint to /api/courses
  return data;
};

// Search courses by search term
export const search = async searchTerm => {
  const { data } = await axios.get('/api/courses/search/' + searchTerm); // Changed endpoint to /api/courses/search/
  return data;
};

// Fetch all tags
export const getAllTags = async () => {
  const { data } = await axios.get('/api/courses/tags'); // Changed endpoint to /api/courses/tags
  return data;
};

// Fetch all courses by tag
export const getAllByTag = async tag => {
  if (tag === 'All') return getAll(); // If tag is 'All', fetch all courses
  const { data } = await axios.get('/api/courses/tag/' + tag); // Changed endpoint to /api/courses/tag/
  return data;
};

// Fetch course by ID
export const getById = async courseId => {
  const { data } = await axios.get('/api/courses/' + courseId); // Changed endpoint to /api/courses/
  return data;
};

export async function deleteById(courseId) {
  await axios.delete('/api/courses/' + courseId);
}

export async function update(course) {
  await axios.put('/api/courses', course);
}

export async function add(course) {
  const { data } = await axios.post('/api/courses', course);
  return data;
}

