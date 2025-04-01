import { proxy } from "valtio";

const state = proxy({
    intro:true,
    home:"/home",
})

export default state;   