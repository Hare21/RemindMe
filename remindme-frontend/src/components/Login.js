import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // ✅ for redirecting

const Login = () => {
  const [emailId, setEmailId] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/login', {
        emailId,
        name,
        password
      });

      const resultMsg = response.data;
      console.log("Login response:", resultMsg);
      setMsg(resultMsg);

      // ✅ Safe check
      if (typeof resultMsg === 'string' && resultMsg.toLowerCase().includes("success")) {
        navigate('/options'); // 🚀 go to NotesOptions screen
      }

    } catch (error) {
      console.error("Login error:", error);
      if (error.response) {
        setMsg(error.response.data);
      } else {
        setMsg("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div style={styles.container}>
      <p>Have you registered? Please register before you login</p>
      <h2>Login</h2>
      <form onSubmit={handleLogin} style={styles.form}>
        <input
          type="text"
          placeholder="Email or Username"
          value={emailId}
          onChange={(e) => setEmailId(e.target.value)}
          style={styles.input}
          required
        />
        <input
          type="text"
          placeholder="Name (Optional)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          required
        />
        <button type="submit" style={styles.button}>Login</button>
      </form>
      <p>{msg}</p>
    </div>
  );
};

const styles = {
  container: { padding: 20, maxWidth: 400, margin: 'auto' },
  form: { display: 'flex', flexDirection: 'column', gap: 12 },
  input: { padding: 8, fontSize: 16 },
  button: { padding: 10, backgroundColor: '#28a745', color: '#fff', fontSize: 16, border: 'none' },
};

export default Login;
