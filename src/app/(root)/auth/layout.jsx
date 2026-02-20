import React from 'react'

const layout = ({children}) => {
  return (
    <div className='min-h-screen my-5 max-w-screen flex items-center justify-center'>{children}</div>
  )
}

export default layout