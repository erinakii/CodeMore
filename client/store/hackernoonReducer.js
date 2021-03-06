/* eslint-disable no-case-declarations */
import axios from 'axios'
import {ToastsStore} from 'react-toasts'
const initialState = {
  hackernoonPosts: []
}

const GET_HACKERNOON = 'GET_HACKERNOON'
const getHackernoon = hackernoonPosts => ({
  type: GET_HACKERNOON,
  hackernoonPosts
})

export const fetchHackernoon = (userId, hackernoon) => async dispatch => {
  try {
    ToastsStore.success(`Fetched data for Hackernoon!`)
    const {data} = await axios.get(`/api/hackernoon/${userId}/${hackernoon}`)
    return dispatch(getHackernoon(data))
  } catch (error) {
    ToastsStore.error(`${error} while fetching Hackernoon!`)
  }
}

export const findHackernoon = userId => async dispatch => {
  const {data} = await axios.get(`/api/hackernoon/${userId}`)
  return dispatch(getHackernoon(data))
}
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_HACKERNOON:
      return {
        ...state,
        hackernoonPosts: action.hackernoonPosts
      }

    default:
      return state
  }
}
