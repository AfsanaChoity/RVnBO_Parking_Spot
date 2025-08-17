import * as React from 'react';
import { Link as RouterLink, NavLink, Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Badge from '@mui/material/Badge';
import MenuIcon from '@mui/icons-material/Menu';
import MailIcon from '@mui/icons-material/Mail';

import logo from '/logo.png';
import GradientButton from '../common/GradientButton';
import { useGetUserQuery } from '../../redux/api/authApi';

// center nav items
const publicNav = [
  { label: 'Explore', path: '/explore' },
  { label: 'Discover Spots', path: '/spots' },
  { label: 'How It Works', path: '/how-it-works' },
  { label: 'Contact Us', path: '/contact' },
];

const landownerNav = [
  { label: 'Home', path: '/host' },
  { label: 'How It Works', path: '/host/how-it-works' },
  { label: 'Start Hosting', path: '/host/start' },
  { label: 'Contact Us', path: '/host/contact' },
];

// user menu items
const travelerMenu = [
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'My Booking', path: '/bookings' },
  { label: 'Saved Spot', path: '/saved' },
  { label: 'Profile Settings', path: '/settings/profile' },
  { label: 'Logout', path: '/logout', isLogout: true },
];

const landownerMenu = [
  { label: 'Overview', path: '/host/overview' },
  { label: 'Spot Lists', path: '/host/spots' },
  { label: 'Reviews', path: '/host/reviews' },
  { label: 'Earnings', path: '/host/earnings' },
  { label: 'Profile Settings', path: '/settings/profile' },
  { label: 'Logout', path: '/logout', isLogout: true },
];

function Navbar({ unread = 4, onLogout }) {
  const { data: userData, error, isLoading } = useGetUserQuery();

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const role = userData?.role;

  const navItems = role === 'landowner' ? landownerNav : publicNav;
  const userItems = role === 'landowner' ? landownerMenu : role === 'traveler' ? travelerMenu : [];


  const handleOpenNavMenu = (e) => setAnchorElNav(e.currentTarget);
  const handleOpenUserMenu = (e) => setAnchorElUser(e.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  const handleUserItemClick = (item) => {
    handleCloseUserMenu();
    if (item.isLogout && onLogout) onLogout();
  };

  return (
    <AppBar position="static" sx={{ bgcolor: '#468F9D' }}>
      <Container maxWidth={false} disableGutters>
        {/* 3-column layout: [left | center | right] */}
        <Toolbar
          disableGutters
          sx={{
            display: 'grid',
            gridTemplateColumns: 'auto 1fr auto',
            alignItems: 'center',
            gap: 1,
            px: { md: 3 },
          }}
        >
          {/* LEFT: hamburger + logo */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {/* mobile hamburger */}
            <IconButton
              size="large"
              color="inherit"
              onClick={handleOpenNavMenu}
              sx={{ display: { xs: 'flex', md: 'none' } }}
              aria-label="open navigation"
              aria-controls="menu-appbar"
              aria-haspopup="true"
            >
              <MenuIcon />
            </IconButton>

            {/* desktop logo */}
            <Box
              component={RouterLink}
              to="/"
              sx={{
                display: { xs: 'none', md: 'flex' },
                alignItems: 'center',
                textDecoration: 'none',
                color: 'inherit',
              }}
            >
              <img src={logo} alt="logo" style={{ width: 48, height: 80, padding: '16px 0' }} />
            </Box>

            {/* mobile logo */}
            <Box
              component={RouterLink}
              to="/"
              sx={{
                display: { xs: 'flex', md: 'none' },
                alignItems: 'center',
                textDecoration: 'none',
                color: 'inherit',
                ml: 1,
              }}
            >
              <img src={logo} alt="logo" style={{ height: 32, width: 'auto' }} />
            </Box>
          </Box>

          {/* CENTER: role-based pages */}
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              justifyContent: 'center',
              justifySelf: 'center',
              gap: { md: 4, lg: 6 },
              minWidth: 0,
            }}
          >
            {navItems.map((item) => (
              <Button
                key={item.path}
                component={NavLink}
                to={item.path}
                end
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: 'white',
                  textTransform: 'none',
                  fontWeight: 600,
                  fontSize: { md: '1rem', lg: '1.125rem' },
                  letterSpacing: { md: '.02rem', lg: '.04rem' },
                  '&.active': {
                    borderBottom: '2px solid #fff',
                    borderRadius: 0,
                  },
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>

          {/* RIGHT: auth actions / inbox / avatar */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, justifySelf: 'end' }}>
            {!userData ? (
              <>
                <Link to="/auth/login"><GradientButton text="Log In" /></Link>
                <Link to="/onboarding/role"><GradientButton text="Sign Up" /></Link>
              </>
            ) : (
              <>
                <IconButton size="large" color="inherit" aria-label="inbox">
                  <Badge badgeContent={unread} color="error">
                    <MailIcon />
                  </Badge>
                </IconButton>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="User avatar">
                      {userData?.image ? (
                        <img src={userData?.image} alt="user avatar" />
                      ) : (
                        userData?.name?.charAt(0).toUpperCase() 
                      )}
                    </Avatar>
                  </IconButton>
                </Tooltip>
              </>
            )}
          </Box>
        </Toolbar>

        {/* MOBILE NAV MENU (role-based) */}
        <Menu
          id="menu-appbar"
          anchorEl={anchorElNav}
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}
          keepMounted
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
          sx={{ display: { xs: 'block', md: 'none' } }}
        >
          {navItems.map((item) => (
            <MenuItem
              key={item.path}
              component={RouterLink}
              to={item.path}
              onClick={handleCloseNavMenu}
            >
              <Typography textAlign="center">{item.label}</Typography>
            </MenuItem>
          ))}
        </Menu>

        {/* USER MENU (role-based items) */}
        <Menu
          sx={{ mt: '45px' }}
          id="menu-user"
          anchorEl={anchorElUser}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
          keepMounted
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          {userItems.map((item) => (
            <MenuItem
              key={item.label}
              component={item.isLogout ? 'button' : RouterLink}
              to={item.isLogout ? undefined : item.path}
              onClick={() => handleUserItemClick(item)}
              sx={{ ...(item.isLogout && { color: 'error.main' }) }}
            >
              <Typography textAlign="center">{item.label}</Typography>
            </MenuItem>
          ))}
        </Menu>
      </Container>
    </AppBar>
  );
}

export default Navbar;
