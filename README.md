# git 参考手册地址

> http://gitref.justjavac.com/

# 使用脚手架搭建项目

create-react-app 搭建项目

sudo create-react-app react-admin_client （创建项目

# hooks

## useState

```js
const [count,setCount]=useState(0)
const [obj,setObj]=useState({name:"zhangsan"})
const [arr,setArr]=useState([1,2,3])
const [func,setFunc]=useState(()=>{return 1})
<>
  <h2>{count}</h2>
  <button onClick={()=>{setCount(count+1)}}></button>

  <h2>{obj}</h2>
  <button onClick={()=>{setObj({...obj,name:'lisi'})}}></button>

  <h2>{arr}</h2>
  <button onClick={()=>{setArr(
    ()=>{arr.push(4);return [...]}
  )}}></button>

  <h2>{func}</h2>
</>
```
## useEffect
1. 相当于 DidMount DidUpdate和WillUnmount
2. 副作用（DOM操作、数据更新、组件更新）
3. useEffect 可以获取props和state，采用闭包的形式
4. 无阻塞更新
5. useEffect（回调函数，数组（可不写））
6. 多个useEffect
```js
const [count,setCount]=useState(0);
useEffect(()=>{
  console.log(count)
})
//不增加第二个参数的时候，监听所有数据改动

useEffect(()=>{
  console.log(count)
},[count])
//只监视当前的count状态
```
