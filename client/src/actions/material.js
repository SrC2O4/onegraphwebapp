// getState is used to get the value of a state path
// setState is used to set the value of a state path
import {setState } from "statezero";
import {setEmptyState} from './helpers';

const baseUrl = process.env.NODE_ENV === 'development' ? '' : (process.env.REACT_APP_API_HOST || '');

export const getAll = ()=>{
    const urls =  [
        fetch(baseUrl + "/activity"), 
        fetch(baseUrl + "/materials/tier/1"),  
        fetch(baseUrl + "/materials/tier/2"), 
        fetch(baseUrl + "/materials/tier/3"),  
        fetch(baseUrl + "/materials/tier/4"),  
        fetch(baseUrl + "/materials/tier/5"), 
        fetch(baseUrl + "/materials/catalyst"), 
        fetch(baseUrl + "/materials/plan"), 
        fetch(baseUrl + "/materials/gacha"), 
        fetch(baseUrl + "/materials/misc"),
        fetch(baseUrl + "/contingency"),
        fetch(baseUrl + "/stages")]
    Promise.all(urls)
    .then(([res1,res2,res3, res4, res5, res6, res7, res8, res9, res10, res11, res12])=>{
        return Promise.all([res1.json(),res2.json(),res3.json(), res4.json(), res5.json(), res6.json(), res7.json(), res8.json(), res9.json(), res10.json(), res11.json(), res12.json()])
    })
    .then(([res1,res2,res3, res4, res5, res6, res7, res8, res9, res10, res11,res12])=>{
        if(res1.eventStatus.status){
            console.log(res1.eventStatus.event.type)
            setState("eventType", res1.eventStatus.event.type)
        }
        if(res1.eventStatus.event.type === "Casual"){
        setState("ifEventNow", res1.eventStatus.status);
        console.log("Event Now!!")
        }
        setState("t5Material", res6.material);
        setState("t4Material", res5.material);
        setState("t3Material", res4.material);
        setState("t2Material", res3.material);
        setState("t1Material", res2.material);
        setState("misc", res10.material);
        setState("catalyst", res7.material[0]);
        setState("gacha",res9.material[0]);
        setState("plan", res8.material[0]);
        setState("contingencyStore", res11.material);
        setState('stages', res12.stages);

    })
}
export const initialization = () => {
    setEmptyState();
}


export const checkIfEvent = ()=> {
    const url = baseUrl + "/activity";
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
    const url = baseUrl + "/materials/tier/1";     

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
    
    const url = baseUrl + "/materials/tier/2";

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
    
    const url = baseUrl + "/materials/tier/3";  

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
    const url = baseUrl + "/materials/tier/4";

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
    const url = baseUrl + "/materials/tier/5";

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
    const url = baseUrl + "/materials/catalyst";      

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
    const url = baseUrl + "/materials/gacha"; 

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
    const url = baseUrl + "/materials/plan";    

    fetch(url)
        .then((res) =>{
            // Handle response we get from the API.
            // Usually check the error codes to see what happened.
            if (res.status === 200) {
                return res.json();
                
            }
        })
        .then((json) =>{
            setState('plan', json.material[0]);
        })
        .catch(error => {
            console.log(error);
        })
}


export const getMisc = () =>{
    const url = baseUrl + "/materials/misc";
    
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


export const getContingency = () =>{
    const url = baseUrl + "/contingency";
    
    fetch(url)
        .then((res) =>{
            // Handle response we get from the API.
            // Usually check the error codes to see what happened.
            if (res.status === 200) {
                return res.json();
                
            }
        })
        .then((json) =>{
            setState('contingency_store', json.material);
        })
        .catch(error => {
            console.log(error);
        })
}