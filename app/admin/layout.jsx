'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import {
    Users,
    Building2,
    Wrench,
    BarChart3,
    Bell,
    LogOut,
    X,
    Edit2,
    Mail,
    Phone,
    MapPin,
    Calendar,
} from 'lucide-react';
import { AdminProfileModal } from '@/components/admin/AdminProfileModal';

export default function AdminLayout({ children }) {
    const pathname = usePathname();
    const router = useRouter();
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [adminData, setAdminData] = useState({
        id: 1,
        name: 'Admin User',
        email: 'admin@example.com',
        phone: '+84 912 345 678',
        role: 'Administrator',
        status: 'active',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin',
        address: 'Ho Chi Minh City, Vietnam',
        joinDate: '2024-01-15',
        lastLogin: '2025-10-12',
        permissions: ['Manage Users', 'Manage Jobs', 'View Statistics', 'Manage Services']
    });

    const menuItems = [
        {
            label: 'Ứng cử viên',
            icon: Users,
            href: '/admin/candidate',
        },
        {
            label: 'Doanh nghiệp',
            icon: Building2,
            href: '/admin/employer',
        },
        {
            label: 'Dịch vụ',
            icon: Wrench,
            href: '/admin/services',
        },
        {
            label: 'Thống kê',
            icon: BarChart3,
            href: '/admin/statistics',
        },
    ];

    const currentPageTitle = menuItems
        .filter((item) => pathname === item.href || pathname.startsWith(item.href + '/'))
        .sort((a, b) => b.href.length - a.href.length)[0]?.label || "";

    const isActive = (href) => {
        return pathname === href || pathname.startsWith(href + '/');
    };

    const handleUpdateProfile = (updatedData) => {
        setAdminData(updatedData);
        setShowProfileModal(false);
    };

    const handleLogout = () => {
        router.push('/login');
    };

    return (
        <div className="admin-layout">
            {/* Sidebar */}
            <aside className="admin-sidebar">
                <div className="admin-sidebar-header">
                    <h1 className="admin-logo">ADMIN</h1>
                </div>

                <nav className="admin-menu">
                    {menuItems.map((item) => {
                        const IconComponent = item.icon;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`admin-menu-link ${isActive(item.href) ? 'admin-menu-link-active' : ''}`}
                            >
                                <IconComponent size={20} className="admin-menu-icon" />
                                <span className="admin-menu-label">{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>
            </aside>

            {/* Main Content */}
            <div className="admin-main">
                {/* Header */}
                <header className="admin-header">
                    <div className="admin-header-left">
                        <h2 className="admin-page-title">{currentPageTitle}</h2>
                    </div>
                    <div className="admin-header-right">
                        <button className="admin-btn-notification">
                            <Bell size={20} />
                            <span className="admin-badge"></span>
                        </button>
                        <div
                            className="admin-user-profile"
                            onClick={() => setShowProfileModal(true)}
                            role="button"
                            tabIndex={0}
                        >
                            <img src={adminData.avatar} alt={adminData.name} />
                            <span>{adminData.name}</span>
                        </div>
                        <button
                            className="admin-btn-logout"
                            onClick={handleLogout}
                            title="Logout"
                        >
                            <LogOut size={20} />
                        </button>
                    </div>
                </header>

                {/* Content */}
                <main className="admin-content">{children}</main>
            </div>

            {/* Profile Modal */}
            {showProfileModal && (
                <AdminProfileModal
                    adminData={adminData}
                    onClose={() => setShowProfileModal(false)}
                    onUpdate={handleUpdateProfile}
                />
            )}
        </div>
    );
}