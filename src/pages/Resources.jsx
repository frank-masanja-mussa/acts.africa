import React from 'react'
import PageLayout from './PageLayout'

const Resources = () => {
  return (
    <PageLayout title="Contribute Resources">
      <div className="page-card">
        <p>
          Share tools, content, or expertise to strengthen ACTS Africa.
        </p>
      </div>
      <div className="page-actions">
        <button className="page-button" aria-label="Contribute resources to ACTS Africa">Contribute</button>
      </div>
    </PageLayout>
  )
}

export default Resources
