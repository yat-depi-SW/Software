import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import ShopProvider from './context/ShopContext.jsx'
import { ThemeProvider } from "@material-tailwind/react";

createRoot(document.getElementById('root')).render(

<BrowserRouter>
  <ThemeProvider>
    <ShopProvider>
      <App />
    </ShopProvider>
  </ThemeProvider>
</BrowserRouter>

  

)
