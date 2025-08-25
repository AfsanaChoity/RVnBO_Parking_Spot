import { Link, useLocation } from 'react-router-dom';
import { Menu, message } from 'antd';
import { GoStack } from 'react-icons/go';
import { IoBriefcaseOutline, IoBookmarkOutline } from 'react-icons/io5';
import { CiSettings } from 'react-icons/ci';
import { FiLogOut } from 'react-icons/fi';
import { MdOutlineStore, MdOutlineStar, MdOutlineAttachMoney } from 'react-icons/md';
import { useEffect, useCallback } from 'react';

import '../../styles/sidebar.css';
import { useGetUserQuery, useLogoutUserMutation } from '../../redux/api/authApi';
import { useAuth } from '../../redux/hooks';

export default function Sidebar() {
  const location = useLocation();
  const [logoutUser] = useLogoutUserMutation();
  const { token, logout: logoutAction } = useAuth();

  const { data: userData, error } = useGetUserQuery(undefined, { skip: !token });

  // Unauthorized error handling
  useEffect(() => {
    if (error?.status === 401) {
      localStorage.removeItem('user-token');
      window.location.href = '/auth/login';
    }
  }, [error]);

  const role = userData?.user?.role;

  // Logout handler
  const handleLogout = useCallback(() => {
    logoutUser()
      .unwrap()
      .then(() => {
        logoutAction();
        localStorage.removeItem('user-token');
        // message.success('Logged out successfully');
        window.location.href = '/auth/login';
      })
      .catch(() => {
        message.error('Logout failed. Please try again.');
      });
  }, [logoutUser, logoutAction]);

  // Traveler menu
  const travelerMenu = [
    { key: '/traveler/dashboard', icon: <GoStack size={22} />, label: <Link to="/traveler/dashboard">Dashboard</Link> },
    // { key: '/traveler/bookings', icon: <IoBriefcaseOutline size={22} />, label: <Link to="/traveler/bookings">My Bookings</Link> },
    { key: '/traveler/saved-spots', icon: <IoBookmarkOutline size={22} />, label: <Link to="/traveler/saved-spots">Saved Spots</Link> },
    {
      key: '/traveler/profile',
      icon: <CiSettings size={22} />,
      label: (
        <Link
          to="/traveler/profile"
          onClick={() => {
            localStorage.removeItem('profileTab');
            sessionStorage.removeItem('profileFirstOpen');
          }}
        >
          Profile Settings
        </Link>
      ),
    },
    {
      key: '/logout',
      icon: <FiLogOut size={22} />,
      label: <span onClick={handleLogout}>Logout</span>,
      // isLogout: true,
    },
  ];

  // Landowner menu
  const landownerMenu = [
    { key: '/host/overview', icon: <GoStack size={22} />, label: <Link to="/host/overview">Overview</Link> },
    { key: '/host/spots', icon: <MdOutlineStore size={22} />, label: <Link to="/host/spots">Spot Lists</Link> },
    { key: '/host/earnings', icon: <MdOutlineAttachMoney size={22} />, label: <Link to="/host/earnings">My Earnings</Link> },
    { key: '/host/guest-reviews', icon: <MdOutlineStar size={22} />, label: <Link to="/host/guest-reviews">Guest Reviews</Link> },
    {
      key: '/host/profile',
      icon: <CiSettings size={22} />,
      label: (
        <Link
          to="/host/profile"
          onClick={() => {
            localStorage.removeItem('profileTab');
            sessionStorage.removeItem('profileFirstOpen');
          }}
        >
          Profile Settings
        </Link>
      ),
    },
    {
      key: '/logout',
      icon: <FiLogOut size={22} />,
      label: <span onClick={handleLogout}>Logout</span>,
      // isLogout: true,
    },
  ];

  const items = role === 'landowner' ? landownerMenu : travelerMenu;

  return (
    <div className="flex flex-col justify-between">
      <Menu
        className="custom-sidebar-menu poppins-medium"
        selectedKeys={[location.pathname]}
        mode="inline"
        theme="light"
        items={items}
      />
    </div>
  );
}
