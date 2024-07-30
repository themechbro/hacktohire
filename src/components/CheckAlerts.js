import * as React from "react";
import Button from '@mui/joy/Button';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';

export default function CheckAlerts() {
    const [alerts, setAlerts] = React.useState([]);

    const fetchAlerts = () => {
        fetch('http://localhost:3001/alerts')
            .then(response => response.json())
            .then(data => {
                setAlerts(data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    return (
        <Box>
            <Button onClick={fetchAlerts}>Check Stored Alerts</Button>
            {alerts.length > 0 && (
                <Box>
                    <Typography variant="h6">Stored Alerts</Typography>
                    {alerts.map((alert, index) => (
                        <Box key={index} sx={{ marginBottom: 2 }}>
                            <Typography>Flight Number: {alert.flightNumber}</Typography>
                            <Typography>User Name: {alert.userName}</Typography>
                            <Typography>User Email: {alert.userEmail}</Typography>
                            <Typography>Departure: {alert.departure}</Typography>
                            <Typography>Arrival: {alert.arrival}</Typography>
                        </Box>
                    ))}
                </Box>
            )}
        </Box>
    );
}
