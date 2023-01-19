import React from "react";
import { Routes, Route } from "react-router-dom";
import "./scss/app.scss";
import Home from "./pages/Home";
import MainLayout from "./components/layouts/MainLayout";

const Cart = React.lazy(() =>
  import(/*webpackChunkName: 'Cart'*/ "./pages/Cart")
);
const FullPizza = React.lazy(() =>
  import(/*webpackChunkName: 'FullPizza'*/ "./pages/FullPizza")
);
const NotFound = React.lazy(() =>
  import(/*webpackChunkName: 'NotFound'*/ "./pages/NotFound")
);

function App() {
  return (
    <Routes>
      <MainLayout />
      <Route path="/" element={<Home />} />
      <Route
        path="cart"
        element={
          <React.Suspense fallback={<div>Идет загрузка корзины</div>}>
            <Cart />
          </React.Suspense>
        }
      />
      <Route
        path="pizza/:id"
        element={
          <React.Suspense fallback={<div>Идет загрузка пиццы...</div>}>
            <FullPizza />
          </React.Suspense>
        }
      />
      <Route
        path="*"
        element={
          <React.Suspense
            fallback={<div>Идет загрузка несуществующей страницы</div>}
          >
            <NotFound />
          </React.Suspense>
        }
      />
    </Routes>
  );
}

export default App;
