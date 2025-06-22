import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [emailId, setEmailId] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/register', {
        name,
        emailId,
        password
      });

      const resText = response.data;
      setMsg(resText);

      if (resText.toLowerCase().includes("success")) {
        setTimeout(() => navigate('/login'), 1500); // redirect to login after 1.5 sec
      }

    } catch (error) {
      if (error.response) {
        setMsg(error.response.data);
      } else {
        setMsg("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div style={styles.container}>
      <h2>Register</h2>
      <form onSubmit={handleRegister} style={styles.form}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={emailId}
          onChange={(e) => setEmailId(e.target.value)}
          style={styles.input}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          required
        />
        <button type="submit" style={styles.button}>Register</button>
      </form>
      <p>{msg}</p>
    </div>
  );
};

const styles = {
  container: { padding: 20, maxWidth: 400, margin: 'auto' },
  form: { display: 'flex', flexDirection: 'column', gap: 12 },
  input: { padding: 8, fontSize: 16 },
  button: { padding: 10, backgroundColor: '#007bff', color: '#fff', fontSize: 16, border: 'none' },
};

export default Register;
