import React, { useEffect } from 'react'
import { Header } from '../header'
import { Container } from '../container'
import { Navbar } from '../nav-bar'
import { Outlet, useNavigate } from 'react-router-dom'
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { useSelector } from 'react-redux'
import { selectIsAuthentificated, selectUser } from '../../features/user/userSlice'
import Profile from '../profile'
import { Posts } from '../../pages/posts'

export const Layout = () => {
  const isAuthenticated = useSelector(selectIsAuthentificated);
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  useEffect(() => {
    if(!isAuthenticated){
      navigate('/auth')
    }
  }, [])

  return (
    <>
      <Header />
      <Container>
        <div className="flex-2 p-4">
          <Navbar />
        </div>
        <div className="flex-1 p-4">
          {/* <Outlet/> */}
          <Posts />
        </div>
        <div className="flex-2 p-4">
          <div className="flex-col flex gap-5">{!user && <Profile />}</div>
        </div>
      </Container>
    </>
  )
}
