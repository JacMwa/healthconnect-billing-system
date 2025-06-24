import { useEffect, useState } from 'react';

const Appointments = () => {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/appointments') // Fetching from backend API
            .then(response => response.json())
            .then(data => setAppointments(data)) // Storing data in state
            .catch(error => console.error('Error fetching appointments:', error));
    }, []);

    return (
        <div>
            <h2>Appointments</h2>
            <ul>
                {appointments.map((appointment) => (
                    <li key={appointment.id}>
                        {appointment.patient_name} - {appointment.doctor_name} - {appointment.date}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Appointments;
