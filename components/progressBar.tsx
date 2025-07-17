"use client";

import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

export default function ProgressBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    NProgress.start();
    const timer = setTimeout(() => {
      NProgress.done();
    }, 300);

    return () => clearTimeout(timer);
  }, [pathname, searchParams]);

  return (
    <>
      <style jsx global>{`
        #nprogress .bar {
          background: #dd253d !important;
          height: 4px;
        }
        #nprogress .spinner-icon {
          border-top-color: #dd253d !important;
          border-left-color: #dd253d !important;
        }
        #nprogress .spinner {
          display: none;
        }
      `}</style>
    </>
  );
}
