import { useState } from 'react';
import classes from './Navbar.module.css';
import { LuCalendarClock, LuDrama, LuHouse, LuUsers } from 'react-icons/lu';
import { Link } from 'react-router';
import { AppHeader } from '../AppHeader/AppHeader';
import { useAuth } from '../../Auth/AuthContext';

const data = [
  { link: '/', label: 'Home', icon: LuHouse },
  { link: '/pacientes', label: 'Pacientes' , icon: LuUsers },
  { link: '/problemas', label: 'Queixas/Suspeitas', icon: LuDrama },
  { link: '/consultas', label: 'Consultas', icon: LuCalendarClock },
];

export function Navbar() {
  const [active, setActive] = useState('Billing');
  const { logout } = useAuth();

  const links = data.map((item) => (
    <Link
      className={classes.link}
      data-active={item.label === active || undefined}
      to={item.link}
      key={item.label}
      // onClick={(event) => {
      //   event.preventDefault();
      //   setActive(item.label);
      // }}
    >
      {item.icon && <item.icon className={classes.linkIcon} strokeWidth='1.5' />}
      <span>{item.label}</span>
    </Link>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <AppHeader />
        {links}
      </div>

      <div className={classes.footer}>
        <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
          <span>Change account</span>
        </a>

        <a href="#" className={classes.link} onClick={logout}>
          <span>Logout</span>
        </a>
      </div>
    </nav>
  );
}