'use client';

import { useEffect, useState } from 'react';
import { Package, Clock, CheckCircle, History } from 'lucide-react';
import { toast } from 'react-toastify';
import {
    getCandidatePackages,
    getActiveCandidateSubscription,
    purchaseCandidatePackage,
    calculateCandidateUpgrade,
    upgradeCandidateSubscription,
    getCandidateSubscriptionHistory,
    checkCandidateUsage
} from '@/services/service-package.service';
import PackageCard from '@/components/dashboard/PackageCard';
import UpgradeModal from '@/components/dashboard/UpgradeModal';
import SubscriptionUsage from '@/components/dashboard/SubscriptionUsage';
import MobileMenu from "../../../header/MobileMenu";
import LoginPopup from "../../../common/form/login/LoginPopup";
import DashboardCandidatesSidebar from "../../../header/DashboardCandidatesSidebar";
import BreadCrumb from "../../BreadCrumb";
import CopyrightFooter from "../../CopyrightFooter";
import DashboardCandidatesHeader from "../../../header/DashboardCandidatesHeader";
import MenuToggler from "../../MenuToggler";

export default function CandidatePackages() {
    const [activeTab, setActiveTab] = useState('packages');
    const [packages, setPackages] = useState([]);
    const [currentSubscription, setCurrentSubscription] = useState(null);
    const [subscriptionHistory, setSubscriptionHistory] = useState([]);
    const [usage, setUsage] = useState(null);
    const [loading, setLoading] = useState(true);
    
    // Upgrade modal
    const [showUpgradeModal, setShowUpgradeModal] = useState(false);
    const [selectedPackage, setSelectedPackage] = useState(null);

    useEffect(() => {
        fetchAllData();
    }, []);

    const fetchAllData = async () => {
        setLoading(true);
        try {
            const [packagesRes, subscriptionRes, historyRes, usageRes] = await Promise.all([
                getCandidatePackages(),
                getActiveCandidateSubscription().catch(() => null),
                getCandidateSubscriptionHistory().catch(() => []),
                checkCandidateUsage().catch(() => null)
            ]);

            setPackages(Array.isArray(packagesRes) ? packagesRes : packagesRes.data || []);
            setCurrentSubscription(subscriptionRes);
            setSubscriptionHistory(Array.isArray(historyRes) ? historyRes : historyRes.data || []);
            setUsage(usageRes);
        } catch (error) {
            console.error('Error fetching data:', error);
            toast.error('Không thể tải dữ liệu');
        } finally {
            setLoading(false);
        }
    };

    const handlePurchase = async (packageId) => {
        try {
            if (currentSubscription) {
                const pkg = packages.find(p => p.id === packageId);
                setSelectedPackage(pkg);
                setShowUpgradeModal(true);
                return;
            }

            await purchaseCandidatePackage(packageId);
            toast.success('Mua gói thành công!');
            fetchAllData();
        } catch (error) {
            console.error('Error purchasing package:', error);
            toast.error(error.response?.data?.message || 'Mua gói thất bại');
        }
    };

    const handleUpgrade = async (packageId) => {
        try {
            await upgradeCandidateSubscription(packageId);
            toast.success('Nâng cấp gói thành công!');
            setShowUpgradeModal(false);
            fetchAllData();
        } catch (error) {
            console.error('Error upgrading:', error);
            toast.error(error.response?.data?.message || 'Nâng cấp thất bại');
        }
    };

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

    return (
        <div className="page-wrapper dashboard">
            <span className="header-span"></span>
            
            <LoginPopup />
            <DashboardCandidatesHeader />
            <MobileMenu />
            <DashboardCandidatesSidebar />

            <section className="user-dashboard">
                <div className="dashboard-outer">
                    <BreadCrumb title="Quản lý gói dịch vụ" />
                    <MenuToggler />

                    <div className="row">
                        <div className="col-lg-12">
                            {/* Tabs Navigation */}
                            <div className="ls-widget">
                                <div className="tabs-box">
                                    <div className="widget-title">
                                        <h4>Gói dịch vụ của tôi</h4>
                                    </div>

                                    <div className="widget-content">
                                        {/* Custom Tabs */}
                                        <ul className="nav nav-tabs mb-4" role="tablist">
                                            <li className="nav-item" role="presentation">
                                                <button
                                                    className={`nav-link ${activeTab === 'packages' ? 'active' : ''}`}
                                                    onClick={() => setActiveTab('packages')}
                                                    type="button"
                                                >
                                                    <Package size={18} className="me-2" />
                                                    Các gói dịch vụ
                                                </button>
                                            </li>
                                            <li className="nav-item" role="presentation">
                                                <button
                                                    className={`nav-link ${activeTab === 'current' ? 'active' : ''}`}
                                                    onClick={() => setActiveTab('current')}
                                                    type="button"
                                                >
                                                    <CheckCircle size={18} className="me-2" />
                                                    Gói hiện tại
                                                </button>
                                            </li>
                                            <li className="nav-item" role="presentation">
                                                <button
                                                    className={`nav-link ${activeTab === 'history' ? 'active' : ''}`}
                                                    onClick={() => setActiveTab('history')}
                                                    type="button"
                                                >
                                                    <History size={18} className="me-2" />
                                                    Lịch sử
                                                </button>
                                            </li>
                                        </ul>

                                        {/* Tab Content */}
                                        {loading ? (
                                            <div className="text-center py-5">
                                                <div className="spinner-border text-primary" role="status">
                                                    <span className="visually-hidden">Đang tải...</span>
                                                </div>
                                            </div>
                                        ) : (
                                            <>
                                                {/* Packages Tab */}
                                                {activeTab === 'packages' && (
                                                    <div className="row">
                                                        {packages.map(pkg => (
                                                            <div key={pkg.id} className="col-lg-4 col-md-6 mb-4">
                                                                <PackageCard
                                                                    pkg={pkg}
                                                                    onPurchase={handlePurchase}
                                                                    isActive={currentSubscription?.packageInfo?.id === pkg.id}
                                                                    userRole="candidate"
                                                                />
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}

                                                {/* Current Subscription Tab */}
                                                {activeTab === 'current' && (
                                                    <div>
                                                        {currentSubscription ? (
                                                            <>
                                                                <SubscriptionUsage 
                                                                    subscription={currentSubscription}
                                                                    usage={usage}
                                                                    userRole="candidate"
                                                                />
                                                                
                                                                <div className="mt-5">
                                                                    <h5 className="mb-3">Nâng cấp gói</h5>
                                                                    <p className="text-muted mb-4">
                                                                        Chọn gói cao hơn để mở rộng cơ hội việc làm
                                                                    </p>
                                                                    <div className="row">
                                                                        {packages
                                                                            .filter(pkg => 
                                                                                pkg.price > currentSubscription.packageInfo.price &&
                                                                                pkg.id !== currentSubscription.packageInfo.id
                                                                            )
                                                                            .map(pkg => (
                                                                                <div key={pkg.id} className="col-lg-4 col-md-6 mb-4">
                                                                                    <PackageCard
                                                                                        pkg={pkg}
                                                                                        onPurchase={handlePurchase}
                                                                                        userRole="candidate"
                                                                                    />
                                                                                </div>
                                                                            ))
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </>
                                                        ) : (
                                                            <div className="text-center py-5">
                                                                <Package size={64} className="text-muted mb-3" />
                                                                <h4>Chưa có gói dịch vụ</h4>
                                                                <p className="text-muted mb-4">
                                                                    Bạn chưa đăng ký gói dịch vụ nào. Hãy chọn gói phù hợp để bắt đầu!
                                                                </p>
                                                                <button 
                                                                    className="btn btn-primary"
                                                                    onClick={() => setActiveTab('packages')}
                                                                >
                                                                    Xem các gói dịch vụ
                                                                </button>
                                                            </div>
                                                        )}
                                                    </div>
                                                )}

                                                {/* History Tab */}
                                                {activeTab === 'history' && (
                                                    <div>
                                                        {subscriptionHistory.length > 0 ? (
                                                            <div className="table-outer">
                                                                <table className="default-table manage-job-table">
                                                                    <thead>
                                                                        <tr>
                                                                            <th>Gói dịch vụ</th>
                                                                            <th>Trạng thái</th>
                                                                            <th>Thời gian</th>
                                                                            <th>Đã sử dụng</th>
                                                                            <th>Giá</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {subscriptionHistory.map((sub) => (
                                                                            <tr key={sub.id}>
                                                                                <td>
                                                                                    <div className="job-block">
                                                                                        <div className="inner-box">
                                                                                            <h4 className="mb-1">{sub.packageInfo?.name}</h4>
                                                                                            {sub.subscriptionCode && (
                                                                                                <small className="text-muted">
                                                                                                    Mã: {sub.subscriptionCode}
                                                                                                </small>
                                                                                            )}
                                                                                        </div>
                                                                                    </div>
                                                                                </td>
                                                                                <td>
                                                                                    <span className={`badge bg-${
                                                                                        sub.status.toLowerCase() === 'active' ? 'success' : 
                                                                                        sub.status.toLowerCase() === 'expired' ? 'danger' : 'warning'
                                                                                    }`}>
                                                                                        {sub.status}
                                                                                    </span>
                                                                                </td>
                                                                                <td>
                                                                                    <Clock size={14} className="me-1" />
                                                                                    {formatDate(sub.startDate)} - {formatDate(sub.endDate)}
                                                                                </td>
                                                                                <td>
                                                                                    <div className="small">
                                                                                        <div>Ứng tuyển: {sub.usedApplyCount}/{sub.totalApplyLimit}</div>
                                                                                        <div>Nổi bật: {sub.usedHighlightDays}/{sub.totalHighlightDays}</div>
                                                                                        {sub.renewCount > 0 && (
                                                                                            <div className="text-muted">Gia hạn: {sub.renewCount} lần</div>
                                                                                        )}
                                                                                    </div>
                                                                                </td>
                                                                                <td>
                                                                                    <strong className="text-primary">
                                                                                        {formatCurrency(sub.packageInfo?.price || 0)}
                                                                                    </strong>
                                                                                </td>
                                                                            </tr>
                                                                        ))}
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        ) : (
                                                            <div className="text-center py-5">
                                                                <History size={48} className="text-muted mb-3" />
                                                                <p className="text-muted">Chưa có lịch sử gói dịch vụ</p>
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <CopyrightFooter />

            {/* Upgrade Modal */}
            {showUpgradeModal && selectedPackage && (
                <UpgradeModal
                    currentPackage={currentSubscription?.packageInfo}
                    newPackage={selectedPackage}
                    onClose={() => {
                        setShowUpgradeModal(false);
                        setSelectedPackage(null);
                    }}
                    onConfirm={handleUpgrade}
                    calculateUpgrade={calculateCandidateUpgrade}
                    userRole="candidate"
                />
            )}
        </div>
    );
}