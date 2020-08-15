import Toast from 'components/common/toast/Toast'

const obj = {

}

obj.install = function(Vue) { 
  // 将Toast组件中的el传入

  // 1、创建组件构造器
  const contrustor = Vue.extend(Toast)

  // 2、new的方式，根据组件构造器，可以创建出一个对象
  const toast = new contrustor()

  // 3、将组件对象，手动挂载在某一个元素上
  toast.$mount( document.createElement('div'))

  // 4、toast.$el对应的就是div
  document.body.appendChild(toast.$el)

  Vue.prototype.$toast = toast
}

export default obj