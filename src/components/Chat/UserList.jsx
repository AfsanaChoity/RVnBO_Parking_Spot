import React from 'react';
import { Avatar as MuiAvatar } from '@mui/material'; // Import Material UI Avatar
import Badge from '@mui/material/Badge'; // Import Material UI Badge
import { styled } from '@mui/material/styles';

// Styled Badge component to display the green dot when the user is online
const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-dot': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
  },
}));

export const UserList = ({ users, selectedUserId, onUserSelect, currentUserId }) => {
  const formatLastSeen = (lastSeen) => {
    const now = new Date();
    const diff = now.getTime() - new Date(lastSeen).getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return new Date(lastSeen).toLocaleDateString();

    
  };

  

  return (
    <div className="space-y-1">
      {users.length === 0 ? (
        <p className="text-sm text-gray-400 text-center mt-4">No users found</p>
      ) : (
        users.map((user) => (
          <div
            key={user._id}
            onClick={() => onUserSelect(user._id)}
            className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-colors ${
              selectedUserId === user._id
                ? 'bg-gray-300 bg-opacity-20'
                : 'hover:bg-gray-300'
            }`}
          >
            {/* Use StyledBadge to display the dot when user is online */}
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              variant={user.isOnline ? 'dot' : 'standard'} // Show dot only if the user is online
            >
              <MuiAvatar
                src={user?.image}
                alt={user?.name}
                sx={{ width: 40, height: 40 }} // Avatar size can be adjusted
              />
            </StyledBadge>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="font-medium truncate">{user.name}</h3>
                {/* <span className="text-xs text-gray-400">
                  {user.isOnline
                    ? (<div className='w-2 h-2 border border-green-600 rounded-full bg-green-600'></div>)
                    : user?.lastSeen
                    ? formatLastSeen(user?.lastSeen)
                    : (<div className='w-2 h-2 border border-gray-400 rounded-full bg-gray-400'></div>)}
                </span> */}
              </div>
              
            </div>
          </div>
        ))
      )}
    </div>
  );
};
