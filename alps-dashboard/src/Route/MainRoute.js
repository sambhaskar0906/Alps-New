import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '../modules/Layout/Layout';
import Dashboard from '../modules/Dashboard';
import ClientList from '../modules/Clients/ClientList';
import ClientProfile from '../modules/Clients/ClientProfile';
import ProjectList from '../modules/Projects/ProjectList';
import ProjectForm from '../modules/Projects/ProjectForm';
import TicketList from '../modules/Tickets/TicketList';
import TicketForm from '../modules/Tickets/TicketForm';
import Login from '../Pages/Login';
import Register from '../Pages/Register';
import ProtectedRoute from '../Route/ProtectedRoute';
import ClientForm from '../modules/Clients/ClientForm';
import ProjectProfile from '../modules/Projects/ProjectProfile';
import EditProjectForm from '../modules/Projects/EditProjectForm';
import TicketProfile from '../modules/Tickets/TicketProfile';
import EditTicketForm from '../modules/Tickets/EditTicketForm';
import ChangePassword from '../Pages/ChangePassword';
import AddClient from '../modules/Clients/AddClient';
import ClientView from '../modules/Clients/ClientView';

const MainRoute = () => {
    const role = localStorage.getItem('role'); // assumes 'Admin' or 'Client'

    return (
        <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
                <Route element={<Layout />}>

                    {/* Common Route */}
                    <Route path="/" element={<Dashboard />} />

                    {/* Admin-only Routes */}
                    {role === 'Admin' && (
                        <>
                            <Route path="/clients" element={<ClientList />} />
                            <Route path="/clients/add" element={<AddClient />} />
                            <Route path="/clients/:user_id" element={<ClientProfile />} />
                            <Route path="/clients/edit/:user_id" element={<ClientForm />} />
                        </>
                    )}

                    {/* Client-only Route */}
                    {role === 'Client' && (
                        <Route path="/client-view" element={<ClientView />} />
                    )}

                    {/* Common to both roles */}
                    <Route path="/projects" element={<ProjectList />} />
                    <Route path="/projects/new" element={<ProjectForm />} />
                    <Route path="/projects/edit/:projectId" element={<EditProjectForm />} />
                    <Route path="/projects/:projectId" element={<ProjectProfile />} />
                    <Route path="/tickets" element={<TicketList />} />
                    <Route path="/tickets/new" element={<TicketForm />} />
                    <Route path="/tickets/edit/:ticket_id" element={<EditTicketForm />} />
                    <Route path="/tickets/:ticketId" element={<TicketProfile />} />
                    <Route path="/change-password" element={<ChangePassword />} />

                </Route>
            </Route>
        </Routes>
    );
};

export default MainRoute;
