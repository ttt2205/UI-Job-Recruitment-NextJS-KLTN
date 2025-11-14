"use client";

import { Gallery, Item } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";
import galleryItem from "../../../data/gallery";
import Image from "next/image";
import { getImagesOfCompanyById } from "@/services/upload.service";
import { useEffect, useState } from "react";

const GalleryBox = ({ employerId }) => {
  // =========================== States ========================
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (employerId) {
      setLoading(true);
      fetchImagesByEmployerId();
      setLoading(false);
    }
  }, [employerId]);

  // =========================== Fetch Functions ========================
  const fetchImagesByEmployerId = async () => {
    try {
      const res = await getImagesOfCompanyById(employerId);
      const formatData =
        res?.results?.map((item) => ({
          ...item,
          filename: `${process.env.NEXT_PUBLIC_API_BACKEND_URL_IMAGE_COMPANY}/${item.filename}`,
        })) || [];
      setImages(formatData);
    } catch (error) {
      console.error(
        "Error fetchImagesByEmployerId in employer-single-v1: ",
        error
      );
    }
  };

  // =========================== Render UI ========================
  if (loading || images.length === 0) return;

  return (
    <>
      <Gallery>
        {images.map((singleItem) => (
          <div className="col-lg-3 col-md-3 col-sm-6" key={singleItem.id}>
            <figure className="image" role="button">
              <Item
                original={singleItem.filename}
                thumbnail={singleItem.filename}
                width={800}
                height={400}
              >
                {({ ref, open }) => (
                  <div className="lightbox-image" ref={ref} onClick={open}>
                    <Image
                      width={190}
                      height={167}
                      src={singleItem.filename}
                      alt="resource"
                      style={{ objectFit: "cover", borderRadius: "8px" }}
                    />
                  </div>
                )}
              </Item>
            </figure>
          </div>
        ))}
      </Gallery>
    </>
  );
};

export default GalleryBox;
