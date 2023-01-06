import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import Signup from "./Pages/Signup";
import { createTheme, ThemeProvider } from "@mui/material";
import Network from "./Pages/Network";
import Report from "./Pages/Report";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "./store/auth";
import Analysis from "./Pages/Analysis";
import PageNotFound from "./Pages/PageNotFound";
import Profile from "./Pages/Profile";

function App() {
  const dispatch = useDispatch();
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const username = localStorage.getItem("username");
  useEffect(() => {
    loaderFunction();
  }, [username]);

  const loaderFunction = async () => {
    const setValues = () => {
      if (username) {
        dispatch(authActions.setUsername(username));
        dispatch(authActions.setloggedin(true));
      }
    };
    await setValues();
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile/:username" element={<Profile />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/network/:id/:networkName" element={<Network />} />
        <Route path="/network/:id/:networkName/report" element={<Report />} />
        <Route
          path="/network/:id/:networkName/analysis"
          element={<Analysis />}
        />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
