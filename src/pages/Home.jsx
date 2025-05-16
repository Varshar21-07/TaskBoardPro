import { Button, Container, Typography, Box, Grid, Card, CardContent, TextField, InputAdornment } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { Email, ListAlt, Settings, Group, Home as HomeIcon, CalendarMonth, BarChart, Link, Notifications as Bell, Smartphone } from '@mui/icons-material';
import logo from '../assets/react.svg';

const features = [
  { icon: <ListAlt color="primary" />, title: 'Kanban Boards', desc: 'Visualize your workflow, track progress, and manage tasks seamlessly.' },
  { icon: <Settings color="primary" />, title: 'Task Automation', desc: 'Automate repetitive tasks and rules to streamline your project management.' },
  { icon: <Group color="primary" />, title: 'Team Collaboration', desc: 'Assign tasks, share updates, and collaborate effectively with your team.' },
  { icon: <HomeIcon color="primary" />, title: 'Custom Workflows', desc: 'Define custom statuses and build workflows tailored to your project needs.' },
  { icon: <CalendarMonth color="primary" />, title: 'Due Date Tracking', desc: 'Set deadlines, track progress, and ensure timely completion of tasks.' },
  { icon: <BarChart color="primary" />, title: 'Reporting & Analytics', desc: 'Gain insights into project performance with detailed reports and analytics.' },
  { icon: <Link color="primary" />, title: 'Integrations', desc: 'Connect with your favorite tools and services to enhance your workflow.' },
  { icon: <Bell color="primary" />, title: 'Notifications', desc: 'Stay updated on task changes, assignments, and deadlines with notifications.' },
  { icon: <Smartphone color="primary" />, title: 'Mobile Access', desc: 'Manage your projects and tasks on the go with our mobile-friendly design.' },
];

function Home() {
  const navigate = useNavigate();
  return (
    <Box sx={{ bgcolor: '#fff', minHeight: '100vh', pb: 6 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', px: 4, pt: 3 }}>
        <img src="https://img.freepik.com/premium-vector/luxury-sv-monogram-logo-design_693012-676.jpg?w=740" alt="TaskBoard Pro Logo" style={{ width: 48, height: 48, borderRadius: '50%', marginRight: 12, objectFit: 'cover', background: '#fff' }} />
        <Typography variant="h6" fontWeight={600}>TaskBoard Pro</Typography>
      </Box>
      {/* Hero Section */}
      <Grid container spacing={2} alignItems="center" justifyContent="center" sx={{ mt: 6, px: 4 }}>
        <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: { xs: 'center', md: 'flex-start' } }}>
          <Typography variant="h2" fontWeight={700} sx={{ mb: 2, fontSize: { xs: '2.2rem', md: '3.2rem' }, textAlign: { xs: 'center', md: 'left' } }}>
            Organize Your Projects, Empower Your Team.
          </Typography>
          <Typography variant="h6" color="#888" sx={{ mb: 4, fontWeight: 400, textAlign: { xs: 'center', md: 'left' } }}>
            TaskBoard Pro is the collaborative platform designed to streamline your workflow, automate tasks, and achieve project success.
          </Typography>
          <Button variant="contained" size="large" sx={{ borderRadius: 2, fontWeight: 600, px: 4, py: 1.5, fontSize: '1.1rem', background: '#6C63FF', alignSelf: 'center' }} onClick={() => navigate('/login')}>
            Get Started – Sign Up Free
          </Button>
        </Grid>
        <Grid item xs={12} md={6} sx={{ textAlign: 'center', display: 'flex', justifyContent: 'center' }}>
          <img src="https://sloanreview.mit.edu/wp-content/uploads/2022/06/2022_0623_Mashek_Collaboration-1290x860-1.jpg" alt="Project Management Illustration" style={{ maxWidth: '40%', borderRadius: 16, boxShadow: '0 2px 16px rgba(0,0,0,0.06)', background: '#fff' }} />
        </Grid>
      </Grid>
      {/* Features Section */}
      <Typography variant="h4" fontWeight={700} align="center" sx={{ mt: 10, mb: 4 }}>Key Features That Drive Success</Typography>
      <Grid container spacing={3} justifyContent="center" sx={{ px: { xs: 2, md: 8 } }}>
        {features.map((f, i) => (
          <Grid item xs={12} sm={6} md={4} key={f.title}>
            <Card sx={{ borderRadius: 3, boxShadow: '0 2px 12px rgba(0,0,0,0.04)', minHeight: 170 }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>{f.icon}<Typography sx={{ ml: 1.5, fontWeight: 600 }}>{f.title}</Typography></Box>
                <Typography color="#888" fontSize={15}>{f.desc}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      {/* Footer Section */}
      <Box sx={{ mt: 10, bgcolor: '#fff', borderTop: '1px solid #eee', pt: 6, pb: 2 }}>
        <Typography variant="h6" align="center" fontWeight={600} sx={{ mb: 2 }}>TaskBoard Pro</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <TextField
            placeholder="Your email address"
            size="small"
            sx={{ width: 260, bgcolor: '#f7f7fa', borderRadius: 2, mr: 1 }}
            InputProps={{ startAdornment: <InputAdornment position="start"><Email sx={{ color: '#888' }} /></InputAdornment> }}
          />
          <Button variant="contained" sx={{ bgcolor: '#6C63FF', borderRadius: 2, fontWeight: 600 }}>Subscribe</Button>
        </Box>
        <Grid container spacing={2} justifyContent="center" sx={{ mb: 2 }}>
          <Grid item xs={6} sm={3}><Typography fontWeight={500}>Product</Typography><Box sx={{ color: '#888', fontSize: 15 }}>Features<br />Pricing<br />Integrations</Box></Grid>
          <Grid item xs={6} sm={3}><Typography fontWeight={500}>Company</Typography><Box sx={{ color: '#888', fontSize: 15 }}>About Us<br />Contact<br />Careers</Box></Grid>
          <Grid item xs={6} sm={3}><Typography fontWeight={500}>Resources</Typography><Box sx={{ color: '#888', fontSize: 15 }}>Blog<br />Help Center<br />Documentation</Box></Grid>
          <Grid item xs={6} sm={3}><Typography fontWeight={500}>Legal</Typography><Box sx={{ color: '#888', fontSize: 15 }}>Privacy Policy<br />Terms of Service<br />Cookie Policy</Box></Grid>
        </Grid>
        <Box sx={{ textAlign: 'center', color: '#aaa', fontSize: 14, mt: 2 }}>
          © 2025 TaskBoard Pro. • Privacy Policy • Terms of Service • Cookie Policy
        </Box>
      </Box>
    </Box>
  );
}

export default Home;


