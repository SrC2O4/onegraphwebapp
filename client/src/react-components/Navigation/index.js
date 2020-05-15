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



class Navigation extends BaseComponent {
  filterState({ modalOpen,orangeStore,listOpen}) {
    return { modalOpen,orangeStore,listOpen};
  }

  

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

  render() {
    return (
      <div className={this.classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography className={this.classes.title} variant="h6" noWrap>
              ArkOneGraph - 明日方舟刷素材推荐一图流
            </Typography>
            <IconButton className={this.classes.nightModeButton} color="inherit" onClick={()=>{this.handleChange("modalOpen")}}>
              <SettingsIcon />
            </IconButton>
            <IconButton className={this.classes.nightModeButton} color="inherit" onClick={()=>{this.handleChange("listOpen")}}>
              <NotesIcon />
            </IconButton>
            <IconButton className={this.classes.nightModeButton} color="inherit" style={{ padding: '0' }} onClick={() => { this.stroeToggle()}}>
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
          </Toolbar>
        </AppBar>
        <SettingsModal open={this.state.modalOpen} />
        <EfficiencyTableModal open={this.state.listOpen} />
        {console.log(this.state.listOpen)}
      </div>
    );
  }
} export default Navigation;
