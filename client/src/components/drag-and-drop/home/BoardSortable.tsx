/** @format */

import React from "react";

import {
  arraySwap,
  rectSortingStrategy,
  rectSwappingStrategy,
} from "@dnd-kit/sortable";

import { GridContainer } from "./Grid/GridContainer";
import { Sortable, Props as SortableProps } from "./Sortable";

import { TasksWidget } from "../../layout/tasks-widget";

const items = [TasksWidget];

const createRange = () => {
  return items.map((Component, index) => {
    return <Component key={index} />;
  });
};

const props: Partial<SortableProps> = {
  adjustScale: true,
  Container: (props: any) => <GridContainer {...props} columns={1} />,
  strategy: rectSortingStrategy,
  items: createRange(),
  handle: true,
  activationConstraint: {
    distance: 8,
  },
};

export const BoardSortable = () => (
  <Sortable
    {...props}
    strategy={rectSwappingStrategy}
    reorderItems={arraySwap}
    getNewIndex={({ id, items, activeIndex, overIndex }) =>
      arraySwap(items, activeIndex, overIndex).indexOf(id)
    }
  />
);
