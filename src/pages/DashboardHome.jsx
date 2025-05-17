import { Box, Typography, Grid, Button, Avatar, Chip, LinearProgress } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProjects } from '../api/api';

function DashboardHome() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProjects() {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  if (loading) return <Typography>Loading projects...</Typography>;
  if (error) return <Typography color="error">Error: {error}</Typography>;

  const totalProjects = projects.length;
  const activeProjects = projects.filter(p => p.status === 'Active').length;
  const completedProjects = projects.filter(p => p.status === 'Completed').length;
  const statusColor = (status) => {
    if (status === 'Active') return 'success';
    if (status === 'Completed') return 'primary';
    if (status === 'On Hold') return 'warning';
    return 'default';
  };

  return (
    <Box>
      <Typography variant="h5" fontWeight={700} sx={{ mb: 3 }}>Projects Overview</Typography>
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={4}>
          <Box sx={{ bgcolor: '#fff', borderRadius: 2, p: 3, border: '1px solid #eee', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h4" fontWeight={700} color="#6C63FF">{totalProjects}</Typography>
            <Typography color="#888" fontWeight={500}>Total Projects</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box sx={{ bgcolor: '#fff', borderRadius: 2, p: 3, border: '1px solid #eee', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h4" fontWeight={700} color="#43b06e">{activeProjects}</Typography>
            <Typography color="#888" fontWeight={500}>Active Projects</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box sx={{ bgcolor: '#fff', borderRadius: 2, p: 3, border: '1px solid #eee', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h4" fontWeight={700} color="#2196f3">{completedProjects}</Typography>
            <Typography color="#888" fontWeight={500}>Completed Projects</Typography>
          </Box>
        </Grid>
      </Grid>
      <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>Recent Projects</Typography>
      <Grid container spacing={3}>
        {projects.map((project) => (
          <Grid item xs={12} sm={6} md={4} key={project._id}>
            <Box sx={{ bgcolor: '#fff', borderRadius: 2, border: '1px solid #eee', p: 2, display: 'flex', flexDirection: 'column', minHeight: 220, cursor: 'pointer' }} onClick={() => navigate(`/project/${project._id}`)}>
              {project.image ? (
                <Box sx={{ height: 90, borderRadius: 2, overflow: 'hidden', mb: 2 }}>
                  <img src={project.image} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </Box>
              ) : (
                <Box sx={{ height: 90, borderRadius: 2, bgcolor: '#f5f5f5', mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <DashboardIcon sx={{ color: '#bbb', fontSize: 40 }} />
                </Box>
              )}
              <Typography fontWeight={700} sx={{ mb: 0.5 }}>{project.title}</Typography>
              <Typography color="#888" fontSize={14} sx={{ mb: 1 }}>{project.description}</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                {project.members && project.members.map((member, idx) => (
                  <Avatar key={member._id || idx} sx={{ width: 24, height: 24, ml: idx === 0 ? 0 : -1 }}>{member.name ? member.name[0] : ''}</Avatar>
                ))}
                <Chip
                  label={project.status}
                  color={statusColor(project.status)}
                  size="small"
                  sx={{ ml: 2, fontWeight: 600, fontSize: 12, borderRadius: 1 }}
                />
              </Box>
              <Box sx={{ width: '100%' }}>
                <LinearProgress variant="determinate" value={project.progress || 0} sx={{ height: 6, borderRadius: 2, mb: 0.5, bgcolor: '#f0f0f0', '& .MuiLinearProgress-bar': { bgcolor: '#6C63FF' } }} />
                <Typography fontSize={12} color="#888" align="right">{project.progress || 0}% Complete</Typography>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default DashboardHome;
