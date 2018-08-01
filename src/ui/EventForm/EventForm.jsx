import React from 'react'
import { compose } from 'recompose'
import { reduxForm } from 'redux-form'
import { withStyles } from '@material-ui/core/styles'
import {
  Button,
} from '@material-ui/core'

/* User */
import TextFieldRedux from 'ui/ui-elements/TextFieldRedux'
import validate from './validate'
import styles from './styles'

/* Dev */
import ShowValues from 'ui/ui-elements/ShowValues'
// eslint-disable-next-line
import { green } from 'logger'


const shapeDataOut = (formValues) => {
  return formValues
}
class EventForm extends React.Component {
  state = {
    values: '',
  }

  onSubmit = (values) => {
    const reshapedData = shapeDataOut(values)
    this.setState({
      values: reshapedData
    })

    // are the values correct?
    // if yes, send to server
  }

  render() {
    const { classes, handleSubmit, pristine, reset, submitting } = this.props

    return (
      <div className={classes.pageWrapper}>
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <div className={classes.titleArea}>
            <TextFieldRedux
              fieldName='title'
              fieldLabel='Event title'
              fullWidth
              rows={2}
            />
          </div>
          <div>
            <Button type='button'>
              Cancel
            </Button>
            <Button type='submit' disabled={pristine || submitting}>
              Submit
            </Button>
            <Button type='button' disabled={pristine || submitting} onClick={reset}>
              Clear Values
            </Button>
          </div>
        </form>
        <ShowValues values={this.state.values} />
      </div>
    )
  }
}

export default compose(
  withStyles(styles),
  reduxForm({
    form: 'NewEvent',
    validate,
  })
)(EventForm)