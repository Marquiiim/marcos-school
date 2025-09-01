import { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import axios from 'axios'
import { FaGraduationCap, FaTrashAlt, FaWrench } from "react-icons/fa";

import styles from '../sass/ClassControl.module.css'


function ClassControl() {

    const [classesData, setClassesData] = useState([])
    const [showConfirm, setShowConfirm] = useState(false)
    const [classToDelete, setClassToDelete] = useState(null)

    useEffect(() => {
        const userData = JSON.parse(sessionStorage.getItem('currentUser'))

        const fetchClass = async () => {
            try {
                const response = await axios.post(`http://localhost:5000/api/fetchclass`, { id_professor: userData.id_professor })
                setClassesData(response.data.data)
            } catch (err) {
                console.error(`[ERRO] ${err.message}`)
            }
        }
        fetchClass()
    }, [])

    const handleDelete = async (id_classe) => {
        try {
            await axios.delete(`http://localhost:5000/api/removeclass/${id_classe}`)
            setClassesData(prev => prev.filter(classItem => classItem.id !== id_classe))
            setShowConfirm(false)
            setClassToDelete(null)
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
                <h2 className={styles.title}>
                    Controle de classes
                </h2>

                <div className={styles.classesContainer}>
                    {classesData.length === 0 ? (
                        <p className={styles.emptyMessage}>Você ainda não tem classes criadas</p>
                    ) : (
                        classesData.map((classItem) => (
                            <div key={classItem.id} className={styles.classCard}>
                                <h3 className={styles.classTitle}>
                                    Disciplina: {classItem.discipline_name} - #{classItem.id}
                                </h3>
                                <div className={styles.classDetails}>
                                    <p className={styles.classInfo}>
                                        <span className={styles.infoLabel}>Modalidade:</span>
                                        {classItem.modality}
                                    </p>
                                    <p className={styles.classInfo}>
                                        <span className={styles.infoLabel}>Status:</span>
                                        <span className={styles.status}>
                                            {classItem.class_status}
                                        </span>
                                    </p>
                                    <p className={styles.classInfo}>
                                        <span className={styles.infoLabel}>Criada:</span>
                                        {formatDate(classItem.created_at)}
                                    </p>
                                    <p className={styles.classInfo}>
                                        <span className={styles.infoLabel}>Última atualização:</span>
                                        {formatDate(classItem.updated_at)}
                                    </p>
                                </div>

                                <div className={styles.classActions}>
                                    <Link to='/addstudent' className={styles.actionLink}>
                                        <FaGraduationCap className={styles.students} />
                                    </Link>
                                    <Link className={styles.actionLink}>
                                        <FaWrench className={styles.editClass} />
                                    </Link>
                                    <button className={styles.actionLink} onClick={(e) => {
                                        e.preventDefault()
                                        setClassToDelete(classItem.id)
                                        setShowConfirm(true)
                                    }} >
                                        <FaTrashAlt className={styles.trash} />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
                {showConfirm && (
                    <div className={styles.modal}>
                        <p>Confirmar exclusão?</p>
                        <button onClick={() => handleDelete(classToDelete)}>
                            Sim
                        </button>
                        <button onClick={() => setShowConfirm(false)}>Cancelar</button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ClassControl