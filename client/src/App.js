import React, {useEffect} from "react";
import { Route, Routes } from "react-router-dom";
import { Login, Home, Public, FAQ, Services, DetailProduct, Blogs, Product } from './pages/public';
import path from "./ultils/path";
import { useDispatch } from "react-redux";
import {getCategories} from "./store/asyncActions";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories())
  }, [dispatch]);
  return (
    <div className=" min-h-screen font-main relative select-none">
      <Routes>
        <Route path={path.PUBLIC} element={<Public />}>
          <Route path={path.HOME} element={<Home />} />
          <Route path={path.BLOGS} element={<Blogs />} />
          <Route path={path.PRODUCTS} element={<Product />} />
          <Route path={path.FAQs} element={<FAQ />} />
          <Route path={path.OUR_SERVICES} element={<Services />} />
          <Route path={path.DETAIL_PRODUCT__PID__TITLE} element={<DetailProduct />} />
        </Route>
          <Route path={path.LOGIN} element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;