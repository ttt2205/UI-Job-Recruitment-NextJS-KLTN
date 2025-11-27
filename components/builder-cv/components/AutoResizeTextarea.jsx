import React, { useRef, useEffect } from "react";

const AutoResizeTextarea = ({
  value,
  onChange,
  className,
  style,
  ...props
}) => {
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [value]);

  return (
    <textarea
      ref={textareaRef}
      value={value || ""}
      onChange={onChange}
      className={className}
      style={style}
      rows={1}
      {...props}
    />
  );
};

export default AutoResizeTextarea;
