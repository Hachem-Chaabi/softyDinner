import { HTMLAttributes, useState } from 'react'
import eyeOn from './eyeOn.svg'
import eyeOff from './eyeOff.svg'

interface IInputProps extends HTMLAttributes<HTMLInputElement> {
  name: string
  formik?: any
  label?: string
  icon?: string
  type?: 'email' | 'text' | 'number' | 'password'
  variant?: 'primary' | 'info' | 'success' | 'danger' | 'warning' | 'dark' | 'secondary' | 'light'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  rounded?: boolean
  required?: boolean
  placeholder?: string
}

const Input: React.FC<IInputProps> = ({
  formik,
  name,
  label = '',
  icon = '',
  variant = 'primary',
  size = 'md',
  rounded = true,
  type = 'text',
  required = false,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(true)

  return (
    <div className="input-form">
      <label htmlFor={name} className="label">
        {label}
      </label>

      <div
        className={[
          'input-container',
          `input-container-${formik?.errors?.[name] ? 'danger' : variant}`,
          `${rounded ? 'input-rounded' : ''}`,
        ].join(' ')}
      >
        {icon && <img src={icon} alt="icon" className="icon" />}
        <input
          id={name}
          name={name}
          type={type === 'password' ? (showPassword ? 'password' : 'text') : type}
          className={['input', `input-${size}`, `input-${variant}`].join(' ')}
          onBlur={formik?.handleBlur}
          onChange={formik?.handleChange}
          value={formik?.values[name]}
          autoComplete="new-password"
          {...props}
        />
        {type === 'password' && (
          <img
            src={showPassword ? eyeOn : eyeOff}
            alt="eye-icon"
            className="eye-icon"
            onClick={() => setShowPassword(!showPassword)}
          />
        )}
      </div>

      {formik?.touched[name] && formik?.errors[name] ? (
        <p className="error-message">{formik?.errors[name]}</p>
      ) : null}
    </div>
  )
}

export default Input
