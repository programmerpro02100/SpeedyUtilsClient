"use client"

import React, { useState } from "react";
import Textbox from "@/app/components/input/Textbox/Textbox";
import Num from "@/app/components/input/Num/Num";

export default function WordCounter() {
  const [result, setResult] = useState({ words: 0, chars: 0 });

  const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = event.target.value.trim();

    const words = text ? text.split(/\s+/).length : 0;
    const chars = text.length;

    setResult({ words, chars });
  };

  return (
    <>
      <Textbox onChange={onChange} />
      <div className="d-flex">
        <Num label="Words" value={result.words} />
        <Num label="Characters" value={result.chars} />
      </div>
    </>
  );
}
