"use client";

import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const parseSalary = (input) => {
  const parts = input.trim().split(/\s+/);
  const amount = Number(parts[0].replace(/,/g, "")); // bỏ dấu phẩy nếu có
  const currency = parts[1] || "";
  return { amount, currency };
};

export default function SalaryInput({ label, value, onChange }) {
  // ========================= State ==============================/
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [formatted, setFormatted] = useState("");

  // ========================= Use Effect ==============================/
  useEffect(() => {
    if (value) {
      const updatedSalary = parseSalary(value);
      setAmount(updatedSalary.amount || "");
      setCurrency(updatedSalary.currency || "USD");
      setFormatted(value);
    }
  }, [value]);

  // ========================= Handle Function ==============================/
  const handleFormat = () => {
    if (!amount) return;
    const formattedAmount = new Intl.NumberFormat("en-US").format(
      Number(amount)
    );
    const result = `${formattedAmount} ${currency}`;
    setFormatted(result);
    onChange && onChange(result);
  };

  const handleAmountChange = (e) => {
    // Loại bỏ mọi ký tự không phải số
    const onlyNumbers = e.target.value.replace(/\D/g, "");

    // Kiểm tra độ dài sau khi đã loại bỏ chữ
    if (onlyNumbers.length <= 12) {
      setAmount(onlyNumbers);
    } else {
      toast.error("Số tiền không được vượt quá 12 chữ số");
    }
  };

  // ========================= Debounce khi nhập amount ==============================/
  useEffect(() => {
    if (!amount) return;
    const timer = setTimeout(() => {
      handleFormat();
    }, 500); // debounce 500ms
    return () => clearTimeout(timer);
  }, [amount]); // gọi khi amount thay đổi

  // ========================= Gọi ngay khi đổi currency ==============================/
  useEffect(() => {
    if (amount) {
      handleFormat();
    }
  }, [currency]);

  // ========================= Render UI ==============================/
  return (
    <div className="form-group col-lg-3 col-md-12">
      <label>{label}</label>
      <div className="flex gap-2">
        {/* input số tiền */}
        <input
          type="number"
          className="form-control"
          placeholder="Enter amount"
          value={amount}
          onChange={handleAmountChange}
          required
        />

        {/* select đơn vị tiền */}
        <select
          className="form-select"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          style={{ marginTop: "10px" }}
        >
          <option value="USD">USD</option>
          <option value="VND">VND</option>
          <option value="EUR">EUR</option>
          <option value="JPY">JPY</option>
        </select>
      </div>

      {/* hiển thị kết quả */}
      {formatted && (
        <p className="mt-2 mb-0 text-success font-semibold">
          Formatted: {formatted}
        </p>
      )}
    </div>
  );
}
