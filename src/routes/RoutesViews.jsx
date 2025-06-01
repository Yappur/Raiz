import { Routes, Route } from "react-router-dom";
import Home from "../pages/homePage";
import ViewProducers from "../pages/ViewProducers";
import ProductListPage from "../pages/ProductListPage";
import LayoutCompleteProducers from "../components/Navigate/LayoutCompleteProducers";
import ViewCertificate from "../pages/ViewCertificate";
import HomeProducers from "../pages/HomeProducers";

const RoutesViews = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route element={<LayoutCompleteProducers />} path="/producers">
          <Route path="home" element={<HomeProducers />} />
          <Route path="new-certificate" element={<ViewProducers />} />
          <Route path="my-certificates" element={<ProductListPage />} />
        </Route>

        <Route path="/certificates/:id" element={<ViewCertificate />} />
      </Routes>
    </>
  );
};

export default RoutesViews;
