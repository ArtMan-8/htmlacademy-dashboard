import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SelectProjects from '../SelectProjects';
import DataTable from '../DataTable';
import useStyles from './header.styles';
import Charts from '../Charts';

export default function Header(): JSX.Element {
  const classes = useStyles();
  const [currentTab, setCurrentTab] = React.useState(0);

  const handleTabSelect = (event: React.ChangeEvent<Record<string, unknown>>, newValue: number) => {
    setCurrentTab(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setCurrentTab(index);
  };

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar} component="div">
        <Tabs
          value={currentTab}
          onChange={handleTabSelect}
          indicatorColor="primary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs"
        >
          <Tab label="Найти" />
          <Tab label="Таблица" />
          <Tab label="Графики" />
        </Tabs>
      </AppBar>

      <SwipeableViews index={currentTab} onChangeIndex={handleChangeIndex}>
        <div className={classes.tab_0}>
          <SelectProjects />
        </div>
        <div className={classes.tab_1}>
          <DataTable />
        </div>
        <div className={classes.tab_2}>
          <Charts />
        </div>
      </SwipeableViews>
    </div>
  );
}
