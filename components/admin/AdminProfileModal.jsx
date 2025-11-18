"use client";

import { Calendar, Edit2, Mail, MapPin, Phone, X } from "lucide-react";
import { useState } from "react";

export function AdminProfileModal({ adminData, onClose, onUpdate }) {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState(adminData);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate(formData);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setFormData(adminData);
        setIsEditing(false);
    };

    return (
        <div className="admin-modal-overlay" onClick={onClose}>
            <div className="admin-modal-content" onClick={(e) => e.stopPropagation()}>
                {/* Modal Header */}
                <div className="admin-modal-header">
                    <h2 className="admin-modal-title">
                        {isEditing ? 'Chỉnh sửa thông tin' : 'Thông tin tài khoản'}
                    </h2>
                    <button
                        className="admin-modal-close"
                        onClick={onClose}
                        aria-label="Close"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Modal Body */}
                <div className="admin-modal-body">
                    {isEditing ? (
                        <form onSubmit={handleSubmit} className="admin-profile-form">
                            <div className="form-group-admin">
                                <label htmlFor="name">Họ và tên</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group-admin">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group-admin">
                                <label htmlFor="phone">Số điện thoại</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group-admin">
                                <label htmlFor="address">Địa chỉ</label>
                                <input
                                    type="text"
                                    id="address"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group-admin">
                                <label htmlFor="role">Chức vụ</label>
                                <input
                                    type="text"
                                    id="role"
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                    disabled
                                />
                            </div>

                            <div className="form-actions-admin">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={handleCancel}
                                >
                                    Hủy
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                >
                                    Lưu thay đổi
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div className="admin-profile-view">
                            <div className="profile-avatar-section">
                                <img
                                    src={adminData.avatar}
                                    alt={adminData.name}
                                    className="profile-avatar-large"
                                />
                                <div className="profile-status">
                                    <span className={`status-badge status-${adminData.status}`}>
                                        {adminData.status === 'active' ? 'Hoạt động' : 'Không hoạt động'}
                                    </span>
                                </div>
                            </div>

                            <div className="profile-info-grid">
                                <div className="profile-info-item">
                                    <span className="info-label">Họ và tên</span>
                                    <span className="info-value">{adminData.name}</span>
                                </div>

                                <div className="profile-info-item">
                                    <Mail size={16} className="info-icon" />
                                    <div>
                                        <span className="info-label">Email</span>
                                        <span className="info-value">{adminData.email}</span>
                                    </div>
                                </div>

                                <div className="profile-info-item">
                                    <Phone size={16} className="info-icon" />
                                    <div>
                                        <span className="info-label">Số điện thoại</span>
                                        <span className="info-value">{adminData.phone}</span>
                                    </div>
                                </div>

                                <div className="profile-info-item">
                                    <MapPin size={16} className="info-icon" />
                                    <div>
                                        <span className="info-label">Địa chỉ</span>
                                        <span className="info-value">{adminData.address}</span>
                                    </div>
                                </div>

                                <div className="profile-info-item">
                                    <span className="info-label">Chức vụ</span>
                                    <span className="info-value">{adminData.role}</span>
                                </div>

                                <div className="profile-info-item">
                                    <Calendar size={16} className="info-icon" />
                                    <div>
                                        <span className="info-label">Ngày tham gia</span>
                                        <span className="info-value">
                                            {new Date(adminData.joinDate).toLocaleDateString('vi-VN')}
                                        </span>
                                    </div>
                                </div>

                                <div className="profile-info-item">
                                    <span className="info-label">Đăng nhập lần cuối</span>
                                    <span className="info-value">
                                        {new Date(adminData.lastLogin).toLocaleDateString('vi-VN')}
                                    </span>
                                </div>
                            </div>

                            <div className="profile-permissions">
                                <h3>Quyền hạn</h3>
                                <div className="permissions-list">
                                    {adminData.permissions.map((permission, index) => (
                                        <span key={index} className="permission-badge">
                                            {permission}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Modal Footer */}
                {!isEditing && (
                    <div className="admin-modal-footer">
                        <button
                            className="btn btn-primary btn-with-icon"
                            onClick={() => setIsEditing(true)}
                        >
                            <Edit2 size={18} />
                            Chỉnh sửa thông tin
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}