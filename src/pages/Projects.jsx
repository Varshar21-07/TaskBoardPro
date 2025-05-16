import { Box, Typography, Grid, Paper } from '@mui/material';

const mockProjects = [
  { id: 1, title: 'Website Redesign 2024', description: 'Complete overhaul of the corporate website focusing on modern design and user', status: 'Active' },
  { id: 2, title: 'Marketing Campaign Q3', description: 'Plan and execute the Q3 marketing strategy across multiple channels.', status: 'Active' },
  { id: 3, title: 'New Product Launch', description: 'Development and launch of the new TaskBoard Pro mobile application.', status: 'On Hold' },
];

function Projects() {
  return (
    <Box>
      <Typography variant="h5" fontWeight={700} sx={{ mb: 3 }}>Projects</Typography>
      <Grid container spacing={3} alignItems="stretch">
        {mockProjects.map((project) => (
          <Grid item xs={12} sm={6} md={4} key={project.id} sx={{ display: 'flex' }}>
            <Paper sx={{ flex: 1, minHeight: 200, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', p: 2, borderRadius: 2, boxShadow: 1 }}>
              <Typography fontWeight={700} sx={{ mb: 1 }}>{project.title}</Typography>
              <Typography color="#888" fontSize={14} sx={{ mb: 1, textAlign: 'center' }}>{project.description}</Typography>
              <Typography color="#6C63FF" fontWeight={600}>{project.status}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Projects;
