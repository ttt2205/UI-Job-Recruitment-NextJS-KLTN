"use client";

import { useState, useEffect } from 'react';
import {
    Users,
    Briefcase,
    Building2,
    BarChart3,
    ChevronLeft,
    ChevronRight,
    Calendar
} from 'lucide-react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    LineChart,
    Line
} from 'recharts';
import StatCard from '@/components/admin/StatCard';
import AccountRegistrationTable from '@/components/admin/AccountRegistrationTable';
import JobPostingTable from '@/components/admin/JobPostingTable';

export default function StatisticsPage() {
    const [activeTab, setActiveTab] = useState('overview');
    const [currentMonth, setCurrentMonth] = useState(new Date(2025, 9));
    const [registrationData, setRegistrationData] = useState([]);
    const [jobPostingData, setJobPostingData] = useState([]);
    const [stats, setStats] = useState({
        totalRegistrations: 0,
        totalJobPostings: 0,
        candidatesCount: 0,
        employersCount: 0
    });
    const [chartData, setChartData] = useState([]);

    const generateFakeData = (month) => {
        const year = month.getFullYear();
        const monthNum = month.getMonth();
        const daysInMonth = new Date(year, monthNum + 1, 0).getDate();

        const fakeRegistrations = Array.from({ length: 25 }, (_, i) => ({
            id: i + 1,
            email: `user${i + 1}@example.com`,
            role: ['candidate', 'employer'][Math.floor(Math.random() * 2)],
            status: Math.random() > 0.3,
            createdAt: new Date(year, monthNum, Math.floor(Math.random() * daysInMonth) + 1)
        }));

        const fakeJobPostings = Array.from({ length: 20 }, (_, i) => ({
            id: i + 1,
            title: ['Senior Developer', 'UI/UX Designer', 'Product Manager', 'Data Analyst', 'DevOps Engineer'][Math.floor(Math.random() * 5)],
            employerName: ['Tech Company A', 'Startup B', 'Enterprise C', 'Agency D', 'Corp E'][Math.floor(Math.random() * 5)],
            quantity: Math.floor(Math.random() * 5) + 1,
            status: Math.random() > 0.2,
            createdAt: new Date(year, monthNum, Math.floor(Math.random() * daysInMonth) + 1),
            industry: ['Technology', 'Finance', 'Healthcare', 'E-commerce'][Math.floor(Math.random() * 4)]
        }));

        setRegistrationData(fakeRegistrations);
        setJobPostingData(fakeJobPostings);

        const candidates = fakeRegistrations.filter(r => r.role === 'candidate').length;
        const employers = fakeRegistrations.filter(r => r.role === 'employer').length;

        setStats({
            totalRegistrations: fakeRegistrations.length,
            totalJobPostings: fakeJobPostings.length,
            candidatesCount: candidates,
            employersCount: employers
        });

        const registrationsByDay = Array.from({ length: daysInMonth }, (_, i) => {
            const day = i + 1;
            const regCount = fakeRegistrations.filter(d => d.createdAt.getDate() === day).length;
            const jobCount = fakeJobPostings.filter(d => d.createdAt.getDate() === day).length;
            return {
                day,
                'Đăng ký': regCount,
                'Công việc': jobCount
            };
        });

        setChartData(registrationsByDay);
    };

    useEffect(() => {
        generateFakeData(currentMonth);
    }, [currentMonth]);

    const handlePrevMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
    };

    const handleNextMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
    };

    const monthName = currentMonth.toLocaleDateString('vi-VN', { month: 'long', year: 'numeric' });

    return (
        <div className="admin-dashboard">
            <div className="dashboard-month-selector">
                <button className="month-nav-btn" onClick={handlePrevMonth}>
                    <ChevronLeft size={20} />
                </button>
                <div className="month-display">
                    <Calendar size={20} />
                    <span>{monthName}</span>
                </div>
                <button className="month-nav-btn" onClick={handleNextMonth}>
                    <ChevronRight size={20} />
                </button>
            </div>

            <div className="dashboard-stats-container">
                <StatCard
                    title="Tổng đăng ký"
                    value={stats.totalRegistrations}
                    icon={<Users size={32} />}
                    color="primary"
                />
                <StatCard
                    title="Ứng viên"
                    value={stats.candidatesCount}
                    icon={<Briefcase size={32} />}
                    color="success"
                />
                <StatCard
                    title="Nhà tuyển dụng"
                    value={stats.employersCount}
                    icon={<Building2 size={32} />}
                    color="warning"
                />
                <StatCard
                    title="Vị trí công việc"
                    value={stats.totalJobPostings}
                    icon={<BarChart3 size={32} />}
                    color="info"
                />
            </div>

            <div className="dashboard-tabs-container">
                <div className="dashboard-tabs">
                    <button
                        className={`dashboard-tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
                        onClick={() => setActiveTab('overview')}
                    >
                        Tổng quan
                    </button>
                    <button
                        className={`dashboard-tab-btn ${activeTab === 'registrations' ? 'active' : ''}`}
                        onClick={() => setActiveTab('registrations')}
                    >
                        Danh sách đăng ký
                    </button>
                    <button
                        className={`dashboard-tab-btn ${activeTab === 'jobPostings' ? 'active' : ''}`}
                        onClick={() => setActiveTab('jobPostings')}
                    >
                        Danh sách công việc
                    </button>
                </div>
            </div>

            <div className="dashboard-content-container">
                {activeTab === 'overview' && (
                    <div className="dashboard-charts-grid">
                        <div className="dashboard-chart-box">
                            <h2>Thống kê theo ngày trong tháng</h2>
                            <ResponsiveContainer width="100%" height={400}>
                                <BarChart data={chartData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="day" />
                                    <YAxis />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: '#fff',
                                            border: '1px solid #e5e7eb',
                                            borderRadius: '8px'
                                        }}
                                    />
                                    <Legend />
                                    <Bar dataKey="Đăng ký" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                                    <Bar dataKey="Công việc" fill="#06b6d4" radius={[8, 8, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="dashboard-chart-box">
                            <h2>Xu hướng tháng {currentMonth.getMonth() + 1}</h2>
                            <ResponsiveContainer width="100%" height={400}>
                                <LineChart data={chartData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="day" />
                                    <YAxis />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: '#fff',
                                            border: '1px solid #e5e7eb',
                                            borderRadius: '8px'
                                        }}
                                    />
                                    <Legend />
                                    <Line
                                        type="monotone"
                                        dataKey="Đăng ký"
                                        stroke="#3b82f6"
                                        strokeWidth={2}
                                        dot={{ fill: '#3b82f6', r: 4 }}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="Công việc"
                                        stroke="#06b6d4"
                                        strokeWidth={2}
                                        dot={{ fill: '#06b6d4', r: 4 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                )}

                {activeTab === 'registrations' && (
                    <div className="dashboard-table-box">
                        <h2>Danh sách đăng ký tài khoản tháng {currentMonth.getMonth() + 1}/{currentMonth.getFullYear()}</h2>
                        <AccountRegistrationTable data={registrationData} />
                    </div>
                )}

                {activeTab === 'jobPostings' && (
                    <div className="dashboard-table-box">
                        <h2>Danh sách vị trí công việc đăng tuyển tháng {currentMonth.getMonth() + 1}/{currentMonth.getFullYear()}</h2>
                        <JobPostingTable data={jobPostingData} />
                    </div>
                )}
            </div>
        </div>
    );
}