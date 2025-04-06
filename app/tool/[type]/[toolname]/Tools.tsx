"use client"

import React, { ComponentType } from "react";
import ReactMarkdown from "react-markdown";
import Navigbar from "@/app/components/general/Navigbar/Navigbar";
import Footer from "@/app/components/general/Footer/Footer";
import { Container } from "react-bootstrap";
import Feedback from "@/app/components/general/Feedback/Feedback";
import FeedbackScrollButton from "@/app/components/general/FeedbackScrollButton/FeedbackScrollButton";
import { ToolType } from "@/interfaces";

export default function Tool({ tool, ToolComponent }: { tool: ToolType, ToolComponent: ComponentType }) {

  return (
    <>
      <Navigbar />
      <h2 className="text-center tool-title">{tool?.title}</h2>

      <ToolComponent/>

      <FeedbackScrollButton />

      <div className="tool-description">
        <Container>
          <ReactMarkdown>{tool?.description}</ReactMarkdown>
        </Container>
      </div>

      <Feedback toolname={tool.name} userFeedbacks={tool.feedbacks}/>
      <Footer />
    </>
  );
}
