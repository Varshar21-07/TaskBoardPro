import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Typography, Button, Avatar, Divider, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AddIcon from '@mui/icons-material/Add';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function DashboardLayout() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  // Sidebar navigation items
  const navItems = [
    { label: 'Dashboard', icon: <DashboardIcon sx={{ color: '#222' }} />, active: false, onClick: () => navigate('/dashboard') },
    { label: 'Projects', icon: <SettingsIcon sx={{ color: '#888' }} />, active: false, onClick: () => navigate('/project/1') },
    { label: 'Tasks', icon: <AssignmentIcon sx={{ color: '#888' }} />, active: false, onClick: () => navigate('/project/1?tab=tasks') },
  ];
  // Avatar fallback
  const renderAvatar = (user) => {
    if (user?.photo) return <Avatar src={user.photo} sx={{ width: 36, height: 36, mr: 1 }} />;
    if (user?.name) return <Avatar sx={{ width: 36, height: 36, mr: 1 }}>{user.name[0]}</Avatar>;
    return <Avatar sx={{ width: 36, height: 36, mr: 1 }} />;
  };
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#fafbfc' }}>
      {/* Sidebar */}
      <Box sx={{ width: 220, bgcolor: '#fff', borderRight: '1px solid #eee', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', py: 2 }}>
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', px: 3, mb: 4 }}>
            <img src="https://img.freepik.com/premium-vector/luxury-sv-monogram-logo-design_693012-676.jpg?w=740" alt="Logo" style={{ width: 36, height: 36, borderRadius: 8, marginRight: 8, background: '#fff' }} />
            <Typography variant="h6" fontWeight={700} color="#6C63FF">TaskBoard Pro</Typography>
          </Box>
          <List>
            {navItems.map((item) => (
              <ListItem key={item.label} sx={{ bgcolor: item.active ? '#6C63FF' : 'transparent', borderRadius: 2, mb: 1, mx: 2, color: item.active ? '#fff' : '#222', '&:hover': { bgcolor: item.active ? '#6C63FF' : '#f5f5f5' } }} button onClick={item.onClick}>
                <ListItemIcon sx={{ minWidth: 36 }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} primaryTypographyProps={{ fontWeight: 600 }} />
              </ListItem>
            ))}
          </List>
        </Box>
        <Box sx={{ px: 3, pb: 2, pt: 4, position: 'relative' }}>
          <Divider sx={{ mb: 2 }} />
          <Box
            sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', userSelect: 'none' }}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {renderAvatar(user)}
            <Box sx={{ ml: 1 }}>
              <Typography fontWeight={600} fontSize={14}>
                {user?.name || user?.email || 'User'}
              </Typography>
              <Typography fontSize={12} color="#888">View Profile</Typography>
            </Box>
          </Box>
          {menuOpen && (
            <Box sx={{ position: 'absolute', left: 0, right: 0, top: 70, bgcolor: '#fff', boxShadow: 3, borderRadius: 2, zIndex: 10, minWidth: 160 }}>
              {/* <Button
                fullWidth
                sx={{ justifyContent: 'flex-start', color: '#222', fontWeight: 500, textTransform: 'none', py: 1 }}
                onClick={() => { setMenuOpen(false); navigate('/profile'); }}
              >
                Profile
              </Button> */}
              <Button
                fullWidth
                sx={{ justifyContent: 'flex-start', color: '#d32f2f', fontWeight: 600, textTransform: 'none', py: 1 }}
                onClick={() => { setUser(null); navigate('/login'); }}
              >
                Logout
              </Button>
            </Box>
          )}
        </Box>
      </Box>
      {/* Main Content */}
      <Box sx={{ flex: 1, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        {/* Top Bar */}
        <Box sx={{ display: 'flex', alignItems: 'center', px: 4, py: 2, bgcolor: '#fff', borderBottom: '1px solid #eee' }}>
          <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', gap: 4 }}>
            <Typography variant="h6" fontWeight={700} color="#6C63FF">TaskBoard Pro</Typography>
            <Button sx={{ color: '#6C63FF', fontWeight: 600, textTransform: 'none' }} onClick={() => navigate('/dashboard')}>Dashboard</Button>
            <Button sx={{ color: '#222', fontWeight: 600, textTransform: 'none' }} onClick={() => navigate('/project/1')}>Projects</Button>
            <Button sx={{ color: '#222', fontWeight: 600, textTransform: 'none' }} onClick={() => navigate('/project/1?tab=tasks')}>Tasks</Button>
          </Box>
          {renderAvatar(user)}
        </Box>
        {/* Content */}
        <Box sx={{ flex: 1, px: 5, py: 4, bgcolor: '#fafbfc' }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}

export default DashboardLayout;
