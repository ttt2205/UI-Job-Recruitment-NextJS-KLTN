"use client";

import { useState } from "react";
import Image from "next/image";
import { Gallery, Item } from "react-photoswipe-gallery";
import { FaEye, FaTrash } from "react-icons/fa";
import "photoswipe/dist/photoswipe.css";
import {
  uploadImageCompany,
  uploadLogoCompany,
} from "@/services/upload.service";

const LogoCoverUploader = () => {
  const [logoPreview, setLogoPreview] = useState(null);
  const [coverImages, setCoverImages] = useState([]);

  const handleUploadLogo = async (file) => {
    if (!file) return;

    try {
      const result = await uploadLogoCompany(file);
      setLogoPreview(URL.createObjectURL(file));
      console.log("Upload thành công:", result);
      // TODO: Lưu thông tin tên file vào DB nếu cần
    } catch (error) {
      console.error("Upload thất bại:", error);
    }
  };

  const handleUploadCover = async (file) => {
    const previewURL = URL.createObjectURL(file);
    const newItem = {
      id: Date.now(),
      file,
      img: previewURL,
    };
    setCoverImages((prev) => [newItem, ...prev]);
    // TODO: Gọi API upload cover
  };

  const handleDeleteCover = async (id) => {
    setCoverImages((prev) => prev.filter((item) => item.id !== id));
    // TODO: Gọi API xóa cover
  };

  const handleDeleteLogo = async () => {
    setLogoImg(null);
    setLogoPreview(null);
    // TODO: Gọi API xóa logo
  };

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
          {logoPreview && (
            <div className="mb-3">
              <div className="image-box">
                <Image
                  src={logoPreview}
                  alt="Logo preview"
                  width={160}
                  height={140}
                />
                <div className="image-actions">
                  <Item
                    original={logoPreview}
                    thumbnail={logoPreview}
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
            {coverImages.map((item) => (
              <div className="col-6 col-md-4 col-lg-3 mb-3" key={item.id}>
                <div className="image-box mx-auto">
                  <Image
                    src={item.img}
                    alt="Cover preview"
                    width={160}
                    height={140}
                  />
                  <div className="image-actions">
                    <Item
                      original={item.img}
                      thumbnail={item.img}
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
                      onClick={() => handleDeleteCover(item.id)}
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
