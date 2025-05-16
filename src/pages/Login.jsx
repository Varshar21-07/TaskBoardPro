import { useState } from 'react';
import { Button, Box, Typography, TextField, Divider, Link as MuiLink } from '@mui/material';
import { Google } from '@mui/icons-material';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../api/firebase';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Login() {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser({
        name: result.user.displayName,
        email: result.user.email,
        photo: result.user.photoURL,
      });
      navigate('/dashboard');
    } catch (error) {
      setError('Google login failed!');
    }
  };

  const handleEmailSignup = (e) => {
    e.preventDefault();
    if (email) {
      setUser({ name: email.split('@')[0], email });
      navigate('/dashboard');
    } else {
      setError('Please enter a valid email.');
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', width: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#f7f9fb' }}>
      <Box sx={{
        width: 380,
        bgcolor: '#fff',
        borderRadius: 3,
        boxShadow: '0 2px 24px rgba(0,0,0,0.07)',
        p: 4,
        border: '1px solid #eee',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center', // Center content horizontally
        justifyContent: 'center', // Center content vertically
      }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <img src="https://img.freepik.com/premium-vector/luxury-sv-monogram-logo-design_693012-676.jpg?w=740" alt="Logo" style={{ width: 64, height: 64, borderRadius: 2 }} />
        </Box>
        <Typography variant="h4" fontWeight={700} align="center" sx={{ mb: 1 }}>Create an account</Typography>
        <Typography align="center" sx={{ color: '#888', mb: 2 }}>
          Already have an account?{' '}
          <MuiLink href="#" underline="hover" sx={{ color: '#888', fontWeight: 500 }}>Log in</MuiLink>
        </Typography>
        <Button
          variant="outlined"
          startIcon={<Google />}
          onClick={handleGoogleLogin}
          sx={{ mb: 3, mt: 1, borderRadius: 2, fontWeight: 600, textTransform: 'none', bgcolor: '#fafbff' }}
          fullWidth
        >
          Sign up with Google
        </Button>
        <Divider sx={{ my: 3 }}>Or continue with</Divider>
        <form onSubmit={handleEmailSignup} style={{ width: '100%' }}>
          <Typography fontWeight={500} sx={{ mb: 1 }}>Email</Typography>
          <TextField
            placeholder="johndoe@example.com"
            type="email"
            fullWidth
            value={email}
            onChange={e => setEmail(e.target.value)}
            sx={{ mb: 3, bgcolor: '#f7f7fa', borderRadius: 2 }}
          />
          <Button variant="contained" type="submit" fullWidth sx={{ borderRadius: 2, fontWeight: 600, bgcolor: '#6C63FF', fontSize: '1.1rem', py: 1.2 }}>
            Sign Up with Email
          </Button>
        </form>
        {error && <Typography sx={{ color: 'red', mt: 2, textAlign: 'center' }}>{error}</Typography>}
      </Box>
    </Box>
  );
}

export default Login;
