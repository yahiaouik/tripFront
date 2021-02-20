import axios from 'axios'

const URL = "https://tripservertse.herokuapp.com"

// user login 
export async function login(login, password) {
    const body = {
        login: login,
        password: password
    }
	return await axios ({
	url: URL + "/login",
    method: "POST",
    data: body
})
}
