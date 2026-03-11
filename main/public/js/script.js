const socket = io();

const username = prompt("Enter your name");
socket.emit("join", username);

const map = L.map("map").setView([0,0],13);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{
    attribution:"Tracking"
}).addTo(map);

const markers = {};
let myId = null;
let routeLine = null;
let firstLocation = true;

const colors = ["red","blue","green","orange","yellow","violet"];

function getColor(id){

    let hash = 0;

    for(let i=0;i<id.length;i++){
        hash = id.charCodeAt(i)+((hash<<5)-hash);
    }

    return colors[Math.abs(hash)%colors.length];
}

function createIcon(color){

    return new L.Icon({

        iconUrl:`https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-${color}.png`,
        shadowUrl:`https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png`,

        iconSize:[25,41],
        iconAnchor:[12,41]

    });

}

if(navigator.geolocation){

navigator.geolocation.watchPosition((position)=>{

    const {latitude,longitude} = position.coords;

    socket.emit("send-location",{latitude,longitude});

    if(firstLocation){
        map.setView([latitude,longitude],15);
        firstLocation=false;
    }

});

}

socket.on("connect",()=>{
    myId = socket.id;
});

socket.on("existing-users",(users)=>{

    for(let id in users){

        const user = users[id];

        if(user.latitude){

            const icon = createIcon(getColor(id));

            const marker = L.marker(
                [user.latitude,user.longitude],
                {icon}
            ).addTo(map);

            marker.bindTooltip(
                user.username,
                {permanent:true,offset:[0,-20]}
            );

            marker.on("click",()=>showRoute(id));

            markers[id] = marker;

        }

    }

});

socket.on("receive-location",(data)=>{

    const {id,latitude,longitude,username} = data;

    if(markers[id]){

        markers[id].setLatLng([latitude,longitude]);

    }else{

        const icon = createIcon(getColor(id));

        const marker = L.marker(
            [latitude,longitude],
            {icon}
        ).addTo(map);

        marker.bindTooltip(
            username,
            {permanent:true,offset:[0,-20]}
        );

        marker.on("click",()=>showRoute(id));

        markers[id] = marker;

    }

});

socket.on("user-disconnected",(id)=>{

    if(markers[id]){

        map.removeLayer(markers[id]);

        delete markers[id];

    }

});

async function showRoute(targetId){

    if(!markers[myId] || !markers[targetId]) return;

    const start = markers[myId].getLatLng();
    const end = markers[targetId].getLatLng();

    const url =
`https://router.project-osrm.org/route/v1/driving/${start.lng},${start.lat};${end.lng},${end.lat}?overview=full&geometries=geojson`;

    const response = await fetch(url);
    const data = await response.json();

    const route = data.routes[0];

    const coords = route.geometry.coordinates.map(coord=>[
        coord[1],
        coord[0]
    ]);

    if(routeLine){
        map.removeLayer(routeLine);
    }

    routeLine = L.polyline(coords,{
        color:"blue",
        weight:5
    }).addTo(map);

    const distance = (route.distance/1000).toFixed(2);

    const duration = Math.round(route.duration/60);

    markers[targetId]
    .bindPopup(
        "Distance: "+distance+" KM<br>ETA: "+duration+" min"
    )
    .openPopup();

    map.fitBounds(routeLine.getBounds(),{padding:[50,50]});

}