/** @format */

import { UniqueIdentifier } from "@dnd-kit/core";
import { Board, Task } from "./Board";
import { Item } from "./BoardItem";

interface Props {
  id: UniqueIdentifier;
  findBoardByItemId: (id: UniqueIdentifier) => Board | undefined;
  handleRemoveRow: (
    boardId: UniqueIdentifier,
    itemId: UniqueIdentifier
  ) => void;
  handle?: boolean;
  getIndex: (id: UniqueIdentifier) => number;
  getItemStyles: (args: {
    boardId: UniqueIdentifier;
    overIndex: number;
    index: number;
    value: UniqueIdentifier;
    isSorting: boolean;
    isDragging: boolean;
    isDragOverlay: boolean;
  }) => React.CSSProperties;
  wrapperStyle: (args: { index: number }) => React.CSSProperties;
}

function renderSortableItemDragOverlay({
  id,
  findBoardByItemId,
  handle,
  getIndex,
  getItemStyles,
  handleRemoveRow,
  wrapperStyle,
}: Props) {
  console.log(id)
  const board = findBoardByItemId(id) as Board;
  const item = board?.tasks.find((item) => item.id === id) as Task;

  return (
    <Item
      value={item.title}
      handle={handle}
      style={getItemStyles({
        boardId: board?.id as UniqueIdentifier,
        overIndex: -1,
        index: getIndex(id),
        value: id,
        isSorting: true,
        isDragging: true,
        isDragOverlay: true,
      })}
      removeTemporaryTask={() => handleRemoveRow(board.id, item.id)}
      id={id}
      color="#fff"
      wrapperStyle={wrapperStyle({ index: 0 })}
      dragOverlay
    />
  );
}

export default renderSortableItemDragOverlay;
