import React, { useState, useEffect } from "react";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import PhoneCallbackIcon from "@mui/icons-material/PhoneCallback";
import PhoneIcon from "@mui/icons-material/Phone";
import PhoneMissedIcon from "@mui/icons-material/PhoneMissed";
import VoicemailIcon from "@mui/icons-material/Voicemail";
import Divider from "@mui/material/Divider";
import ArchiveIcon from "@mui/icons-material/Archive";
import UnarchiveIcon from "@mui/icons-material/Unarchive";
import ReceiptIcon from "@mui/icons-material/Receipt";
import "../css/styles.css";
import {
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import Services from "../services";

const CallList = ({ Data, refreshData, tabValue }) => {
  console.log(Data);
  const [sortedCalls, setSortedCalls] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedCall, setSelectedCall] = useState(null);
  useEffect(() => {
    const sortCalls = () => {
      try {
        const sorted = Data.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        setSortedCalls(sorted);
      } catch (e) {
        console.log("Error sorting calls:", e);
        setSortedCalls([]);
      }
    };

    sortCalls();
  }, [Data]);

  const renderCallIcon = (call) => {
    if (call.call_type === "answered") {
      return (
        <span
          style={{ color: call.direction === "inbound" ? "green" : "green" }}
        >
          {call.direction === "inbound" ? <PhoneCallbackIcon /> : <PhoneIcon />}
        </span>
      );
    } else if (call.call_type === "missed") {
      return (
        <span style={{ color: "red" }}>
          <PhoneMissedIcon />
        </span>
      );
    } else if (call.call_type === "voicemail") {
      return <VoicemailIcon />;
    } else {
      return (
        <span style={{ color: "green" }}>
          <PhoneCallbackIcon />
        </span>
      );
    }
  };

  const renderPhoneNumber = (number) => {
    const numberStr = number.toString();

    if (numberStr.length !== 11) {
      return numberStr;
    }

    let countryCode = "";
    if (numberStr.startsWith("1")) {
      countryCode = "+1";
    }

    const areaCode = numberStr.substring(1, 4);
    const mainNumber = numberStr.substring(4);

    if (countryCode) {
      return `${countryCode} (${areaCode}) ${mainNumber.substring(
        0,
        3
      )}-${mainNumber.substring(3)}`;
    } else {
      return `(${areaCode}) ${mainNumber.substring(
        0,
        3
      )}-${mainNumber.substring(3)}`;
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const groupedCalls = sortedCalls.reduce((acc, call) => {
    const date = formatDate(call.created_at);
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(call);
    return acc;
  }, {});

  const updateArchive = async (call) => {
    try {
      const response = await Services.UpdateArchive(call);
      refreshData();
      console.log("Update Archive response:", response);
    } catch (error) {
      console.error("Error updating archive:", error);
    }
  };

  const handleBulkAction = async () => {
    try {
      if (tabValue === 0) {
        await Promise.all(
          sortedCalls.map((call) => Services.UpdateArchive(call))
        );
        console.log("All calls archived successfully");
      } else if (tabValue === 2) {
        await Promise.all(
          sortedCalls.map((call) => Services.UpdateArchive(call))
        );
        console.log("All calls unarchived successfully");
      }
      refreshData();
    } catch (error) {
      console.error("Error performing bulk action:", error);
    }
  };

  const handleOpenDialog = (call) => {
    setSelectedCall(call);
    setDialogOpen(true);
  };

  return (
    <List>
      <div style={{ margin: "0 15px 15px 15px", width: "calc(100% - 30px)" }}>
        {tabValue === 0 && (
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            color="success"
            startIcon={<ArchiveIcon />}
            style={{ width: "100%" }}
            onClick={handleBulkAction}
          >
            Archive all
          </Button>
        )}
        {tabValue === 2 && (
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            color="success"
            startIcon={<UnarchiveIcon />}
            style={{ width: "100%" }}
            onClick={handleBulkAction}
          >
            Unarchive all
          </Button>
        )}
      </div>
      {Object.entries(groupedCalls).map(([date, calls], index) => (
        <React.Fragment key={index}>
          {index > 0 && (
            <Divider variant="middle" className="dateDivider">
              <Typography variant="subtitle2" color="textSecondary">
                {date}
              </Typography>
            </Divider>
          )}
          {calls.map((call, idx) => (
            <Paper className="listItem" key={idx} elevation={3}>
              <div className="phoneIconContainer">{renderCallIcon(call)}</div>
              <div className="detailsContainer">
                <div className="phoneDetailsContainer">
                  <Typography variant="body1">
                    {renderPhoneNumber(call.from)}
                  </Typography>
                </div>
              </div>
              <div
                className="actionContainer"
                style={{ marginRight: "15px", display: "flex" }}
              >
                <IconButton onClick={() => handleOpenDialog(call)}>
                  <ReceiptIcon />
                </IconButton>
                {call.is_archived ? (
                  <IconButton
                    onClick={() => updateArchive(call)}
                    aria-label="Remove from Archive"
                  >
                    <UnarchiveIcon />
                  </IconButton>
                ) : (
                  <IconButton
                    onClick={() => updateArchive(call)}
                    aria-label="Archive"
                  >
                    <ArchiveIcon />
                  </IconButton>
                )}
              </div>
              <div className="timeContainer">
                <Typography variant="body2" color="textSecondary">
                  {new Date(call.created_at).toLocaleString()}
                </Typography>
              </div>
            </Paper>
          ))}
        </React.Fragment>
      ))}
      {selectedCall && (
        <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
          <DialogTitle>Call Details</DialogTitle>
          <DialogContent dividers>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <Typography variant="body2" style={{ marginBottom: "8px" }}>
                <strong>Direction:</strong> {selectedCall.direction}
              </Typography>
              <Typography variant="body2" style={{ marginBottom: "8px" }}>
                <strong>From:</strong> {selectedCall.from}
              </Typography>
              <Typography variant="body2" style={{ marginBottom: "8px" }}>
                <strong>To:</strong> {selectedCall.to}
              </Typography>
              <Typography variant="body2" style={{ marginBottom: "8px" }}>
                <strong>Via:</strong> {selectedCall.via}
              </Typography>
              <Typography variant="body2" style={{ marginBottom: "8px" }}>
                <strong>Duration:</strong> {selectedCall.duration} seconds
              </Typography>
              <Typography variant="body2" style={{ marginBottom: "8px" }}>
                <strong>Type:</strong> {selectedCall.call_type}
              </Typography>
              <Typography variant="body2" style={{ marginBottom: "8px" }}>
                <strong>Archived:</strong>{" "}
                {selectedCall.is_archived ? "Yes" : "No"}
              </Typography>
              <Typography variant="body2" style={{ marginBottom: "8px" }}>
                <strong>Created At:</strong>{" "}
                {new Date(selectedCall.created_at).toLocaleString()}
              </Typography>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDialogOpen(false)} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </List>
  );
};

export default CallList;
