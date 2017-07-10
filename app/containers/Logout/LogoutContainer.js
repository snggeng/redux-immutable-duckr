import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { logoutAndUnauth } from 'redux/modules/users'
import { Logout } from 'components'

const LogoutContainer = React.createClass({
  propTypes: {
    dispatch: PropTypes.func.isRequired,
  },
  contextTypes: {
    router: PropTypes.object.isRequired,
  },
  componentDidMount () {
    console.warn(this.context.router)
    this.props.dispatch(logoutAndUnauth())
    this.context.router.replace('auth')
  },
  render () {
    return <Logout />
  },
})

export default connect()(LogoutContainer)
