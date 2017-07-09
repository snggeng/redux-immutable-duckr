import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { FurnitureDetails } from 'components'
import { bindActionCreators } from 'redux'
import * as furnitureActionCreators from 'redux/modules/furnitures'

const FurnitureDetailsContainer = React.createClass({
  propTypes: {
    authedUser: PropTypes.object.isRequired,
    furnitureId: PropTypes.string.isRequired,
    isFetching: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
    furnitureAlreadyFetched: PropTypes.bool.isRequired,
    removeFetching: PropTypes.func.isRequired,
    fetchAndHandleFurniture: PropTypes.func.isRequired,
  },
  componentDidMount () {
    if (this.props.furnitureAlreadyFetched === false) {
      this.props.fetchAndHandleFurniture(this.props.furnitureId)
    } else {
      this.props.removeFetching()
    }
  },
  render () {
    return (
      <FurnitureDetails
        authedUser={this.props.authedUser}
        furnitureId={this.props.furnitureId}
        error={this.props.error}
        isFetching={this.props.isFetching} />
    )
  },
})

function mapStateToProps ({furnitures, users}, props) {
  return {
    isFetching: furnitures.get('isFetching'),
    error: furnitures.get('error'),
    authedUser: users[users.authedId].info,
    furnitureId: props.routeParams.furnitureId,
    furnitureAlreadyFetched: !!furnitures.get(props.routeParams.furnitureId),
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    ...furnitureActionCreators,
  }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FurnitureDetailsContainer)
