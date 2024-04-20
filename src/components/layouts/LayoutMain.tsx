import React, { FC, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

const LayoutMain:FC<Props> = ({children}) => {
  return (
    <div className='container-main'>{children}</div>
  )
}

export default LayoutMain