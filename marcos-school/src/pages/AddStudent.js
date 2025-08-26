import styles from '../sass/AddStudent.module.css'

function AddStudent() {

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h2>
                    Área de adição de alunos na classe
                </h2>

                <div className={styles.search_area}>
                    <input type='text' placeholder='Procure pelo ID ou Nome do aluno' />
                    <span>
                        Matriculas:
                    </span>
                </div>

                <section className={styles.content_students}>
                    <ul>
                        <li>
                            <h3>
                                Aluno 01
                                <span>
                                    #1234
                                </span>
                            </h3>
                            <div>
                                <div>
                                    Criado:
                                </div>
                                <span>
                                    Ativo
                                </span>
                                <button>
                                    Adicionar
                                </button>
                            </div>
                        </li>
                    </ul>
                </section>
            </div>
        </div>
    )
}

export default AddStudent