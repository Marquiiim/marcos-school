import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"

import styles from '../../sass/Frequency.module.css'

function Frequency() {

    const [studentsData, setStudentsData] = useState([])
    const { class_id } = useParams()

    useEffect(() => {
        const fetchStudentsInClass = async () => {
            try {
                const response = await axios.post(`http://localhost:5000/api/studentsinclass`, {
                    class_id: class_id
                })
                setStudentsData(response.data)
                console.log(response.data)
            } catch (err) {
                console.error(`[ERRO] ${err.message}`)
            }
        }
        fetchStudentsInClass()
    }, [class_id])

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h2>
                    Frequência turma:
                </h2>

                <section className={styles.content_students}>
                    <ul>
                        {studentsData.map((student) => (
                            <li key={student.id}>
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
                                    <button>
                                    </button>
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