import React from 'react';
import Thread from './Thread';


export default function ThreadList({threads}:{threads:any}) {



  return (
<div>
 { threads.map((thread: {  })=>{
    return <Thread  thread={thread}/>
  })}
    </div>
    )
}
