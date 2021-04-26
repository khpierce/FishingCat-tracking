import React, { useState } from 'react';
import './Navbar2.css';
import { FaBars, FaTimes, FaCat } from 'react-icons/fa';
import { IconContext } from 'react-icons/lib';
import styled from 'styled-components';
import { NavLink as Link } from 'react-router-dom';

const MyNav = styled.nav`
    display:flex;
    background: #5F7470;
    height: 80px;
    justify-content: center;
    align-items: center;
    font-size: 1.2rem;
    position: sticky;
    z-index: 999;
`

const NavCon = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 80px;
    z-index: 1;
    width: 100%;
    max-width: 1300px;
    margin-right: auto;
    margin-left: auto;
    padding-right: 50px;
    padding-left: 50px;
`

const LinkNavLogo = styled(Link)`
    color: #fff;
    justify-self: start;
    cursor: pointer;
    font-size: 2rem;
    display: flex;
    align-items: center;

    &.active {
        color: #fff;
    }
`

const LinkNav = styled(Link)`
    color: #fff;
    display: flex;
    align-items: center;
    text-decoration: none!important;
    padding: 0.5rem 1rem;
    height: 100%;

    &.active {
        color: #fff;
    }

    &:hover {
        color: #E0E2DB;
    }
`

const Navbar2 = () => {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <MyNav className='navbar'>
          {/* <div className='navbar-container container'> */}
          <NavCon>
            {/* <Link to='/' className='navbar-logo' onClick={closeMobileMenu}> */}
            <LinkNavLogo to='/' style={{textDecoration: 'none'}} onClick={closeMobileMenu}>
              <FaCat className='navbar-icon' />
              Fishing Cat Tracking
            </LinkNavLogo>
            <div className='menu-icon' onClick={handleClick}>
              {click ? <FaTimes /> : <FaBars />}
            </div>
            <ul className={click ? 'nav-menu active' : 'nav-menu'}>
              <li className='nav-item'>
                {/* <Link to='/' className='nav-links' onClick={closeMobileMenu}> */}
                <LinkNav to='/' style={{textDecoration: 'none'}} onClick={closeMobileMenu}>
                  Home
                </LinkNav>
              </li>
              {/* <li className='nav-item'>
                <LinkNav to='/AllMaps' style={{textDecoration: 'none'}} onClick={closeMobileMenu}>
                  View Map
                </LinkNav>
              </li> */}
            </ul>
          </NavCon>
        </MyNav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar2;
