import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { FaSearch } from 'react-icons/fa';
import { FaEdit } from 'react-icons/fa';
import { IoTrashBinSharp } from 'react-icons/io5';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {  useEffect, useState } from 'react';
import { FaFilter } from 'react-icons/fa';
import { Progress } from '@/components/ui/progress';



const SavedToDos = ({
  toDo,
  setToDo,
  progress,
  setProgress,
  editId,
  setEditId,
  title,
  setTitle,
  desc,
  setDesc,
  date,
  setDate,
  priority,
  setPriority,
  id,
  setShowInput,
  searchTerm,
  setSearchTerm,
}) => {

  const [filter,setFilter] = useState({status:null, priority:false})

  const filteredToDo = toDo.filter((item)=>{
    if(filter.status && item.status !== filter.status){
      return false;
    }
    if (filter.priority && item.priority !== filter.priority) {
      return false;
    }
    if (searchTerm && !item.title.toLowerCase().includes(searchTerm.toLowerCase())){
      return false
    }
      return true
    
  })

  const handleStatus = (id, status) => {
    const updatedToDo = toDo.map((item, index) => {
      return item.id === id ? { ...item, status: status } : item;
    });
    setToDo(updatedToDo);
  };

  const deleteToDo = (id) => {
    const filteredToDo = toDo.filter((item) => item.id !== id);
    setToDo(filteredToDo);
  };

  const editToDo = (id) => {
    const toDoToEdit = toDo.find((item) => item.id === id);
    if (toDoToEdit) {
      setTitle(toDoToEdit.title);
      setDesc(toDoToEdit.desc);
      setDate(toDoToEdit.date);
      setPriority(toDoToEdit.priority);
      setEditId(id); 
      setShowInput(true);
    }
  };


  useEffect(() => {
    const totalTasks = toDo.length;
    const completedTasks = toDo.filter(
      (task) => task.status === 'Completed'
    ).length;
    const newProgress =
      totalTasks > 0 ? ((completedTasks / totalTasks) * 100).toFixed(0) : 0;
    setProgress(newProgress);
  }, [toDo]);

  return (
    <div className='mt-10 mb-10'>
      <header className='md:flex  md:justify-between '>
        {/* Progress */}
        <div className='w-fit'>
          <h2>
            <span className='font-bold font-mono'>Progress: </span> {progress}%
            completed
          </h2>
          <Progress className='' value={progress} />
        </div>
        {/* Progress */}

        <div className='right-section w-fit flex items-center flex-col md:flex-row'>
          <div className='input-container flex relative mr-4'>
            <Input
              className='w-fit mb-4 mt-7 md:mt-3 bg-transparent ml-1'
              placeholder='Search to do'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className='md:icon absolute top-1/2 -translate-y-1 right-3' />
          </div>
          {/* filter */}
          <div className='filter -ml-10 flex relative mb-8 md:mb-0 md:ml-3'>
            <DropdownMenu>
              <DropdownMenuTrigger className='font-bold'>
                Filter
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Status</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => setFilter({ ...filter, status: 'Pending' })}
                >
                  Pending
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setFilter({ ...filter, status: 'Completed' })}
                >
                  Completed
                </DropdownMenuItem>
                <DropdownMenuLabel>Priority</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => setFilter({ ...filter, priority: 'High' })}
                >
                  High
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setFilter({ ...filter, priority: 'Medium' })}
                >
                  Medium
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setFilter({ ...filter, priority: 'Low' })}
                >
                  Low
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <FaFilter className='top-1/2 -translate-y-1/2 absolute -left-5' />
            <button
              className='ml-2 border rounded p-2 hover:scale-95 transition-all'
              onClick={() =>
                setFilter({ ...filter, status: null, priority: null })
              }
            >
              Clear Filter
            </button>
          </div>
          {/* filter */}
        </div>
      </header>
      <Table>
        <TableCaption>A list of your To-Dos.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[100px]'>Deadline</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>To-Do</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className='text-right'>Edit/Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredToDo.map((item) => {
            const fromDate = item.date?.from ? new Date(item.date.from) : null;
            const toDate = item.date?.to ? new Date(item.date.to) : null;

            let formattedDate = '-';
            let differenceInDays = '-';

            if (fromDate && toDate) {
              formattedDate = toDate.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              });

              const difference = toDate - fromDate;
              differenceInDays = Math.ceil(difference / (1000 * 60 * 60 * 24));
            }

            return (
              <TableRow key={item.id}>
                {/* Deadline */}
                <TableCell className='font-medium'>
                  {fromDate && toDate
                    ? `${formattedDate} (${differenceInDays} Days Remaining)`
                    : '-'}
                </TableCell>

                {/* Status Dropdown */}
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      {item.status || 'Pending'}
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel> Status</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => handleStatus(item.id, 'Pending')}
                      >
                        Pending
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleStatus(item.id, 'Completed')}
                      >
                        Completed
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>

                {/* Priority */}
                <TableCell
                  className={`${
                    item.status === 'Pending'
                      ? item.priority === 'High'
                        ? 'text-red-500 font-bold'
                        : item.priority === 'Medium'
                        ? 'text-yellow-400 font-bold'
                        : 'text-green-500 font-bold'
                      : 'line-through'
                  }`}
                >
                  {item.priority || '-'}
                </TableCell>

                {/* Title */}
                <TableCell
                  className={`${
                    item.status === 'Pending' ? '' : 'line-through'
                  }`}
                >
                  {item.title || '-'}
                </TableCell>

                {/* Description */}
                <TableCell
                  className={`${
                    item.status === 'Pending' ? '' : 'line-through'
                  }`}
                >
                  {item.desc || '-'}
                </TableCell>

                {/* Edit/Delete Actions */}
                <TableCell className='text-right flex md:block items-center h-20'>
                  <button className='w-6 h-5 rounded text mr-3 bg-green-400 text-white relative'>
                    <FaEdit
                      className='absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2'
                      onClick={() => editToDo(item.id)}
                    />
                  </button>
                  
                  {/* alert */}
                  <AlertDialog>
                    <AlertDialogTrigger>
                      <button className='w-6 h-5 rounded bg-red-700 text-white relative'>
                        <IoTrashBinSharp className='absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2' />
                      </button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Once deleted the to-do will be removed permanently.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => deleteToDo(item.id)}>
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                  {/* alert */}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default SavedToDos;
