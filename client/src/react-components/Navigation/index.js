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
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

class Navigation extends BaseComponent {
  filterState({ modalOpen,orangeStore,listOpen, server,serverListOpen}) {
    return { modalOpen,orangeStore,listOpen,server,serverListOpen};
  }

  anchor = null
  selected = 0

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

  
  handleServerList = (e) => {
    this.anchor = e.target
    console.log(this.anchor)
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

  
  stroeToggle = () => {
    memory.setItem("orangeStore",!this.state.orangeStore);
    setState('orangeStore', !this.state.orangeStore);
  };
  
  render() {
    const options =['CN','JP/EN/KR', 'TW']
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
            <IconButton className={this.classes.nightModeButton} color="inherit" onClick={()=>{this.handleChange("listOpen")}}>
              <NotesIcon />
            </IconButton>
              

      


          </Toolbar>

        </AppBar>
        <SettingsModal open={this.state.modalOpen} />
        <EfficiencyTableModal open={this.state.listOpen} />
      </div>
    );
  }
} export default Navigation;
