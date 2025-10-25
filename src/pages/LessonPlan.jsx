import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Icon from '@mdi/react'
import { 
  mdiBookOpen, 
  mdiRobot, 
  mdiShieldAlert, 
  mdiLightbulb, 
  mdiOpenInNew,
  mdiCheckCircle,
  mdiAlertCircle,
  mdiCurrencyUsd,
  mdiGift,
  mdiClock,
  mdiAccountGroup,
  mdiTarget,
  mdiPlayCircle,
  mdiDownload
} from '@mdi/js'
import './LessonPlan.css'

const LessonPlan = () => {

  const aiApps = [
    {
      name: "ChatGPT",
      description: "Advanced conversational AI that can help with writing, coding, analysis, and creative tasks",
      website: "https://chat.openai.com",
      pricing: "Free tier available, Plus at $20/month",
      features: [
        "Natural language conversations",
        "Code generation and debugging",
        "Creative writing assistance",
        "Data analysis and interpretation",
        "Educational tutoring"
      ],
      isFree: true
    },
    {
      name: "Davinci AI",
      description: "AI-powered content creation and automation platform for businesses and educators",
      website: "https://davinci.ai",
      pricing: "Free trial, Pro plans from $29/month",
      features: [
        "Content generation and optimization",
        "Automated workflows",
        "Data processing and analysis",
        "Educational content creation",
        "Multi-language support"
      ],
      isFree: false
    },
    {
      name: "NotebookLM",
      description: "Google's AI-powered notebook that helps you learn and organize information from documents",
      website: "https://notebooklm.google.com",
      pricing: "Free to use",
      features: [
        "Document summarization",
        "Question answering from sources",
        "Note organization and linking",
        "Research assistance",
        "Educational content creation"
      ],
      isFree: true
    }
  ]

  const lessonModules = [
    {
      title: "Module 1: Introduction to AI",
      duration: "30 minutes",
      objectives: [
        "Understand what Artificial Intelligence is",
        "Learn about AI in everyday life",
        "Recognize different types of AI systems",
        "Explore AI history and development"
      ],
      activities: [
        "Interactive AI demonstration (10 min)",
        "Group discussion on AI experiences (10 min)",
        "AI timeline activity (10 min)"
      ],
      videos: [
        {
          title: "What is Artificial Intelligence?",
          url: "https://www.youtube.com/watch?v=2ePf9rue1Ao",
          duration: "5 min"
        },
        {
          title: "AI in Daily Life",
          url: "https://www.youtube.com/watch?v=UwsrzCVZAb8",
          duration: "4 min"
        }
      ]
    },
    {
      title: "Module 2: Benefits of AI",
      duration: "30 minutes",
      objectives: [
        "Identify positive impacts of AI",
        "Learn about AI in education",
        "Understand AI in healthcare and agriculture",
        "Explore AI for social good"
      ],
      activities: [
        "Case study analysis (15 min)",
        "AI benefits brainstorming (10 min)",
        "Role-playing scenarios (5 min)"
      ],
      videos: [
        {
          title: "How AI is Transforming Education",
          url: "https://www.youtube.com/watch?v=H0wpDj-8U0I",
          duration: "6 min"
        },
        {
          title: "AI for Social Good",
          url: "https://www.youtube.com/watch?v=7X8S6vUkYP8",
          duration: "5 min"
        }
      ]
    },
    {
      title: "Module 3: Dangers and Risks of AI",
      duration: "30 minutes",
      objectives: [
        "Understand AI bias and fairness",
        "Learn about privacy concerns",
        "Recognize misinformation risks",
        "Explore job displacement concerns"
      ],
      activities: [
        "Bias detection exercises (10 min)",
        "Privacy protection workshop (10 min)",
        "Fact-checking with AI (10 min)"
      ],
      videos: [
        {
          title: "AI Bias and Fairness",
          url: "https://www.youtube.com/watch?v=59bMZkX-myQ",
          duration: "7 min"
        },
        {
          title: "AI and Privacy Concerns",
          url: "https://www.youtube.com/watch?v=0VqQxEsnupQ",
          duration: "5 min"
        }
      ]
    },
    {
      title: "Module 4: Responsible AI Use",
      duration: "30 minutes",
      objectives: [
        "Learn ethical AI principles",
        "Understand responsible AI practices",
        "Develop critical thinking skills",
        "Create AI usage guidelines"
      ],
      activities: [
        "Ethics framework development (15 min)",
        "Responsible use scenarios (10 min)",
        "Critical evaluation exercises (5 min)"
      ],
      videos: [
        {
          title: "AI Ethics and Responsibility",
          url: "https://www.youtube.com/watch?v=UwsrzCVZAb8",
          duration: "6 min"
        },
        {
          title: "Critical Thinking with AI",
          url: "https://www.youtube.com/watch?v=H0wpDj-8U0I",
          duration: "4 min"
        }
      ]
    },
    {
      title: "Module 5: Hands-on AI Tools",
      duration: "30 minutes",
      objectives: [
        "Master ChatGPT for educational use",
        "Explore Davinci AI capabilities",
        "Use NotebookLM for research",
        "Create AI-assisted projects"
      ],
      activities: [
        "ChatGPT workshop and practice (10 min)",
        "Davinci AI content creation (10 min)",
        "NotebookLM research project (10 min)"
      ],
      videos: [
        {
          title: "Getting Started with ChatGPT",
          url: "https://www.youtube.com/watch?v=2ePf9rue1Ao",
          duration: "8 min"
        },
        {
          title: "Google NotebookLM Tutorial",
          url: "https://www.youtube.com/watch?v=UwsrzCVZAb8",
          duration: "6 min"
        }
      ]
    }
  ]

  return (
    <div className="lesson-plan-page">
      <Navbar />
      
      <div className="lesson-plan-content" id="lesson-plan-content">
        <div className="lesson-plan-hero">
          <div className="hero-content">
            <h1 className="lesson-plan-title">AI Education Lesson Plan</h1>
            <p className="lesson-plan-subtitle">
              Comprehensive curriculum for teaching AI awareness, benefits, and responsible use
            </p>
            <div className="hero-stats">
              <div className="stat">
                <Icon path={mdiClock} size={1} />
                <span>2.5 Hours Total</span>
              </div>
              <div className="stat">
                <Icon path={mdiAccountGroup} size={1} />
                <span>Teachers & Students</span>
              </div>
              <div className="stat">
                <Icon path={mdiTarget} size={1} />
                <span>5 × 30min Modules</span>
              </div>
            </div>
          </div>
        </div>

        <div className="lesson-plan-overview">
          <h2>Course Overview</h2>
          <p>
            This comprehensive AI education program is designed to equip teachers and students with 
            essential knowledge about Artificial Intelligence. The curriculum covers AI fundamentals, 
            benefits, risks, and responsible usage, with hands-on experience using leading AI tools.
          </p>
        </div>

        <div className="learning-objectives">
          <h2>Learning Objectives</h2>
          <div className="objectives-grid">
            <div className="objective-card">
              <div className="icon-circle">
                <Icon path={mdiBookOpen} size={1.5} />
              </div>
              <h3>Knowledge</h3>
              <p>Understand AI concepts, applications, and implications</p>
            </div>
            <div className="objective-card">
              <div className="icon-circle">
                <Icon path={mdiShieldAlert} size={1.5} />
              </div>
              <h3>Awareness</h3>
              <p>Recognize AI benefits and potential risks</p>
            </div>
            <div className="objective-card">
              <div className="icon-circle">
                <Icon path={mdiLightbulb} size={1.5} />
              </div>
              <h3>Skills</h3>
              <p>Develop critical thinking and responsible AI usage</p>
            </div>
            <div className="objective-card">
              <div className="icon-circle">
                <Icon path={mdiRobot} size={1.5} />
              </div>
              <h3>Application</h3>
              <p>Hands-on experience with AI tools and platforms</p>
            </div>
          </div>
        </div>

        <div className="lesson-modules">
          <h2>Lesson Modules</h2>
          <div className="modules-grid">
            {lessonModules.map((module, index) => (
              <div key={index} className="module-card">
                <div className="module-header">
                  <h3>{module.title}</h3>
                  <span className="module-duration">{module.duration}</span>
                </div>
                <div className="module-objectives">
                  <h4>Learning Objectives:</h4>
                  <ul>
                    {module.objectives.map((objective, objIndex) => (
                      <li key={objIndex}>{objective}</li>
                    ))}
                  </ul>
                </div>
                <div className="module-activities">
                  <h4>Activities:</h4>
                  <ul>
                    {module.activities.map((activity, actIndex) => (
                      <li key={actIndex}>{activity}</li>
                    ))}
                  </ul>
                </div>
                {module.videos && module.videos.length > 0 && (
                  <div className="module-videos">
                    <h4>Related Videos:</h4>
                    <div className="video-links">
                      {module.videos.map((video, videoIndex) => (
                        <a 
                          key={videoIndex}
                          href={video.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="video-link"
                        >
                          <Icon path={mdiPlayCircle} size={0.8} />
                          <span className="video-title">{video.title}</span>
                          <span className="video-duration">({video.duration})</span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="ai-tools-section">
          <h2>Featured AI Tools</h2>
          <p className="tools-intro">
            Students will gain hands-on experience with these leading AI platforms:
          </p>
          <div className="ai-tools-grid">
            {aiApps.map((app, index) => (
              <div key={index} className="ai-tool-card">
                <div className="tool-header">
                  <div className="tool-icon">
                    <Icon path={mdiRobot} size={1.5} />
                  </div>
                  <div className="tool-title">
                    <h3>{app.name}</h3>
                    <div className="tool-pricing">
                      {app.isFree ? (
                        <span className="free-badge">
                          <Icon path={mdiGift} size={0.8} />
                          Free
                        </span>
                      ) : (
                        <span className="paid-badge">
                          <Icon path={mdiCurrencyUsd} size={0.8} />
                          Paid
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <p className="tool-description">{app.description}</p>
                <div className="tool-pricing-info">
                  <strong>Pricing:</strong> {app.pricing}
                </div>
                <div className="tool-features">
                  <h4>Key Features:</h4>
                  <ul>
                    {app.features.map((feature, featureIndex) => (
                      <li key={featureIndex}>
                        <Icon path={mdiCheckCircle} size={0.8} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="tool-actions">
                  <a 
                    href={app.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="tool-link primary"
                  >
                    <Icon path={mdiOpenInNew} size={0.8} />
                    Try {app.name}
                  </a>
                  {app.name === "ChatGPT" && (
                    <a 
                      href="https://openai.com/chatgpt" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="tool-link secondary"
                    >
                      <Icon path={mdiDownload} size={0.8} />
                      Sign Up
                    </a>
                  )}
                  {app.name === "Davinci AI" && (
                    <a 
                      href="https://davinci.ai/signup" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="tool-link secondary"
                    >
                      <Icon path={mdiDownload} size={0.8} />
                      Sign Up
                    </a>
                  )}
                  {app.name === "NotebookLM" && (
                    <a 
                      href="https://notebooklm.google.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="tool-link secondary"
                    >
                      <Icon path={mdiDownload} size={0.8} />
                      Access Free
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="safety-guidelines">
          <h2>AI Safety Guidelines</h2>
          <div className="guidelines-grid">
            <div className="guideline-card warning">
              <Icon path={mdiAlertCircle} size={1.5} />
              <h3>Important Warnings</h3>
              <ul>
                <li>Never share personal information with AI</li>
                <li>Always verify AI-generated information</li>
                <li>Be aware of AI bias and limitations</li>
                <li>Use AI as a tool, not a replacement for critical thinking</li>
              </ul>
            </div>
            <div className="guideline-card success">
              <Icon path={mdiCheckCircle} size={1.5} />
              <h3>Best Practices</h3>
              <ul>
                <li>Use AI to enhance learning, not replace it</li>
                <li>Always cite AI assistance in academic work</li>
                <li>Develop your own ideas and critical thinking</li>
                <li>Respect AI terms of service and usage policies</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="assessment-section">
          <h2>Assessment & Evaluation</h2>
          <div className="assessment-grid">
            <div className="assessment-card">
              <h3>Formative Assessment</h3>
              <ul>
                <li>Class participation and discussions</li>
                <li>Hands-on tool exploration</li>
                <li>Group project presentations</li>
                <li>Reflection journals</li>
              </ul>
            </div>
            <div className="assessment-card">
              <h3>Summative Assessment</h3>
              <ul>
                <li>AI ethics case study analysis</li>
                <li>Responsible AI usage project</li>
                <li>Tool comparison and evaluation</li>
                <li>Final presentation on AI impact</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="resources-section">
          <h2>Additional Resources</h2>
          <div className="resources-list">
            <div className="resource-item">
              <h3>Recommended Reading</h3>
              <ul>
                <li>"Artificial Intelligence: A Guide for Thinking Humans" by Melanie Mitchell</li>
                <li>"AI 2041: Ten Visions for Our Future" by Kai-Fu Lee</li>
                <li>"The Alignment Problem" by Brian Christian</li>
              </ul>
            </div>
            <div className="resource-item">
              <h3>Online Resources</h3>
              <ul>
                <li><a href="https://www.elementsofai.com" target="_blank" rel="noopener noreferrer">Elements of AI (Free Course)</a></li>
                <li><a href="https://ai.google/education/" target="_blank" rel="noopener noreferrer">Google AI Education</a></li>
                <li><a href="https://www.ibm.com/training/ai" target="_blank" rel="noopener noreferrer">IBM AI Training</a></li>
              </ul>
            </div>
            <div className="resource-item">
              <h3>Support Materials</h3>
              <ul>
                <li>Lesson plan templates</li>
                <li>Student worksheets and activities</li>
                <li>Teacher guides and facilitation notes</li>
                <li>Assessment rubrics and checklists</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="contact-section">
          <h2>Get Support</h2>
          <p>
            Need help implementing this curriculum? Our team is here to support you with training, 
            resources, and ongoing assistance.
          </p>
          <div className="contact-actions">
            <button className="primary-button">Contact Support</button>
            <button className="secondary-button">Request Training</button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  )
}

export default LessonPlan
