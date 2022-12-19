import Cookies from 'universal-cookie';
const cookies = new Cookies();

export const SignUp = (data) => {
    return fetch(`http://localhost:5000/signup`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(response => {
    
        return response.json();
    }).catch(err => {
        console.log(err);
    })
}

export const SignIn = ({username, password }) => {
    console.log(username, password)
    let url = "http://localhost:5000/signin";
    return fetch(url, {
        method: 'POST',
        headers: {
            "Authorization": "Basic " + btoa(username + ":" + password)
        },
    }).then(response => {
        console.log(response);
        // sessionStorage.setItem("userInfo", response)
        // sessionStorage.setItem("userInfo", JSON.stringify(response.body.user));
        
        return response.json();
    }).catch(err => {
        console.log(err);
    })
}


export const authenticate = (data, next) => {
    console.log({data});
    cookies.set('data', data, {path: '/'});
   
};

export const logOut = next => {
    cookies.remove('data', {path: '/'})
};

export const isAuthenticated = () => {
    if (cookies.get('data') === 'undefined') {
        return false;
    }
    if (cookies.get('data')) {
        return cookies.get('data');
    } else {
        return false;
    }
};