import { Tasks } from '@/utils/entity';
import { db } from '@/utils/firebase';
import { 
  collection, 
  addDoc, 
  query, 
  where, 
  deleteDoc, 
  doc, 
  updateDoc, 
  onSnapshot,
  writeBatch
} from "firebase/firestore";
import useTaskStore from '@/store/taskStore';
import React, { useEffect, useState } from 'react';
import useUserStore from '@/store/useUserStore';
import { useToast } from '@/hooks/use-toast';
import useTimerStore from '@/store/useTmerStore';
import useSetting from './useSetting';

export default function useTask() {
  const [isLoading] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { tasks, setTasks, updateTask, selectTask, unselectTask } = useTaskStore();

  const filteredTasks = tasks.filter((task) =>
    task.task.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const { user } = useUserStore();
  const { toast } = useToast()
  const { setWorkSession, setCurrentDuration, setIsRunning } = useTimerStore()
  const { workduration } = useSetting()

  // Add Task
  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const taskContent = formData.get('task')?.toString().trim();

    if (!taskContent) {
      toast({
        className:
         'fixed top-4 left-4 md:top-4 md:left-1/2 md:transform md:-translate-x-1/2 flex md:max-w-[420px] bg-red-500 text-white',
        title: "Error",
        description: "Task cannot be empty",
        variant: "destructive",
      })
      return;
    }

    if (!user) {
      toast({
        className:
         'fixed top-4 left-4 md:top-4 md:left-1/2 md:transform md:-translate-x-1/2 flex md:max-w-[420px] bg-red-500 text-white',
        title: "Error",
        description: "You must be logged in to add tasks",
        variant: "destructive",
      })
      return;
    }

    try {
      setIsAdding(true);
      await addDoc(collection(db, "task"), {
        user_id: user?.uid,
        task: taskContent,
        is_selected: false,
        pomo_count: 0,
        created_at: new Date().toISOString()
      });

      // Reset form input
      (e.target as HTMLFormElement).reset();

      toast({
        className:
         'fixed top-4 left-4 md:top-4 md:left-1/2 md:transform md:-translate-x-1/2 flex md:max-w-[420px] bg-green-500 text-white',
        title: "Added Successfully",
        description: "Your task has been added.",
      })
    } catch (error) {
      console.error('Error adding task:', error);
      toast({
        className:
         'fixed top-4 left-4 md:top-4 md:left-1/2 md:transform md:-translate-x-1/2 flex md:max-w-[420px] bg-red-500 text-white',
        title: "Error",
        description: "Failed to add task. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsAdding(false);
    }
  };

  // Delete Task
  const handleDeleteTask = async (id: string) => {
    try {
      setIsDeleting(true);
      await deleteDoc(doc(db, "task", id));
    } catch (error) {
      console.error('Error deleting task:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  // Update Pomos Count
  const handlePomosCount = async (id: string, newPomoCount: number) => {
    try {
      const taskRef = doc(db, "task", id);
      await updateDoc(taskRef, { pomo_count: newPomoCount });
      updateTask(id, { pomo_count: newPomoCount });
    } catch (error) {
      console.error('Error updating pomos task:', error);
    }
  }

  // Update Task Title
  const handleUpdateTask = async (id: string, title: string) => {
    if (!title) {
      toast({
        className:
         'fixed top-4 left-4 md:top-4 md:left-1/2 md:transform md:-translate-x-1/2 flex md:max-w-[420px] bg-red-500 text-white',
        title: "Error",
        description: "Task cannot be empty",
        variant: "destructive",
      })
      return;
    }

    try {
      const taskRef = doc(db, "task", id);
      await updateDoc(taskRef, { task: title });
      updateTask(id, { task: title });
      
      toast({
        className:
       'fixed top-4 left-4 md:top-4 md:left-1/2 md:transform md:-translate-x-1/2 flex md:max-w-[420px] bg-green-500 text-white',
        title: "Updated Successfully",
        description: "Your task has been updated.",
      })
    } catch (error) {
      console.error('Error updating task title:', error);
    }
  }

  // Select Task 
  const handleSelectTask = async (id: string, currentSelected: boolean) => {
    try {
      if (currentSelected) {
        // Unselect current task
        const taskRef = doc(db, "task", id);
        await updateDoc(taskRef, { is_selected: false });

        setCurrentDuration(workduration)
        setIsRunning(false)
        unselectTask();
      } else {
        // We need to unselect others and select this one. 
        // In Firestore, we can use a batch for efficiency if there are many, 
        // but here we might just query selected ones and unselect them.
        const batch = writeBatch(db);
        
        // Unselect all tasks for this user
        tasks.forEach(t => {
          if (t.id) {
            const tRef = doc(db, "task", t.id);
            batch.update(tRef, { is_selected: false });
          }
        });

        // Select the specific task
        const selectedTaskRef = doc(db, "task", id);
        batch.update(selectedTaskRef, { is_selected: true });
        
        await batch.commit();

        setCurrentDuration(workduration);
        // Find the task data for workSession
        const selectedTaskData = tasks.find(t => t.id === id);
        // @ts-expect-error - workSession property is added dynamically to task items from Firestore
        setWorkSession(selectedTaskData?.workSession ?? true);
        setIsRunning(false);

        selectTask(id);
      }
    } catch (error) {
      console.error("Error selecting task:", error);
    }
  };

  // Real-time Listener
  useEffect(() => {
    if (!user?.uid) return;

    const q = query(collection(db, "task"), where("user_id", "==", user?.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const tasksData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Tasks[];
      setTasks(tasksData);
    });

    return () => unsubscribe();
  }, [user?.uid, setTasks]);

  return { handleAddTask, isAdding, tasks: filteredTasks, isLoading, handleDeleteTask, isDeleting, handlePomosCount, handleUpdateTask, handleSelectTask, searchQuery, setSearchQuery };
}
