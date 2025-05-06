export const createFormData = (data,video,images) => {
    console.log("Data to be sent:",data,video,images)
    const formData = new FormData();
    Object.keys(data).forEach((key)=>{
        if (Array.isArray(data[key])) {
            data[key].forEach((item) => {
            formData.append(`${key}[]`, item);
            });
        } else {
            formData.append(key, data[key]);
        }
    })

    if(video) formData.append("video",video);
    if(images) images.forEach((image)=>{
        formData.append("images",image)
    })
    return formData;
};

export const handleInputChange = (setData ,event, values, propName) => {

    if (values) {
        console.log("Values:", values);
        const ids = values.map((value) => value.id);
        console.log("IDs:", ids);
        setData((prev) => ({
            ...prev,
            [propName]: ids,
        }));
      return;
    }
    const { name, value } = event.target;
    setData((prev) => ({
        ...prev,
        [name]: value,
    }));
  };