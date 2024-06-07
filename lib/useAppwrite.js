import { useState, useEffect } from "react";
import { Alert } from "react-native";

const useAppwrite = (fn) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      response = await fn();
      setData(response);
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => fetchData();
  return { data, refetch, isLoading };
};

export default useAppwrite;
