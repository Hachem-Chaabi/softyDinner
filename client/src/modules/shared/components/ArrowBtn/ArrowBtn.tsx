import { Icon } from '@iconify/react'

interface IArrowBtn {
  type: string
  onClick: any
}

function ArrowBtn({ type, onClick }: IArrowBtn) {
  return (
    <div
      style={type === 'right' ? { left: '-34px' } : { right: '-34px' }}
      onClick={onClick}
      className="arrow_btn_container"
    >
      <Icon
        color="#ffffff"
        icon="ep:arrow-up-bold"
        width="18"
        height="18"
        style={type === 'right' ? { transform: 'rotate(-90deg)' } : { transform: 'rotate(90deg)' }}
      />
    </div>
  )
}

export default ArrowBtn
