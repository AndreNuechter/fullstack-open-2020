import axios from 'axios'

const baseURL = `http://${window.location.hostname}:3001/persons`

export default {
    get() {
        return axios
            .get(baseURL)
            .then(({ data }) => data)
    },
    post(entry) {
        return axios
            .post(baseURL, entry)
            .then(res => res.data)
    },
    update(id, entry) {
        return axios
            .put(`${baseURL}/${id}`, entry)
            .then(res => res.data)
    },
    delete(id) {
        return axios
            .delete(`${baseURL}/${id}`)
            .then(res => res.data)
    }
}