import React from 'react'
import ReactDOM from 'react-dom/client'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Layout from './components/Layout'
import 'bootstrap/dist/css/bootstrap.min.css';
import ViewPost from './components/viewPost';
import AddVideo from './components/addVideo';
import Edit from './components/editUser';
import SeeOne from './components/view';
import Signup from './components/Signup';
import Login from './components/Login';
import UserDetails from './components/Privateroute';
import Privateroute from './components/Privateroute';
import UserDashboard from './components/UserDashboard';
import Logout from './components/logOut';





const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>

      <Route path='/' element={<ViewPost />} />
      <Route path='Add' element={<AddVideo />} />
      <Route path="/edit/:id" element={<Edit />} />
      <Route path='/registration' element={<Signup />} />
      <Route path="/viewone/:id" element={<SeeOne />} />
      <Route path='/login' element={<Login />} />

      <Route path="/user" element={<Privateroute />} />
      <Route path="/logout" element={<Logout />} />

        



    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)