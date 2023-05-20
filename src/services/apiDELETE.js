import { api } from './api'



export const apiDELETE = async({ table, id }) => {


    if (table && id ) {

        try {


            const uri = `${table}/${id}`
            const response = await api.delete(uri)    

            return true      

        } catch (error) {

            console.log(`error when trying to read the apiDELETE - table: ${table}`, error)           
        }
    }

    return false
}