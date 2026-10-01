/**
 * Next.js Instrumentation Hook
 * Runs once when the server starts. Schedules Instagram sync every 5 minutes.
 * Docs: https://nextjs.org/docs/app/building-your-application/optimizing/instrumentation
 */
export async function register() {
  // Only run on the Node.js runtime (not edge)
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const cron = (await import('node-cron')).default;
    const { syncInstagramPosts } = await import('./lib/instagramService.js');

    cron.schedule('*/5 * * * *', async () => {
      try {
        const result = await syncInstagramPosts();
        console.log('[Cron] Instagram sync:', result);
      } catch (err) {
        console.error('[Cron] Instagram sync failed:', err.message);
      }
    });

    console.log('[Cron] Instagram sync scheduled every 5 minutes');
  }
}
