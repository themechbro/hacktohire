import * as React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  ListItem,
  Grid,
  Button,
} from "@mui/joy";
import { useSelector, useDispatch } from "react-redux";
import Appbar from "./appbar";
import { AddBoxOutlined, FlightLand, FlightTakeoff } from "@mui/icons-material";
import FlightIcon from "@mui/icons-material/Flight";
import EmailAlert from "./alert";
import { Paper } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import { updateFlightStatus, displayAllFlights } from "../data/data";

export default function ViewFlight() {
  const matches = useMediaQuery("(min-width:600px)");
  const matches2 = useMediaQuery("(min-width:1000px)");
  const flightData = useSelector((state) => state.list.clickedFlight);
  
  const [currentFlightData, setCurrentFlightData] = React.useState(flightData);
  const [previousStatus, setPreviousStatus] = React.useState(flightData.status);
  const dispatch = useDispatch();

  React.useEffect(() => {
    const interval = setInterval(() => {
      updateFlightStatus();
      const updatedFlights = displayAllFlights();
      const updatedFlight = updatedFlights.find(flight => flight.flightNo === currentFlightData.flightNo);

      if (updatedFlight.status !== previousStatus) {
        setPreviousStatus(updatedFlight.status);
      }

      setCurrentFlightData(updatedFlight);
    }, 60000); // Update flight status every 1 minutes

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [currentFlightData, previousStatus]);


  return (
    <div>
      <Appbar />
      <Box
        className="view-flight container position-relative "
        sx={{
          display: "flex",
          flexDirection: matches && matches2 ? "row" : "column",
          paddingTop: matches && matches2 ? 20 : 10,
          justifyContent: matches && matches2 ? "space-evenly" : "center",
          alignItems: matches && matches2 ? "" : "center",
        }}
      >
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: 500,
            height: 300,
            backgroundColor: "#fff3e0",
            marginBottom: matches ? 0 : 2,
          }}
          component={Paper}
          elevation={20}
        >
          <Typography
            level="h1"
            sx={{ color: "#000", padding: 2, backgroundColor: "#fff3e0" }}
            component={Paper}
            elevation={5}
          >
            <FlightIcon sx={{ rotate: "30deg" }} /> {currentFlightData.flightNo}
          </Typography>

          <CardContent
            sx={{ display: "flex", flexDirection: "row", padding: 1 }}
          >
            <div className="dep-loc">
              <Typography level="h3" sx={{ fontWeight: 600 }}>
                <FlightTakeoff />
                {currentFlightData.from}
              </Typography>
            </div>
            <hr className="bg-dark" />
            <div className="arr-loc">
              <Typography level="h3" sx={{ fontWeight: 600 }}>
                <FlightLand />
                {currentFlightData.location}
              </Typography>
            </div>
          </CardContent>

          <CardContent
            sx={{ display: "flex", flexDirection: "row", padding: 1 }}
          >
            <div className="dep">
              <Typography level="title-sm" sx={{ fontWeight: 600 }}>
                Departure:
                {currentFlightData.departure}
              </Typography>
            </div>
            <hr className="bg-dark" />
            <div className="arr">
              <Typography level="title-sm" sx={{ fontWeight: 600 }}>
                Arrival:
                {currentFlightData.arrival}
              </Typography>
            </div>
          </CardContent>

          <CardContent
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#ff9800",
              paddingLeft: 2,
              paddingRight: 2,
              borderRadius: "16px",
            }}
            component={Paper}
            elevation={10}
          >
            <div className="dep">
              <Typography level="title-lg" sx={{ fontWeight: 600 }}>
                Status: {currentFlightData.status}
              </Typography>
            </div>
          </CardContent>
        </Card>

        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            width: matches && matches2 ? "50%" : "100vw",
          }}
          component={Paper}
          elevation={20}
        >
          <Typography
            level="h1"
            component={Paper}
            elevation={5}
            sx={{ padding: 2 }}
          >
            Flight Details
          </Typography>
          <CardContent sx={{ padding: 3 }} component={Paper} elevation={5}>
            <div>
              <Typography
                level="title-lg"
                component={ListItem}
                variant="outlined"
              >
                Departure Times
              </Typography>
              <Grid container spacing={2} sx={{ flexGrow: 1 }}>
                <Grid xs={4}>
                  <Typography level="title-md">
                    Terminal :{currentFlightData.terminal}
                  </Typography>
                </Grid>
                <Grid xs={4}>
                  {" "}
                  <Typography level="title-md">{currentFlightData.from}</Typography>
                </Grid>
                <Grid xs={4}>
                  <Typography level="title-md">
                    Gate:{currentFlightData.gate}
                  </Typography>
                </Grid>
                <Grid xs={8}>
                  <Typography level="title-md">
                    {" "}
                    Scheduled Departure: {currentFlightData.departure}
                  </Typography>
                </Grid>
              </Grid>
            </div>
          </CardContent>

          <CardContent sx={{ padding: 3 }} component={Paper} elevation={5}>
            <div>
              <Typography
                level="title-lg"
                component={ListItem}
                variant="outlined"
              >
                Arrival Times
              </Typography>
              <Grid container spacing={2} sx={{ flexGrow: 1 }}>
                <Grid xs={10}>
                  <Typography level="title-md">
                    {currentFlightData.location}
                  </Typography>
                </Grid>
                <Grid xs={2}>
                  <Typography level="title-md">
                    Gate:{currentFlightData.gate}
                  </Typography>
                </Grid>
                <Grid xs={8}>
                  <Typography level="title-md">
                    Scheduled Arrival: {currentFlightData.arrival}
                  </Typography>
                </Grid>
              </Grid>
            </div>
          </CardContent>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <EmailAlert />
            
          </Box>
        </Card>
      </Box>
    </div>
  );
}
