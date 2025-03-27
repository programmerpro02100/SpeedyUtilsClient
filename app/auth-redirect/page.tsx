"use client";

import { Suspense } from "react";
import AuthRedirect from "./AuthRedirect";

export default function AuthRedirectPage() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <AuthRedirect />
    </Suspense>
  );
}
