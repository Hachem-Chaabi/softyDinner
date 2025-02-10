import LogoutIcon from '../../assets/icons/profileDropDown/logout-icon.svg?react'

import { clearTokens } from '../../utils/token'
import { useAppSelector } from '../../store'

function ProfileDropdown() {
  const { user } = useAppSelector((state) => state.auth)

  const handleLogout = () => {
    clearTokens()
    window.location.reload()
  }

  return (
    <div className="profile_dropdown">
      <p className="user_label">{user?.name}</p>
      <p className="id_label">Id: {user?.identifier}</p>

      <div className="logout_container" onClick={handleLogout}>
        <p>Logout</p>
        <LogoutIcon />
      </div>
    </div>
  )
}

export default ProfileDropdown
