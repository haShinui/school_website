import React, { useEffect, useState } from 'react';
import apiService from '../services/apiService'; // Ensure the path is correctly adjusted

interface User {
    username: string;
    role: string;
}

const ManagerDashboard: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await apiService.fetchManagerDashboard();
                if (response.data && Array.isArray(response.data)) {
                    setUsers(response.data); // Assuming the data is directly an array of users
                } else {
                    console.error('Unexpected response structure:', response.data);
                }
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        fetchUsers();
    }, []);

    return (
        <div>
            <h1>Manager Dashboard</h1>
            {users.length > 0 ? (
                <ul>
                    {users.map(user => (
                        <li key={user.username}>
                            {user.username} - {user.role}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No users to display.</p>
            )}
        </div>
    );
};

export default ManagerDashboard;
