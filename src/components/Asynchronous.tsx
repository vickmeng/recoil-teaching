import React from 'react'
import {atom, selector, useRecoilState, useRecoilValue} from "recoil";
import axios from 'axios'


const todoListQuery = selector({
  key:'todoListQuery',
  get:async ({get, getCallback}) => {
    const res = await axios.get('./src/todoList.json')
    return res.data
  },
  // set:({set, get, reset},newValue) => {
  //
  // }
})



const Asynchronous = () => {
  const todoList =  useRecoilValue(todoListQuery)


  return (
    <div>
      {JSON.stringify(todoList)}
      <hr/>

    </div>
  )
}

export default Asynchronous




