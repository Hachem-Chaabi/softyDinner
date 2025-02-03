interface IButton {
  children: any
  submitting?: boolean
  type: string
  onClick?: (arg?: any) => void
}

const Button = ({ children, submitting, type, onClick }: IButton) => {
  return (
    <button onClick={onClick} type="submit" className={`btn_${type} btn`} disabled={submitting}>
      {children}
    </button>
  )
}

export default Button
