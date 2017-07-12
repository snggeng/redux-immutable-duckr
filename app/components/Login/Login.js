import React from 'react'
import PropTypes from 'prop-types'
import { button, login } from './styles.css'
import { formField } from 'sharedStyles/styles.css'

Login.propTypes = {
  onAuth: PropTypes.func.isRequired,
  isFetching: PropTypes.bool,
  handleChange: PropTypes.func.isRequired,
}

export default function Login ({onAuth, isFetching, handleChange}) {
  return (
    <div className={login}>
      <input className={formField} name='email' placeholder='Email'
        onChange={handleChange}/>
        <br />
      <input className={formField} name='password' type='password'
        placeholder='Password'
        onChange={handleChange}/>
      <button onClick={onAuth} className={button}>
        {isFetching === true
          ? 'Loading'
          : 'Login'}
      </button>
    </div>
  )
}
// export const TextInput = ({label, name, type, value, onChange, onBlur, validation}) => (
// 	<div className={classnames('form-field', {'form-field-validation': validation})}>
// 		<label htmlFor={name}>
// 			<span>{label}</span>
// 			<input
// 				id={name}
// 				name={name}
// 				type={type}
// 				value={value}
// 				onChange={onChange}
// 				onBlur={onBlur} />
// 		</label>
// 		{validation && <span className='field-validation-text'><span className='lnr lnr-warning'></span> {validation}</span>}
// 	</div>
// )
