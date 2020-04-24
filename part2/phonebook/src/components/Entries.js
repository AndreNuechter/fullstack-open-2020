import React from 'react'

const Entry = ({ name, number, id, deleteHandler }) => <div
    style={{
        width: '400px',
        display: 'flex',
        justifyContent: 'space-between'
    }}>
    {name} | {number}
    <button onClick={deleteHandler(id)}>Delete</button>
</div>
const Entries = ({ matched, deleteHandler }) => matched.map(({ name, number, id }) => (
    <Entry name={name} number={number} id={id} key={id} deleteHandler={deleteHandler} />
))

export default Entries