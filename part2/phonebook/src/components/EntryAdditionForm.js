import React from 'react'
import Input from './Input'

const EntryAdditionForm = ({
    submitHandler,
    newName,
    nameChangeHandler,
    newNumber,
    numberChangeHandler
}) => <form onSubmit={submitHandler}>
        <h2>Add a number</h2>
        <Input
            label="Name:"
            value={newName}
            changeHandler={nameChangeHandler} />
        <Input
            label="Number:"
            value={newNumber}
            changeHandler={numberChangeHandler} />
        <div>
            <button>add</button>
        </div>
    </form>

export default EntryAdditionForm