"use client"

import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import Navigbar from "@/app/components/general/Navigbar/Navigbar";
import Footer from "@/app/components/general/Footer/Footer";
import { Container } from "react-bootstrap";
import Feedback from "@/app/components/general/Feedback/Feedback";
import FeedbackScrollButton from "@/app/components/general/FeedbackScrollButton/FeedbackScrollButton";
import { ToolType } from "@/interfaces";
import { notFound } from "next/navigation";
import { toPascalCase } from "@/utils/Format";
import toolComponentMap from "@/app/components/tools/toolComponentMap";
import RecommendedTools from "@/app/components/general/Recommended/RecommendedTools";
import { getRecommendedTools } from "@/utils/getRecommendedTools";


export default function Tool({ tool }: { tool: ToolType }) {
  const ToolComponent = toolComponentMap[toPascalCase(tool.name)];
  if (!ToolComponent) return notFound()

  const [recommendedTools, setRecommendedTools] = useState<ToolType[]>([]);
  useEffect(()=>{
     const getRecommened = async ()=>{
        const recommendedToolsData = await getRecommendedTools(tool);
        setRecommendedTools(recommendedToolsData)
     }
     getRecommened()
  }, [])

  return (
    <>
      <Navigbar />
      <h1 className="text-center tool-title">{tool?.title}</h1>

      <ToolComponent/>

      <FeedbackScrollButton />

      <div className="tool-description">
        <Container>
          <ReactMarkdown>{tool?.description}</ReactMarkdown>
        </Container>
      </div>

      <RecommendedTools recommendedTools={recommendedTools} />

      <Feedback toolname={tool.name} userFeedbacks={tool.feedbacks}/>
      <Footer />
    </>
  );
}
