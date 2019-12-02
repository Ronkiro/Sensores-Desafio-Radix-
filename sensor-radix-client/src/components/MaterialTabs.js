import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabPanel from './TabPanel'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function MaterialTabs(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const { TabComponent1, TabComponent2, TabComponent3 } = props;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper className={classes.root}>
      <header>
        <img src='/header.png' alt='logo' />
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Gráfico" />
          <Tab label="Tabela" />
          <Tab label="Overview" />
        </Tabs>
      </header>
      <main>
        <TabPanel value={value} index={0}>
            { TabComponent1 }
        </TabPanel>
        <TabPanel value={value} index={1}>
            { TabComponent2 }
        </TabPanel>
        <TabPanel value={value} index={2}>
            { TabComponent3 }
        </TabPanel>
      </main>
    </Paper>
  );
}