import { supabase } from '../lib/supabaseClient';

export const handleLogout = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    window.location.href = '/'; // Redirect to login page
  } catch (error) {
    console.error('Error logging out:', error.message);
    alert('Error logging out');
  }
};
