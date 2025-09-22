
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from './components/ui/sonner.jsx'
import ShopContextProvider from './context/ShopContext.jsx'

createRoot(document.getElementById('root')).render(
<BrowserRouter>
  <ShopContextProvider>
<Toaster position="bottom-right"  />    <App />
  </ShopContextProvider>
</BrowserRouter>
)
