import { ReactElement } from 'react'
import { useLocation } from 'react-router-dom'

interface ISideBarBtn {
  activeIcon?: ReactElement
  icon: ReactElement
  name: string
  collapsed?: boolean
}

function SideBarBtn({ activeIcon, icon, name, collapsed }: ISideBarBtn) {
  const location = useLocation()
  const pageName = location.pathname.split('/')[1]

  const isActive = pageName.toLowerCase() === name.toLowerCase()

  return (
    <div
      style={collapsed ? { justifyContent: 'center' } : undefined}
      className={`sidebar_btn ${isActive ? 'sidebar_btn_active' : ''}`}
    >
      {isActive ? activeIcon : icon}
      {!collapsed && <p>{name}</p>}
    </div>
  )
}

export default SideBarBtn
