'use client';

import { useEffect, useState } from 'react';
import {
    Search,
    Filter,
    Lock,
    Unlock,
} from 'lucide-react';
import Pagination from '@/components/admin/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { setPage, setSearch, clearFilters, setStatus } from '@/features/filter/admin/employerFilterSlice';
import { getListEmployers, patchLockEmployer } from '@/services/employer-admin.service';
import { toast } from 'react-toastify';

export default function EmployerPage() {
    const {
        page,
        size,
        search,
        status,
        sort
    } = useSelector((state) => state.employerAdmin);
    const dispatch = useDispatch();

    const [employer, setEmployer] = useState([]);
    const [meta, setMeta] = useState({
        totalItems: 0,
        currentPage: 0,
        pageSize: 10,
        totalPages: 0
    });

    //modal
    const [showEmployerFilter, setShowEmployerFilter] = useState(false);

    useEffect(() => {
        const fetchAPI = async () => {
            try {
                const res = await getListEmployers({
                    page, size, search, sort, status
                });
                if (res.statusCode == 200) {
                    setEmployer(res.results);
                    setMeta(res.meta)
                }
            } catch (error) {
                console.error("Lỗi fetchAPI:", error);
            }
        };
        fetchAPI();
    }, [page, size, search, sort, status]);


    const handlePageChange = (page) => {
        dispatch(setPage(page));
    }

    const handleToggleStatus = async (id) => {
        try {
            const res = await patchLockEmployer(id);
            if (res.success) {
                setEmployer(
                    employer.map((c) =>
                        c.id === id ? { ...c, status: !c.status } : c
                    )
                );
                toast.success(res.message);
            } else {
                toast.error("Cập nhật thất bại!");
            }
        } catch (error) {
            console.error("Lỗi khi khóa công ty", error);
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
                        placeholder="Tìm kiếm theo tên, email, ngành nghề,..."
                        value={search}
                        onChange={(e) => dispatch(setSearch(e.target.value))}
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
                            <label>Trạng thái</label>
                            <select
                                className="filter-select"
                                value={status}
                                onChange={(e) => dispatch(setStatus(e.target.value))}
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
                                dispatch(clearFilters())
                            }}
                        >
                            Xóa tất cả bộ lọc
                        </button>
                    </div>
                </div>
            )}

            {/* Table */}
            <div className="candidate-table-container">
                <table className="candidate-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Doanh nghiệp</th>
                            <th>Ngành nghề</th>
                            <th>Số điện thoại</th>
                            <th>Địa chỉ</th>
                            <th>Số lượng công việc</th>
                            <th>Trạng thái</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employer.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>
                                    <div className="candidate-info">
                                        <img
                                            src={item.logo}
                                            alt={item.name}
                                            className="candidate-avatar"
                                        />
                                        <div>
                                            <p className="candidate-name">{item.name}</p>
                                            <p className="candidate-email">{item.email}</p>
                                            <p className="candidate-email">Năm thành lập: {item.foundedIn}</p>
                                            <p className="candidate-email">Quy mô: {item.size} nhân viên</p>
                                        </div>
                                    </div>
                                </td>
                                <td>{item.primaryIndustry}</td>
                                <td>{item.phone}</td>
                                <td>{item.address}</td>
                                <td>{item.jobNumber}</td>
                                <td>
                                    <span
                                        className={`status-badge ${item.status == true ? 'active' : 'locked'}`}
                                    >
                                        {item.status == true
                                            ? 'Hoạt động'
                                            : 'Đã khóa'}
                                    </span>
                                </td>
                                <td>
                                    <div className="action-buttons">
                                        <button
                                            className="btn-icon btn-lock"
                                            onClick={() => handleToggleStatus(item.id)}
                                            title={
                                                item.status == true
                                                    ? 'Khóa tài khoản'
                                                    : 'Mở khóa'
                                            }
                                        >
                                            {item.status == false ? (
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
                    currentPage={meta.currentPage + 1}
                    totalPages={meta.totalPages}
                    onPageChange={handlePageChange}
                />
            )}
        </div>
    );
}