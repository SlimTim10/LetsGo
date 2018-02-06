import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';

const styles = theme => ({
  container: {
    marginBottom: 16
  },
  textField: {
    width: 200
  }
});

function TimePickers(props) {
  const { classes } = props;

  return (
    <form className={classes.container} noValidate>
      <TextField
        id="time"
        label="Time"
        type="time"
        defaultValue={props.value}
        className={classes.textField}
        InputLabelProps={{
          shrink: true
        }}
        inputProps={{
          step: 300 // 5 min
        }}
        onChange={props.onChange}
        />
    </form>
  );
}

TimePickers.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TimePickers);
