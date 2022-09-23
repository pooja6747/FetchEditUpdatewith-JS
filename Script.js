let apiData = [];
let currentId = "";
function fetchData() {
  fetch("https://fakestoreapi.com/users")
    .then((res) => {
      return res.json(); //converted to object
    })
    .then((objectData) => {
      apiData = [...objectData];
      console.log(apiData);
      let data = "";

      objectData.map((values) => {
        data += `
                        
                        <div class="card">
                
            
                        <div class="card-body">
                        <h2 class="card-Username">${values.id}</h4>
                          <h4 class="card-Username">${values.username}</h4>
                          <h4 class="card-title">${values.name.firstname} ${values.name.lastname}</h4>
                          <p class="card-text">${values.email}</p>
                          <p class="card-text">${values.address.city}</p>
                          <p class="card-text">${values.address.street}</p>
                         <p>${values.phone}</p>
                         <button  onclick="deleteData(${values.id})">DELETE</button>
                         <button  onclick="updateData(${values.id})">UPDATE</button>
                        </div>
                        </div>
                        `;
      });

      document.getElementById("card").innerHTML = data;
    });
}

fetchData();

//delete data

function deleteData(id) {
  fetch("https://fakestoreapi.com/users/" + id, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((json) => console.log(json));
  console.log(id);
  alert("deleted sucessfully");
  // fetchData();
}

//update data
function updateData(id) {
  let currentUser = "";
  console.log(id);
  apiData.map((update) => {
    if (update.id == id) {
      currentUser = update.username;
      currentId = id;
    }
  });
  popUp(currentUser);
}

function popUp(currentUser) {
  let popup = document.getElementById("popup");
  const userValue = document.getElementById("username");
  userValue.value = currentUser;
  popup.classList.add("open-popup");
  console.log(userValue.value);
  return false;
}

function saveData(event) {
  const saveElement = document.getElementById("popup");
  saveElement.style.display = "none";
  event.preventDefault();
  const emailValue = document.getElementById("email");
  const userValue = document.getElementById("username");
  const numberValue = document.getElementById("number");
  console.log(emailValue.value);
  fetch(`https://fakestoreapi.com/users/${currentId}`, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      email: `${emailValue.value}`,
      username: `${userValue.value}`,
      number: `${numberValue.value}`,
    }),
  })
    .then((data) => data.json())
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
  fetchData();
}




//add data
function addData() {
  fetch("https://fakestoreapi.com/users", {
    method: "POST",
    body: JSON.stringify({
      email: "John123456@gmail.com",
      username: "johnd",
      password: "m38rmF$",
      name: {
        firstname: "John",
        lastname: "Doe",
      },
      address: {
        city: "kilcoole",
        street: "7835 new road",
        number: 3,
        zipcode: "12926-3874",
        geolocation: {
          lat: "-37.3159",
          long: "81.1496",
        },
      },
      phone: "1-570-236-7033",
    }),
  })
    .then((res) => res.json())
    .then((json) => console.log(json));
  // fetchData();
}
