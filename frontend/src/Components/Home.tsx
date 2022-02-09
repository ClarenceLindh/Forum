import React, { useContext, useEffect, useState } from "react";
import CreateThread from "./CreateThread";
import "../Styles/Home.scss";
import ThreadList from "./Threads/ThreadList";
import { useNavigate } from "react-router-dom";
import { Context } from "../Context/ContextProvider";
import { Link } from "react-router-dom";
import Footer from "./Footer";


const Home = () => {
  const navigate = useNavigate();

  const { loggedInUser, whoAmI } = useContext(Context);
  const [showCT, setShowCT ] = useState(false);
  const [threads, setThreads] = useState([{}]);




  /////////////////////////////////////////////////////
  ////////////////////////////////////////////////////


  function Greeting() {
    console.log("loggedinUser", loggedInUser)
    if (Object.keys(loggedInUser).length===0 && loggedInUser.constructor ===Object) {
      return <GuestGreeting />;}
    else{
      return <UserGreeting />;
    
  }
}
////////////////////////////////////////
const logout=async(e:{preventDefault:()=>void})=> {
  e.preventDefault()
  // tell backend to forget us
  console.log("logout work");  
  let response = await fetch("/logout", {
    method: "post",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    mode: "no-cors", //  <3
  }).then(() => {
    whoAmI();
   
  });

  window.location.reload()

}
  
/////////////////////////////////////////////

  



//////////////////////////////////////////////
  function UserGreeting() {
    return <div><h3>Welcome back {loggedInUser.username}!</h3> <button onClick={logout}>logout</button></div>
  }
  
  function GuestGreeting() {
    return <h2 onClick={routeChange}>Sign in</h2>
  }

  

  /////////////////////////////////////////////////////
  ////////////////////////////////////////////////////
  const [allTopics, setAllTopics] = React.useState<
    Array<{ id: any; name: string }>
  >([]);

  

  const getTopics = async () => {
    try {
      const response = await fetch("/rest/topics/all-topics", {});
      const json = await response.json();
      setAllTopics(json);
    } catch (error) {
      console.log("error", error);
    }
  };

  
  const routeChange = () =>{ 
    let path = `/login`; 
    navigate(path);}

  

    // ReactDOM.render(
    //   // Try changing to isLoggedIn={true}:
    //   <Greeting isLoggedIn={false} />,
    //   document.getElementById('root')
    // );

  async function fetchData() {
    // controller url: "/rest/thread/{threadId}"
    const raw = await fetch(`/rest/threads/all-unblocked-threads`);
    const res = await raw.json();
    console.log(res);

    res.forEach((element: { id: any; name: string; complete: boolean }) => {
      setThreads((threads) => [...threads, element]);
    });

    console.log(res);
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (allTopics.length === 0) {
      getTopics();
    }
  }, [allTopics]);

  return (
    <div className="main">
      <div className="header">
        <div></div>
        <h1>Forum</h1>
        <div>
  {Greeting()}
</div>
        
      </div>

      <div className="body">
        <div className="categories">
          {allTopics.map(function (e, index) {
            return (
              <div id="topic" key={index}>
                {e.name}
              </div>
            );
          })}
        </div>

        {showCT ? <CreateThread topics={allTopics} thread={threads} /> : null}
        <div className="footer">
          <button onClick={() => setShowCT(true)} id="press">
            +
          </button>
        </div>

        <div className="items">
          <ThreadList threads={threads} />
        </div>
      </div>
      <div id="footer"><Footer/></div>
    </div>
  );
};

export default Home;
