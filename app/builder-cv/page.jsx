"use client";

import React from "react";
import CvViewer from "@/components/builder-cv/CvViewer";
import { useSearchParams } from "next/navigation";

const BuilderCvPage = () => {
  const searchParams = useSearchParams();
  const jobId = searchParams.get("jobId"); // Lấy jobId từ query

  return (
    <main>
      <CvViewer jobId={jobId} />
    </main>
  );
};

export default BuilderCvPage;
