import React, {ChangeEvent} from 'react'
import {atom, useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";

const nameState = atom<string>({
  key: 'nameState',
  default: 'aaaaaa',
});

const Child = () => {
  const name =  useRecoilValue(nameState)
  return (
    <>{name}</>
  )
}


const AtomPage = () => {
  // 跟 useState一样
  const [name, setName] =  useRecoilState(nameState)

  const onChange=(e:React.FormEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value)
  }

  return (
    <div>
      <input onChange={onChange} value={name}/>
      <hr/>
      <Child />
    </div>
  )
}

export default AtomPage

