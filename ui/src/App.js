import axios from "axios";
import React, {useState, useEffect, useRef} from "react";
import './App.css';

function App() {

  const [notes, setNotes] = useState(null);
  const [isUpdate, setIsUpdate] = useState(false);

  
  const inputInfo = useRef(null);
  const inputTitle = useRef(null);
  const inputId = useRef(null);



  useEffect(() => {
    axios.get(
      'http://localhost:9090/api/notes',
      {
        withCredentials: false
      }
    ).then(response => {
      console.log(response.data);
      setNotes(response.data);
    });
  }, [isUpdate]);

  const addNote = () => {
    axios.post('http://localhost:9090/api/note/add',
    {
      title: inputTitle.current.value,
      info: inputInfo.current.value
    },
    {
      withCredentials: false
    }).then(() => {
      setIsUpdate(!isUpdate);
    });
  }

  const delNote = () => {
    axios.delete('http://localhost:9090/api/note/'+inputId.current.value,
    {
      withCredentials: false
    }).then(() => {
      setIsUpdate(!isUpdate);
    });
  }
  
  return (
    <div className="main">
      <div className="App">
        <div className="Text">
          <div>
            <div className="label">
              <label >Заголовок</label>
            </div>
            <div>
              <input ref={inputTitle} type="text"/>
            </div>
            <div className="label">
              <label>Описание</label>
            </div>
            <div>
              <input ref={inputInfo} type="text"/>
            </div>
            <div className="button">
              <button  onClick={() => addNote()}>Добавить</button>
            </div>
            <div className="label">
              <label>Введите номер заметки</label>
            </div>
            <div>
              <input ref={inputId} type="text"/>
            </div>
            <div className="button">
              <button  onClick={() => delNote()}>Удалить</button>
            </div>
          </div>
          <div className="box">
            {!!notes && notes.map((note, index) => (
              
              <div className="Note" key={index}> {note.title} <div className="id">{note.id}</div> <div>{note.info}</div></div>
              
            ))}
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
