const reply =(massage)=>{

    const div = document.createElement("div")
    div.className = 'reply'
    div.innerHTML = massage.toString()
    document.getElementById("chatbox").appendChild(div)
}


const response =(massage)=>{

    const div = document.createElement("div")
    div.className = 'response'
    div.innerHTML = massage.toString()
    document.getElementById("chatbox").appendChild(div)
}

const profile = {
    name : (massage)=>{

        let element = document.getElementById('name')
        element.innerHTML = massage.toString()

    },
    uuid : (id)=>{

        let element = document.getElementById('id')
        element.innerHTML = id.toString()

    }
}

const account =( useruuid, index)=>{

    const div = document.createElement("div")
    const span = document.createElement("span")

    div.className = "user"
    div.id = `${index}`
    span.innerHTML = useruuid.toString()
    span.className = "useruuid"
    div.appendChild(span)

    document.getElementById("acount").appendChild(div)
}



const menuBtn = document.getElementById("menu");
const prof = document.getElementById("profile");
const acc = document.getElementById("acount");
const leftDiv = document.getElementById("left");

menuBtn.addEventListener("click", function() {
    this.classList.toggle("active");

    prof.classList.toggle("active");
    acc.classList.toggle("active");

    leftDiv.classList.toggle("active");
    if (this.classList.contains("active")) {
        this.textContent = "✕";
    } else {
        this.textContent = "Menu";
    }

    leftDiv.style.borderRadius = "0px"
    leftDiv.style.backgroundColor = "transparent"

});

