'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export default function PackageModal({ type, package: pkg, onClose, onSave }) {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        durationDay: '',
        isLifetime: false,
        // Employer specific
        jobPostLimit: '',
        highlightJobLimit: '',
        // Candidate specific
        highlightProfileDays: '',
        jobApplyLimit: '',
        canViewOtherCandidates: false
    });

    useEffect(() => {
        if (pkg) {
            setFormData({
                name: pkg.name || '',
                description: pkg.description || '',
                price: pkg.price || '',
                durationDay: pkg.durationDay || '',
                isLifetime: pkg.isLifetime || false,
                jobPostLimit: pkg.jobPostLimit || '',
                highlightJobLimit: pkg.highlightJobLimit || '',
                highlightProfileDays: pkg.highlightProfileDays || '',
                jobApplyLimit: pkg.jobApplyLimit || '',
                canViewOtherCandidates: pkg.canViewOtherCandidates || false
            });
        }
    }, [pkg]);

    const handleChange = (e) => {
        const { name, value, type: inputType, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: inputType === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Validate
        if (!formData.name || !formData.price) {
            alert('Vui lòng điền đầy đủ thông tin');
            return;
        }

        // Prepare data
        const dataToSend = {
            name: formData.name,
            description: formData.description,
            price: parseFloat(formData.price),
            isLifetime: formData.isLifetime,
            ...(formData.isLifetime ? {} : { durationDay: parseInt(formData.durationDay) || 30 })
        };

        if (type === 'employer') {
            dataToSend.jobPostLimit = parseInt(formData.jobPostLimit) || 0;
            dataToSend.highlightJobLimit = parseInt(formData.highlightJobLimit) || 0;
        } else {
            dataToSend.highlightProfileDays = parseInt(formData.highlightProfileDays) || 0;
            dataToSend.jobApplyLimit = parseInt(formData.jobApplyLimit) || 0;
            dataToSend.canViewOtherCandidates = formData.canViewOtherCandidates;
        }

        onSave(dataToSend);
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content package-modal" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>{pkg ? 'Chỉnh sửa gói' : 'Tạo gói mới'} - {type === 'employer' ? 'Doanh nghiệp' : 'Ứng viên'}</h2>
                    <button className="btn-close" onClick={onClose}>
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="modal-body">
                    {/* Basic Info */}
                    <div className="form-section">
                        <h3>Thông tin cơ bản</h3>
                        
                        <div className="form-group">
                            <label>Tên gói *</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="VD: Gói Premium"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Mô tả</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Mô tả chi tiết về gói dịch vụ"
                                rows={3}
                            />
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
                                <span>Gói vĩnh viễn</span>
                            </label>
                        </div>
                    </div>

                    {/* Package Features */}
                    <div className="form-section">
                        <h3>Quyền lợi</h3>
                        
                        {type === 'employer' ? (
                            <>
                                <div className="form-group">
                                    <label>Số lượng tin đăng tuyển</label>
                                    <input
                                        type="number"
                                        name="jobPostLimit"
                                        value={formData.jobPostLimit}
                                        onChange={handleChange}
                                        placeholder="0"
                                        min="0"
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Số lượng tin nổi bật</label>
                                    <input
                                        type="number"
                                        name="highlightJobLimit"
                                        value={formData.highlightJobLimit}
                                        onChange={handleChange}
                                        placeholder="0"
                                        min="0"
                                    />
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="form-group">
                                    <label>Số lượt ứng tuyển</label>
                                    <input
                                        type="number"
                                        name="jobApplyLimit"
                                        value={formData.jobApplyLimit}
                                        onChange={handleChange}
                                        placeholder="0"
                                        min="0"
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Số ngày nổi bật hồ sơ</label>
                                    <input
                                        type="number"
                                        name="highlightProfileDays"
                                        value={formData.highlightProfileDays}
                                        onChange={handleChange}
                                        placeholder="0"
                                        min="0"
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="checkbox-label">
                                        <input
                                            type="checkbox"
                                            name="canViewOtherCandidates"
                                            checked={formData.canViewOtherCandidates}
                                            onChange={handleChange}
                                        />
                                        <span>Cho phép xem hồ sơ ứng viên khác</span>
                                    </label>
                                </div>
                            </>
                        )}
                    </div>

                    <div className="modal-footer">
                        <button type="button" className="btn-secondary" onClick={onClose}>
                            Hủy
                        </button>
                        <button type="submit" className="btn-primary">
                            {pkg ? 'Cập nhật' : 'Tạo mới'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}