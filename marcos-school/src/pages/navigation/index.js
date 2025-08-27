import { Routes, Route } from 'react-router-dom'
import Login from '../../App'
import Home from '../Home'
import CreateClass from '../CreateClasses'
import AddStudent from '../AddStudent'
import ClassControl from '../ClassControl'

export default function AppRoutes() {

    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/createclass" element={<CreateClass />} />
            <Route path="/classcontrol" element={<ClassControl />} />
            <Route path="/addstudent" element={<AddStudent />} />
        </Routes>
    )
}