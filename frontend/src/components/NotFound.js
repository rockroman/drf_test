import React from 'react'
import NoResults from "../assets/no-results.png"
import Asset from "../components/Asset"

const NotFound = () => {
  return (
    <div className='mt-5'>
        <Asset src={NoResults} message="Sorry, the page you're looking for doesn't exist" />
    </div>
  )
}

export default NotFound