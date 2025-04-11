import React from "react";
import About from "@/app/components/legal/About/About";
import Privacy from "@/app/components/legal/Privacy/Privacy";
import Terms from "@/app/components/legal/Terms/Terms";
import Disclaimer from "@/app/components/legal/Disclaimer/Disclaimer";
import Contact from "@/app/components/legal/Contact/Contact";
import Navigbar from "@/app/components/general/Navigbar/Navigbar";
import Footer from "@/app/components/general/Footer/Footer";
import genMetadata from "../components/MetaTags";

export function generateMetadata(){
  return genMetadata({}); 
}

export default function LegalPage() {
  return (
    <>
      <Navigbar />
      <div className="main" style={{ marginTop: "5rem" }}>
        <About />
        <hr />
        <Privacy />
        <hr />
        <Terms />
        <hr />
        <Disclaimer />
        <hr />
        <Contact />
      </div>
      <Footer />
    </>
  );
}
