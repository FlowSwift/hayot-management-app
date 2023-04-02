import { FC, useState } from "react";
import Subnavbar from "../subnav/Subnavbar";
import ProductTable from "../products/ProductTable";
import { Link } from "react-router-dom";
import CategoryTable from "../categories/CategoryTable";
import BrandTable from "../brands/BrandTable";

type User = {
  username: string;
  password: string;
};

interface Props {
  manageType: string | undefined
};

const DashboardPage: FC<Props> = ({ manageType }) => {
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (username: string, password: string) => {
    // Check if username and password are correct
    const isValidUser = true; // Replace with your authentication logic
    if (isValidUser) {
      setUser({ username, password });
    }
  };

  const handleLogout = () => {
    setUser(null);
  };

  const dataTable = () => {
    if (manageType == "brands") {
      return <BrandTable />
    } else if (manageType == "categories") {
      return <CategoryTable /> 
    } else {
      return <ProductTable />
    }
  }

  return (
    <div>
      {user == null ? ( // TODO Check for user
        <div>
          <Subnavbar />
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