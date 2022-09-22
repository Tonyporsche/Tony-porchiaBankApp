import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import CurrencyExchangeOutlinedIcon from '@mui/icons-material/CurrencyExchangeOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import PaidIcon from '@mui/icons-material/Paid';
import { ListItemButton, ListItemIcon, ListItemText, Stack } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate, useParams } from "react-router-dom";
import Transactions from '../components/Transactions';
import Deposit from '../components/Deposit';
import Withdraw from '../components/Withdraw';
import MyAccount from '../components/MyAccount';
import { getProfile } from '../api';

const drawerWidth = 340;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);

const mdTheme = createTheme();

export default function DashBoard() {
    const [open, setOpen] = React.useState(true);
    const [email, setEmail] = React.useState("user@gmail.com");
    const [title, setTitle] = React.useState("");
    const [balance, setBalance] = React.useState(0);

    const navigate = useNavigate();
    const { type } = useParams();

    React.useEffect(() => {
        const tokenStr = localStorage.getItem('token');
        if (tokenStr) {
            const email = JSON.parse(tokenStr).user.email;
            setEmail(email);
        }
        const interval = setInterval(() => {
            getProfile().then((out) => {
                if (out.status === 200) {
                    setBalance(out.data.user.balance);
                }
            }).catch((e) => {
                console.log(e);
            })
        }, 3000);
        return () => clearInterval(interval);
    }, [])

    React.useEffect(() => {
        const token = localStorage.getItem('token');
        if (token === null || token === "") {
            navigate('/');
        }
        switch (type) {
            case "transactions":
                setTitle("Transactions")
                break;
            case 'deposit':
                setTitle("Deposit")
                break;
            case 'withdraw':
                setTitle("Withdraw")
                break;
            case 'myaccount':
                setTitle("My Account")
                break;
            default:
                break;
        }
    }, [type]);

    const toggleDrawer = () => {
        setOpen(!open);
    };


    const handleClick = (type) => {
        switch (type) {
            case 1:
                navigate('/transactions');
                break;
            case 2:
                navigate('/deposit');
                break;
            case 3:
                navigate('/withdraw')
                break;
            case 4:
                navigate('/myaccount')
                break;
            case 5:
                localStorage.setItem('token', "")
                navigate('/')
                break;
            default:
                break;
        }
    }

    return (
        <ThemeProvider theme={mdTheme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="absolute" open={open}>
                    <Toolbar
                        sx={{
                            pr: '24px', // keep right padding when drawer closed
                            backgroundColor: "#1b4584",
                            display: "flex",
                            justifyContent: "space-between"
                        }}
                    >
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleDrawer}
                            sx={{
                                marginRight: '36px',
                                ...(open && { display: 'none' }),
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            sx={{ flexGrow: 1 }}
                        >
                            {title}
                        </Typography>
                        <Stack direction="row" alignItems="center" gap={2}>
                            <PaidIcon sx={{ fontSize: 50 }} />
                            <Typography
                                component="h1"
                                variant="h6"
                                color="inherit"
                                noWrap
                                sx={{ flexGrow: 1 }}
                            >
                                Balance: {balance} $
                            </Typography>
                        </Stack>

                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={open}>
                    {open && <Toolbar
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            p: [1],
                            height: 200,
                            backgroundColor: "#1b4584"
                        }}
                    >
                        <Box />
                        <img src='./profile_pic.jpg' alt='profile' style={{ borderRadius: "50%", width: "150px", height: "150px" }} />
                        <IconButton onClick={toggleDrawer}>
                            <ChevronLeftIcon sx={{ color: "#fff" }} />
                        </IconButton>
                    </Toolbar>}
                    {open && <Box sx={{
                        display: 'flex', justifyContent: "end", backgroundColor: "#1b4584"
                    }}><Typography variant='body1' sx={{ padding: 1, color: "#fff" }}>{email}</Typography></Box>}
                    <Divider sx={{ marginBottom: open ? 2 : 10 }} />
                    <List component="nav">
                        <ListItemButton onClick={() => handleClick(1)}>
                            <ListItemIcon>
                                <SwapVertIcon />
                            </ListItemIcon>
                            <ListItemText primary="Transactions" />
                        </ListItemButton>
                        <ListItemButton onClick={() => handleClick(2)}>
                            <ListItemIcon>
                                <PaidOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText primary="Deposit" />
                        </ListItemButton>
                        <ListItemButton onClick={() => handleClick(3)}>
                            <ListItemIcon>
                                <CurrencyExchangeOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText primary="Withdraw" />
                        </ListItemButton>
                        <ListItemButton onClick={() => handleClick(4)}>
                            <ListItemIcon>
                                <ManageAccountsOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText primary="My Account" />
                        </ListItemButton>
                        <ListItemButton onClick={() => handleClick(5)} sx={{ marginTop: open ? 54 : 76 }}>
                            <ListItemIcon>
                                <LogoutIcon />
                            </ListItemIcon>
                            <ListItemText primary="Logout" />
                        </ListItemButton>
                    </List>

                </Drawer>
                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                    }}
                >
                    <Toolbar />
                    {type === 'transactions' && <Transactions />}
                    {type === 'deposit' && <Deposit />}
                    {type === 'withdraw' && <Withdraw />}
                    {type === 'myaccount' && <MyAccount />}
                </Box>
            </Box>
        </ThemeProvider >
    );
}