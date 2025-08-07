import './App.css';
import Logo from './img/LOGO.webp'

function App() {
  return (
    <div className="container">
      <form className="content">

        <label className="info-area">
          Área de Login
        </label>

        <img src={Logo} alt="Logo"/>

        <input type="email" placeholder="Insira seu email" required />

        <input type="password" placeholder="Insira sua senha" required />

        <button type="submit" className="login-button">
          Entrar
        </button>

        <span className="warning-login">
          Apenas usuários credenciados podem ter acesso ao sistema.
        </span>

      </form>
    </div>
  );
}

export default App;
