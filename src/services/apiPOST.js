import { api } from './api'



export const apiPOST = async({ table = '', objToAdd }) => {


    if (table !== '') {

        try {

            const uri = table
            const response = await api.post(uri, objToAdd, "withCredentials: true")         

            return response.data


        } catch (error) {

            console.log(`error when trying to read the apitPOST - table: ${table}`, error)       
        }
    }

    return false
}