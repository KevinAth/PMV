import axios from 'axios'

const route = "http://127.0.0.1:8000"


export const mensaje = () => (axios.get(route+'/mensaje/'))