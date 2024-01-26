import Header from "../header/Header";
import SignInPage from "../signInPage/SignInPage";
import HomePage from "../homePage/HomePage";
import Register from "../register/Register";
import OurProductList from "../OurProductList/OurProductList";
import ProductPage from "../productPage/ProductPage";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
} from "react-router-dom";

function App() {
  let { id } = useParams();
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/ourProductList" element={<OurProductList />} />
          <Route path="/product-page/:id" element={<ProductPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
