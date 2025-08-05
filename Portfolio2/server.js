const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const { body, validationResult } = require('express-validator');
const nodemailer = require('nodemailer');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));

// CORS configuration
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://yourdomain.com'] 
    : ['http://localhost:3000', 'http://localhost:5000'],
  credentials: true
}));

// Compression middleware
app.use(compression());

// Logging middleware
app.use(morgan('combined'));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api/', limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve static files
app.use(express.static(path.join(__dirname, './')));

// Email transporter configuration
const createTransporter = () => {
  return nodemailer.createTransporter({
    service: process.env.EMAIL_SERVICE || 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

// Validation middleware
const validateContactForm = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('Name can only contain letters and spaces'),
  
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  
  body('subject')
    .trim()
    .isLength({ min: 5, max: 100 })
    .withMessage('Subject must be between 5 and 100 characters'),
  
  body('message')
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage('Message must be between 10 and 1000 characters'),
];

// Routes
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

app.post('/api/contact', validateContactForm, async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { name, email, subject, message } = req.body;

    // Create email transporter
    const transporter = createTransporter();

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Send to yourself
      replyTo: email,
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #6366f1;">New Contact Message</h2>
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>From:</strong> ${name} (${email})</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong></p>
            <div style="background: white; padding: 15px; border-radius: 4px; margin-top: 10px;">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>
          <p style="color: #666; font-size: 12px;">
            This message was sent from your portfolio website contact form.
          </p>
        </div>
      `,
      text: `
        New Contact Message
        
        From: ${name} (${email})
        Subject: ${subject}
        
        Message:
        ${message}
        
        ---
        Sent from portfolio website contact form
      `
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Send auto-reply to sender
    const autoReplyOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Thank you for your message - Ankith Pratheesh',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #6366f1;">Thank you for reaching out!</h2>
          <p>Hi ${name},</p>
          <p>Thank you for your message. I've received your inquiry and will get back to you as soon as possible.</p>
          <p>In the meantime, feel free to check out my <a href="https://yourdomain.com">portfolio</a> or connect with me on <a href="https://linkedin.com/in/your-linkedin-username">LinkedIn</a>.</p>
          <p>Best regards,<br>Ankith Pratheesh</p>
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
          <p style="color: #666; font-size: 12px;">
            This is an automated response. Please don't reply to this email.
          </p>
        </div>
      `,
      text: `
        Thank you for reaching out!
        
        Hi ${name},
        
        Thank you for your message. I've received your inquiry and will get back to you as soon as possible.
        
        In the meantime, feel free to check out my portfolio or connect with me on LinkedIn.
        
        Best regards,
        Ankith Pratheesh
        
        ---
        This is an automated response. Please don't reply to this email.
      `
    };

    await transporter.sendMail(autoReplyOptions);

    res.json({
      success: true,
      message: 'Message sent successfully! I\'ll get back to you soon.'
    });

  } catch (error) {
    console.error('Email sending error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send message. Please try again later or email me directly.'
    });
  }
});

// API routes for portfolio data
app.get('/api/projects', (req, res) => {
  const projects = [
    {
      id: 1,
      title: 'Smart Agent System',
      description: 'Designed and implemented a sophisticated multi-agent orchestration framework using LangGraph and OpenAI.',
      technologies: ['Python', 'LangGraph', 'OpenAI', 'FastAPI'],
      image: '/project1.jpg',
      github: 'https://github.com/your-username/smart-agent-system',
      live: 'https://smart-agent-demo.com'
    },
    {
      id: 2,
      title: 'Portfolio Builder',
      description: 'Dynamic portfolio generator with customizable templates and real-time GitHub integration.',
      technologies: ['React', 'Node.js', 'GitHub API', 'AI Integration'],
      image: '/project2.jpg',
      github: 'https://github.com/your-username/portfolio-builder',
      live: 'https://portfolio-builder-demo.com'
    },
    {
      id: 3,
      title: 'TaskFlow AI',
      description: 'Multi-step task delegation engine with plugin-based LLM agents.',
      technologies: ['TypeScript', 'LangChain', 'Plugin System', 'Microservices'],
      image: '/project3.jpg',
      github: 'https://github.com/your-username/taskflow-ai',
      live: 'https://taskflow-ai-demo.com'
    }
  ];

  res.json(projects);
});

app.get('/api/skills', (req, res) => {
  const skills = {
    languages: ['TypeScript', 'JavaScript', 'Python', 'Go', 'Rust', 'SQL'],
    frontend: ['React', 'Next.js', 'Vue.js', 'Tailwind CSS', 'Redux'],
    backend: ['Node.js', 'Express.js', 'FastAPI', 'Flask', 'GraphQL'],
    ai: ['LangChain', 'OpenAI API', 'TensorFlow', 'PyTorch', 'NLP'],
    databases: ['PostgreSQL', 'MongoDB', 'Redis', 'AWS', 'Docker'],
    tools: ['Git', 'GitHub Actions', 'CI/CD', 'VSCode', 'Linux']
  };

  res.json(skills);
});

// Serve the main HTML file for all routes (SPA)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📧 Email service: ${process.env.EMAIL_SERVICE || 'gmail'}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  process.exit(0);
});

module.exports = app; 