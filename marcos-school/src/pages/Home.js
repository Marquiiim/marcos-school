import { Link } from 'react-router-dom'
import styles from '../sass/Home.module.css'

function Home() {

    const userData = JSON.parse(sessionStorage.getItem('currentUser'))

    return (
        <section className={styles.container}>
            <div className={styles.content}>
                <div className={styles.info_system}>
                    <h1>
                        Bem-vindo {userData.name} ao Aula+
                    </h1>
                    <h3>
                        Sistema de Gestão Acadêmica Inteligente
                    </h3>
                    <p>
                        Otimizando processos, simplificando a educação.
                    </p>
                </div>
                <nav className={styles.nav_system} >
                    <ul>
                        <li>
                            <Link>
                                Lista de aulas
                            </Link>
                        </li>
                        <li>
                            <Link>
                                Controle de presença
                            </Link>
                        </li>
                        <li>
                            <Link>
                                Cadastro de Turmas
                            </Link>
                        </li>
                    </ul>
                </nav>
                <span className={styles.last_login_text}>
                    Seu último acesso: {!userData.ultimo_login ? 'Primeiro acesso em curso.' : userData.ultimo_login}
                </span>
            </div>
        </section>
    )
}

export default Home