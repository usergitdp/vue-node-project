const express = require('express');
const app = express();
const port = 443;

const path = require('path');
const fs = require('fs');

// 允许跨域请求
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// 静态图片目录
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// 获取图片列表API
app.get('/api/images', (req, res) => {
  const imagesDir = path.join(__dirname, 'public/images');
  fs.readdir(imagesDir, (err, files) => {
    if (err) {
      return res.status(500).json({ error: 'Unable to read images directory' });
    }
    const imageFiles = files.filter(file => {
      return ['.jpg', '.jpeg', '.png', '.gif'].includes(path.extname(file).toLowerCase());
    });
    res.json({ images: imageFiles });
  });
});

// 示例API路由
app.get('/api', (req, res) => {
  res.json({ message: 'Hello from Node.js backend!' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

exports.app = app;