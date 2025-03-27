"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouter, useSearchParams } from "next/navigation";
import { setUser } from "@/store/slices/userSlice";

export default function AuthRedirect() {
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams) {
      const userData = Object.fromEntries(searchParams.entries());
      const data = {
        id: userData.id,
        email: userData.email,
        profilePicture: userData.profilePicture,
      };
      dispatch(setUser(data));
      router.push("/"); // Redirect to home
    }
  }, [dispatch, router, searchParams]);

  return <p>Redirecting...</p>;
}
