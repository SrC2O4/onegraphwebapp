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
    setState("stages", []);

    setState("t5MaterialEN", []);
    setState("t4MaterialEN", []);
    setState("t3MaterialEN", []);
    setState("t2MaterialEN", []);
    setState("t1MaterialEN", []);
    setState("contingencyStoreEN", []);
    setState("eventTypeEN", "");
    setState("miscEN", []);
    setState("catalystEN", {});
    setState("gachaEN", {});
    setState("planEN", {});
    setState("stagesEN", []);

    setState("t5MaterialTW", []);
    setState("t4MaterialTW", []);
    setState("t3MaterialTW", []);
    setState("t2MaterialTW", []);
    setState("t1MaterialTW", []);
    setState("contingencyStoreTW", []);
    setState("eventTypeTW", "");
    setState("miscTW", []);
    setState("catalystTW", {});
    setState("gachaTW", {});
    setState("planTW", {});
    setState("stagesTW", []);

    setState("modalOpen", getMenory("modalOpen",false));
    setState("stageModalOpen", false);
    setState("listOpen", false);
    setState("detailMode", getMenory("detailMode",true));
    setState("showBestOnly", getMenory("showBestOnly",false));
    setState("itemToRender", {name: "", id: "",Notes:{"event":"", "normal":""},credit_store_value: {"event":0, "normal":0},lowest_ap_stages:{"event":[], "normal":[]},balanced_stages: {"event":[], "normal":[]},drop_rate_first_stages:{"event":[], "normal":[]}});
    setState("considerEventStages", getMenory("considerEventStages",true));
    setState("considerEventStagesEN", getMenory("considerEventStagesEN",true));
    setState("considerEventStagesTW", getMenory("considerEventStagesTW",true));
    setState("userTheme", getMenory("userTheme", 'system'));
    setState("currentTheme", 'light');
    
    setState("updateEvent", false);
    setState("animeOnce", true);
    setState("orangeStore",getMenory("orangeStore",false))
    setState("server", getMenory("server",'CN'));
    setState("serverListOpen", false);
    setState("lang", getMenory("lang",'en'));
    setState("langMenuOpen", false);
    setState("oldModalOpen", false);
    
};
