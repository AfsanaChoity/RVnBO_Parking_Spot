import { Link, useLocation } from 'react-router-dom';
import { HiOutlineUserCircle } from "react-icons/hi2";
import { MdOutlineCategory } from "react-icons/md";
import { FiBox, FiLogOut } from "react-icons/fi";
import { MdOutlineStore, MdListAlt } from "react-icons/md";
import { IoBookmarkOutline, IoBriefcaseOutline, IoSettingsOutline } from "react-icons/io5";
import { AppstoreOutlined } from '@ant-design/icons';
import { Button, Menu } from 'antd';

import { MdOutlineDashboard } from "react-icons/md";
import { RiUserLine } from "react-icons/ri";
import { GoStack } from 'react-icons/go';
import { CiSettings } from 'react-icons/ci';
import { useAuth } from '../../../Hooks/UseAuth';

import '../../styles/sidebar.css'

export default function Sidebar() {
    const location = useLocation();
    const { user, logout } = useAuth();

    const items = [
    { key: '/traveler', icon: <GoStack style={{ fontSize: '24px' }} />, label: <Link to="/traveler">Dashboard</Link> },
    { key: '/traveler/bookings', icon: <IoBriefcaseOutline size={24} />, label: <Link to="/traveler/bookings">My booking</Link> },
    { key: '/traveler/saved-spot', icon: <IoBookmarkOutline size={24} />, label: <Link to="/traveler/saved-spot">Saved Spot</Link> },
    {
        key: '/traveler/profile-setting',
        icon: <CiSettings size={24} />,
        label: (
            <Link
                to="/traveler/profile-setting"
                onClick={() => {
                    localStorage.removeItem("profileTab"); // 🧹 clear saved tab
                    sessionStorage.removeItem("profileFirstOpen"); // optional: reset session flag too
                }}
            >
                Profile Setting
            </Link>
        ),
    },
    {
        key: '/logout',
        icon: <FiLogOut size={24} />,
        label: (
            <span
                onClick={() => {
                    logout();
                    window.location.href = "/"; // redirect manually after logout
                }}
            >
                Log out
            </span>
        ),
    },


];

    return (
        <div className=' flex flex-col justify-between '>

            {/* Top Section */}

            <div >


                {/* Menu */}
                <Menu
                    className="custom-sidebar-menu poppins-medium "
                    selectedKeys={[location.pathname]}
                    defaultOpenKeys={['sub1', 'sub2']}
                    mode="inline"
                    theme="light"

                    items={items}
                />

                
            </div>





        </div>


    )
}
