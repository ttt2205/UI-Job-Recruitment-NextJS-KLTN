'use client';

import { Check, TrendingUp, Clock, Star } from 'lucide-react';
import { useState } from 'react';

export default function PackageCard({ pkg, onPurchase, isActive = false, userRole }) {
    const [loading, setLoading] = useState(false);

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(amount);
    };

    const handlePurchase = async () => {
        setLoading(true);
        try {
            await onPurchase(pkg.id);
        } finally {
            setLoading(false);
        }
    };

    const getFeatures = () => {
        if (userRole === 'employer') {
            return [
                { label: 'Đăng tin tuyển dụng', value: pkg.jobPostLimit },
                { label: 'Tin nổi bật', value: pkg.highlightJobLimit },
                { label: 'Thời hạn', value: pkg.isLifetime ? 'Vĩnh viễn' : `${pkg.durationDay} ngày` }
            ];
        } else {
            return [
                { label: 'Lượt ứng tuyển', value: pkg.jobApplyLimit },
                { label: 'Nổi bật hồ sơ', value: `${pkg.highlightProfileDays} ngày` },
                { label: 'Xem ứng viên khác', value: pkg.canViewOtherCandidates ? 'Có' : 'Không' },
                { label: 'Thời hạn', value: pkg.isLifetime ? 'Vĩnh viễn' : `${pkg.durationDay} ngày` }
            ];
        }
    };

    return (
        <div className={`package-card-dashboard ${isActive ? 'active' : ''}`}>
            {isActive && (
                <div className="active-badge">
                    <Star size={14} />
                    Gói hiện tại
                </div>
            )}

            <div className="package-header">
                <h3>{pkg.name}</h3>
                <div className="package-price">
                    <span className="amount">{formatCurrency(pkg.price)}</span>
                </div>
            </div>

            <p className="package-description">{pkg.description}</p>

            <div className="package-features">
                {getFeatures().map((feature, index) => (
                    <div key={index} className="feature-item">
                        <Check size={16} className="check-icon" />
                        <span>{feature.label}: <strong>{feature.value}</strong></span>
                    </div>
                ))}
            </div>

            <button 
                className={`btn-package ${isActive ? 'btn-active' : 'btn-purchase'}`}
                onClick={handlePurchase}
                disabled={loading || isActive}
            >
                {loading ? 'Đang xử lý...' : isActive ? 'Đang sử dụng' : 'Mua gói'}
            </button>
        </div>
    );
}