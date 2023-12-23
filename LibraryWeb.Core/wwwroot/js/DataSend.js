function DataGet() {
    fetch('api/sql')
        .then(response => console.log(response.json()))
        .catch(exp => console.log(exp));
}

//function DataPos() {
//    let user = {
//        Username: "пользовательновый",
//        Password: "Парольновый"
//    };

//    fetch('api/sql')
//    method: "POST",
//        headers: {
//        'Content-Type': 'application/json;charset=utf-8'
//    },
//    body: JSON.stringify(user)
//}