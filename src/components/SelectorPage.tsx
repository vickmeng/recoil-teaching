import React from 'react'
import {atom, DefaultValue, selector, useRecoilState, useRecoilValue,useResetRecoilState} from "recoil";

/**
 *
 * Selector 给了我们两种能力，一个是控制数据流，一个是group atom形成关联结构
 */


const exchangeRate = 0.83

const usdAtom = atom({
  key:"usdAtom",
  default: 1
})

const eurSelector = selector<number>({
  key:'eurSelector',
  // 暂时忽略getcallback
  get:({ get, getCallback }) => {
    const usd = get(usdAtom)
    return usd * exchangeRate
  },
  // 忽略 reset
  set:({ set, get, reset },newValue) => {
    //注意newValue的type 这里另有玄机
    if (newValue instanceof DefaultValue){
      reset(usdAtom)
    }else {
      const newUsdValue = newValue / exchangeRate
      set(usdAtom, newUsdValue)
    }
  },
})


const SelectorPage = () => {

  const [usd,setUsd] = useRecoilState(usdAtom)

  const [eur,setEur] =  useRecoilState(eurSelector)

  const reset = useResetRecoilState(eurSelector);



  const onChange=(e:React.FormEvent<HTMLInputElement>) => {
    setUsd(+e.currentTarget.value)
  }

  return <div>

    <button onClick={reset}>reset</button>

    <hr/>

    usd:
    <input
      onChange={e => {
        setUsd(+e.currentTarget.value)
      }}
      value={usd}
      type='number'
    />

    <br/>

    Eur:
    <input
      onChange={e => {
        setEur(+e.currentTarget.value)
      }}
      value={eur}
      type='number'
    />
  </div>

}


export default SelectorPage
