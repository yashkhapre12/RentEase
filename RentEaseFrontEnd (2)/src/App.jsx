import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import PublicNavBar from "./Components/PublicNavbar";
import PrivateNavBar from "./Components/PrivateNavbar";
import UserRegistration from "./Components/UserRegistration";
import UserLogin from "./Components/UserLogin";
import Home from "./Components/Home";
import Logout from "./Components/Logout";
import AdminHome from "./Components/AdminHome";
import TenantHome from "./Components/TenantHome";
import LandlordDashboard from "./Components/LandlordDashboard";
import AddProperty from "./Components/AddProperty";
import SearchResults from "./Components/SearchResult"; // Import the SearchResults component
import PropertyList from "./Components/PropertyList";
import ShowProperty from "./Components/ShowProperty";

function App() {
  // const mystate = useSelector((state) => state.logged);
  const isLoggedIn = useSelector((state) => state.logged.loggedIn); // Correct Redux state reference

  return (
    <div className="app-content">
      {/* Dynamically show navbar based on login state */}
      {/* {mystate.loggedIn ? <PrivateNavBar /> : <PublicNavBar />} */}
      {isLoggedIn ? <PrivateNavBar /> : <PublicNavBar />}
      {/* Main content rendering */}
      <div className="App">
        <div className="container">
          <Routes>
            <Route path="/login" element={<UserLogin />} />
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<UserRegistration />} />
            <Route path="/home" element={<Home />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/admin" element={<AdminHome />} />
            <Route path="/landlord" element={<LandlordDashboard />} />
            <Route path="/tenant" element={<TenantHome />} />
            <Route path="/addproperty" element={<AddProperty />} />
            <Route path="/showproperty" element={<ShowProperty />} />
            {/* Add the new route for SearchResults */}
            <Route path="/search-results" element={<SearchResults />} />
            {/* <Route path="/propertylist" element={<PropertyList />} /> */}
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;