import React, { PropTypes } from 'react'
import { formatTimestamp } from 'helpers/utils'
import Reply from 'react-icons/lib/fa/mail-reply'
import Star from 'react-icons/lib/fa/star'
import {
  furnitureContainer, contentContainer, avatar, actionContainer,
  header, text, likeReplyContainer, icon, likedIcon, author,
} from './styles.css'
import { Map } from 'immutable'

Furniture.propTypes = {
  furniture: PropTypes.instanceOf(Map),
  onClick: PropTypes.func,
  goToProfile: PropTypes.func.isRequired,
}

export default function Furniture (props) {
  return (
    <div
      className={furnitureContainer}
      style={{cursor: 'pointer'}}
      onClick={props.onClick}>
        <img src={props.furniture.get('avatar')} className={avatar}/>
        <div className={contentContainer}>
          <div className={header}>
            <div onClick={props.goToProfile} className={author}>{props.furniture.get('name')}</div>
            <div>{formatTimestamp(props.furniture.get('timestamp'))}</div>
          </div>
          <div className={text}>{props.furniture.get('text')}</div>
        </div>
    </div>
  )
}
