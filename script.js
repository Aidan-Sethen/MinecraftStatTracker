var houseCount = 1;
var itemCount = 1;
var playerCount = 1;

document.getElementById('displayContainer').style.display = "none";

function addHouse() //makes a div with all the house code, and appends it to the houseContainer.
{
    let container = document.getElementById('houses');
    let newHouse = document.createElement('div');

    newHouse.className = 'house';
    newHouse.innerHTML = `
        <label>House Name</label>
        <input type="text" name="house${houseCount}" class="houseName" required />
                
        <label>X Coordinate</label>
        <input type="number" name="x${houseCount}" class="houseX" required />
                
        <label>Z Coordinate</label>
        <input type="number" name="z${houseCount}" class="houseZ" required />

        <button class="remove" type="button" onclick="removeHouse(this)">Remove House</button>
    `;

    container.appendChild(newHouse);
    houseCount++;
}

function removeHouse(button) //removes house button clicked parent obj.
{
    let houses = document.getElementById('houses');

    if(houses.getElementsByClassName('house').length > 1){
        button.parentElement.remove();
    }
    else{
        alert('not enough elements to remove');
    }
}

function addItem() //same as house
{
    let container = document.getElementById('rareItems');
    let newItem = document.createElement('div');

    newItem.className = 'rareItem';
    newItem.innerHTML = `<label>Rare items?</label>
    <input type="text" name="item${itemCount}" class="item" required />
    <button class="remove" type="button" onclick="removeItem(this)">Remove Rare Item</button>`; 

    container.appendChild(newItem);
    itemCount++;
}

function removeItem(button) //same as house
{
    let items = document.getElementById('rareItems');

    if(items.getElementsByClassName('rareItem').length > 1){
        button.parentElement.remove();
    }
    else{
        alert('not enough elements to remove');
    }
}

function addPlayer() //same as house
{
    let container = document.getElementById('players');
    let newPlayer = document.createElement('div');

    newPlayer.className = 'player';
    newPlayer.innerHTML = `<label>Player Name</label>
    <input type="text" name="player${playerCount}" class="player" required />
    <button class="remove" type="button" onclick="removePlayer(this)">Remove Player</button>`; 

    container.appendChild(newPlayer);
    playerCount++;
}

function removePlayer(button) //same as house
{
    var players = document.getElementById('players');

    if(players.getElementsByClassName('player').length > 1){
        button.parentElement.remove();
    }
    else{
        alert('not enough elements to remove');
    }
}

var url = new URLSearchParams(window.location.search); //Defining our url

