import React from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { Route, Switch } from "react-router-dom";
import {useStyles} from 'Style/components';
import MenuAppBar from 'Components/MenuAppBar';
import Main from 'Components/Main';

const App = () => {
  const classes = useStyles()

  return (
    <div className={classes.app}>
      <MenuAppBar />
        <Switch>
          <Route
            path="/"
            children={<Main />}
            exact
          />
          {/* <Route
            path="/:id"
            children={({
              match: {
                params: { id },
              },
            }) => <FullView id={id} data={data} />}
          /> */}
        </Switch>
      {/* <Footer data={data} /> */}
    </div>
  );
};

export default App;