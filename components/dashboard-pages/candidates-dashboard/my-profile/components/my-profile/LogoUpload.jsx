"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Gallery, Item } from "react-photoswipe-gallery";
import { FaEye, FaTrash } from "react-icons/fa";
import "photoswipe/dist/photoswipe.css";
import {
  uploadAvatarCandidate,
  uploadImageCandidate,
  deleteAvatarCandidate,
  getAvatarOfCandidateById,
  getImagesOfCandidateById,
  deleteImageCandidateById,
} from "@/services/upload.service";
import { toast } from "react-toastify";

const LogoUpload = ({ candidateId }) => {
  // ================================ State ================================/
  const [logo, setLogo] = useState("");
  const [coverImages, setCoverImages] = useState([]);

  useEffect(() => {
    if (candidateId) {
      fetchLogoOfCandidate();
      fetchImagesOfCandidate();
    }
  }, [candidateId]);

  // ================================ Fetch Functions ================================/
  const fetchLogoOfCandidate = async () => {
    try {
      const res = await getAvatarOfCandidateById(candidateId);
      console.log("logo candidate: ", res.data);
      setLogo(res?.data || "");
    } catch (error) {
      console.error("Không thể tải ảnh đại diện!");
    }
  };

  const fetchImagesOfCandidate = async () => {
    try {
      const res = await getImagesOfCandidateById(candidateId);
      const urlImages = res?.results || [];
      setCoverImages(urlImages);
    } catch (error) {
      console.error("Không thể tải ảnh ứng viên!");
    }
  };

  // ================================ Handle Functions ================================/
  const handleUploadLogo = async (file) => {
    if (!file) return;

    // 1. Kiểm tra dung lượng (ví dụ 2MB)
    const MAX_SIZE_MB =
      Number(process.env.NEXT_PUBLIC_LOGO_OR_AVATAR_SIZE_LIMIT) || 5;
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      toast.error(`Ảnh vượt quá ${MAX_SIZE_MB}MB. Vui lòng chọn ảnh nhẹ hơn.`);
      return;
    }

    // 2. Kiểm tra chiều rộng / chiều cao
    const MAX_WIDTH = 2000;
    const MAX_HEIGHT = 2000;

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

      if (!candidateId) {
        toast.error(
          "Ứng viên không tồn tại. Vui lòng lưu hồ sơ trước khi upload."
        );
        return;
      }

      const res = await uploadAvatarCandidate(candidateId, file);
      setLogo(res?.data);
      toast.success("Upload ảnh đại diện thành công!");
    } catch (error) {
      console.error("Upload ảnh đại diện thất bại:", error);
      toast.error("Upload ảnh đại diện thất bại!");
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

      if (!candidateId) {
        toast.error(
          "Ứng viên không tồn tại. Vui lòng lưu hồ sơ trước khi upload."
        );
        return;
      }

      // ===== 3. Nếu hợp lệ thì upload =====
      const res = await uploadImageCandidate(candidateId, file);
      setCoverImages((prev) => [res.data, ...prev]);
      toast.success("Upload ảnh thành công!");
    } catch (error) {
      console.error("Upload ảnh thất bại:", error);
      toast.error("Upload ảnh thất bại!");
    }
  };

  const handleDeleteCover = async (instance) => {
    try {
      const res = await deleteImageCandidateById(instance.id);
      if (res && res.statusCode === 200) {
        setCoverImages((prev) =>
          prev.filter((item) => item.filename !== instance.filename)
        );
        toast.success("Xóa ảnh đại diện thành công!");
      }
    } catch (error) {
      toast.error("Xóa ảnh đại diện thất bại!");
    }
  };

  const handleDeleteLogo = async () => {
    try {
      const res = await deleteAvatarCandidate(candidateId, logo);
      if (res && res.statusCode === 200) {
        setLogo("");
        toast.success("Xóa ảnh đại diện thành công!");
      }
    } catch (error) {
      console.log("error: ", error);
      toast.error("Xóa ảnh đại diện thất bại!");
    }
  };

  // ================================ Render UI ================================/
  return (
    <div className="container py-3">
      {/* LOGO UPLOADER */}
      <div className="d-flex flex-column align-items-start mb-4 border-bottom pb-3">
        <Gallery>
          {logo && (
            <div className="mb-3">
              <div className="image-box">
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_BACKEND_URL_IMAGE_CANDIDATE}/${logo}`}
                  alt="Logo preview"
                  width={160}
                  height={140}
                />
                <div className="image-actions">
                  <Item
                    original={`${process.env.NEXT_PUBLIC_API_BACKEND_URL_IMAGE_CANDIDATE}/${logo}`}
                    thumbnail={`${process.env.NEXT_PUBLIC_API_BACKEND_URL_IMAGE_CANDIDATE}/${logo}`}
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
                    src={`${process.env.NEXT_PUBLIC_API_BACKEND_URL_IMAGE_CANDIDATE}/${item?.filename}`}
                    alt="Cover preview"
                    width={160}
                    height={140}
                  />
                  <div className="image-actions">
                    <Item
                      original={`${process.env.NEXT_PUBLIC_API_BACKEND_URL_IMAGE_CANDIDATE}/${item?.filename}`}
                      thumbnail={`${process.env.NEXT_PUBLIC_API_BACKEND_URL_IMAGE_CANDIDATE}/${item?.filename}`}
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

export default LogoUpload;
