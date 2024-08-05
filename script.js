const apiurl = "https://api.github.com/users/";
const main = document.querySelector("#main");
const searchBox = document.querySelector("#search");4


const getUser = async(username) =>{
    const response = await fetch(apiurl + username);
    const data  =  await response.json();
    const card = `
    <div class="card">
            <div>
                <img class="avatar" src="${data.avatar_url}" alt="florin Pop">
            </div>
            <div class="user-info">
                <h2>${data.name}</h2>
                <p>${data.bio}</p>

                <ul class="info">
                    <li>${data.followers}<strong>Followers</strong></li>
                    <li>${data.following}<strong>Following</strong></li>
                    <li>${data.public_repos}<strong>Repos</strong></li>
                </ul>
                <div class="repos">
                    
                </div>
            </div>
        </div> `
        main.innerHTML = card;
        getRepos(username);
}

//init call
//getUser("taylorotwell")

const getRepos = async(username) =>{
    const repos = document.querySelector(".repos");
    const response = await fetch(apiurl+username+"/repos");
    const data = await response.json();
    data.forEach(
        (item) => {
            const elem = document.createElement("a");
            elem.classList.add("repo");
            elem.href = item.html_url; //html_url to go to that url
            elem.innerText = item.name;
            elem.target ="_blank"; //to open a new page when clicked
            repos.appendChild(elem);
        }
    )
}

const formSubmit =()=>{
    if(searchBox.value != ""){
        getUser(searchBox.value);
        searchBox.value = "";
    }
    return false; //false because page is not refreshed when submitted
}

document.addEventListener(
    "focusout",
    function(){
        formSubmit();
    }
)