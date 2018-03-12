import React, { Component } from "react";
import PropTypes from "prop-types";
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
  static propTypes = {
    sharedPort: PropTypes.number.isRequired
  };
  componentDidMount = () => {
    const { sharedPort } = this.props;
    this._registerOnMaster(sharedPort);
    this._getBalance(sharedPort);
    this._getAddress(sharedPort);
    setInterval(() => this._getBalance(sharedPort), 1000);
  };
  render() {
    baseStyles();
    return <AppPresenter {...this.state} />;
  }
  _registerOnMaster = async port => {
    const request = await axios.post(`${MASTER_NODE}/peers`, {
      peer: SELF_P2P_NODE(port)
    });
  };
  _getAddress = async port => {
    const request = await axios.get(`${SELF_NODE(port)}/me/address`);
    this.setState({
      address: request.data,
      isLoading: false
    });
  };
  _getBalance = async port => {
    const request = await axios.get(`${SELF_NODE(port)}/me/balance`);
    this.setState({
      balance: request.data
    });
  };
}

export default AppContainer;
