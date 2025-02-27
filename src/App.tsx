// src/App.tsx
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './store';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

  const ProtectedRoute = ({ element }: { element: React.ReactNode }) => {
    const { isAuthenticated } = useSelector((state: RootState) => state.auth);
    
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{element}</>;
};

const PublicRoute = ({ element }: { element: React.ReactNode }) => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return <>{element}</>;
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/login" replace />,
  },
  {
    path: '/login',
    element: <PublicRoute element={<LoginPage />} />,
  },
  {
    path: '/register',
    element: <PublicRoute element={<RegisterPage/>} />
  }

  // Add more routes here as needed
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;