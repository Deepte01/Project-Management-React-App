import { useState } from "react";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectsSidebar from "./components/ProjectsSidebar";
import SelectedProject from "./components/SelectedProject";

function App() {
  const [projectState, setProjectsState]= useState({
    selectedProjectId: undefined,
    projects:[],
    tasks:[],
  });

  function handleSelectProject(id)
  {
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId : id,
      }
    });
  }

  function handleStartAddProject(){
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId : null,
      }
    });
  }

  function handleCancelAddProject()
  {
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId : undefined,
      }
    });
  }

  function handleAddProject(projectData)
  {
    setProjectsState(prevState => {
      const newProject = {
        ...projectData,
        id: Math.random()
      }; 
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: [...prevState.projects, newProject]
      }
    });
  }

  function handleAddTask(text)
  {
    setProjectsState(prevState => {
      const taskId =Math.random();
      const newTask= {
        text: text,
        projectId: prevState.selectedProjectId,
        id:taskId
      }
      return {
        ...prevState,
        tasks: [newTask, ...prevState.tasks]
      }
    });
  }

  function handleDeleteTask()
  {
    
  }

  function handleDeleteProject()
  {

    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId : undefined,
        projects: prevState.projects.filter((project) => project.id !== prevState.selectedProjectId)
      }
    });
  }

  console.log(projectState);

  let selectedProject = projectState.projects.find(project => 
    project.id === projectState.selectedProjectId
  );

  let content = (
  <SelectedProject
   project={selectedProject} 
   onDelete={handleDeleteProject} 
   onAddTask={handleAddTask}
   onDeleteTask={handleDeleteTask}
   tasks={projectState.tasks}
   />
  );

  if(projectState.selectedProjectId === null)
  {
    content = <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject}/>
  }
  else if(projectState.selectedProjectId === undefined)
  {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject}/>
  }

  return (
   <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar
       onStartAddProject={handleStartAddProject} 
       projects={projectState.projects} 
       onSelectProject={handleSelectProject}
       />
      {content}
   </main>
  );
}

export default App;
