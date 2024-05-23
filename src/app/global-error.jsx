"use client";

import * as Sentry from "@sentry/nextjs";
import Error from "next/error";
import React, { useEffect } from "react";

export default function GlobalError({ error }) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html>
      <body>
        <Error statusCode={400} />
      </body>
    </html>
  );
}
