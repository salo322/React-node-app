import "./index.css";
import TableComponent from "../Table/Index";
import Chart from "../Chart/index";
import { useEffect } from "react";
import axios from "axios";
import { useUserStore } from "../Table/store";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const Index = () => {
  const { users } = useUserStore();
  return (
    <div className="main-container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TableComponent />} />
          <Route path="/chart" element={<Chart people={users} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Index;

//<Chart people={users} />
