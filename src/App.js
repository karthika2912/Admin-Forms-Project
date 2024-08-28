import AdminHome from "./admin/AdminHome";
import WebsiteHome from "./website/WebsiteHome";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/*" element={<WebsiteHome />} />
          <Route path="/admin/*" element={<AdminHome />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
