import './App.css'
import { ModalPage } from './components/modal';
import { Modal2Page } from './components/modal2';
import { ToastPage } from './components/toast';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

function App() {
  const router = createBrowserRouter([
    {
      path: "/toast",
      element: <ToastPage />,
    },
    {
      path: "/modal",
      element: <ModalPage />,
    },
    {
      path: "/modal2",
      element: <Modal2Page />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
