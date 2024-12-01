const express = require('express');
const os = require('os');

const app = express();
const port = process.env.PORT || 80;

app.get('/health', (req, res) => {
  const health = {
    timestamp: new Date().toISOString(),
    memory: {
      total: os.totalmem(),
      free: os.freemem(),
      used: os.totalmem() - os.freemem(),
      usagePercentage: ((os.totalmem() - os.freemem()) / os.totalmem() * 100).toFixed(2)
    },
    cpu: {
      loadAverage: os.loadavg(),
      cores: os.cpus().length,
      model: os.cpus()[0].model,
      speed: os.cpus()[0].speed
    }
  };

  res.json(health);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
