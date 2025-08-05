# Ankith's Portfolio Website

A modern, responsive portfolio website built with HTML5, CSS3, JavaScript, and Node.js/Express backend.

## 🚀 Features

### Frontend
- **Modern Design**: Clean, professional design with smooth animations
- **Fully Responsive**: Optimized for all devices (mobile, tablet, desktop)
- **Interactive Elements**: Particle animations, smooth scrolling, hover effects
- **Performance Optimized**: Lazy loading, compressed assets, efficient animations
- **Accessibility**: WCAG compliant with proper semantic HTML

### Backend
- **Express.js Server**: Fast, scalable Node.js backend
- **Contact Form**: Email integration with auto-reply functionality
- **Security**: Helmet.js, rate limiting, CORS protection
- **API Endpoints**: RESTful API for portfolio data
- **Email Service**: Nodemailer integration with multiple providers

## 🛠 Tech Stack

### Frontend
- HTML5
- CSS3 (Custom Properties, Grid, Flexbox)
- Vanilla JavaScript (ES6+)
- Google Fonts (Inter)

### Backend
- Node.js
- Express.js
- Nodemailer
- Helmet.js
- Express Rate Limit
- Express Validator

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Git

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   ```bash
   cp env.example .env
   ```
   
   Edit `.env` file with your configuration:
   ```env
   PORT=3000
   NODE_ENV=development
   EMAIL_SERVICE=gmail
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   ```

4. **Gmail Setup** (for email functionality)
   - Enable 2-factor authentication on your Gmail account
   - Generate an App Password
   - Use the App Password in the EMAIL_PASS field

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:3000`

## 📁 Project Structure

```
portfolio/
├── index.html          # Main HTML file
├── styles.css          # All CSS styles
├── script.js           # Frontend JavaScript
├── server.js           # Express server
├── package.json        # Node.js dependencies
├── env.example         # Environment variables template
├── README.md           # This file
├── Photo.jpg           # Profile image
└── .gitignore          # Git ignore file
```

## 🎨 Customization

### Colors and Styling
Edit CSS custom properties in `styles.css`:
```css
:root {
  --primary-color: #6366f1;
  --secondary-color: #06b6d4;
  --accent-color: #8b5cf6;
  /* ... more variables */
}
```

### Content Updates
- **Profile**: Update `index.html` with your information
- **Projects**: Modify the projects section in `index.html`
- **Skills**: Update the skills grid in `index.html`
- **Contact**: Update email and social links

### Backend Configuration
- **Email**: Configure email service in `.env`
- **API**: Modify routes in `server.js`
- **Security**: Adjust rate limiting and CORS in `server.js`

## 🚀 Deployment

### Option 1: Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy automatically

### Option 2: Heroku
1. Create a Heroku app
2. Set environment variables
3. Deploy using Heroku CLI or GitHub integration

### Option 3: DigitalOcean/AWS
1. Set up a VPS
2. Install Node.js and PM2
3. Configure nginx as reverse proxy
4. Deploy using PM2

## 📧 Email Configuration

### Gmail Setup
1. Enable 2-factor authentication
2. Generate App Password
3. Use App Password in `.env`

### Alternative Email Services
- **Outlook**: `EMAIL_SERVICE=outlook`
- **Yahoo**: `EMAIL_SERVICE=yahoo`
- **SendGrid**: Configure SMTP settings

## 🔧 API Endpoints

### Contact Form
- **POST** `/api/contact`
  - Body: `{ name, email, subject, message }`
  - Response: `{ success: true, message: "..." }`

### Health Check
- **GET** `/api/health`
  - Response: `{ status: "OK", timestamp: "...", environment: "..." }`

### Portfolio Data
- **GET** `/api/projects` - Returns project list
- **GET** `/api/skills` - Returns skills data

## 🛡️ Security Features

- **Helmet.js**: Security headers
- **Rate Limiting**: Prevent abuse
- **CORS Protection**: Cross-origin request control
- **Input Validation**: Express-validator
- **Content Security Policy**: XSS protection

## 📱 Responsive Design

The website is fully responsive with breakpoints:
- **Mobile**: < 480px
- **Tablet**: 480px - 768px
- **Desktop**: > 768px

## 🎯 Performance Optimizations

- **Compression**: Gzip compression enabled
- **Caching**: Static file caching
- **Lazy Loading**: Images load on demand
- **Minification**: Production builds are minified
- **CDN Ready**: Static assets optimized for CDN

## 🧪 Testing

Run tests (if configured):
```bash
npm test
```

## 📝 License

MIT License - feel free to use this template for your own portfolio!

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Support

If you have any questions or need help:
- Create an issue on GitHub
- Email: ankithpratheesh147@gmail.com
- LinkedIn: [Your LinkedIn Profile]

## 🔄 Updates

### Version 2.0.0
- Complete UI redesign
- Modern CSS with custom properties
- Enhanced JavaScript with classes
- Node.js/Express backend
- Email integration
- Security improvements
- Performance optimizations

---

**Built with ❤️ by Ankith Pratheesh** 