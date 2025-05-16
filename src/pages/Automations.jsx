import { useState } from 'react';
import { Button, Box, Typography, Modal, TextField, MenuItem, Select, InputLabel, FormControl, List, ListItem, ListItemText } from '@mui/material';

const automationTypes = [
  { value: 'done_badge', label: "When a task is moved to 'Done' → assign badge" },
  { value: 'assign_inprogress', label: 'When a task is assigned to user X → move to In Progress' },
  { value: 'due_notification', label: 'When a due date passes → send notification' },
];

function Automations({ automations, onAdd }) {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState('done_badge');
  const [user, setUser] = useState('');

  const handleAdd = () => {
    if (type) {
      onAdd({ type, user });
      setType('done_badge');
      setUser('');
      setOpen(false);
    }
  };

  return (
    <Box sx={{ mb: 2 }}>
      {/* <Typography variant="h6">Workflow Automations</Typography> */}
      <List>
        {automations.map((a, i) => (
          <ListItem key={i}>
            <ListItemText primary={automationTypes.find(t => t.value === a.type)?.label + (a.user ? ` (User: ${a.user})` : '')} />
          </ListItem>
        ))}
      </List>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
        <Button variant="outlined" onClick={() => setOpen(true)}>Add Automation</Button>
      </Box>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={{ p: 4, bgcolor: 'background.paper', borderRadius: 2, width: 400, mx: 'auto', mt: 10 }}>
          <Typography variant="h6" gutterBottom>Add Automation</Typography>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Type</InputLabel>
            <Select value={type} label="Type" onChange={e => setType(e.target.value)}>
              {automationTypes.map(opt => <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>)}
            </Select>
          </FormControl>
          {type === 'assign_inprogress' && (
            <TextField label="User Email" fullWidth value={user} onChange={e => setUser(e.target.value)} sx={{ mb: 2 }} />
          )}
          <Button variant="contained" onClick={handleAdd} fullWidth>Add</Button>
        </Box>
      </Modal>
    </Box>
  );
}

export default Automations;
