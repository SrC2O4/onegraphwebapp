import React from 'react';
import './App.css';
import Navigation from './react-components/Navigation/';
import AppFooter from './react-components/Footer/';
import MaterialTable from './react-components/MaterialTable';
import { initialization} from './actions/material';
class App extends React.Component {
  render (){
    initialization();
    return(
      <div className="App">
        <Navigation/>
        <MaterialTable/>
        <AppFooter/>
        
      </div>
    );
  }
}
export default App;
