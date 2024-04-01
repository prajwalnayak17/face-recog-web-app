// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(bodyParser.json());

// MongoDB setup
mongoose.connect('mongodb+srv://prajwalnayak2000:86aF7aPaZok5mVbq@cluster0.rnsjr2z.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));

// User schema and model
const userSchema = new mongoose.Schema({
  username: String,
  image: String,
});
const User = mongoose.model('User', userSchema);

// API endpoint for storing user images
app.post('/api/users', async (req, res) => {
  try {
    const { username, image } = req.body;
    const newUser = new User({ username, image });
    await newUser.save();
    res.status(201).json({ message: 'User image stored successfully' });
  } catch (error) {
    console.error('Error storing user image:', error);
    res.status(500).json({ error: 'Failed to store user image' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// const { GridFSBucket } = require('mongodb');
// const gfs = new GridFSBucket(conn.db, { bucketName: 'uploads' }); // Adjust bucketName as per your MongoDB setup

// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const fs = require('fs');
// // const { GridFSBucket } = require('mongodb'); // Updated import

// const app = express();
// const PORT = process.env.PORT || 5001;

// app.use(cors());
// app.use(bodyParser.json());

// // MongoDB setup
// mongoose.connect('mongodb+srv://prajwalnayak2000:86aF7aPaZok5mVbq@cluster0.rnsjr2z.mongodb.net/Cluster0', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
// const conn = mongoose.connection;

// conn.once('open', () => {
//   console.log('Connected to MongoDB');
// });

// // User schema and model
// const userSchema = new mongoose.Schema({
//   username: String,
//   image: String,
// });
// const User = mongoose.model('User', userSchema);

// // API endpoint for storing user images
// app.post('/api/users', async (req, res) => {
//   try {
//     const { username, image } = req.body;
//     const newUser = new User({ username, image });
//     await newUser.save();
//     res.status(201).json({ message: 'User image stored successfully' });
//   } catch (error) {
//     console.error('Error storing user image:', error);
//     res.status(500).json({ error: 'Failed to store user image' });
//   }
// });

// // API endpoint for fetching and saving image locally
// app.get('/api/fetch-image/:userId', async (req, res) => {
//   try {
//     const userId = req.params.userId;
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     const imageId = user.image;
//     const imageStream = gfs.openDownloadStreamByName(imageId);
//     const filePath = `./prajwalnayak2000_image.jpg`;

//     const writeStream = fs.createWriteStream(filePath);
//     imageStream.pipe(writeStream);

//     writeStream.on('finish', () => {
//       res.status(200).json({ message: 'Image fetched and saved locally' });
//     });

//     writeStream.on('error', (error) => {
//       console.error('Error saving image:', error);
//       res.status(500).json({ error: 'Failed to save image locally' });
//     });
//   } catch (error) {
//     console.error('Error fetching image:', error);
//     res.status(500).json({ error: 'Failed to fetch image' });
//   }
// });
