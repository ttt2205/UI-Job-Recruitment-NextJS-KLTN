export default function AccountRegistrationTable({ data }) {
    const sortedData = [...data].sort((a, b) => b.createdAt - a.createdAt);

    return (
        <div className="table-wrapper">
            <table className="admin-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Email</th>
                        <th>Loại tài khoản</th>
                        <th>Trạng thái</th>
                        <th>Ngày đăng ký</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedData.map(item => (
                        <tr key={item.id}>
                            <td>#{item.id}</td>
                            <td>{item.email}</td>
                            <td>
                                <span className={`badge badge-${item.role}`}>
                                    {item.role === 'candidate' ? 'Ứng viên' : 'Nhà tuyển dụng'}
                                </span>
                            </td>
                            <td>
                                <span className={`status status-${item.status ? 'active' : 'inactive'}`}>
                                    {item.status ? 'Hoạt động' : 'Không hoạt động'}
                                </span>
                            </td>
                            <td>{item.createdAt.toLocaleDateString('vi-VN')}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}