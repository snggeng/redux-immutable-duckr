import React, { PropTypes } from 'react'
import { loginForm, centeredContainer, largeHeader, errorMsg } from 'sharedStyles/styles.css'
import { FacebookAuthButton } from 'components'

Authenticate.propTypes = {
  error: PropTypes.string,
  isFetching: PropTypes.bool,
  onAuth: PropTypes.func.isRequired,
  email: PropTypes.string,
  password: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
}

export default function Authenticate ({onAuth, isFetching, error, email, password, handleChange}) {
  return (
    <div className={[loginForm, centeredContainer].join(' ')}>
      <h1 className={largeHeader}>{'Authenticate'}</h1>
      <FacebookAuthButton isFetching={isFetching}
                          onAuth={onAuth}
                          email={email}
                          password={password}
                          handleChange={handleChange} />
      {error ? <p className={errorMsg}>{error}</p> : null}
    </div>
  )
}
