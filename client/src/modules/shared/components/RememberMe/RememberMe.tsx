import TickIcon from '../../assets/icons/rememberMe/tick-icon.svg?react'

interface IRememberMe {
  rememberMe: boolean
  handleToggle: () => void
}

const RememberMe = ({ rememberMe, handleToggle }: IRememberMe) => {
  return (
    <div className="remember_me">
      <div className="checkbox-wrapper-23">
        <input type="checkbox" id="check-23" />
        <label onClick={handleToggle} htmlFor="check-23">
          {rememberMe && <TickIcon />}
        </label>
      </div>
      <p>Remember me</p>
    </div>
  )
}

export default RememberMe
