import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import './pages.css'

const ChapterApplication = () => {
  const [formData, setFormData] = useState({
    // Entity Information
    entityName: '',
    entityType: '',
    registrationNumber: '',
    website: '',
    establishedYear: '',
    
    // Contact Person Information
    contactPersonName: '',
    contactPersonTitle: '',
    email: '',
    phone: '',
    
    // Location Information
    address: '',
    city: '',
    country: '',
    region: '',
    
    // Chapter Details
    proposedChapterName: '',
    targetAudience: '',
    expectedParticipants: '',
    proposedStartDate: '',
    
    // Contact Preferences
    preferredContactMethod: 'email',
    bestTimeToContact: '',
    timezone: '',
    
    // Entity Background & Capabilities
    entityMission: '',
    currentPrograms: '',
    aiExperience: '',
    educationBackground: '',
    motivation: '',
    previousPartnerships: '',
    
    // Resources & Support
    availableResources: '',
    technicalSupport: '',
    fundingSource: '',
    additionalSupport: '',
    
    // Additional Information
    additionalInfo: '',
    howDidYouHear: '',
    references: ''
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    // Required fields validation
    const requiredFields = [
      'entityName', 'entityType', 'contactPersonName', 'email', 'phone',
      'address', 'city', 'country', 'proposedChapterName', 'targetAudience', 'motivation'
    ]
    
    requiredFields.forEach(field => {
      if (!formData[field].trim()) {
        newErrors[field] = 'This field is required'
      }
    })
    
    // Email validation
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    
    // Phone validation
    if (formData.phone && !/^[\+]?[1-9][\d]{0,15}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number'
    }
    
    // Website validation
    if (formData.website && !/^https?:\/\/.+/.test(formData.website)) {
      newErrors.website = 'Please enter a valid website URL (include http:// or https://)'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      setSubmitStatus('error')
      return
    }
    
    setIsSubmitting(true)
    setSubmitStatus('submitting')
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Here you would typically send the data to your backend
      console.log('Form submitted:', formData)
      
      setSubmitStatus('success')
      // Reset form after successful submission
      setFormData({
        entityName: '', entityType: '', registrationNumber: '', website: '', establishedYear: '',
        contactPersonName: '', contactPersonTitle: '', email: '', phone: '',
        address: '', city: '', country: '', region: '',
        proposedChapterName: '', targetAudience: '', expectedParticipants: '', proposedStartDate: '',
        preferredContactMethod: 'email', bestTimeToContact: '', timezone: '',
        entityMission: '', currentPrograms: '', aiExperience: '', educationBackground: '', motivation: '', previousPartnerships: '',
        availableResources: '', technicalSupport: '', fundingSource: '', additionalSupport: '',
        additionalInfo: '', howDidYouHear: '', references: ''
      })
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderFormSection = (title, children) => (
    <div className="form-section">
      <h3 className="form-section-title">{title}</h3>
      <div className="form-section-content">
        {children}
      </div>
    </div>
  )

  const renderInput = (name, label, type = 'text', required = false, options = []) => (
    <div className="form-group">
      <label htmlFor={name} className="form-label">
        {label}
        {required && <span className="required">*</span>}
      </label>
      {type === 'select' ? (
        <select
          id={name}
          name={name}
          value={formData[name]}
          onChange={handleInputChange}
          className={`form-input ${errors[name] ? 'error' : ''}`}
        >
          <option value="">Select {label}</option>
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : type === 'textarea' ? (
        <textarea
          id={name}
          name={name}
          value={formData[name]}
          onChange={handleInputChange}
          className={`form-input ${errors[name] ? 'error' : ''}`}
          rows={4}
          placeholder={`Enter ${label.toLowerCase()}`}
        />
      ) : (
        <input
          type={type}
          id={name}
          name={name}
          value={formData[name]}
          onChange={handleInputChange}
          className={`form-input ${errors[name] ? 'error' : ''}`}
          placeholder={`Enter ${label.toLowerCase()}`}
        />
      )}
      {errors[name] && <span className="form-error">{errors[name]}</span>}
    </div>
  )

  return (
    <div className="chapter-page">
      <Navbar />
      
      <div className="chapter-content">
        <div className="chapter-hero">
          <h1 className="chapter-title">Start a Chapter Application</h1>
          <p className="chapter-subtitle">For organizations, institutions, and companies looking to establish AI education chapters</p>
        </div>

        <div className="form-container">
          <form onSubmit={handleSubmit} className="chapter-form">
            {renderFormSection(
              "Entity Information",
              <div className="form-grid">
                {renderInput('entityName', 'Entity/Organization Name', 'text', true)}
                {renderInput('entityType', 'Entity Type', 'select', true, [
                  { value: 'educational_institution', label: 'Educational Institution' },
                  { value: 'non_profit', label: 'Non-Profit Organization' },
                  { value: 'government_agency', label: 'Government Agency' },
                  { value: 'private_company', label: 'Private Company' },
                  { value: 'research_institute', label: 'Research Institute' },
                  { value: 'community_organization', label: 'Community Organization' },
                  { value: 'other', label: 'Other' }
                ])}
                {renderInput('registrationNumber', 'Registration/License Number', 'text')}
                {renderInput('website', 'Website URL', 'url')}
                {renderInput('establishedYear', 'Year Established', 'number')}
              </div>
            )}

            {renderFormSection(
              "Contact Person Information",
              <div className="form-row">
                {renderInput('contactPersonName', 'Contact Person Name', 'text', true)}
                {renderInput('contactPersonTitle', 'Contact Person Title/Position', 'text', true)}
              </div>
            )}

            {renderFormSection(
              "Contact Information",
              <div className="form-row">
                {renderInput('email', 'Email Address', 'email', true)}
                {renderInput('phone', 'Phone Number', 'tel', true)}
              </div>
            )}

            {renderFormSection(
              "Location Details",
              <div className="form-grid">
                {renderInput('address', 'Street Address', 'text', true)}
                <div className="form-row">
                  {renderInput('city', 'City', 'text', true)}
                  {renderInput('country', 'Country', 'text', true)}
                </div>
                {renderInput('region', 'State/Province/Region', 'text')}
              </div>
            )}

            {renderFormSection(
              "Proposed Chapter Details",
              <div className="form-grid">
                {renderInput('proposedChapterName', 'Proposed Chapter Name', 'text', true)}
                {renderInput('targetAudience', 'Target Audience', 'text', true)}
                {renderInput('expectedParticipants', 'Expected Number of Participants', 'number')}
                {renderInput('proposedStartDate', 'Proposed Start Date', 'date')}
              </div>
            )}

            {renderFormSection(
              "Contact Preferences",
              <div className="form-grid">
                {renderInput('preferredContactMethod', 'Preferred Contact Method', 'select', false, [
                  { value: 'email', label: 'Email' },
                  { value: 'phone', label: 'Phone' },
                  { value: 'whatsapp', label: 'WhatsApp' },
                  { value: 'video_call', label: 'Video Call' }
                ])}
                {renderInput('bestTimeToContact', 'Best Time to Contact', 'text')}
                {renderInput('timezone', 'Your Timezone', 'text')}
              </div>
            )}

            {renderFormSection(
              "Entity Background & Capabilities",
              <div className="form-grid">
                {renderInput('entityMission', 'Entity Mission Statement', 'textarea')}
                {renderInput('currentPrograms', 'Current Educational Programs/Initiatives', 'textarea')}
                {renderInput('aiExperience', 'AI/Technology Experience & Expertise', 'textarea')}
                {renderInput('educationBackground', 'Educational Background & Credentials', 'textarea')}
                {renderInput('motivation', 'Why does your entity want to start a chapter?', 'textarea', true)}
                {renderInput('previousPartnerships', 'Previous Educational Partnerships/Collaborations', 'textarea')}
              </div>
            )}

            {renderFormSection(
              "Resources & Support",
              <div className="form-grid">
                {renderInput('availableResources', 'Available Resources (facilities, equipment, etc.)', 'textarea')}
                {renderInput('technicalSupport', 'Technical Support Available', 'textarea')}
                {renderInput('fundingSource', 'Funding Source', 'textarea')}
                {renderInput('additionalSupport', 'Additional Support Needed', 'textarea')}
              </div>
            )}

            {renderFormSection(
              "Additional Information",
              <div className="form-grid">
                {renderInput('howDidYouHear', 'How did your entity hear about ACTS Africa?', 'textarea')}
                {renderInput('references', 'References (organization name, contact, relationship)', 'textarea')}
                {renderInput('additionalInfo', 'Any additional information about your entity', 'textarea')}
              </div>
            )}

            <div className="form-actions">
              <button 
                type="submit" 
                className="primary-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting Application...' : 'Submit Application'}
              </button>
            </div>

            {submitStatus === 'success' && (
              <div className="form-success">
                <h3>Application Submitted Successfully!</h3>
                <p>Thank you for your entity's interest in starting a chapter. We'll review your application and get back to you within 5-7 business days.</p>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="form-error-message">
                <h3>Please correct the errors above and try again.</h3>
              </div>
            )}
          </form>
        </div>
      </div>
      
      <Footer />
    </div>
  )
}

export default ChapterApplication
