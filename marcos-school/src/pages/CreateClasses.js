function CreateClasses() {

    return (
        <div>
            <form>

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

                <div>
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