import { FC, useState } from "react";
import Subnavbar from "../subnav/Subnavbar";
import ProductTable from "../products/ProductTable";
import { BrowserRouter as Router, Routes, Route,} from "react-router-dom";
import CategoryTable from "../categories/CategoryTable";
import BrandTable from "../brands/BrandTable";
import { UserData } from "../auth/util";

interface Props {
  user: UserData
};

const DashboardPage: FC<Props> = (user) => {
  return (
    <div>
      <div>
        <Subnavbar />
        <Routes>
          <Route path="products" element={<ProductTable itemLim={15}/>} />
          <Route path="brands" element={<BrandTable itemLim={15} />} />
          <Route path="categories" element={<CategoryTable itemLim={15}/>} />
        </Routes>
      </div>
    </div>
  );
};

export default DashboardPage;