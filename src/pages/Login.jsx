import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';

import Loading from '../components/Loading';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      userName: '',
      disabled: true,
      loading: false,
      redirect: false,
    };
  }

  handleChange = ({ target }) => {
    const min = 3;
    this.setState({
      [target.name]: target.value,
    }, () => {
      const { userName } = this.state;
      this.setState({
        disabled: true,
      });
      if (userName.length >= min) {
        this.setState({
          disabled: false,
        });
      }
    });
  }

  handleClick = async () => {
    const { userName } = this.state;
    this.setState({
      loading: true,
    });
    await createUser({ name: userName });
    this.setState({
      loading: false,
      redirect: true,
    });
  }

  render() {
    const { userName, disabled, loading, redirect } = this.state;
    if (loading) return <Loading />;
    return (
      <div data-testid="page-login">

        <input
          type="text"
          value={ userName }
          name="userName"
          data-testid="login-name-input"
          onChange={ this.handleChange }
        />

        <button
          data-testid="login-submit-button"
          type="submit"
          disabled={ disabled }
          onClick={ this.handleClick }
        >
          Entrar
        </button>

        {redirect ? <Redirect to="search" /> : ''}

      </div>
    );
  }
}

export default Login;
