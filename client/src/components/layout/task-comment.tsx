/** @format */

import React from "react";
import { Comment } from "../drag-and-drop/tasks/Board";
import dayjs from "dayjs";
import { ThumbsUp } from "lucide-react";

type Props = {
  comment: Comment;
};

export default function TaskComment({ comment }: Props) {
  return (
    <div className="flex items-center my-2" key={comment.id}>
      <div className="mx-2">
        <img src="https://via.placeholder.com/32" alt="User Avatar" />
      </div>
      <div className="flex flex-col gap-y-1 w-full">
        <div className="flex justify-between">
          <div className="flex items-center gap-x-2">
            <div>
              <p className="small font-medium">
                {comment.author.firstName + " " + comment.author.lastName}
              </p>
            </div>
            <div>
              <p className="extra-small">
                <span className="text-neutral-500">
                  {dayjs(comment.createdAt).format("dddd [at] HH:mm")}
                </span>
              </p>
            </div>
          </div>
          <div className="ml-auto cursor-pointer">
            <ThumbsUp width={14} height={14} />
          </div>
        </div>
        <div>
          <p className="extra-small text-white">{comment.content}</p>
        </div>
      </div>
    </div>
  );
}
