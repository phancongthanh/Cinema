import { Logout, Settings } from '@mui/icons-material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Avatar, Divider, IconButton, ListItemIcon, Menu, MenuItem, Tooltip } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import accounts from '../backend/accounts';
import identity from '../backend/identity';
import useAuth from '../hooks/useAuth';

const AccountIcon = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const role = identity.getRole();
  const avatarSrc = role === 'Member' ? "" : role === 'Manager' ? "https://i.pravatar.cc/300?img=31" : "https://i.pravatar.cc/300?img=32";

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    setAuth(null);
    navigate('/login', {replace : true})
    accounts.logout();
  };

  return (
    <div className="items">
      <Tooltip title="Account settings">
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ ml: 2 }}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <Avatar sx={{ width: 42, height: 42 }} src={avatarSrc}></Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={() => navigate('/userinfo')}>
          <Avatar src ={avatarSrc}/> Thông tin cá nhân
        </MenuItem>
        {role !== 'Member' && 
        <MenuItem onClick={() => navigate(role === 'Admin' ? '/admin' :'/admin/showtimes')}>
         <ListItemIcon>
            <DashboardIcon fontSize="small" />
          </ListItemIcon>
          Quản lý rạp phim
        </MenuItem>
        }
        <Divider />
        <MenuItem onClick={() => navigate('/password')}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Đổi mật khẩu
        </MenuItem>
        <MenuItem onClick={logout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Đăng xuất
        </MenuItem>
      </Menu>
    </div>
  );
};

export default AccountIcon;
