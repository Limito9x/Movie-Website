export const createFormData = (data,video,images) => {
    console.log("Data to be sent:",data,video,images)
    const formData = new FormData();
    Object.keys(data).forEach((key)=>{
        formData.append(key,data[key])
        console.log(key,data[key])
    })

    if(video) formData.append("video",video);
    if(images) images.forEach((image)=>{
        formData.append("images",image)
    })
    return formData;
};

export const handleInputChange = (setData ,event, values, propName) => {
    if (values) {
        setData((prev) => ({
            ...prev,
            [propName]: values.map((value) => value.id),
        }));
      return;
    }
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };