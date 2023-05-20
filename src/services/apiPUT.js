import { api } from './api'



export const apiPUT = async({ table = '', objToUpdate }) => {

    if (table !== '') {

        try {

            const uri = `${table}/${objToUpdate.id}` 

            const response = await api.put(uri, objToUpdate)   
            
            return true

        } catch (error) {

            console.log(`error when trying to read the apitPUT - table: ${table}`, error)
           
        }
    }

    return false
}