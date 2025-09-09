"use client";

import { useEffect, useState } from "react";
import apiClient from "~/utils/axios";

export const ResumeViewer = () => {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchPdf = async () => {
      try {
        const response = await apiClient.get(
          "https://dev-api-hiring.must.company/candidates/get-candidate-resume/35",
          { responseType: "blob" }
        );

        if (response.status !== 200) {
          throw new Error("Failed to fetch PDF");
        }

        // console.log("response", response);

        const blob = response.data;
        const url = URL.createObjectURL(blob);
        setPdfUrl(url);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPdf();

    // cleanup: revoke url when unmounted
    return () => {
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl);
      }
    };
  }, []);

  if (!pdfUrl) {
    return <p>Loading PDF...</p>;
  }

  return (
    <iframe
      src={pdfUrl}
      width="100%"
      height="800px"
      style={{ border: "none" }}
    />
  );
};
