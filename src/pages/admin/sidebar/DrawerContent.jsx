import React from 'react';
import PropTypes from 'prop-types';

import {
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  IconButton,
  Typography,
} from '@mui/material';

import {
  Dashboard,
  Close,
  House,
  Inventory,
  VolunteerActivism,
  TableRows,
  Receipt,
} from '@mui/icons-material';

import { useNavigate, useLocation } from 'react-router-dom';

export default function DrawerContent({ handleClose }) {
  const navigate = useNavigate();
  const location = useLocation();
  const listItems = [
    {
      title: 'Dashboard',
      link: '/admin/dashboard',
      icon: <Dashboard />,
    },
    {
      title: 'Houses',
      link: '/admin/houses',
      icon: <House />,
    },
    {
      title: 'Items',
      link: '/admin/items',
      icon: <Inventory />,
    },
    {
      title: 'Records',
      link: '/admin/records',
      icon: <TableRows />,
    },
    {
      title: 'Receipts',
      link: '/admin/receipts',
      icon: <Receipt />,
    },
    {
      title: 'InKinds',
      link: '/admin/inkinds',
      icon: <VolunteerActivism />,
    },
  ];
  return (
    <Stack sx={{ width: '100%' }}>
      <span className="flex justify-end md:hidden">
        <IconButton onClick={() => handleClose()}>
          <Close />
        </IconButton>
      </span>
      <Typography variant="h3" color="primary" className="w-full p-4 text-center">SOS Village</Typography>
      <List sx={{ py: 0 }}>
        <Divider orientation="horizontal" />
        {
          listItems.map((item) => (
            <ListItemButton key={item.title} className={`${location.pathname.startsWith(item.link) && 'bg-blue-100'}`} onClick={() => navigate(item.link)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItemButton>
          ))
        }
      </List>
    </Stack>
  );
}

DrawerContent.defaultProps = {
  handleClose: () => {},
};

DrawerContent.propTypes = {
  handleClose: PropTypes.func,
};
