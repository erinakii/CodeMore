/* eslint-disable react/display-name */
import React from 'react'
import Container from './DataEntryForm/container'
import {connect} from 'react-redux'
import {_isDataMissing} from '../helperfuncs'
import Profile from './Profile'

const mapState = ({userReducer}) => ({
  githubId: userReducer.githubId,
  formdata: [
    userReducer.codewars,
    userReducer.email,
    userReducer.stackoverflow,
    userReducer.medium,
    userReducer.hackernoon
  ]
})

export default connect(mapState)(({githubId, formdata, location: {state}}) => {
  return (
    <div>
      {_isDataMissing(formdata) ? null : state &&
      state.prevPath &&
      state.prevPath !== '/problems' ? null : (
        <Container />
      )}
      <Profile />
    </div>
  )
})
