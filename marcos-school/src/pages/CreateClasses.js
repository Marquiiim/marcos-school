import styles from '../sass/CreateClasses.module.css'

function CreateClasses() {

    return (
        <div className={styles.container}>
                <div className={styles.title_page}>
                    <h2>
                        Área de criação de classe
                    </h2>
                </div>
            <form className={styles.content_form}>

                <input type="number" placeholder="ID do professor" required />
                <input type="text" placeholder="Nome da disciplina" required />
                <input type="number" placeholder="Sala" required />

                <select required>
                    <option value="" disabled selected>Modalidade</option>
                    <option value="Presencial">
                        Presencial
                    </option>
                    <option value="Híbrido">
                        Híbrido
                    </option>
                    <option value="EAD">
                        EAD
                    </option>
                </select>

                <select required>
                    <option value="" disabled selected>Status da turma</option>
                    <option value="Ativa">
                        Ativa
                    </option>
                    <option value="Inativa">
                        Inativa
                    </option>
                    <option value="Concluída">
                        Concluída
                    </option>
                </select>

                <div className={styles.button_student_add}>
                    <span>ÁREA PARA ADIÇÃO DE ALUNOS.</span>
                </div>
                <button type="submit">
                    Criar turma
                </button>
            </form>
        </div>
    )
}

export default CreateClasses