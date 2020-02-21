import { setState } from "statezero";

// Initialize all state paths used by your app as empty.
// These are the states that you can filter using filterState()
// as needed by specific components. All component classes that read
// from these state paths must extend BaseReactComponent class.

export const setEmptyState = () => {
    setState("t5Material", []);
    setState("t4Material", []);
    setState("t3Material", []);
    setState("t2Material", []);
    setState("t1Material", []);
    setState("misc", []);
    setState("catalyst", {});
    setState("gacha", {});
    setState("plan", {});
    setState("message", {body: "",type: ""});
    setState("modalOpen", false);
    setState("stageModalOpen", false);
    setState("detailMode", true);
    setState("showBestOnly", false);
    setState("itemToRender", {name: "", id: "",credit_store_value: 0,lowest_ap_stages:[],balanced_stages: [],drop_rate_first_stages:[]});


};
