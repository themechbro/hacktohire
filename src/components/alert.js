import * as React from "react";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import Stack from "@mui/joy/Stack";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { useSelector } from "react-redux";
import emailjs from "@emailjs/browser";
import { useRef } from "react";
import { Alert, Typography, Box } from "@mui/joy";
import IconButton from "@mui/joy/IconButton";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import Slide from "@mui/material/Slide";
import { Grid } from "@mui/joy";
import { useDispatch } from "react-redux";

export default function EmailAlert() {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const flightInfo = useSelector((state) => state.list.clickedFlight);
  const formRef = useRef("");

  const sendEmail = (e) => {
    e.preventDefault();
    console.log("Form reference:", e);
    if (!formRef.current) {
      console.error("Form reference is null");
      return;
    }
    console.log(e)
    dispatch({type:'ALERT_USER_DETAIL', payload:{user_Name:e.target[0].value, user_Email:e.target[1].value}});

    emailjs
      .sendForm(
        "service_d3o837c",
        "template_zgifwmh",
        formRef.current,
        "Deag7MNKQI6D48o7-"
      )
      .then(
        () => {
          console.log("Email sent successfully");
          // saveAlertToBackend();
          setSuccess(true);
          setTimeout(() => setSuccess(false), 3000); // Hide alert after 3 seconds
        },
        (error) => {
          console.error("Email sending failed:", error.text);
        }
      );
  };

  const saveAlertToBackend = (e) => {
    e.preventDefault();

    if (!formRef.current) {
      console.error("Form reference is null");
      return;
    }

    const alertData = {
      flightNumber: flightInfo.flightNo,
      user_email: formRef.current.user_email.value,
      user_name: formRef.current.user_name.value,
      departure: flightInfo.departure,
      arrival: flightInfo.arrival,
      status: flightInfo.status,
    };

    console.log("Sending data to backend:", alertData);

    fetch("http://localhost:3001/saveAlert", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(alertData),
    })
      .then((response) => {
        console.log("Response status:", response.status);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.text();
      })
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleClick = (flightInfo) => {
    dispatch({ type: "ALERT_FLIGHT", payload: flightInfo });
   
  };
 
  
  return (
    <React.Fragment>
      <Button
        variant="soft"
        startDecorator={<NotificationsActiveIcon />}
        onClick={() => setOpen(true)}
      >
        Get Alert
      </Button>
      {success && (
        <Slide direction="left" in={success} mountOnEnter unmountOnExit>
          <Box
            sx={{
              position: "fixed",
              top: "16px",
              right: "16px",
              zIndex: 9999,
            }}
          >
            <Alert
              color="success"
              variant="soft"
              endDecorator={
                <IconButton
                  aria-label="close"
                  size="small"
                  variant="plain"
                  color="neutral"
                  onClick={() => setSuccess(false)}
                >
                  <CloseRoundedIcon fontSize="small" />
                </IconButton>
              }
            >
              <Typography level="body-sm">Email sent successfully!</Typography>
            </Alert>
          </Box>
        </Slide>
      )}
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog>
          <DialogTitle>Get Alert for {flightInfo.flightNo}</DialogTitle>
          <DialogContent>Fill in the information.</DialogContent>
          <form
            onSubmit={(event) => {
              console.log("my event",event);
              sendEmail(event);
              saveAlertToBackend(event);
              setOpen(false);
            }}
            ref={formRef}
          >
            <Stack spacing={2} component={Grid} sx={{ flexGrow: 1 }}>
              <FormControl component={Grid} xs={6}>
                <FormLabel>Name</FormLabel>
                <Input autoFocus required type="text" name="user_name" />
              </FormControl>
              <FormControl component={Grid} xs={6}>
                <FormLabel>Email</FormLabel>
                <Input required type="email" name="user_email" />
              </FormControl>
              <FormControl component={Grid} xs={6}>
                <FormLabel>Flight Number</FormLabel>
                <Input
                  required
                  type="text"
                  name="flight_no"
                  value={flightInfo.flightNo}
                  readOnly
                />
              </FormControl>
              <FormControl component={Grid} xs={6}>
                <FormLabel>Departure</FormLabel>
                <Input
                  required
                  type="text"
                  name="departure"
                  value={flightInfo.departure}
                  readOnly
                />
              </FormControl>
              <FormControl component={Grid} xs={6}>
                <FormLabel>Arrival</FormLabel>
                <Input
                  required
                  type="text"
                  name="arrival"
                  value={flightInfo.arrival}
                  readOnly
                />
              </FormControl>
              <FormControl component={Grid} xs={6}>
                <FormLabel>Terminal</FormLabel>
                <Input
                  required
                  type="text"
                  name="terminal"
                  value={flightInfo.terminal}
                  readOnly
                />
              </FormControl>

              <FormControl component={Grid} xs={6}>
                <FormLabel>Gate</FormLabel>
                <Input
                  required
                  type="text"
                  name="gate"
                  value={flightInfo.gate}
                  readOnly
                />
              </FormControl>
              <FormControl component={Grid} xs={6}>
                <FormLabel>Status</FormLabel>
                <Input
                  required
                  type="text"
                  name="status"
                  value={flightInfo.status}
                  readOnly
                />
              </FormControl>
              <Button type="submit" value="Send" onClick={handleClick(flightInfo)}>
                Submit
              </Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}
