import { useState } from 'react';
import {
  AppBar,
  Drawer,
  Box,
  Toolbar,
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import { Link, useHistory } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PersonIcon from '@mui/icons-material/Person';
import ReceiptIcon from '@mui/icons-material/Receipt';
import { ROUTES } from '../../../constants';

const Header = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const history = useHistory();
  const { location } = history;

  const ListItemLink = props => {
    const { icon, primary, to, selected } = props;
    const CustomLink = props => <Link to={to} {...props} />;

    return (
      <li>
        <ListItem
          onClick={() => setIsDrawerOpen(false)}
          selected={selected}
          button
          component={CustomLink}
        >
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText primary={primary} />
        </ListItem>
      </li>
    );
  };
  const listItems = [
    { name: 'Packages', to: ROUTES.PACKAGES, icon: <LocalShippingIcon /> },
    { name: 'Customers', to: ROUTES.CUSTOMER, icon: <PersonIcon /> },
    { name: 'Invoices', to: ROUTES.INVOICES, icon: <ReceiptIcon /> },
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <IconButton
            onClick={() => setIsDrawerOpen(true)}
            size='large'
            edge='start'
            color='inherit'
            aria-label='menu'
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant='h6'
            component='div'
            sx={{ flexGrow: 1, textAlign: 'center' }}
          >
            Mail Delivery Service
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor='left'
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        <List component='nav' style={{ width: '300px', paddingTop: '40px' }}>
          {listItems.map(({ name, to, icon }) => (
            <ListItemLink
              key={name}
              primary={name}
              to={to}
              selected={to === location?.pathname}
              icon={icon}
            />
          ))}
        </List>
      </Drawer>
    </Box>
  );
};

export default Header;
