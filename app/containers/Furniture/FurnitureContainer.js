import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Furniture } from 'components'

const FurnitureContainer = React.createClass({
  propTypes: {
    furniture: PropTypes.object.isRequired,
  },
  contextTypes: {
    router: PropTypes.object.isRequired,
  },
  goToProfile (e) {
    e.stopPropagation()
    this.context.router.push('/' + this.props.furniture.get('uid'))
  },
  handleClick (e) {
    e.stopPropagation()
    this.context.router.push('/furnitureDetail/' + this.props.furniture.get('furnitureId'))
  },
  render () {
    return (
      <Furniture
        goToProfile={this.goToProfile}
        onClick={this.handleClick}
        {...this.props} />
    )
  },
})

function mapStateToProps ({furnitures}, props) {
  return {
    furniture: furnitures.get(props.furnitureId),
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FurnitureContainer)
