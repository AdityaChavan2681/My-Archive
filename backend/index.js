const port = 3000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

app.use(express.json());
app.use(cors());



// Mock data
const mockItems = [
  {
    id: 1,
    title: "Ancient Ship Record",
    image: "/images/sample1.jpg",
    category: "ships",
    description: "A historical ship archive entry"
  },
  {
    id: 2,
    title: "Historic Building Record",
    image: "/images/sample2.jpg",
    category: "buildings",
    description: "A historical building archive entry"
  },
  {
    id: 3,
    title: "Old Naval Vessel",
    image: "/images/sample3.jpg",
    category: "ships",
    description: "Another archive record"
  }
];

// Database Connection with mongoDB
if (process.env.MONGO_URI) {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection failed:", err.message));
}

// API Creation

app.get("/", (req, res) => {
  res.send("My Archive backend is running");
});

// Image Storage Engine

const storage = multer.diskStorage({
  destination: './upload/images',
  filename: (req, file, cb) => {
    return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
  }
})

const upload = multer({ storage: storage })

// Creating Upload Endpoint for images

app.use('/images', express.static('upload/images'))

app.post("/upload", upload.single('image'), (req, res) => {
  res.json({
    success: 1,
    image_url: `http://localhost:${port}/images/${req.file.filename}`
  })
})

// schema for creating ArchiveItems 

const ArchiveItem = mongoose.model("ArchiveItem", {
  id: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  available: {
    type: Boolean,
    default: true,
  }
});

app.post('/addArchiveItem', async (req, res) => {
  let archiveItems = await ArchiveItem.find({});
  let id;

  if (archiveItems.length > 0) {
    let lastArchiveItemArray = archiveItems.slice(-1);
    let lastArchiveItem = lastArchiveItemArray[0];
    id = lastArchiveItem.id + 1;
  } else {
    id = 1;
  }

  const archiveItem = new ArchiveItem({
    id: id,
    title: req.body.title,
    image: req.body.image,
    category: req.body.category,
    description: req.body.description,
  });

  console.log(archiveItem);
  await archiveItem.save();
  console.log("Saved");

  res.json({
    success: true,
    title: req.body.title,
  });
});

// Creating API For deleting ArchiveItems
app.post('/removeArchiveItem', async (req, res) => {
  await ArchiveItem.findOneAndDelete({ id: req.body.id });
  console.log("Removed");
  res.json({
    success: true,
    title: req.body.title
  })
})

//Creating API for getting all ArchiveItems
app.get('/allitems', (req, res) => {
  const { category, search, page = 1, limit = 2 } = req.query;

  let results = [...mockItems];

  if (category) {
    results = results.filter(item => item.category === category);
  }

  if (search) {
    const searchTerm = search.toLowerCase();
    results = results.filter(item =>
      item.title.toLowerCase().includes(searchTerm) ||
      item.description.toLowerCase().includes(searchTerm)
    );
  }

  const pageNum = Number(page);
  const limitNum = Number(limit);

  const startIndex = (pageNum - 1) * limitNum;
  const endIndex = startIndex + limitNum;

  const paginatedResults = results.slice(startIndex, endIndex);

  console.log({
    category,
    search,
    page: pageNum,
    limit: limitNum,
    totalResults: results.length,
    returned: paginatedResults.length
  });

  res.json(paginatedResults);
});

// Schema creation for Users model

const Users = mongoose.model('Users', {
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  cartData: {
    type: Object,
  },
  date: {
    type: Date,
    default: Date.now,
  }
})

// Creating Endpoint for registering the User.

app.post('/signup', async (req, res) => {

  let check = await Users.findOne({ email: req.body.email });
  if (check) {
    return res.status(400).json({ success: false, errors: "existing user found with same email address" })
  }
  let cart = {};
  for (let i = 0; i < 300; i++) {
    cart[i] = 0;
  }
  const user = new Users({
    name: req.body.username,
    email: req.body.email,
    password: req.body.password,
    cartData: cart,
  })

  await user.save();

  const data = {
    user: {
      id: user.id
    }
  }

  const token = jwt.sign(data, 'secret_ecom');
  res.json({ success: true, token })

})

// Creating Endpoint for user login
app.post('/login', async (req, res) => {
  let user = await Users.findOne({ email: req.body.email })
  if (user) {
    const passCompare = req.body.password === user.password;
    if (passCompare) {
      const data = {
        user: {
          id: user.id
        }
      }
      const token = jwt.sign(data, 'secret_ecom');
      res.json({ success: true, token });
    }
    else {
      res.json({ success: false, errors: "Wrong Password" });
    }
  }
  else {
    res.json({ success: false, errors: "Wrong Email Id" })
  }
})

// creating endpoint for new collections data
app.get('/newcollections', (req, res) => {
  const newcollection = mockItems.slice(-3);

  console.log("New Collection Fetched (mock)");

  res.json(newcollection);
});

// creating endpoint for popular in ships section

app.get('/popularinships', (req, res) => {
  const ships = mockItems.filter(item => item.category === "ships");

  const popularInShips = ships.slice(0, 4);

  console.log("Popular in ships fetched (mock)");

  res.json(popularInShips);
});

// creating middleware to fetch user
const fetchUser = async (req, res, next) => {
  const token = req.header('auth-token');
  if (!token) {
    res.status(401).send({ errors: "Please authenticate using valid token" })
  }
  else {
    try {
      const data = jwt.verify(token, 'secret_ecom');
      req.user = data.user;
      next();
    } catch (error) {
      res.status(401).send({ errors: "Please authenticate using a valid token" })
    }
  }
}

// creating endpoint for adding ArchiveItems in cart data
app.post('/addtocart', fetchUser, async (req, res) => {
  console.log("added", req.body.itemId);
  // console.log(req.body,req.user);
  let userData = await Users.findOne({ _id: req.user.id });
  userData.cartData[req.body.itemId] += 1;
  await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
  res.send("Added")
})

// creating endpoint to remove ArchiveItem from cart data
app.post('/removefromcart', fetchUser, async (req, res) => {
  console.log("removed", req.body.itemId);
  let userData = await Users.findOne({ _id: req.user.id });
  if (userData.cartData[req.body.itemId] > 0)
    userData.cartData[req.body.itemId] -= 1;
  await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
  res.send("Removed")
})

// creating endpoint to get cart data
app.post('/getcart', fetchUser, async (req, res) => {
  console.log("GetCart");
  let userData = await Users.findOne({ _id: req.user.id });
  res.json(userData.cartData);
})

app.listen(port, (error) => {
  if (!error) {

    console.log("Server running on Port " + port);
  }
  else {
    console.log("Error: " + error)
  }
});

