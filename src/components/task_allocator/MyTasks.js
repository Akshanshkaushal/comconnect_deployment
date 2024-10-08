import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, VStack, Text } from "@chakra-ui/react";
import TaskCard from "./TaskCard";
import { ChatState } from "../../Context/ChatProvider";

const MyTasks = () => {
  const { user } = ChatState();
  const [tasks, setTasks] = useState([]);

  const config = {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  };

  useEffect(() => {
    fetchMyTasks();
  }, []);

  const fetchMyTasks = async () => {
    try {
      const { data } = await axios.get(
        "https://comconnect-backend.onrender.com/api/tasks/my-tasks",
        config
      );
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  return (
    <Box p={5}>
      <Text fontSize="2xl" mb={4}>
        My Tasks
      </Text>
      <VStack spacing={4}>
        {tasks.map((task) => (
          <TaskCard
            key={task._id}
            task={task}
            fetchTasks={fetchMyTasks}
            config={config}
          />
        ))}
      </VStack>
    </Box>
  );
};

export default MyTasks;
