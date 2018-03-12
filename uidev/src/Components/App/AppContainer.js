import React, { Component } from "react";
import { injectGlobal } from "styled-components";
import reset from "styled-reset";
import axios from "axios";
import typography from "../../typography";
import { MASTER_NODE, SELF_NODE, SELF_P2P_NODE } from "../../constants";
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
  componentDidMount = () => {
    this._registerOnMaster();
  };
  render() {
    baseStyles();
    return <AppPresenter {...this.state} />;
  }
  _registerOnMaster = () => {
    const request = axios.post(`${MASTER_NODE}/peers`, {
      peer: SELF_P2P_NODE
    });
    console.log(request);
  };
}

export default AppContainer;
