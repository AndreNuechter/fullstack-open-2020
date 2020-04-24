import React from 'react'

const Toast = ({ msg, cls }) => {
    return msg && <div className={`${cls} toast`}>{msg}</div>
}

export default Toast