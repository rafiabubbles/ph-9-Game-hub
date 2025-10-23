import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { router } from './Routes/Routes.jsx';
import { RouterProvider } from 'react-router'
import { ToastContainer } from 'react-toastify'
import { AuthProvider } from './contexts/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      <ToastContainer />
    </AuthProvider>
  </StrictMode>,
)

//  <AppInstallProvider>
//       <RouterProvider router={router} />
//     </AppInstallProvider>
