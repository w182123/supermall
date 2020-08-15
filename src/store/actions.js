import{
  ADD_COUNT,
  ADD_CART
} from './mutations_type'

export default{
  addCart(context, payload){
    return new Promise( (resolve, reject) => {
      // find函数 查找之前是否有该商品
      let oldcart = context.state.cartList.find(item=>item.iid===payload.iid)
      if(oldcart){
          // oldcart.count+=1
          context.commit(ADD_COUNT,oldcart)
          resolve('数量加一')
      }else{
          payload.count = 1
          // state.cartList.push(playload)
          context.commit(ADD_CART,payload)
          resolve('添加新的商品')
      }
    })
  }
}