import { Tasks } from '@/utils/entity'
import { supabase } from '@/utils/supabase'
import React, { useEffect, useState } from 'react'

export default function useTask() {
  const [tasks, setTasks] = useState<Tasks[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isAdding, setIsAdding] = useState(false)

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

      if (data) {
        setTasks((prevTask) => [data[0] as Tasks, ...prevTask])
      }
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
      setTasks(task)
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
          setTasks((prevTask) => [payload.new as Tasks, ...prevTask]);
        }
      )
      .subscribe();

    // Cleanup listener
    return () => {
      supabase.removeChannel(channel);
    };
  },[])

  return { handleAddTask, isAdding, tasks, isLoading }
}