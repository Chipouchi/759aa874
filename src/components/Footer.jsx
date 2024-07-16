import React from "react";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import PhoneIcon from "@mui/icons-material/Phone";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import DialpadIcon from "@mui/icons-material/Dialpad";
import "../css/styles.css";

const Footer = () => {
  return (
    <Grid container className="footer">
      <Grid item xs={2}>
        <IconButton className="footer-icon-button">
          <PhoneIcon style={{ fontSize: 30 }} />
        </IconButton>
      </Grid>
      <Grid item xs={2}>
        <IconButton className="footer-icon-button">
          <AccountCircleIcon style={{ fontSize: 30 }} />
        </IconButton>
      </Grid>
      <Grid item xs={2} className="big-button-container">
        <button className="big-button">
          <DialpadIcon style={{ fontSize: 35 }} />
        </button>
      </Grid>
      <Grid item xs={2}>
        <IconButton className="footer-icon-button">
          <SettingsIcon style={{ fontSize: 30 }} />
        </IconButton>
      </Grid>
      <Grid item xs={2}>
        <IconButton className="footer-icon-button">
          <RadioButtonCheckedIcon style={{ fontSize: 30 }} />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default Footer;
