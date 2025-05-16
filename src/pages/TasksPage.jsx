import { useState } from 'react';
import {
  Box, Typography, Button, Paper, TextField, Select, MenuItem, FormControl, InputLabel, Grid, Divider
} from '@mui/material';
import { useLocation } from 'react-router-dom';

const mockMembers = [
  { email: 'alice@example.com', name: 'Alice Johnson' },
  { email: 'bob@example.com', name: 'Bob Williams' },
];
const defaultStatuses = ['To Do', 'In Progress', 'Review', 'Done'];
const mockTask = {
  id: 1,
  title: 'Implement User Authentication',
  description: 'Develop and integrate the user authentication module using OAuth 2.0 for seamless login and signup processes.',
  status: 'In Progress',
  dueDate: '2024-12-15',
  assignee: 'alice@example.com',
  automations: [
    'Status changes to "Done"',
    'Due date is tomorrow',
    'Task is assigned',
  ],
  activity: [
    '10/26/2024, 10:00:00 AM: Task created by Bob Williams',
    '10/27/2024, 9:30:00 AM: Status changed to "In Progress" by Alice Johnson',
    '10/27/2024, 11:00:00 AM: Due date set to 2024-12-15 by Alice Johnson',
    '10/28/2024, 2:00:00 PM: Assigned to Alice Johnson by Bob Williams',
    '10/29/2024, 9:00:00 AM: Description updated by Alice Johnson',
    '10/29/2024, 10:00:00 AM: Automation rule "Notify Project Lead" added by Alice Johnson',
    '10/30/2024, 3:00:00 PM: Status changed to "Blocked" by Bob Williams',
    '10/31/2024, 9:00:00 AM: Status changed to "In Progress" by Alice Johnson',
  ],
};

function TasksPage() {
  const [task, setTask] = useState(mockTask);
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState({
    title: task.title,
    description: task.description,
    status: task.status,
    dueDate: task.dueDate,
    assignee: task.assignee,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setTask({ ...task, ...form });
    setEdit(false);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#fafbfc' }}>
      {/* Sidebar (mock) */}
      <Box sx={{ width: 220, bgcolor: '#fff', borderRight: '1px solid #eee', display: 'flex', flexDirection: 'column', py: 2 }}>
        <List>
          <ListItem sx={{ bgcolor: 'transparent', borderRadius: 2, mb: 1, mx: 2, color: '#222' }}>
            <ListItemIcon sx={{ minWidth: 36 }}><AssignmentIcon sx={{ color: '#6C63FF' }} /></ListItemIcon>
            <ListItemText primary="Tasks" primaryTypographyProps={{ fontWeight: 600 }} />
          </ListItem>
        </List>
      </Box>
      {/* Main Content */}
      <Box sx={{ flex: 1, minHeight: '100vh', px: 5, py: 4 }}>
        <Paper sx={{ p: 4, mb: 4 }}>
          <Typography variant="h5" fontWeight={700} sx={{ mb: 2 }}>Task Details</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Title"
                name="title"
                value={form.title}
                onChange={handleChange}
                fullWidth
                disabled={!edit}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Description"
                name="description"
                value={form.description}
                onChange={handleChange}
                fullWidth
                multiline
                rows={3}
                disabled={!edit}
                sx={{ mb: 2 }}
              />
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Status</InputLabel>
                <Select
                  name="status"
                  value={form.status}
                  label="Status"
                  onChange={handleChange}
                  disabled={!edit}
                >
                  {defaultStatuses.map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
                </Select>
              </FormControl>
              <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                {edit ? (
                  <>
                    <Button variant="outlined" onClick={() => setEdit(false)}>Cancel</Button>
                    <Button variant="contained" onClick={handleSave} sx={{ bgcolor: '#6C63FF' }}>Save</Button>
                  </>
                ) : (
                  <Button variant="contained" onClick={() => setEdit(true)} sx={{ bgcolor: '#6C63FF' }}>Edit</Button>
                )}
              </Box>
            </Grid>
          </Grid>
        </Paper>
        <Paper sx={{ p: 4, mb: 4 }}>
          <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>Due Date & Assignment</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Due Date"
                name="dueDate"
                type="date"
                value={form.dueDate}
                onChange={handleChange}
                fullWidth
                InputLabelProps={{ shrink: true }}
                disabled={!edit}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Assignee</InputLabel>
                <Select
                  name="assignee"
                  value={form.assignee}
                  label="Assignee"
                  onChange={handleChange}
                  disabled={!edit}
                >
                  {mockMembers.map(m => <MenuItem key={m.email} value={m.email}>{m.name}</MenuItem>)}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Paper>
        <Paper sx={{ p: 4, mb: 4 }}>
          <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>Automation Rules</Typography>
          {task.automations.map((rule, idx) => (
            <Box key={idx} sx={{ py: 1, borderBottom: '1px solid #eee' }}>{rule}</Box>
          ))}
          <Button variant="outlined" sx={{ mt: 2 }}>Add Rule</Button>
        </Paper>
        <Paper sx={{ p: 4 }}>
          <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>Activity Log</Typography>
          {task.activity.map((log, idx) => (
            <Typography key={idx} fontSize={14} sx={{ mb: 0.5 }}>{log}</Typography>
          ))}
        </Paper>
      </Box>
    </Box>
  );
}

export default TasksPage;
