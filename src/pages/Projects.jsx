import { Box, Typography, Grid, Paper, Button, Modal, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { getProjects, createProject } from '../api/api';

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [newProject, setNewProject] = useState({ name: '', description: '' });

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

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    setNewProject({ ...newProject, [e.target.name]: e.target.value });
  };

  const handleCreateProject = async () => {
    if (!newProject.name) return;
    try {
      // Set a default owner if not provided (for demo/mock/testing)
      const owner = (projects[0] && projects[0].owner) || (JSON.parse(localStorage.getItem('mock_project'))?.owner) || undefined;
      const created = await createProject({ ...newProject, owner });
      setProjects([...projects, created]);
      setNewProject({ name: '', description: '' });
      handleClose();
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <Typography>Loading projects...</Typography>;
  if (error) return <Typography color="error">Error: {error}</Typography>;

  return (
    <Box>
      <Typography variant="h5" fontWeight={700} sx={{ mb: 3 }}>Projects</Typography>
      <Button variant="contained" sx={{ mb: 3, bgcolor: '#6C63FF', borderRadius: 2, fontWeight: 600 }} onClick={handleOpen}>+ Add Project</Button>
      <Grid container spacing={3} alignItems="stretch">
        {projects.map((project) => (
          <Grid item xs={12} sm={6} md={4} key={project._id || project.id} sx={{ display: 'flex' }}>
            <Paper sx={{ flex: 1, minHeight: 200, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', p: 2, borderRadius: 2, boxShadow: 1 }}>
              <Typography fontWeight={700} sx={{ mb: 1 }}>{project.name || project.title}</Typography>
              <Typography color="#888" fontSize={14} sx={{ mb: 1, textAlign: 'center' }}>{project.description}</Typography>
              <Typography color="#6C63FF" fontWeight={600}>{project.status}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
      <Modal open={open} onClose={handleClose}>
        <Box sx={{ p: 4, bgcolor: 'background.paper', borderRadius: 2, width: 400, mx: 'auto', mt: 10 }}>
          <Typography variant="h6" gutterBottom>Add Project</Typography>
          <TextField label="Name" name="name" fullWidth value={newProject.name} onChange={handleChange} sx={{ mb: 2 }} />
          <TextField label="Description" name="description" fullWidth multiline rows={2} value={newProject.description} onChange={handleChange} sx={{ mb: 2 }} />
          <Button variant="contained" onClick={handleCreateProject} fullWidth>Add</Button>
        </Box>
      </Modal>
    </Box>
  );
}

export default Projects;
