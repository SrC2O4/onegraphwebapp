import { setState } from "statezero";
import memory from "./memory";

// Initialize all state paths used by your app as empty.
// These are the states that you can filter using filterState()
// as needed by specific components. All component classes that read
// from these state paths must extend BaseReactComponent class.

function getMenory(key,defaultValue){
    let value =memory.getItem(key)
    if(value!==undefined)
        return value
    else
        return defaultValue
}

export const setEmptyState = () => {
    setState("t5Material", []);
    setState("t4Material", []);
    setState("t3Material", []);
    setState("t2Material", []);
    setState("t1Material", []);
    setState("contingencyStore", []);
    setState("eventType", "");
    setState("misc", []);
    setState("catalyst", {});
    setState("gacha", {});
    setState("plan", {});
    setState("modalOpen", getMenory("modalOpen",false));
    setState("stageModalOpen", false);
    setState("listOpen", false);
    setState("detailMode", getMenory("detailMode",true));
    setState("showBestOnly", getMenory("showBestOnly",false));
    setState("itemToRender", {name: "", id: "",Notes:{"event":"", "normal":""},credit_store_value: {"event":0, "normal":0},lowest_ap_stages:{"event":[], "normal":[]},balanced_stages: {"event":[], "normal":[]},drop_rate_first_stages:{"event":[], "normal":[]}});
    setState("ifEventNow", false);
    setState("considerEventStages", getMenory("considerEventStages",true));
    setState("userTheme", getMenory("userTheme", 'system'));
    setState("currentTheme", 'light');
    setState("stages", []);
    setState("updateEvent", false);
    setState("animeOnce", true);
    setState("orangeStore",getMenory("orangeStore",true))

};
