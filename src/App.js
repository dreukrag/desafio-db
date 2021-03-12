import "./App.css";
import Header from "./components/Header";
import Banner from "./components/Banner";
// import { makeStyles } from "@material-ui/core/styles";
import Products from "./components/Products";
import Footer from "./components/Footer";

// const mainStyles = makeStyles({
//   content: {
//     paddingTop: "120px",
//   },
// });
function App() {
  // const styles = mainStyles();
  return (
    <div className="App">
      <Header />
      <Banner />
      <Products />
      <Footer />
    </div>
  );
}

export default App;
