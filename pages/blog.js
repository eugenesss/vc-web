import React, {useState} from "react";
import DefaultLayout from "Components/Layout/PageTemplates/Default";
import Link from "next/link";

import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

// FAQ Data
import { BlogData } from "Components/data/blog-data";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    justifyContent: "center",
  },
  tabs: {
    // border: `1px solid ${theme.palette.divider}`,
  },
  tab: {
      margin: '25px auto',
      border: `1px solid ${theme.palette.divider}`,
      textTransform: 'capitalize',
  },
  tabPanel: {
    width: '50%',
  },
  indicator: {
    backgroundColor : '#f29d30',
    left: "0px",
    width: "3px",
  },
  headerBar: {
      padding: '20px',
  },
  post: {
    border: "1px solid #E2E5E7",
    padding: '20px',
  },
  date: {
    margin: "20px 20px 0",
  }
}));


export default function Blog() {

  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const [readMore,setReadMore]=useState(false);

  const handleChange = (event, newValue) => {
      setValue(newValue);
  };

  return (
    <DefaultLayout>
      <div className="section-title without-bg" align="center">
          <h2>BLOG POSTS</h2>
      </div>
      <div className={classes.root}>
        <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            className={classes.tabs}
            TabIndicatorProps={{ className: classes.indicator }}
        >
            {BlogData.map((blog, key) => (
            <Tab className={classes.tab} key={key} label={blog.title} />
            ))}
    
        </Tabs>
        <TabPanel className="blogTabPanel" value={value} index={0}>
          <div className={classes.post}>
            <div className={classes.date} align="right">
              <p>5 Jan 2020</p>
            </div>
            <div className={classes.headerBar}>
                <div class="row">
                  <div className="image col-md-4">
                    <img src="/static/blog/blog1.png" />
                  </div>
                  <div className="text col-md-7">
                    <h3>Should you buy or lease a car in singapore?</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse semper justo quis ligula posuere, et venenatis ante aliquet. Cras diam elit, tempor nec lacus in, mollis laoreet nisi. </p>
                    <div className="button">
                      <Link href="/blog-post">
                        <a className="btn enquireBtn">
                            READ MORE
                        </a>
                      </Link>
                  </div>
                  </div>
                </div>
            </div>
          </div>
        </TabPanel>
        <TabPanel className="blogTabPanel" value={value} index={1}>
          <div className={classes.post}>
            <div className={classes.date} align="right">
              <p>5 Jan 2020</p>
            </div>
            <div className={classes.headerBar}>
                <div class="row">
                  <div className="image col-md-4">
                    <img src="/static/blog/blog1.png" />
                  </div>
                  <div className="text col-md-7">
                    <h3>Should you buy or lease a car in singapore?</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse semper justo quis ligula posuere, et venenatis ante aliquet. Cras diam elit, tempor nec lacus in, mollis laoreet nisi. </p>
                    <div className="button">
                      <Link href="/blog-post">
                        <a className="btn enquireBtn">
                            READ MORE
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
            </div>
          </div>
        </TabPanel>
      </div>
    </DefaultLayout>
  );
}
