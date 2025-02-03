import { useLocation } from 'react-router-dom'

interface ISideBarBtn {
  activeIconSrc: string
  iconSrc: string
  name: string
  collapsed: boolean
}

function SideBarBtn({ activeIconSrc, iconSrc, name, collapsed }: ISideBarBtn) {
  const location = useLocation()
  const pageName = location.pathname.split('/')[1]

  const isActive = pageName.toLowerCase() === name.toLowerCase()

  return (
    <div
      style={collapsed ? { justifyContent: 'center' } : undefined}
      className={`sidebar_btn ${isActive ? 'sidebar_btn_active' : ''}`}
    >
      <img src={isActive ? activeIconSrc : iconSrc} alt={`${name} icon`} />
      {!collapsed && <p>{name}</p>}
    </div>
  )
}

export default SideBarBtn
