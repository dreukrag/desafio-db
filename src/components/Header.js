import React, { useCallback, useEffect, useMemo, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import headerIcon from "./header.svg";

import Button from "react-bootstrap/Button";
import { CircularProgress, InputBase, Popover } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { doLogin, loginStatuses } from "redux/AuthReducer";
import DoneOutlineIcon from "@material-ui/icons/DoneOutline";
import CancelIcon from "@material-ui/icons/Cancel";
import WarningIcon from "@material-ui/icons/Warning";
const headerStyles = makeStyles(() => ({
  main: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: `center`,
    width: `80%`,
    marginLeft: "10%",
    backgroundColor: "#fff",
    height: "120px",
    paddingRight: "32px",
  },
  title: {
    color: "#3877A1",
    fontSize: "22px",
  },
  loginButton: {
    color: "#fff",
    backgroundColor: "#3877A1",
    borderRadius: "9px",
    borderColor: "unset",
    boxShadow: "unset",
    height: "60px",
    width: "120px",
    fontSize: "18px",
  },
  blueButton: {
    color: "#fff",
    backgroundColor: "#3877A1",
    borderRadius: "9px",
    borderColor: "unset",
    boxShadow: "unset",
    height: "60px",
    width: "100%",
    fontSize: "18px",
  },
  redButton: {
    color: "#fff",
    backgroundColor: "#D55454",
    borderRadius: "9px",
    borderColor: "unset",
    boxShadow: "unset",
    height: "60px",
    width: "120px",
    fontSize: "18px",
  },
  control: {
    borderColor: "#D8C4C4",
    color: "#367BA4",
    height: "60px",
    border: "solid 1px",
    borderRadius: "6px",
    padding: "0 12px",
  },
  floating: {
    width: "352px",
    height: "305px",
    padding: "30px",
    backgroundColor: "#fff",
    border: "solid 1px #D8C4C4",
    borderRadius: "6px",
  },
  form: {
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "column",
    height: "100%",
  },
  feedback: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    "& svg": {
      fontSize: "3em",
    },
    "& p": {
      color: "red",
      fontWeight: "bold",
    },
  },
  logobox: {
    display: "flex",
    alignItems: "center",
  },
}));
const Header = (props) => {
  const styles = headerStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const open = useCallback((e) => setAnchorEl(e.currentTarget), []);
  const error = useSelector((s) => s.auth.errorMessage);
  const loginStatus = useSelector((s) => s.auth.loginStatus);
  const isAuth = useSelector((s) => s.auth.isAuthenticated);
  const close = useCallback(() => setAnchorEl(null), []);
  const dispatch = useDispatch();
  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const email = e.target.email.value;
      const password = e.target.password.value;
      dispatch(doLogin(email, password));
    },
    [dispatch]
  );

  useEffect(() => {
    if (loginStatus === loginStatuses.SUCCESSFULL) {
      close();
    }
  }, [loginStatus, close]);
  const feedback = useMemo(() => {
    switch (loginStatus) {
      case loginStatuses.START:
        return <CircularProgress style={{ color: "#3877A1" }} />;
      case loginStatuses.SUCCESSFULL:
        return <DoneOutlineIcon style={{ color: "green" }} />;
      case loginStatuses.INVALID:
        return <CancelIcon color="error" />;
      case loginStatuses.SERVERERROR:
        return <WarningIcon color="error" />;
      default:
        return null;
    }
  }, [loginStatus]);

  const logout = useCallback(
    () =>
      dispatch({
        type: loginStatuses.LOGOUT,
      }),
    [dispatch]
  );
  return (
    <header className={styles.main}>
      <div className={styles.logobox}>
        <img src={headerIcon} alt="logo" />
        <span className={styles.title}>Products</span>
      </div>
      {!isAuth && (
        <Button className={styles.loginButton} onClick={open}>
          Login
        </Button>
      )}
      {isAuth && (
        <>
          <p>Welcome Test</p>
          <Button className={styles.redButton} onClick={logout}>
            Logout
          </Button>
        </>
      )}
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={close}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        PaperProps={{ className: styles.floating }}
      >
        <form className={styles.form} onSubmit={onSubmit}>
          <InputBase
            name="email"
            type="email"
            placeholder="E-mail"
            className={styles.control}
          />
          <InputBase
            name="password"
            type="password"
            placeholder="Password"
            className={styles.control}
          />
          <Button type="submit" onClick className={styles.blueButton}>
            LOGIN
          </Button>
          <div className={styles.feedback}>
            {feedback}
            <p>{error}</p>
          </div>
        </form>
      </Popover>
    </header>
  );
};
export default Header;
