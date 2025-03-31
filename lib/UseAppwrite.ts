import { useEffect, useState } from "react";

const useAppwriting=(fn:any)=>{
      const [data, setData] = useState([]);
    const [isloading, setIsLoading] = useState(true);
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fn();
         setData(response);
      } catch (error) {
    
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    }
    useEffect(()=>{ 
       fetchData();
  
      }, []);
    const refetch=()=>fetchData();
    return {data,isloading,refetch}
}
export default useAppwriting;