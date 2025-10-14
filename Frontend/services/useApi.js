import ApiClient from "./axios";
import { useState, useEffect, useCallback, useRef } from "react";
/**
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

export const useApi = (instance, watchValue) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const mountedRef = useRef(true);

  const fetchData = useCallback(
    async (currentWatchValue) => {
      // Nhận giá trị hiện tại để fetch
      if (!mountedRef.current) return;
      setLoading(true);
      setError(null);
      setData(null);
      try {
        const fetchedData = currentWatchValue
          ? await instance.getById(currentWatchValue)
          : await instance.getAll();
        if (mountedRef.current) {
          setData(fetchedData || fetchData.data);
        }
      } catch (err) {
        if (mountedRef.current) {
          setError(err.message);
        }
      } finally {
        if (mountedRef.current) {
          setLoading(false);
        }
      }
    },
    [instance]
  ); // instance là dependency vì nó có thể thay đổi

  const refetch = useCallback(() => {
    fetchData(watchValue); // Sử dụng giá trị hiện tại của watchValue để refetch
  }, [fetchData, watchValue]);

  useEffect(() => {
    mountedRef.current = true;
    fetchData(watchValue); // Fetch dữ liệu ban đầu và khi watchValue thay đổi
    return () => {
      mountedRef.current = false;
    };
  }, [fetchData, watchValue]);

  return { data, loading, error, refetch };
};

export const deleteOne = async (instance, id) => {
  try {
    await instance.delete(id);
  } catch (error) {
    console.log(error.message);
  }
};
