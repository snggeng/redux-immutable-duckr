import React from 'react'
import PropTypes from 'prop-types'
import { button } from './styles.css'

FacebookAuthButton.propTypes = {
  onAuth: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
}

export default function FacebookAuthButton ({onAuth, isFetching}) {

  handleChange = (e) => {
    console.log(e.target)
    console.log(e.target.text)
    console.log('name', e.target.name)
  }

  return (
    <div>
      <input name='email' placeholder='Email'onChange={this.handleChange}/>
      <input name='password' type='password' placeholder='Password' onChange={this.handleChange}/>
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