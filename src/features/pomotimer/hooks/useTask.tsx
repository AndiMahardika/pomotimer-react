  import { Tasks } from '@/utils/entity';
  import { supabase } from '@/utils/supabase';
  import useTaskStore from '@/store/taskStore';
  import React, { useEffect, useState } from 'react';
  import useUserStore from '@/store/useUserStore';
  import { useToast } from '@/hooks/use-toast';
  import useTimerStore from '@/store/useTmerStore';
  import useSetting from './useSetting';

  export default function useTask() {
    const [isLoading, setIsLoading] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const { tasks, addTask, setTasks, deleteTask, updateTask, selectTask, unselectTask } = useTaskStore();
    const { user } = useUserStore();
    const { toast } = useToast()
    const { setWorkSession, setCurrentDuration, setIsRunning } = useTimerStore()
    const { workduration } = useSetting()

    // Add Task
    const handleAddTask = async (e: React.FormEvent) => {
      e.preventDefault();
      const formData = new FormData(e.target as HTMLFormElement);
      const task = formData.get('task')?.toString().trim();

      if (!task) {
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
        setIsAdding(true);
        const { data, error } = await supabase
          .from('task')
          .insert({ user_id: user?.id, task, is_selected: false, pomo_count: 0 })
          .select()
          .single();

        if (error) throw error;

        if (data) {
          toast({
            className:
             'fixed top-4 left-4 md:top-4 md:left-1/2 md:transform md:-translate-x-1/2 flex md:max-w-[420px] bg-green-500 text-white',
            title: "Added Successfully",
            description: "Your task has been added.",
          })
        }
      } catch (error) {
        console.error('Error adding task:', error);
      } finally {
        setIsAdding(false);
      }
    };

    // Fetch Tasks
    const fetchTasks = async () => {
      if (!user) return;

      try {
        setIsLoading(true);
        const { data, error } = await supabase.from('task')
          .select('*')
          .eq('user_id', user?.id);

        if (error) throw error;

        if (data) {
          setTasks(data);
        }
      } catch (error) {
        console.error('Error fetching tasks:', error);
      } finally {
        setIsLoading(false);
      }
    };

    // Delete Task
    const handleDeleteTask = async (id: number) => {
      try {
        setIsDeleting(true);

        const { error } = await supabase.from('task').delete().eq('id', id);

        if (error) throw error;
      } catch (error) {
        console.error('Error deleting task:', error);
      } finally {
        setIsDeleting(false);
      }
    };

    // update todos
    const handlePomosCount = async (id: number, newPomoCount: number) => {
      try {
        const { data: task, error } = await supabase
          .from('task')
          .update({ pomo_count: newPomoCount })
          .eq('id', id)
          .select()
          .single();
        
        if (error) throw error;

        // console.log("new pomos", newPomoCount)
        // console.log("updated pomos", task)

        if (task) {
          // Update state lokal
          updateTask(id, { pomo_count: task.pomo_count });
        }
      } catch (error) {
        console.error('Error updating pomos task:', error);
      }
    }

    // update task
    const handleUpdateTask = async (id: number, title: string) => {
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
        const { data: task, error } = await supabase
          .from('task')
          .update({ task: title })
          .eq('id', id)
          .select()
          .single();
        
        if (error) throw error;

        if (task) {
          // Update state lokal
          updateTask(id, { task: task.task });
          toast({
            className:
           'fixed top-4 left-4 md:top-4 md:left-1/2 md:transform md:-translate-x-1/2 flex md:max-w-[420px] bg-red-500 bg-green-500 text-white',
            title: "Updated Successfully",
            description: "Your task has been updated.",
          })
        }
      } catch (error) {
        console.error('Error updating pomos task:', error);
      }
    }

    // select task 
    const handleSelectTask = async (id: number, currentSelected: boolean) => {
      try {
        if (currentSelected) {
          // Unselect current task
          const { error } = await supabase
            .from("task")
            .update({ is_selected: false })
            .eq("id", id);
  
          if (error) throw error;
  
          const updatedTasks = tasks.map((task) =>
            task.id === id ? { ...task, is_selected: false } : task
          );
  
          setTasks(updatedTasks);
          setCurrentDuration(workduration)
          setIsRunning(false)
          unselectTask();
        } else {
          // Unselect tasks local storage
          const updatedTasks = tasks.map((task) =>
            task.id === id
              ? { ...task, is_selected: true }
              : { ...task, is_selected: false }
          );
  
          // Unselect tasks in Supabase
          const taskIds = tasks.map((task) => task.id);
          const { error: unselectError } = await supabase
            .from("task")
            .update({ is_selected: false })
            .in("id", taskIds);
  
          if (unselectError) throw unselectError;
  
          // Select task in Supabase
          const { data: dataSelectedTask, error: selectError } = await supabase
            .from("task")
            .update({ is_selected: true })
            .eq("id", id)
            .select("*")
            .single();
  
          if (selectError) throw selectError;
  
          setCurrentDuration(workduration);
          setWorkSession(dataSelectedTask.workSession ?? true);
          setIsRunning(false);
  
          setTasks(updatedTasks);
          selectTask(dataSelectedTask.id);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    // Real-time Listener
    useEffect(() => {
      if (user?.id) {
        fetchTasks();
      }

      const channel = supabase
        .channel('realtime-task')
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'task' },
          (payload) => {
            if (payload.eventType === 'INSERT') {
              addTask(payload.new as Tasks);
            }
            if (payload.eventType === 'DELETE') {
              deleteTask(payload.old.id);
            }
            // if (payload.eventType === 'UPDATE') {
            //   updateTask(payload.new.id, payload.new);
            // }
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }, [user?.id]);

    return { handleAddTask, isAdding, tasks, isLoading, handleDeleteTask, isDeleting, handlePomosCount, handleUpdateTask, handleSelectTask };
  }
