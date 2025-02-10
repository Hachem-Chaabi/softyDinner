import { Suspense, useState } from 'react'

import useMediaQuery from '@mui/material/useMediaQuery'
import Navbar from '../../components/Navbar/Navbar'
import SideBar from '../../components/SideBar/SideBar'
import DrawerSideBar from '../../components/DrawerSideBar/DrawerSideBar'

interface MainLayoutProps {
  children: React.ReactNode
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const [openDrawerSideBar, setOpenDrawerSideBar] = useState(false)

  const handleCloseDrawerSideBar = () => {
    setOpenDrawerSideBar(false)
  }

  const toggleDrawerSideBar = () => {
    setOpenDrawerSideBar((open) => !open)
  }

  const breakpoint_of_1210 = useMediaQuery('(max-width:1210px)')

  return (
    <div className={'shared_main_layout'}>
      {breakpoint_of_1210 ? (
        <DrawerSideBar isOpen={openDrawerSideBar} handleClose={handleCloseDrawerSideBar} />
      ) : (
        <SideBar />
      )}

      <div className="shared_main_layout_container">
        <Navbar onClick={toggleDrawerSideBar} />
        <Suspense>{children}</Suspense>
      </div>
    </div>
  )
}

export default MainLayout
