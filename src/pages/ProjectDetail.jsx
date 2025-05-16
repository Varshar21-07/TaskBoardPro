import { useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Container, Typography, Box, Grid, Paper, Button, Modal, TextField, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import InviteMembers from './InviteMembers';
import Automations from './Automations';
import Notifications from './Notifications';

const defaultStatuses = ['To Do', 'In Progress', 'Review', 'Done'];
const mockMembers = [
  { email: 'alice@example.com', name: 'Alice' },
  { email: 'bob@example.com', name: 'Bob' },
  { email: 'jane@example.com', name: 'Jane Smith' },
  { email: 'john@example.com', name: 'John Doe' },
];
const mockTasks = [
  { id: 1, projectId: 1, title: '[READ ME] Instructions for using this template', description: 'Detailed guide on optimizing your workflow with TaskBoard Pro.', status: 'To Do', assignee: 'jane@example.com', dueDate: '2024-08-15', tags: ['Getting Started'] },
  { id: 2, projectId: 1, title: 'Interview customers for blog story', description: 'Reach out to recent users for testimonials.', status: 'To Do', assignee: 'jane@example.com', dueDate: '', tags: ['Marketing', 'Customer Success'] },
  { id: 3, projectId: 1, title: 'Redesign ideas for gallery page', description: 'Brainstorming and wireframing new gallery page layout.', status: 'To Do', assignee: '', dueDate: '', tags: [] },
  { id: 4, projectId: 1, title: 'Prepare swag for conference', description: 'Order t-shirts, stickers, and brochures.', status: 'In Progress', assignee: 'alice@example.com', dueDate: '', tags: ['Events'] },
  { id: 5, projectId: 1, title: 'Mobile-specific academy content', description: 'Outline content for mobile development tutorials.', status: 'In Progress', assignee: 'bob@example.com', dueDate: '2024-09-01', tags: ['Content', 'Academy'] },
  { id: 6, projectId: 1, title: 'Highlight training material in app', description: 'Need to add tooltips or guides for new features.', status: 'In Progress', assignee: '', dueDate: '', tags: [] },
  { id: 7, projectId: 1, title: 'New headline options for blog', description: 'Draft 5-10 alternative headlines for the latest blog post.', status: 'Review', assignee: '', dueDate: '', tags: ['Marketing', 'Content'] },
  { id: 8, projectId: 1, title: 'Develop API for automation rules', description: 'Backend work for the new automation feature.', status: 'Review', assignee: 'john@example.com', dueDate: '2024-09-10', tags: ['Development', 'Backend'] },
  { id: 9, projectId: 1, title: 'Design automation rules UI', description: 'Mockups and prototypes for the automation editor.', status: 'Review', assignee: 'jane@example.com', dueDate: '', tags: [] },
  { id: 10, projectId: 1, title: 'Write documentation for API', description: 'Detailed API reference for developers.', status: 'Done', assignee: '', dueDate: '', tags: ['Documentation'] },
  { id: 11, projectId: 1, title: 'Implement drag-and-drop Kanban', description: 'Frontend implementation for Kanban board and task reordering.', status: 'Done', assignee: 'bob@example.com', dueDate: '', tags: ['Development', 'Frontend'] },
  { id: 12, projectId: 2, title: 'Plan Q3 campaign', description: 'Outline campaign goals and KPIs.', status: 'To Do', assignee: 'eve@example.com', dueDate: '', tags: ['Marketing'] },
  { id: 13, projectId: 2, title: 'Design campaign assets', description: 'Create banners and social media images.', status: 'In Progress', assignee: 'frank@example.com', dueDate: '', tags: ['Design'] },
  { id: 14, projectId: 2, title: 'Launch campaign', description: 'Go live with all channels.', status: 'Review', assignee: '', dueDate: '', tags: ['Launch'] },
];

function ProjectDetail() {
  const { id } = useParams();
  const location = useLocation();
  const [tasks, setTasks] = useState(mockTasks);
  const [members, setMembers] = useState(mockMembers);
  const [automations, setAutomations] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', description: '', status: defaultStatuses[0], assignee: '', dueDate: '' });

  const projectId = parseInt(id, 10);
  const filteredTasks = tasks.filter(t => t.projectId === projectId);

  const tab = new URLSearchParams(location.search).get('tab') || 'kanban';

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const handleCreateTask = () => {
    if (!newTask.title) return;
    setTasks([
      ...tasks,
      { ...newTask, id: Date.now(), projectId },
    ]);
    setNewTask({ title: '', description: '', status: defaultStatuses[0], assignee: '', dueDate: '' });
    handleClose();
  };

  const moveTask = (taskId, newStatus) => {
    setTasks(tasks.map(task => task.id === taskId ? { ...task, status: newStatus } : task));
  };

  const handleInvite = (email) => {
    setMembers([...members, { email, name: '' }]);
  };

  const handleAddAutomation = (automation) => {
    setAutomations([...automations, automation]);
    setNotifications([{ message: 'Automation rule added!' }]);
  };

  const handleNotificationClose = () => {
    setNotifications([]);
  };

  const handleNotify = (msg) => {
    setNotifications([{ message: msg }]);
  };

  return (
    <Container maxWidth={false} sx={{ mt: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5" fontWeight={700} sx={{ flex: 1 }}>{tab === 'tasks' ? 'Project Tasks' : 'Project Kanban Board'}</Typography>
        <Button variant="contained" sx={{ bgcolor: '#6C63FF', borderRadius: 2, fontWeight: 600 }} onClick={handleOpen}>+ Add Task</Button>
      </Box>
      <Box sx={{ mb: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
        {/* <Typography variant="h6" fontWeight={700} align="center" sx={{ mb: 1 }}>
          View
        </Typography> */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant={tab === 'kanban' ? 'contained' : 'outlined'} onClick={() => window.location.search = ''}>Status</Button>
          <Button variant={tab === 'tasks' ? 'contained' : 'outlined'} onClick={() => window.location.search = '?tab=tasks'}>Tasks</Button>
        </Box>
      </Box>
      {tab === 'kanban' ? (
        <Grid container spacing={2}>
          {defaultStatuses.map(status => (
            <Grid item xs={12} md={3} key={status}>
              <Paper sx={{ p: 2, minHeight: 400, bgcolor: '#f5f5f5' }}>
                <Typography variant="h6" align="center" fontWeight={700} sx={{ mb: 1 }}>{status} ({filteredTasks.filter(t => t.status === status).length})</Typography>
                {filteredTasks.filter(task => task.status === status).map(task => (
                  <Box key={task.id} className="kanban-task" sx={{ mt: 2, p: 2 }}>
                    <Typography fontWeight={600} sx={{ mb: 0.5 }}>{task.title}</Typography>
                    <Typography fontSize={14} color="#888" sx={{ mb: 0.5 }}>{task.description}</Typography>
                    {task.dueDate && <Typography fontSize={12} color="#6C63FF" sx={{ mb: 0.5 }}>Due: {task.dueDate}</Typography>}
                    {task.assignee && <Typography fontSize={13} sx={{ mb: 0.5 }}> <b>Assignee:</b> {members.find(m => m.email === task.assignee)?.name || task.assignee}</Typography>}
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 1 }}>
                      {task.tags.map(tag => (
                        <Button key={tag} size="small" variant="outlined" sx={{ fontSize: 11, borderRadius: 1, borderColor: '#eee', color: '#6C63FF', px: 1, py: 0, minWidth: 0 }}>{tag}</Button>
                      ))}
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      {defaultStatuses.filter(s => s !== status).map(s => (
                        <Button key={s} size="small" onClick={() => moveTask(task.id, s)} sx={{ fontSize: 11, borderRadius: 1, px: 1, py: 0, minWidth: 0 }}>{`Move to ${s}`}</Button>
                      ))}
                    </Box>
                  </Box>
                ))}
                <Button fullWidth variant="text" sx={{ mt: 2, color: '#888', fontWeight: 600, borderRadius: 2 }} onClick={handleOpen}>+ Add task</Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box>
          <Grid container spacing={2}>
            {filteredTasks.map(task => (
              <Grid item xs={12} md={6} key={task.id}>
                <Paper sx={{ p: 2, mb: 2 }}>
                  <Typography fontWeight={600}>{task.title}</Typography>
                  <Typography fontSize={14} color="#888">{task.description}</Typography>
                  <Typography fontSize={13}><b>Status:</b> {task.status}</Typography>
                  <Typography fontSize={13}><b>Assignee:</b> {members.find(m => m.email === task.assignee)?.name || task.assignee}</Typography>
                  <Typography fontSize={13}><b>Due:</b> {task.dueDate}</Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 1 }}>
                    {task.tags.map(tag => (
                      <Button key={tag} size="small" variant="outlined" sx={{ fontSize: 11, borderRadius: 1, borderColor: '#eee', color: '#6C63FF', px: 1, py: 0, minWidth: 0 }}>{tag}</Button>
                    ))}
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
            <Box sx={{ flex: 1, maxWidth: 500, mx: 'auto' }}>
              <Typography variant="h6" fontWeight={700} align="center" sx={{ mb: 2 }}>
                Workflow Automations
              </Typography>
              <Automations automations={automations} onAdd={handleAddAutomation} />
            </Box>
          </Box>
        </Box>
      )}
      <Box sx={{ mt: 4, display: 'flex', gap: 4, justifyContent: 'center' }}>
        <Box sx={{ flex: 1, maxWidth: 400, mx: 'auto' }}>
          <Typography variant="h6" fontWeight={700} align="center" sx={{ mb: 2 }}>
            Project Members
          </Typography>
          <InviteMembers members={members} onInvite={handleInvite} onNotify={handleNotify} />
        </Box>
      </Box>
      <Notifications notifications={notifications} onClose={handleNotificationClose} />
      <Modal open={open} onClose={handleClose}>
        <Box sx={{ p: 4, bgcolor: 'background.paper', borderRadius: 2, width: 400, mx: 'auto', mt: 10 }}>
          <Typography variant="h6" gutterBottom>Add Task</Typography>
          <TextField label="Title" name="title" fullWidth value={newTask.title} onChange={handleChange} sx={{ mb: 2 }} />
          <TextField label="Description" name="description" fullWidth multiline rows={2} value={newTask.description} onChange={handleChange} sx={{ mb: 2 }} />
          <TextField label="Due Date" name="dueDate" type="date" fullWidth InputLabelProps={{ shrink: true }} value={newTask.dueDate} onChange={handleChange} sx={{ mb: 2 }} />
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Status</InputLabel>
            <Select name="status" value={newTask.status} label="Status" onChange={handleChange}>
              {defaultStatuses.map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Assignee</InputLabel>
            <Select name="assignee" value={newTask.assignee} label="Assignee" onChange={handleChange}>
              {members.map(m => <MenuItem key={m.email} value={m.email}>{m.name || m.email}</MenuItem>)}
            </Select>
          </FormControl>
          <Button variant="contained" onClick={handleCreateTask} fullWidth>Add</Button>
        </Box>
      </Modal>
    </Container>
  );
}

export default ProjectDetail;