if (url.get('world')) //if our url has world in it (it does once the data is submitted)
{
    //swap the visibility of our pages.
    document.getElementById('formPage').style.display = 'none';
    document.getElementById('displayContainer').style.display = 'grid';
    
    //url.get returns the value after the '=' in a url chunk. so url.get('world) grabs 'world=braxtonsworld' and returns braxtonsworld.
    var worldName = url.get('world');
    document.getElementById('displayWorldName').textContent = worldName;

    //setting up our variables
    var itemsTable = document.getElementById("itemsTable");
    var bossesTable = document.getElementById("bossesTable");
    var playersTable = document.getElementById("playersTable");

    var canvas = document.getElementById('mapCanvas');
    var ctx = canvas.getContext('2d');
    
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 1;
    
    var colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'];
    var houseList = '';
    var maxCoord = 1000;

    // these could be renamed for better readability. i'm just a lazy idiot.
    var i = 0; //for houses
    var j = 0; //for items
    var k = 0; //for players

    //all of the while loops are just saying "while the url has item1, item2, ... , itemK; turn these into table stuffs"
    while (url.get('item' + j)) 
    {
        let mainRow = itemsTable.insertRow();
        let cell = mainRow.insertCell();
        let newLink = document.createElement('a');
        newLink.href = 'https://minecraft.wiki/w/' + url.get('item' + j).replace(/ /g, '_');
        newLink.target = '_blank';
        newLink.textContent = url.get('item' + j);
        newLink.style.color = 'white';
        newLink.style.textDecoration = 'none';
        newLink.style.padding = '0px';

        cell.appendChild(newLink);

        let img = document.createElement('img');
        img.className = 'item-icon';
        img.src = 'emerald.png';
        img.style.padding = '0px';  

        cell.appendChild(img);

        j++;
    }

    while (url.get('player' + k)) 
    {
        let mainRow = playersTable.insertRow();
        let cell = mainRow.insertCell();
        //cell.textContent = url.get('player' + k);
        let newLink = document.createElement('a');
        newLink.href = `https://minecraftuuid.com/player/${url.get('player' + k)}`;
        newLink.target = '_blank';
        newLink.textContent = url.get('player' + k);
        newLink.style.color = 'white';
        newLink.style.textDecoration = 'none';
        newLink.style.padding = '0px';

        cell.appendChild(newLink);

        let img = document.createElement('img');
        img.className = 'item-icon';
        img.src = 'steve.jpg';

        cell.appendChild(img);

        k++;
    }

    if (url.get('enderdragon')) {
        let bossRow = bossesTable.insertRow();
        let cell = bossRow.insertCell();
        cell.textContent = 'The Ender Dragon is slain';

        let img = document.createElement('img');
        img.className = 'item-icon';
        img.src = 'enderdragon.jpg';

        cell.appendChild(img);
    }
    if (url.get('wither')) {
        let bossRow = bossesTable.insertRow();
        let cell = bossRow.insertCell();
        cell.textContent = 'The Wither is slain';

        let img = document.createElement('img');
        img.className = 'item-icon';
        img.src = 'wither.png';

        cell.appendChild(img);
    }
    if (url.get('elderguardian')) {
        let bossRow = bossesTable.insertRow();
        let cell = bossRow.insertCell();
        cell.textContent = 'The Elder Guardian is slain';
        
        let img = document.createElement('img');
        img.className = 'item-icon';
        img.src = 'gaurdianicon.jpg';

        cell.appendChild(img);
    }
    
    //grab our max coords
    var tempI = 0;
    while (url.get('house' + tempI)) 
    {
        var tempX = Math.abs(parseInt(url.get('x' + tempI)));
        var tempZ = Math.abs(parseInt(url.get('z' + tempI)));

        if (tempX > maxCoord) {
            maxCoord = tempX;
        }
        if (tempZ > maxCoord) {
            maxCoord = tempZ;
        }
        tempI++;
    }
    
    //scale the size to be 2x the max coords
    var scale = maxCoord * 2;
    
    ctx.fillStyle = 'white';
    ctx.font = '16px VT323';
    
    while (url.get('house' + i)) 
    {
        var houseName = url.get('house' + i);
        var x = parseInt(url.get('x' + i));
        var z = parseInt(url.get('z' + i));

        //these values confuse me, looked em up.
        var canvasX = ((x + scale) / (scale * 2)) * 600;
        var canvasZ = 600 - ((z + scale) / (scale * 2)) * 600;
        
        //looping our colors
        ctx.fillStyle = colors[i % colors.length]; 

        //making our circles where the house is.
        ctx.beginPath(); 
        ctx.arc(canvasX, canvasZ, 8, 0, Math.PI * 2);
        ctx.fill();
        
        //setting the text (house coords beside the dotski)
        ctx.fillStyle = 'white';
        ctx.fillText("(x: " + x + ", z: " + z + ")", canvasX + 12, canvasZ - 5);
        
        //houselist is an empty string that just gets this crud added onto it (<br> added so the next one isn't right beside it)
        houseList += '<span style="color: ' + colors[i % colors.length] + ';">' + houseName + ':</span>' + ' X=' + x + ', Z=' + z + '<br>'; 
        
        i++;
    }
    
    document.getElementById('coordsList').innerHTML = houseList;
}