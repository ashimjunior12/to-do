import { Input } from '@/components/ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { DatePickerWithRange } from './ui/DatePickerWithRange';
import { Button } from './ui/button';
import { IoIosAddCircle } from 'react-icons/io';
import { MdCancel } from 'react-icons/md';
import { toast } from '@/hooks/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';


const InputSection = ({setShowInput,toDo,setToDo,progress, title, setTitle, desc, setDesc, date, setDate, priority, setPriority, id, editId, setEditId}) => {
 
  const addToDo = (e) => {
    e.preventDefault();
    if (title.trim()) {
      const newToDo = {
        id: editId || id, 
        title,
        desc,
        date,
        priority,
        status: 'Pending',
        progress,
      };

      const updatedToDo = editId
        ? toDo.map((item) => (item.id === editId ? newToDo : item))
        : [...toDo, newToDo];

      setToDo(updatedToDo);
      setEditId(null);
      setTitle('');
      setDesc('');
      setPriority('Low');
    } else {
      
    }
  };


  return (
    <div className='main'>
      <section className='mt-10 mx-auto border p-10 rounded'>
        <Label htmlFor='userInput' className='font-mono text-1xl font-bold'>
          Title*
        </Label>
        <Input
          id='userInput'
          className='mb-4 mt-1'
          placeholder='Add to-do'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Label
          htmlFor='desc'
          className='font-mono text-1xl font-bold break-words'
        >
          Description
        </Label>
        <Textarea
          id='desc'
          placeholder='Write description here...'
          className='mb-4'
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <Label className='font-mono text-1xl font-bold'>Deadline</Label>
        <DatePickerWithRange setDate={setDate} /> {/* Pass setDate prop */}
        {/* DropDown */}
        <div className='border w-fit p-2 mt-4 rounded'>
          <Label
            className='font-mono text-1xl font-bold break-words mr-4'
          >
            Priority
          </Label>

          <DropdownMenu>
            <DropdownMenuTrigger
              className={`font-mono text-1xl font-bold ${
                priority === 'High'
                  ? 'high-priority'
                  : priority === 'Medium'
                  ? 'medium-priority'
                  : priority === 'Low'
                  ? 'low-priority'
                  : ''
              }`}
            >
              {priority ? `${priority}` : 'Set Priority'}
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Priority</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className='priority-label'
                onClick={() => setPriority('High')}
              >
                High
              </DropdownMenuItem>
              <DropdownMenuItem
                className='priority-label'
                onClick={() => setPriority('Medium')}
              >
                Medium
              </DropdownMenuItem>
              <DropdownMenuItem
                className='priority-label'
                onClick={() => setPriority('Low')}
              >
                Low
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {/* DropDown */}
        <Button
          className='mt-4 bg-green-600 text-white hover:bg-green-500'
          onClick={(e) => {
            addToDo(e);
            title
              ? toast({
                  description: 'To-Do has been added',
                })
              : toast({
                  description: 'Please add title',
                });
          }}
        >
          Add <IoIosAddCircle />
        </Button>
        <Button
          className='mt-4 ml-4 bg-red-600 text-white hover:bg-red-500'
          onClick={() => setShowInput(false)}
        >
          Cancel
          <MdCancel />
        </Button>
      </section>


    </div>
  );
};

export default InputSection;
