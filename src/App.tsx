import { ThemeProvider } from "styled-components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Main } from "./components/main/main";
import { Admin } from "./components/admin/admin";
import * as React from "react";

export const App: React.FC = () => {
  return (
    <Router>
      <ThemeProvider theme={{ fontFamily: "Helvetica Neue" }}>
        <Switch>
          <Route exact path="/">
            <Main />
          </Route>
          <Route exact path="/admin">
            <Admin />
          </Route>
        </Switch>
      </ThemeProvider>
    </Router>
  );
};
