// getState is used to get the value of a state path
// setState is used to set the value of a state path
import {setState } from "statezero";
import {setEmptyState} from './helpers';

const baseUrl = process.env.NODE_ENV === 'development' ? '' : (process.env.REACT_APP_API_HOST || '');

export const getAllCN = ()=>{
    const urls =  [
        fetch(baseUrl + "/activity/CN"), 
        fetch(baseUrl + "/materials/tier/1/CN"),  
        fetch(baseUrl + "/materials/tier/2/CN"), 
        fetch(baseUrl + "/materials/tier/3/CN"),  
        fetch(baseUrl + "/materials/tier/4/CN"),  
        fetch(baseUrl + "/materials/tier/5/CN"), 
        fetch(baseUrl + "/materials/catalyst/CN"), 
        fetch(baseUrl + "/materials/plan/CN"), 
        fetch(baseUrl + "/materials/gacha/CN"), 
        fetch(baseUrl + "/materials/misc/CN"),
        fetch(baseUrl + "/contingency/CN"),
        fetch(baseUrl + "/stages/CN")]
    Promise.all(urls)
    .then(([res1,res2,res3, res4, res5, res6, res7, res8, res9, res10, res11, res12])=>{
        return Promise.all([res1.json(),res2.json(),res3.json(), res4.json(), res5.json(), res6.json(), res7.json(), res8.json(), res9.json(), res10.json(), res11.json(), res12.json()])
    })
    .then(([res1,res2,res3, res4, res5, res6, res7, res8, res9, res10, res11,res12])=>{
        if(res1.eventStatus.status){
            console.log(res1.eventStatus.event.type)
            setState("eventType", res1.eventStatus.event.type)
            if(res1.eventStatus.event.type === "Casual"){
                setState("considerEventStages", res1.eventStatus.status);
                console.log("Event Now!!")
            }
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


    }).catch(e => { console.error('req fail') })
}

export const getAllEN = ()=>{
    const urls =  [
        fetch(baseUrl + "/activity/EN"), 
        fetch(baseUrl + "/materials/tier/1/EN"),  
        fetch(baseUrl + "/materials/tier/2/EN"), 
        fetch(baseUrl + "/materials/tier/3/EN"),  
        fetch(baseUrl + "/materials/tier/4/EN"),  
        fetch(baseUrl + "/materials/tier/5/EN"), 
        fetch(baseUrl + "/materials/catalyst/EN"), 
        fetch(baseUrl + "/materials/plan/EN"), 
        fetch(baseUrl + "/materials/gacha/EN"), 
        fetch(baseUrl + "/materials/misc/EN"),
        fetch(baseUrl + "/contingency/EN"),
        fetch(baseUrl + "/stages/EN")]
    Promise.all(urls)
    .then(([res1,res2,res3, res4, res5, res6, res7, res8, res9, res10, res11, res12])=>{
        return Promise.all([res1.json(),res2.json(),res3.json(), res4.json(), res5.json(), res6.json(), res7.json(), res8.json(), res9.json(), res10.json(), res11.json(), res12.json()])
    })
    .then(([res1,res2,res3, res4, res5, res6, res7, res8, res9, res10, res11,res12])=>{
        if(res1.eventStatus.status){
            console.log(res1.eventStatus.event.type)
            setState("eventTypeEN", res1.eventStatus.event.type)
            if(res1.eventStatus.event.type === "Casual"){
                setState("considerEventStagesEN", res1.eventStatus.status);
                console.log("Event Now!!")
            }
        }
        
        setState("t5MaterialEN", res6.material);
        setState("t4MaterialEN", res5.material);
        setState("t3MaterialEN", res4.material);
        setState("t2MaterialEN", res3.material);
        setState("t1MaterialEN", res2.material);
        setState("miscEN", res10.material);
        setState("catalystEN", res7.material[0]);
        setState("gachaEN",res9.material[0]);
        setState("planEN", res8.material[0]);
        setState("contingencyStoreEN", res11.material);
        setState('stagesEN', res12.stages);

        
    }).catch(e => { console.error('req fail') })
}

export const getAllTW = ()=>{
    const urls =  [
        fetch(baseUrl + "/activity/TW"), 
        fetch(baseUrl + "/materials/tier/1/TW"),  
        fetch(baseUrl + "/materials/tier/2/TW"), 
        fetch(baseUrl + "/materials/tier/3/TW"),  
        fetch(baseUrl + "/materials/tier/4/TW"),  
        fetch(baseUrl + "/materials/tier/5/TW"), 
        fetch(baseUrl + "/materials/catalyst/TW"), 
        fetch(baseUrl + "/materials/plan/TW"), 
        fetch(baseUrl + "/materials/gacha/TW"), 
        fetch(baseUrl + "/materials/misc/TW"),
        fetch(baseUrl + "/contingency/TW"),
        fetch(baseUrl + "/stages/TW")]
    Promise.all(urls)
    .then(([res1,res2,res3, res4, res5, res6, res7, res8, res9, res10, res11, res12])=>{
        return Promise.all([res1.json(),res2.json(),res3.json(), res4.json(), res5.json(), res6.json(), res7.json(), res8.json(), res9.json(), res10.json(), res11.json(), res12.json()])
    })
    .then(([res1,res2,res3, res4, res5, res6, res7, res8, res9, res10, res11,res12])=>{
        if(res1.eventStatus.status){
            console.log(res1.eventStatus.event.type)
            setState("eventTypeTW", res1.eventStatus.event.type)
            if(res1.eventStatus.event.type === "Casual"){
                setState("considerEventStagesTW", res1.eventStatus.status);
                console.log("Event Now!!")
            }
        }
        
        setState("t5MaterialTW", res6.material);
        setState("t4MaterialTW", res5.material);
        setState("t3MaterialTW", res4.material);
        setState("t2MaterialTW", res3.material);
        setState("t1MaterialTW", res2.material);
        setState("miscTW", res10.material);
        setState("catalystTW", res7.material[0]);
        setState("gachaTW",res9.material[0]);
        setState("planTW", res8.material[0]);
        setState("contingencyStoreTW", res11.material);
        setState('stagesTW', res12.stages);

        
    }).catch(e => { console.error('req fail') })
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