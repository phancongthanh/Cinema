
import Layout from './pages/Main/components/layout/MainLayout';
import { AccountsEdit, AdminLayout, Analysis, Book, ChooseFilm, ChooseSeats, FilmDetail, FilmsEdit, Home, Login, MainLayout, Missing, NeedLogin, Notification, Payment, Price, Refund, Register, RoomsEdit, Showtimes, ShowtimesEdit, UserInfo } from './pages';
import { BrowserRouter, Route, RouterProvider, Routes, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import React from 'react';
import { AuthProvider } from './context/AuthProvider';
import RequiredAuth from './components/RequiredAuth';



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
          <Route path="/login"  element={<Login />}/>
          <Route path="/register" element={<Register />}/>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />}/>
            <Route path="home" element={<Home />}/>
            <Route path="showtimes" element={<Showtimes />}/>
            <Route path="price" element={<Price />}/>
            <Route path="filmdetail/:filmid" element={<FilmDetail />}/>
            <Route element={<RequiredAuth allowedRole={'Member'} />}>
              <Route path="book/" element={<Book />}>
                <Route path="chooseFilm/:filmid?/:scheduleid?" element={<ChooseFilm />}/>
                <Route path="chooseSeats/:filmid?/:scheduleid?" element={<ChooseSeats />}/>
                <Route path="userInfo/:filmid?/:scheduleid?" element={<UserInfo />}/>
                <Route path="payment/:filmid?/:scheduleid?" element={<Payment />}/>
                <Route path="notification/:filmid?/:scheduleid?" element={<Notification />}/>
               </Route>
            <Route path="refund" element={<Refund />}/>
            </Route>
            <Route path="needLogin" element={<NeedLogin />}/>
          </Route>

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
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
