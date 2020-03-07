// getState is used to get the value of a state path
// setState is used to set the value of a state path
import {setState } from "statezero";
import {setEmptyState} from './helpers';

export const getAll = ()=>{
    const urls =  [fetch("/activity"), fetch("/materials/tier/1"),  fetch("/materials/tier/2"), fetch( "/materials/tier/3"),  fetch("/materials/tier/4"),  fetch("/materials/tier/5"), fetch("/materials/catalyst"), fetch("/materials/plan"), fetch("/materials/gacha"), fetch("/materials/misc")]
    Promise.all(urls)
    .then(([res1,res2,res3, res4, res5, res6, res7, res8, res9, res10])=>{
        return Promise.all([res1.json(),res2.json(),res3.json(), res4.json(), res5.json(), res6.json(), res7.json(), res8.json(), res9.json(), res10.json()])
    })
    .then(([res1,res2,res3, res4, res5, res6, res7, res8, res9, res10])=>{
        console.log(res1)
        setState("ifEventNow", res1.status);
        setState("t5Material", res6.material);
        setState("t4Material", res5.material);
        setState("t3Material", res4.material);
        setState("t2Material", res3.material);
        setState("t1Material", res2.material);
        setState("misc", res10.material);
        setState("catalyst", res7.material[0]);
        setState("gacha",res9.material[0]);
        setState("plan", res8.material[0]);

    })
}
export const initialization = () => {
    setEmptyState();
}

export const checkIfEvent = ()=> {
    const url = "/activity";
    fetch(url)
        .then((res) => {
            if (res.status===200){
                return res.json();
            }
        })
        .then((json) => {
            setState("considerEventStages", json.status);
            const key = "ifEventNow";
            setState(key, json.status)
            
        }).catch(err => console.log(err))
}

// A function to send a GET to get T1 materials
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
                console.log(json.material[0])
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
            console.log(json.material[0])
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