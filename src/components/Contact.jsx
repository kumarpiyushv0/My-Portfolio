import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState('');
    const [statusColor, setStatusColor] = useState('');
    const [loading, setLoading] = useState(false);

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

        setLoading(true);
        setStatus("Sending...");
        setStatusColor("gray");

        try {
            // 1. Save to Supabase Database
            const { error: dbError } = await supabase
                .from('contact_messages')
                .insert([{ name, email, message }]);

            if (dbError) {
                console.error("Database insert error:", dbError);
            }

            // 2. Send email notification via Supabase Edge Function (Resend)
            const { error: fnError } = await supabase.functions.invoke('send-contact-email', {
                body: { name, email, message }
            });

            if (fnError && dbError) {
                throw fnError;
            }

            setStatus("Message sent successfully!");
            setStatusColor("green");
            setFormData({ name: '', email: '', message: '' });
        } catch (err) {
            console.error("Error sending message:", err);
            setStatus("An error occurred. Please try again.");
            setStatusColor("red");
        } finally {
            setLoading(false);
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
                <button className="btn" type="submit" disabled={loading}>
                    {loading ? "Sending..." : "Send"}
                </button>
            </form>
            <p id="responseMessage" style={{ marginTop: '10px', color: statusColor }}>{status}</p>
        </section>
    );
};

export default Contact;
