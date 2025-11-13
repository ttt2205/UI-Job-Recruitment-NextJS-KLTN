'use client';

import { useEffect, useState } from 'react';
import {
    Plus,
    Edit,
    Package,
    Users,
    Briefcase,
    DollarSign,
    Calendar,
    CheckCircle,
    XCircle,
    Gift
} from 'lucide-react';
import { toast } from 'react-toastify';
import {
    getEmployerPackages,
    getCandidatePackages,
    getEmployerAddOns,
    createEmployerPackage,
    createCandidatePackage,
    createEmployerAddOn,
    updateEmployerPackage,
    updateCandidatePackage,
    updateEmployerAddOn
} from '@/services/service-package.service';
import PackageModal from '@/components/admin/PackageModal';
import AddOnModal from '@/components/admin/AddOnModal';

export default function ServicesPage() {
    const [activeTab, setActiveTab] = useState('employer');
    const [employerPackages, setEmployerPackages] = useState([]);
    const [candidatePackages, setCandidatePackages] = useState([]);
    const [addOns, setAddOns] = useState([]);
    const [loading, setLoading] = useState(false);
    
    // Modal states
    const [showPackageModal, setShowPackageModal] = useState(false);
    const [showAddOnModal, setShowAddOnModal] = useState(false);
    const [editingPackage, setEditingPackage] = useState(null);
    const [modalType, setModalType] = useState('employer'); // 'employer' | 'candidate'

    useEffect(() => {
        fetchAllData();
    }, []);

    const fetchAllData = async () => {
        setLoading(true);
        try {
            const [empRes, candRes] = await Promise.all([
                getEmployerPackages(),
                getCandidatePackages()
            ]);

            // Response structure theo document: trả về array trực tiếp
            setEmployerPackages(Array.isArray(empRes) ? empRes : empRes.results || empRes.data || []);
            setCandidatePackages(Array.isArray(candRes) ? candRes : candRes.results || candRes.data || []);
            
            // Add-ons sẽ được fetch riêng hoặc hiển thị trong một section khác
            setAddOns([]);
        } catch (error) {
            console.error('Error fetching data:', error);
            toast.error('Không thể tải dữ liệu');
        } finally {
            setLoading(false);
        }
    };

    const handleCreatePackage = (type) => {
        setModalType(type);
        setEditingPackage(null);
        setShowPackageModal(true);
    };

    const handleEditPackage = (pkg, type) => {
        setModalType(type);
        setEditingPackage(pkg);
        setShowPackageModal(true);
    };

    const handleSavePackage = async (data) => {
        try {
            if (editingPackage) {
                // Update
                if (modalType === 'employer') {
                    await updateEmployerPackage(editingPackage.id, data);
                } else {
                    await updateCandidatePackage(editingPackage.id, data);
                }
                toast.success('Cập nhật gói thành công');
            } else {
                // Create
                if (modalType === 'employer') {
                    await createEmployerPackage(data);
                } else {
                    await createCandidatePackage(data);
                }
                toast.success('Tạo gói thành công');
            }
            
            setShowPackageModal(false);
            fetchAllData();
        } catch (error) {
            console.error('Error saving package:', error);
            toast.error('Có lỗi xảy ra');
        }
    };

    const handleCreateAddOn = () => {
        setEditingPackage(null);
        setShowAddOnModal(true);
    };

    const handleEditAddOn = (addOn) => {
        setEditingPackage(addOn);
        setShowAddOnModal(true);
    };

    const handleSaveAddOn = async (data) => {
        try {
            if (editingPackage) {
                await updateEmployerAddOn(editingPackage.id, data);
                toast.success('Cập nhật add-on thành công');
            } else {
                await createEmployerAddOn(data);
                toast.success('Tạo add-on thành công');
            }
            
            setShowAddOnModal(false);
            // Note: Add-ons list might need separate endpoint or management
            toast.info('Vui lòng refresh trang để xem danh sách add-ons');
        } catch (error) {
            console.error('Error saving add-on:', error);
            toast.error('Có lỗi xảy ra');
        }
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(amount);
    };

    const renderPackageCard = (pkg, type) => (
        <div key={pkg.id} className="package-card">
            <div className="package-header">
                <div className="package-title">
                    <Package size={24} className="icon" />
                    <h3>{pkg.name}</h3>
                </div>
                <button 
                    className="btn-edit"
                    onClick={() => handleEditPackage(pkg, type)}
                >
                    <Edit size={18} />
                </button>
            </div>
            
            <div className="package-price">
                <span className="amount">{formatCurrency(pkg.price)}</span>
                <span className="duration">
                    {pkg.isLifetime ? 'Vĩnh viễn' : `${pkg.durationDay} ngày`}
                </span>
            </div>

            <p className="package-description">{pkg.description}</p>

            <div className="package-features">
                {type === 'employer' ? (
                    <>
                        <div className="feature-item">
                            <Briefcase size={16} />
                            <span>{pkg.jobPostLimit} tin đăng tuyển</span>
                        </div>
                        <div className="feature-item">
                            <CheckCircle size={16} />
                            <span>{pkg.highlightJobLimit} tin nổi bật</span>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="feature-item">
                            <Users size={16} />
                            <span>{pkg.jobApplyLimit} lượt ứng tuyển</span>
                        </div>
                        <div className="feature-item">
                            <CheckCircle size={16} />
                            <span>{pkg.highlightProfileDays} ngày nổi bật</span>
                        </div>
                        <div className="feature-item">
                            {pkg.canViewOtherCandidates ? (
                                <CheckCircle size={16} className="text-success" />
                            ) : (
                                <XCircle size={16} className="text-danger" />
                            )}
                            <span>Xem ứng viên khác</span>
                        </div>
                    </>
                )}
            </div>

            <div className="package-meta">
                <Calendar size={14} />
                <span>Tạo: {new Date(pkg.createdAt).toLocaleDateString('vi-VN')}</span>
            </div>
        </div>
    );

    const renderAddOnCard = (addOn) => (
        <div key={addOn.id} className="package-card addon-card">
            <div className="package-header">
                <div className="package-title">
                    <Gift size={24} className="icon" />
                    <h3>{addOn.name}</h3>
                </div>
                <button 
                    className="btn-edit"
                    onClick={() => handleEditAddOn(addOn)}
                >
                    <Edit size={18} />
                </button>
            </div>
            
            <div className="package-price">
                <span className="amount">{formatCurrency(addOn.price)}</span>
            </div>

            <p className="package-description">{addOn.description}</p>

            <div className="package-features">
                <div className="feature-item">
                    <Package size={16} />
                    <span>Loại: {addOn.type}</span>
                </div>
                <div className="feature-item">
                    <CheckCircle size={16} />
                    <span>Số lượng: {addOn.quantity}</span>
                </div>
                <div className="feature-item">
                    <Calendar size={16} />
                    <span>
                        {addOn.isLifetime ? 'Vĩnh viễn' : `${addOn.durationDay} ngày`}
                    </span>
                </div>
            </div>
        </div>
    );

    if (loading) {
        return <div className="loading-container">Đang tải...</div>;
    }

    return (
        <div className="services-page">
            {/* Tabs */}
            <div className="services-tabs">
                <button
                    className={`tab-btn ${activeTab === 'employer' ? 'active' : ''}`}
                    onClick={() => setActiveTab('employer')}
                >
                    <Briefcase size={20} />
                    Gói Doanh nghiệp
                </button>
                <button
                    className={`tab-btn ${activeTab === 'candidate' ? 'active' : ''}`}
                    onClick={() => setActiveTab('candidate')}
                >
                    <Users size={20} />
                    Gói Ứng viên
                </button>
                <button
                    className={`tab-btn ${activeTab === 'addons' ? 'active' : ''}`}
                    onClick={() => setActiveTab('addons')}
                >
                    <Gift size={20} />
                    Gói bổ sung
                </button>
            </div>

            {/* Content */}
            <div className="services-content">
                {activeTab === 'employer' && (
                    <div className="packages-section">
                        <div className="section-header">
                            <h2>Gói dịch vụ doanh nghiệp</h2>
                            <button 
                                className="btn-create"
                                onClick={() => handleCreatePackage('employer')}
                            >
                                <Plus size={20} />
                                Tạo gói mới
                            </button>
                        </div>
                        <div className="packages-grid">
                            {employerPackages.map(pkg => renderPackageCard(pkg, 'employer'))}
                        </div>
                    </div>
                )}

                {activeTab === 'candidate' && (
                    <div className="packages-section">
                        <div className="section-header">
                            <h2>Gói dịch vụ ứng viên</h2>
                            <button 
                                className="btn-create"
                                onClick={() => handleCreatePackage('candidate')}
                            >
                                <Plus size={20} />
                                Tạo gói mới
                            </button>
                        </div>
                        <div className="packages-grid">
                            {candidatePackages.map(pkg => renderPackageCard(pkg, 'candidate'))}
                        </div>
                    </div>
                )}

                {activeTab === 'addons' && (
                    <div className="packages-section">
                        <div className="section-header">
                            <h2>Gói bổ sung</h2>
                            <button 
                                className="btn-create"
                                onClick={handleCreateAddOn}
                            >
                                <Plus size={20} />
                                Tạo add-on mới
                            </button>
                        </div>
                        <div className="packages-grid">
                            {addOns.map(addOn => renderAddOnCard(addOn))}
                        </div>
                    </div>
                )}
            </div>

            {/* Modals */}
            {showPackageModal && (
                <PackageModal
                    type={modalType}
                    package={editingPackage}
                    onClose={() => setShowPackageModal(false)}
                    onSave={handleSavePackage}
                />
            )}

            {showAddOnModal && (
                <AddOnModal
                    addOn={editingPackage}
                    onClose={() => setShowAddOnModal(false)}
                    onSave={handleSaveAddOn}
                />
            )}
        </div>
    );
}