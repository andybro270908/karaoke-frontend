const SERVER_URL = https://karaoke-backend-30gu.onrender.com;

const audioInput = document.getElementById("audioInput");
const lyricsInput = document.getElementById("lyricsInput");
const generateBtn = document.getElementById("generateBtn");
const statusText = document.getElementById("status");
const previewVideo = document.getElementById("preview");

generateBtn.onclick = async () => {
  try {
    if (!audioInput.files.length || !lyricsInput.files.length) {
      alert("Please select audio and lyrics files");
      return;
    }

    statusText.innerText = "Uploading to server...";
    previewVideo.style.display = "none";

    const formData = new FormData();
    formData.append("audio", audioInput.files[0]);
    formData.append("lyrics", await lyricsInput.files[0].text());

    const response = await fetch(`${SERVER_URL}/generate`, {
      method: "POST",
      body: formData
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(text || "Server error");
    }

    statusText.innerText = "Receiving video...";
    const text = await response.text();

statusText.innerText = "Server response:";
alert(text);
  } catch (err) {
    console.error(err);
    alert("❌ Error: " + err.message);
    statusText.innerText = "❌ Failed";
