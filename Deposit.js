import { Button, Grid, Paper, TextField } from '@mui/material'
import React from 'react'
import { deposit, getTransactions } from '../api';
import CustomAlert from './CustomAlert';
import { TransactionTable } from './Transactions'

function Deposit() {
    const [amount, setAmount] = React.useState(0);
    const [transactions, setTransactions] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [severity, setSeverity] = React.useState('success');
    const [message, setMessage] = React.useState('');

    React.useEffect(() => {
        getTransactions('deposit').then((out) => {
            if (out.status === 200) {
                console.log(out.data.data);
                setTransactions(out.data.data);
            }
        }).catch((e) => {
            console.log(e);
        })
    }, [])
    const handleDeposit = () => {
        deposit(amount).then((out) => {
            if (out.status === 200) {
                getTransactions('deposit').then((out) => {
                    if (out.status === 200) {
                        setTransactions(out.data.data);
                        setSeverity('success');
                        setMessage('currency successfully deposited');
                        setOpen(true);
                    }
                }).catch((e) => {
                    console.log(e);
                    setSeverity('error');
                    setMessage('Deposit fail');
                    setOpen(true);
                })
            }
        }).catch((e) => {
            console.log("e");
            setSeverity('error');
            setMessage('Deposit fail');
            setOpen(true);
        })
    }

    return (
        <Grid container spacing={2} padding={5}>
            <Grid item md={6} lg={4}>
                <Paper sx={{ width: "90%", padding: 5 }}>
                    <TextField value={amount} onChange={(e) => setAmount(e.target.value)} sx={{ width: "100%" }} id="deposit_amount" type="number" label="Deposit Amount" variant="standard" />
                    <br />
                    <br />
                    <Button variant="contained" onClick={() => handleDeposit()} sx={{ width: "100%" }}>Conform Deposit</Button>
                </Paper>
            </Grid>
            <Grid item md={6} lg={8}>
                <TransactionTable transactions={transactions} />
            </Grid>
            <CustomAlert severity={severity} open={open} setOpen={setOpen} messege={message} />
        </Grid>
    )
}

export default Deposit