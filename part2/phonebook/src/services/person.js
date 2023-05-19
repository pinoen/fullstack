import axios from "axios";

const url = 'http://localhost:3001/persons'

const getPersons = () => {
  const req = axios.get(url);
  return req.then(res => res.data)
}

const createPerson = (newPerson) => {
  const req = axios.post(url, newPerson);
  return req.then(res => res.data)
}

export default { getPersons, createPerson }