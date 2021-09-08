import React from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import PeopleIcon from '@material-ui/icons/People';
import ListItemText from '@material-ui/core/ListItemText';
import BubbleChartIcon from '@material-ui/icons/BubbleChart';
import TocIcon from '@material-ui/icons/Toc';
import SearchIcon from '@material-ui/icons/Search';
import Backdrop from '@material-ui/core/Backdrop';
import useStyles from './header.styles';

const navLinks = {
  search: {
    title: 'Поиск проектов',
    icon: SearchIcon,
    url: '/',
  },
  table: {
    title: 'Таблица проектов',
    icon: TocIcon,
    url: '/table',
  },
  mentors: {
    title: 'Наставники',
    icon: PeopleIcon,
    url: '/mentors',
  },
  charts: {
    title: 'Графики',
    icon: BubbleChartIcon,
    url: '/charts',
  },
};

export default function Header(): JSX.Element {
  const classes = useStyles();
  const [isMenuOpen, setMenu] = React.useState(false);

  const handleMenuOpen = () => {
    setMenu(true);
  };

  const handleMenuClose = () => {
    setMenu(false);
  };

  return (
    <>
      <AppBar
        component="header"
        position="fixed"
        color="primary"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: isMenuOpen,
        })}
      >
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap className={classes.title} component={Link} to="/">
            htmlacademy dashboard
          </Typography>
          <IconButton
            color="inherit"
            aria-label="open menu"
            edge="end"
            onClick={handleMenuOpen}
            className={clsx(isMenuOpen && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Backdrop className={classes.backdrop} open={isMenuOpen} onClick={handleMenuClose}>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="right"
          open={isMenuOpen}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={handleMenuClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List component="nav">
            {Object.values(navLinks).map(({ icon: Icon, title, url }) => (
              <Link key={title} to={url} className={classes.link}>
                <ListItem button>
                  <ListItemIcon>
                    <Icon />
                  </ListItemIcon>
                  <ListItemText primary={title} />
                </ListItem>
              </Link>
            ))}
          </List>
        </Drawer>
      </Backdrop>
    </>
  );
}
