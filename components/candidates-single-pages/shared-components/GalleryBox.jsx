"use client";

import { Gallery, Item } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";
import galleryItem from "../../../data/gallery";
import Image from "next/image";
import { getImagesOfCandidateById } from "@/services/upload.service";
import { useEffect, useState } from "react";

const GalleryBox = ({ candidateId }) => {
  // =========================== States ========================
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (candidateId) {
      setLoading(true);
      fetchImagesByCandidateId();
      setLoading(false);
    }
  }, [candidateId]);

  // =========================== Fetch Functions ========================
  const fetchImagesByCandidateId = async () => {
    try {
      const res = await getImagesOfCandidateById(candidateId);
      const formatData =
        res?.results?.map((item) => ({
          ...item,
          filename: `${process.env.NEXT_PUBLIC_API_BACKEND_URL_IMAGE_CANDIDATE}/${item.filename}`,
        })) || [];
      setImages(formatData);
    } catch (error) {
      console.error(
        "Error fetchImagesByCandidateId in candidates-single-v3: ",
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
