const taskItems = document.getElementsByTagName('li');

for (let i = 0; i < taskItems.length; i++) {
    const element = taskItems[i];
    element.addEventListener('click', function(){
        fetch('/' + element.id, {method: "delete"} )
        .then((res) => res.json())
        .then((data) => location.reload() )
    }) 
}