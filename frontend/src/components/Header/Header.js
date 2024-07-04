import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import classes from './header.module.css';

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className={classes.header}>
      <div className={classes.container}>
        <Link to="/" className={classes.logo}>
          Learn Together!
        </Link>
        <nav>
          <ul>
            {user ? (
              <>
                <li className={classes.menu_container}>
                  <Link to="/dashboard" className={classes.username}>{user.name}</Link>
                  <div className={classes.menu}>
                    <Link to="/profile">Profile</Link>
                    <Link to="/my-course">My Courses</Link>
                    <Link to="/settings">Settings</Link>
                    <a onClick={logout}>Logout</a>
                  </div>
                </li>
                <li>
                  <Link to="/notifications">Notifications</Link>
                </li>
              </>
            ) : (
              <Link to="/login">Login</Link>
            )}

            <li>
              <Link to="/courses">Courses</Link>
            </li>
            <li>
              <Link to="/library">Library</Link>
            </li>
            <li>
              <Link to="/community">Community</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
