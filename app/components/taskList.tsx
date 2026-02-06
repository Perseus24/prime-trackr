import {
    ContextMenu,
    ContextMenuCheckboxItem,
    ContextMenuContent,
    ContextMenuGroup,
    ContextMenuItem,
    ContextMenuLabel,
    ContextMenuRadioGroup,
    ContextMenuRadioItem,
    ContextMenuSeparator,
    ContextMenuShortcut,
    ContextMenuSub,
    ContextMenuSubContent,
    ContextMenuSubTrigger,
    ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { moveTask } from "../project/[id]/actions";

interface TaskListProps {
    tasks: any,
    isLocatedInDashboard?: boolean
}

export default function TaskList({ tasks, isLocatedInDashboard }: TaskListProps) {
    const priorityTagStyle = (priority: string) => {
        switch(priority) {
            case 'high':
                return 'text-red-600 bg-red-200';
            case 'medium':
                return 'text-yellow-600 bg-yellow-200';
            case 'low':
                return 'text-green-600 bg-green-200';
        }
    }
    
    return (
        <div>
            {
                tasks.map((task: any) => (
                    <ContextMenu  key={task.id} >
                        <ContextMenuTrigger className="rounded-lg bg-white flex flex-col gap-3 p-3 mt-5">
                            {
                                isLocatedInDashboard && (
                                    <div className={`rounded-sm py-1 px-1.5 text-xs bg-neutral-800 text-white`}>{task.project.title}</div>
                                )
                            }
                            <div className="flex flex-wrap gap-2">
                                <div className={`rounded-sm py-1 px-1.5 text-xs ${priorityTagStyle(task.priority)}`}>{task.priority}</div>
                            </div>
                            <p className="font-semibold">{task.title}</p>
                            <p className="text-sm">{task.description}</p>
                        </ContextMenuTrigger >
                        <ContextMenuContent className="w-48 font-mono">
                            <ContextMenuGroup>
                                {
                                    task.status == 'to-do' && (
                                        <ContextMenuItem
                                            onClick={() => moveTask("to-do", "ongoing", task.id, task.project_id)}>
                                            Mark as ongoing
                                        </ContextMenuItem>
                                    )
                                }
                                {
                                    task.status == 'ongoing' && (
                                        <ContextMenuItem
                                            onClick={() => moveTask("ongoing", "completed", task.id, task.project_id)}>
                                            Mark as completed
                                        </ContextMenuItem>
                                    )
                                }
                                
                            </ContextMenuGroup>
                        </ContextMenuContent>
                    </ContextMenu>
                    
                ))
            }
        </div>
    )
}