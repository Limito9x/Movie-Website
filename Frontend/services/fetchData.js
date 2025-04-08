"use client";
import { useEffect } from "react";

export default fetchData = (apiClass) => {
    return apiClass.getAll();
}