import logoutIcon from '/logout.png'

import { useDispatch } from 'react-redux'
import { clearTokens } from '../../utils/token'
import { initialise } from '../../../auth/data/authSlice'
import { useAppSelector } from '../../store'

function ProfileDropdown() {
  const { user } = useAppSelector((state) => state.auth)
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(initialise({ isAuthenticated: false, user: null }))
    clearTokens()
  }

  return (
    <div className="profile_dropdown">
      <p className="user_label">{user?.name}</p>
      <p className="id_label">Id: {user?.identifier}</p>

      <div className="logout_container" onClick={handleLogout}>
        <p>Logout</p>
        <img src={logoutIcon} alt="logout" />
      </div>
    </div>
  )
}

export default ProfileDropdown
