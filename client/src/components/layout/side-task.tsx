/** @format */

import { UniqueIdentifier } from "@dnd-kit/core";
import { Check, CheckIcon, Folder, Plus, ThumbsUp, Trash } from "lucide-react";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Task, User } from "../drag-and-drop/tasks/Board";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, ContentState } from "draft-js";
import { DatePicker } from "./date-picker";
import dayjs from "dayjs";
import { StoreContext } from "@/store";
import { useDropzone, FileWithPath } from "react-dropzone";
import docIcon from "@/assets/doc.png";
import pdfIcon from "@/assets/pdf.png";
import imgIcon from "@/assets/img.png";
import { Button } from "./button";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { cn } from "@/utils/helpers/utils";
interface SideTaskProps {
  selectedItem: UniqueIdentifier;
}

const defaultEditorState = EditorState.createEmpty();
const defaultCommentEditorState = EditorState.createEmpty();

const SideTask: React.FC<SideTaskProps> = ({ selectedItem }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const [editorState, setEditorState] = useState(defaultEditorState);
  const [commentState, setCommentEditorState] = useState(
    defaultCommentEditorState
  );
  const [currentDate, setDate] = useState<Date | undefined>(currentTask?.dueDate || undefined);
  const { store, setStore } = useContext(StoreContext);
  const markCompleteRef = useRef<HTMLButtonElement>(null);
  const [isSelected, setIsSelected] = useState(false);

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    maxFiles: 10,
  });

  const files = acceptedFiles.map((file: FileWithPath) => {
    let icon;
    if (file.type.includes("image")) {
      icon = <img src={imgIcon} alt="Image Icon" width={80} height={80} />;
    } else if (file.type.includes("pdf")) {
      icon = <img src={pdfIcon} alt="PDF Icon" width={80} height={80} />;
    } else {
      icon = <img src={docIcon} alt="Document Icon" width={80} height={80} />;
    }

    return (
      <div
        key={file.path}
        className="flex flex-col items-center hover:bg-neutral-700 cursor-pointer rounded-lg p-4 group"
      >
        <div className="opacity-0 flex justify-between items-center w-full group-hover:opacity-100 transition-all duration-200 ease-in-out">
          <div
            className={cn(
              "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-secondary text-black",
              isSelected
                ? "bg-primary text-primary-foreground"
                : "opacity-50 [&_svg]:invisible"
            )}
          >
            <CheckIcon color="black" className={cn("h-4 w-4")} />
          </div>
          <Button variant="default" className="flex h-8 w-8 p-0">
            <DotsHorizontalIcon color="white" className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </div>
        {icon}
        <p className="mt-6 text-center text-sm font-medium text-white/80 max-w-[80px]">
          {file.path}
        </p>
      </div>
    );
  });

  useEffect(() => {
    let isMounted = true;

    setIsLoading(true);
    if (selectedItem) {
      fetch(`/api/boards/tasks/${String(selectedItem).replace("T", "")}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          if (isMounted) {
            setCurrentTask(data);
            setEditorState(
              EditorState.createWithContent(
                ContentState.createFromText(data.body || "")
              )
            );
            if (data.dueDate) {
              setDate(new Date(data.dueDate));
            } else {
              setDate(undefined);
            }
            setIsLoading(false);
            setIsOpen(true);
          }
        })
        .catch((error) => {
          console.error("Error fetching task:", error);
        });
    }

    return () => {
      isMounted = false;
    };
  }, [selectedItem]);

  useEffect(() => {
    console.log(currentTask, currentDate);
    if (currentTask && currentDate) {
      updateTask({
        dueDate: dayjs(currentDate).toISOString(),
      });
    }
  }, [currentDate]);

  const updateTask = async (data: any) => {
    fetch(`/api/boards/tasks/${String(selectedItem).replace("T", "")}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        data,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
      })
      .catch((error) => {
        console.error("Error updating task:", error);
      });
  };

  const removeTask = async () => {
    fetch(
      `/api/boards/tasks/delete-task/${String(selectedItem).replace("T", "")}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setStore((prev) => ({
          ...prev,
          currentBoardItem: null,
          removedItem: currentTask?.id as UniqueIdentifier,
        }));
      })
      .catch((error) => {
        console.error("Error deleting task:", error);
      });
  };

  const completeTask = async () => {
    fetch(`/api/boards/tasks/${String(selectedItem).replace("T", "")}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          completed: !currentTask?.completed,
        },
      }),
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setCurrentTask(data);
        setStore((prev) => ({
          ...prev,
          completedItem: data,
        }));
      })
      .catch((error) => {
        console.error("Error completing task:", error);
      });
  };

  const likeTask = async () => {
    fetch(`/api/boards/tasks/${String(selectedItem).replace("T", "")}/likes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setCurrentTask((prev) => {
          if (prev) {
            return {
              ...prev,
              taskLikes: [...(prev.taskLikes as any), data],
            };
          }
          return prev;
        });
      })
      .catch((error) => {
        console.error("Error liking task:", error);
      });
  };

  const dislikeTask = async () => {
    const likeId = currentTask?.taskLikes?.find(
      (like) => like.userId === (store.user as User).id
    )?.id;

    fetch(`/api/boards/likes/delete-like/${likeId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setCurrentTask((prev) => {
          if (prev) {
            return {
              ...prev,
              taskLikes: prev.taskLikes?.filter(
                (like) => like.userId !== (store.user as User).id
              ),
            };
          }
          return prev;
        });
      })
      .catch((error) => {
        console.error("Error disliking task:", error);
      });
  };

  const closeSidePanel = () => {
    setIsOpen(false);
    setStore((prev) => ({ ...prev, currentBoardItem: null }));
  };

  const addComment = async (data: any) => {
    fetch(
      `/api/boards/tasks/${String(selectedItem).replace("T", "")}/comments`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          data,
        }),
      }
    )
      .then((res) => res.json())
      .then((data: Comment) => {
        setCurrentTask((prev) => {
          if (prev) {
            return {
              ...prev,
              comments: [...(prev.comments as any), data],
            };
          }
          return prev;
        });
        setCommentEditorState(defaultCommentEditorState);
      })
      .catch((error) => {
        console.error("Error adding comment:", error);
      });
  };

  if (isLoading) {
    return <div>Loading..</div>;
  }

  return (
    <div
      id="taskSidebar"
      className={`absolute border-[#424244] border-l right-0 top-0 h-full w-full sm:w-2/5 md:w-1/3 lg:w-1/3 bg-[#1E1F21] shadow-lg transform transition-transform duration-300 ease-in-out overflow-hidden ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex items-center px-2 py-2 border-b border-neutral-600 w-full h-[65px] z-[50] bg-[#1E1F21]">
        <button
          ref={markCompleteRef}
          className={`${
            currentTask?.completed
              ? "bg-[#1D3733] border-[#1D3733] hover:bg-[#21433D]"
              : "border-neutral-600 bg-[#1E1F21] hover:bg-[#2A2B2D]"
          } flex items-center p-2 gap-x-1 border  rounded-md  transition-background duration-300 ease-in-out`}
          onClick={() => completeTask()}
        >
          <Check color="white" width={16} height={16} />
          <p className="text-white small">
            {currentTask?.completed ? "Completed" : "Mark complete"}
          </p>
        </button>
        <div className="ml-auto flex items-center gap-x-3">
          {currentTask?.taskLikes && currentTask.taskLikes.length > 0 && (
            <div className="flex items-center gap-x-1">
              <p className="text-white small">{currentTask.taskLikes.length}</p>
            </div>
          )}
          <button
            className={`${
              currentTask?.taskLikes && currentTask.taskLikes.length > 0
                ? "bg-[#689AF3] border-[#689AF3] hover:bg-[#729ee9]"
                : "border-neutral-600 bg-[#1E1F21] hover:bg-[#2A2B2D]"
            } border cursor-pointer rounded-md border-neutral-600 p-2 transition-background duration-300 ease-in-out`}
            onClick={() =>
              store?.user?.taskLikes.some(
                (like) => like.taskId == (currentTask as Task).id
              )
                ? dislikeTask()
                : likeTask()
            }
          >
            <ThumbsUp color="white" width={16} height={16} />
          </button>
          <button className="bg-[#1E1F21] hover:bg-[#2A2B2D] border cursor-pointer rounded-md border-neutral-600 p-2 transition-background duration-300 ease-in-out`">
            <Folder color="white" width={16} height={16} />
          </button>
          <button
            className="border rounded-md border-neutral-600 p-2 hover:bg-[#db4b66] transition-background duration-300 ease-in-out"
            onClick={removeTask}
          >
            <Trash color="white" width={16} height={16} />
          </button>
        </div>
      </div>
      <div className="h-full overflow-y-scroll max-h-[650px]">
        <div className="flex items-center justify-between p-4 border-b border-[#424244]">
          <h2 className="pb-0 mb-0 text-xl border-none font-semibold text-white">
            {currentTask?.title}
          </h2>
          <button
            onClick={() => closeSidePanel()}
            className="text-white hover:text-white"
          >
            <svg
              className="w-[16px] h-[16px] bg-[#1E1F21] fill-[#a2a0a2] text-white"
              viewBox="0 0 32 32"
              aria-hidden="true"
              focusable="false"
            >
              <path d="M3 15h18.379L13.94 7.561a1.5 1.5 0 1 1 2.121-2.121l10 10a1.5 1.5 0 0 1 0 2.121l-10 10A1.495 1.495 0 0 1 15 28a1.5 1.5 0 0 1-1.061-2.56l7.439-7.439H3a1.5 1.5 0 1 1 0-3V15ZM30.5 2.5A1.5 1.5 0 0 0 29 4v25a1.5 1.5 0 1 0 3 0V4a1.5 1.5 0 0 0-1.5-1.5Z"></path>
            </svg>
          </button>
        </div>
        <div className="pt-4 space-y-6">
          <div className="flex flex-col px-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <p className="mr-2 extra-small text-white">Asignee: </p>
              </div>
              <div className="flex items-center gap-x-1">
                <img
                  src="https://via.placeholder.com/32"
                  alt="Assignee Avatar"
                  className="w-8 h-8 rounded-full"
                />
                {currentTask && currentTask.author && (
                  <span className="ml-2 text-sm text-white">
                    {currentTask.author.firstName} {currentTask.author.lastName}
                  </span>
                )}
              </div>
            </div>
            <div className="flex items-center justify-between mt-3">
              <p className="extra-small text-white">Due date:</p>
              <DatePicker
                date={currentDate}
                setDate={(date) => setDate(date)}
              ></DatePicker>
            </div>
          </div>

          <div className="px-4">
            <p className="extra-small pb-3 text-white">Description</p>
            {editorState && (
              <Editor
                editorState={editorState}
                onEditorStateChange={setEditorState}
                placeholder="What is this task about?"
                onBlur={() =>
                  updateTask({
                    body: editorState.getCurrentContent().getPlainText(),
                  })
                }
                toolbar={{
                  options: ["inline", "list"],
                  inline: {
                    options: ["bold", "italic", "underline"],
                  },
                }}
                wrapperStyle={{
                  display: "flex",
                  flexDirection: "column",
                  border: "1px solid #424242",
                }}
                editorStyle={{
                  order: 1,
                  color: "white",
                  padding: "5px 10px",
                  minHeight: "200px",
                }}
                toolbarStyle={{
                  border: "none",
                  order: 2,
                  backgroundColor: "#1E1F21",
                }}
              />
            )}
          </div>

          <div className="border-b border-neutral-600 pb-4 px-4">
            <p className="extra-small pb-3 text-white">Attachments</p>
            <section className="container p-6">
              <div
                {...getRootProps({ className: "dropzone" })}
                className={cn(
                  "group relative grid h-12 w-16 cursor-pointer place-items-center rounded-lg border-2 border-dashed border-muted-foreground/25 px-5 py-2.5 text-center transition hover:bg-muted/25",
                  "ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                )}
              >
                <input {...getInputProps()} />
                <Plus className="h-6 w-6" color="white"/>
              </div>
              <aside className="my-12">
                <div className="grid gap-6 grid-cols-4 grid-rows-auto">{files}</div>
              </aside>
            </section>
            <div className="mt-2">
              <div className="flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.586-6.586a4 4 0 00-5.656-5.656L7.757 9.172a6 6 0 008.485 8.485l6.586-6.586"
                  />
                </svg>
                <a href="#" className="text-sm text-blue-600 hover:underline">
                  attachment.pdf
                </a>
              </div>
            </div>
          </div>

          <div className="bg-[#252628] px-4 text-white pb-4 !mt-0">
            <div className="border-b py-4 mb-3 border-neutral-500">
              <p className="text-[14px] leading-6 font-medium">Comments</p>
            </div>
            {currentTask && <div className="flex items-center my-2">
              <div className="mx-2 flex justify-between items-center w-full">
                <img
                  src="https://via.placeholder.com/32"
                  alt="User Avatar"
                />
                <div className="ml-2 w-full">
                  <p className="font-medium">{currentTask.author?.firstName + ' ' + currentTask.author?.lastName} <p className="extra-small font-medium inline-block"> created this task · {dayjs(currentTask.createdAt).format("D MMM")}</p></p>
                </div>
              </div>
            </div>}
            {currentTask?.comments &&
              currentTask?.comments.map((comment) => (
                <div className="flex items-center my-2" key={comment.id}>
                  <div className="mx-2">
                    <img
                      src="https://via.placeholder.com/32"
                      alt="User Avatar"
                    />
                  </div>
                  <div className="flex flex-col gap-y-1 w-full">
                    <div className="flex justify-between">
                      <div className="flex items-center gap-x-2">
                        <div>
                          <p className="small font-medium">{comment.author.firstName + ' ' + comment.author.lastName}</p>
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
                      <p className="extra-small text-white">
                        {comment.content}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      <div className="border-t border-[#424242] h-auto">
        {commentState && (
          <Editor
            editorState={commentState}
            onEditorStateChange={setCommentEditorState}
            toolbarCustomButtons={[
              <button
                onClick={() =>
                  addComment({
                    content: commentState.getCurrentContent().getPlainText(),
                  })
                }
                className="ml-auto px-4 py-1 bg-[#4573D2] text-white rounded-sm"
              >
                <p className="small text-white">Comment</p>
              </button>,
            ]}
            placeholder="Add a comment"
            toolbar={{
              options: ["inline", "list"],
              inline: {
                options: ["bold", "italic", "underline"],
              },
            }}
            wrapperStyle={{
              display: "flex",
              flexDirection: "column",
              border: "1px solid #424242",
            }}
            editorStyle={{
              order: 1,
              color: "white",
              padding: "5px 10px",
              minHeight: "100px",
              fontSize: "14px",
            }}
            toolbarStyle={{
              border: "none",
              order: 2,
              backgroundColor: "#1E1F21",
            }}
          />
        )}
      </div>
    </div>
  );
};

export default SideTask;
