import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Button, Container } from '@mui/material';
import { useEffect } from 'react';

import LogoImage from '../Images/Logo/CodeBook-logo-t-w.png'
import colorset from './colorset';

interface isLoginProps {
    isLogin: boolean;
    setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function MenuAppBar({ isLogin, setIsLogin }: isLoginProps) {

    const login = localStorage.getItem('isLogin');
    useEffect(() => {
        if (login !== null) {
            setIsLogin(JSON.parse(login));
        } else {
            setIsLogin(false);
        }
    }, []);

    function setLogin() {
        setIsLogin(true);
        localStorage.setItem('isLogin', 'true')
    }
    function setLogout() {
        setIsLogin(false);
        localStorage.setItem('isLogin', 'false')
    }

    function LoginBtn() {
        if (isLogin) {
            return (
                <>
                    <Button color="inherit" variant="outlined" onClick={setLogout}>Logout</Button>
                </>
            )
        } else {
            return (
                <>
                    <Button color="inherit" variant="contained" onClick={setLogin} sx={{ color: colorset.dark, fontWeight: 'bold' }}>Login</Button>
                </>
            )
        }
    }

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" sx={{ backgroundColor: colorset.dark }}>
                    <Container maxWidth="lg">
                        <Toolbar>
                            <Box sx={{ flexGrow: 1 }}>
                                <a href="/">
                                    <img src={LogoImage} alt="Code Book" style={{ height: 60, padding: '5px 0' }} />
                                </a>
                            </Box>
                            <div>
                                <LoginBtn></LoginBtn>
                            </div>
                        </Toolbar>
                    </Container>
                </AppBar>
            </Box>
        </>

    );
}
