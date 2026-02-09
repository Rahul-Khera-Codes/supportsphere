import { useState, useEffect } from 'react';
import axios from 'axios';

const TicketManagement = () => {
    const [tickets, setTickets] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const response = await axios.get('/api/tickets');
                setTickets(response.data);
            } catch (err) {
                setError('Failed to fetch tickets');
            } finally {
                setLoading(false);
            }
        };
        fetchTickets();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title || !description) {
            setError('Title and description are required');
            return;
        }
        try {
            const response = await axios.post('/api/tickets', { title, description });
            setTickets([...tickets, response.data]);
            setTitle('');
            setDescription('');
            setError(null);
        } catch (err) {
            setError('Failed to create ticket');
        }
    };

    const handleUpdate = async (id) => {
        const updatedDescription = prompt('Update description:');
        if (!updatedDescription) return;
        try {
            const response = await axios.put(`/api/tickets/${id}`, { description: updatedDescription });
            setTickets(tickets.map(ticket => (ticket.id === id ? response.data : ticket)));
        } catch (err) {
            setError('Failed to update ticket');
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/tickets/${id}`);
            setTickets(tickets.filter(ticket => ticket.id !== id));
        } catch (err) {
            setError('Failed to delete ticket');
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h1>Support Ticket Management</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Ticket Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Ticket Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                <button type="submit">Create Ticket</button>
            </form>
            <ul>
                {tickets.map(ticket => (
                    <li key={ticket.id}>
                        <h2>{ticket.title}</h2>
                        <p>{ticket.description}</p>
                        <button onClick={() => handleUpdate(ticket.id)}>Update</button>
                        <button onClick={() => handleDelete(ticket.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TicketManagement;