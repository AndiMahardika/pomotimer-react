import { Tasks } from '@/utils/entity'
import { supabase } from '@/utils/supabase'
import React, { useEffect, useState } from 'react'

export default function useTask() {
  const [tasks, setTasks] = useState<Tasks[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isAdding, setIsAdding] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  // Add Task
  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const task = formData.get('task')?.toString().trim()

    try {
      setIsAdding(true)
      const { data, error } = await supabase
        .from('task')
        .insert({task})

    } catch (error) {
      console.error("Error adding task:", error); 
    } finally {
      setIsAdding(false)
    }
  }

  // fetch Task
  async function fetchTask() {
    try {
      setIsLoading(true)
      const { data: task, error } = await supabase
        .from('task')
        .select('*');

      if (error) {
        throw error;
      }
      setTasks(task || [])
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchTask()

    // Realtime listener
    const channel = supabase
      .channel("realtime-task")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "task" },
        (payload) => {
          if (payload.eventType === "INSERT") {
            setTasks((prevTask) => [...prevTask, payload.new as Tasks]);
          }
          if (payload.eventType === "DELETE") {
            setTasks((prevTask) =>
              prevTask.filter((task) => task.id !== payload.old.id)
            );
          }
        }
      )
      .subscribe();

    // Cleanup listener
    return () => {
      supabase.removeChannel(channel);
    };
  }, [])

  // Delete Task
  const handleDeleteTask = async (id: number) => {
    try {
      setIsDeleting(true);
      const confirm = window.confirm("Are you sure you want to delete this task?");
  
      if (!confirm) {
        return;
      }
  
      // Hapus task dari Supabase
      const { error } = await supabase
        .from('task')
        .delete()
        .eq('id', id);
  
      if (error) {
        throw error;
      }
  
      console.log("Success delete task id", id);
    } catch (error) {
      console.error("Error deleting task:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return { handleAddTask, isAdding, tasks, isLoading, handleDeleteTask, isDeleting }
}