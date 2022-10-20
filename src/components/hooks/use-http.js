import React ,{useState} from "react";

const useHttp=(requestConfig, applyData)=>
{

    console.log('working')
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const sendRequest = async (taskText) => {
        setIsLoading(true);
        setError(null);
        console.log('working fetch')
        try {
          const response = await fetch(requestConfig.url,{
                method:requestConfig.method ? requestConfig.method:"GET",
                body: requestConfig.body? JSON.stringify(requestConfig.body): null,
                headers:requestConfig.headers ? requestConfig.headers : {},
            }
          );

          if (!response.ok) {
            throw new Error('Request failed!');
          }
    
          const data = await response.json();
          console.log(data)
         
         applyData(data)
    
          
        } catch (err) {
          setError(err.message || 'Something went wrong!');
        }
        setIsLoading(false);
      };


      return {
        isLoading,
        error,
        sendRequest
      }
}
export default useHttp;











// const [isLoading, setIsLoading] = useState(false);
// const [error, setError] = useState(null);
// const [tasks, setTasks] = useState([]);

// const fetchTasks = async (taskText) => {
//   setIsLoading(true);
//   setError(null);
//   try {
//     const response = await fetch(
//       'https://react-http-90afb-default-rtdb.firebaseio.com/tasks.json'
//     );

//     if (!response.ok) {
//       throw new Error('Request failed!');
//     }

//     const data = await response.json();

//     console.log(data)
//     const loadedTasks = [];

//     for (const taskKey in data) {
//       loadedTasks.push({ id: taskKey, text: data[taskKey].text });
//     }

//     setTasks(loadedTasks);
//   } catch (err) {
//     setError(err.message || 'Something went wrong!');
//   }
//   setIsLoading(false);
// };