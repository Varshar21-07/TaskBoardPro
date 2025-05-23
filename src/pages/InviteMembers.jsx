import { useState } from 'react';
import { Button, Box, Typography, TextField, Modal, List, ListItem, ListItemText } from '@mui/material';
import { inviteProjectMember } from '../api/api';

function InviteMembers({ members, onInvite, onNotify, projectId, inviterName }) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');

  const handleInvite = async () => {
    if (email) {
      if (onInvite) {
        await onInvite(email);
      } else if (projectId) {
        try {
          await inviteProjectMember({ email, projectId, inviterName });
          if (onNotify) onNotify(`Invitation sent to ${email}`);
        } catch (err) {
          if (onNotify) onNotify(`Failed to send invite: ${err.message}`);
        }
      }
      setEmail('');
      setOpen(false);
    }
  };

  return (
    <Box sx={{ mb: 2 }}>
      {/* <Typography variant="h6">Project Members</Typography> */}
      <List>
        {members.map((m) => (
          <ListItem key={m.email}>
            <ListItemText primary={m.name || m.email} />
          </ListItem>
        ))}
      </List>
      <Button variant="outlined" onClick={() => setOpen(true)} sx={{ mt: 1 }}>Invite Member</Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={{ p: 4, bgcolor: 'background.paper', borderRadius: 2, width: 350, mx: 'auto', mt: 10 }}>
          <Typography variant="h6" gutterBottom>Invite by Email</Typography>
          <TextField label="Email" fullWidth value={email} onChange={e => setEmail(e.target.value)} sx={{ mb: 2 }} />
          <Button variant="contained" onClick={handleInvite} fullWidth>Invite</Button>
        </Box>
      </Modal>
    </Box>
  );
}

export default InviteMembers;
