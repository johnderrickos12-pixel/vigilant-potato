
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Enable parsing of JSON request bodies

/**
 * API endpoint to handle video generation requests.
 * The frontend will send the user's prompts and settings here.
 */
app.post('/api/generate', (req, res) => {
  const { prompt, negativePrompt, model, style } = req.body;

  console.log('Received generation request:');
  console.log({ prompt, negativePrompt, model, style });

  if (!prompt) {
    return res.status(400).json({ success: false, message: 'Prompt is a required field.' });
  }

  // --- Placeholder for a real AI generation model ---
  // In a real application, you would add the job to a queue (like RabbitMQ or Bull)
  // and have a separate worker process pick it up. This is because AI generation
  // can take a long time and would block the server.
  const jobId = `job_${Date.now()}`;
  console.log(`Job created with ID: ${jobId}. This would now be processed by an AI worker.`);
  // --- End of placeholder ---

  // Respond immediately to the client, telling them the job has started.
  res.status(202).json({
    success: true,
    message: 'Video generation process has started.',
    jobId: jobId,
  });
});

/**
 * API endpoint for the frontend to check the status of a generation job.
 */
app.get('/api/status/:jobId', (req, res) => {
    const { jobId } = req.params;

    // --- Placeholder for checking job status ---
    // In a real app, you'd query your job queue or database for the job's status.
    // For this example, we'll just simulate a "completed" status after a short delay.
    console.log(`Checking status for job ID: ${jobId}`);

    // Simulate different statuses for demonstration
    const randomStatus = Math.random();
    if (randomStatus < 0.3) {
        res.json({
            status: 'processing',
            progress: '33%',
            message: 'Model is warming up...',
        });
    } else if (randomStatus < 0.7) {
        res.json({
            status: 'processing',
            progress: '66%',
            message: 'Rendering frames...',
        });
    } else {
        res.json({
            status: 'completed',
            progress: '100%',
            videoUrl: `/videos/placeholder_video_${jobId}.mp4`, // A placeholder URL
        });
    }
    // --- End of placeholder ---
});


app.listen(port, () => {
  console.log(`AI Video Generator backend listening at http://localhost:${port}`);
});
