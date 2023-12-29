import React from 'react'
import ReactHelent from "react-helmet"
const MetaData = ({title}) => {
  return (
   <ReactHelent>
    <title>{title}</title>
   </ReactHelent>
  )
}

export default MetaData