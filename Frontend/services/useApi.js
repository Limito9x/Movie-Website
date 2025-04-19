import ApiClient from "./axios";
import { useState, useEffect,useCallback } from "react";
/**
 * Thiết lập 1 class chứa:
 * - Các thuộc tính:
 * + data (Dữ liệu) để hiển thị
 * + loading quản lý trạng thái
 * + instance (Kiểu API nào) vd: MovieApi,ActorApi
 * - Phương thức:
 * + constructor(ApiClient): set kiểu instance cho class này
 * * @param {ApiClient} instance
 * + fetchAllData(): gọi phương thức getAll của instance để set cho data
 * + fetchDataByID(id): tương tự trên nhưng gọi getById
 * + deleteOne(id): gửi yêu cầu xóa 1 dữ liệu
 */

export const useApi = (instance,watchValue) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(
    async (currentWatchValue) => {
      // Nhận giá trị hiện tại để fetch
      setLoading(true);
      setError(null);
      setData(null);
      try {
        const fetchedData = currentWatchValue
          ? await instance.getById(currentWatchValue)
          : await instance.getAll();
        setData(fetchedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    },
    [instance]
  ); // instance là dependency vì nó có thể thay đổi

  const refetch = useCallback(() => {
    fetchData(watchValue); // Sử dụng giá trị hiện tại của watchValue để refetch
  }, [fetchData, watchValue]);

  useEffect(() => {
    fetchData(watchValue); // Fetch dữ liệu ban đầu và khi watchValue thay đổi
  }, [fetchData, watchValue]);

  return { data, loading, error,refetch };
}

export const deleteOne = async (instance,id) => {
  try{
    await instance.delete(id)
  }catch(error){
    console.log(error.message);
  }
}