
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies and enable CORS
app.use(cors());
app.use(express.json());

// A pool of placeholder video URLs to make it look real
const placeholderVideos = [
    "https://videos.pexels.com/video-files/854341/854341-hd_1920_1080_25fps.mp4",
    "https://videos.pexels.com/video-files/3209828/3209828-hd_1920_1080_25fps.mp4",
    "https://videos.pexels.com/video-files/4434246/4434246-hd_1920_1080_25fps.mp4",
    "https://videos.pexels.com/video-files/4791395/4791395-hd_1920_1080_30fps.mp4"
];

// API endpoint for video generation
app.post('/generate-video', (req, res) => {
    const { mainPrompt, stylePrompt, negativePrompt } = req.body;

    console.log('Received generation request with prompts:');
    console.log(`  Main: ${mainPrompt}`);
    console.log(`  Style: ${stylePrompt}`);
    console.log(`  Negative: ${negativePrompt}`);

    // Simulate the AI generation delay (e.g., 3-5 seconds)
    const delay = Math.random() * 2000 + 3000; 

    setTimeout(() => {
        // Select a random video from the placeholder pool
        const randomVideoUrl = placeholderVideos[Math.floor(Math.random() * placeholderVideos.length)];
        
        console.log(`Generation complete. Sending video URL: ${randomVideoUrl}`);
        
        // Send back the URL of the generated video
        res.json({ videoUrl: randomVideoUrl });
    }, delay);
});

// Serve the frontend files (index.html, style.css, script.js)
// Make sure these files are in a 'public' folder or in the same directory.
app.use(express.static('public')); 

app.listen(port, () => {
    console.log(`AI Video Generation server running at http://localhost:${port}`);
});
