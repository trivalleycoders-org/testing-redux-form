import React from 'react'
import { mount } from 'enzyme'
import {Provider} from 'react-redux'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

import configureStore from '../../../store'
import ConnectedEventForm, {EventForm} from '../../../ui/EventForm/EventForm'
import styles from '../../../ui/EventForm/styles'

describe('EventForm', () => {

  let mountedEventForm = undefined
  const store = configureStore()

  beforeEach(() => {
    mountedEventForm = undefined
  })

  const connectedEventForm = () => {
    if (!mountedEventForm) {
      const Composer = ({
        classes
      }) => (
          <Provider store={store}>
            <ConnectedEventForm classes={classes} />
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

    it('if event title is provided, the form is submitted successfully', () => {
      const wrapper = connectedEventForm()
      const titleInput = wrapper.find('textarea').find('[name="title"]')
      titleInput.simulate('change', { target: { value: 'Drone Event'}})
      // simulate has be called on the node, otherwise it will not work
      wrapper.find('form').simulate('submit')
      expect(wrapper.find(EventForm).prop('submitSucceeded')).toBe(true)
      expect(wrapper.find('Form').prop('syncErrors')).toEqual({})
    })

    it('if event title is not provided, it should throw an error', () => {
      const err = { title: 'Required' }
      const wrapper = connectedEventForm()
      const titleInput = wrapper.find('textarea').find('[name="title"]')
      titleInput.simulate('change', { target: { value: ''}})
      wrapper.find('form').simulate('submit')
      expect(wrapper.find(EventForm).prop('submitSucceeded')).toBe(false)
      // SyncErrors are on the Form node
      expect(wrapper.find('Form').prop('syncErrors')).toEqual(err)
    })
  })
})