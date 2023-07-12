import { FC, useState } from "react";
import Subnavbar from "../subnav/Subnavbar";
import ProductTable from "../products/ProductTable";
import { BrowserRouter as Router, Routes, Route,} from "react-router-dom";
import CategoryTable from "../categories/CategoryTable";
import BrandTable from "../brands/BrandTable";;

interface Props {
  //
};

const DashboardPage: FC<Props> = () => {

  return (
    <div>
      <div>
        <Subnavbar />
        <Routes>
          <Route path="products" element={<ProductTable />} />
          <Route path="brands" element={<BrandTable />} />
          <Route path="categories" element={<CategoryTable />} />
        </Routes>
      </div>
    </div>
  );
};

export default DashboardPage;