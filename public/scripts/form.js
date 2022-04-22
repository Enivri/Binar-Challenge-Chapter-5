const input1 = document.querySelector("#input-file"),
input2 = document.querySelector("#file-input");
// txt="";
input1.addEventListener("click", () => {input2.click()})
input2.addEventListener("change", e => {input1.value = input2.files[0].name})


const fetchImage = async (url) => {
    const response = await axios.get(url)
    return [response.data, response.headers['content-type']]
}

if (input1.value !== ''){
    fetchImage(input1.value)
    .then((buffer, contentType) => {
        let name  = input1.value
        name = name.split("/")[name.split("/").length - 1]
    
        let blob = new File([buffer], name, { type: contentType })
        let container = new DataTransfer()
        container.items.add(blob)
        input2.files = container.files
        console.log(input2.files)
    })
    
}
