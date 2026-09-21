"use client";

import { useState } from "react";

interface CertificateDownloadProps {
  courseId: string;
  label?: string;
  className?: string;
  wrapperClassName?: string;
  viewClassName?: string;
  showView?: boolean;
}

// Downloads the student's certificate in a way that works on phones as well as desktops.
// A plain link to the PDF can dump a student onto a raw error page if their session has
// expired, and some phone browsers ignore the attachment header. This fetches the file
// first (so errors show as a message), then saves it - through the share sheet on iPhone
// and iPad, or a normal download elsewhere. "View" opens it in the browser's PDF viewer,
// which is the fallback when an in-app browser blocks downloads.
export default function CertificateDownload({
  courseId,
  label = "Download Certificate",
  className = "",
  wrapperClassName = "",
  viewClassName = "text-xs font-bold text-green-700 underline",
  showView = true,
}: CertificateDownloadProps) {
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const url = `/api/certificates/${courseId}`;
  const filename = `${courseId}-certificate.pdf`;

  const download = async () => {
    setBusy(true);
    setMessage("");
    try {
      const res = await fetch(url, { cache: "no-store", credentials: "same-origin" });
      if (!res.ok) {
        let text = "Could not download the certificate. Please try again.";
        try {
          const data = await res.json();
          if (data?.error) text = data.error;
        } catch {
          // Keep the generic message.
        }
        setMessage(res.status === 401 ? "Please sign in again to download your certificate." : text);
        return;
      }

      const blob = new Blob([await res.arrayBuffer()], { type: "application/pdf" });
      const file = new File([blob], filename, { type: "application/pdf" });
      const isIos =
        /iPad|iPhone|iPod/.test(navigator.userAgent) ||
        (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

      if (isIos && typeof navigator.canShare === "function" && navigator.canShare({ files: [file] })) {
        try {
          await navigator.share({ files: [file], title: "SCDS Certificate" });
          return;
        } catch (error) {
          if (error instanceof DOMException && error.name === "AbortError") return;
          // Sharing failed for another reason - fall through to a normal download.
        }
      }

      const objectUrl = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = objectUrl;
      anchor.download = filename;
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      window.setTimeout(() => URL.revokeObjectURL(objectUrl), 30000);
    } catch {
      // No connection or a blocked blob download: open the viewer instead.
      window.open(`${url}?view=1`, "_blank", "noopener");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className={wrapperClassName}>
      <button type="button" onClick={download} disabled={busy} className={className}>
        {busy ? "Preparing..." : label}
      </button>
      {showView ? (
        <a href={`${url}?view=1`} target="_blank" rel="noopener noreferrer" className={viewClassName}>
          View
        </a>
      ) : null}
      {message ? (
        <p role="alert" className="w-full text-xs font-medium text-red-600">
          {message}
        </p>
      ) : null}
    </div>
  );
}
