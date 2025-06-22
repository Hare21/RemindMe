import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', padding: '40px' }}>
      <h1>Welcome to RemindMe App</h1>
      <p>This app will help you stay organized with alerts and reminders.</p>
      <button onClick={() => navigate('/register')} style={styles.button}>REGISTER</button>
      <button onClick={() => navigate('/login')} style={styles.button}>LOGIN</button>
    </div>
  );
};
const styles = {
    button: {
      margin: '10px',
      padding: '15px 30px',
      fontSize: '18px',
      backgroundColor: '#007bff',
      color: '#fff',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      textTransform: 'uppercase',
      fontWeight: 'bold'
    }
  };
  

export default Home;
