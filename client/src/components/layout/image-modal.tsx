import React, {useContext} from 'react'
import { TaskFile } from '../drag-and-drop/tasks/Board';
import dayjs from 'dayjs';
import { CircleX, Delete, DownloadIcon } from 'lucide-react';
import { StoreContext } from "@/store";
import { fetchWithOptions } from '@/utils/helpers/utils';

type Props = {
  currentTaskFile: TaskFile;
}

export default function ImageModal({currentTaskFile}: Props) {
  const {store, setStore} = useContext(StoreContext);

  const handleCloseModal = () => {
    setStore({...store, imageModalIsOpen: false});
  }

  const deleteTaskFile = () => {
    const promise = fetchWithOptions(`/api/files/${currentTaskFile.file.id}`, {method: 'DELETE'});
    promise.then(({data, error}) => {
      
    })
  };

  

  console.log(currentTaskFile);
  return (
    <div className='fixed top-0 left-0 right-0 bottom-0 w-full h-full flex flex-col bg-[#252628]'>
      <div className="border-b border-neutral-400 mb-3  flex items-center text-white justify-between">
        <div className='flex flex-col gap-y-2 py-3 px-10'>
          <p className='small'>{currentTaskFile.file.title}</p>
          <p className='small'>{dayjs(currentTaskFile.file.createdAt).format('DD MMM, YYYY [at] HH:mm')}</p>
        </div>
        <div className='flex items-center gap-x-4'>
          <button className='cursor-pointer flex items-center gap-x-2 px-3 rounded-md py-3 hover:bg-[#4b4c4d]'>
            <span>
              <DownloadIcon size={16} />
            </span>
            <span>Download</span>
          </button>
          <button className='cursor-pointer flex items-center gap-x-2 px-3 rounded-md py-3 hover:bg-[#4b4c4d]'>
            <span>
              <Delete size={16} />
            </span>
            <span>Delete</span>
          </button>
        </div>
        <div onClick={() => handleCloseModal()} className='border-l border-neutral-400 cursor-pointer pl-10 py-3 h-full flex items-center justify-center hover:bg-[#4b4c4d] px-10'>
          <CircleX size={24} />
        </div>
      </div>
      <div className='flex items-center justify-center h-screen'>
        <img src={currentTaskFile.file.url} alt="attachment" className="h-auto w-auto rounded-lg object-contain" />
      </div>
    </div>
  )
}