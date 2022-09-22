import { Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React from 'react';
import moment from 'moment'
import { getTransactions } from '../api';

export function TransactionTable({ transactions = [] }) {
    return (
        <TableContainer component={Paper} sx={{ width: "100%", padding: 5, maxHeight: 800, overflowY: "auto" }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow sx={{ backgroundColor: "#ccc" }}>
                        <TableCell>Date</TableCell>
                        <TableCell align='center'>Type</TableCell>
                        <TableCell align='center'>Amount($)</TableCell>
                        <TableCell align='center'>Balance before transaction($)</TableCell>
                        <TableCell align="right">Balance after transaction($)</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {transactions.map((row, i) => (
                        <TableRow
                            key={i}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {moment(row.createdAt).format("YYYY-MM-DD HH:mm:ss")}
                            </TableCell>
                            <TableCell align='center'>{row.type}</TableCell>
                            <TableCell align='center'>{row.amount}</TableCell>
                            <TableCell align='center'>{row.previousBalance}</TableCell>
                            <TableCell align="right">{row.afterBalance}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}


function Transactions() {
    const [transactions, setTransactions] = React.useState([]);

    React.useEffect(() => {
        getTransactions().then((out) => {
            if (out.status === 200) {
                console.log(out.data.data);
                setTransactions(out.data.data);
            }
        }).catch((e) => {
            console.log(e);
        })
    }, [])
    return <Grid container spacing={2} padding={5}>
        <Grid item xs={12}>
            <TransactionTable transactions={transactions} />
        </Grid>
    </Grid>
}

export default Transactions