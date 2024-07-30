import { Typography } from "@mui/joy";
import * as React from "react";
import {
  allFlightlist,
  generateMoreFlights,
  displayAllFlights,
  updateFlightStatus
} from "../data/data";
import Box from "@mui/joy/Box";
import List from "@mui/joy/List";
import ListDivider from "@mui/joy/ListDivider";
import ListItem from "@mui/joy/ListItem";
import FlightIcon from "@mui/icons-material/Flight";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import Appbar from "./appbar";
import { Card } from "@mui/material";
import Status from "./filters/status";
import Terminal from "./filters/terminal";
import { useMediaQuery } from "@mui/material/";

const initialFlights = allFlightlist;
console.log(initialFlights);

export default function PageList() {
  const dispatch = useDispatch();
  const [selectedStatus, setSelectedStatus] = React.useState("");
  const [selectedTerminal, setSelectedTerminal] = React.useState("");
  const [flights, setFlights] = React.useState(initialFlights);
  const matches = useMediaQuery("(min-width:600px)");

  const handleClick = (i) => {
    dispatch({ type: "CLICKED_FLIGHT", payload: i });
    console.log("dispatched");
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      console.log("Reached bottom of the page");
      generateMoreFlights(10); // Generate 10 more flights
      setFlights((prevFlights) =>
        prevFlights.concat(displayAllFlights().slice(prevFlights.length))
      );
    }
  };

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  React.useEffect(() => {
    const interval = setInterval(() => {
      updateFlightStatus();
      setFlights(displayAllFlights());
    }, 10000); // Update flight status every 10 seconds

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  const filteredFlights = flights.filter((flight) => {
    return (
      (!selectedStatus || flight.status === selectedStatus) &&
      (!selectedTerminal || flight.terminal === selectedTerminal)
    );
  });

  return (
    <div>
      <Appbar />
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 10,
          backgroundColor: "hsl(210, 35%, 9%)",
        }}
        className="container  p-3"
        variant="outlined"
      >
        <Typography
          variant="h1"
          sx={{
            color: "hsl(215, 15%, 75%)",
            fontSize: "3rem",
            fontFamily: "sans-serif",
          }}
        >
          Live Flight Information
        </Typography>

        <Box
          className="filter-grid"
          sx={{
            padding: 3,
            display: "flex",
            flexDirection: matches ? "row" : "column",
            justifyContent: matches ? "space-evenly" : "center",
          }}
        >
          <Status onStatusChange={setSelectedStatus} />
          <Terminal onTerminalChange={setSelectedTerminal} />
        </Box>

        <div className="flight-list">
          <Box>
            <List
              variant="outlined"
              sx={{
                minWidth: 240,
                borderRadius: "sm",
              }}
            >
              {filteredFlights.map((i) => {
                let backgroundColor = "#fff";

                if (i.status === "Delayed") {
                  backgroundColor = "#f44336";
                } else if (i.status === "On Time") {
                  backgroundColor = "green";
                } else if (i.status === "Landed") {
                  backgroundColor = "#1de9b6";
                } else if (i.status === "Departed") {
                  backgroundColor = "#91ff35";
                } else {
                  backgroundColor = "#b71c1c";
                }

                return (
                  <div key={i.flightNo}>
                    <ListItem
                      sx={{ backgroundColor, textDecoration: "none" }}
                      onClick={() => handleClick(i)}
                      component={Link}
                      to={`/flightdetails/${i.flightNo}`}
                    >
                      <div className="content">
                        <Box
                          className="header"
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography variant="title-lg" sx={{ color: "#000" }}>
                            <FlightIcon />
                            {i.flightNo}
                          </Typography>
                          <Typography>{i.terminal}</Typography>
                          <Typography variant="title-sm" sx={{ color: "#000" }}>
                            {i.status}
                          </Typography>
                        </Box>
                        <Typography variant="title-md" sx={{ color: "#000" }}>
                          <FlightTakeoffIcon /> {i.from} ({i.departure})
                          ---------------------
                          <FlightLandIcon />
                          {i.location} ({i.arrival})
                        </Typography>
                      </div>
                    </ListItem>

                    <ListDivider />
                  </div>
                );
              })}
            </List>
          </Box>
        </div>
      </Card>
    </div>
  );
}





// import { Typography } from "@mui/joy";
// import * as React from "react";
// import {
//   allFlightlist,
//   generateMoreFlights,
//   displayAllFlights,
//   updateFlightStatus
// } from "../data/data";
// import Box from "@mui/joy/Box";
// import List from "@mui/joy/List";
// import ListDivider from "@mui/joy/ListDivider";
// import ListItem from "@mui/joy/ListItem";
// import FlightIcon from "@mui/icons-material/Flight";
// import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
// import FlightLandIcon from "@mui/icons-material/FlightLand";
// import { Link } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import Appbar from "./appbar";
// import { Card } from "@mui/material";
// import Status from "./filters/status";
// import Terminal from "./filters/terminal";
// import { useMediaQuery } from "@mui/material/";

