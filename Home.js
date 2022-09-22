import React from 'react'
import Box from "@mui/material/Box"
import { Button, Stack, TextField, Typography } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { login, registerUser } from '../api';
import CustomAlert from '../components/CustomAlert';


function Logo() {
  return <Stack sx={{ position: "fixed", top: "10px", left: "10px" }} direction="row" gap={2} alignItems="center" >
    <img src='/logo.png' alt='logo' style={{ width: "60px" }} />
    <Typography variant='h4' sx={{ color: "#143c7c" }}>ABC BANK</Typography>
  </Stack >
}

function Welcome() {
  return <Typography variant='h4' sx={{ color: "#fff", position: "fixed", top: "500px", left: "200px" }}>Welcome to the ABC Bank</Typography>
}

function LoginForm({ setSelectedForm, setOpen, setMessage, setSeverity }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const navigate = useNavigate();
  const handleLogin = () => {
    login(email, password).then((out) => {
      if (out.status === 200) {
        localStorage.setItem("token", JSON.stringify(out.data));
        setSeverity('success');
        setMessage('Login Success');
        setOpen(true);
        navigate('/transactions');
      }
    }).catch((e) => {
      setSeverity('error');
      setMessage('Login fail');
      setOpen(true);
    })
  }

  return <Stack sx={{ padding: 20 }} direction="column">
    <Typography variant='h4' sx={{ marginBottom: 5 }}>Login</Typography>
    <TextField id="email" label="Email Address" variant="standard" value={email} onChange={(event) => setEmail(event.target.value)} />
    <br />
    <TextField id="password" label="Password" variant="standard" onChange={(event) => setPassword(event.target.value)} />
    <br />
    <br />
    <Button variant="contained" onClick={() => handleLogin()}>Login</Button>
    <br />
    <Typography variant='body1'>Don't have an account? <span onClick={() => setSelectedForm(1)} style={{ color: "#1976d2", cursor: "pointer" }}>Create an account</span></Typography>
  </Stack>
}

function RegistrationForm({ setSelectedForm, setOpen, setMessage, setSeverity }) {
  const [userName, setUserName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [rpasssword, setRpassword] = React.useState('');

  const handleRegistration = () => {
    registerUser(userName, email, password, rpasssword).then((out) => {
      if (out.status === 200) {
        setSeverity('success');
        setMessage('User Account created successfully! please login');
        setOpen(true);
        setSelectedForm(0);
      }
    }).catch((e) => {
      setSeverity('error');
      setMessage('User Creation Failed!!! please provide valid data');
      setOpen(true);
    })
  }


  return <Stack sx={{ padding: 20 }} direction="column">
    <Typography variant='h4' sx={{ marginBottom: 5 }}>Register</Typography>
    <TextField id="name" label="User Name" variant="standard" value={userName} onChange={(event) => setUserName(event.target.value)} />
    <br />
    <TextField id="email" label="Email Address" variant="standard" value={email} onChange={(event) => setEmail(event.target.value)} />
    <br />
    <TextField id="password" label="Password" variant="standard" value={password} onChange={(event) => setPassword(event.target.value)} />
    <br />
    <TextField id="password-again" label="Password again" variant="standard" value={rpasssword} onChange={(event) => setRpassword(event.target.value)} />
    <br />
    <br />
    <Button variant="contained" onClick={() => handleRegistration()}>Register</Button>
    <br />
    <Typography variant='body1'>Already have an account? <span onClick={() => setSelectedForm(0)} style={{ color: "#1976d2", cursor: "pointer" }}>Login</span></Typography>
  </Stack>
}



function Home() {
  const [selectedForm, setSelectedForm] = React.useState(0); // 0 => login, 1 => register
  const [open, setOpen] = React.useState(false);
  const [severity, setSeverity] = React.useState('success');
  const [message, setMessage] = React.useState('');
  return (
    <Stack direction="row" sx={{ height: "100vh", overflow: "hidden" }}>
      <Logo />
      <Welcome />
      <Box sx={{ width: "50%" }}>
        <img src="/home.jpg" alt="Home" width="100%" height="100%" />
      </Box>
      <Box sx={{ width: "50%" }}>
        {selectedForm === 0 && <LoginForm setSelectedForm={setSelectedForm} setOpen={setOpen} setMessage={setMessage} setSeverity={setSeverity} />}
        {selectedForm === 1 && <RegistrationForm setSelectedForm={setSelectedForm} setOpen={setOpen} setMessage={setMessage} setSeverity={setSeverity} />}
      </Box>
      <CustomAlert severity={severity} open={open} setOpen={setOpen} messege={message} />
    </Stack>
  )
}

export default Home