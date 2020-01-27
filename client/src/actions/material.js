// getState is used to get the value of a state path
// setState is used to set the value of a state path
import { getState, setState } from "statezero";
import {setEmptyState} from './helpers';


export const initialization = () => {
    setEmptyState();
}
// A function to send a POST request with a new student.
export const getT1Materials = () => {
    
    // the URL for the request
    const url = "/materials/tier/1";
    console.log(url);        

    fetch(url)
        .then((res) =>{
            // Handle response we get from the API.
            // Usually check the error codes to see what happened.
            if (res.status === 200) {
                // If student was added successfully, tell the user.
                setState("message", {
                    body: "Success: Added a student.",
                    type: "success"
                });
                return res.json();
                
            } else {
                // If server couldn't add the student, tell the user.
                // Here we are adding a generic message, but you could be more specific in your app.
                setState("message", {
                    body: "Error: Could not add student.",
                    type: "error"
                });
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
    console.log(url);        

    fetch(url)
        .then((res) =>{
            // Handle response we get from the API.
            // Usually check the error codes to see what happened.
            if (res.status === 200) {
                // If student was added successfully, tell the user.
                setState("message", {
                    body: "Success: Added a student.",
                    type: "success"
                });
                return res.json();
                
            } else {
                // If server couldn't add the student, tell the user.
                // Here we are adding a generic message, but you could be more specific in your app.
                setState("message", {
                    body: "Error: Could not add student.",
                    type: "error"
                });
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
    console.log(url);        

    fetch(url)
        .then((res) =>{
            // Handle response we get from the API.
            // Usually check the error codes to see what happened.
            if (res.status === 200) {
                // If student was added successfully, tell the user.
                setState("message", {
                    body: "Success: Added a student.",
                    type: "success"
                });
                return res.json();
                
            } else {
                // If server couldn't add the student, tell the user.
                // Here we are adding a generic message, but you could be more specific in your app.
                setState("message", {
                    body: "Error: Could not add student.",
                    type: "error"
                });
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
    console.log(url);        

    fetch(url)
        .then((res) =>{
            // Handle response we get from the API.
            // Usually check the error codes to see what happened.
            if (res.status === 200) {
                // If student was added successfully, tell the user.
                setState("message", {
                    body: "Success: Added a student.",
                    type: "success"
                });
                return res.json();
                
            } else {
                // If server couldn't add the student, tell the user.
                // Here we are adding a generic message, but you could be more specific in your app.
                setState("message", {
                    body: "Error: Could not add student.",
                    type: "error"
                });
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
    console.log(url);        

    fetch(url)
        .then((res) =>{
            // Handle response we get from the API.
            // Usually check the error codes to see what happened.
            if (res.status === 200) {
                // If student was added successfully, tell the user.
                setState("message", {
                    body: "Success: Added a student.",
                    type: "success"
                });
                return res.json();
                
            } else {
                // If server couldn't add the student, tell the user.
                // Here we are adding a generic message, but you could be more specific in your app.
                setState("message", {
                    body: "Error: Could not add student.",
                    type: "error"
                });
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
    console.log(url);        

    fetch(url)
        .then((res) =>{
            // Handle response we get from the API.
            // Usually check the error codes to see what happened.
            if (res.status === 200) {
                // If student was added successfully, tell the user.
                setState("message", {
                    body: "Success: Added a student.",
                    type: "success"
                });
                return res.json();
                
            } else {
                // If server couldn't add the student, tell the user.
                // Here we are adding a generic message, but you could be more specific in your app.
                setState("message", {
                    body: "Error: Could not add student.",
                    type: "error"
                });
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
    console.log(url);        

    fetch(url)
        .then((res) =>{
            // Handle response we get from the API.
            // Usually check the error codes to see what happened.
            if (res.status === 200) {
                // If student was added successfully, tell the user.
                setState("message", {
                    body: "Success: Added a student.",
                    type: "success"
                });
                return res.json();
                
            } else {
                // If server couldn't add the student, tell the user.
                // Here we are adding a generic message, but you could be more specific in your app.
                setState("message", {
                    body: "Error: Could not add student.",
                    type: "error"
                });
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
    console.log(url);        

    fetch(url)
        .then((res) =>{
            // Handle response we get from the API.
            // Usually check the error codes to see what happened.
            if (res.status === 200) {
                // If student was added successfully, tell the user.
                setState("message", {
                    body: "Success: Added a student.",
                    type: "success"
                });
                return res.json();
                
            } else {
                // If server couldn't add the student, tell the user.
                // Here we are adding a generic message, but you could be more specific in your app.
                setState("message", {
                    body: "Error: Could not add student.",
                    type: "error"
                });
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