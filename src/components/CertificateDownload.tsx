"use client";

import { useState } from "react";

type CertificateFormat = "pdf" | "png" | "jpeg";

const FORMAT_META: Record<CertificateFormat, { mime: string; extension: string; label: string }> = {
  pdf: { mime: "application/pdf", extension: "pdf", label: "PDF" },
  png: { mime: "image/png", extension: "png", label: "PNG" },
  jpeg: { mime: "image/jpeg", extension: "jpg", label: "JPEG" },
};

interface CertificateDownloadProps {
  courseId: string;
  label?: string;
  className?: string;
  wrapperClassName?: string;
  viewClassName?: string;
  showView?: boolean;
  /** Extra formats offered as small links next to the main button. PDF is always the main button. */
  showFormatPicker?: boolean;
}

// Downloads the student's certificate in a way that works on phones as well as desktops.
// A plain link can dump a student onto a raw error page if their session has expired, and
// some phone browsers ignore the attachment header. This fetches the file first (so errors
// show as a message), then saves it - through the share sheet on iPhone and iPad, or a
// normal download elsewhere. "View" opens it in the browser's viewer, which is the fallback
// when an in-app browser blocks downloads.
export default function CertificateDownload({
  courseId,
  label = "Download Certificate",
  className = "",
  wrapperClassName = "",
  viewClassName = "text-xs font-bold text-green-700 underline",
  showView = true,
  showFormatPicker = true,
}: CertificateDownloadProps) {
  const [busyFormat, setBusyFormat] = useState<CertificateFormat | null>(null);
  const [message, setMessage] = useState("");

  const download = async (format: CertificateFormat) => {
    setBusyFormat(format);
    setMessage("");
    const { mime, extension } = FORMAT_META[format];
    const url = `/api/certificates/${courseId}?format=${format}`;
    const filename = `${courseId}-certificate.${extension}`;

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

      const blob = new Blob([await res.arrayBuffer()], { type: mime });
      const file = new File([blob], filename, { type: mime });
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
      window.open(`${url}&view=1`, "_blank", "noopener");
    } finally {
      setBusyFormat(null);
    }
  };

  return (
    <div className={wrapperClassName}>
      <div className="flex flex-wrap items-center gap-2">
        <button type="button" onClick={() => download("pdf")} disabled={busyFormat !== null} className={className}>
          {busyFormat === "pdf" ? "Preparing..." : label}
        </button>
        {showView ? (
          <a href={`/api/certificates/${courseId}?view=1`} target="_blank" rel="noopener noreferrer" className={viewClassName}>
            View
          </a>
        ) : null}
      </div>
      {showFormatPicker ? (
        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="text-[11px] font-bold uppercase tracking-widest text-gray-400">Also as:</span>
          {(["png", "jpeg"] as const).map((format) => (
            <button
              key={format}
              type="button"
              onClick={() => download(format)}
              disabled={busyFormat !== null}
              className="text-xs font-bold text-gray-500 underline decoration-dotted hover:text-primary disabled:opacity-50"
            >
              {busyFormat === format ? "Preparing..." : FORMAT_META[format].label}
            </button>
          ))}
        </div>
      ) : null}
      {message ? (
        <p role="alert" className="w-full text-xs font-medium text-red-600">
          {message}
        </p>
      ) : null}
    </div>
  );
}
