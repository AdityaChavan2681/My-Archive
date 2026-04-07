require("dotenv").config();
const mongoose = require("mongoose");
const ArchiveItem = require("./models/ArchiveItem");

const seedData = [
  {
    title: "Ancient Ship Record",
    slug: "ancient-ship-record",
    summary: "A historical ship archive entry",
    content: "Detailed content about an old ship record.",
    category: "ships",
    tags: ["history", "ships"],
    images: [{ url: "/images/sample1.jpg" }],
    references: [
      {
        title: "Ship Reference 1",
        link: "https://example.com/ship-reference",
        note: "Example source"
      }
    ],
    status: "published"
  },
  {
    title: "Historic Building Record",
    slug: "historic-building-record",
    summary: "A historical building archive entry",
    content: "Detailed content about a historic building.",
    category: "buildings",
    tags: ["history", "buildings"],
    images: [{ url: "/images/sample2.jpg" }],
    references: [
      {
        title: "Building Reference 1",
        link: "https://example.com/building-reference",
        note: "Example source"
      }
    ],
    status: "published"
  },
  {
    title: "Old Naval Vessel",
    slug: "old-naval-vessel",
    summary: "Another archive record",
    content: "Detailed content about an old naval vessel.",
    category: "ships",
    tags: ["naval", "ships"],
    images: [{ url: "/images/sample3.jpg" }],
    status: "published"
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected for seeding");

    await ArchiveItem.deleteMany({});
    console.log("Old archive items removed");

    await ArchiveItem.insertMany(seedData);
    console.log("Seed data inserted successfully");

    process.exit();
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  }
}

seedDatabase();