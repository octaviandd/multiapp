/** @format */

import React from "react";

import {
  arraySwap,
  rectSortingStrategy,
  rectSwappingStrategy,
} from "@dnd-kit/sortable";

import { GridContainer } from "./Grid/GridContainer";
import { Sortable, Props as SortableProps } from "./Sortable";

// import { FitnessWidget } from "../../components/ui/home/fitness-widget";
import { NotesWidget } from "../../components/ui/home/notes-widget";
import { TasksWidget } from "../../components/ui/home/tasks-widget";
import { ProjectsWidget } from "../../components/ui/home/projects-widget";
import { GoalsWidget } from "../../components/ui/home/goals-widget";
import { PeopleWidget } from "../../components/ui/home/people-widget";
import { FinanceWidget } from "../../components/ui/home/finance-widget";

const items = [
  NotesWidget,
  TasksWidget,
  ProjectsWidget,
  GoalsWidget,
  PeopleWidget,
  FinanceWidget,
];

const createRange = () => {
  return items.map((Component, index) => {
    return <Component key={index} />;
  });
};

const props: Partial<SortableProps> = {
  adjustScale: true,
  Container: (props: any) => <GridContainer {...props} columns={2} />,
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
