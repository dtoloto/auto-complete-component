import React, { ReactNode } from 'react'

interface IBox {
  children: ReactNode
}

export const Box: React.FC<IBox> = ({ children }) => {
  return <div className="box">{children}</div>
}
