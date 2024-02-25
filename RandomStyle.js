const Colors = ["rgb(157, 252, 255)", "rgb(212, 144, 252)", "rgb(153, 252, 144)", "rgb(49, 49, 49)", "rgb(252, 245, 144)", "rgb(255, 171, 116)", "rgb(226, 211, 200)"]

function SetNewColor()
{
    var Color = Colors[Math.floor(Math.random()*Colors.length)];
    document.getElementById("body").style.backgroundColor = Color
}

SetNewColor()