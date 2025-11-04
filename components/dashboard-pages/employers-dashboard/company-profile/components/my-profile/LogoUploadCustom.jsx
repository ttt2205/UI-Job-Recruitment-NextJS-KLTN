"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Gallery, Item } from "react-photoswipe-gallery";
import { FaEye, FaTrash } from "react-icons/fa";
import "photoswipe/dist/photoswipe.css";
import {
  uploadImageCompany,
  uploadLogoCompany,
  getImagesOfCompanyById,
  getLogoOfCompanyById,
  deleteLogoCompany,
  deleteImageCompany,
} from "@/services/upload.service";
import { toast } from "react-toastify";

const LogoCoverUploader = ({ companyId }) => {
  // ================================ State ================================/
  const [logo, setLogo] = useState("");
  const [coverImages, setCoverImages] = useState([]);

  useEffect(() => {
    if (companyId) {
      fetchLogoOfCompany();
      fetchImagesOfCompany();
    }
  }, [companyId]);

  // ================================ Fetch Functions ================================/
  const fetchLogoOfCompany = async () => {
    try {
      const res = await getLogoOfCompanyById(companyId);
      console.log("logo company: ", res.data);
      setLogo(res?.data || "");
    } catch (error) {
      toast.error("Không thể tải logo công ty!");
    }
  };

  const fetchImagesOfCompany = async () => {
    try {
      const res = await getImagesOfCompanyById(companyId);
      const urlImages = res?.results?.map((image) => image) || [];
      setCoverImages(urlImages);
    } catch (error) {
      toast.error("Không thể tải ảnh công ty!");
    }
  };

  // ================================ Handle Functions ================================/
  const handleUploadLogo = async (file) => {
    if (!file) return;

    // 1. Kiểm tra dung lượng (ví dụ 2MB)
    const MAX_SIZE_MB =
      Number(process.env.NEXT_PUBLIC_LOGO_OR_AVATAR_SIZE_LIMIT) || 5;
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      toast.error("Ảnh vượt quá 2MB. Vui lòng chọn ảnh nhẹ hơn.");
      return;
    }

    // 2. Kiểm tra chiều rộng / chiều cao
    const MAX_WIDTH = 1000;
    const MAX_HEIGHT = 1000;

    // ✅ Upload nếu hợp lệ
    try {
      const bitmap = await createImageBitmap(file);
      const { width, height } = bitmap;

      if (width > MAX_WIDTH || height > MAX_HEIGHT) {
        toast.error(
          `Ảnh quá lớn (${width}x${height}px). Tối đa ${MAX_WIDTH}x${MAX_HEIGHT}px.`
        );
        return;
      }

      const res = await uploadLogoCompany(companyId, file);
      setLogo(res?.data);
      toast.success("Upload Logo thành công!");
    } catch (error) {
      console.error("Upload Logo thất bại:", error);
      toast.error("Upload Logo thất bại!");
    }
  };

  const handleUploadCover = async (file) => {
    if (!file) return;

    // ===== 1. Kiểm tra dung lượng ảnh =====
    const MAX_SIZE_MB =
      Number(process.env.NEXT_PUBLIC_IMAGE_COVER_SIZE_LIMIT) || 5;
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      toast.error(`Ảnh vượt quá ${MAX_SIZE_MB}MB. Vui lòng chọn ảnh nhẹ hơn.`);
      return;
    }

    // ===== 2. Kiểm tra kích thước ảnh bằng createImageBitmap (tránh xung đột Image) =====
    const MAX_WIDTH = 2000;
    const MAX_HEIGHT = 2000;

    try {
      const bitmap = await createImageBitmap(file);
      const { width, height } = bitmap;

      if (width > MAX_WIDTH || height > MAX_HEIGHT) {
        toast.error(
          `Ảnh quá lớn (${width}x${height}px). Tối đa ${MAX_WIDTH}x${MAX_HEIGHT}px.`
        );
        return;
      }

      // ===== 3. Nếu hợp lệ thì upload =====
      const res = await uploadImageCompany(companyId, file);
      setCoverImages((prev) => [res.data, ...prev]);
      toast.success("Upload ảnh thành công!");
    } catch (error) {
      console.error("Upload ảnh thất bại:", error);
      toast.error("Upload ảnh thất bại!");
    }
  };

  const handleDeleteCover = async (file) => {
    try {
      setCoverImages((prev) => prev.filter((item) => item !== file));
      await deleteImageCompany(companyId, file);
      toast.success("Xóa ảnh công ty thành công!");
    } catch (error) {
      toast.error("Xóa ảnh công ty thất bại!");
    }
  };

  const handleDeleteLogo = async () => {
    try {
      setLogo("");
      await deleteLogoCompany(companyId, logo);
      toast.success("Xóa Logo công ty thành công!");
    } catch (error) {
      toast.error("Xóa logo công ty thất bại!");
    }
  };
  // ================================ Render UI ================================/
  return (
    <div className="container py-3">
      <style jsx global>{`
        .pswp {
          z-index: 9999 !important;
        }
        .pswp__bg {
          background: rgba(0, 0, 0, 0.8) !important;
        }
        .image-box {
          width: 160px;
          height: 140px;
          background-color: #f8f9fa;
          border: 1px solid #dee2e6;
          border-radius: 0.5rem;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .image-box img {
          object-fit: contain;
        }
        .image-box .image-actions {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          display: flex;
          gap: 8px;
          opacity: 0.2;
          transition: opacity 0.3s ease;
        }
        .image-box:hover .image-actions {
          opacity: 1;
        }
        .image-actions button {
          background-color: rgba(255, 255, 255, 0.85);
          color: #333;
          border: 1px solid #ccc;
        }
      `}</style>

      {/* LOGO UPLOADER */}
      <div className="d-flex flex-column align-items-start mb-4 border-bottom pb-3">
        <Gallery>
          {logo && (
            <div className="mb-3">
              <div className="image-box">
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_BACKEND_URL_IMAGE_COMPANY}/${logo}`}
                  alt="Logo preview"
                  width={160}
                  height={140}
                />
                <div className="image-actions">
                  <Item
                    original={`${process.env.NEXT_PUBLIC_API_BACKEND_URL_IMAGE_COMPANY}/${logo}`}
                    thumbnail={`${process.env.NEXT_PUBLIC_API_BACKEND_URL_IMAGE_COMPANY}/${logo}`}
                    width={800}
                    height={600}
                  >
                    {({ ref, open }) => (
                      <button
                        ref={ref}
                        onClick={open}
                        className="btn btn-sm rounded-circle p-2"
                      >
                        <FaEye />
                      </button>
                    )}
                  </Item>
                  <button
                    className="btn btn-sm rounded-circle p-2"
                    onClick={handleDeleteLogo}
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          )}
        </Gallery>

        <div className="me-4">
          <input
            type="file"
            accept="image/*"
            id="upload_logo"
            className="d-none"
            onChange={(e) => handleUploadLogo(e.target.files[0])}
          />
          <label
            htmlFor="upload_logo"
            className="btn btn-outline-primary btn-sm px-3 py-2"
          >
            Upload Logo
          </label>
          <div className="text-muted small mt-2">
            Max file size 1MB. Min dimension: 330x300. Format: .jpg, .png
          </div>
        </div>
      </div>

      {/* COVER IMAGES UPLOADER */}
      <div className="d-flex flex-column align-items-start border-bottom pb-3">
        <Gallery>
          <div className="row w-100 mb-3">
            {coverImages?.map((item) => (
              <div className="col-6 col-md-4 col-lg-3 mb-3">
                <div className="image-box mx-auto">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_API_BACKEND_URL_IMAGE_COMPANY}/${item}`}
                    alt="Cover preview"
                    width={160}
                    height={140}
                  />
                  <div className="image-actions">
                    <Item
                      original={`${process.env.NEXT_PUBLIC_API_BACKEND_URL_IMAGE_COMPANY}/${item}`}
                      thumbnail={`${process.env.NEXT_PUBLIC_API_BACKEND_URL_IMAGE_COMPANY}/${item}`}
                      width={800}
                      height={600}
                    >
                      {({ ref, open }) => (
                        <button
                          ref={ref}
                          onClick={open}
                          className="btn btn-sm rounded-circle p-2"
                        >
                          <FaEye />
                        </button>
                      )}
                    </Item>
                    <button
                      className="btn btn-sm rounded-circle p-2"
                      onClick={() => handleDeleteCover(item)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Gallery>

        <div className="me-4">
          <input
            type="file"
            accept="image/*"
            id="upload_cover"
            className="d-none"
            onChange={(e) => handleUploadCover(e.target.files[0])}
          />
          <label
            htmlFor="upload_cover"
            className="btn btn-outline-success btn-sm px-3 py-2"
          >
            Upload Cover
          </label>
          <div className="text-muted small mt-2">
            Max file size 1MB. Min dimension: 330x300. Format: .jpg, .png
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoCoverUploader;
