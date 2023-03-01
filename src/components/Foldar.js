import React, { useState } from 'react'

export default function Foldar({handleUpdateFN,handleDeleteNode,handleInsertNode,explorer}) {

    const [expand,setExpand]=useState(false)
    const [update,setUpdate]=useState(false)
    const [Name,setName]=useState(`${explorer.name}`)
    const [showfolder,setShow]=useState({visible:false,isFolder:null})

    const handleNewFolder=(e,isFolder)=>{
        e.stopPropagation()
        setExpand(true)
        setShow({
            visible:true,
            isFolder
        })
    }
    const handleDelete=(e,folderId)=>{
        handleDeleteNode(folderId)
        // setShow({...showfolder,visible:false})
    }
    const onAddfolder=(e)=>{
        // console.log(e.target.value)
        if(e.keyCode===13&&e.target.value){

            handleInsertNode(explorer.id,e.target.value,showfolder.isFolder)
            setShow({...showfolder,visible:false})
        }
    }
    const handleUpdate=(e,folderId)=>{
        handleUpdateFN(Name,folderId)
        setUpdate(!update)
    }
    if(explorer===[]){
        return
    }
    if(explorer.isFolder){
    return (
        <div className='ml-4 mt-2 w-96'>
            <div className='flex justify-between p-3px mt-6px bg-slate-100'>
                {update?<input type='text' autoFocus value={Name} onChange={(e)=>setName(e.target.value)} />
                :<span onClick={()=>setExpand(!expand)} className='cursor-pointer'>📁{explorer.name}</span>}
                <div>
                <button className='border-2 text-sm border-black bg-white mr-1' onClick={(e)=>handleUpdate(e,explorer.id) }>update</button>
                    <button className='border-2 text-sm border-black bg-white mr-1' onClick={(e)=>handleDelete(e,explorer.id)}>Delete</button>
                    <button className='border-2 text-sm border-black bg-white mr-1' onClick={(e)=>handleNewFolder(e,true)}>Folder +</button>
                    <button className='border-2 text-sm border-black bg-white mr-1' onClick={(e)=>handleNewFolder(e,false)}>File +</button>
                </div>
                </div>
            <div style={{display:expand?'block':'none' ,paddingLeft:'25px'}}>
                {
                    showfolder.visible&&(
                        <div className='flex gap-2 mt-3 items-center'>
                            <span>{showfolder.isFolder?'📁':'📄'}</span>
                            <input onKeyDown={onAddfolder} className='' type="text" autoFocus onBlur={()=>setShow({...showfolder,visible:false})}/>
                        </div>
                    )   
                }
                {explorer.items.map((ele)=>{
                // console.log(ele)
                if(ele!==[]){
                    return(
                        <Foldar handleUpdateFN={handleUpdateFN} handleDeleteNode={handleDeleteNode} handleInsertNode={handleInsertNode} explorer={ele} key={ele.id}/>
                        // <span>{ele.name}</span>
                    )}
            })}</div>
        </div>
    )}
    else if(explorer.isFolder===false){
        return(
            <div className='flex flex-col mt-1 ml-4'>
                <div className='flex justify-between'>
                {update?<input type='text' autoFocus value={Name} onChange={(e)=>setName(e.target.value)} />
                :<span>📄{explorer.name}</span>}
                <div>
                <button className='border-2 text-sm border-black bg-white mr-1' onClick={(e)=>handleUpdate(e,explorer.id) }>update</button>
                <button className='border-2 text-sm border-black bg-white mr-1' onClick={(e)=>handleDelete(e,explorer.id)}>Delete</button>
                </div>
                </div>
            </div>
        )
    }
}
