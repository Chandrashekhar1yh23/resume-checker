AI Resume Checker

An interactive resume analysis web application that helps job seekers evaluate and improve their resumes for ATS compatibility, structure, skills, grammar, and impact.

The application provides a clean dashboard with an overall resume score, ATS compatibility score, detected and recommended skills, grammar corrections, structural feedback, and improved resume bullet suggestions.

«Note: The current API implementation uses structured mock analysis data and a simulated processing delay. The project is structured so that a real resume parser and AI/LLM service can be integrated into the "/api/analyze" route.»

✨ Features

- 📄 Resume Upload — Upload a single resume through drag-and-drop or file selection.
- 📁 Multiple File Formats — Supports PDF, DOCX, DOC, and TXT files.
- 🔒 5 MB Upload Limit — Rejects files larger than 5 MB.
- 🤖 Resume Analysis — Sends the uploaded resume to the analysis API and displays structured feedback.
- 📊 Overall Resume Score — Visual score from 0–100.
- 🎯 ATS Compatibility Score — Estimates how well the resume is structured for ATS-style parsing.
- 🧠 Skills Analysis — Shows detected skills and recommended/missing skills.
- ✍️ Grammar Corrections — Displays original text, improved wording, and the reason for the correction.
- 🚀 Impact Enhancer — Provides stronger, metric-driven alternatives for resume bullet points.
- 📝 Structure Feedback — Highlights resume structure and presentation improvements.
- 🔄 Analyze Another — Reset the dashboard and analyze another resume.
- 🌙 Responsive UI — Supports light/dark styling and responsive layouts.
- 🎨 Smooth Animations — Uses Framer Motion for upload and dashboard transitions.
- 📈 Visual Analytics — Uses Recharts to display resume and ATS scores.

🛠️ Tech Stack

Technology| Purpose
Next.js 16| React framework and application routing
React 19| User interface development
TypeScript| Type-safe development
Tailwind CSS 4| Styling and responsive UI
Framer Motion| UI animations and transitions
React Dropzone| Resume file upload and drag-and-drop handling
Recharts| Resume and ATS score visualizations
Lucide React| Interface icons
ESLint| Code quality and linting

📸 Screenshots

Resume Upload

The home screen allows users to drag and drop a resume or select one from their device.

«Add your application screenshot here:

"![Resume Upload](./screenshots/upload.png)"»

Analysis Dashboard

After analysis, the dashboard presents the overall score, ATS compatibility, skills analysis, grammar and structure feedback, and improved bullet suggestions.

«Add your dashboard screenshot here:

"![Analysis Dashboard](./screenshots/dashboard.png)"»

Screenshot directory: Create a "screenshots/" folder in the project root and place your application screenshots there.

⚙️ Installation & Setup

1. Clone the repository

git clone https://github.com/Chandrashekhar1yh23/resume-checker.git
cd resume-checker

2. Install dependencies

npm install

3. Start the development server

npm run dev

4. Open the application

Visit:

http://localhost:3000

No environment variables are currently required by the mock analysis implementation.

▶️ How to Run Locally

Once the development server is running:

1. Open "http://localhost:3000".
2. Upload a PDF, DOCX, DOC, or TXT resume.
3. Keep the file size below 5 MB.
4. Click Analyze Resume.
5. Wait for the analysis request to complete.
6. Review the overall score and ATS compatibility score.
7. Check detected and recommended skills.
8. Review grammar and structural feedback.
9. Use the improved bullet suggestions to strengthen the resume.
10. Click Analyze Another to return to the upload screen.

Production Build

npm run build
npm start

Linting

npm run lint

📁 Project Structure

resume-checker/
├── public/
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
│
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── analyze/
│   │   │       └── route.ts       # Resume analysis API
│   │   ├── favicon.ico
│   │   ├── globals.css             # Global styles / Tailwind
│   │   ├── layout.tsx              # Root layout and metadata
│   │   └── page.tsx                # Main application page
│   │
│   └── components/
│       └── ui/
│           ├── Dashboard.tsx       # Analysis results dashboard
│           └── FileUploader.tsx     # Resume upload component
│
├── .gitignore
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── package-lock.json
├── postcss.config.mjs
├── tsconfig.json
└── README.md

🤖 How Resume Checking Works

The application follows a simple:

Upload → Analysis → Dashboard

flow.

1. Resume Upload

The "FileUploader" component uses React Dropzone to accept one resume file.

Supported formats:

- PDF
- DOCX
- DOC
- TXT

Maximum file size:

5 MB

2. Send the Resume to the API

When the user clicks Analyze Resume, the selected file is placed into a "FormData" object under the "resume" field and sent to:

POST /api/analyze

3. Resume Analysis API

The Next.js API route receives the uploaded file.

If no resume is provided, it returns a "400" response.

The current implementation simulates processing with a three-second delay and returns structured mock analysis data.

A production implementation can replace this section with a real document parser and AI model.

4. Generate Analysis Results

The response contains fields such as:

overall_score
ats_compatibility_score
structure_feedback
skills_detected
skills_missing
grammar_corrections
bullet_suggestions

5. Display the Dashboard

The main page stores the API response in React state and passes it to the "Dashboard" component.

The dashboard converts the scores into visual charts and presents actionable feedback in separate sections.

6. Improve the Resume

The user can use:

- Detected skills
- Recommended skills
- Grammar corrections
- Structural feedback
- Metric-driven bullet suggestions

to improve the resume before applying for jobs.

🔮 Future Improvements

- Integrate a real PDF/DOCX/TXT text extraction pipeline.
- Connect an LLM such as OpenAI or another AI provider for real resume analysis.
- Add job-description matching and job-specific ATS scoring.
- Add keyword gap analysis against a selected job description.
- Add resume section detection and formatting checks.
- Add authentication and saved analysis history.
- Add downloadable improvement reports.
- Add deployment configuration and production environment variables.

📄 License

This project currently does not include a license file.

Add a license before distributing the project for reuse.
