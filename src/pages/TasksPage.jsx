import { useState, useEffect } from 'react';
import {
  Box, Typography, Button, Paper, TextField, Select, MenuItem, FormControl, InputLabel, Grid
} from '@mui/material';
import { getTasks } from '../api/api';

function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [projectId, setProjectId] = useState(null);

  useEffect(() => {
    // Always get projectId from URL for consistency
    const url = window.location.pathname;
    const match = url.match(/project\/(\w+)/);
    if (match) setProjectId(match[1]);
    else setProjectId(null);
  }, []); // Only run once on mount

  useEffect(() => {
    async function fetchTasks() {
      try {
        // If projectId is present, fetch tasks for that project; otherwise, fetch all tasks
        const data = await getTasks(projectId);
        setTasks(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchTasks();
  }, [projectId]);

  if (loading) return <Typography>Loading tasks...</Typography>;
  if (error) return <Typography color="error">Error: {error}</Typography>;

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#fafbfc' }}>
      {/* Sidebar (mock) */}
      <Box sx={{ width: 220, bgcolor: '#fff', borderRight: '1px solid #eee', display: 'flex', flexDirection: 'column', py: 2 }}>
        {/* Sidebar content can be added here */}
      </Box>
      {/* Main Content */}
      <Box sx={{ flex: 1, minHeight: '100vh', px: 5, py: 4 }}>
        <Paper sx={{ p: 4, mb: 4 }}>
          <Typography variant="h5" fontWeight={700} sx={{ mb: 2 }}>Tasks</Typography>
          {tasks.map((task) => (
            <Paper key={task._id} sx={{ p: 2, mb: 2 }}>
              <Typography variant="h6" fontWeight={700}>{task.title}</Typography>
              <Typography sx={{ mb: 1 }}>{task.description}</Typography>
              <Typography>Status: {task.status}</Typography>
              <Typography>Due Date: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'N/A'}</Typography>
              <Typography>Assignee: {task.assignee && typeof task.assignee === 'object' ? (task.assignee.name || task.assignee.email) : (task.assignee || 'Unassigned')}</Typography>
            </Paper>
          ))}
        </Paper>
      </Box>
    </Box>
  );
}

export default TasksPage;
