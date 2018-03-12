import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const AppContainer = styled.div`
  background-color: #f2f6fa;
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const AppPresenter = ({ isLoading }) => <AppContainer />;

export default AppPresenter;
