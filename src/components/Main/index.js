import React from 'react';

import {useStyles} from 'Style/components';

export default function Main(props) {
    const classes = useStyles()
  return (
    <React.Fragment>
        <div className={classes.mainSection}>
            {props.children}
        </div>
    </React.Fragment>
  );
}