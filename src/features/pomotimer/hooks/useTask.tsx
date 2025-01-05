  import { Tasks } from '@/utils/entity';
  import { supabase } from '@/utils/supabase';
  import useTaskStore from '@/store/taskStore';
  import React, { useEffect, useState } from 'react';
  import useUserStore from '@/store/useUserStore';

  export default function useTask() {
    const [isLoading, setIsLoading] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const { tasks, addTask, setTasks, deleteTask, updateTask } = useTaskStore();
    const { user } = useUserStore();

    // Add Task
    const handleAddTask = async (e: React.FormEvent) => {
      e.preventDefault();
      const formData = new FormData(e.target as HTMLFormElement);
      const task = formData.get('task')?.toString().trim();

      if (!task) {
        alert('Task cannot be empty');
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
      } catch (error) {
        console.error('Error adding task:', error);
      } finally {
        setIsAdding(false);
      }
    };

    // Fetch Tasks
    const fetchTasks = async () => {
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
        const confirm = window.confirm('Are you sure you want to delete this task?');

        if (!confirm) return;

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

    // Real-time Listener
    useEffect(() => {
      // if (user?.id) {
      //   fetchTasks();
      // }

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

    return { handleAddTask, isAdding, tasks, isLoading, handleDeleteTask, isDeleting, handlePomosCount };
  }
