import React, { PropTypes } from 'react'
import { FurnitureContainer } from 'containers'
import { mainContainer, container, content } from './styles.css'
import { subHeader, darkBtn, errorMsg } from 'sharedStyles/styles.css'

furnitureDetails.propTypes = {
  authedUser: PropTypes.object.isRequired,
  furnitureId: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  addAndHandleReply: PropTypes.func.isRequired,
}

export default function furnitureDetails ({furnitureId, isFetching, authedUser, error, addAndHandleReply}) {
  return (
    <div className={mainContainer}>
      {isFetching === true
        ? <p className={subHeader}>{'Fetching'}</p>
        : <div className={container}>
            <div className={content}>
              <FurnitureContainer furnitureId={furnitureId} />
            </div>
          </div>}
      {error ? <p className={errorMsg}>{error}</p> : null}
    </div>
  )
}
