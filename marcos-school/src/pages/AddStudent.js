import { useEffect, useState } from 'react'
import axios from 'axios'

import styles from '../sass/AddStudent.module.css'

function AddStudent() {

    const [studentsData, setStudentsData] = useState([])
    const [searchStudentApi, setSearchStudentApi] = useState('')
    const userData = JSON.parse(sessionStorage.getItem('currentUser'))

    useEffect(() => {

        const fetchStudents = async () => {
            const response = await axios.post('http://localhost:5000/api/fetchstudents', {
                name_student: ''
            })
            setStudentsData(response.data)
        }
        fetchStudents()
    }, [])

    const searchStudents = async () => {
        setStudentsData([])
        try {
            const response = await axios.post('http://localhost:5000/api/fetchstudents', {
                name_student: searchStudentApi
            })
            setStudentsData(response.data)
        } catch (err) {
            console.error(`[ERRO] ${err.message}`)
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            searchStudents()
        }
    }

    const addStudentClass = async (id_student) => {
        try {
            const response = await axios.post(`http://localhost:5000/api/addstudentclass`, {
                minister_id: userData.id_minister,
                id_student: id_student,
                // class_id: id_class
            })
            console.log(response.data)
        } catch (err) {
            console.error(`[ERRO] ${err.message}`)
        }

    }

    const formatDate = (datestring) => {
        return new Date(datestring).toLocaleDateString('pt-BR')
    }

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h2>
                    Área de adição de alunos na classe
                </h2>

                <div className={styles.search_area}>
                    <input
                        type='text'
                        placeholder='Procure pelo Nome do aluno'
                        value={searchStudentApi}
                        onChange={(e) => setSearchStudentApi(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                </div>

                <section className={styles.content_students}>
                    <ul>
                        {studentsData.map((student) => (
                            <li key={student.id}>
                                <h3>
                                    {student.name}
                                    <span>
                                        #{student.id}
                                    </span>
                                </h3>
                                <div>
                                    <div>
                                        {formatDate(student.created_at)}
                                    </div>
                                    <span>
                                        {student.status}
                                    </span>
                                    <button onClick={(e) => {
                                        e.preventDefault()
                                        addStudentClass(student.id)
                                    }}>
                                        Adicionar
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </section>
            </div>
        </div>
    )
}

export default AddStudent