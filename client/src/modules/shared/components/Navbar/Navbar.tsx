import ProfileIcon from '../../assets/icons/navbar/profile--icon.svg?react'
import NotificationIcon from '../../assets/icons/navbar/notification-icon.svg?react'
import BurgerIcon from '../../assets/icons/navbar/burger-icon.svg?react'
import SearchIcon from '../../assets/icons/navbar/black-search-icon.svg?react'
import ResponsiveLogo from '../../assets/icons/navbar/responsive-logo.svg?react'

import {  Dropdown } from 'antd'
import { useMediaQuery } from '@mui/material'

import Search from '../Search/Search'
import ProfileDropdown from '../ProfileDropdown/ProfileDropdown'
import NotificationDropdown from '../NotificationDropdown/NotificationDropdown'

const Navbar = ({ onClick }: { onClick: () => void }) => {
  const breakpoint_of_1210 = useMediaQuery('(max-width:1210px)')
  const breakpoint_of_930 = useMediaQuery('(max-width:930px)')

  return (
    <header className="shared_navbar">
      {breakpoint_of_1210 && (
        <button onClick={onClick} className="burger_btn">
          <BurgerIcon />
        </button>
      )}

      {breakpoint_of_930 && <ResponsiveLogo />}

      {!breakpoint_of_930 && <Search />}

      <div className="shared_navbar_buttons">
        {breakpoint_of_930 && <SearchIcon />}

        <div>
          <Dropdown
            trigger={['click']}
            placement="bottomLeft"
            dropdownRender={() => <NotificationDropdown />}
          >
            <span onClick={(e) => e.preventDefault()}>
              {/* <Badge
                dot={true}
                style={{ top: '9px', left: '17px', padding: '3px', backgroundColor: '#ff0000' }}
              > */}
                <span className="navbar_btn">
                  <NotificationIcon />
                </span>
              {/* </Badge> */}
            </span>
          </Dropdown>
        </div>

        {!breakpoint_of_930 && (
          <div>
            <Dropdown
              trigger={['click']}
              placement="bottomLeft"
              dropdownRender={() => <ProfileDropdown />}
            >
              <span onClick={(e) => e.preventDefault()}>
                <span className="navbar_btn">
                  <ProfileIcon />
                </span>
              </span>
            </Dropdown>
          </div>
        )}
      </div>
    </header>
  )
}

export default Navbar
