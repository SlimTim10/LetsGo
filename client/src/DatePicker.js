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

function DatePickers(props) {
  const { classes } = props;

  return (
    <form className={classes.container} noValidate>
      <TextField
        id="date"
        label="Date"
        type="date"
        defaultValue={props.value}
        className={classes.textField}
        InputLabelProps={{
          shrink: true
        }}
        onChange={props.onChange}
        />
    </form>
  );
}

DatePickers.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DatePickers);
