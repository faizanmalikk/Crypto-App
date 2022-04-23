import React from 'react'
import { Spin } from 'antd'
import './style.css'
const Loader = () => {
  return (
    <div className='loader'>
        <Spin/>
    </div>
  )
}

export default Loader