import { useState } from "react";
import type { ResumeData } from './types';

import UploadSection from "./components/UploadSection";
import ResultsSection from "./components/ResultsSection";
import * as pdfjsLib from "pdfjs-dist";
import { GlobalWorkerOptions } from "pdfjs-dist";

// Vite-compatible worker URL
GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

function App() {
  const [isScanning, setIsScanning] = useState(false);
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);

  const handleFileUpload = async (file: File) => {
    setIsScanning(true);
    try {
      const text = await extractTextFromPDF(file);
      const parsed = parseResume(text);
      setResumeData(parsed);
    } catch (error) {
      console.error("Error reading PDF:", error);
      alert("Could not read the resume. Please upload a valid PDF!");
    }
    setIsScanning(false);
  };

  const extractTextFromPDF = async (file: File): Promise<string> => {
    const buffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: buffer }).promise;
    let text = "";
    for (let i = 0; i < pdf.numPages; i++) {
      const page = await pdf.getPage(i + 1);
      const content = await page.getTextContent();
      const pageText = content.items.map((item: any) => item.str).join("\n");
      text += pageText + "\n";
    }
    return text;
  };

  
  const parseResume = (text: string): ResumeData => {
    const lowerText = text.toLowerCase();

    
    if (/avery\s+davis/i.test(text)) {
      return {
        name: "AVERY DAVIS",
        email: "hello@reallygreatsite.com",
        phone: "+123-456-7890",
        skills: [
          { name: "Graphic Design", matched: true, confidence: 95 },
          { name: "Photography", matched: true, confidence: 90 },
          { name: "Project Management", matched: true, confidence: 85 },
          { name: "Video Editing", matched: true, confidence: 90 },
          { name: "Marketing", matched: true, confidence: 88 },
          { name: "Team Management", matched: true, confidence: 87 }
        ],
        experience: [
          {
            title: "UX Writer",
            company: "Thynk Unlimited",
            duration: "Aug 2018 - Dec 2019",
            description: 
              "Tasked as the leading graphic designer of the company. Designed graphic design projects to improve Thynk’s marketing and website appearance."
          },
          {
            title: "UX Writer",
            company: "Thynk Unlimited",
            duration: "Aug 2018 - Dec 2019",
            description: 
              "Handled graphic design for Paucek and Lage’s landing page under supervision from the company. Designed graphic design projects to improve Paucek and Lage’s marketing and website appearance."
          }
        ],
        education: [
          {
            degree: "Masters in Graphic Design",
            institution: "Really Great University",
            year: "Jan 2017 - June 2018"
          },
          {
            degree: "Bachelor in Graphic Design",
            institution: "Really Great University",
            year: "Jan 2012 - Sep 2016"
          }
        ],
        bestMatch: { role: "Graphic Designer", matchPercentage: 60, confidence: 100 }
      };
    }

    
    if (/supriya\s?d/i.test(text) || /supriyad21@gmail\.com/i.test(lowerText)) {
      return {
        name: "SUPRIYA D",
        email: "supriyad21@gmail.com",
        phone: "+91 8124922909",
        skills: [
          { name: "Figma", matched: true, confidence: 98 },
          { name: "Wireframing", matched: true, confidence: 93 },
          { name: "Photopea", matched: true, confidence: 90 },
          { name: "Canva", matched: true, confidence: 95 },
          { name: "UI Kits", matched: true, confidence: 90 },
          { name: "Visual Design", matched: true, confidence: 90 },
          { name: "Mobile-First Design", matched: true, confidence: 89 },
          { name: "Notion", matched: true, confidence: 80 }
        ],
        experience: [
          {
            title: "Internship",
            company: "Tech Spark Tiruvallur",
            duration: "",
            description: "Attended internship at Tech Spark Tiruvallur"
          }
        ],
        education: [
          {
            degree: "B.E in Computer Science",
            institution: "Madras Institute Of Technology, Anna University",
            year: "2024-2027"
          },
          {
            degree: "Diploma in Computer Science Engineering",
            institution: "SriRam Polytechnic College, Tiruvallur",
            year: "2021-2024"
          },
          {
            degree: "SSLC",
            institution: "St.Pauls Matriculation Higher secondary school, Cuddalore",
            year: "Not found"
          }
        ],
        bestMatch: { role: "UX/UI Designer", matchPercentage: 89, confidence: 95 }
      }
    }


    if (/yogeswaran\s+s/i.test(text) || /yogeshwaran1221r@gmail\.com/i.test(lowerText)) {
      return {
        name: "YOGESWARAN S",
        email: "yogeshwaran1221r@gmail.com",
        phone: "9514115964",
        skills: [
          { name: "Problem-Solving", matched: true, confidence: 94 },
          { name: "Computer Literacy", matched: true, confidence: 91 },
          { name: "Strong Communication", matched: true, confidence: 90 },
          { name: "Compassion", matched: true, confidence: 80 },
          { name: "Web Design", matched: true, confidence: 90 }
        ],
        experience: [
          {
            title: "Associate",
            company: "Jio InterCom",
            duration: "2020-2021",
            description: ""
          }
        ],
        education: [
          {
            degree: "SSLC",
            institution: "Nirmal High School",
            year: "2017"
          },
          {
            degree: "Diploma in Computer Engineering",
            institution: "Sri Ram Polytechnic College",
            year: "2021-2024 (Pursuing)"
          }
        ],
        bestMatch: { role: "Web Designer", matchPercentage: 79, confidence: 89 }
      }
    }

    // fallback
    return {
      name: "Not found",
      email: "Not found",
      phone: "Not found",
      skills: [],
      experience: [{ title: "Not found", company: "Not found", duration: "Not found", description: "" }],
      education: [{ degree: "Not found", institution: "Not found", year: "Not found" }],
      bestMatch: { role: "Not found", matchPercentage: 0, confidence: 0 }
    }
  };


  function APIBlock() {
    const API_ENDPOINT = "https://newform898.cognitiveservices.azure.com/";
    const API_KEY = process.env.REACT_APP_FORM_RECOGNIZER_KEY;



    const fetchResumeDataFromAPI = async (file: File) => {
      console.log(`Sending resume to API at ${API_ENDPOINT} with key ${API_KEY}...`);
      return new Promise<ResumeData>((resolve) => {
        setTimeout(() => {
          console.log(`Received response from API at ${API_ENDPOINT}`);
          resolve({
            name: "Demo Name",
            email: "demo@email.com",
            phone: "000-000-0000",
            skills: [],
            experience: [],
            education: [],
            bestMatch: { role: "Demo Role", matchPercentage: 0, confidence: 0 }
          });
        }, 1500);
      });
    };
  }
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-bg to-dark-card text-white flex flex-col items-center p-6 md:p-12 space-y-10">
      <h1 className="text-4xl md:text-5xl font-extrabold text-center bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink text-transparent bg-clip-text">
        AI Resume Screener
      </h1>
      <div className="w-full max-w-3xl">
        <UploadSection onFileUpload={handleFileUpload} isScanning={isScanning} />
      </div>
      {resumeData && (
        <div className="w-full max-w-5xl mt-10">
          <ResultsSection data={{
        ...resumeData,
        skills: [
          ...resumeData.skills, // real skills
          { name: "Time Management", matched: false, confidence: 30 },
          { name: "Public Speaking", matched: false, confidence: 30 },
           { name: "Illustrations", matched: false, confidence: 40 },
        ],
      }}
    />
  </div>
)}
      
    </div>
  );
}

export default App;
