import logoIcon from '/softyDinnerLogo.png'
import miniLogoIcon from '/mini-logo.png'
import DonationIcon from '../../assets/icons/sidebar/donation-icon.svg?react'
import ActiveDonationIcon from '../../assets/icons/sidebar/active-donation-icon.svg?react'
import ArrowIcon from '../../assets/icons/sidebar/mini-arrow-icon.svg?react'
import HomeIcon from '../../assets/icons/sidebar/home-icon.svg?react'
import ActiveHomeIcon from '../../assets/icons/sidebar/active-home-icon.svg?react'
import FavoriteIcon from '../../assets/icons/sidebar/favorite-icon.svg?react'
import ActiveFavoriteIcon from '../../assets/icons/sidebar/active-favorite-icon.svg?react'
import MenuIcon from '../../assets/icons/sidebar/menu-icon.svg?react'
import ActiveMenuIcon from '../../assets/icons/sidebar/active-menu-icon.svg?react'

import { NavLink } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store'
import { SharedSwitchValue } from '../../store/slices/sharedSlice'

import SideBarBtn from '../SideBarBtn/SideBarBtn'
import SideBarBottom from '../SideBarBottom/SideBarBottom'

function SideBar() {
  const dispatch = useAppDispatch()
  const { isSidebarCollapsed } = useAppSelector((state) => state.shared)
  const { user } = useAppSelector((state) => state.auth)

  const handleCollapsedSideBar = () => {
    dispatch(SharedSwitchValue({ key: 'isSidebarCollapsed', value: !isSidebarCollapsed }))
  }

  return (
    <aside className={`sidebar ${isSidebarCollapsed ? 'sidebar_collapsed' : ''}`}>
      <span
        onClick={handleCollapsedSideBar}
        className={`hamburger_btn ${isSidebarCollapsed ? 'hamburger_btn_active' : ''}`}
      >
        <ArrowIcon />
      </span>

      <div className="sidebar_logo_and_buttons">
        <div className="sidebar_logo">
          <img src={isSidebarCollapsed ? miniLogoIcon : logoIcon} alt="sidebar logo" />
        </div>
        <div className="sidebar_btns">
          <NavLink to={'/home'}>
            <SideBarBtn
              activeIcon={<ActiveHomeIcon />}
              icon={<HomeIcon />}
              name="Home"
              collapsed={isSidebarCollapsed}
            />
          </NavLink>
          <NavLink to={'/menu'}>
            <SideBarBtn
              activeIcon={<ActiveMenuIcon />}
              icon={<MenuIcon />}
              name="Menu"
              collapsed={isSidebarCollapsed}
            />
          </NavLink>
          <NavLink to={'/favorite'}>
            <SideBarBtn
              activeIcon={<ActiveFavoriteIcon />}
              icon={<FavoriteIcon />}
              name="Favorite"
              collapsed={isSidebarCollapsed}
            />
          </NavLink>
          <NavLink to={`/donation/${user?._id}`}>
            <SideBarBtn
              activeIcon={<ActiveDonationIcon />}
              icon={<DonationIcon />}
              name="Donation"
            />
          </NavLink>
        </div>
      </div>

      <SideBarBottom isCollapsed={isSidebarCollapsed} />
    </aside>
  )
}

export default SideBar
