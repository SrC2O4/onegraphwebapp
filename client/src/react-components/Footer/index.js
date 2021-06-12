import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Container from '@material-ui/core/Container';
import Typography from './Typography';
import GitHubIcon from '@material-ui/icons/GitHub';
import { getState } from 'statezero';
import {FormattedMessage} from 'react-intl';
import Chip from '@material-ui/core/Chip';
import { Icon, /* InlineIcon */ } from '@iconify/react';
import discordIcon from '@iconify/icons-simple-icons/discord';
import Avatar from '@material-ui/core/Avatar';
import TwitterIcon from '@material-ui/icons/Twitter';


function Copyright() {
  return (
    <React.Fragment>
      { '© '}
      <Link color="inherit" href="https://github.com/Strontium233/onegraphwebapp">
        ArkOneGraph
      </Link>{' '}
      {new Date().getFullYear()}
    </React.Fragment>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    backgroundColor: getState("currentTheme")==='dark'?'#303030':'#a9a9a9',
    color: 'white',
  },
  container: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
    display: 'flex',
  },
  iconsWrapper: {
    height: 120,
  },
  icons: {
    display: 'flex',
  },
  icon: {
    width: 48,
    height: 48,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.palette.warning.main,
    marginRight: theme.spacing(1),
    '&:hover': {
      backgroundColor: theme.palette.warning.dark,
    },
  },
  list: {
    margin: 0,
    listStyle: 'none',
    paddingLeft: 0,
  },
  listItem: {
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
   fontSize: 14,
  },
  language: {
    marginTop: theme.spacing(1),
    width: 150,
  },
  gitHubIcon: {
    fontSize: 'medium',
  },
  linkColor: {
    color:getState("currentTheme")==='dark'? '#039be5f5 !important':'#3f51b5'
  }
}));

export default function AppFooter() {
  const classes = useStyles();

  return (
    <Typography component="footer" className={classes.root}>
      <Container className={classes.container}>
        <Grid container spacing={4}>
          <Grid item xs={6} sm={4} md={2}>
            <Grid
              container
              direction="column"
              justify="flex-end"
              className={classes.iconsWrapper}
              spacing={2}
            >
              <Grid item>
                <Copyright />
                <br/>
                <Chip avatar={<Avatar><Icon icon={discordIcon} /></Avatar>} label={<FormattedMessage id='discord'/>} component="a" href="https://discord.gg/aFH3sHh" clickable />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6} sm={4} md={2}>
            <Typography variant="h6" marked="left" gutterBottom>
              <FormattedMessage id='dataSource'/>
            </Typography>
            <ul className={classes.list}>
              <li className={classes.listItem}>
                <Link className={classes.linkColor} href="https://penguin-stats.io/"><FormattedMessage id='penguin'/></Link>
              </li>
              <li className={classes.listItem}>
                <Link className={classes.linkColor} href="https://gachasalt.github.io/ArkToolDemo/#/">ArkTools</Link>
              </li>
              {process.env.REACT_APP_ICP ?
              <li className={classes.listItem}>
                <Link className={classes.linkColor} href="https://arkonegraph.herokuapp.com">AOG origin</Link>
              </li>
              :''
              }
            </ul>
          </Grid>
          <Grid item xs={6} sm={4} md={2}>
            <Typography variant="h6" marked="left" gutterBottom>
              <FormattedMessage id='algorithm'/>
            </Typography>
            <ul className={classes.list}>
              <li className={classes.listItem}>
                <Link className={classes.linkColor} href="https://github.com/ycremar/ArkPlanner">ArkPlanner<GitHubIcon className = {classes.gitHubIcon}/></Link>
              </li>
            </ul>
          </Grid>
          <Grid item xs={6} sm={4} md={2}>
            <Typography variant="h6" marked="left" gutterBottom>
              <FormattedMessage id='source'/>
            </Typography>
            <ul className={classes.list}>
              <li className={classes.listItem}>
                <Link className={classes.linkColor} href="https://bbs.nga.cn/read.php?tid=19069337"><FormattedMessage id='nga'/></Link>
              </li>
              <li className={classes.listItem}>
                <Link className={classes.linkColor} href="https://ak.graueneko.xyz/"><FormattedMessage id='arknights'/></Link>
              </li>
              <li className={classes.listItem}>
                <Link className={classes.linkColor} href="http://ak.mooncell.wiki/w/%E9%A6%96%E9%A1%B5">PRTS wiki</Link>
              </li>
              <li className={classes.listItem}>
                <Link className={classes.linkColor} href="https://github.com/Evealicemier">水晶泡芙工坊<GitHubIcon className = {classes.gitHubIcon}/></Link>
              </li>
            </ul>
          </Grid>
          <Grid item xs={6} sm={4} md={2}>
            <Typography variant="h6" marked="left" gutterBottom>
              <FormattedMessage id='developers'/>
            </Typography>
            <ul className={classes.list}>
              <li className={classes.listItem}>
              <FormattedMessage id='frontend'/> <Link className={classes.linkColor} href="https://github.com/Strontium233/onegraphwebapp">Strontium233<GitHubIcon className = {classes.gitHubIcon}/></Link>
              </li>
              <li className={classes.listItem}>
              <FormattedMessage id='frontend2'/> <Link className={classes.linkColor} href="https://github.com/YanAndFish">YanAndFish<GitHubIcon className = {classes.gitHubIcon}/></Link>
              </li>
              <li className={classes.listItem}>
              <FormattedMessage id='backend'/> <Link className={classes.linkColor} href="https://github.com/SQRPI/ArkOneGraph">SQRPI<GitHubIcon className = {classes.gitHubIcon}/></Link>
              </li>
              <li className={classes.listItem}>
              <FormattedMessage id='local1'/> IKAROS
              </li>
              <li className={classes.listItem}>
              <FormattedMessage id='local2'/> <Link className={classes.linkColor} href="https://twitter.com/mitei_ark">mitei<TwitterIcon className = {classes.gitHubIcon}/></Link>
              </li>
            </ul>
          </Grid>

          <Grid item xs={6} sm={4} md={2}>
            <Typography variant="h6" marked="left" gutterBottom>
              <FormattedMessage id='friend-link'/>
            </Typography>
            <ul className={classes.list}>
              <li className={classes.listItem}>
              <FormattedMessage id='mew'/> <Link className={classes.linkColor} href="https://mew.fun/n/arknights">Mew-Arknights</Link>
              </li>
              
            </ul>
          </Grid>

          <Grid item>
            <Typography variant="caption">
            <FormattedMessage id='license1'/>
              <Link
                href="https://creativecommons.org/licenses/by-nc/4.0/"
                title="CC BY-NC 4.0"
                target="_blank"
                rel="noopener noreferrer"
                className={classes.linkColor}
              >
                <FormattedMessage id='license2'/>
              </Link>
              {<FormattedMessage id='license3'/>}
              {
                process.env.REACT_APP_ICP ?
                <div>
                {'互联网ICP备案：'}
                <Link
                  href="http://www.beian.miit.gov.cn/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={classes.linkColor}
                >
                  {process.env.REACT_APP_ICP}
                </Link>
                </div>
                : ''
              }
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Typography>
  );
}
