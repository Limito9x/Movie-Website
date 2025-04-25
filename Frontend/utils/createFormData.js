const createFormData = (data,video,images) => {
    const formData = new FormData();
    Object.keys(data).forEach((key)=>{
        console.log(key,data[key])
        formData.append(key,data[key])
    })

    if(video) formData.append("video",video);
    if(images) images.forEach((image)=>{
        formData.append("images",image)
    })
    return formData;
};

export default createFormData;