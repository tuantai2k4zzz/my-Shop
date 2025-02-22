import React from 'react'
import { useParams } from 'react-router-dom'

const Detailproduct = () => {
  const {pid, title} = useParams()
  // console.log(title)
  return (
    <div>Detailproduct</div>
  )
}

export default Detailproduct