import React, { useState } from 'react';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState('');
    const [statusColor, setStatusColor] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, message } = formData;

        if (!name || !email || !message) {
            setStatus("Please fill out all fields.");
            setStatusColor("red");
            return;
        }

        try {
            // Use relative path for Vercel and local dev (via proxy)
            const API_URL = "/api";
            const response = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, message }),
            });

            const result = await response.json();

            if (response.ok) {
                setStatus(result.message);
                setStatusColor("green");
                setFormData({ name: '', email: '', message: '' });
            } else {
                setStatus(result.error || "Failed to send message.");
                setStatusColor("red");
            }
        } catch (err) {
            console.error("Error:", err);
            setStatus("An error occurred. Please try again.");
            setStatusColor("red");
        }
    };

    return (
        <section id="contact">
            <h2>Contact Me</h2>
            <form id="contactForm" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                />
                <textarea
                    name="message"
                    rows="5"
                    placeholder="Message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                ></textarea>
                <button className="btn" type="submit">Send</button>
            </form>
            <p id="responseMessage" style={{ marginTop: '10px', color: statusColor }}>{status}</p>
        </section>
    );
};

export default Contact;
