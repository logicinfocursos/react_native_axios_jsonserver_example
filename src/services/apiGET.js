import { api } from './api'



export const apiGET = async ({ table = '', keyToSearch = '', fieldToSearchKey = 'id' }) => {



    if (table !== '') {

        try {

            let uri = (keyToSearch === '' ? `${table}` : `${table}?${fieldToSearchKey}=${keyToSearch}`)
            const response = await api.get(uri)

            return response.data

        } catch (error) {

            console.log(`erro ao tentar ler a api: ${table}`, error)
        }
    }

    return false
}