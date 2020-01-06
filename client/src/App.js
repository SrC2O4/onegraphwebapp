import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import Navigation from './react-components/Navigation/';
import AppFooter from './react-components/Footer/';
class App extends React.Component {
  render (){
    return(
      <div className="App">
        <Navigation/>
        <AppFooter/>
      </div>
    );
  }
}
export default App;
