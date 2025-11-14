'use client';

import { 
    Package, 
    TrendingUp, 
    Calendar,
    CheckCircle,
    XCircle,
    AlertCircle
} from 'lucide-react';

export default function SubscriptionUsage({ subscription, usage, userRole }) {
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('vi-VN');
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(amount);
    };

    const getStatusBadge = (status) => {
        const statusConfig = {
            ACTIVE: { color: 'green', text: 'Đang hoạt động', icon: CheckCircle },
            EXPIRED: { color: 'red', text: 'Đã hết hạn', icon: XCircle },
            SUSPENDED: { color: 'orange', text: 'Tạm ngưng', icon: AlertCircle },
            QUEUED: { color: 'blue', text: 'Đang chờ', icon: AlertCircle }
        };

        const config = statusConfig[status] || statusConfig.EXPIRED;
        const Icon = config.icon;

        return (
            <span className={`status-badge status-${config.color}`}>
                <Icon size={14} />
                {config.text}
            </span>
        );
    };

    const renderProgressBar = (used, total, label) => {
        const percentage = total > 0 ? (used / total) * 100 : 0;
        const remaining = total - used;
        
        return (
            <div className="stat-item">
                <h4>{label}</h4>
                <div className="progress-container">
                    <div className="progress-info">
                        <span>Đã dùng: {used}/{total}</span>
                        <span>Còn lại: {remaining}</span>
                    </div>
                    <div className="progress-bar">
                        <div 
                            className="progress-fill"
                            style={{ 
                                width: `${percentage}%`,
                                backgroundColor: percentage > 80 ? '#ef4444' : percentage > 50 ? '#f59e0b' : '#10b981'
                            }}
                        ></div>
                    </div>
                </div>
            </div>
        );
    };

    if (!subscription) {
        return (
            <div className="no-subscription">
                <Package size={48} />
                <h3>Chưa có gói dịch vụ</h3>
                <p>Bạn chưa đăng ký gói dịch vụ nào</p>
            </div>
        );
    }

    return (
        <div className="subscription-usage">
            {/* Header */}
            <div className="subscription-header">
                <div className="package-info">
                    <Package size={32} />
                    <div>
                        <h2>{subscription.packageInfo?.name}</h2>
                        <p>{subscription.packageInfo?.description}</p>
                        <div className="package-price-tag">
                            {formatCurrency(subscription.packageInfo?.price || 0)}
                        </div>
                    </div>
                </div>
                {getStatusBadge(subscription.status)}
            </div>

            {/* Subscription Details */}
            <div className="subscription-details">
                <div className="detail-item">
                    <Calendar size={16} />
                    <div>
                        <span className="label">Thời hạn</span>
                        <span className="value">
                            {subscription.isLifetime 
                                ? 'Vĩnh viễn' 
                                : `${formatDate(subscription.startDate)} - ${formatDate(subscription.endDate)}`
                            }
                        </span>
                    </div>
                </div>

                {userRole === 'candidate' && subscription.subscriptionCode && (
                    <div className="detail-item">
                        <div>
                            <span className="label">Mã gói</span>
                            <span className="value code">{subscription.subscriptionCode}</span>
                        </div>
                    </div>
                )}

                <div className="detail-item">
                    <TrendingUp size={16} />
                    <div>
                        <span className="label">Số lần gia hạn</span>
                        <span className="value">{subscription.renewCount || 0}</span>
                    </div>
                </div>
            </div>

            {/* Usage Stats */}
            <div className="usage-stats">
                <h3>Sử dụng</h3>

                {userRole === 'employer' ? (
                    <>
                        {renderProgressBar(
                            subscription.usedJobCount,
                            subscription.totalJobCount,
                            'Đăng tin tuyển dụng'
                        )}

                        {renderProgressBar(
                            subscription.usedHighlightCount,
                            subscription.totalHighlightCount,
                            'Làm nổi bật tin'
                        )}
                    </>
                ) : (
                    <>
                        {renderProgressBar(
                            subscription.usedApplyCount,
                            subscription.totalApplyLimit,
                            'Ứng tuyển'
                        )}

                        {renderProgressBar(
                            subscription.usedHighlightDays,
                            subscription.totalHighlightDays,
                            'Nổi bật hồ sơ'
                        )}
                    </>
                )}
            </div>

            {/* Usage Message */}
            {usage && usage.message && (
                <div className={`usage-message ${usage.message.includes('active') ? 'success' : 'warning'}`}>
                    <AlertCircle size={16} />
                    <span>{usage.message}</span>
                </div>
            )}
        </div>
    );
}