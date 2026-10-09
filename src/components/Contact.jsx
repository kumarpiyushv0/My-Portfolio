import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { trackEvent, trackButtonClick, identifyVisitor } from '../analytics';

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
            identifyVisitor(name, email);
            trackEvent('contact_form_submitted', {
                visitor_name: name,
                visitor_email: email,
            });
        } catch (err) {
            console.error("Error sending message:", err);
            setStatus("An error occurred. Please try again.");
            setStatusColor("red");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="contact" data-analytics-section="contact">
            <h2>Contact Me</h2>
            <form id="contactForm" name="contact-form" data-analytics-id="contact-form" onSubmit={handleSubmit}>
                <input
                    id="input-contact-name"
                    type="text"
                    name="name"
                    data-analytics-id="input-contact-name"
                    placeholder="Name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                />
                <input
                    id="input-contact-email"
                    type="email"
                    name="email"
                    data-analytics-id="input-contact-email"
                    placeholder="Email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                />
                <textarea
                    id="textarea-contact-message"
                    name="message"
                    data-analytics-id="textarea-contact-message"
                    rows="5"
                    placeholder="Message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                ></textarea>
                <button
                    id="btn-contact-submit"
                    name="contact-submit-button"
                    data-analytics-id="btn-contact-submit"
                    className="btn"
                    type="submit"
                    disabled={loading}
                    onClick={() => trackButtonClick('btn-contact-submit', 'Contact Submit Button')}
                >
                    {loading ? "Sending..." : "Send"}
                </button>
            </form>
            <p id="responseMessage" style={{ marginTop: '10px', color: statusColor }}>{status}</p>
        </section>
    );
};

export default Contact;
