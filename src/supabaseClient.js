
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://fginxqrywvyrvcmooqci.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZnaW54cXJ5d3Z5cnZjbW9vcWNpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI3MjMzMDEsImV4cCI6MjA1ODI5OTMwMX0.W0ImcbpjG8cqXZRyqw5xD1czX-sDir9rxrfBjviO31A';
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
const addUser = async () => {
    const { data, error } = await supabase.from('users').insert([{ name: 'John Doe' }]);
  
    if (error) console.error(error);
    else console.log('User added:', data);
  };
  const signUp = async (email, password) => {
    const { user, error } = await supabase.auth.signUp({ email, password });
  
    if (error) console.error(error);
    else console.log('User signed up:', user);
  };
  const signIn = async (email, password) => {
    const { user, error } = await supabase.auth.signInWithPassword({ email, password });
  
    if (error) console.error(error);
    else console.log('User signed in:', user);
  };