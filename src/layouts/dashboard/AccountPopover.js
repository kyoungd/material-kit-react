import { Icon } from '@iconify/react';
import { useRef, useState } from 'react';
import personFill from '@iconify/icons-eva/person-fill';
import settings2Fill from '@iconify/icons-eva/settings-2-fill';
import settingsOutline from '@iconify/icons-eva/settings-outline';

import { Link as RouterLink, useNavigate } from 'react-router-dom';
// material
import { alpha } from '@mui/material/styles';
import { Button, Box, Divider, MenuItem, Typography, Avatar, IconButton } from '@mui/material';
import { deepOrange } from '@mui/material/colors';
// components
import MenuPopover from '../../components/MenuPopover';
//
import { useUserState, useUserDispatch, signOut } from '../../components/UserContext';

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: 'Settings',
    icon: settingsOutline,
    linkTo: '/dashboard/settings'
  },
  {
    label: 'Schedule',
    icon: personFill,
    linkTo: '/dashboard/schedule'
  },
  {
    label: 'Billing',
    icon: settings2Fill,
    linkTo: '/dashboard/account'
  }
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const userDispatch = useUserDispatch();

  const { user } = useUserState();

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const navigate = useNavigate();
  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72)
            }
          })
        }}
      >
        <Avatar sx={{ bgcolor: deepOrange[500] }}>
          {user && user.displayName ? user.displayName.chatAt(0) : user.username.charAt(0)}
        </Avatar>
      </IconButton>

      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{ width: 220 }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle1" noWrap>
            {user.displayName ? user.displayName : user.username}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {user.email}
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        {MENU_OPTIONS.map((option) => (
          <MenuItem
            key={option.label}
            to={option.linkTo}
            component={RouterLink}
            onClick={handleClose}
            sx={{ typography: 'body2', py: 1, px: 2.5 }}
          >
            <Box
              component={Icon}
              icon={option.icon}
              sx={{
                mr: 2,
                width: 24,
                height: 24
              }}
            />

            {option.label}
          </MenuItem>
        ))}

        <Box sx={{ p: 2, pt: 1.5 }}>
          <Button
            fullWidth
            color="inherit"
            variant="outlined"
            onClick={() => {
              signOut(userDispatch);
              navigate('/login');
            }}
          >
            Logout
          </Button>
        </Box>
      </MenuPopover>
    </>
  );
}
