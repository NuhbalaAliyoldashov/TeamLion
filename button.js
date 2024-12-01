function toggleContent() {
    var content = document.getElementById("ourintro");
    var IntroText = document.getElementById("IntroText");

    if (content.style.display === "none") {
      content.style.display = "block";
      IntroText.style.display = "block";
    } else {
      content.style.display = "none";
      IntroText.style.display = "none";
    }
  }