import "./App.css";
import Form from "./components/Form";
import JsonController from "./components/JsonController";
import React, { useState } from 'react'

function App() {
  const [showForm, setShowForm] = useState(false)
  return (
    <>
      <div className="App">
        <h1>Create Your Own Form!</h1>
        {showForm ? (
          <>
            <Form setShowForm={setShowForm}/>
          </>
        ) : (
          <JsonController setShowForm={setShowForm} />
        )}
      </div>
    </>
  );
}

export default App;
