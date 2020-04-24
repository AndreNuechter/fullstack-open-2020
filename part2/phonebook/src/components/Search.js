import React from 'react'
import Input from './Input'

const Search = ({ search, changeHandler }) => <Input
    label="Search:"
    value={search}
    changeHandler={changeHandler} />

export default Search