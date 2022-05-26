import Header from './Header';
import Footer from './Footer';
import { Container, Box } from '@mui/material';

const Layout = ({ children }) => {
  return (
    <Box component='div'>
      <Header />
      <Container>
        <Box
          component='div'
          sx={{ minHeight: 'calc(100vh - 86px)', padding: '30px 0' }}
        >
          {children}
        </Box>
      </Container>
      <Footer />
    </Box>
  );
};

export default Layout;
