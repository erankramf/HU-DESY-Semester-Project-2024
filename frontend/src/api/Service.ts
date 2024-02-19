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
    if (versions === null) {
        return console.error("you have to pick a version");
    } else {
        const versionsQueryParam = versions.join(',');
        console.log(versions);
        return instance.get(`/Telescopes/${telName}/${param}/${versionsQueryParam}`);
    }
}