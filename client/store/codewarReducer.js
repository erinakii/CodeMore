import axios from 'axios'

const initialState = {
  generalCodewars: {},
  codewarsLanguages: [],
  codewarsQuestions: []
}

const GET_CODEWAR = 'GET_CODEWAR'
const getCodewars = codewarData => ({type: GET_CODEWAR, codewarData})

export const fetchCodewars = (userId, codewars) => async dispatch => {
  const {data} = await axios.get(`/api/data/codewars/${userId}/${codewars}`)
  return dispatch(getCodewars(data))
}

export const findCodewars = userId => async dispatch => {
  const {data} = await axios.get(`/api/codewars/${userId}`)
  return dispatch(getCodewars(data))
}
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CODEWAR:
      const {
        generalCodewars,
        codewarsLanguages,
        codewarsQuestions
      } = action.codewarData
      return {
        ...state,
        generalCodewars,
        codewarsLanguages,
        codewarsQuestions
      }

    default:
      return state
  }
}
