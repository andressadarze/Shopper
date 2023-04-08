import { ThemeProvider } from "@mui/material/styles"
import theme from "./constants/theme"
import { Button } from "@mui/material";
import Header from "./components/Header/Header";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <p>Shopper</p>
      <Button variant="contained" color="primary">
        Me aperte!
      </Button>

    </ThemeProvider>
  );
}

export default App;
