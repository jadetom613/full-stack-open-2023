import axios from 'axios'

const getAll = (baseURL) => {
    const request = axios.get(baseURL)
    return request.then(response => {
        return response.data
    })
}

const create = (baseURL, newPerson) => {
    const request = axios.post(baseURL, newPerson)
    return request.then(response => response.data)
}

const update = (baseURL, id, newPerson) => {
    const request = axios.put(`${baseURL}/${id}`, newPerson)
    return request.then(response => response.data)
}

const del = (baseURL, id) => {
    const request = axios.delete(`${baseURL}/${id}`)
    return request.then(response => response.data)
}

const personService = { getAll, create, update, del}
export default personService