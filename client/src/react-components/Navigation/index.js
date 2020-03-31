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



class Navigation extends BaseComponent {
  filterState({ modalOpen}) {
    return { modalOpen};
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

  render() {
    return (
      <div className={this.classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography className={this.classes.title} variant="h6" noWrap>
              ArkOneGraph - 明日方舟刷素材推荐一图流
            </Typography>
            <IconButton className={this.classes.nightModeButton} color="inherit">
              <SettingsIcon onClick={()=>{this.handleChange("modalOpen")}} />
            </IconButton>
            <IconButton className={this.classes.nightModeButton} color="inherit">
              <NotesIcon onClick={()=>{this.handleChange("listOpen")}} />
            </IconButton>

          </Toolbar>
        </AppBar>
        <SettingsModal open={this.state.modalOpen} />
        {/* <EfficiencyTableModal open={this.state.listOpen} /> */}
      </div>
    );
  }
} export default Navigation;
