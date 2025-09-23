import { Routes, Route } from 'react-router-dom'

import Login from '../../App'
import Home from '../Home'
import CreateClass from '../class/CreateClasses'
import AddStudent from '../class/AddStudent'
import ClassControl from '../class/ClassControl'
import EditClass from '../class/EditClass'

export default function AppRoutes() {

    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/createclass" element={<CreateClass />} />
            <Route path="/classcontrol" element={<ClassControl />} />

            <Route path="/addstudent/:class_id" element={<AddStudent />} />
            <Route path="/editclass/:class_id" element={<EditClass />} />
        </Routes>
    )
}