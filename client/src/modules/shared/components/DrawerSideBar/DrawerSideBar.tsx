import logoIcon from '/softyDinnerLogo.png'
import DonationIcon from '../../assets/icons/sidebar/donation-icon.svg?react'
import ActiveDonationIcon from '../../assets/icons/sidebar/active-donation-icon.svg?react'
import HomeIcon from '../../assets/icons/sidebar/home-icon.svg?react'
import ActiveHomeIcon from '../../assets/icons/sidebar/active-home-icon.svg?react'
import FavoriteIcon from '../../assets/icons/sidebar/favorite-icon.svg?react'
import ActiveFavoriteIcon from '../../assets/icons/sidebar/active-favorite-icon.svg?react'
import MenuIcon from '../../assets/icons/sidebar/menu-icon.svg?react'
import ActiveMenuIcon from '../../assets/icons/sidebar/active-menu-icon.svg?react'
import LogoutIcon from '../../assets/icons/sidebar/logout-icon.svg?react'

import { Drawer } from 'antd'
import { NavLink } from 'react-router-dom'

import SideBarBtn from '../SideBarBtn/SideBarBtn'
import SideBarBottom from '../SideBarBottom/SideBarBottom'
import { useMediaQuery } from '@mui/material'
import { useAppSelector } from '../../store'
import { clearTokens } from '../../utils/token'

interface IDrawerSideBar {
  isOpen: boolean
  handleClose: () => void
}

function DrawerSideBar({ isOpen, handleClose }: IDrawerSideBar) {
  const breakpoint_of_930 = useMediaQuery('(max-width:930px)')

  const { user } = useAppSelector((state) => state.auth)

  const handleLogout = () => {
    clearTokens()
    window.location.reload()
  }

  return (
    <Drawer
      placement="left"
      closable={false}
      onClose={handleClose}
      open={isOpen}
      key="Side Bar Drawer"
    >
      <aside className="drawer_sidebar">
        <div className="sidebar_logo_and_buttons">
          {breakpoint_of_930 ? (
            <div className="user_info">
              <p className="name">{user?.name}</p>
              <p>Id: {user?.identifier}</p>
            </div>
          ) : (
            <div className="sidebar_logo">
              <img src={logoIcon} alt="sidebar logo" />
            </div>
          )}
          <div className="sidebar_btns">
            <NavLink to={'/home'}>
              <SideBarBtn activeIcon={<ActiveHomeIcon />} icon={<HomeIcon />} name="Home" />
            </NavLink>
            <NavLink to={'/menu'}>
              <SideBarBtn activeIcon={<ActiveMenuIcon />} icon={<MenuIcon />} name="Menu" />
            </NavLink>
            <NavLink to={'/favorite'}>
              <SideBarBtn
                activeIcon={<ActiveFavoriteIcon />}
                icon={<FavoriteIcon />}
                name="Favorite"
              />
            </NavLink>
            <NavLink to={`/donation/${user?._id}`}>
              <SideBarBtn
                activeIcon={<ActiveDonationIcon />}
                icon={<DonationIcon />}
                name="Donation"
              />
            </NavLink>
            {breakpoint_of_930 && (
              <>
                <a onClick={handleLogout}>
                  <SideBarBtn icon={<LogoutIcon />} name="Sign Out" />
                </a>
              </>
            )}
          </div>
        </div>

        <SideBarBottom />
      </aside>
    </Drawer>
  )
}

export default DrawerSideBar
