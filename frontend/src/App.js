import logo from './logo.svg';
import './App.css';
import { Container, Typography, Box } from '@mui/material';
import ItemList from './components/ItemList';

function App() {
  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Item Management System
        </Typography>
        <ItemList />
      </Box>
    </Container>
  );
}

export default App;
