'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export default function AddOnModal({ addOn, onClose, onSave }) {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        type: 'JOB_POST',
        quantity: '',
        durationDay: '',
        isLifetime: false
    });

    useEffect(() => {
        if (addOn) {
            setFormData({
                name: addOn.name || '',
                description: addOn.description || '',
                price: addOn.price || '',
                type: addOn.type || 'JOB_POST',
                quantity: addOn.quantity || '',
                durationDay: addOn.durationDay || '',
                isLifetime: addOn.isLifetime || false
            });
        }
    }, [addOn]);

    const handleChange = (e) => {
        const { name, value, type: inputType, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: inputType === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!formData.name || !formData.price || !formData.quantity) {
            alert('Vui lòng điền đầy đủ thông tin');
            return;
        }

        const dataToSend = {
            name: formData.name,
            description: formData.description,
            price: parseFloat(formData.price),
            type: formData.type,
            quantity: parseInt(formData.quantity),
            isLifetime: formData.isLifetime,
            ...(formData.isLifetime ? {} : { durationDay: parseInt(formData.durationDay) || 30 })
        };

        onSave(dataToSend);
    };

    const addOnTypes = [
        { value: 'JOB_POST', label: 'Đăng tin tuyển dụng' },
        { value: 'HIGHLIGHT', label: 'Làm nổi bật tin' },
        { value: 'CV_VIEW', label: 'Xem CV ứng viên' }
    ];

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content package-modal" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>{addOn ? 'Chỉnh sửa Add-on' : 'Tạo Add-on mới'}</h2>
                    <button className="btn-close" onClick={onClose}>
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="modal-body">
                    <div className="form-section">
                        <h3>Thông tin Add-on</h3>
                        
                        <div className="form-group">
                            <label>Tên Add-on *</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="VD: Gói 5 tin nổi bật"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Mô tả</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Mô tả chi tiết"
                                rows={3}
                            />
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Loại Add-on *</label>
                                <select
                                    name="type"
                                    value={formData.type}
                                    onChange={handleChange}
                                    required
                                >
                                    {addOnTypes.map(type => (
                                        <option key={type.value} value={type.value}>
                                            {type.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Số lượng *</label>
                                <input
                                    type="number"
                                    name="quantity"
                                    value={formData.quantity}
                                    onChange={handleChange}
                                    placeholder="0"
                                    min="1"
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Giá (VNĐ) *</label>
                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    placeholder="0"
                                    min="0"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Thời hạn (ngày)</label>
                                <input
                                    type="number"
                                    name="durationDay"
                                    value={formData.durationDay}
                                    onChange={handleChange}
                                    placeholder="30"
                                    min="1"
                                    disabled={formData.isLifetime}
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="checkbox-label">
                                <input
                                    type="checkbox"
                                    name="isLifetime"
                                    checked={formData.isLifetime}
                                    onChange={handleChange}
                                />
                                <span>Không giới hạn thời gian</span>
                            </label>
                        </div>
                    </div>

                    <div className="modal-footer">
                        <button type="button" className="btn-secondary" onClick={onClose}>
                            Hủy
                        </button>
                        <button type="submit" className="btn-primary">
                            {addOn ? 'Cập nhật' : 'Tạo mới'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}