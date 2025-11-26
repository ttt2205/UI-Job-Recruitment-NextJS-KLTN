'use client';

import { useEffect, useState } from 'react';
import {
    Search,
    Filter,
    Eye,
    Lock,
    Unlock,
    X,
    MapPin,
    Briefcase,
    DollarSign,
    Calendar,
    Award,
    GraduationCap,
    Users,
    Globe
} from 'lucide-react';
import Pagination from '@/components/admin/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { addSearch, addPage, clearFilter, addStatus, addGender } from '@/features/filter/admin/candidateFilterSlice';
import { getCandidateStatusStatistic, getDetailCandidate, getListCadidates, patchLock } from '@/services/candidate-admin.service';
import { toast } from 'react-toastify';

export default function CandidatePage() {
    const {
        page,
        size,
        search,
        status,
        sort,
        gender,
    } = useSelector((state) => state.candidateAdmin);
    const dispatch = useDispatch();

    const [candidates, setCandidates] = useState([]);
    const [selectedCandidate, setSelectedCandidate] = useState(null);
    const [meta, setMeta] = useState({
        totalItems: 0,
        currentPage: 0,
        pageSize: 10,
        totalPages: 0
    });
    const [statistic, setStatistic] = useState({
        total: 0,
        activeCount: 0,
        lockedCount: 0,
    });

    //modal
    const [showAdvancedFilter, setShowAdvancedFilter] = useState(false);
    const [showDetailModal, setShowDetailModal] = useState(false);

    useEffect(() => {
        const fetchAPI = async () => {
            try {
                const [resList, resStatistic] = await Promise.all([
                    getListCadidates({
                        page,
                        size,
                        sort,
                        search,
                        gender,
                        status,
                    }),
                    getCandidateStatusStatistic()
                ]);

                if (resList.statusCode === 200) {
                    setCandidates(resList.results);
                    setMeta(resList.meta);
                }

                if (resStatistic.statusCode === 200) {
                    setStatistic(resStatistic.data);
                }

            } catch (error) {
                console.error("Lỗi fetchAPI:", error);
            }
        };
        fetchAPI();
    }, [page, size, sort, search, gender, status]);


    //pagination
    const handlePageChange = (page) => {
        dispatch(addPage(page));
    };

    //modal
    const handleViewDetail = async (id) => {
        try {
            const res = await getDetailCandidate(id);
            if (res && res.data) {
                setSelectedCandidate(res.data);
                setShowDetailModal(true);
            }
        } catch (error) {
            console.error("Lỗi khi lấy chi tiết ứng viên:", error);
        }
    };

    const handleCloseDetail = () => {
        setSelectedCandidate(null);
        setShowDetailModal(false);
    }

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN');
    };

    const handleToggleStatus = async (id) => {
        try {
            const res = await patchLock(id);
            console.log("res status: ", res);
            if (res.success) {
                setCandidates(
                    candidates.map((c) =>
                        c.id === id ? { ...c, status: !c.status } : c
                    )
                );
                toast.success(res.message);
            } else {
                toast.error("Cập nhật thất bại!");
            }
        } catch (error) {
            console.error("Lỗi khi khóa ứng viên", error);
        }
    };


    return (
        <div className="candidate-page">
            {/* Toolbar */}
            <div className="candidate-toolbar">
                <div className="search-box">
                    <Search size={20} />
                    <input
                        type="text"
                        placeholder="Tìm kiếm theo tên, vị trí..."
                        value={search}
                        onChange={(e) => dispatch(addSearch(e.target.value))}
                    />
                </div>

                <div className="toolbar-actions">
                    <button
                        className={`btn-filter ${showAdvancedFilter ? 'active' : ''}`}
                        onClick={() => setShowAdvancedFilter(!showAdvancedFilter)}
                    >
                        <Filter size={18} />
                        Bộ lọc nâng cao
                    </button>
                </div>
            </div>

            {/* Advanced Filters */}
            {showAdvancedFilter && (
                <div className="advanced-filters">
                    <div className="filter-grid">
                        <div className="filter-item">
                            <label>Giới tính</label>
                            <select
                                value={gender}
                                onChange={(e) => dispatch(addGender(e.target.value))}
                            >
                                <option value="">Tất cả</option>
                                <option value="male">Nam</option>
                                <option value="female">Nữ</option>
                                <option value="orther">Khác</option>
                            </select>
                        </div>
                        <div className="filter-item">
                            <label>Trạng thái</label>
                            <select
                                className="filter-select"
                                value={status}
                                onChange={(e) => dispatch(addStatus(e.target.value))}
                            >
                                <option value="">Tất cả trạng thái</option>
                                <option value="true">Đang hoạt động</option>
                                <option value="false">Đã khóa</option>
                            </select>
                        </div>
                    </div>
                    <div className='filter-clear'>
                        <button
                            className="btn-clear-filter"
                            onClick={() => {
                                dispatch(clearFilter());
                            }}
                        >
                            Xóa tất cả bộ lọc
                        </button>
                    </div>
                </div>
            )}

            {/* Statistics Cards */}
            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-icon blue">
                        <Briefcase size={24} />
                    </div>
                    <div className="stat-content">
                        <p className="stat-label">Tổng ứng viên</p>
                        <h3 className="stat-value">{statistic.total}</h3>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon green">
                        <Unlock size={24} />
                    </div>
                    <div className="stat-content">
                        <p className="stat-label">Đang hoạt động</p>
                        <h3 className="stat-value">
                            {statistic.activeCount}
                        </h3>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon red">
                        <Lock size={24} />
                    </div>
                    <div className="stat-content">
                        <p className="stat-label">Đã khóa</p>
                        <h3 className="stat-value">
                            {statistic.lockedCount}
                        </h3>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="candidate-table-container">
                <table className="candidate-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Ứng viên</th>
                            <th>Địa điểm</th>
                            <th>Thành phố</th>
                            <th>Kỹ năng</th>
                            <th>Lĩnh vực</th>
                            <th>Giới tính</th>
                            <th>Trạng thái</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {candidates.map((candidate) => (
                            <tr key={candidate.id}>
                                <td>{candidate.id}</td>
                                <td>
                                    <div className="candidate-info">
                                        <img
                                            src={candidate.avatar}
                                            alt={candidate.name}
                                            className="candidate-avatar"
                                        />
                                        <div>
                                            <p className="candidate-name">{candidate.name}</p>
                                            <p className="candidate-email">{candidate.designation}</p>
                                        </div>
                                    </div>
                                </td>
                                <td>{candidate.location}</td>
                                <td>{candidate.city} - {candidate.country}</td>
                                <td>
                                    <div className="tags-container">
                                        {candidate.tags && candidate.tags.length > 0 ? (
                                            candidate.tags.map((tag, index) => (
                                                <span key={index} className="tag-item">
                                                    {tag}
                                                </span>
                                            ))
                                        ) : (
                                            <span className="no-tag">Không có kỹ năng</span>
                                        )}
                                    </div>
                                </td>
                                <td>
                                    {candidate.category}
                                </td>
                                <td>
                                    {candidate.gender}
                                </td>
                                <td>
                                    <span
                                        className={`status-badge ${candidate.status == true ? 'active' : 'locked'}`}
                                    >
                                        {candidate.status == true
                                            ? 'Hoạt động'
                                            : 'Đã khóa'}
                                    </span>
                                </td>
                                <td>
                                    <div className="action-buttons">
                                        <button
                                            className="btn-icon btn-view"
                                            onClick={() => handleViewDetail(candidate.id)}
                                            title="Xem chi tiết"
                                        >
                                            <Eye size={16} />
                                        </button>
                                        <button
                                            className="btn-icon btn-lock"
                                            onClick={() => handleToggleStatus(candidate.id)}
                                            title={
                                                candidate.status === true
                                                    ? 'Khóa tài khoản'
                                                    : 'Mở khóa'
                                            }
                                        >
                                            {candidate.status === true ? (
                                                <Unlock size={16} />
                                            ) : (
                                                <Lock size={16} />
                                            )}
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {candidates.length > 0 && (
                <Pagination
                    currentPage={meta.currentPage + 1}
                    totalPages={meta.totalPages}
                    onPageChange={handlePageChange}
                />
            )}

            {showDetailModal && selectedCandidate && (
                <div className="modal-overlay" onClick={handleCloseDetail}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>Chi tiết ứng viên</h2>
                            <button
                                className="btn-close"
                                onClick={handleCloseDetail}
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="modal-body">
                            <div className="detail-section">
                                {/* Header Section */}
                                <div className="candidate-header">
                                    <img
                                        src={selectedCandidate.avatar}
                                        alt={selectedCandidate.name}
                                        className="detail-avatar"
                                    />
                                    <div>
                                        <h3>{selectedCandidate.name}</h3>
                                        <p className="designation">{selectedCandidate.designation}</p>
                                        <span className="category-badge">{selectedCandidate.category}</span>
                                    </div>
                                </div>

                                {/* Detail Grid */}
                                <div className="detail-grid">
                                    <div className="detail-item">
                                        <MapPin size={18} />
                                        <div>
                                            <label>Địa điểm</label>
                                            <p>{selectedCandidate.location}</p>
                                            <p className="sub-info">{selectedCandidate.city}, {selectedCandidate.country}</p>
                                        </div>
                                    </div>

                                    <div className="detail-item">
                                        <Calendar size={18} />
                                        <div>
                                            <label>Ngày sinh</label>
                                            <p>{formatDate(selectedCandidate.birthday)}</p>
                                        </div>
                                    </div>

                                    <div className="detail-item">
                                        <Users size={18} />
                                        <div>
                                            <label>Giới tính</label>
                                            <p>{selectedCandidate.gender}</p>
                                        </div>
                                    </div>

                                    <div className="detail-item">
                                        <Briefcase size={18} />
                                        <div>
                                            <label>Kinh nghiệm</label>
                                            <p>{selectedCandidate.experience} năm</p>
                                        </div>
                                    </div>

                                    <div className="detail-item">
                                        <GraduationCap size={18} />
                                        <div>
                                            <label>Trình độ học vấn</label>
                                            <p>{selectedCandidate.qualification}</p>
                                        </div>
                                    </div>

                                    <div className="detail-item">
                                        <DollarSign size={18} />
                                        <div>
                                            <label>Giá theo giờ</label>
                                            <p>${selectedCandidate.hourlyRate}/giờ</p>
                                        </div>
                                    </div>

                                    <div className="detail-item">
                                        <DollarSign size={18} />
                                        <div>
                                            <label>Mức lương hiện tại</label>
                                            <p>{selectedCandidate.currentSalary}</p>
                                        </div>
                                    </div>

                                    <div className="detail-item">
                                        <DollarSign size={18} />
                                        <div>
                                            <label>Mức lương mong muốn</label>
                                            <p>{selectedCandidate.expectedSalary}</p>
                                        </div>
                                    </div>

                                    {/* Skills/Tags Section */}
                                    <div className="detail-item full-width">
                                        <Award size={18} />
                                        <div>
                                            <label>Kỹ năng</label>
                                            <div className="tags-container">
                                                {selectedCandidate.tags && selectedCandidate.tags.length > 0 ? (
                                                    selectedCandidate.tags.map((tag, index) => (
                                                        <span key={index} className="tag-item">{tag}</span>
                                                    ))
                                                ) : (
                                                    <p className="no-data">Chưa có kỹ năng nào</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Languages Section */}
                                    <div className="detail-item full-width">
                                        <Globe size={18} />
                                        <div>
                                            <label>Ngôn ngữ</label>
                                            <div className="languages-list">
                                                {selectedCandidate.languages && selectedCandidate.languages.length > 0 ? (
                                                    selectedCandidate.languages.map((lang, index) => (
                                                        <span key={index} className="language-item">{lang}</span>
                                                    ))
                                                ) : (
                                                    <p className="no-data">Chưa có thông tin ngôn ngữ</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Description Section */}
                                <div className="detail-description">
                                    <h4>Mô tả</h4>
                                    <p>{selectedCandidate.description || 'Chưa có mô tả'}</p>
                                </div>

                                {/* Social Media Section */}
                                <div className="detail-social">
                                    <h4>Mạng xã hội</h4>
                                    {selectedCandidate.socialMedias && selectedCandidate.socialMedias.length > 0 ? (
                                        <div className="social-links">
                                            {selectedCandidate.socialMedias.map((social, index) => (
                                                <a
                                                    key={index}
                                                    href={`https://${social.url}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="social-link"
                                                >
                                                    <span className="social-platform">{social.platform}</span>
                                                    <span className="social-url">{social.url}</span>
                                                </a>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="no-data">Chưa có liên kết mạng xã hội</p>
                                    )}
                                </div>

                                {/* Stats Section */}
                                <div className="detail-stats">
                                    <div className="stat-box">
                                        <p>Ngày tạo hồ sơ</p>
                                        <h3>{formatDate(selectedCandidate.createdAt)}</h3>
                                    </div>
                                    <div className="stat-box stat-status">
                                        <p>Trạng thái</p>
                                        <h3>{selectedCandidate.status ? 'Đang hoạt động' : 'Không hoạt động'}</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}