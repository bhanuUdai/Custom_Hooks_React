import React, { useEffect, useState } from 'react';
import useHttp from './components/hooks/use-http';
import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';

function App() {
 
  const [tasks, setTasks] = useState([]);

  const transformTasks=(tasksObj)=>
  {
    const loadedTasks = [];

    for (const taskKey in tasksObj) {
      loadedTasks.push({ id: taskKey, text: tasksObj[taskKey].text });
    }

    setTasks(loadedTasks);
  }
 const {isLoading, error, sendRequest: fetchTasks}= useHttp({url: "https://react-http-90afb-default-rtdb.firebaseio.com/tasks.json" },transformTasks)



  useEffect(() => {
    fetchTasks();
  }, []);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  console.log(tasks)

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
