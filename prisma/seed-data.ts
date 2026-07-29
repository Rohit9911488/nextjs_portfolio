export type SeedProject = {
  slug: string;
  icon: "shield" | "nodes" | "face" | "chart" | "code";
  category: string;
  title: string;
  description: string;
  tags: string[];
  imageAlt: string;
};

export const SEED_PROJECTS: SeedProject[] = [
  {
    slug: "ai-medical-image-verification-framework",
    icon: "shield",
    category: "Deep Learning and Computer Vision",
    title: "AI Medical Image Verification Framework",
    description:
      "A medical image verification framework designed to identify manipulated or adversarial medical images in connected healthcare systems.",
    tags: ["Python", "TensorFlow", "OpenCV", "Deep Learning", "Neural Networks", "Image Processing"],
    imageAlt: "AI medical image verification framework using Deep Learning and Computer Vision",
  },
  {
    slug: "ai-career-prediction-system",
    icon: "nodes",
    category: "Machine Learning and Predictive Analytics",
    title: "AI Career Prediction System",
    description:
      "An AI-powered application that recommends possible career paths using personality traits, technical knowledge and individual skills.",
    tags: ["Python", "Machine Learning", "Flask", "TensorFlow", "Databricks", "SQLite"],
    imageAlt: "AI career prediction application developed using Python and Machine Learning",
  },
  {
    slug: "real-time-face-detection-system",
    icon: "face",
    category: "Computer Vision",
    title: "Real-Time Face Detection System",
    description:
      "A real-time Computer Vision application that detects faces through a camera feed and provides speech-based feedback.",
    tags: ["Python", "OpenCV", "Computer Vision", "Image Processing", "Speech Feedback"],
    imageAlt: "Real-time face detection system developed with Python and OpenCV",
  },
  {
    slug: "sales-insights-dashboard",
    icon: "chart",
    category: "Data Analytics",
    title: "Sales Insights Dashboard",
    description:
      "Interactive Power BI dashboards turning raw sales data into clear, actionable insight for stakeholders.",
    tags: ["Power BI", "Excel", "SQL", "Data Cleaning"],
    imageAlt: "Sales insights dashboard built with Power BI and SQL",
  },
  {
    slug: "workflow-automation-toolkit",
    icon: "code",
    category: "Python Development",
    title: "Workflow Automation Toolkit",
    description:
      "A set of Python tools that automate repetitive data and reporting tasks end to end.",
    tags: ["Python", "Flask", "Automation", "REST APIs"],
    imageAlt: "Python workflow automation toolkit",
  },
  {
    slug: "customer-churn-predictor",
    icon: "nodes",
    category: "Machine Learning and Predictive Analytics",
    title: "Customer Churn Predictor",
    description:
      "A model that flags at-risk customers early using behavioural and transactional signals.",
    tags: ["Python", "Scikit-learn", "Pandas", "Databricks"],
    imageAlt: "Customer churn prediction model",
  },
  {
    slug: "survey-analysis-pipeline",
    icon: "chart",
    category: "Data Analytics",
    title: "Survey Analysis Pipeline",
    description:
      "Cleans, analyses and visualises large survey datasets into readable reports.",
    tags: ["Python", "Power BI", "Excel", "Data Cleaning"],
    imageAlt: "Survey analysis and reporting pipeline",
  },
  {
    slug: "document-forgery-detector",
    icon: "shield",
    category: "Deep Learning and Computer Vision",
    title: "Document Forgery Detector",
    description:
      "Detects tampered scanned documents using a lightweight CNN classifier.",
    tags: ["Python", "TensorFlow", "OpenCV", "Deep Learning"],
    imageAlt: "Document forgery detection with deep learning",
  },
  {
    slug: "attendance-via-face-recognition",
    icon: "face",
    category: "Computer Vision",
    title: "Attendance via Face Recognition",
    description:
      "Marks attendance automatically by recognising faces from a live classroom camera.",
    tags: ["Python", "OpenCV", "Computer Vision"],
    imageAlt: "Face recognition attendance system",
  },
];
