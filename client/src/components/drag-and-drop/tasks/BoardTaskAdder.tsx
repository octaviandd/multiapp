import { Plus } from 'lucide-react';
import React from 'react'
import { Board } from './Board';
import { UniqueIdentifier } from '@dnd-kit/core';

type Props = {
  handleAddRow: (boardId: UniqueIdentifier) => void;
  board: Board;
}

export default function BoardTaskAdder({handleAddRow, board}: Props) {
  return (
    <div
    className="py-1 flex justify-center items-center cursor-pointer rounded-lg bg-transparent hover:bg-[#3D3E40] transition-all ease-in-out duration-200"
    onClick={() => handleAddRow(board.id)}
  >
    <span className="w-[12px] h-[12px] mr-2">
      <Plus
        width={13}
        height={13}
        stroke="#A2A0A2"
        strokeWidth={3}
      />
    </span>
    <span className="text-[14px] leading-10 text-[#A2A0A2]">
      Add task
    </span>
  </div>
  )
}