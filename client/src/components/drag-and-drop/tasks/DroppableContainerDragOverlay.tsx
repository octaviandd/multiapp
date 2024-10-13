/** @format */

import { UniqueIdentifier } from "@dnd-kit/core";
import { Board } from "./Board";
import { BoardContainer } from "./BoardContainer";
import { Item } from "./BoardItem";

interface Props {
  boardId: UniqueIdentifier;
  findBoard: (id: UniqueIdentifier) => Board | undefined;
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

function renderContainerDragOverlay({
  boardId,
  findBoard,
  handleRemoveRow,
  getIndex,
  getItemStyles,
  wrapperStyle,
  handle,
}: Props) {
  const board = findBoard(boardId) as Board;
  return (
    <BoardContainer
      label={`${board.title}`}
      style={{
        height: "100%",
        border: "1px solid #424244",
        color: "white",
      }}
      id={boardId}
      shadow
    >
      {board.tasks.map((item, index) => (
        <Item
          key={item.id}
          value={item.title}
          handle={handle}
          removeTemporaryTask={() => handleRemoveRow(boardId, item.id)}
          style={getItemStyles({
            boardId,
            overIndex: -1,
            index: getIndex(item.id),
            value: item.id,
            isDragging: false,
            isSorting: false,
            isDragOverlay: false,
          })}
          id={boardId}
          color="#fff"
          wrapperStyle={wrapperStyle({ index })}
        />
      ))}
    </BoardContainer>
  );
}

export default renderContainerDragOverlay;
