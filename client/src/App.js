import React from 'react';
import Navigation from './react-components/Navigation/';
import AppFooter from './react-components/Footer/';
import MaterialTable from './react-components/MaterialTable';
import MessageSnack from './react-components/MessageSnack';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import BaseComponent from "./react-components/Base";
import { getCurrentTheme,updateTheme } from "./actions/theme";
import {setState, getState} from 'statezero';
import memory from "./actions/memory";

//i18N basis
import {IntlProvider} from "react-intl";

//i18N texts
import texts_en from './lang/en_US.json'
import texts_ja from './lang/ja_JP.json'
import texts_ko from './lang/ko_KR.json'
import texts_zh_Hans from './lang/zh_Hans.json'
import texts_zh_Hant from './lang/zh_Hant.json'


//check browser lang
const browserLanguage = window.navigator.userLanguage || window.navigator.language
const language = browserLanguage.split(/[-_]/)[0]

const titleText = {
 'zh':"明日方舟刷素材推荐一图流",
 'en':"ArkOneGraph"
}

const contentText ={
    'en': texts_en,
    'ja': texts_ja,
    'ko': texts_ko,
    'zh_Hans': texts_zh_Hans,
    'zh_Hant': texts_zh_Hant,
    'zh_TW': texts_zh_Hant,
    'zh_CN': texts_zh_Hans, //idk. hope it works, lol
    'zh':texts_zh_Hans 
}

class App extends BaseComponent {

  constructor() {
    super();
    if(!memory.getItem('lang')){
      if (language === 'zh_Hans' || language === 'zh_Hant' || language === 'ja' || language === 'kr'){
        setState('lang', language)
      } else if (browserLanguage === 'zh-CN'){
        setState('lang','zh_Hans')
      } else if (browserLanguage === 'zh-TW'){
        setState('lang','zh_Hant')
      } else {
        setState('lang', 'en')
      }
    }
    document.title = browserLanguage.includes('zh')?titleText.zh:titleText.en
  }

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
    updateTheme();
  }

  filterState({ currentTheme,userTheme,lang }) {
    return { currentTheme,userTheme,lang }
  }

  
  render (){
    return(
      <IntlProvider locale ={this.state.lang.substr(0,2)} defaultLocale='en' messages={contentText[this.state.lang]}>
        <MuiThemeProvider theme={getCurrentTheme(this.state.currentTheme)}> 
        <CssBaseline/>
        <Navigation/>
        <MaterialTable/>
        <MessageSnack/>
        <AppFooter/> 
        </MuiThemeProvider>
      </IntlProvider>
    );
  }


}
export default App;
