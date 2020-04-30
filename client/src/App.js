import React from 'react';
import Navigation from './react-components/Navigation/';
import AppFooter from './react-components/Footer/';
import MaterialTable from './react-components/MaterialTable';
import MessageSnack from './react-components/MessageSnack';
import { createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
import { getState } from "statezero";
import { CssBaseline } from '@material-ui/core';


class App extends React.Component {
  
  componentDidMount () {
    // Include the Crisp code here, without the <script></script> tags
    window.$crisp = [];
    window.CRISP_WEBSITE_ID = "9a314341-103f-4b4a-953d-8c02938204c3";

    (function() {
      var d = document;
      var s = d.createElement("script");

      s.src = "https://client.crisp.chat/l.js";
      s.async = 1;
      d.getElementsByTagName("head")[0].appendChild(s);
    })();
   }
  render (){
    return(
      <div>
        <MuiThemeProvider muiTheme={createMuiTheme({palette: {type: getState('currentTheme')}})}> 
        <CssBaseline/>
        <Navigation/>
        <MaterialTable/>
        <MessageSnack/>
        <AppFooter/> 
        </MuiThemeProvider>
      </div>
    );
  }


}
export default App;
