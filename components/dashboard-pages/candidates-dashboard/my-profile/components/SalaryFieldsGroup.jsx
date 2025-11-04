export default function SalaryFieldsGroup({ profileForm, onChange }) {
  const { currentSalary, expectedSalary, currency } = profileForm;

  // Hàm định dạng lương
  const formatSalary = (amount, currency) => {
    if (!amount) return "";
    return `${new Intl.NumberFormat("en-US").format(
      Number(amount)
    )} ${currency}`;
  };

  // Hàm xử lý khi thay đổi amount
  const handleAmountChange = (field, value) => {
    const onlyNumbers = value.replace(/\D/g, "");
    if (onlyNumbers.length > 12) return;
    onChange((prev) => ({
      ...prev,
      [field]: onlyNumbers,
    }));
  };

  // Hàm đổi currency
  const handleCurrencyChange = (value) => {
    onChange((prev) => ({
      ...prev,
      currency: value,
    }));
  };

  return (
    <div className="row align-items-end">
      {/* Current Salary */}
      <div className="form-group col-md-5 col-sm-12">
        <label>Current Salary</label>
        <input
          type="number"
          className="form-control"
          placeholder="Enter current salary"
          value={currentSalary || ""}
          onChange={(e) => handleAmountChange("currentSalary", e.target.value)}
        />
      </div>

      {/* Expected Salary */}
      <div className="form-group col-md-5 col-sm-12">
        <label>Expected Salary</label>
        <input
          type="number"
          className="form-control"
          placeholder="Enter expected salary"
          value={expectedSalary || ""}
          onChange={(e) => handleAmountChange("expectedSalary", e.target.value)}
        />
      </div>

      {/* Currency */}
      <div className="form-group col-md-2 col-sm-12">
        <label>Currency</label>
        <select
          className="form-select"
          value={currency || "USD"}
          onChange={(e) => handleCurrencyChange(e.target.value)}
        >
          <option value="">Vui lòng chọn đơn vị lương</option>
          <option value="USD">USD</option>
          <option value="VND">VND</option>
          <option value="EUR">EUR</option>
          <option value="JPY">JPY</option>
        </select>
      </div>

      {/* Hiển thị kết quả format */}
      {(currentSalary || expectedSalary) && (
        <div className="col-12 mt-2 text-success small">
          💰 Current: {formatSalary(currentSalary, currency)} | Expected:{" "}
          {formatSalary(expectedSalary, currency)}
        </div>
      )}
    </div>
  );
}
