import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"

import styles from '../../sass/Frequency.module.css'

function Frequency() {

    const [studentsData, setStudentsData] = useState([])
    const { class_id } = useParams()
    const currentDate = new Date().toLocaleDateString('pt-BR')

    useEffect(() => {
        const fetchStudentsInClass = async () => {
            try {
                const response = await axios.post(`http://localhost:5000/api/studentsinclass`, {
                    class_id: class_id
                })
                setStudentsData(response.data)
            } catch (err) {
                console.error(`[ERRO] ${err.message}`)
            }
        }
        fetchStudentsInClass()
    }, [class_id])

    const markFrequency = async (student_id, present, arrival_time = null, notes = "") => {
        try {
            const response = await axios.post(`http://localhost:5000/api/frequency`, {
                student_id: student_id,
                class_id: class_id,
                present: present,
                arrival_time: present ? arrival_time : null,
                notes: notes
            })
            if (response.data?.success) {
                setStudentsData(prev => prev.map(s => s.id === student_id ? { ...s, attendance_record: true } : s))
            }
        } catch (err) {
            console.error(`[ERRO] ${err.message}`)
        }
    }

    console.log(studentsData)

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h2>
                    Frequência turma: {currentDate}
                </h2>

                <section className={styles.content_students}>
                    <ul>
                        {studentsData.map((student) => (
                            <li key={student.student_id}>
                                <h3>
                                    {student.name}
                                    <span>
                                        #{student.student_id}
                                    </span>
                                </h3>
                                <div>
                                    <span
                                        className={`${styles.status} ${styles[student.status]}`}>
                                        {student.status}
                                    </span>



                                    {student?.attendance_record ? (
                                        <span>
                                            Registrado
                                        </span>
                                    )
                                        :
                                        (
                                            <>
                                                <button
                                                    disabled={student.status === "Inativo"}
                                                    onClick={() => markFrequency(
                                                        student.student_id,
                                                        true,
                                                        new Date().toLocaleTimeString().slice(0, 8)
                                                    )}>
                                                    Presente
                                                </button>

                                                <button
                                                    disabled={student.status === "Inativo"}
                                                    onClick={() => markFrequency(
                                                        student.student_id,
                                                        false
                                                    )}>
                                                    Ausente
                                                </button>
                                            </>
                                        )
                                    }
                                </div>
                            </li>
                        ))
                        }
                    </ul>
                </section>
            </div>
        </div>
    )
}

export default Frequency