import { Component } from "react";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";

export default class Layout extends Component {
  render() {
    return(
      <div className="container mx-auto">
        <Header />
        <Outlet />
        <Footer />
      </div>
    );
  }
}