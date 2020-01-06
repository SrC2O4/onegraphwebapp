import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Container from '@material-ui/core/Container';
import Typography from './Typography';

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
    backgroundColor: 'darkgrey',
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
}));

export default function AppFooter() {
  const classes = useStyles();

  return (
    <Typography component="footer" className={classes.root}>
      <Container className={classes.container}>
        <Grid container spacing={5}>
          <Grid item xs={6} sm={4} md={3}>
            <Grid
              container
              direction="column"
              justify="flex-end"
              className={classes.iconsWrapper}
              spacing={2}
            >
              <Grid item>
                <Copyright />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6} sm={4} md={2}>
            <Typography variant="h6" marked="left" gutterBottom>
              数据来源
            </Typography>
            <ul className={classes.list}>
              <li className={classes.listItem}>
                <Link href="/premium-themes/onepirate/terms/">企鹅物流</Link>
              </li>
              <li className={classes.listItem}>
                <Link href="/premium-themes/onepirate/privacy/">ArkTools</Link>
              </li>
            </ul>
          </Grid>
          <Grid item xs={6} sm={4} md={2}>
            <Typography variant="h6" marked="left" gutterBottom>
              算法
            </Typography>
            <ul className={classes.list}>
              <li className={classes.listItem}>
                <Link href="/premium-themes/onepirate/terms/">ArkPlanner</Link>
              </li>
            </ul>
          </Grid>
          <Grid item xs={6} sm={4} md={2}>
            <Typography variant="h6" marked="left" gutterBottom>
              素材来源
            </Typography>
            <ul className={classes.list}>
              <li className={classes.listItem}>
                <Link href="/premium-themes/onepirate/terms/">NGA 一图流</Link>
              </li>
              <li className={classes.listItem}>
                <Link href="/premium-themes/onepirate/terms/">明日方舟工具箱</Link>
              </li>
              <li className={classes.listItem}>
                <Link href="/premium-themes/onepirate/terms/">PTRS wiki</Link>
              </li>
              <li className={classes.listItem}>
                <Link href="/premium-themes/onepirate/terms/">水晶泡芙工坊</Link>
              </li>
            </ul>
          </Grid>
          <Grid item xs={6} sm={4} md={2}>
            <Typography variant="h6" marked="left" gutterBottom>
              开发者
            </Typography>
            <ul className={classes.list}>
              <li className={classes.listItem}>
                前端 <Link href="/premium-themes/onepirate/terms/">Strontium233</Link>
              </li>
              <li className={classes.listItem}>
                后端 <Link href="/premium-themes/onepirate/terms/">SQRPI</Link>
              </li>
            </ul>
          </Grid>
          <Grid item>
            <Typography variant="caption">
              {'明日方舟素材一图流采用'}
              <Link
                href="https://creativecommons.org/licenses/by/3.0/"
                title="Creative Commons BY 3.0"
                target="_blank"
                rel="noopener noreferrer"
              >
                知识共享 署名-非商业性使用 4.0 国际 许可协议
              </Link>
              {'进行许可'}
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Typography>
  );
}
