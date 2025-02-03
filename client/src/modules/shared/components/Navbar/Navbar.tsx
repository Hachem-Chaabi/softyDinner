import profileIcon from '/profile-icon.png'

import { Badge, Dropdown } from 'antd'

import Search from '../Search/Search'
import notificationIcon from '/notification-icon.png'
import ProfileDropdown from '../ProfileDropdown/ProfileDropdown'
import NotificationDropdown from '../NotificationDropdown/NotificationDropdown'

const Navbar = () => {
  return (
    <header className="shared_navbar">
      <Search />

      <div className="shared_navbar_buttons">
        <div>
          <Dropdown
            trigger={['click']}
            placement="bottomLeft"
            dropdownRender={() => <NotificationDropdown />}
          >
            <span onClick={(e) => e.preventDefault()}>
              <Badge
                dot={true}
                style={{ top: '9px', left: '17px', padding: '3px', backgroundColor: '#ff0000' }}
              >
                <img src={notificationIcon} alt="notification-icon" className="navbar_btn" />
              </Badge>
            </span>
          </Dropdown>
        </div>
        <div>
          <Dropdown
            trigger={['click']}
            placement="bottomLeft"
            dropdownRender={() => <ProfileDropdown />}
          >
            <span onClick={(e) => e.preventDefault()}>
              <img src={profileIcon} alt="profile-icon" className="navbar_btn" />
            </span>
          </Dropdown>
        </div>
      </div>
    </header>
  )
}

export default Navbar
