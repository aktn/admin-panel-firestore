import React, { Component } from "react";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import { withStyles } from "@material-ui/core/styles";
import * as data from "./../static/nav.json";

const styles = {
  home: {
    position: "relative",
    marginTop: "0px",
    marginBottom: "100px",
    display: "flex",
    flexDirection: "column",
    "@media (min-width: 780px)": {
      marginTop: "100px"
    }
  },
  wrapper: {
    display: "flex",
    flexDirection: "column",
    fontSize: "16px",
    padding: "0 1%",
    "@media (min-width: 780px)": {
      flexDirection: "row",
      padding: "0",
      fontSize: "18px"
    }
  },
  header: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: "0 1%",
    fontSize: "18px",
    "@media (min-width: 780px)": {
      padding: "0"
    }
  },
  test: {
    margin: "1% 0"
  },
  leftSection: {
    flex: "1",
    marginRight: "0px",
    padding: "0",
    "@media (min-width: 780px)": {
      marginRight: "10px"
    }
  },
  rightSection: {
    flex: "2",
    backgroundColor: "#fff",
    margin: "0",
    padding: "0"
  },
  tab: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    backgroundColor: "#fff",
    marginBottom: "10px "
  },
  innerTab: {
    width: "100%",
    padding: "30px 0",
    margin: "0",
    cursor: "pointer",
    "&:not(:first-child)": {
      borderTop: "1px solid #c9c9c9"
    }
  }
};

class Home extends Component {
  render() {
    const { classes } = this.props;
    const objectsList = [];

    for (var item in data.default) {
      objectsList.push(data.default[item]);
    }

    const displayTabs = objectsList.map((object, index) => (
      <Box spacing="3" className={classes.tab} key={index}>
        {object.map((item, index) => {
          return (
            <Box my={4} key={index} className={classes.innerTab}>
              {item.display}
            </Box>
          );
        })}
      </Box>
    ));

    return (
      <Container maxWidth="md" spacing="3" className={classes.home}>
        <Box className={classes.header}>
          <h1 className={classes.test}>Admin Panel</h1>
        </Box>
        <Container className={classes.wrapper}>
          <Box className={classes.leftSection}>{displayTabs}</Box>
          <Box spacing="3" className={classes.rightSection}>
            2
          </Box>
        </Container>
      </Container>
    );
  }
}

export default withStyles(styles)(Home);
