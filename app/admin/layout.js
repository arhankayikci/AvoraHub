"use client";

import './admin-global.css';

export default function AdminLayout({ children }) {
    return (
        <div className="admin-wrapper">
            {children}
        </div>
    );
}
