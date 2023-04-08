import { ThemeProvider } from "@mui/material/styles"
import theme from "./constants/theme"
import Header from "./components/Header/Header"
import ProductsFeed from "./screens/ProductsFeed"

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <p>Shopper</p>
      <ProductsFeed/>

    </ThemeProvider>
  );
}

export default App;
