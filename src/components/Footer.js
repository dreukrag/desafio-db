import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import headerIcon from "./header.svg";

const footerStyles = makeStyles(() => ({
  main: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: `center`,
    backgroundColor: "#272727",
    height: "165px",
    paddingRight: "32px",
  },
  text: {
    color: "#3877A1",
    fontSize: "23px",
  },
}));
const Footer = () => {
  const styles = footerStyles();

  return (
    <footer className={styles.main}>
      <img src={headerIcon} alt="logo" />
      <span className={styles.text}>Teste Frontend 2019 - RCA Digital</span>
    </footer>
  );
};
export default Footer;
