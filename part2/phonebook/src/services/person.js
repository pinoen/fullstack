import axios from "axios";

const url = 'http://localhost:3001/api/persons'

const getPersons = () => {
  const req = axios.get(url);
  return req.then(res => res.data)
}

const createPerson = (newPerson) => {
  const req = axios.post(url, newPerson);
  return req.then(res => res.data)
}

const deletePerson = (id) => {
  const req = axios.delete(`${url}/${id}`)
  return req.then(res => res.data)
}

const updatePerson = (id, person) => {
  const req = axios.put(`${url}/${id}`, person)
  return req.then(res => res.data)
}

export default { getPersons, createPerson, deletePerson, updatePerson }