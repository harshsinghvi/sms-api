import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { AppwriteException } from 'appwrite';
// @mui
import { styled } from '@mui/material/styles';
//
import Header from './header';
import Nav from './nav';
import { AuthContext } from '../../utils/auth';
import { account, avatars } from '../../utils/appwrite';

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const StyledRoot = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden',
});

const Main = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

// ----------------------------------------------------------------------

export default function DashboardLayout() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const response = await account.get();
        const photoURL = avatars.getInitials();
        setUser({ ...response, photoURL });
      } catch (e) {
        if (e instanceof AppwriteException && e.code === 401) {
          return navigate('/login', { replace: true });
        }
        throw e;
      }
      return false;
    })();
  }, [navigate]);
  if (!user) return <h1>Loading...</h1>;
  return (
    <AuthContext.Provider value={{ user }}>
      <StyledRoot>
        <Header onOpenNav={() => setOpen(true)} />
        <Nav openNav={open} onCloseNav={() => setOpen(false)} />
        <Main>
          <Outlet />
        </Main>
      </StyledRoot>
    </AuthContext.Provider>
  );
}
