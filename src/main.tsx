import React, {useEffect} from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import {RecoilRoot, useRecoilSnapshot} from "recoil";
import RecoilizeDebugger from 'recoilize'


const  DebugObserver = () => {
  const snapshot = useRecoilSnapshot();
  useEffect(() => {
    console.debug('The following atoms were modified:');
    for (const node of snapshot.getNodes_UNSTABLE({isModified: true})) {
      console.debug(node.key, snapshot.getLoadable(node));
    }
  }, [snapshot]);

  return null;
}


ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <DebugObserver />
      {/*<RecoilizeDebugger />*/}

      <React.Suspense fallback={<div>Loading...</div>}>
        <App />
      </React.Suspense>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root')
)
