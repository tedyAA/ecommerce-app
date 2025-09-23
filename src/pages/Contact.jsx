import React, { useState } from "react";
import Hero from "../components/global/Hero.jsx";
import {assets} from "../assets/assets.js";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
        alert("Message sent!");
        setFormData({ name: "", email: "", message: "" });
    };

    return (
        <div>
            <Hero heroImg={assets.hero_contacts} page='Contacts'/>
            <div className="min-h-screen flex flex-col items-center py-10 px-4">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">Contact Us</h1>

                <div className="flex flex-col md:flex-row gap-10 w-full max-w-6xl">
                    {/* Contact Details */}
                    <div className="flex-1 bg-white rounded-2xl shadow-md p-6">
                        <h2 className="text-xl font-semibold mb-4">Get in Touch</h2>
                        <p className="text-gray-600 mb-6">
                            Fill out the form or use the contact details below to reach us.
                        </p>

                        <div className="space-y-4 text-gray-700">
                            <p>
                                <strong>Email:</strong> contact@example.com
                            </p>
                            <p>
                                <strong>Phone:</strong> +1 234 567 890
                            </p>
                            <p>
                                <strong>Address:</strong> 123 Main Street, City, Country
                            </p>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="flex-1 bg-white rounded-2xl shadow-md p-6">
                        <h2 className="text-xl font-semibold mb-4">Send a Message</h2>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Your Name"
                                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                required
                            />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Your Email"
                                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                required
                            />
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Your Message"
                                rows="5"
                                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                required
                            ></textarea>
                            <button
                                type="submit"
                                className="bg-blue-600 text-white rounded-lg py-2 px-4 hover:bg-blue-700 transition"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
