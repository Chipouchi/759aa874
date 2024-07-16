import React from "react";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import SvgIcon from "@mui/material/SvgIcon";
import { ReactComponent as AircallLogo } from "../assets/aircall.svg";
import Grid from "@mui/material/Grid";
import { Divider, IconButton } from "@mui/material";
import TuneIcon from "@mui/icons-material/Tune";
import "../css/styles.css";

const Header = ({ tabValue, handleChange }) => {

  const renderTitle = () => {
    switch (tabValue) {
      case 0:
        return "Activity Feed";
      case 2:
        return "Archive";
      default:
        return "Activity Feed";
    }
  };

  return (
    <Toolbar className="header-toolbar">
      <Grid container alignItems="center" spacing={1} className="left-section">
        <Grid item>
          <SvgIcon
            component={AircallLogo}
            viewBox="0 0 300 168"
            sx={{ fontSize: 60 }}
          />
        </Grid>
        <Grid item>
          <Typography variant="h6" component="div">
            {renderTitle()}
          </Typography>
        </Grid>
      </Grid>
      <Grid container alignItems="center" spacing={1} className="right-section">
        <Grid item xs={9.6}>
          <Tabs
            value={tabValue}
            onChange={handleChange}
            centered
            indicatorColor="primary"
            textColor="inherit"
            aria-label="tabs with dividers"
            className="tabs"
            fullWidth
          >
            <Tab
              disableRipple
              label="Calls"
              sx={{
                backgroundColor: tabValue === 0 ? "#4caf50" : "transparent",
                color: tabValue === 0 ? "#fff" : "#000000",
              }}
            />
            <Divider orientation="vertical" flexItem className="divider" />
            <Tab
              disableRipple
              label="Archived"
              sx={{
                backgroundColor: tabValue === 2 ? "#4caf50" : "transparent",
                color: tabValue === 2 ? "#fff" : "#000000",
              }}
            />
          </Tabs>
        </Grid>
        <Grid item>
          <IconButton color="inherit">
            <TuneIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Toolbar>
  );
};

export default Header;
