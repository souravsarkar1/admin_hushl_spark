import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Experiences from '../pages/Experiences/Experiences'
import Login from '../pages/Login/Login'
import ReportedUser from "../pages/Reported_User/ReportedUser";
import FemalePage from '../pages/Verify_User/FemalePage';
import MalePage from '../pages/Verify_User/MalePage';
import BinaryPage from '../pages/Verify_User/BinaryPage';
import UpdateExperience from '../pages/Experiences/ExperiencesComponents/UpdateExperience';
import { PrivateRoute } from './PrivateRoute';
import Booking from '../pages/BookedExperience/BookingExperience';
// import Booking from '../pages/BookingExperience/BookingExperience';

const AllRouter = () => {
  return (
    <div>
      <Routes>
        <Route path='/experience' element={<PrivateRoute><Experiences /></PrivateRoute>} />
        <Route path='/update/experience/:id' element={<PrivateRoute><UpdateExperience /></PrivateRoute>} />
        <Route path='/reported' element={<ReportedUser />} />
        <Route path='/' element={<Login />} />
        <Route path="/female" element={<FemalePage />} />
        <Route path="/male" element={<MalePage />} />
        <Route path="/binary" element={<BinaryPage />} />
        <Route path='/booking' element={<Booking/>}/>
      </Routes>

    </div>
  )
}

export default AllRouter