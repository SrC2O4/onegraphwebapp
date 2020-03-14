import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Brightness2Icon from '@material-ui/icons/Brightness2';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SettingsIcon from '@material-ui/icons/Settings';
import {setState} from 'statezero';
import SettingsModal from "./../SettingsModal";
import BaseComponent from "./../Base";



class Navigation extends BaseComponent {
  filterState({ modalOpen, currentTheme }) {
    return { modalOpen, currentTheme };
  }

  

  classes = makeStyles(theme => ({
    root: {
      flexGrow: 1
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    nightModeButton: {
      marginRight: theme.spacing(2)
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
    if (name === "currentTheme") {
      setState(name, (this.state.currentTheme==='light'?'dark':'light'));
    } else if (name === "modalOpen") {
      setState(name, true);
    }
  };

  render() {
    return (
      <div className={this.classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={this.classes.menuButton}
              color="inherit"
              aria-label="open drawer"
            >
              <MenuIcon />
            </IconButton>
            <Typography className={this.classes.title} variant="h6" noWrap>
              ArkOneGraph - 明日方舟刷素材推荐一图流
            </Typography>
            <IconButton className={this.classes.nightModeButton} color="inherit">
              <SettingsIcon onClick={()=>{this.handleChange("modalOpen")}} />
            </IconButton>
            <IconButton className={this.classes.menuButton} color="inherit">
              <Brightness2Icon onClick={()=>{this.handleChange("currentTheme")}} />
            </IconButton>
          </Toolbar>
        </AppBar>
        <SettingsModal open={this.state.modalOpen} />
      </div>
    );
  }
} export default Navigation;
