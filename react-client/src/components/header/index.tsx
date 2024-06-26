import React, { useContext } from 'react';
import { ThemeContext } from '../theme-provider';
import {Button, Navbar, NavbarBrand, NavbarContent, NavbarItem} from '@nextui-org/react';
import { FaRegMoon } from 'react-icons/fa';
import { LuSunMedium } from 'react-icons/lu';
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectIsAuthentificated } from '../../features/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { IoColorFillOutline } from 'react-icons/io5';
import { CiLogout } from 'react-icons/ci';

export const Header = () => {
    const {theme, toggleTheme} = useContext(ThemeContext)
    const isAuthenticated = useSelector(selectIsAuthentificated)
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const handleLogout = () => {
      dispatch(logout());
      localStorage.removeItem('token') 
      navigate('/auth')
    }

  return (
    <div>
      <Navbar>
        <NavbarBrand>
          <p className="font-bold text-inherit">Network Social</p>
        </NavbarBrand>
        <NavbarContent justify="end">
          <NavbarItem
            className="lg:flex text-3xl cursor-pointer"
            onClick={() => toggleTheme()}
          >
            {theme === "light" ? <FaRegMoon /> : <LuSunMedium />}
          </NavbarItem>
          <NavbarItem>
            {isAuthenticated && (
              <Button
                color="default"
                variant="flat"
                className="gap-2"
                onClick={handleLogout}
              >
                <CiLogout/><span>Вийти</span>
              </Button>
            )}
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    </div>
  )
}

