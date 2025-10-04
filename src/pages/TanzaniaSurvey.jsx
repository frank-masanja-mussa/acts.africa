import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from '@mdi/react'
import { 
  mdiAccountGroup, 
  mdiSchool, 
  mdiChartLine, 
  mdiCheckCircle,
  mdiArrowLeft,
  mdiSend
} from '@mdi/js'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import './TanzaniaSurvey.css'

const TanzaniaSurvey = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Part 1: Basic Information
    age: '',
    gender: '',
    role: '',
    
    // Part 2: Current Experience & Access
    internetUsage: '',
    aiExperience: '',
    devices: [],
    
    // Part 3: Awareness & Needs
    aiUnderstanding: '',
    barriers: [],
    topics: [],
    
    // Part 4: Future Participation & Expectations
    joinClub: '',
    learningPreference: '',
    expectations: []
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const totalSteps = 4

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleArrayChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value) 
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }))
  }

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // Simulate API call to Google Sheets
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Here you would send data to Google Sheets
      console.log('Survey data:', formData)
      
      setIsSubmitted(true)
    } catch (error) {
      console.error('Error submitting survey:', error)
      alert('There was an error submitting your response. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderStep1 = () => (
    <div className="survey-step">
      <h2>Part 1: Basic Information / Sehemu ya 1: Taarifa za Msingi</h2>
      
      <div className="form-group">
        <label className="form-label">
          Age / Umri <span className="required">*</span>
        </label>
        <div className="radio-group">
          {[
            { value: 'under-15', en: 'Under 15', sw: 'Chini ya miaka 15' },
            { value: '15-20', en: '15–20', sw: 'Miaka 15–20' },
            { value: '21-30', en: '21–30', sw: 'Miaka 21–30' },
            { value: 'over-30', en: 'Over 30', sw: 'Zaidi ya miaka 30' }
          ].map(option => (
            <label key={option.value} className="radio-option">
              <input
                type="radio"
                name="age"
                value={option.value}
                checked={formData.age === option.value}
                onChange={(e) => handleInputChange('age', e.target.value)}
              />
              <span className="radio-text">
                <span className="english">{option.en}</span>
                <span className="swahili">{option.sw}</span>
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">
          Gender / Jinsia <span className="required">*</span>
        </label>
        <div className="radio-group">
          {[
            { value: 'male', en: 'Male', sw: 'Mwanaume' },
            { value: 'female', en: 'Female', sw: 'Mwanamke' },
            { value: 'prefer-not-say', en: 'Prefer not to say', sw: 'Sitaki kusema' }
          ].map(option => (
            <label key={option.value} className="radio-option">
              <input
                type="radio"
                name="gender"
                value={option.value}
                checked={formData.gender === option.value}
                onChange={(e) => handleInputChange('gender', e.target.value)}
              />
              <span className="radio-text">
                <span className="english">{option.en}</span>
                <span className="swahili">{option.sw}</span>
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">
          Role / Nafasi yako <span className="required">*</span>
        </label>
        <div className="radio-group">
          {[
            { value: 'student', en: 'Student', sw: 'Mwanafunzi' },
            { value: 'teacher', en: 'Teacher', sw: 'Mwalimu' },
            { value: 'parent', en: 'Parent', sw: 'Mzazi' },
            { value: 'other', en: 'Other', sw: 'Nyingine' }
          ].map(option => (
            <label key={option.value} className="radio-option">
              <input
                type="radio"
                name="role"
                value={option.value}
                checked={formData.role === option.value}
                onChange={(e) => handleInputChange('role', e.target.value)}
              />
              <span className="radio-text">
                <span className="english">{option.en}</span>
                <span className="swahili">{option.sw}</span>
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  )

  const renderStep2 = () => (
    <div className="survey-step">
      <h2>Part 2: Current Experience & Access / Sehemu ya 2: Uzoefu na Ufikiaji wa Sasa</h2>
      
      <div className="form-group">
        <label className="form-label">
          Do you use the Internet regularly? / Je, unatumia mtandao mara kwa mara? <span className="required">*</span>
        </label>
        <div className="radio-group">
          {[
            { value: 'daily', en: 'Daily', sw: 'Kila siku' },
            { value: 'sometimes', en: 'Sometimes', sw: 'Mara nyingine' },
            { value: 'rarely', en: 'Rarely', sw: 'Mara chache' },
            { value: 'never', en: 'Never', sw: 'Sijawahi' }
          ].map(option => (
            <label key={option.value} className="radio-option">
              <input
                type="radio"
                name="internetUsage"
                value={option.value}
                checked={formData.internetUsage === option.value}
                onChange={(e) => handleInputChange('internetUsage', e.target.value)}
              />
              <span className="radio-text">
                <span className="english">{option.en}</span>
                <span className="swahili">{option.sw}</span>
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">
          Have you ever used or heard of AI (e.g., ChatGPT, translation apps)? <span className="required">*</span>
        </label>
        <div className="radio-group">
          {[
            { value: 'use-it', en: 'Yes, I use it', sw: 'Ndiyo, natumia' },
            { value: 'heard-only', en: 'I have only heard of it', sw: 'Nimesikia tu' },
            { value: 'never', en: 'No, never', sw: 'Hapana, sijawahi' }
          ].map(option => (
            <label key={option.value} className="radio-option">
              <input
                type="radio"
                name="aiExperience"
                value={option.value}
                checked={formData.aiExperience === option.value}
                onChange={(e) => handleInputChange('aiExperience', e.target.value)}
              />
              <span className="radio-text">
                <span className="english">{option.en}</span>
                <span className="swahili">{option.sw}</span>
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">
          Which devices do you usually use? / Ni vifaa gani unavyotumia mara nyingi? <span className="required">*</span>
        </label>
        <div className="checkbox-group">
          {[
            { value: 'smartphone', en: 'Smartphone', sw: 'Simu ya mkononi' },
            { value: 'computer', en: 'Computer', sw: 'Kompyuta' },
            { value: 'tablet', en: 'Tablet', sw: 'Kibao' },
            { value: 'none', en: 'None', sw: 'Sina kifaa' }
          ].map(option => (
            <label key={option.value} className="checkbox-option">
              <input
                type="checkbox"
                value={option.value}
                checked={formData.devices.includes(option.value)}
                onChange={(e) => handleArrayChange('devices', e.target.value)}
              />
              <span className="checkbox-text">
                <span className="english">{option.en}</span>
                <span className="swahili">{option.sw}</span>
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  )

  const renderStep3 = () => (
    <div className="survey-step">
      <h2>Part 3: Awareness & Needs / Sehemu ya 3: Ufahamu na Mahitaji</h2>
      
      <div className="form-group">
        <label className="form-label">
          How well do you understand AI? / Unaelewa AI kwa kiwango gani? <span className="required">*</span>
        </label>
        <div className="radio-group">
          {[
            { value: 'very-well', en: 'Very well', sw: 'Vizuri sana' },
            { value: 'somewhat', en: 'Somewhat', sw: 'Kiasi' },
            { value: 'very-little', en: 'Very little', sw: 'Kidogo sana' },
            { value: 'not-at-all', en: 'Not at all', sw: 'Sijui kabisa' }
          ].map(option => (
            <label key={option.value} className="radio-option">
              <input
                type="radio"
                name="aiUnderstanding"
                value={option.value}
                checked={formData.aiUnderstanding === option.value}
                onChange={(e) => handleInputChange('aiUnderstanding', e.target.value)}
              />
              <span className="radio-text">
                <span className="english">{option.en}</span>
                <span className="swahili">{option.sw}</span>
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">
          What are the biggest barriers to learning AI in your community? <span className="required">*</span>
        </label>
        <div className="checkbox-group">
          {[
            { value: 'lack-devices', en: 'Lack of devices', sw: 'Kukosa vifaa' },
            { value: 'language-barriers', en: 'Language barriers', sw: 'Vikwazo vya lugha' },
            { value: 'lack-teachers', en: 'Lack of teachers', sw: 'Kukosa walimu' },
            { value: 'internet-cost', en: 'Internet cost', sw: 'Gharama ya mtandao' },
            { value: 'other', en: 'Other', sw: 'Vingine' }
          ].map(option => (
            <label key={option.value} className="checkbox-option">
              <input
                type="checkbox"
                value={option.value}
                checked={formData.barriers.includes(option.value)}
                onChange={(e) => handleArrayChange('barriers', e.target.value)}
              />
              <span className="checkbox-text">
                <span className="english">{option.en}</span>
                <span className="swahili">{option.sw}</span>
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">
          Which topics would you like to learn more about? <span className="required">*</span>
        </label>
        <div className="checkbox-group">
          {[
            { value: 'internet-safety', en: 'Internet Safety', sw: 'Usalama wa mtandao' },
            { value: 'basic-coding', en: 'Basic Coding', sw: 'Misingi ya programu' },
            { value: 'ai-daily-life', en: 'AI & Daily Life', sw: 'AI na maisha ya kila siku' },
            { value: 'entrepreneurship-ai', en: 'Entrepreneurship with AI', sw: 'Ujasiriamali kwa kutumia AI' }
          ].map(option => (
            <label key={option.value} className="checkbox-option">
              <input
                type="checkbox"
                value={option.value}
                checked={formData.topics.includes(option.value)}
                onChange={(e) => handleArrayChange('topics', e.target.value)}
              />
              <span className="checkbox-text">
                <span className="english">{option.en}</span>
                <span className="swahili">{option.sw}</span>
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  )

  const renderStep4 = () => (
    <div className="survey-step">
      <h2>Part 4: Future Participation & Expectations / Sehemu ya 4: Ushiriki wa Baadaye na Matarajio</h2>
      
      <div className="form-group">
        <label className="form-label">
          Would you like to join an AI club or workshop? <span className="required">*</span>
        </label>
        <div className="radio-group">
          {[
            { value: 'yes', en: 'Yes', sw: 'Ndiyo' },
            { value: 'no', en: 'No', sw: 'Hapana' }
          ].map(option => (
            <label key={option.value} className="radio-option">
              <input
                type="radio"
                name="joinClub"
                value={option.value}
                checked={formData.joinClub === option.value}
                onChange={(e) => handleInputChange('joinClub', e.target.value)}
              />
              <span className="radio-text">
                <span className="english">{option.en}</span>
                <span className="swahili">{option.sw}</span>
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">
          Which type of learning do you prefer? <span className="required">*</span>
        </label>
        <div className="radio-group">
          {[
            { value: 'online', en: 'Online', sw: 'Mtandaoni' },
            { value: 'in-person', en: 'In-person', sw: 'Ana kwa ana' },
            { value: 'both', en: 'Both', sw: 'Vyote viwili' }
          ].map(option => (
            <label key={option.value} className="radio-option">
              <input
                type="radio"
                name="learningPreference"
                value={option.value}
                checked={formData.learningPreference === option.value}
                onChange={(e) => handleInputChange('learningPreference', e.target.value)}
              />
              <span className="radio-text">
                <span className="english">{option.en}</span>
                <span className="swahili">{option.sw}</span>
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">
          What do you hope to gain from AI education? <span className="required">*</span>
        </label>
        <div className="checkbox-group">
          {[
            { value: 'job-opportunities', en: 'Better job opportunities', sw: 'Nafasi bora za kazi' },
            { value: 'problem-solving', en: 'Problem-solving skills', sw: 'Uwezo wa kutatua matatizo' },
            { value: 'entrepreneurship', en: 'Entrepreneurship', sw: 'Ujasiriamali' },
            { value: 'other', en: 'Other', sw: 'Vingine' }
          ].map(option => (
            <label key={option.value} className="checkbox-option">
              <input
                type="checkbox"
                value={option.value}
                checked={formData.expectations.includes(option.value)}
                onChange={(e) => handleArrayChange('expectations', e.target.value)}
              />
              <span className="checkbox-text">
                <span className="english">{option.en}</span>
                <span className="swahili">{option.sw}</span>
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  )

  if (isSubmitted) {
    return (
      <div className="survey-page">
        <Navbar />
        <div className="survey-container">
          <div className="success-message">
            <Icon path={mdiCheckCircle} size={4} className="success-icon" />
            <h1>Asante! / Thank You!</h1>
            <p>Your response has been recorded successfully. This data will help us improve AI education in Tanzania.</p>
            <p>Jibu lako limeandikwa kwa mafanikio. Taarifa hizi zitatusaidia kuboresha elimu ya AI Tanzania.</p>
            <Link to="/tanzania-chapter" className="back-button">
              <Icon path={mdiArrowLeft} size={1} />
              Back to Tanzania Chapter
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="survey-page">
      <Navbar />
      
      <div className="survey-container">
        <div className="survey-header">
          <Link to="/tanzania-chapter" className="back-link">
            <Icon path={mdiArrowLeft} size={1} />
            Back to Tanzania Chapter
          </Link>
          <h1>AI Literacy & Appropriate Technology Needs in Tanzania</h1>
          <p>Elimu ya AI na Mahitaji ya Teknolojia ya Kufaa Tanzania</p>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
          <div className="step-indicator">
            Step {currentStep} of {totalSteps}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="survey-form">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
          {currentStep === 4 && renderStep4()}

          <div className="form-actions">
            {currentStep > 1 && (
              <button 
                type="button" 
                onClick={handlePrevious}
                className="secondary-button"
              >
                Previous
              </button>
            )}
            
            {currentStep < totalSteps ? (
              <button 
                type="button" 
                onClick={handleNext}
                className="primary-button"
              >
                Next
              </button>
            ) : (
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="primary-button"
              >
                {isSubmitting ? (
                  <>
                    <Icon path={mdiSend} size={1} className="spinning" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Icon path={mdiSend} size={1} />
                    Submit Survey
                  </>
                )}
              </button>
            )}
          </div>
        </form>
      </div>

      <Footer />
    </div>
  )
}

export default TanzaniaSurvey


