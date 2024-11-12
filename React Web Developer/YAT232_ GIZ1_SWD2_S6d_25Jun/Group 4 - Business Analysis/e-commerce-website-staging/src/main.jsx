import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ThemeProvider } from "@material-tailwind/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../redux/store.js";
import { fetchUsers } from "../redux/reducers/usersSlice.js";
import { fetchProducts } from "../redux/reducers/productsSlice.js";

store.dispatch(fetchUsers());
store.dispatch(fetchProducts());
createRoot(document.getElementById("root")).render(
  <ThemeProvider>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </ThemeProvider>
);
