import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://127.0.0.1:8000',
    timeout: 1000,
  });

export const getTelescopes = () => {
    return instance.get('/Telescopes');
}
export const getParams = (telescopeName : string) =>{
    return instance.get(`/Telescopes/${telescopeName}`);
}