// const initialFlights = allFlightlist;
// console.log(initialFlights);

// export default function PageList() {
//   const dispatch = useDispatch();
//   const [selectedStatus, setSelectedStatus] = React.useState("");
//   const [selectedTerminal, setSelectedTerminal] = React.useState("");
//   const [flights, setFlights] = React.useState(initialFlights);
//   const matches = useMediaQuery("(min-width:600px)");

//   const handleClick = (i) => {
//     dispatch({ type: "CLICKED_FLIGHT", payload: i });
//     console.log("dispatched");
//   };

//   const handleScroll = () => {
//     if (
//       window.innerHeight + document.documentElement.scrollTop + 1 >=
//       document.documentElement.scrollHeight
//     ) {
//       console.log("Reached bottom of the page");
//       generateMoreFlights(10); // Generate 10 more flights
//       setFlights((prevFlights) =>
//         prevFlights.concat(displayAllFlights().slice(prevFlights.length))
//       );
//     }
//   };

//   React.useEffect(() => {
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const filteredFlights = flights.filter((flight) => {
//     return (
//       (!selectedStatus || flight.status === selectedStatus) &&
//       (!selectedTerminal || flight.terminal === selectedTerminal)
//     );
//   });

//   return (
//     <div>
//       <Appbar />
//       <Card
//         sx={{
//           display: "flex",
//           flexDirection: "column",
//           justifyContent: "center",
//           alignItems: "center",
//           marginTop: 10,
//           backgroundColor: "hsl(210, 35%, 9%)",
//         }}
//         className="container  p-3"
//         variant="outlined"
//       >
//         <Typography
//           variant="h1"
//           sx={{
//             color: "hsl(215, 15%, 75%)",
//             fontSize: "3rem",
//             fontFamily: "sans-serif",
//           }}
//         >
//           Live Flight Information
//         </Typography>

//         <Box
//           className="filter-grid"
//           sx={{
//             padding: 3,
//             display: "flex",
//             flexDirection: matches ? "row" : "column",
//             justifyContent: matches ? "space-evenly" : "center",
//           }}
//         >
//           <Status onStatusChange={setSelectedStatus} />
//           <Terminal onTerminalChange={setSelectedTerminal} />
//         </Box>

//         <div className="flight-list">
//           <Box>
//             <List
//               variant="outlined"
//               sx={{
//                 minWidth: 240,
//                 borderRadius: "sm",
//               }}
//             >
//               {filteredFlights.map((i) => {
//                 let backgroundColor = "#fff";

//                 if (i.status === "Delayed") {
//                   backgroundColor = "#f44336";
//                 } else if (i.status === "On Time") {
//                   backgroundColor = "green";
//                 } else if (i.status === "Landed") {
//                   backgroundColor = "#1de9b6";
//                 } else if (i.status === "Departed") {
//                   backgroundColor = "#91ff35";
//                 } else {
//                   backgroundColor = "#b71c1c";
//                 }

//                 return (
//                   <div key={i.flightNo}>
//                     <ListItem
//                       sx={{ backgroundColor, textDecoration: "none" }}
//                       onClick={() => handleClick(i)}
//                       component={Link}
//                       to={`/flightdetails/${i.flightNo}`}
//                     >
//                       <div className="content">
//                         <Box
//                           className="header"
//                           sx={{
//                             display: "flex",
//                             flexDirection: "row",
//                             justifyContent: "space-between",
//                           }}
//                         >
//                           <Typography variant="title-lg" sx={{ color: "#000" }}>
//                             <FlightIcon />
//                             {i.flightNo}
//                           </Typography>
//                           <Typography>{i.terminal}</Typography>
//                           <Typography variant="title-sm" sx={{ color: "#000" }}>
//                             {i.status}
//                           </Typography>
//                         </Box>
//                         <Typography variant="title-md" sx={{ color: "#000" }}>
//                           <FlightTakeoffIcon /> {i.from} ({i.departure})
//                           ---------------------
//                           <FlightLandIcon />
//                           {i.location} ({i.arrival})
//                         </Typography>
//                       </div>
//                     </ListItem>

//                     <ListDivider />
//                   </div>
//                 );
//               })}
//             </List>
//           </Box>
//         </div>
//       </Card>
//     </div>
//   );
// }
