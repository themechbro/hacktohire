import axios from 'axios';

const flightNumber = 'ABC123';
const newStatus = 'Delayed';

axios.put(`http://localhost:3001/alerts/${flightNumber}`, { status: newStatus })
  .then(response => {
    console.log('Updated alert:', response.data);
  })
  .catch(error => {
    console.error('Error updating alert:', error);
  });
