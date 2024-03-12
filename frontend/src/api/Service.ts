import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://127.0.0.1:8000',
    timeout: 1000,
});

export const getTelescopes = () => {
    return instance.get('/Telescopes');
}
export const getParams = (telescopeName: string) => {
    return instance.get(`/Telescopes/${telescopeName}`);
}
export const getVersions = (telescopeName: string, parameterName: string) => {
    return instance.get(`/Telescopes/${telescopeName}/${parameterName}`);
}

export const getData = (telName: string, param: string, versions: string[]) => {
    //!!check if the list is empty!!
    const versionsQueryParam = versions.join(',');
    console.log(versions);
    return instance.get(`/Telescopes/${telName}/${param}/${versionsQueryParam}`);
}

export const getFile = (fileName: string) =>{
    return instance.get(`/Files/${fileName}`,{responseType:'blob',timeout:10000000})
}