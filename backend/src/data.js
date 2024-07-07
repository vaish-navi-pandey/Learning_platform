// Sample courses array
export const sample_courses = [
  {
    id: '1',
    title: 'Introduction to React',
    duration: '10-20 hours',
    price: 50,
    favorite: false,
    origin: ['web development', 'frontend'],
    rating: 4.5,
    description: [
      'This course provides a comprehensive introduction to React, one of the most popular JavaScript libraries for building user interfaces.',
      'You will learn about the core concepts of React, including components, state, and props.',
      'The course also covers more advanced topics like hooks, context, and routing.',
      'By the end of this course, you will be able to build dynamic and interactive web applications using React.'
    ],
    modules: [
      { "title": "Introduction to React", "url": "module1.pdf" },
      { "title": "Advanced Concepts", "url": "module2.pdf" }
    ],
    imageUrl: 'course-1.jpeg',
    tags: ['Web Development', 'React', 'JavaScript'], // Relevant tags

  },
  {
    id: '2',
    title: 'Advanced Python Programming',
    duration: '30-40 hours',
    price: 100,
    favorite: true,
    origin: ['programming', 'backend'],
    rating: 5.0,
    description: [
      'This course provides a comprehensive introduction to React, one of the most popular JavaScript libraries for building user interfaces.',
      'You will learn about the core concepts of React, including components, state, and props.',
      'The course also covers more advanced topics like hooks, context, and routing.',
      'By the end of this course, you will be able to build dynamic and interactive web applications using React.'
    ],
    modules: [
      { "title": "Introduction to React", "url": "module1.pdf" },
      { "title": "Advanced Concepts", "url": "module2.pdf" }
    ],
    imageUrl: 'course-2.png',
    tags: ['Programming', 'Python', 'Backend'],

  },
  {
    id: '3',
    title: 'Data Structures and Algorithms',
    duration: '40-50 hours',
    price: 75,
    favorite: false,
    origin: ['computer science', 'algorithms'],
    rating: 4.0,
    description: [
      'This course provides a comprehensive introduction to React, one of the most popular JavaScript libraries for building user interfaces.',
      'You will learn about the core concepts of React, including components, state, and props.',
      'The course also covers more advanced topics like hooks, context, and routing.',
      'By the end of this course, you will be able to build dynamic and interactive web applications using React.'
    ],
    modules: [
      { "title": "Introduction to React", "url": "module1.pdf" },
      { "title": "Advanced Concepts", "url": "module2.pdf" }
    ],
    imageUrl: 'course-3.jpeg',
    tags: ['Computer Science', 'Algorithms', 'Data Structures'],

  },
  {
    id: '4',
    title: 'Introduction to Machine Learning',
    duration: '50-60 hours',
    price: 120,
    favorite: true,
    origin: ['artificial intelligence', 'machine learning'],
    rating: 4.7,
    description: [
      'This course provides a comprehensive introduction to React, one of the most popular JavaScript libraries for building user interfaces.',
      'You will learn about the core concepts of React, including components, state, and props.',
      'The course also covers more advanced topics like hooks, context, and routing.',
      'By the end of this course, you will be able to build dynamic and interactive web applications using React.'
    ],
    modules: [
      { "title": "Introduction to React", "url": "module1.pdf" },
      { "title": "Advanced Concepts", "url": "module2.pdf" }
    ],
    imageUrl: 'course-4.jpeg',
    tags: ['AI', 'Machine Learning', 'Python'],

  },
  {
    id: '5',
    title: 'Basics of Graphic Design',
    duration: '15-25 hours',
    price: 30,
    favorite: false,
    origin: ['design', 'graphics'],
    rating: 3.8,
    description: [
      'This course provides a comprehensive introduction to React, one of the most popular JavaScript libraries for building user interfaces.',
      'You will learn about the core concepts of React, including components, state, and props.',
      'The course also covers more advanced topics like hooks, context, and routing.',
      'By the end of this course, you will be able to build dynamic and interactive web applications using React.'
    ],
    modules: [
      { "title": "Introduction to React", "url": "module1.pdf" },
      { "title": "Advanced Concepts", "url": "module2.pdf" }
    ],
    imageUrl: 'course-5.jpeg',
    tags: ['Design', 'Graphics', 'Creative'],

  },
  {
    id: '6',
    title: 'Full-Stack Web Development',
    duration: '80-100 hours',
    price: 150,
    favorite: true,
    origin: ['web development', 'full-stack'],
    rating: 4.9,
    description: [
      'This course provides a comprehensive introduction to React, one of the most popular JavaScript libraries for building user interfaces.',
      'You will learn about the core concepts of React, including components, state, and props.',
      'The course also covers more advanced topics like hooks, context, and routing.',
      'By the end of this course, you will be able to build dynamic and interactive web applications using React.'
    ],
    modules: [
      { "title": "Introduction to React", "url": "module1.pdf" },
      { "title": "Advanced Concepts", "url": "module2.pdf" }
    ],
    imageUrl: 'course-6.png',
    tags: ['Web Development', 'Full-Stack', 'JavaScript'],

  },
];


export const sample_tags = [
  { name: 'All', count: 6 }, 
  { name: 'Web Development', count: 3 }, 
  { name: 'Programming', count: 1 },
  { name: 'AI', count: 1 },
  { name: 'Design', count: 1 },
  { name: 'Creative', count: 1 }, 
  { name: 'Python', count: 2 }, 
  { name: 'JavaScript', count: 2 }, 
];


export const sample_users = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@gmail.com',
    password: '12345', // Note: Passwords should be hashed in real implementations
    address: 'Toronto, ON',
    isAdmin: false,
  },
  {
    id: 2,
    name: 'Jane Doe',
    email: 'jane@gmail.com',
    password: '12345',
    address: 'Shanghai, China',
    isAdmin: true,
  },
];
