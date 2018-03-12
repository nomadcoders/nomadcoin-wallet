import React, { Component } from "react";
import { injectGlobal } from "styled-components";
import reset from "styled-reset";
import axios from "axios";
import typography from "../../typography";
import AppPresenter from "./AppPresenter";

const baseStyles = () => injectGlobal`
  ${reset};
  ${typography};
  h1,h2,h3,h4{
    margin-bottom:0!important;
  }
`;

class AppContainer extends Component {
  state = {
    isLoading: true
  };
  render() {
    baseStyles();
    return <AppPresenter {...this.state} />;
  }
}

export default AppContainer;
