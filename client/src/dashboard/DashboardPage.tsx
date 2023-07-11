import { FC, useState } from "react";
import Subnavbar from "../subnav/Subnavbar";
import ProductTable from "../products/ProductTable";
import { Link } from "react-router-dom";
import CategoryTable from "../categories/CategoryTable";
import BrandTable from "../brands/BrandTable";
import ProductActions from '../products/ProductActions';

type User = {
  username: string;
  password: string;
};

interface Props {
  manageType: string | undefined
};

const DashboardPage: FC<Props> = ({ manageType }) => {
  const [user, setUser] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string): void => {
    setSearchQuery(query);
  };

  const dataTable = () => {
    if (manageType == "brands") {
      return <BrandTable />
    } else if (manageType == "categories") {
      return <CategoryTable />
    } else {
      return <ProductTable searchQuery={searchQuery} />
    }
  }

  return (
    <div>
      {user == null ? ( // TODO Check for user
        <div>
          <Subnavbar />
          <ProductActions manageType={manageType} onSearch={handleSearch} />
          {dataTable()}
        </div>
      ) : (
        <div>
          <h1>Login</h1>
          <Link to="/login">Log in</Link>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;