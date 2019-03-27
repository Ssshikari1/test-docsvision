import React, { Component } from 'react';
import './App.css';
import Scorocode from 'scorocode';
import MainContainer from './containers/main';
import { store } from './store/configure-store';
import { Provider } from 'react-redux';

class App extends Component {
  render() {
    Scorocode.Init({
      ApplicationID: "3196b2e873234547ad8b06ed636d3538",
      JavaScriptKey: "5e85f685a23e44e6abad95accc1dd2ea",
      MasterKey:     "659d718ff9664f6fafbdb79efc93cb34"
    });
    return (
      <Provider store={store}>
        <MainContainer />
      </Provider>
    );
  }
}

export default App;
