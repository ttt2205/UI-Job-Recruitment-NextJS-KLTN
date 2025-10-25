import Link from "next/link";

export default function MenuItem({ item, handleClick }) {
  return item.routePath ? (
    // 👉 Dùng Link khi có đường dẫn
    <Link href={item.routePath}>
      <i className={`la ${item.icon}`}></i> {item.name}
    </Link>
  ) : (
    // 👉 Dùng button khi không có đường dẫn
    <button
      onClick={() => handleClick(item)}
      className="flex items-center gap-2 w-full text-left btn-style-eight"
    >
      <i className={`la ${item.icon}`}></i> {item.name}
    </button>
  );
}
