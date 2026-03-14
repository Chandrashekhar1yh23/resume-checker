import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("resume") as File;

    if (!file) {
      return NextResponse.json({ error: "No resume uploaded" }, { status: 400 });
    }

    // In a real application, we would use pdf-parse or pdfplumber (via Python API) here
    // We would also make a call to OpenAI to get the analysis JSON.
    // For this 10-minute demo, we will simulate a 3-second processing delay and return structured mock data.
    
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // Mock realistic AI response based on the design document
    const mockAnalysis = {
      overall_score: 72,
      ats_compatibility_score: 65,
      structure_feedback: "The resume has a solid structure but lacks a clear summary section. Experience is slightly cramped, consider increasing margin spacing. Action verbs are repetitive.",
      skills_detected: ["React", "JavaScript", "HTML", "CSS", "Git", "Node.js"],
      skills_missing: ["TypeScript", "Next.js", "Docker", "REST APIs", "SQL", "Cloud/AWS"],
      weak_action_verbs_detected: ["Helped", "Worked on", "Made"],
      grammar_corrections: [
        {
          original: "responsible for making the ui",
          correction: "Developed and maintained the user interface",
          reason: "More professional and active phrasing"
        },
        {
          original: "worked with backend team to",
          correction: "Collaborated with the backend engineering team to",
          reason: "Formalizes team collaboration"
        }
      ],
      bullet_suggestions: [
        {
          original_bullet: "Worked on the company website and made it faster.",
          improved_bullet: "Optimized the corporate website architecture, improving page load speed by 40% and increasing user retention by 15%."
        },
        {
          original_bullet: "Helped build the new dashboard for user analytics.",
          improved_bullet: "Spearheaded the development of a real-time analytics dashboard using React and Recharts, processing over 10,000 daily user sessions."
        }
      ]
    };

    return NextResponse.json(mockAnalysis);

  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Failed to process resume." }, { status: 500 });
  }
}
