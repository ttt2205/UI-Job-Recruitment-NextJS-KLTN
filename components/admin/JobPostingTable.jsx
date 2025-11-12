export default function JobPostingTable({ data }) {
    const sortedData = [...data].sort((a, b) => b.createdAt - a.createdAt);

    return (
        <div className="table-wrapper">
            <table className="admin-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Vị trí</th>
                        <th>Nhà tuyển dụng</th>
                        <th>Ngành</th>
                        <th>Số lượng</th>
                        <th>Trạng thái</th>
                        <th>Ngày đăng</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedData.map(item => (
                        <tr key={item.id}>
                            <td>#{item.id}</td>
                            <td>{item.title}</td>
                            <td>{item.employerName}</td>
                            <td>{item.industry}</td>
                            <td>{item.quantity}</td>
                            <td>
                                <span className={`status status-${item.status ? 'active' : 'inactive'}`}>
                                    {item.status ? 'Hoạt động' : 'Hết hạn'}
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