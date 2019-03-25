/* eslint-disable react/display-name */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {Navbar} from './components'
import Routes from './routes'
import {_filterTruthyData, _sentenceCase} from './helperfuncs/'
const CronJob = require('cron').CronJob

import {
  me,
  fetchGithub,
  fetchCodewars,
  fetchHackernoon,
  fetchMedium,
  fetchStackoverflow
} from './store'

const mapState = ({userReducer}) => ({
  userId: userReducer.id,
  formdata: {
    Codewars: userReducer.codewars,
    Github: userReducer.username,
    Stackoverflow: userReducer.stackoverflow,
    Medium: userReducer.medium,
    Hackernoon: userReducer.hackernoon
  }
})

const mapDispatch = dispatch => ({
  loadInitialData: () => dispatch(me()),
  fetchGithub: (userId, username) => dispatch(fetchGithub(userId, username)),
  fetchCodewars: (userId, username) =>
    dispatch(fetchCodewars(userId, username)),
  fetchMedium: (userId, username) => dispatch(fetchMedium(userId, username)),
  fetchHackernoon: (userId, username) =>
    dispatch(fetchHackernoon(userId, username)),
  fetchStackoverflow: (userId, username) =>
    dispatch(fetchStackoverflow(userId, username))
})

export default withRouter(
  connect(mapState, mapDispatch)(
    class App extends Component {
      constructor(props) {
        super(props)
        this.state = {
          job: 0
        }
      }
      jobCreator = callback => new CronJob(`*/1 0 * * *`, callback)

      componentDidMount() {
        this.props.loadInitialData()

        const job = this.jobCreator(() => {
          const truthyData = _filterTruthyData(this.props.formdata)
          Object.keys(truthyData).forEach(val => {
            console.log(this.props.userId, truthyData[val])
            this.props[`fetch${val}`](this.props.userId, truthyData[val])
          })
        })
        this.setState({job})
        job.start()
      }
      render() {
        console.log('render', this.props)
        console.log(this.state.job)
        console.log('is job running? ', this.state.job.running)
        return (
          <div className={this.props.userId ? 'LoggedPage' : 'LandingPage'}>
            <Navbar />
            <Routes />
          </div>
        )
      }
    }
  )
)

// !this.props.isLoggedIn
// ? 'LandingPage'
// : _isDataMissing(this.props.formdata)
//   ? 'LandingPage'
//   : 'LoggedPage'
// if(logged in){
//   if(data is missing){
//   landingpage
//   }
//   loggedpage
// }
// landing page
