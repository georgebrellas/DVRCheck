async function simplecheck() {
    var ip = document.getElementById("ip").value;
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    if (!ip.trim() || !username.trim() || !password.trim()) {
        alert("Please fill in all fields.");
        return; 
    }

    if (!ip.startsWith("http://")){
        ip = "http://" + ip
    }

    document.getElementById("name").innerHTML = "";
    document.getElementById("model").innerHTML = "";
    document.getElementById("sn").innerHTML = "";
    document.getElementById("firmware").innerHTML = "";
    document.getElementById("status").classList.add("display-none");
    document.getElementById("info").classList.add("display-none");
    document.getElementById("spinner").classList.remove("display-none");

    var response = await window.pywebview.api.simplecheck(ip, username, password);
    document.getElementById("spinner").classList.add("display-none");

    if (!response || response.trim() === "") {
        console.error("No response received");
        document.getElementById("status").innerHTML= `<h2 class="error">Offline</h2>`;
        document.getElementById("status").classList.remove("display-none");
    } else if (response.startsWith("Error: 401")){
        document.getElementById("status").innerHTML= `<h2 class="error">Wrong Username/Password</h2>`;
        document.getElementById("status").classList.remove("display-none");
    } else {
        try {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(response, "application/xml");
        
        const name = xmlDoc.getElementsByTagName("deviceName")[0].textContent;
        const model = xmlDoc.getElementsByTagName("model")[0].textContent;
        const sn = xmlDoc.getElementsByTagName("serialNumber")[0].textContent;
        const firmware = xmlDoc.getElementsByTagName("firmwareVersion")[0].textContent;
        document.getElementById("name").innerHTML = name;
        document.getElementById("model").innerHTML = model;
        document.getElementById("sn").innerHTML = sn;
        document.getElementById("firmware").innerHTML = firmware;
        document.getElementById("status").innerHTML= `<h2 class="success">Online</h2>`;
        document.getElementById("status").classList.remove("display-none");
        document.getElementById("info").classList.remove("display-none");
        } catch (Exception){
            console.log(Exception);
            document.getElementById("status").innerHTML= `<h2 class="error">Offline</h2>`;
            document.getElementById("status").classList.remove("display-none");
        }
    }

  } 
  