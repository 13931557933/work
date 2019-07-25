import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex);

const store = new Vuex.Store({
    state:{
        count:1
    },
    mutations:{
        add(state){
            state.count += 1;
        },
        reduce(state){
            state.count -= 1;
        }
    },
    getters:{
        count(state){
            return state.count += 100;
        }
    },
    actions:{
        addAction(context){
            setTimeout(() => {
                context.commit('add')
            },3000);
            console.log('********')
        },
        reduceAction({commit}){
            commit('reduce');
        },
        // login(context){
        //     axios({
        //         method:'get',
        //         url:'http://localhost:8080/login',

        //     })
        // }
    }
})

export default store