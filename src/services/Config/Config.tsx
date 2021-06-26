
console.log(window.location.href);
var config = window.location.href.includes("localhost") ? 
{
    "ChannelName": "CodedGhost2",
    "Api": {
        "UI": "http://localhost:49420/",
        "Backend": "https://api.codedghost.com"
    }
} 
:
{
    "ChannelName": "CodedGhost2",
    "Api": {
        "UI": "https://webapi.codedghost.com/",
        "Backend": "https://api.codedghost.com"
    }
}

export default config