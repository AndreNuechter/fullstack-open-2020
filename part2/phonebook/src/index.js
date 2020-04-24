import ReactDOM from 'react-dom'
import React, { useEffect, useState } from 'react'
import Search from './components/Search'
import EntryAdditionForm from './components/EntryAdditionForm'
import Entries from './components/Entries'
import Toast from './components/Toast'
import dbService from './services/dbService'
import './style.css'

const filterCallback = value => ({ name }) => name
    .toLowerCase()
    .includes(value.toLowerCase())

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [matched, setMatched] = useState([])
    const [search, setSearch] = useState('')
    const [msg, setMsg] = useState('')
    const [cls, setCls] = useState('')

    const setToast = (text, type) => {
        setMsg(text)
        setCls(type)
        setTimeout(() => setMsg(''), 5000)
    }

    useEffect(
        () => {
            dbService
                .get()
                .then(data => setPersons(data))
        }, []
    )

    useEffect(
        () => {
            const cb = filterCallback(search)
            setMatched([...persons.filter(cb)])
        },
        [search, persons]
    )

    const submitHandler = (event) => {
        const person = persons.find(({ name }) => name === newName)
        if (person) {
            if (window.confirm(`The name ${newName} is already in storage. Do you want to update it?`)) {
                dbService
                    .update(person.id, { name: newName, number: newNumber })
                    .then(res => setPersons(persons.map(p => p.id === person.id ? res : p)))
                    .catch((err) => {
                        console.error(err)
                        setToast('The contact has already been deleted.', 'error')
                        setPersons(persons.filter(p => p.id !== person.id))
                    })
            }
        } else if (!(newName && newNumber)) {
            setToast('We need you to input name AND number', 'error')
        } else {
            dbService
                .post({ name: newName, number: newNumber })
                .then((res) => {
                    setPersons([...persons, res])
                    setToast('Contact saved', 'success')
                })
                .catch((err) => {
                    console.error(err)
                    setToast('Something went wrong on our side. The contact wasn\'t saved.', 'error')
                })
        }
        setNewName('')
        setNewNumber('')
        event.preventDefault()
    }

    const deleteHandler = id => () => {
        const str = `Do you really want to delete the entry for ${persons.find(p => p.id === id).name}`
        if (window.confirm(str)) {
            dbService
                .delete(id)
                .then(() => {
                    setPersons(persons.filter(p => p.id !== id))
                    setToast('Contact deleted', 'success')
                })
                .catch((err) => {
                    console.error(err)
                    setToast('Something went wrong on our side. Please try again later', 'error')
                })
        }
    }

    return (
        <>
            <h1>Phonebook</h1>

            <Toast msg={msg} cls={cls} />

            <Search
                search={search}
                changeHandler={({ target }) => setSearch(target.value)} />

            <EntryAdditionForm
                newName={newName}
                nameChangeHandler={({ target }) => setNewName(target.value)}
                newNumber={newNumber}
                numberChangeHandler={({ target }) => setNewNumber(target.value)}
                submitHandler={submitHandler} />

            <h2>Entries</h2>

            <Entries matched={matched} deleteHandler={deleteHandler} />
        </>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))