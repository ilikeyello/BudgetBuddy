// plaid.js — Future Plaid Link banking integration skeleton
// The Plaid Link browser bundle loads globally via `window.Plaid`.

window.BudgetBuddyPlaid = {
  /**
   * Launches the secure Plaid Link browser modal.
   * 
   * @param {string} linkToken - Obtained from your backend server (e.g. Supabase Plaid Edge Function)
   * @param {Function} onSuccess - Callback invoked when the user logs in and links their account
   * @param {Function} onExit - Callback invoked if the user cancels or encounters a Link error
   */
  openLink: (linkToken, onSuccess, onExit) => {
    if (!window.Plaid) {
      console.error('Plaid Link SDK is not loaded in the browser. Please check internet connection.');
      return;
    }

    if (!linkToken) {
      console.warn('No Link Token provided. Simulated handshake mode starting...');
    }

    try {
      const handler = window.Plaid.create({
        token: linkToken || 'YOUR_TEMPORARY_DEV_LINK_TOKEN',
        onSuccess: (publicToken, metadata) => {
          console.log('Plaid Link Handshake Succeeded! Public Token:', publicToken);
          console.log('Linked Bank Meta:', metadata.institution.name, metadata.accounts);
          
          // NEXT STEP IN PRODUCTION:
          // POST the `publicToken` back to your backend (e.g. /functions/plaid-exchange)
          // to exchange it securely for a permanent access_token.
          if (onSuccess) {
            onSuccess(publicToken, metadata);
          }
        },
        onExit: (err, metadata) => {
          if (err != null) {
            console.error('Plaid Link encountered an error during flow:', err.message);
          } else {
            console.log('User exited Plaid Link gracefully.');
          }
          if (onExit) {
            onExit(err, metadata);
          }
        },
        onEvent: (eventName, metadata) => {
          // Captures telemetry and user interaction milestones inside the link widget
          console.log('Plaid Link Event Logging:', eventName, metadata);
        }
      });

      // Opens the secure bank selector overlay
      handler.open();
    } catch (err) {
      console.error('Failed to initiate Plaid handler:', err);
    }
  }
};
