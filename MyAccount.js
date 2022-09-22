import { Button, Grid, Paper, TextField, Typography } from '@mui/material'
import React from 'react'
import { getProfile, updateProfile } from '../api';
import CustomAlert from './CustomAlert';

function MyAccount() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState('');
  const [rePassword, setRePassword] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [severity, setSeverity] = React.useState('success');
  const [message, setMessage] = React.useState('');
  React.useEffect(() => {
    getProfile().then((out) => {
      if (out.status === 200) {
        const { name, email } = out.data.user;
        setName(name);
        setEmail(email);
      }
    }).catch((e) => {
      console.log(e);
    })
  }, []);

  const handleUpdate = () => {
    updateProfile(name, email, password, rePassword).then((out) => {
      if (out.status === 200) {
        console.log(out.data);
        setSeverity('success');
        setMessage('profile updated successfullys');
        setOpen(true);
      }
    }).catch((e) => {
      console.log(e);
      setSeverity('error');
      setMessage('update failed');
      setOpen(true);
    })
  }
  return (
    <Grid container spacing={2} padding={5}>
      <Grid item>
        <Paper sx={{ padding: 5, width: 500, height: 800, display: "flex", flexDirection: 'column' }} >
          <Typography variant='h4' sx={{ marginBottom: 5 }}>Profile Info</Typography>
          <TextField id="name" label="User Name" variant="standard" sx={{ width: "100%" }} value={name} onChange={(e) => setName(e.target.value)} />
          <br />
          <TextField id="email" label="Email Address" variant="standard" disabled sx={{ width: "100%" }} value={email} onChange={(e) => setEmail(e.target.value)} />
          <br />
          <TextField id="password" label="Current Password" variant="standard" sx={{ width: "100%" }} value={password} onChange={(e) => setPassword(e.target.value)} />
          <br />
          <TextField id="new_password" label="New Password" variant="standard" sx={{ width: "100%" }} value={rePassword} onChange={(e) => setRePassword(e.target.value)} />
          <br />
          <Button variant="contained" onClick={() => handleUpdate()}>Update profile</Button>
        </Paper>
      </Grid>
      <CustomAlert severity={severity} open={open} setOpen={setOpen} messege={message} />
    </Grid>
  )
}

export default MyAccount