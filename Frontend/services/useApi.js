import ApiClient from "./axios";
import { useState, useEffect } from "react";
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
// export default class useApi {
//   data = null;
//   loading = true;
//   error = false;
//   instance;
//   constructor(instance) {
//     this.instance = instance;
//   }
//   async fetchAllData() {
//     try {
//       this.data = await this.instance.getAll();
//       this.loading = false;
//     } catch (error) {
//       this.error = true;
//       console.error("Lỗi khi lấy dữ liệu", error);
//     }
//   }
//   async fetchDataByID(id) {
//     try {
//       this.data = await this.instance.getById(id);
//       this.loading = false;
//     } catch (error) {
//       this.error = true;
//       console.error("Lỗi khi lấy dữ liệu", id, error);
//     }
//   }
//   async deleteOne(id) {
//     try {
//       this.data = await this.instance.delete(id);
//       this.loading = false;
//     } catch (error) {
//       this.error = true;
//       console.error("Lỗi khi lấy dữ liệu", id, error);
//     }
//   }
// }

export const useApi = (instance,id) => {
  const [data,setData] = useState(null);
  const [loading,setLoading] = useState(true);
  const [error,setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      setData(null);
      try{
        id?
          setData(await instance.getById(id)):
          setData(await instance.getAll());
      }
      catch (error){
        setError(error.message);
      } finally {
        if(isMounted) setLoading(false);
      }
    }

    fetchData();

    return () => {
      isMounted = false;
    }
  },[instance])
  return {data,loading,error}
}

export const deleteOne = async (instance,id) => {
  try{
    await instance.delete(id)
  }catch(error){
    console.log(error.message);
  }
}