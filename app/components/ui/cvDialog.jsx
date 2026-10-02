"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Document, Page, pdfjs } from "react-pdf";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Minus,
  Plus,
  X,
} from "lucide-react";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

const CV_URL = "/documents/Adnan_Makahhal_Front_End_Intern_CV.pdf";
const roundButtonClass =
  "grid size-10 place-items-center rounded-full border border-[#dedede] bg-white text-[#242424] transition-[background,box-shadow] duration-200 hover:bg-[#f2f2f2] hover:shadow-[0_4px_14px_#00000010] disabled:cursor-default disabled:opacity-35 disabled:hover:bg-white disabled:hover:shadow-none motion-reduce:transition-none max-[600px]:size-9";

export default function CvDialog({ open, onClose }) {
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageWidth, setPageWidth] = useState(720);
  const [zoom, setZoom] = useState(1);
  const viewerRef = useRef(null);
  const closeButtonRef = useRef(null);

  const closeDialog = useCallback(() => onClose(), [onClose]);

  useEffect(() => {
    if (!open) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") closeDialog();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeDialog, open]);

  useEffect(() => {
    if (!open || !viewerRef.current) return undefined;

    const observer = new ResizeObserver(([entry]) => {
      setPageWidth(Math.max(260, Math.min(760, entry.contentRect.width - 16)));
    });

    observer.observe(viewerRef.current);
    return () => observer.disconnect();
  }, [open]);

  if (!open) return null;

  const previousPage = () => setPageNumber((page) => Math.max(1, page - 1));
  const nextPage = () =>
    setPageNumber((page) => Math.min(numPages || 1, page + 1));

  return createPortal(
    <div
      className="fixed inset-0 z-[1000] grid place-items-center bg-[#111111b8] p-4 backdrop-blur-[7px] max-[600px]:p-0"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) closeDialog();
      }}
    >
      <div
        className="grid h-[min(900px,calc(100dvh-32px))] w-[min(1080px,calc(100vw-32px))] grid-rows-[auto_auto_minmax(0,1fr)] overflow-hidden rounded-[18px] border border-[#ffffff26] bg-[#f6f6f6] shadow-[0_28px_90px_#00000066] max-[600px]:h-dvh max-[600px]:w-screen max-[600px]:rounded-none max-[600px]:border-0"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cv-dialog-title"
      >
        <header className="flex items-center justify-between gap-5 border-b border-[#e4e4e4] bg-white px-5 py-4 max-[600px]:px-[13px]">
          <div>
            <h2
              id="cv-dialog-title"
              className="text-lg font-[650] tracking-[-.025em] text-[#242424]"
            >
              Adnan Makahhal
            </h2>
          </div>
          <div className="flex items-center gap-[9px]">
            <a
              className="inline-flex items-center gap-2 rounded-full bg-[#242424] px-[15px] py-2.5 text-[13px] text-white max-[600px]:size-10 max-[600px]:justify-center max-[600px]:p-0"
              href={CV_URL}
              download
            >
              <Download size={17} aria-hidden="true" />
              <span className="max-[600px]:hidden">Download PDF</span>
            </a>
            <button
              ref={closeButtonRef}
              className={roundButtonClass}
              type="button"
              onClick={closeDialog}
              aria-label="Close CV"
            >
              <X size={21} aria-hidden="true" />
            </button>
          </div>
        </header>

        <div
          className="flex items-center justify-between gap-5 border-b border-[#dedede] bg-white px-5 py-2.5 max-[600px]:gap-2 max-[600px]:px-[13px]"
          aria-label="PDF controls"
        >
          <div className="flex items-center gap-[9px] max-[600px]:gap-1">
            <button
              className={roundButtonClass}
              type="button"
              onClick={previousPage}
              disabled={pageNumber <= 1}
              aria-label="Previous page"
            >
              <ChevronLeft size={19} aria-hidden="true" />
            </button>
            <span className="min-w-[104px] text-center text-xs tabular-nums text-[#666] max-[600px]:min-w-20 max-[600px]:text-[11px]">
              Page{" "}
              <strong className="font-semibold text-[#242424]">
                {pageNumber}
              </strong>{" "}
              of{" "}
              <strong className="font-semibold text-[#242424]">
                {numPages || "–"}
              </strong>
            </span>
            <button
              className={roundButtonClass}
              type="button"
              onClick={nextPage}
              disabled={!numPages || pageNumber >= numPages}
              aria-label="Next page"
            >
              <ChevronRight size={19} aria-hidden="true" />
            </button>
          </div>

          <div className="flex items-center gap-[9px] max-[600px]:gap-1">
            <button
              className={roundButtonClass}
              type="button"
              onClick={() => setZoom((value) => Math.max(0.7, value - 0.1))}
              disabled={zoom <= 0.7}
              aria-label="Zoom out"
            >
              <Minus size={18} aria-hidden="true" />
            </button>
            <span className="min-w-[104px] text-center text-xs tabular-nums text-[#666] max-[600px]:min-w-11 max-[600px]:text-[11px]">
              {Math.round(zoom * 100)}%
            </span>
            <button
              className={roundButtonClass}
              type="button"
              onClick={() => setZoom((value) => Math.min(1.6, value + 0.1))}
              disabled={zoom >= 1.6}
              aria-label="Zoom in"
            >
              <Plus size={18} aria-hidden="true" />
            </button>
          </div>
        </div>

        <div
          ref={viewerRef}
          className="min-w-0 overflow-auto overscroll-contain bg-[#d5d5d5] p-2 max-[600px]:p-1"
        >
          <Document
            className="grid min-w-min justify-center"
            file={CV_URL}
            onLoadSuccess={({ numPages: loadedPages }) => {
              setNumPages(loadedPages);
              setPageNumber(1);
            }}
            loading={
              <p className="px-5 py-10 text-center text-sm text-[#555]">
                Loading CV…
              </p>
            }
            error={
              <p className="px-5 py-10 text-center text-sm text-[#8d2d2d]">
                The CV could not be displayed. Please use Download PDF instead.
              </p>
            }
          >
            <Page
              className="overflow-hidden rounded-[3px] bg-white shadow-[0_8px_32px_#00000024] [&_canvas]:block [&_canvas]:max-w-none"
              pageNumber={pageNumber}
              width={Math.round(pageWidth * zoom)}
              renderTextLayer={false}
              renderAnnotationLayer={false}
              loading={
                <p className="px-5 py-10 text-center text-sm text-[#555]">
                  Rendering page…
                </p>
              }
            />
          </Document>
        </div>
      </div>
    </div>,
    document.body,
  );
}
