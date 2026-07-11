const URL = 'http://localhost:3001/tasks'

const headers = {
    'Content-Type': 'application/json'
}

const tasksAPI = {
    getAll: () => {
        return fetch(URL).then((response) => response.json())
    },

    add: (task) => {
        return fetch(URL, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(task)
        }).then((response) => response.json())
    },

    delete: (id) => {
        return fetch(`${URL}/${id}`, {
            method: 'DELETE'
        })
    },

    deleteAll: (tasks) => {
        return Promise.all(
                tasks.map(({id}) => {
                    tasksAPI.delete(id)
                })
            )
    },

    toggleComplete: (id, isDone) => {
        return fetch(`${URL}/${id}`, {
            method: 'PATCH',
            headers: headers,
            body: JSON.stringify({ isDone })
        })
    },

    getById: (id) => {
        return fetch(`${URL}/${id}`)
        .then((response) => {
            if (!response.ok){
                throw new Error('Not found')
            }
            return response.json()})
    }
}

export default tasksAPI