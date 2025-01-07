import {ModeToggle} from '../src/components/ui/mode-toggle'
import InputSection from './components/InputSection';
import { Button } from './components/ui/button';
import { IoCreate } from 'react-icons/io5';
import { IoIosSave } from 'react-icons/io';
import { useEffect, useState } from 'react';
import { MdCancel } from 'react-icons/md';
import SavedToDos from '../src/components/SavedToDos';
import { addDays } from 'date-fns';





function App() {

  const [showInput,setShowInput] = useState(false);
  const [toDo,setToDo] = useState(
    ()=>{
      const storedToDo = localStorage.getItem('toDo')
      return storedToDo ? JSON.parse(storedToDo) : []
    }
  )
  const [progress,setProgress] = useState(0)
  const [editId, setEditId] = useState(null);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [searchTerm, setSearchTerm] = useState("");
  const [date, setDate] = useState({
    from: new Date(),
    to: addDays(new Date(), 7),
  });
  const [priority, setPriority] = useState('Low');
  const id = Date.now();

  useEffect(()=>{
    localStorage.setItem('toDo', JSON.stringify(toDo))
  },[toDo])
  
  return (
    <section className='flex justify-center w-11/12 my-0 mx-auto flex-col'>
      <header className='flex flex-row w-11/12 pt-5 my-0 mx-auto items-center justify-between'>
        <h4 className='font-bold font-sans capitalize text-2xl'>to-do app</h4>
        <ModeToggle />
      </header>

      {/* Create note section */}
      <div className='mt-20 mx-auto flex flex-col items-center'>
        <div className='btn-container'>
          <Button
            className={
              showInput
                ? `capitalize font-mono font-bold bg-red-600 text-white hover:bg-red-500`
                : `capitalize font-mono font-bold  bg-green-600 text-white hover:bg-green-500`
            }
            onClick={() => {
              setShowInput(!showInput);
            }}
          >
            {showInput ? (
              <>
                close to-do <MdCancel />
              </>
            ) : (
              <>
                create to-do <IoCreate />
              </>
            )}
          </Button>
          
        </div>
      </div>
      {showInput && (
        <InputSection
          setShowInput={setShowInput}
          toDo={toDo}
          setToDo={setToDo}
          title={title}
          setTitle={setTitle}
          desc={desc}
          setDesc={setDesc}
          date={date}
          setDate={setDate}
          id={id}
          priority={priority}
          setPriority={setPriority}
          editId={editId}
          setEditId={setEditId}
        />
      )}
      <SavedToDos
        toDo={toDo}
        setToDo={setToDo}
        progress={progress}
        setProgress={setProgress}
        editId={editId}
        setEditId={setEditId}
        title={title}
        setTitle={setTitle}
        desc={desc}
        setDesc={setDesc}
        date={date}
        setDate={setDate}
        id={id}
        priority={priority}
        setPriority={setPriority}
        setShowInput={setShowInput}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      
      />
    </section>
  );
}

export default App
