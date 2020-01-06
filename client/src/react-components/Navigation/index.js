import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
class Navigation extends React.Component{
    classes = makeStyles(theme => ({
      root: {
        flexGrow: 1,
      },
      menuButton: {
        marginRight: theme.spacing(2),
      },
      title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
          display: 'block',
        }
        }
      }));

    render(){
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
                </Toolbar>
              </AppBar>
            </div>
          );
    }
} export default Navigation;
