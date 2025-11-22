"use client";

import { useEffect, useRef, useState } from "react";
import {
  createPrivateConversation,
  getCandidatesConversation,
} from "@/services/chat-feature.service";
import { useDispatch } from "react-redux";
import {
  setConversations,
  setCurrentConversation,
} from "@/features/messages/chatSlice";
import { toast } from "react-toastify";

export default function SearchBox() {
  const [search, setSearch] = useState("");
  const [candidates, setCandidates] = useState([]);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const wrapperRef = useRef(null);

  // ================================= Fetch on mount =================================
  useEffect(() => {
    fetchCandidateForChat("");
  }, []);

  // ================================= Debounce search =================================
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchCandidateForChat(search);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  const fetchCandidateForChat = async (search) => {
    try {
      const res = await getCandidatesConversation(search);
      if (res && res.statusCode === 200) {
        setCandidates(res.results);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchConversationExistedOrCreateNew = async (otherUserId) => {
    try {
      const res = await createPrivateConversation(otherUserId);
      if (res && res.statusCode === 201) {
        dispatch(setCurrentConversation(res.data.id));
        dispatch(setConversations(res.data));
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Không thể tạo cuộc hội thoại mới");
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSelectCandidate = (candidate) => {
    setSearch("");
    fetchConversationExistedOrCreateNew(candidate.userId);
    setOpen(false);
  };

  // ================================= Click outside to close =================================
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="position-relative w-100" ref={wrapperRef}>
      <div className="form-group position-relative">
        <input
          type="search"
          className="form-control ps-4"
          placeholder="Search"
          value={search}
          onChange={handleSearchChange}
          onFocus={() => {
            if (candidates.length > 0) setOpen(true);
          }}
        />
      </div>

      {/* =============== DROPDOWN =============== */}
      {open && (
        <ul
          className="list-group position-absolute w-100 mt-1 shadow bg-white"
          style={{ zIndex: 2000, maxHeight: "250px", overflowY: "auto" }}
        >
          {candidates.length > 0 ? (
            candidates.map((c) => (
              <li
                key={c.id}
                onClick={() => handleSelectCandidate(c)}
                className="list-group-item list-group-item-action"
                style={{ cursor: "pointer" }}
              >
                <div className="fw-bold">{c.name}</div>
                <div className="text-muted small">{c.email}</div>
              </li>
            ))
          ) : (
            <li className="list-group-item text-muted small">
              Không tìm thấy ứng viên
            </li>
          )}
        </ul>
      )}
    </div>
  );
}
