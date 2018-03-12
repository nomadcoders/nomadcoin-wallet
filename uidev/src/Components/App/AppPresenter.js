import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Card, Key, KeyName, Title, Button } from "Components/Shared";

const Header = styled.div`
  margin: 50px 0;
  width: 90%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AppContainer = styled.div`
  background-color: #f2f6fa;
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const SendTxForm = styled.form`
  margin-top: 25px;
`;

const Submit = Button.withComponent("input").extend`
  margin-right:10px;
  border: 2px solid #305371;
  box-shadow:none;
  &:hover{
      box-shadow:none;
      transform:none;
  }
  &:disabled{
      color:#999;
      border: 2px solid #999;
      cursor:not-allowed;
      box-shadow:none;
  }
`;

const Input = Submit.extend`
  width: 200px;
  padding-left: 10px;
  &:active {
    background-color: transparent;
  }
  color: ${props => (props.hasError ? "#e74c3c" : "inherit")};
  border-color: ${props => (props.hasError ? "#e74c3c" : "inherit")};
`;

const AppPresenter = ({
  isLoading,
  address = "",
  balance = "",
  mineBlock,
  isMining,
  toAddress = "",
  amount = 0,
  handleInput,
  handleSubmit
}) => (
  <AppContainer>
    <Header>
      <Title>{isLoading ? "Loading..." : "Nomadcoin Wallet"}</Title>
      <Button disabled={isMining} onClick={mineBlock}>
        {isMining ? "Mining" : "Mine"}
      </Button>
    </Header>
    <Card>
      <Key>
        <KeyName>Your address:</KeyName> {address}
      </Key>
      <Key>
        <KeyName>Your balance:</KeyName> {balance} NMD
      </Key>
    </Card>
    <Card>
      <Key>Send NMD: </Key>
      <SendTxForm onSubmit={handleSubmit}>
        <Input
          placeholder={"Address"}
          required
          name="toAddress"
          value={toAddress}
          type={"text"}
          onChange={handleInput}
        />
        <Input
          placeholder={"Amount"}
          required
          name="amount"
          type={"number"}
          value={amount || ""}
          onChange={handleInput}
          max={balance}
        />
        <Submit
          value={"Send"}
          type={"submit"}
          readOnly
          disabled={!toAddress || !amount}
        />
      </SendTxForm>
    </Card>
  </AppContainer>
);

AppPresenter.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  address: PropTypes.string,
  balance: PropTypes.number,
  mineBlock: PropTypes.func.isRequired,
  isMining: PropTypes.bool.isRequired,
  toAddress: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired,
  handleInput: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

export default AppPresenter;
