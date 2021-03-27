import React, {useEffect, Fragment} from 'react';
import { useStoreActions, useStoreState, useStoreRehydrated } from 'easy-peasy';
import { Route, Switch } from "react-router-dom";
import {useStyles} from 'Style/components';
import MenuAppBar from 'Components/MenuAppBar';
import Main from 'Components/Main';
import Spinner from 'Components/Spinner';
import FullView from 'Components/FullView';
import Footer from 'Components/Footer';

const App = () => {
  const classes = useStyles()
  const isRehydrated = useStoreRehydrated();
  const initialState = useStoreActions(actions => actions.simpleData.fetchInitialState);
  const updateData =  useStoreActions(actions => actions.simpleData.updateData);
  const data = useStoreState(state => state.simpleData.data);

  useEffect(() => {
    initialState()
  }, [])

  return (
    <div className={classes.app}>
      <MenuAppBar />
      {isRehydrated ? 
      <Fragment>
        <Switch>
          <Route
            path="/"
            children={<Main data={data} updateData={updateData}/>}
            exact
          />
          <Route
            path="/:id"
            children={({
              match: {
                params: { id },
              },
            }) => <FullView id={id} data={data} updateData={updateData} />}
          />
        </Switch>
        <Footer data={data} />
      </Fragment>
      : <Spinner/>}
    </div>
  );
};

export default App;