import React, {useState} from 'react'
import Draggable from 'react-draggable';
import {atom, atomFamily, useRecoilState, useRecoilValue, waitForAll} from "recoil";

/**

 Returns a function that returns a writeable RecoilState atom.

 如果您的状态和 特定实例，特定元素 相关联，该怎么办?



 */

//这是一个错误的用法
// const elementValueAtomFamily = atomFamily({
//   key: 'ElementValue',
//   default: (index:number) => {
//     return atom({
//       key:'atom/default' + index,
//       default:'No.' + index
//     })
//   }
// });



//正确的
const elementValueAtomFamily = atomFamily({
  key: 'ElementValue',
  default: (index:number) => {
    return 'No.' + index
  }
});


const ElementInput = ({index}:{index:number }) => {
  const [elementValue, setElementValue] = useRecoilState(elementValueAtomFamily(index));
  return (
      <input value={elementValue} onChange={(e:React.FormEvent<HTMLInputElement>) => {
        setElementValue(e.currentTarget.value)
      }}/>
  );
}


const ElementView = ({index}:{index:number }) => {
  const elementValue = useRecoilValue(elementValueAtomFamily(index));
  return (
    <>
      {elementValue}
    </>
  );
}



const AtomFamilyPage = () => {
  const [list,setList] =  useState<string[]>([])

  // 到高级篇讲这个
  const elementValueList = useRecoilValue(waitForAll(list.map((item,index)=>elementValueAtomFamily(index)) ) )


  const add = () => {
    setList( [...list, new Date().getTime()+''] )
  }

  return (
    <>
      {JSON.stringify(elementValueList) }

      <br/>
      <button onClick={add}>add</button>
      <br/>
      {
        list.map((item,index) =>
          <>
            <ElementInput key={item} index={index}/>
            <ElementView index={index}/>
            <br/>
          </>
        )
      }
    </>
  )
}

export default AtomFamilyPage
