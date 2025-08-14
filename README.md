# HODLIT - Cryptocurrency Portfolio Tracker

<div align="center">
  <img src="https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg?auto=compress&cs=tinysrgb&w=200&h=200" alt="HODLIT Logo" width="120" height="120" style="border-radius: 20px;">
  
  <h3>Your Accumulation Headquarters</h3>
  <p>A modern, responsive cryptocurrency portfolio tracker built with React and Tailwind CSS</p>

  [![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.7-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
  [![Vite](https://img.shields.io/badge/Vite-5.4.2-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)
  [![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)
</div>

## ✨ Features

### 📊 **Portfolio Management**
- Real-time portfolio tracking with circular progress indicators
- Asset allocation visualization
- Profit/loss calculations with 24h change tracking
- Quick buy/sell actions

### 📈 **Market Data**
- Live cryptocurrency prices from CoinGecko API
- Interactive price charts and sparklines
- Market cap and volume information
- Top gainers and losers tracking

### 🎯 **Dashboard**
- Personalized user dashboard
- Portfolio overview with visual analytics
- Market statistics and trends
- Quick access to favorite cryptocurrencies

### 📰 **News & Insights**
- Latest cryptocurrency news
- Market analysis and insights
- Categorized news articles
- Featured stories section

### 🎨 **Modern UI/UX**
- Dark theme with purple/pink gradient accents
- Glass-morphism design elements
- Responsive design for all devices
- Smooth animations and micro-interactions

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone [https://github.com/naimulhasannabil/Cryptocurrency-App.git]
   cd crypto
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

## 🛠️ Built With

### Core Technologies
- **[React](https://reactjs.org/)** - Frontend framework
- **[Vite](https://vitejs.dev/)** - Build tool and development server
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[React Router](https://reactrouter.com/)** - Client-side routing

### UI Components
- **[Lucide React](https://lucide.dev/)** - Beautiful icons
- Custom circular progress components
- Glass-morphism card designs
- Responsive grid layouts

### Data & APIs
- **[CoinGecko API](https://www.coingecko.com/en/api)** - Cryptocurrency market data
- Real-time price updates
- Historical price charts
- Market statistics

## 📁 Project Structure

```
hodlit-crypto-tracker/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── CircularProgress.jsx    # Custom progress indicators
│   │   ├── CryptoCard.jsx         # Cryptocurrency display cards
│   │   ├── Dashboard.jsx          # Main dashboard component
│   │   ├── LoadingSkeleton.jsx    # Loading state components
│   │   ├── Markets.jsx            # Market data page
│   │   ├── Navbar.jsx             # Navigation component
│   │   ├── News.jsx               # News and articles page
│   │   ├── Portfolio.jsx          # Portfolio management
│   │   └── PriceChart.jsx         # Price visualization
│   ├── contexts/
│   │   └── CryptoContext.jsx      # Global state management
│   ├── App.jsx                    # Main application component
│   ├── App.css                    # Component-specific styles
│   ├── index.css                  # Global styles and Tailwind
│   └── main.jsx                   # Application entry point
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── README.md
```

## 🎨 Design System

### Color Palette
- **Primary**: Purple gradients (`#a855f7` to `#ec4899`)
- **Secondary**: Cyan accents (`#06b6d4`)
- **Background**: Dark slate (`#0f172a` to `#1e293b`)
- **Cards**: Glass-morphism with backdrop blur

### Typography
- **Font Family**: Inter, system fonts
- **Headings**: Bold weights (700-800)
- **Body**: Regular weight (400-500)
- **Accents**: Gradient text effects

### Components
- **Cards**: Rounded corners (24px), subtle borders
- **Buttons**: Gradient backgrounds, hover effects
- **Progress**: Circular SVG-based indicators
- **Charts**: Smooth line charts with gradients

## 📱 Responsive Design

The application is fully responsive and optimized for:

- **Desktop**: Full-featured dashboard with multi-column layouts
- **Tablet**: Adapted grid systems and touch-friendly interactions
- **Mobile**: Collapsible navigation and single-column layouts

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=https://api.coingecko.com/api/v3
VITE_APP_NAME=HODLIT
```

### Tailwind Configuration
The project uses a custom Tailwind configuration with:
- Extended color palette
- Custom animations
- Responsive breakpoints
- Component utilities

## 📊 API Integration

### CoinGecko API
The application integrates with CoinGecko's free API for:
- Real-time cryptocurrency prices
- Market capitalization data
- 24h price changes
- Historical price charts
- Market statistics

### Rate Limiting
- API calls are optimized to respect rate limits
- Data is cached and updated every 60 seconds
- Fallback mock data for development

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Deploy to Netlify
1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify
3. Configure redirects for React Router

### Deploy to Vercel
1. Connect your GitHub repository
2. Vercel will automatically detect the Vite configuration
3. Deploy with zero configuration

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Development Guidelines
- Follow React best practices
- Use Tailwind CSS for styling
- Maintain responsive design
- Add proper error handling
- Write meaningful commit messages


---

<div align="center">
  <p>Made with ❤️ by the HODLIT Team</p>
  <p>⭐ Star this repository if you found it helpful!</p>
</div>
