import{
  ADD_COUNT,
  ADD_CART
} from './mutations_type'

export default {
  /* addCart(state, payload){
      let oldProduct = null 
      for( let item of state.cartList){
        if( item.iid === payload.iid){
          oldProduct = item
        }
      } 
      // 判断oldProduct
      if(oldProduct){
        oldProduct.count +=1
      }else{
        payload.count = 1
        state.cartList.push(payload)
      }
    } */
    [ADD_COUNT](state, payload){
      payload.count++
    },
    [ADD_CART](state, payload){
      payload.checked = true
      state.cartList.push(payload)
    }
}