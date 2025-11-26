'use client';

import { useState, useEffect } from 'react';
import { X, TrendingUp, AlertCircle } from 'lucide-react';

export default function UpgradeModal({ 
    currentPackage, 
    newPackage, 
    onClose, 
    onConfirm, 
    calculateUpgrade,
    userRole 
}) {
    const [upgradeInfo, setUpgradeInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [confirming, setConfirming] = useState(false);

    useEffect(() => {
        if (newPackage) {
            fetchUpgradeInfo();
        }
    }, [newPackage]);

    const fetchUpgradeInfo = async () => {
        setLoading(true);
        try {
            const res = await calculateUpgrade(newPackage.id);
            setUpgradeInfo(res);
        } catch (error) {
            console.error('Error calculating upgrade:', error);
        } finally {
            setLoading(false);
        }
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(amount);
    };

    const handleConfirm = async () => {
        setConfirming(true);
        try {
            await onConfirm(newPackage.id);
        } finally {
            setConfirming(false);
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content upgrade-modal" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <div className="header-icon">
                        <TrendingUp size={24} />
                    </div>
                    <h2>Nâng cấp gói dịch vụ</h2>
                    <button className="btn-close" onClick={onClose}>
                        <X size={24} />
                    </button>
                </div>

                {loading ? (
                    <div className="modal-body loading-state">
                        <p>Đang tính toán chi phí nâng cấp...</p>
                    </div>
                ) : upgradeInfo ? (
                    <div className="modal-body">
                        {/* Current vs New Package */}
                        <div className="package-comparison">
                            <div className="package-box current">
                                <span className="package-label">Gói hiện tại</span>
                                <h3>{upgradeInfo.oldPackageName}</h3>
                                <div className="package-price">
                                    {formatCurrency(upgradeInfo.oldPackagePrice)}
                                </div>
                            </div>

                            <div className="arrow-icon">→</div>

                            <div className="package-box new">
                                <span className="package-label">Gói mới</span>
                                <h3>{upgradeInfo.newPackageName}</h3>
                                <div className="package-price">
                                    {formatCurrency(upgradeInfo.newPackagePrice)}
                                </div>
                            </div>
                        </div>

                        {/* Calculation Details */}
                        <div className="calculation-details">
                            <h4>Chi tiết tính toán</h4>
                            
                            <div className="calc-item">
                                <span>Giá gói mới</span>
                                <span>{formatCurrency(upgradeInfo.newPackagePrice)}</span>
                            </div>

                            <div className="calc-item refund">
                                <span>
                                    Hoàn trả từ gói cũ 
                                    <small>({upgradeInfo.refundPercent.toFixed(1)}% chưa sử dụng)</small>
                                </span>
                                <span className="refund-amount">
                                    - {formatCurrency(upgradeInfo.refundValue)}
                                </span>
                            </div>

                            <div className="calc-divider"></div>

                            <div className="calc-item total">
                                <span>Tổng thanh toán</span>
                                <span className="total-amount">
                                    {formatCurrency(upgradeInfo.finalPrice)}
                                </span>
                            </div>
                        </div>

                        {/* Warning */}
                        <div className="upgrade-warning">
                            <AlertCircle size={20} />
                            <div>
                                <strong>Lưu ý:</strong> Sau khi nâng cấp, quota sử dụng sẽ được reset về 0 
                                theo gói mới. Bạn sẽ có đầy đủ quyền lợi của gói mới.
                            </div>
                        </div>

                        {/* Message */}
                        {upgradeInfo.message && (
                            <p className="upgrade-message">{upgradeInfo.message}</p>
                        )}
                    </div>
                ) : (
                    <div className="modal-body error-state">
                        <p>Không thể tính toán chi phí nâng cấp</p>
                    </div>
                )}

                <div className="modal-footer">
                    <button 
                        className="btn-secondary" 
                        onClick={onClose}
                        disabled={confirming}
                    >
                        Hủy
                    </button>
                    <button 
                        className="btn-primary"
                        onClick={handleConfirm}
                        disabled={loading || confirming || !upgradeInfo}
                    >
                        {confirming ? 'Đang xử lý...' : 'Xác nhận nâng cấp'}
                    </button>
                </div>
            </div>
        </div>
    );
}