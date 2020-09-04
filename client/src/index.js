import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'

import * as serviceWorker from './serviceWorker'
import { initialization } from './actions/material'
//import { getState } from 'statezero'
//import api from './actions/api'

// //i18N basis
// import {IntlProvider} from "react-intl";

// //i18N texts
// import texts_en from './lang/en_US.json'
// import texts_ja from './lang/ja_JP.json'
// import texts_ko from './lang/ko_KR.json'
// import texts_zh_Hans from './lang/zh_Hans.json'
// import texts_zh_Hant from './lang/zh_Hant.json'

//this is necessary for i18N
// addLocaleData([...en, ...zh,...ja,...kr]);

//initialization and fetch data from db
initialization()

ReactDOM.render(<App />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
if (process.env.REACT_APP_SW !== 'true' || process.env.NODE_ENV !== 'production') serviceWorker.unregister()
else serviceWorker.register()
