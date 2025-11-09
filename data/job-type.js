export const styleMap = {
    "Full Time": "time",
    "Part Time": "time",
    "Private": "privacy",
    "Urgent": "required",
    "Intern": "level",
    "Junior": "level",
    "Middle": "level",
    "Senior": "level",
};

export const jobTypeOptions = [
    { value: { styleClass: "time", type: "Full Time" }, label: "Full Time" },
    { value: { styleClass: "time", type: "Part Time" }, label: "Part Time" },
    { value: { styleClass: "privacy", type: "Private" }, label: "Private" },
    { value: { styleClass: "required", type: "Urgent" }, label: "Urgent" },

    // Thêm các cấp độ ứng viên
    { value: { styleClass: "level", type: "Intern" }, label: "Intern" },
    { value: { styleClass: "level", type: "Junior" }, label: "Junior" },
    { value: { styleClass: "level", type: "Middle" }, label: "Middle" },
    { value: { styleClass: "level", type: "Senior" }, label: "Senior" },
];