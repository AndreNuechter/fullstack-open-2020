import React from 'react'

const Input = ({ label, value, changeHandler }) => <label>
    {label}
    <input style={{ display: 'block' }} value={value} onChange={changeHandler} />
</label>

export default Input