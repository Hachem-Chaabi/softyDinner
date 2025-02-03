import arrowIcon from '/arrow.png'
import logoIcon from '/softyDinnerLogo.png'
import miniLogoIcon from '/mini-logo.png'
import homeIcon from '/home-icon.png'
import activeHomeIcon from '/active-home-icon.png'
import menuIcon from '/menu-icon.png'
import activeMenuIcon from '/active-menu-icon.png'
import favoriteIcon from '/favorite-icon.png'
import activeFavoriteIcon from '/active-favorite-icon.png'

import { NavLink } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store'
import { SharedSwitchValue } from '../../store/slices/sharedSlice'

import SideBarBtn from '../SideBarBtn/SideBarBtn'
import SideBarBottom from '../SideBarBottom/SideBarBottom'

// interface ISideBar {
//   collapsed: boolean
//   onClick: () => void
// }

function SideBar() {
  const dispatch = useAppDispatch()
  const { isSidebarCollapsed } = useAppSelector((state) => state.shared)

  const handleCollapsedSideBar = () => {
    dispatch(SharedSwitchValue({ key: 'isSidebarCollapsed', value: !isSidebarCollapsed }))
  }

  return (
    <aside className={`sidebar ${isSidebarCollapsed ? 'sidebar_collapsed' : ''}`}>
      <img
        onClick={handleCollapsedSideBar}
        src={arrowIcon}
        alt="arrow icon"
        className={`hamburger_btn ${isSidebarCollapsed ? 'hamburger_btn_active' : ''}`}
      />
      <div className="sidebar_logo_and_buttons">
        <div className="sidebar_logo">
          <img src={isSidebarCollapsed ? miniLogoIcon : logoIcon} alt="sidebar logo" />
        </div>
        <div className="sidebar_btns">
          <NavLink to={'/home'}>
            <SideBarBtn
              activeIconSrc={activeHomeIcon}
              iconSrc={homeIcon}
              name="Home"
              collapsed={isSidebarCollapsed}
            />
          </NavLink>
          <NavLink to={'/menu'}>
            <SideBarBtn
              activeIconSrc={activeMenuIcon}
              iconSrc={menuIcon}
              name="Menu"
              collapsed={isSidebarCollapsed}
            />
          </NavLink>
          <NavLink to={'/favorite'}>
            <SideBarBtn
              activeIconSrc={activeFavoriteIcon}
              iconSrc={favoriteIcon}
              name="Favorite"
              collapsed={isSidebarCollapsed}
            />
          </NavLink>
        </div>
      </div>

      {!isSidebarCollapsed && <SideBarBottom />}
    </aside>
  )
}

export default SideBar
