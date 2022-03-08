import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';

import Loading from './Loading';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      user: null,
    };
  }

  componentDidMount() {
    this.handleUserName();
  }

  handleUserName = async () => {
    const user = await getUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    return (
      <header data-testid="header-component">
        <nav>

          <Link data-testid="link-to-search" to="/search">Pesquisar</Link>
          <Link data-testid="link-to-favorites" to="/favorites">Favoritas</Link>
          <Link data-testid="link-to-profile" to="/profile">Perfil</Link>

        </nav>

        {!user
          ? <Loading />
          : <p data-testid="header-user-name">{ user.name }</p>}
      </header>
    );
  }
}

export default Header;
