import { Routes, Route } from "react-router-dom";
import Home from "../pages/homePage";
import ViewProducers from "../pages/ViewProducers";
import ProductListPage from "../pages/ProductListPage";
import LayoutCompleteProducers from "../components/Navigate/LayoutCompleteProducers";

const RoutesViews = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route element={<LayoutCompleteProducers />}>
          <Route path="/products" element={<ProductListPage />} />
          <Route path="/producers" element={<ViewProducers />} />
        </Route>
      </Routes>
    </>
  );
};

export default RoutesViews;
