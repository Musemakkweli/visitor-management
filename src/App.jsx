
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom'

import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/AdminDashboard'
import VisitorDashboard from './pages/VisitorDashboard'
import RequestVisit from './pages/RequestVisit'
import MyRequests from './pages/MyRequests'
import VisitorProfile from './pages/VisitorProfile'
import Visitors from './pages/Visitors'
import VisitRequests from './pages/VisitRequests'
import VisitHistory from './pages/VisitHistory'
import Settings from './pages/Settings'
import VisitorResponses from './pages/VisitorResponses'
import ReceptionistDashboard from './pages/ReceptionistDashboard';
import ReceptionistRegisterVisitor from './pages/ReceptionistRegisterVisitor';
import ReceptionistCheckIn from "./pages/ReceptionistCheckIn";
import ReceptionistCheckOut from "./pages/ReceptionistCheckOut";
import ReceptionistVisitHistory from "./pages/ReceptionistVisitHistory";
import ReceptionistRequests from './pages/ReceptionistRequests';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/visitor/dashboard" element={<VisitorDashboard />} />
        <Route path="/visitor/request" element={<RequestVisit />} />
        <Route path="/visitor/requests" element={<MyRequests />} />
        <Route path="/visitor/profile" element={<VisitorProfile />} />
        <Route path="/visitor/responses" element={<VisitorResponses />} />

        <Route path="/admin/visitors" element={<Visitors />} />
        <Route path="/admin/requests" element={<VisitRequests />} />
        <Route path="/admin/history" element={<VisitHistory />} />
        <Route path="/admin/settings" element={<Settings />} />

        <Route path="/receptionist/dashboard" element={<ReceptionistDashboard />}/>
        <Route path="/receptionist/register" element={<ReceptionistRegisterVisitor />}/>
        <Route path="/receptionist/check-in" element={<ReceptionistCheckIn />}/>
        <Route path="/receptionist/check-out" element={<ReceptionistCheckOut />}/>
        <Route path="/receptionist/history" element={<ReceptionistVisitHistory />}/>\
        <Route path="/receptionist/requests" element={<ReceptionistRequests />}/>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
