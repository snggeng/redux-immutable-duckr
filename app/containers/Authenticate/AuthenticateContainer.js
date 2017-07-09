import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Authenticate } from 'components'
// import auth from 'helpers/auth'
import { user } from 'config/constants'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as userActionCreators from 'redux/modules/users'
import { loginFormContainer } from 'sharedStyles/styles.css'

class AuthenticateContainer extends Component {
  static propTypes = {
    fetchAndHandleAuthedUser: PropTypes.func.isRequired,
    isFetching: PropTypes.bool,
    error: PropTypes.string,
  }
  constructor (props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      error: '',
    }
  }

  onChange = (e) => {
    var state = this.state
    var key = e.target.name
    var value = e.target.value

    state[key] = value
    // console.log('onchange', state)
    this.setState(state)
  }
  handleAuth = (e) => {
    e.preventDefault()
    // console.log('handle auth', this.state.email, this.state.password)
    this.props.fetchAndHandleAuthedUser(user, this.state.email, this.state.password)
      .then(() => this.context.router.replace('feed'))
  }
  render () {
    return (
      <Authenticate
        className = {loginFormContainer}
        onAuth={this.handleAuth}
        email={this.state.email}
        password={this.state.password}
        handleChange={this.onChange}
        isFetching={this.props.isFetching}
        error={this.props.error} />
    )
  }
}

AuthenticateContainer.contextTypes = {
  router: PropTypes.object.isRequired,
}

export default connect(
  (state) => ({isFetching: state.isFetching, error: state.error}),
  (dispatch) => bindActionCreators(userActionCreators, dispatch)
)(AuthenticateContainer)
