import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import CallList from "./components/CallList";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Footer from "./components/Footer";
import Services from "./services";

const App = () => {
  const [tabValue, setTabValue] = useState(0);
  const [allCalls, setAllCalls] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [archivedCalls, setArchivedCalls] = useState([]);

  useEffect(() => {
    async function Fetch() {
      const response = await Services.GetAllActivities();
      console.log(response);
      setAllCalls(response.filter((call) => !call.is_archived));
      setArchivedCalls(response.filter((call) => call.is_archived));
    }
    Fetch();
  }, [tabValue, refresh]);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const renderTabContent = () => {
    switch (tabValue) {
      case 0:
        console.log(allCalls);
        return (
          <CallList
            Data={allCalls}
            refreshData={() => setRefresh(!refresh)}
            tabValue={tabValue}
          />
        );
      case 2:
        console.log(archivedCalls);
        return (
          <CallList
            Data={archivedCalls}
            refreshData={() => setRefresh(!refresh)}
            tabValue={tabValue}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper>
        <Header tabValue={tabValue} handleChange={handleChange} />
        <Box
          sx={{ mt: 2, maxHeight: "80vh", overflow: "auto", minHeight: "80vh" }}
        >
          {renderTabContent()}
        </Box>
        <Footer />
      </Paper>
    </Container>
  );
};

export default App;
