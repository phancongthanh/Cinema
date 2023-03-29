
import Layout from './pages/Main/components/layout/MainLayout';
import { AccountsEdit, AdminLayout, Analysis, Book, FilmsEdit, Home, Login, MainLayout, Missing, NeedLogin, Price, Refund, Register, RoomsEdit, Showtimes, ShowtimesEdit } from './pages';
import { BrowserRouter, Route, RouterProvider, Routes, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import React from 'react';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
          <Route path="/login"  element={<Login />}/>
          <Route path="/register" element={<Register />}/>
          <Route path="/NeedLogin" element={<NeedLogin />}/>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />}/>
            <Route path="home" element={<Home />}/>
            <Route path="showtimes" element={<Showtimes />}/>
            <Route path="price" element={<Price />}/>
          </Route>

          {/* <Route element={<RequiredAuth />}> */}
          <Route>
            <Route path="/Book" element={<Book />}/>
            <Route path="/Refund" element={<Refund />}/>
          </Route>

          {/* <Route element={<RequiredAuth allowedRole={RoleSchema.Administrator}/>}> */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Analysis />}/>
            <Route path="analysis" element={<Analysis />}/>
            <Route path="showtimes" element={<ShowtimesEdit />}/>
            <Route path="film" element={<FilmsEdit />}/>
            <Route path="rooms" element={<RoomsEdit />}/>
            <Route path="accounts" element={<AccountsEdit />}/>
          </Route>
          <Route path="/*" element={<Missing />}/>
        </Route> 
  )
);

function App() {
  return (
    // <AuthProvider>
     <RouterProvider router={router} />
    // </AuthProvider>
  );
}

export default App;
