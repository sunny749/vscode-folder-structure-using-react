export default function useTraverseTree() {
  function insertNode(tree,folderId,item,isFolder){
    if(folderId===tree.id&&tree.isFolder){
        tree.items.unshift(
            {
                id:new Date().getTime(),
                name:item,
                isFolder,
                items:[]
            }
        )
        return tree
    }
    else{
        let latestnode=[]
        latestnode=tree.items.map(ele=>{
            return insertNode(ele,folderId,item,isFolder )
        })
        return {...tree,items:latestnode}
    }
  }
  function deleted(tree,folderId){
    // console.log(tree.id)
    if(folderId===tree.id){
        return []
    }
    else{
        let back=(tree,folderId)=>{
            // console.log(tree.id)
            tree.items.every((ele,ind)=>{
                if(tree.items[ind].id===folderId){
                    tree.items.splice(ind,1)
                    return false
                }
                else return true
            })
            if(tree.items!==undefined){
                tree.items.every(ele=>{
                    let res=back(ele,folderId)
                    if(res===true){
                        return false
                    }
                    else return true
                })
            }
        }
        back(tree,folderId)
        return {...tree}
    }
  }
  let updateFN=(tree,item,folderId)=>{
        if(tree.id===folderId){
            return {...tree,name:item}
        }
        else{
            let node=[]
            node=tree.items.map(ele=>{
                return updateFN(ele,item,folderId)
            })
            return {...tree,items:node}
        }
  }
  return {insertNode,deleted,updateFN}
}
