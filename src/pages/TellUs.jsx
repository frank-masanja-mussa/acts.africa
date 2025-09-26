import React from 'react'
import PageLayout from './PageLayout'

const TellUs = () => {
  return (
    <PageLayout title="Tell Us Anything">
      <div className="page-card">
        <p>
          We welcome your ideas, feedback, and stories. Let's build together.
        </p>
      </div>
      <div className="page-actions">
        <button className="page-button" aria-label="Send your message to ACTS Africa">Send</button>
      </div>
    </PageLayout>
  )
}

export default TellUs
