'use client';

import { useEffect, useState } from 'react';
import {
    Search,
    Filter,
    Eye,
    Lock,
    Unlock,
    X,
    Edit,
    Mail,
    Phone,
    MapPin,
    Plus,
    Globe,
    Building2,
    MapPinCheck,
    Users,
    CalendarRange,
} from 'lucide-react';
import Pagination from '@/components/admin/Pagination';
import { employerDataFake } from '@/data/admin/employer.admin';
import { useDispatch, useSelector } from 'react-redux';
import { addCity, addJob, addKeyword, addPage, clearCityAndJob } from '@/features/filter/admin/employerFilterSlice';

export default function EmployerPage() {
    const {
        page,
        size,
        keyword,
        city,
        job,
    } = useSelector((state) => state.employerAdmin);
    const dispatch = useDispatch();

    const [employer, setEmployer] = useState([]);
    const [selectedEmployer, setSelectedEmployer] = useState(null);
    //modal
    const [showEmployerFilter, setShowEmployerFilter] = useState(false);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [modalMode, setModalMode] = useState("add");
    const [showModal, setShowModal] = useState(false);

    //pagination 
    const [totalPages, setTotalPages] = useState(1);

    const data = employerDataFake;
    const filteredemployer = data.results;

    useEffect(() => {
        setEmployer(data.results);
        dispatch(addPage(data.meta.currentPage));
        setTotalPages(data.meta.totalPages);
    }, []);


    //modal
    const handleViewDetail = (candidate) => {
        setSelectedEmployer(candidate);
        setShowDetailModal(true);
    };

    const handleAdd = () => {
        setModalMode("add");
        setSelectedEmployer(null);
        setShowModal(true);
    }

    const handleEdit = (candidate) => {
        setModalMode("edit");
        setSelectedEmployer({ ...candidate });
        setShowModal(true);
    };

    const handlePageChange = (page) => {
        dispatch(addPage(page));
    }

    return (
        <div className="candidate-page">
            {/* Toolbar */}
            <div className="candidate-toolbar">
                <div className="search-box">
                    <Search size={20} />
                    <input
                        type="text"
                        placeholder="Tìm kiếm theo tên, email, ngành nghề,..."
                        value={keyword}
                        onChange={(e) => dispatch(addKeyword(e.target.value))}
                    />
                </div>

                <div className="toolbar-actions">
                    <button
                        className={`btn-filter ${showEmployerFilter ? 'active' : ''}`}
                        onClick={() => setShowEmployerFilter(!showEmployerFilter)}
                    >
                        <Filter size={18} />
                        Bộ lọc nâng cao
                    </button>
                </div>
            </div>

            {/* employer Filters */}
            {showEmployerFilter && (
                <div className="advanced-filters">
                    <div className="filter-grid">
                        <div className="filter-item">
                            <label>Thành phố</label>
                            <select
                                value={city}
                                onChange={(e) => dispatch(addCity(e.target.value))}
                            >
                                <option value="all">Tất cả</option>
                                <option value="hcm">Tp Hồ Chí Minh</option>
                                <option value="dn">Tp Đà nẵng</option>
                                <option value="hn">Tp Hà nội</option>
                            </select>
                        </div>
                        <div className="filter-item">
                            <label>Ngành nghề</label>
                            <select
                                value={job}
                                onChange={(e) => dispatch(addJob(e.target.value))}
                            >
                                <option value="all">Tất cả</option>
                                <option value="nhan-su">Nhân sự</option>
                                <option value="ke-toan">Kế toán</option>
                                <option value="cnt">Công nghệ thông tin</option>
                            </select>
                        </div>
                    </div>
                    <div className='filter-clear'>
                        <button
                            className="btn-clear-filter"
                            onClick={() => {
                                dispatch(clearCityAndJob())
                            }}
                        >
                            Xóa tất cả bộ lọc
                        </button>
                    </div>
                </div>
            )}

            <div className="candidate-add">
                <button className='btn-add' onClick={handleAdd}>
                    <Plus size={18} />
                    <span>Thêm doanh nghiệp</span>
                </button>
            </div>

            {/* Table */}
            <div className="candidate-table-container">
                <table className="candidate-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Doanh nghiệp</th>
                            <th>Số điện thoại</th>
                            <th>Ngành nghề</th>
                            <th>Địa chỉ</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredemployer.map((candidate) => (
                            <tr key={candidate.id}>
                                <td>{candidate.id}</td>
                                <td>
                                    <div className="candidate-info">
                                        <img
                                            src={candidate.logo}
                                            alt={candidate.name}
                                            className="candidate-avatar"
                                        />
                                        <div>
                                            <p className="candidate-name">{candidate.name}</p>
                                            <p className="candidate-email">{candidate.email}</p>
                                        </div>
                                    </div>
                                </td>
                                <td>{candidate.phone}</td>
                                <td>{candidate.primaryIndustry}</td>
                                <td>{candidate.address}</td>
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
                                                <Lock size={16} />
                                            ) : (
                                                <Unlock size={16} />
                                            )}
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {employer.length > 0 && (
                <Pagination
                    currentPage={page}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            )}

            {/* Detail Modal */}
            {showDetailModal && selectedEmployer && (
                <div className="modal-overlay" onClick={() => setShowDetailModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>Chi tiết doanh nghiệp</h2>
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
                                        src={selectedEmployer.logo}
                                        alt={selectedEmployer.name}
                                        className="detail-avatar"
                                    />
                                    <div>
                                        <h3>{selectedEmployer.name}</h3>
                                        <p className="designation">
                                            {selectedEmployer.primaryIndustry}
                                        </p>
                                    </div>
                                </div>

                                <div className="detail-grid">
                                    <div className="detail-item">
                                        <Mail size={18} />
                                        <div>
                                            <label>Email</label>
                                            <p>{selectedEmployer.email}</p>
                                        </div>
                                    </div>
                                    <div className="detail-item">
                                        <Phone size={18} />
                                        <div>
                                            <label>Số điện thoại</label>
                                            <p>{selectedEmployer.phone}</p>
                                        </div>
                                    </div>
                                    <div className="detail-item">
                                        <MapPin size={18} />
                                        <div>
                                            <label>Địa điểm</label>
                                            <p>{selectedEmployer.address}</p>
                                        </div>
                                    </div>
                                    <div className="detail-item">
                                        <Globe size={18} />
                                        <div>
                                            <label>Website</label>
                                            <p>
                                                <a href={selectedEmployer.website}
                                                    target="_blank">
                                                    {selectedEmployer.website}
                                                </a>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="detail-item">
                                        <MapPinCheck size={18} />
                                        <div>
                                            <label>Thành phố</label>
                                            <p>{selectedEmployer.city}</p>
                                        </div>
                                    </div>
                                    <div className="detail-item">
                                        <Building2 size={18} />
                                        <div>
                                            <label>Đất nước</label>
                                            <p>{selectedEmployer.country}</p>
                                        </div>
                                    </div>
                                    <div className="detail-item">
                                        <CalendarRange size={18} />
                                        <div>
                                            <label>Năm thành lập</label>
                                            <p>{selectedEmployer.foundedIn}</p>
                                        </div>
                                    </div>
                                    <div className="detail-item">
                                        <Users size={18} />
                                        <div>
                                            <label>Quy mô</label>
                                            <p>{selectedEmployer.size} nhân viên</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="detail-description">
                                    <h4>Mô tả</h4>
                                    <p>{selectedEmployer.description}</p>
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
                            <h2>{modalMode == "edit" ? "Chỉnh sửa thông tin doanh nghiệp" : "Thêm doanh nghiệp"}</h2>
                            <button
                                className="btn-close"
                                onClick={() => setShowModal(false)}
                            >
                                <X size={20} />
                            </button>
                        </div>
                        <div className="modal-body">
                            <form className="edit-form" onSubmit={(e) => { e.preventDefault(); }}>
                                <div className="form-grid">
                                    <div className="form-group">
                                        <label>Tên công ty *</label>
                                        <input
                                            type="text"
                                            value={selectedEmployer?.name || ""}
                                            onChange={(e) => setSelectedEmployer({ ...selectedEmployer, name: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Email *</label>
                                        <input
                                            type="email"
                                            value={selectedEmployer?.email || ""}
                                            onChange={(e) => setSelectedEmployer({ ...selectedEmployer, email: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Số điện thoại</label>
                                        <input
                                            type="tel"
                                            value={selectedEmployer?.phone || ""}
                                            onChange={(e) => setSelectedEmployer({ ...selectedEmployer, phone: e.target.value })}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Ngành nghề chính*</label>
                                        <input
                                            type="text"
                                            value={selectedEmployer?.primaryIndustry || ""}
                                            onChange={(e) => setSelectedEmployer({ ...selectedEmployer, primaryIndustry: e.target.value })}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Quy mô</label>
                                        <input
                                            type="text"
                                            value={selectedEmployer?.size || ""}
                                            onChange={(e) => setSelectedEmployer({ ...selectedEmployer, size: e.target.value })}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Năm thành lập</label>
                                        <input
                                            type="date"
                                            value={selectedEmployer?.foundedIn || ""}
                                            onChange={(e) => setSelectedEmployer({ ...selectedEmployer, foundedIn: e.target.value })}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Quốc gia</label>
                                        <input
                                            type="text"
                                            value={selectedEmployer?.country || ""}
                                            onChange={(e) => setSelectedEmployer({ ...selectedEmployer, country: e.target.value })}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Thành phố</label>
                                        <input
                                            type="text"
                                            value={selectedEmployer?.city || ""}
                                            onChange={(e) => setSelectedEmployer({ ...selectedEmployer, city: e.target.value })}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Website</label>
                                        <input
                                            type="text"
                                            value={selectedEmployer?.website || ""}
                                            onChange={(e) => setSelectedEmployer({ ...selectedEmployer, website: e.target.value })}
                                        />
                                    </div>

                                    <div className="form-group full-width">
                                        <label>Mô tả</label>
                                        <textarea
                                            rows="4"
                                            value={selectedEmployer?.description || ""}
                                            onChange={(e) => setSelectedEmployer({ ...selectedEmployer, description: e.target.value })}
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