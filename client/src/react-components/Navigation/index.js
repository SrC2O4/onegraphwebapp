import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import NotesIcon from '@material-ui/icons/Notes';
import SettingsIcon from '@material-ui/icons/Settings';
import {setState} from 'statezero';
import SettingsModal from "./../SettingsModal";
import EfficiencyTableModal from "./../EfficiencyTableModal";
import BaseComponent from "./../Base";
import memory from "../../actions/memory";
import DnsIcon from '@material-ui/icons/Dns';
import TranslateIcon from '@material-ui/icons/Translate';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import {FormattedMessage} from 'react-intl';

class Navigation extends BaseComponent {
  filterState({ modalOpen,orangeStore,listOpen, server,serverListOpen,lang,langMenuOpen}) {
    return { modalOpen,orangeStore,listOpen,server,serverListOpen,lang,langMenuOpen};
  }

  
  anchor = null
  selected = 0
  anchor2 = null
  selected2 = 0

  

  classes = makeStyles(theme => ({
    root: {
      flexGrow: 1
    },
    title: {
      flexGrow: 1,
      display: "none",
      [theme.breakpoints.up("sm")]: {
        display: "block"
      }
    }
  }));

  handleChange = name => {
    setState(name, true);
  };

  stroeToggle = () => {
    memory.setItem("orangeStore",!this.state.orangeStore);
    setState('orangeStore', !this.state.orangeStore);
  };

  
  
  handleServerList = (e) => {
    this.anchor = e.target
    setState('serverListOpen', true)
  }
  handleClose = (option,index) =>{
    if (option != null){
      memory.setItem("server",option);
      setState('server', option)
    }
    this.selected = index
    setState('serverListOpen', false)
  }

  handleLangList = (e) => {
    this.anchor2 = e.target
    setState('langMenuOpen', true)
  }
  handleLangClose = (option,index) =>{
    if (option != null){
      if(option =='简体中文'){
        memory.setItem("lang",'zh_Hans');
        setState('lang', 'zh_Hans')
      } else if (option =='繁體中文'){
        memory.setItem("lang",'zh_Hant');
        setState('lang', 'zh_Hant')
      } else if  (option =='日本語'){
        memory.setItem("lang",'ja');
        setState('lang', 'ja')
      } else if  (option =='한국어'){
        memory.setItem("lang",'ko');
        setState('lang', 'ko')
      } else {
        memory.setItem("lang",'en');
        setState('lang', 'en')
      }
      
    }
    console.log(this.state.lang)
    this.selected2 = index
    setState('langMenuOpen', false)
  }

  render() {
    const options =['CN','JP/EN/KR', 'TW']
    const lang =['简体中文','繁體中文','日本語','English', '한국어']
    const table = { 'en': 'English', 'zh_Hans':'简体中文','zh_Hant':'繁體中文', 'ja':'日本語', 'ko':'한국어'}
    return (
      <div className={this.classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography className={this.classes.title} variant="h6" noWrap>
              ArkOneGraph <FormattedMessage id='title'/>
            </Typography>
            <IconButton className={this.classes.nightModeButton} color="inherit" onClick={()=>{this.handleChange("modalOpen")}}>
              <SettingsIcon />
            </IconButton>
            <IconButton className={this.classes.nightModeButton} color="inherit" onClick={()=>{this.handleChange("listOpen")}}>
              <NotesIcon />
            </IconButton>
            <IconButton className={this.classes.nightModeButton} color="inherit" style={{ padding: '0' }} disabled={this.state.server!='CN'} onClick={() => { this.stroeToggle()}}>
              <svg width="50px" height="50px" version="1.1" viewBox="0 0 339 339" style={{textShadow:'#f00 0 0 10px'}} >
                <defs>
                  <filter id="f3" x="-110%" y="-110%" width="400%" height="400%">
                    <feOffset result="offOut" in="SourceGraphic" dx="0" dy="0"></feOffset>
                    <feGaussianBlur result="blurOut" in="offOut" stdDeviation="50"></feGaussianBlur>
                    <feBlend in="SourceGraphic" in2="blurOut" mode="multiply"></feBlend>
                  </filter>
                </defs>
                <g>
                  <path style={{ fill:this.state.orangeStore?'orange':'#fff' }} filter={this.state.orangeStore?'url(#f3)':''} d="M170 95l-64 37 -1 56 14 -8 0 -39 51 -30 -1 -16zm0 24l-45 26 0 33 14 -8 0 -17 33 -19 0 -16 -1 1zm-62 89l63 36 49 -28 -16 -8 -33 20 -50 -29 -14 9zm19 -11l44 26 29 -17 -14 -9 -15 9 -31 -18 -13 8zm108 10l0 -74 -47 -28 0 19 33 19 0 57 13 8zm-46 -78l0 16 15 8 0 35 15 10 0 -52 -29 -18zm-2 18l-14 -8 0 17 -30 16 0 14 15 -9 27 18 16 -6 -14 -9 0 -32z"/>
                </g>
              </svg>
            </IconButton>
            <Button aria-controls="simple-menu"  color="inherit" className={this.classes.nightModeButton} startIcon={<DnsIcon />} onClick={this.handleServerList}>
              {this.state.server}
            </Button>
            <Menu
              id="simple-menu"
              keepMounted
              open={this.state.serverListOpen}
              anchorEl={this.anchor}
              onClose={()=>{this.handleClose(null)}}
            >
            {options.map((option, index) => (
              <MenuItem
                key={option}
                selected={this.selected === index}
                onClick={()=>{this.handleClose(option,index)}}
              >
                {option}
              </MenuItem>
            ))}
            </Menu>
            
            <Button aria-controls="lang-menu"  color="inherit" className={this.classes.nightModeButton} startIcon={<TranslateIcon />} onClick={this.handleLangList}>
              {
                table[this.state.lang]
              }
            </Button>
            <Menu
              id="lang-menu"
              keepMounted
              open={this.state.langMenuOpen}
              anchorEl={this.anchor2}
              onClose={()=>{this.handleLangClose(null)}}
            >
            {lang.map((option, index) => (
              <MenuItem
                key={option}
                selected={this.selected2 === index}
                onClick={()=>{this.handleLangClose(option,index)}}
              >
                {option}
              </MenuItem>
            ))}
            </Menu>

          </Toolbar>
        </AppBar>
        <SettingsModal open={this.state.modalOpen} />
        <EfficiencyTableModal open={this.state.listOpen} />
        {console.log(this.state.listOpen)}
      </div>
    );
  }
} export default Navigation;
