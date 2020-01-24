import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import Navigation from './react-components/Navigation/';
import AppFooter from './react-components/Footer/';
import MaterialTable from './react-components/MaterialTable';

class App extends React.Component {
  render (){
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
