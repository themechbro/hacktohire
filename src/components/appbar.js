import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Link, Typography } from "@mui/joy";
import Button from "@mui/material/Button";
import DrawerFilters from "./sidebar";

export default function Appbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "rgba(0, 0, 0, 0.51)",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(5px)",
          WebkitBackdropFilter: "blur(5px)",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <DrawerFilters />
          <Typography
            variant="title-lg"
            sx={{
              color: "#FFF",
              fontSize: "1.5rem",
              textTransform: "uppercase",
              fontFamily: "sans-serif",
            }}
            component={Link}
            to='/'
            underline="none"
          >
            Live Flight Tracker
          </Typography>
          <Button sx={{ color: "#FFF" }}>Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
