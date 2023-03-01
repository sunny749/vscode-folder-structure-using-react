import {useState} from 'react'
import explorer from './data/folderData';
import Foldar from './components/Foldar';
import useTraverseTree from './hooks/useTraverseTree';
function App() {
  const [explorerData,setExplorerData]=useState({...explorer})
  const {insertNode,deleted,updateFN}=useTraverseTree()

  const handleUpdateFN=(item,folderId)=>{
    const finalTree=updateFN(explorerData,item,folderId)
    // console.log(finalTree)
    setExplorerData(finalTree)
  }

  const handleInsertNode=(folderId,item,isFolder)=>{
    const finalTree=insertNode(explorerData,folderId,item,isFolder)
    setExplorerData(finalTree)
  }

  const handleDeleteNode=(folderId)=>{
    // console.log('deleted called')
    const finalTree=deleted(explorerData,folderId)
    setExplorerData(finalTree)
  }
  return (
    <div>
      <Foldar handleUpdateFN={handleUpdateFN} handleDeleteNode={handleDeleteNode} handleInsertNode={handleInsertNode} explorer={explorerData}/>
    </div>
  );
}

export default App;
