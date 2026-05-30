"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type VerificationResult = {
  valid: boolean;
  certificateId: string;
  studentName: string;
  courseTitle: string;
  completedLessons: number;
  totalLessons: number;
};

export default function VerifyCertificatePage() {
  const searchParams = useSearchParams();
  const [certificateId, setCertificateId] = useState(searchParams.get("id") || "");
  const [message, setMessage] = useState("");
  const [result, setResult] = useState<VerificationResult | null>(null);

  const verify = async (id = certificateId) => {
    setMessage("Checking certificate...");
    setResult(null);
    const res = await fetch(`/api/certificates/verify?id=${encodeURIComponent(id)}`);
    const data = await res.json();
    if (!data.success) {
      setMessage(data.message || "Certificate not found.");
      return;
    }
    setResult(data.data);
    setMessage("");
  };

  useEffect(() => {
    const id = searchParams.get("id");
    if (id) void verify(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="pt-32 pb-24">
      <div className="container mx-auto max-w-3xl px-6">
        <p className="mb-4 text-sm font-black uppercase tracking-widest text-primary">Certificate Verification</p>
        <h1 className="mb-5 text-4xl font-extrabold text-dark md:text-5xl">Verify a student certificate</h1>
        <p className="mb-8 text-gray-600">
          Enter the certificate ID printed on a Sam Creative Design School certificate to confirm completion status.
        </p>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            void verify();
          }}
          className="flex flex-col gap-3 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:flex-row"
        >
          <input
            value={certificateId}
            onChange={(event) => setCertificateId(event.target.value)}
            placeholder="SCDS-student-course-id"
            className="min-w-0 flex-1 rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-primary"
          />
          <button className="rounded-xl bg-primary px-6 py-3 font-bold text-white hover:bg-primary/90">
            Verify
          </button>
        </form>

        {message && <p className="mt-5 font-medium text-gray-600">{message}</p>}
        {result && (
          <div className={`mt-8 rounded-2xl border p-6 ${result.valid ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}`}>
            <p className={`mb-2 text-sm font-black uppercase tracking-widest ${result.valid ? "text-green-700" : "text-red-700"}`}>
              {result.valid ? "Valid Certificate" : "Incomplete Certificate"}
            </p>
            <h2 className="text-2xl font-extrabold text-dark">{result.studentName}</h2>
            <p className="mt-2 text-gray-700">{result.courseTitle}</p>
            <p className="mt-4 text-sm text-gray-600">
              {result.completedLessons}/{result.totalLessons} lessons completed · ID {result.certificateId}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
