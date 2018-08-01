import React, { Fragment } from 'react'
import { Route, BrowserRouter as Router } from 'react-router-dom'
import { connect } from 'react-redux'
// User
import * as eventActions from 'store/actions/event-actions'
import EventForm from 'ui/EventForm'
import withRoot from './withRoot'

class App extends React.Component {
  componentDidMount() {
    this.props.requestReadEvents()
  }

  render() {
    return (
      <Router>
        <Fragment>
        <Route exact path='/' component={EventForm} />
        <Route exact path='/:_id' component={EventForm} />
        </Fragment>
      </Router>
    )
  }
}

const mapStateToProps = (state) => {
  return {}
}

export default connect(mapStateToProps, eventActions)(withRoot(App))
