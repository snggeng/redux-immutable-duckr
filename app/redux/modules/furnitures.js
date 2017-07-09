import { saveFurniture, fetchFurniture } from 'helpers/api'
import { closeModal } from './modal'
import { addSingleUsersFurniture } from './usersFurnitures'
import { Map } from 'immutable'

const FETCHING_FURNITURE = 'FETCHING_FURNITURE'
const FETCHING_FURNITURE_ERROR = 'FETCHING_FURNITURE_ERROR'
const FETCHING_FURNITURE_SUCCESS = 'FETCHING_FURNITURE_SUCCESS'
const ADD_FURNITURE = 'ADD_FURNITURE'
const ADD_MULTIPLE_FURNITURES = 'ADD_MULTIPLE_FURNITURES'
const REMOVE_FETCHING = 'REMOVE_FETCHING'

function fetchingFurniture () {
  return {
    type: FETCHING_FURNITURE,
  }
}

function fetchingFurnitureError (error) {
  return {
    type: FETCHING_FURNITURE_ERROR,
    error: 'Error fetching Furniture b/c: ' + error,
  }
}

function fetchingFurnitureSuccess (furniture) {
  return {
    type: FETCHING_FURNITURE_SUCCESS,
    furniture,
  }
}

export function removeFetching () {
  return {
    type: REMOVE_FETCHING,
  }
}

function addFurniture (furniture) {
  return {
    type: ADD_FURNITURE,
    furniture,
  }
}

export function furnitureFanout (furniture) {
  return function (dispatch, getState) {
    const uid = getState().users.authedId
    saveFurniture(furniture)
      .then((furnitureWithId) => {
        dispatch(addFurniture(furnitureWithId))
        dispatch(closeModal())
        dispatch(addSingleUsersFurniture(uid, furnitureWithId.furnitureId))
      })
      .catch((err) => {
        console.warn('Error in furnitureFanout', err)
      })
  }
}

export function addMultipleFurnitures (furnitures) {
  return {
    type: ADD_MULTIPLE_FURNITURES,
    furnitures,
  }
}

export function fetchAndHandleFurniture (furnitureId) {
  return function (dispatch) {
    dispatch(fetchingFurniture())
    fetchFurniture(furnitureId)
      .then((furniture) => dispatch(fetchingFurnitureSuccess(furniture)))
      .catch((error) => dispatch(fetchingFurnitureError(error)))
  }
}

const initialState = Map({
  isFetching: true,
  error: '',
})

export default function furnitures (state = initialState, action) {
  switch (action.type) {
    case FETCHING_FURNITURE :
      return state.merge({
        isFetching: true,
      })
    case ADD_FURNITURE :
    case FETCHING_FURNITURE_SUCCESS :
      return state.merge({
        error: '',
        isFetching: false,
        [action.furniture.furnitureId]: action.furniture,
      })
    case FETCHING_FURNITURE_ERROR :
      return state.merge({
        isFetching: false,
        error: action.error,
      })
    case REMOVE_FETCHING :
      return state.merge({
        isFetching: false,
        error: '',
      })
    case ADD_MULTIPLE_FURNITURES :
      return state.merge(action.furnitures)
    default :
      return state
  }
}
