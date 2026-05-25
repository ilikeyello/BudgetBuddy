// supabase.js — Future Supabase database integration skeleton
// The Supabase UMD browser SDK makes the library available globally via `window.supabase`.

const FUTURE_SUPABASE_URL = 'https://your-project-id.supabase.co';
const FUTURE_SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';

let supabaseClient = null;

/**
 * Initializes and retrieves the singleton Supabase client.
 */
const getSupabaseClient = () => {
  if (!supabaseClient && window.supabase) {
    try {
      supabaseClient = window.supabase.createClient(FUTURE_SUPABASE_URL, FUTURE_SUPABASE_ANON_KEY);
      console.log('Supabase client initialized successfully!');
    } catch (err) {
      console.error('Failed to initialize Supabase client:', err);
    }
  }
  return supabaseClient;
};

// Bind to window to allow easy cross-file loading inside on-the-fly Babel components
window.BudgetBuddySupabase = {
  getSupabaseClient,

  /**
   * Example query helper to fetch user profile details
   */
  fetchProfile: async (userId) => {
    const client = getSupabaseClient();
    if (!client) {
      console.warn('Supabase client is not initialized yet. Returning mock profile.');
      return null;
    }
    const { data, error } = await client
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
      
    if (error) {
      console.error('Error querying profile:', error.message);
      return null;
    }
    return data;
  },

  /**
   * Example mutation helper to log a manual transaction
   */
  logTransaction: async (txData) => {
    const client = getSupabaseClient();
    if (!client) {
      console.warn('Supabase client is not initialized yet. Simulating successful write.');
      return txData;
    }
    const { data, error } = await client
      .from('transactions')
      .insert([
        {
          user_id: txData.userId || 'mock',
          amount: txData.amount,
          description: txData.description,
          category_id: txData.categoryId,
          source: 'manual',
          date: new Date().toISOString(),
        }
      ])
      .select();

    if (error) {
      console.error('Error inserting transaction:', error.message);
      return null;
    }
    return data[0];
  }
};
