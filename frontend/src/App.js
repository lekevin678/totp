import React, { Component } from "react";
import NavBar from "./components/navbar";

class App extends Component {
  state = {};

  render() {
    return (
      <React.Fragment>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto"
        ></link>
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"
          crossorigin="anonymous"
        ></link>
        <NavBar />
      </React.Fragment>
    );
  }
}

export default App;
