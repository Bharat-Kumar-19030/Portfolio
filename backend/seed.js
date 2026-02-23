const mongoose = require('mongoose');
const Project = require('./models/Project');
require('dotenv').config();

const seedProjects = [
  {
    title: 'BigBite - Real-Time Food Delivery Platform',
    description: 'Built a real-time food delivery application supporting customers, restaurants, and delivery partners. Implemented live order status updates and GPS-based tracking for real-time delivery monitoring. Integrated secure online payments and role-based authentication for controlled user access.',
    techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Socket.IO', 'JWT', 'Razorpay', 'OpenStreetMap'],
    features: [
      'Real-time food delivery with live tracking',
      'GPS-based delivery monitoring',
      'Secure online payments with Razorpay',
      'Role-based authentication',
      'Cloud deployment for scalability'
    ],
    githubLink: 'https://github.com/bharatkumar19030/bigbite',
    liveLink: '#',
    date: 'Dec 2025',
    featured: true,
    image: '',
  },
  {
    title: 'E-Commerce Platform',
    description: 'Developed a full-stack e-commerce platform with product listings, cart, checkout, and seller management. Implemented user authentication, product catalog, order processing, and seller inventory features. Designed a responsive and mobile-friendly interface for seamless product browsing and navigation.',
    techStack: ['CSS', 'JavaScript', 'Tailwind', 'PHP', 'Gemini API'],
    features: [
      'Full-stack e-commerce with product catalog',
      'Cart, checkout, and order processing',
      'Seller management and inventory',
      'Responsive mobile-friendly design',
      'Cloud deployment'
    ],
    githubLink: 'https://github.com/bharatkumar19030/ecommerce',
    liveLink: '#',
    date: 'May 2025',
    featured: true,
    image: '',
  },
  {
    title: 'NASA Image Gallery',
    description: 'Integrated NASA\'s Astronomy Picture of the Day (APOD) API to dynamically display daily space images. Developed backend functionality to handle API requests and render dynamic content. Designed a responsive image gallery interface for intuitive navigation and consistent user experience.',
    techStack: ['HTML', 'CSS', 'JavaScript', 'NASA API'],
    features: [
      'NASA APOD API integration',
      'Dynamic daily space images',
      'Responsive image gallery',
      'Intuitive navigation',
      'Backend API handling'
    ],
    githubLink: 'https://github.com/bharatkumar19030/nasa-gallery',
    liveLink: '#',
    date: 'Jan 2024',
    featured: true,
    image: '',
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    await Project.deleteMany({});
    console.log('Cleared existing projects');

    await Project.insertMany(seedProjects);
    console.log('Seeded projects successfully!');

    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
}

seed();
