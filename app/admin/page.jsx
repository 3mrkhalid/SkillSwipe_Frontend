"use client";

import React, { useEffect, useState } from "react";
import { me } from "@/app/api/user";
import { useRouter } from "next/navigation";
import NotAuthorizedPage from "@/app/_components/notAdmin/NotAuthorizedPage";
import {useTheme} from "@/app/_components/ThemeContext";
import Loading from "@/app/_components/loading/page";

export default function AdminPage() {
  const [status, setStatus] = useState("loading");
  const router = useRouter();
  const { theme } = useTheme();


  useEffect(() => {
    const checkAdmin = async () => {
      const startTime = Date.now();

      try {
        const res = await me();
        const user = res;
        console.log("User data:", user);

        setTimeout(() => {
          if (!user) {
            router.replace("/login");
            return;
          }

          if (user.isAdmin) {
            setStatus("admin");
          } else {
            setStatus("not-admin");
          }
        }, 1000);

      } catch (err) {
        setTimeout(() => {
          router.replace("/login");
        }, 1000);
      }
    };

    checkAdmin();
  }, [router]);

  
 if (status === "loading") {
  return (
   <Loading />
  );
}

  if (status === "not-admin") {
    return <NotAuthorizedPage />;
  }


  return (
    <div>
      <h1>Admin Panel</h1>
      <p>Only admin can see this!</p>
    </div>
  );
}