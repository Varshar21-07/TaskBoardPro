import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Container, Typography, Box, Grid, Paper, Button, Modal, TextField, MenuItem, Select, InputLabel, FormControl, Avatar } from '@mui/material';
import InviteMembers from './InviteMembers';
import Automations from './Automations';
import Notifications from './Notifications';
import { getProjectById, getTasks, createTask, inviteProjectMember, addProjectMember, updateTask } from '../api/api';

const defaultStatuses = ['To Do', 'In Progress', 'Review', 'Done'];

function ProjectDetail() {
  const { id } = useParams();
  const location = useLocation();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [automations, setAutomations] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', description: '', status: defaultStatuses[0], assignee: '', dueDate: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const projectId = id;
  const tab = new URLSearchParams(location.search).get('tab') || 'kanban';

  useEffect(() => {
    async function fetchData() {
      try {
        let proj = await getProjectById(id);
        setProject(proj);
        const taskList = await getTasks(id);
        setTasks(taskList);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  const filteredTasks = tasks.filter(t => {
    // Support both string and object for project field
    const projectIdStr = project?._id?.toString() || project?.id?.toString();
    if (!t.project) return false;
    // If t.project is an object, check _id or id
    if (typeof t.project === 'object') {
      if (t.project._id && t.project._id.toString() === projectIdStr) return true;
      if (t.project.id && t.project.id.toString() === projectIdStr) return true;
    }
    // If t.project is a string (ObjectId)
    if (typeof t.project === 'string' && t.project === projectIdStr) return true;
    // If t.project is a number (shouldn't happen, but for safety)
    if (typeof t.project === 'number' && t.project.toString() === projectIdStr) return true;
    return false;
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const handleCreateTask = async () => {
    if (!newTask.title) return;
    try {
      // Only include assignee if it's not empty
      const taskData = { ...newTask, project: project._id };
      if (!taskData.assignee) delete taskData.assignee;
      // Fix status to match backend enum (lowercase, no spaces)
      if (taskData.status) taskData.status = taskData.status.toLowerCase().replace(/\s/g, '');
      const created = await createTask(taskData);
      // Refetch tasks from backend to ensure UI is in sync
      const updatedTasks = await getTasks(project._id);
      setTasks(updatedTasks);
      setNewTask({ title: '', description: '', status: defaultStatuses[0], assignee: '', dueDate: '' });
      handleClose();
    } catch (err) {
      setError(err.message);
    }
  };

  const moveTask = async (taskId, newStatus) => {
    try {
      // Find the task and update its status in the backend
      const taskToMove = tasks.find(task => task._id === taskId);
      if (!taskToMove) return;
      // Use updateTask instead of createTask to avoid duplicate key error
      await updateTask(taskId, { ...taskToMove, status: newStatus.toLowerCase().replace(/\s/g, '') });
      // Refetch tasks from backend to ensure UI is in sync
      const updatedTasks = await getTasks(project._id);
      setTasks(updatedTasks);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleInvite = async (email) => {
    if (!project || !project._id) return;
    try {
      // Store member in backend
      const updatedProject = await addProjectMember({ projectId: project._id, email });
      setProject(updatedProject);
      // Optionally, send invite email (already handled elsewhere)
      handleNotify(`Member ${email} added and invite sent.`);
    } catch (err) {
      handleNotify(`Failed to add member: ${err.message}`);
    }
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

  if (loading) return <Typography>Loading project details...</Typography>;
  if (error) return <Typography color="error">Error: {error}</Typography>;
  if (!project) return <Typography>No project found.</Typography>;

  return (
    <Container maxWidth={false} sx={{ mt: 2, width: '100vw', minHeight: '100vh', px: 0 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5" fontWeight={700} sx={{ flex: 1 }}>{tab === 'tasks' ? 'Project Tasks' : 'Project Kanban Board'}</Typography>
        <Button variant="contained" sx={{ bgcolor: '#6C63FF', borderRadius: 2, fontWeight: 600 }} onClick={handleOpen}>+ Add Task</Button>
      </Box>
      <Box sx={{ mb: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant={tab === 'kanban' ? 'contained' : 'outlined'} onClick={() => window.location.search = ''}>Status</Button>
          <Button variant={tab === 'tasks' ? 'contained' : 'outlined'} onClick={() => window.location.search = '?tab=tasks'}>Tasks</Button>
        </Box>
      </Box>
      {/* Project Card */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
        <Paper elevation={3} sx={{ width: 500, p: 3, borderRadius: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: '0 2px 16px rgba(0,0,0,0.08)' }}>
          <Typography variant="h4" fontWeight={700} sx={{ mb: 1 }}>{project.name}</Typography>
          <Typography color="#888" fontSize={16} sx={{ mb: 2, textAlign: 'center' }}>{project.description}</Typography>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 1 }}>
            <Typography fontSize={14} color="#888">Owner:</Typography>
            <Typography fontWeight={600}>{
              typeof project.owner === 'object' && project.owner !== null
                ? (project.owner.name || project.owner.email || JSON.stringify(project.owner))
                : (typeof project.owner === 'string' ? project.owner : 'N/A')
            }</Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 1 }}>
            <Typography fontSize={14} color="#888">Members:</Typography>
            {project.members && project.members.length > 0 ? project.members.map((m, i) => (
              <Avatar key={m._id || m.email || i} sx={{ width: 28, height: 28, fontSize: 15 }}>{m.name ? m.name[0] : (m.email ? m.email[0] : '?')}</Avatar>
            )) : <Typography fontSize={14} color="#aaa">No members</Typography>}
          </Box>
        </Paper>
      </Box>
      {tab === 'kanban' ? (
        <Grid container spacing={2} sx={{ justifyContent: 'center', alignItems: 'stretch', width: '100%', mx: 0 }}>
          {defaultStatuses.map(status => (
            <Grid item xs={12} sm={6} md={3} key={status} sx={{ display: 'flex' }}>
              <Paper sx={{ flex: 1, p: 2, minHeight: 350, maxWidth: 320, bgcolor: '#f5f5f5', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="h6" align="center" fontWeight={700} sx={{ mb: 1 }}>{status} ({filteredTasks.filter(t => t.status === status).length})</Typography>
                {filteredTasks.filter(task => task.status === status.toLowerCase().replace(/\s/g, '')).map(task => (
                  <Box key={task._id} className="kanban-task" sx={{ mt: 2, p: 2 }}>
                    <Typography fontWeight={600} sx={{ mb: 0.5 }}>{task.title}</Typography>
                    <Typography fontSize={14} color="#888" sx={{ mb: 0.5 }}>{task.description}</Typography>
                    {task.dueDate && <Typography fontSize={12} color="#6C63FF" sx={{ mb: 0.5 }}>Due: {new Date(task.dueDate).toLocaleDateString()}</Typography>}
                    {task.assignee && <Typography fontSize={13} sx={{ mb: 0.5 }}> <b>Assignee:</b> {task.assignee.name || task.assignee.email || task.assignee}</Typography>}
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 1 }}>
                      {task.tags && task.tags.map(tag => (
                        <Button key={tag} size="small" variant="outlined" sx={{ fontSize: 11, borderRadius: 1, borderColor: '#eee', color: '#6C63FF', px: 1, py: 0, minWidth: 0 }}>{tag}</Button>
                      ))}
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      {defaultStatuses.filter(s => s !== status).map(s => (
                        <Button key={s} size="small" onClick={() => moveTask(task._id, s)} sx={{ fontSize: 11, borderRadius: 1, px: 1, py: 0, minWidth: 0 }}>{`Move to ${s}`}</Button>
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
              <Grid item xs={12} md={6} key={task._id || task.id}>
                <Paper sx={{ p: 2, mb: 2 }}>
                  <Typography fontWeight={600}>{task.title}</Typography>
                  <Typography fontSize={14} color="#888">{task.description}</Typography>
                  <Typography fontSize={13}><b>Status:</b> {task.status}</Typography>
                  <Typography fontSize={13}><b>Assignee:</b> {typeof task.assignee === 'object' && task.assignee !== null ? (task.assignee.name || task.assignee.email) : (task.assignee || 'Unassigned')}</Typography>
                  <Typography fontSize={13}><b>Due:</b> {task.dueDate}</Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 1 }}>
                    {task.tags && Array.isArray(task.tags) && task.tags.map(tag => (
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
        <Box sx={{ flex: 1, maxWidth: 400, mx: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="h6" fontWeight={700} align="center" sx={{ mb: 2 }}>
            Project Members
          </Typography>
          <InviteMembers members={project.members} onInvite={handleInvite} onNotify={handleNotify} />
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
              {project.members.map(m => <MenuItem key={m.email} value={m.email}>{m.name || m.email}</MenuItem>)}
            </Select>
          </FormControl>
          <Button variant="contained" onClick={handleCreateTask} fullWidth>Add</Button>
        </Box>
      </Modal>
    </Container>
  );
}

export default ProjectDetail;
