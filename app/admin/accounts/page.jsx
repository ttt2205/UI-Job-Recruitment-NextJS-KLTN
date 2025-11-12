'use client';

import { useEffect, useState } from 'react';
import {
    Search,
    Filter,
    Lock,
    Unlock,
    Briefcase
} from 'lucide-react';
import Pagination from '@/components/admin/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { setPage, setSearch, clearFilters, setStatus } from '@/features/filter/admin/userFilterSlice';
import { getListUsers, getUserStatusStatistic, patchLockUser } from '@/services/user-admin.service';
import { toast } from 'react-toastify';

export default function AccountPage() {
    const {
        page,
        size,
        search,
        status,
        sort
    } = useSelector((state) => state.userAdmin);
    const dispatch = useDispatch();

    const [users, setUsers] = useState([]);
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
    const [showFilter, setShowFilter] = useState(false);

    useEffect(() => {
        const fetchAPI = async () => {
            try {
                const [resList, resStatistic] = await Promise.all([
                    getListUsers({
                        page, size, search, sort, status
                    }),
                    getUserStatusStatistic()
                ]);

                if (resList.statusCode === 200) {
                    setUsers(resList.results);
                    setMeta(resList.meta)
                }

                if (resStatistic.statusCode === 200) {
                    setStatistic(resStatistic.data);
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
            const res = await patchLockUser(id);
            if (res.success) {
                setUsers(
                    users.map((c) =>
                        c.id === id ? { ...c, status: !c.status } : c
                    )
                );
                toast.success(res.message);
            } else {
                toast.error("Cập nhật thất bại!");
            }
        } catch (error) {
            console.error("Lỗi khi khóa tài khoản", error);
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
                        placeholder="Tìm kiếm theo email..."
                        value={search}
                        onChange={(e) => dispatch(setSearch(e.target.value))}
                    />
                </div>

                <div className="toolbar-actions">
                    <button
                        className={`btn-filter ${showFilter ? 'active' : ''}`}
                        onClick={() => setShowFilter(!showFilter)}
                    >
                        <Filter size={18} />
                        Bộ lọc nâng cao
                    </button>
                </div>
            </div>

            {/* employer Filters */}
            {showFilter && (
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


            {/* Statistics Cards */}
            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-icon blue">
                        <Briefcase size={24} />
                    </div>
                    <div className="stat-content">
                        <p className="stat-label">Tổng tài khoản</p>
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
                            <th>Email</th>
                            <th>Trạng thái</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.email}</td>
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

            {users.length > 0 && (
                <Pagination
                    currentPage={meta.currentPage + 1}
                    totalPages={meta.totalPages}
                    onPageChange={handlePageChange}
                />
            )}
        </div>
    );
}