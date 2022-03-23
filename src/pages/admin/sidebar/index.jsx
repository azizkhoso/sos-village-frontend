import React from 'react';
import PropTypes from 'prop-types';

import {
  Drawer,
} from '@mui/material';
import DrawerContent from './DrawerContent';

export default function Sidebar({ open, setOpen }) {
  return (
    <>
      <div className="hidden md:block md:w-3/12 lg:w-3/12 2xl:w-2/12">
        <Drawer
          variant="permanent"
          sx={{ width: '100%' }}
          classes={{ paper: 'md:w-3/12 lg:w-3/12 2xl:w-2/12' }}
        >
          <DrawerContent />
        </Drawer>
      </div>
      <div className="block md:hidden">
        <Drawer
          variant="temporary"
          open={open}
          onClose={() => setOpen(false)}
        >
          <DrawerContent handleClose={() => setOpen(false)} />
        </Drawer>
      </div>
    </>
  );
}

Sidebar.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};
