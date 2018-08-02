import React from 'react'
import { mount } from 'enzyme'
import {Provider} from 'react-redux'
import PropTypes from 'prop-types'
import compose from 'recompose'
import { SubmissionError } from 'redux-form'
import { withStyles } from '@material-ui/core/styles'

import configureStore from '../../../store'
import ConnectedEventForm from '../../../ui/EventForm/EventForm'
import TextFieldRedux from '../../../ui/ui-elements/TextFieldRedux'
import styles from '../../../ui/EventForm/styles'
import validate from '../../../ui/EventForm/validate'

describe('EventForm', () => {

  let handleSubmit, pristine, reset, submitting
  let mountedEventForm
  const store = configureStore()

  beforeEach(() => {
    pristine = true
    reset = jest.fn()
    submitting = false
    handleSubmit = fn => fn
    mountedEventForm = undefined
  })

  const eventForm = () => {
    if (!mountedEventForm) {
      const props = {
        pristine,
        reset,
        submitting,
        handleSubmit
      }

      const Composer = ({
        classes
      }) => (
          <Provider store={store}>
            <ConnectedEventForm classes={classes} {...props} />
          </Provider>
        )

      Composer.propTypes = {
        classes: PropTypes.object.isRequired
      }

      const Composition = withStyles(styles)(Composer)
      mountedEventForm = mount(<Composition />)
    }
    return mountedEventForm
  }

  it('always renders EventForm correctly', () => {
    const wrapper = eventForm()
    expect(wrapper).toMatchSnapshot()
  })

  it('always render Event title', () => {
    const wrapper = eventForm()
    expect(wrapper.find('TextFieldRedux')).toHaveLength(1)
  })

  describe('when submitting the form', () => {

    it('if event title is provided, the form is submitted successfully', () => {
      const wrapper = eventForm()
      wrapper.find('form').simulate('submit')
    })

    // xit('if event title is not provided, it should throw an error', () => {
    //   const wrapper = eventForm()
    //   wrapper.find('form').simulate('submit')
    // })

  })
})