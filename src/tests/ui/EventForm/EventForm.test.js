import React from 'react'
import { mount } from 'enzyme'
import {Provider} from 'react-redux'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

import configureStore from '../../../store'
import ConnectedEventForm, {EventForm} from '../../../ui/EventForm/EventForm'
import styles from '../../../ui/EventForm/styles'

describe('EventForm', () => {

  let /*handleSubmit,*/ pristine, reset, submitting
  let mountedEventForm = undefined
  const store = configureStore()

  beforeEach(() => {
    pristine = true
    reset = jest.fn()
    submitting = false
    /*handleSubmit = fn => fn */
    mountedEventForm = undefined
  })

  const connectedEventForm = () => {
    if (!mountedEventForm) {
      const props = {
        pristine,
        reset,
        submitting
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
    const wrapper = connectedEventForm()
    expect(wrapper).toMatchSnapshot()
  })

  it('always renders Event title', () => {
    const wrapper = connectedEventForm()
    expect(wrapper.find('textarea').find('[name="title"]')).toHaveLength(1)
  })

  describe('when submitting the form', () => {

    beforeEach(() => {
      mountedEventForm = undefined
    })

    it('if event title is not provided, it should throw an error', () => {
      const err = { title: 'Required' }
      const wrapper = connectedEventForm()
      wrapper.find('form').simulate('submit')
      expect(wrapper.find(EventForm).prop('submitSucceeded')).toBe(false)
      expect(wrapper.find('Form').prop('syncErrors')).toEqual(err)
    })

    it('if event title is provided, the form is submitted successfully', () => {
      const wrapper = connectedEventForm()
      const titleInput = wrapper.find('textarea').find('[name="title"]')
      titleInput.simulate('change', { target: { value: 'Drone Event'}})
      wrapper.find('form').simulate('submit')
      expect(wrapper.find(EventForm).prop('submitSucceeded')).toBe(true)
    })
  })
})