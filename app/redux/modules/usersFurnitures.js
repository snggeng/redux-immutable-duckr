import { fetchUsersFurnitures } from 'helpers/api'
import { addMultipleFurnitures } from 'redux/modules/furnitures'

const FETCHING_USERS_FURNITURES = 'FETCHING_USERS_FURNITURES'
const FETCHING_USERS_FURNITURES_ERROR = 'FETCHING_USERS_FURNITURES_ERROR'
const FETCHING_USERS_FURNITURES_SUCCESS = 'FETCHING_USERS_FURNITURES_SUCCESS'
const ADD_SINGLE_USERS_FURNITURE = 'ADD_SINGLE_USERS_FURNITURE'

function fetchingUsersFurnitures (uid) {
  return {
    type: FETCHING_USERS_FURNITURES,
    uid,
  }
}

function fetchingUsersFurnituresError (error) {
  console.warn(error)
  return {
    type: FETCHING_USERS_FURNITURES_ERROR,
    error: 'Error fetching Users Furniture Ids',
  }
}

function fetchingUsersFurnituresSuccess (uid, furnitureIds, lastUpdated) {
  return {
    type: FETCHING_USERS_FURNITURES_SUCCESS,
    uid,
    furnitureIds,
    lastUpdated,
  }
}

export function addSingleUsersFurniture (uid, furnitureId) {
  return {
    type: ADD_SINGLE_USERS_FURNITURE,
    uid,
    furnitureId,
  }
}

const initialUsersFurnitureState = {
  lastUpdated: 0,
  furnitureIds: [],
}

function usersFurniture (state = initialUsersFurnitureState, action) {
  switch (action.type) {
    case ADD_SINGLE_USERS_FURNITURE :
      return {
        ...state,
        furnitureIds: state.furnitureIds.concat([action.furnitureId]),
      }
    default :
      return state
  }
}

export function fetchAndHandleUsersFurnitures (uid) {
  return function (dispatch, getState) {
    dispatch(fetchingUsersFurnitures())

    fetchUsersFurnitures(uid)
      .then((furnitures) => dispatch(addMultipleFurnitures(furnitures)))
      .then(({furnitures}) => dispatch(
        fetchingUsersFurnituresSuccess(
          uid,
          Object.keys(furnitures).sort((a, b) => furnitures[b].timestamp - furnitures[a].timestamp),
          Date.now())
        )
      )
      .catch((error) => dispatch(fetchingUsersFurnituresError(error)))
  }
}

const initialState = {
  isFetching: true,
  error: '',
}

export default function usersFurnitures (state = initialState, action) {
  switch (action.type) {
    case FETCHING_USERS_FURNITURES :
      return {
        ...state,
        isFetching: true,
      }
    case FETCHING_USERS_FURNITURES_ERROR :
      return {
        ...state,
        isFetching: false,
        error: action.error,
      }
    case FETCHING_USERS_FURNITURES_SUCCESS :
      return {
        ...state,
        isFetching: false,
        error: '',
        [action.uid]: {
          lastUpdated: action.lastUpdated,
          furnitureIds: action.furnitureIds,
        },
      }
    case ADD_SINGLE_USERS_FURNITURE :
      return typeof state[action.uid] === 'undefined'
        ? state
        : {
          ...state,
          isFetching: false,
          error: '',
          [action.uid]: usersFurniture(state[action.uid], action),
        }
    default :
      return state
  }
}
