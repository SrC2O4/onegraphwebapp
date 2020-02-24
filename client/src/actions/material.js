// getState is used to get the value of a state path
// setState is used to set the value of a state path
import {setState } from "statezero";
import {setEmptyState} from './helpers';


export const initialization = () => {
    setEmptyState();
}
// A function to send a POST request with a new student.
export const getT1Materials = () => {
    
    // the URL for the request
    const url = "/materials/tier/1";     

    fetch(url)
        .then((res) =>{
            // Handle response we get from the API.
            // Usually check the error codes to see what happened.
            if (res.status === 200) {
                return res.json();
            }
            })
        .then((json) =>{
                const key = 't1Material';
                setState(key, json.material);

        })
        .catch(error => {
            console.log(error);
        })
}

export const getT2Materials = () =>{
    
    const url = "/materials/tier/2";

    fetch(url)
        .then((res) =>{
            // Handle response we get from the API.
            // Usually check the error codes to see what happened.
            if (res.status === 200) {
                // If student was added successfully, tell the user.
                return res.json();
                
            }
        })
        .then((json) =>{
                const key = 't2Material';
                setState(key, json.material);

        })
        .catch(error => {
            console.log(error);
        })

}

export const getT3Materials = () =>{
    
    const url = "/materials/tier/3";  

    fetch(url)
        .then((res) =>{
            // Handle response we get from the API.
            // Usually check the error codes to see what happened.
            if (res.status === 200) {
                return res.json();
                
            }
        })
        .then((json) =>{
                const key = 't3Material';
                setState(key, json.material);

        })
        .catch(error => {
            console.log(error);
        })

}

export const getT4Materials = () =>{
    const url = "/materials/tier/4";

    fetch(url)
        .then((res) =>{
            // Handle response we get from the API.
            // Usually check the error codes to see what happened.
            if (res.status === 200) {
                return res.json();
                
            } 
        })
        .then((json) =>{
                const key = 't4Material';
                setState(key, json.material);

        })
        .catch(error => {
            console.log(error);
        })

}


export const getT5Materials = () =>{
    const url = "/materials/tier/5";

    fetch(url)
        .then((res) =>{
            // Handle response we get from the API.
            // Usually check the error codes to see what happened.
            if (res.status === 200) {
                return res.json();
                
            }
        })
        .then((json) =>{
                const key = 't5Material';
                setState(key, json.material);

        })
        .catch(error => {
            console.log(error);
        })
}

export const getCatalyst = () =>{
    const url = "/materials/catalyst";      

    fetch(url)
        .then((res) =>{
            // Handle response we get from the API.
            // Usually check the error codes to see what happened.
            if (res.status === 200) {
                return res.json();
                
            }
        })
        .then((json) =>{
                setState('catalyst', json.material[0]);
        })
        .catch(error => {
            console.log(error);
        })
}


export const getGacha = () =>{
    const url = "/materials/gacha"; 

    fetch(url)
        .then((res) =>{
            // Handle response we get from the API.
            // Usually check the error codes to see what happened.
            if (res.status === 200) {
                return res.json();
                
            }
        })
        .then((json) =>{
                setState('gacha', json.material[0]);
        })
        .catch(error => {
            console.log(error);
        })
}

export const getPlan = () =>{
    const url = "/materials/plan";    

    fetch(url)
        .then((res) =>{
            // Handle response we get from the API.
            // Usually check the error codes to see what happened.
            if (res.status === 200) {
                return res.json();
                
            }
        })
        .then((json) =>{
            json.material[0].green_ticket_value.toFixed(3); // Otherwise it shows 1 lolooool
            setState('plan', json.material[0]);
        })
        .catch(error => {
            console.log(error);
        })
}


export const getMisc = () =>{
    const url = "/materials/misc";
    
    fetch(url)
        .then((res) =>{
            // Handle response we get from the API.
            // Usually check the error codes to see what happened.
            if (res.status === 200) {
                return res.json();
                
            }
        })
        .then((json) =>{
            setState('misc', json.material);
        })
        .catch(error => {
            console.log(error);
        })
}