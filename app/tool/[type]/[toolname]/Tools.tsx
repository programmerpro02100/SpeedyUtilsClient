"use client"

import React, { useState, useEffect,ComponentType } from "react";
import dynamic from "next/dynamic";
import ReactMarkdown from "react-markdown";
import Navigbar from "@/app/components/general/Navigbar/Navigbar";
import Footer from "@/app/components/general/Footer/Footer";
import { Container } from "react-bootstrap";
import Feedback from "@/app/components/general/Feedback/Feedback";
import { useDispatch, useSelector } from "react-redux";
import FeedbackScrollButton from "@/app/components/general/FeedbackScrollButton/FeedbackScrollButton";
import LoadingPage from "@/app/other/LoadingPage";
import { ToolType } from "@/interfaces";
import { notFound, useRouter } from "next/navigation";

export default function Tool({tool}: {tool: ToolType}) {
  const dispatch = useDispatch();
  const [ToolComponent, setToolComponent] = useState<ComponentType | null>(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (ToolComponent && tool) {
        setLoading(false)
    } else {
        setLoading(true)
    }
  }, [tool, ToolComponent, dispatch]);


  useEffect(() => {
    const type = tool.type;
    const toolname = tool.name;
  
    const folderName = type
      .replace(/-([a-z])/g, (_, letter) => letter.toUpperCase())
      .replace(/^\w/, (c) => c.toUpperCase());
  
    const fileName = toolname
      .replace(/-([a-z])/g, (_, letter) => letter.toUpperCase())
      .replace(/^\w/, (c) => c.toUpperCase());
  
    const DynamicComponent = dynamic(
      () =>
        import(`@/app/components/tools/${folderName}/${fileName}/${fileName}`).catch(() => {
           return notFound();
        }),
      { ssr: false }
    );
  
    // ✅ FIX: Set as a function reference
    setToolComponent(DynamicComponent);
  }, []);  

  if (isLoading) return <LoadingPage loadingText="Loading..."/>;

  return (
    <>
      <Navigbar />
      <h2 className="text-center tool-title">{tool?.title}</h2>

      {ToolComponent}

      <FeedbackScrollButton />

      <div className="tool-description">
        <Container>
          <ReactMarkdown>{tool?.description}</ReactMarkdown>
        </Container>
      </div>

      <Feedback toolname={tool.name} />
      <Footer />
    </>
  );
}
