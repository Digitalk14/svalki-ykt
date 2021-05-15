import React from "react";
import { ThemeProvider } from "styled-components";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Main } from "./components/main/main";
import { Admin } from "./components/admin/admin";
import { GetAdmins } from "./components/Login/getAdmins";

export default class App extends React.Component {
  render() {
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
            <Route exact path="/ykfj5768">
              <GetAdmins />
            </Route>
          </Switch>
        </ThemeProvider>
      </Router>
    );
  }
}
