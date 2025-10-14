'use client';

import { useEffect, useState } from 'react';
import {
    Search,
    Filter,
    Eye,
    Lock,
    Unlock,
    Edit,
    X,
    Mail,
    Phone,
    MapPin,
    Briefcase,
    DollarSign,
    Calendar,
    Award,
    Languages,
    GraduationCap,
    Plus,
} from 'lucide-react';
import Pagination from '@/components/admin/Pagination';
import { candidateFake } from '@/data/admin/candidate.admin';
import { useDispatch, useSelector } from 'react-redux';
import { addCandidateGender, addEducationLevel, addExperienceLevel, addIndustryLevel, addKeyword, addLocation, addPage, addStatus, clearFilter } from '@/features/filter/admin/candidateFilterSlice';
import { getListCadidates } from '@/services/candidate-admin.service';

export default function CandidatePage() {
    const {
        page,
        size,
        keyword,
        status,
        educationLevel,
        industryLevel,
        candidateGender,
        experienceLevel,
        location } = useSelector((state) => state.candidateAdmin);

    const dispatch = useDispatch();

    const [candidates, setCandidates] = useState([]);
    const [selectedCandidate, setSelectedCandidate] = useState(null);
    //modal
    const [showAdvancedFilter, setShowAdvancedFilter] = useState(false);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [modalMode, setModalMode] = useState("add");
    const [showModal, setShowModal] = useState(false);


    const data = candidateFake;
    const filteredCandidates = data.results;

    useEffect(() => {
        const fetchAPI = async () => {
            const res = await getListCadidates({
                page,
                size,
                keyword,
                status,
                educationLevel,
                category: industryLevel,
                candidateGender,
                experienceLevel,
                location,
            });
            console.log(res);
        }
        fetchAPI();
    }, [page, size, keyword, status, educationLevel, industryLevel, candidateGender, experienceLevel, location]);

    const industries = [...new Set(candidates.map(c => c.industry))];
    const educationLevels = [...new Set(candidates.map(c => c.educationLevel))];


    //pagination
    const handlePageChange = (page) => {
        dispatch(addPage(page));
    };

    //modal
    const handleViewDetail = (candidate) => {
        setSelectedCandidate(candidate);
        setShowDetailModal(true);
    };

    const handleAdd = () => {
        setModalMode("add");
        setSelectedCandidate(null);
        setShowModal(true);
    }

    const handleEdit = (candidate) => {
        setModalMode("edit");
        setSelectedCandidate({ ...candidate });
        setShowModal(true);
    };

    const handleSaveEdit = () => {
        setCandidates(
            candidates.map((c) =>
                c.id === selectedCandidate.id ? { ...selectedCandidate } : c
            )
        );
        setShowModal(false);
        setEditForm(null);
    };


    const handleToggleStatus = (id) => {
        setCandidates(
            candidates.map((c) =>
                c.id === id
                    ? { ...c, status: c.status === 'active' ? 'locked' : 'active' }
                    : c
            )
        );
    };


    return (
        <div className="candidate-page">
            {/* Toolbar */}
            <div className="candidate-toolbar">
                <div className="search-box">
                    <Search size={20} />
                    <input
                        type="text"
                        placeholder="Tìm kiếm theo tên, email, vị trí..."
                        value={keyword}
                        onChange={(e) => dispatch(addKeyword(e.target.value))}
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
                            <label>Địa điểm</label>
                            <select
                                value={location}
                                onChange={(e) => dispatch(addLocation(e.target.value))}
                            >
                                <option value="all">Tất cả</option>
                                <option value="hcm">Tp Hồ Chí Minh</option>
                                <option value="hn">Hà Nội</option>
                            </select>
                        </div>
                        <div className="filter-item">
                            <label>Giới tính</label>
                            <select
                                value={candidateGender}
                                onChange={(e) => dispatch(addCandidateGender(e.target.value))}
                            >
                                <option value="all">Tất cả</option>
                                <option value="male">Nam</option>
                                <option value="female">Nữ</option>
                            </select>
                        </div>
                        <div className="filter-item">
                            <label>Ngành nghề</label>
                            <select
                                value={industryLevel}
                                onChange={(e) => dispatch(addIndustryLevel(e.target.value))}
                            >
                                <option value="all">Tất cả</option>
                                {industries.map((industry) => (
                                    <option key={industry} value={industry}>
                                        {industry}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="filter-item">
                            <label>Trình độ</label>
                            <select
                                value={educationLevel}
                                onChange={(e) => dispatch(addEducationLevel(e.target.value))}
                            >
                                <option value="all">Tất cả</option>
                                {educationLevels.map((level) => (
                                    <option key={level} value={level}>
                                        {level}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="filter-item">
                            <label>Kinh nghiệm</label>
                            <select
                                value={experienceLevel}
                                onChange={(e) => dispatch(addExperienceLevel(e.target.value))}
                            >
                                <option value="all">Tất cả</option>
                                <option value="0-2">0-2 năm</option>
                                <option value="3-5">3-5 năm</option>
                                <option value="6-10">6-10 năm</option>
                                <option value="10+">Trên 10 năm</option>
                            </select>
                        </div>
                        <div className="filter-item">
                            <label>Trạng thái</label>
                            <select
                                className="filter-select"
                                value={status}
                                onChange={(e) => dispatch(addStatus(e.target.value))}
                            >
                                <option value="all">Tất cả trạng thái</option>
                                <option value="active">Đang hoạt động</option>
                                <option value="locked">Đã khóa</option>
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
                        <h3 className="stat-value">{candidates.length}</h3>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon green">
                        <Unlock size={24} />
                    </div>
                    <div className="stat-content">
                        <p className="stat-label">Đang hoạt động</p>
                        <h3 className="stat-value">
                            {candidates.filter((c) => c.status === 'active').length}
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
                            {candidates.filter((c) => c.status === 'locked').length}
                        </h3>
                    </div>
                </div>
            </div>

            <div className="candidate-add">
                <button className='btn-add' onClick={handleAdd}>
                    <Plus size={18} />
                    <span>Thêm ứng viên</span>
                </button>
            </div>

            {/* Table */}
            <div className="candidate-table-container">
                <table className="candidate-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Ứng viên</th>
                            <th>Vị trí</th>
                            <th>Địa điểm</th>
                            <th>Kinh nghiệm</th>
                            <th>Việc đã nộp</th>
                            <th>Dịch vụ</th>
                            <th>Trạng thái</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCandidates.map((candidate) => (
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
                                            <p className="candidate-email">{candidate.email}</p>
                                        </div>
                                    </div>
                                </td>
                                <td>{candidate.designation}</td>
                                <td>{candidate.location}</td>
                                <td>{candidate.experience} năm</td>
                                <td>
                                    <span className="badge badge-info">
                                        {candidate.jobsApplied} việc
                                    </span>
                                </td>
                                <td>
                                    <span className="badge badge-purple">
                                        {candidate.servicesSubscribed.length} gói
                                    </span>
                                </td>
                                <td>
                                    <span
                                        className={`status-badge ${candidate.status === 'active' ? 'active' : 'locked'}`}
                                    >
                                        {candidate.status === 'active'
                                            ? 'Hoạt động'
                                            : 'Đã khóa'}
                                    </span>
                                </td>
                                <td>
                                    <div className="action-buttons">
                                        <button
                                            className="btn-icon btn-view"
                                            onClick={() => handleViewDetail(candidate)}
                                            title="Xem chi tiết"
                                        >
                                            <Eye size={16} />
                                        </button>
                                        <button
                                            className="btn-icon btn-edit"
                                            onClick={() => handleEdit(candidate)}
                                            title="Chỉnh sửa"
                                        >
                                            <Edit size={16} />
                                        </button>
                                        <button
                                            className="btn-icon btn-lock"
                                            onClick={() => handleToggleStatus(candidate.id)}
                                            title={
                                                candidate.status === 'active'
                                                    ? 'Khóa tài khoản'
                                                    : 'Mở khóa'
                                            }
                                        >
                                            {candidate.status === 'active' ? (
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
                    currentPage={page}
                    totalPages={size}
                    onPageChange={handlePageChange}
                />
            )}

            {/* Detail Modal */}
            {showDetailModal && selectedCandidate && (
                <div className="modal-overlay" onClick={() => setShowDetailModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>Chi tiết ứng viên</h2>
                            <button
                                className="btn-close"
                                onClick={() => setShowDetailModal(false)}
                            >
                                <X size={20} />
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="detail-section">
                                <div className="candidate-header">
                                    <img
                                        src={selectedCandidate.avatar}
                                        alt={selectedCandidate.name}
                                        className="detail-avatar"
                                    />
                                    <div>
                                        <h3>{selectedCandidate.name}</h3>
                                        <p className="designation">
                                            {selectedCandidate.designation}
                                        </p>
                                    </div>
                                </div>

                                <div className="detail-grid">
                                    <div className="detail-item">
                                        <Mail size={18} />
                                        <div>
                                            <label>Email</label>
                                            <p>{selectedCandidate.email}</p>
                                        </div>
                                    </div>
                                    <div className="detail-item">
                                        <Phone size={18} />
                                        <div>
                                            <label>Số điện thoại</label>
                                            <p>{selectedCandidate.phone}</p>
                                        </div>
                                    </div>
                                    <div className="detail-item">
                                        <MapPin size={18} />
                                        <div>
                                            <label>Địa điểm</label>
                                            <p>{selectedCandidate.location}</p>
                                        </div>
                                    </div>
                                    <div className="detail-item">
                                        <Calendar size={18} />
                                        <div>
                                            <label>Ngày sinh</label>
                                            <p>{selectedCandidate.birthday}</p>
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
                                    <div className="detail-item">
                                        <GraduationCap size={18} />
                                        <div>
                                            <label>Trình độ học vấn</label>
                                            <p>{selectedCandidate.educationLevel}</p>
                                        </div>
                                    </div>
                                    <div className="detail-item">
                                        <Languages size={18} />
                                        <div>
                                            <label>Ngôn ngữ</label>
                                            <p>{selectedCandidate.languages}</p>
                                        </div>
                                    </div>
                                    <div className="detail-item full-width">
                                        <Award size={18} />
                                        <div>
                                            <label>Kỹ năng</label>
                                            <p>{selectedCandidate.skills}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="detail-description">
                                    <h4>Mô tả</h4>
                                    <p>{selectedCandidate.description}</p>
                                </div>

                                <div className="detail-services">
                                    <h4>Gói dịch vụ đã đăng ký</h4>
                                    {selectedCandidate.servicesSubscribed.length > 0 ? (
                                        <ul>
                                            {selectedCandidate.servicesSubscribed.map(
                                                (service, index) => (
                                                    <li key={index}>{service}</li>
                                                )
                                            )}
                                        </ul>
                                    ) : (
                                        <p className="no-data">Chưa đăng ký gói dịch vụ nào</p>
                                    )}
                                </div>

                                <div className="detail-social">
                                    <h4>Mạng xã hội</h4>
                                    {selectedCandidate.socialMedias && selectedCandidate.socialMedias.length > 0 ? (
                                        <div className="social-links">
                                            {selectedCandidate.socialMedias.map((social, index) => (
                                                <a
                                                    key={index}
                                                    href={social.url}
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

                                <div className="detail-stats">
                                    <div className="stat-box">
                                        <p>Số việc đã nộp</p>
                                        <h3>{selectedCandidate.jobsApplied}</h3>
                                    </div>
                                    <div className="stat-box">
                                        <p>Ngày tạo</p>
                                        <h3>{selectedCandidate.createdAt}</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Add Modal */}
            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal-content modal-edit" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>{modalMode == "edit" ? "Chỉnh sửa thông tin ứng viên" : "Thêm ứng viên"}</h2>
                            <button
                                className="btn-close"
                                onClick={() => setShowModal(false)}
                            >
                                <X size={20} />
                            </button>
                        </div>
                        <div className="modal-body">
                            <form className="edit-form" onSubmit={(e) => { e.preventDefault(); handleSaveEdit(); }}>
                                <div className="form-grid">
                                    <div className="form-group">
                                        <label>Tên ứng viên *</label>
                                        <input
                                            type="text"
                                            value={selectedCandidate?.name || ""}
                                            onChange={(e) => setSelectedCandidate({ ...selectedCandidate, name: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Email *</label>
                                        <input
                                            type="email"
                                            value={selectedCandidate?.email || ""}
                                            onChange={(e) => setSelectedCandidate({ ...selectedCandidate, email: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Số điện thoại</label>
                                        <input
                                            type="tel"
                                            value={selectedCandidate?.phone || ""}
                                            onChange={(e) => setSelectedCandidate({ ...selectedCandidate, phone: e.target.value })}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Ngày sinh</label>
                                        <input
                                            type="date"
                                            value={selectedCandidate?.birthday || ""}
                                            onChange={(e) => setSelectedCandidate({ ...selectedCandidate, birthday: e.target.value })}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Giới tính</label>
                                        <select
                                            value={selectedCandidate?.gender || ""}
                                            onChange={(e) => setSelectedCandidate({ ...selectedCandidate, gender: e.target.value })}
                                        >
                                            <option value="male">Nam</option>
                                            <option value="female">Nữ</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Vị trí</label>
                                        <input
                                            type="text"
                                            value={selectedCandidate?.designation || ""}
                                            onChange={(e) => setSelectedCandidate({ ...selectedCandidate, designation: e.target.value })}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Ngành nghề</label>
                                        <input
                                            type="text"
                                            value={selectedCandidate?.industry || ""}
                                            onChange={(e) => setSelectedCandidate({ ...selectedCandidate, industry: e.target.value })}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Địa điểm</label>
                                        <input
                                            type="text"
                                            value={selectedCandidate?.location || ""}
                                            onChange={(e) => setSelectedCandidate({ ...selectedCandidate, location: e.target.value })}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Kinh nghiệm (năm)</label>
                                        <input
                                            type="number"
                                            value={selectedCandidate?.experience || ""}
                                            onChange={(e) => setSelectedCandidate({ ...selectedCandidate, selectedCandidate: e.target.value })}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Mức lương hiện tại</label>
                                        <input
                                            type="text"
                                            value={selectedCandidate?.currentSalary || ""}
                                            onChange={(e) => setSelectedCandidate({ ...selectedCandidate, currentSalary: e.target.value })}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Mức lương mong muốn</label>
                                        <input
                                            type="text"
                                            value={selectedCandidate?.expectedSalary || ""}
                                            onChange={(e) => setSelectedCandidate({ ...selectedCandidate, expectedSalary: e.target.value })}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Trình độ học vấn</label>
                                        <input
                                            type="text"
                                            value={selectedCandidate?.educationLevel || ""}
                                            onChange={(e) => setSelectedCandidate({ ...selectedCandidate, educationLevel: e.target.value })}
                                        />
                                    </div>
                                    <div className="form-group full-width">
                                        <label>Kỹ năng</label>
                                        <input
                                            type="text"
                                            value={selectedCandidate?.skills || ""}
                                            onChange={(e) => setSelectedCandidate({ ...selectedCandidate, skills: e.target.value })}
                                        />
                                    </div>
                                    <div className="form-group full-width">
                                        <label>Ngôn ngữ</label>
                                        <input
                                            type="text"
                                            value={selectedCandidate?.languages || ""}
                                            onChange={(e) => setSelectedCandidate({ ...selectedCandidate, languages: e.target.value })}
                                        />
                                    </div>
                                    <div className="form-group full-width">
                                        <label>Mô tả</label>
                                        <textarea
                                            rows="4"
                                            value={selectedCandidate?.description || ""}
                                            onChange={(e) => setSelectedCandidate({ ...selectedCandidate, description: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="form-actions">
                                    <button
                                        type="button"
                                        className="btn-cancel"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Hủy
                                    </button>
                                    <button type="submit" className="btn-save">
                                        {modalMode == "edit" ? " Lưu thay đổi" : "Thêm mới"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}