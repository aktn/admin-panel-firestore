import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import "./Auth.css";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { loginUser } from "../../store/actions";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  container: {
    position: "relative",
    marginTop: "10%"
  },
  input: {
    width: "100%"
  },
  form: {
    background: "#fff",
    padding: "10% 5%"
  },
  formBtn: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "space-between"
  },
  button: {
    display: "flex",
    justifyContent: "center",
    width: "15%",
    backgroundColor: "#555c57"
  },
  forgotPasswordLink: {
    display: "flex",
    alignItems: "center",
    fontSize: "14px",
    cursor: "pointer",
    color: "#000",
    textDecoration: "none"
  },
  header: {
    display: "flex",
    justifyContent: "flex-start",
    padding: "0",
    margin: "0",
    fontSize: "3rem"
  },
  errorText: {
    color: "red",
    backgroundColor: "#fab1b1",
    display: "flex",
    justifyContent: "flex-start",
    padding: "5px 10px",
    fontSize: "14px"
  }
});

const Auth = props => {
  const classes = useStyles();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const { dispatch } = props;
    dispatch(loginUser(email, password));
  };

  const { loginError, isAuthenticated, isLoggingIn } = props;

  if (isAuthenticated) {
    return <Redirect to="/" />;
  } else {
    return (
      <Container maxWidth="sm" className={classes.container}>
        <Box>
          <h1 className={classes.header}>LogIn</h1>
        </Box>
        <Container spacing="3" className={classes.form}>
          <Box my={2}>
            <TextField
              variant="outlined"
              label="Email Address"
              className={classes.input}
              onChange={e => setEmail(e.target.value)}
            />
          </Box>
          <Box my={2}>
            <TextField
              variant="outlined"
              label="Password"
              className={classes.input}
              onChange={e => setPassword(e.target.value)}
            />
          </Box>
          <Box my={4} className={classes.formBtn}>
            <Button
              variant="contained"
              color="primary"
              href="#contained-buttons"
              className={classes.button}
              onClick={handleLogin}
            >
              {isLoggingIn ? "Logging In" : "Login"}
            </Button>
            <Link to="/forgotPassword" className={classes.forgotPasswordLink}>
              Forgot a password
            </Link>
          </Box>
          {loginError && (
            <Typography component="p" className={classes.errorText}>
              Incorrect email or password.
            </Typography>
          )}
        </Container>
      </Container>
    );
  }
};

const mapStateToProps = state => {
  return {
    isLoggingIn: state.auth.isLoggingIn,
    loginError: state.auth.loginError,
    isAuthenticated: state.auth.isAuthenticated
  };
};

export default connect(mapStateToProps)(Auth);
