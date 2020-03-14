import React from 'react';
import Navigation from './react-components/Navigation/';
import AppFooter from './react-components/Footer/';
import MaterialTable from './react-components/MaterialTable';
import { createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
import { getState } from "statezero";
import { CssBaseline } from '@material-ui/core';


class App extends React.Component {
  
  render (){
    return(
      <div>
        <MuiThemeProvider muiTheme={createMuiTheme({palette: {type: getState('currentTheme')}})}> 
        <CssBaseline/>
        <Navigation/>
        <MaterialTable/>
        <AppFooter/> 
        </MuiThemeProvider>
      </div>
    );
  }


}
export default App;
