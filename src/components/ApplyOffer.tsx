"use client";

import { useState } from "react";

export default function ApplyOffer({ offerId }: { offerId: string }) {
  const [response, setResponse] = useState<any>();

  async function handleApply() {
    const response = await fetch(
      "http://localhost:4000/applications/" + offerId,
      {
        method: "POST",
      }
    ).then((res) => res.json());
    setResponse(response);
  }

  const status = response
    ? response.success
      ? "Success"
      : "Failed"
    : undefined;
  return (
    <div>
      <button onClick={handleApply}>Apply</button>
    </div>
  );
}
