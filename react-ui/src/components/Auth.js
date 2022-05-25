import axios from "axios";
const API_URL = `${window.location.origin}/api/authorize`;
class AuthEvents {
    login(username, password) {
        return axios
            .post(`${API_URL}/login`, {
                username,
                password
            })
            .then(response => {
                if (response.data.accessToken) {
                    localStorage.setItem("accessToken", JSON.stringify(response.data.accessToken));
                    return response.data;
                }
                window.location.replace('/lobby')
            });
    }
    logout() {
        localStorage.removeItem("user");
    }
    register(first_name, last_name, username, email, password) {
        return axios.post(`${API_URL}/register`, {
            first_name,
            last_name,
            username,
            email,
            password
        });
    }
    getCurrentUser() {
        return JSON.parse(localStorage.getItem('accessToken'));;
    }
}
const loginPlayer = new AuthEvents().login;
const registerPlayer = new AuthEvents().register;
export {loginPlayer, registerPlayer}