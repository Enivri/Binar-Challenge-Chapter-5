function deleteCars(e){
    console.log("her")
    const loc = document.querySelector("#delete")
    loc.href=`/deleteCar/${e.currentTarget.dataset.id}`
}
console.log("ern")

const deleteBtns = document.querySelectorAll("#deleteCar")
deleteBtns.forEach(
    button => button.onclick = deleteCars
)