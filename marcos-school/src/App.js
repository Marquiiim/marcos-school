import './App.css';

function App() {
  return (
    <div>
      <form>
        <label>
          Área de Login
        </label>
        <input type="email" placeholder="Insira seu email" required />
        <input type="password" placeholder="Insira sua senha" required />
        <button type="submit">
          Entrar
        </button>
      </form>
    </div>
  );
}

export default App;
