import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import classes from './dashboardPage.module.css';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { user } = useAuth();

  // Filter items based on user's role
  const filteredItems = allItems.filter(item => {
    // Admin can see all items except 'My Courses'
    if (user.isAdmin && item.title === 'My Courses') return false;
    // Non-admin users can see all items except admin-specific ones
    return user.isAdmin || !item.forAdmin;
  });

  return (
    <div className={classes.container}>
      <div className={classes.menu}>
        {filteredItems.map(item => (
          <Link
            key={item.title}
            to={item.url}
            className={classes.menuItem}
            style={{
              backgroundColor: item.bgColor,
              color: item.color,
            }}
          >
            <img src={item.imageUrl} alt={item.title} className={classes.icon} />
            <h2>{item.title}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}

const allItems = [
  {
    title: 'Profile',
    imageUrl: '/icons/profile.svg',
    url: '/profile',
    bgColor: '#00bfa5', // Blue
    color: 'white',
  },
  {
    title: 'My Courses',
    imageUrl: '/icons/courses.svg',
    url: '/my-course',
    bgColor: '#00bfa5', // Orange
    color: 'white',
  },
  {
    title: 'Manage Users',
    imageUrl: '/icons/users.svg',
    url: '/admin/users',
    forAdmin: true,
    bgColor: '#00bfa5', // Teal
    color: 'white',
  },
  {
    title: 'Course Structure',
    imageUrl: '/icons/structure.svg',
    url: '/admin/courses',
    forAdmin: true,
    bgColor: '#00bfa5', // Purple
    color: 'white',
  },
];
