import { useEffect } from "react";

const HeygenEmbed = () => {
  useEffect(() => {
    const host = "https://labs.heygen.com";
    const url =
      host +
      "/guest/streaming-embed?share=eyJxdWFsaXR5IjoiaGlnaCIsImF2YXRhck5hbWUiOiJTaWxhc0hSX3B1YmxpYyIsInByZXZpZXdJ%0D%0AbWciOiJodHRwczovL2ZpbGVzMi5oZXlnZW4uYWkvYXZhdGFyL3YzLzU4MmVlOGZlMDcyYTQ4ZmRh%0D%0AM2JjNjgyNDFhZWZmNjYwXzQ1NjYwL3ByZXZpZXdfdGFyZ2V0LndlYnAiLCJuZWVkUmVtb3ZlQmFj%0D%0Aa2dyb3VuZCI6ZmFsc2UsImtub3dsZWRnZUJhc2VJZCI6ImI4YTMwNTcyNWNiMzRhZGE4NmYyNTli%0D%0ANGUyOWJhZjExIiwidXNlcm5hbWUiOiI0ZjdjMmM0ODk3MjE0MGZkOWFjMTNmM2Q4Nzc2Y2Y4YSJ9&inIFrame=1";

    const wrapDiv = document.createElement("div");
    wrapDiv.id = "heygen-streaming-embed";

    const container = document.createElement("div");
    container.id = "heygen-streaming-container";

    const stylesheet = document.createElement("style");
    stylesheet.innerHTML = `
      #heygen-streaming-embed {
        z-index: 99999;
        position: fixed;
        right: 40px;
        left: auto !important;
        bottom: 40px;
        width: 300px;
        height: 250px;
        border: 2px solid #fff;
        box-shadow: 0px 8px 24px 0px rgba(0, 0, 0, 0.12);
        transition: all linear 0.1s;
        overflow: hidden;
        opacity: 0;
        visibility: hidden;
      }
      #heygen-streaming-embed.show {
        opacity: 1;
        visibility: visible;
      }
      #heygen-streaming-embed.expand {
        ${document.body.clientWidth < 540 ? "height: 266px; width: 96%; right: 2%; left: auto !important; transform: none;" : "height: 366px; width: calc(366px * 16 / 9);"}
        border: 0;
        border-radius: 8px;
      }
      #heygen-streaming-container {
        width: 100%;
        height: 100%;
      }
      #heygen-streaming-container iframe {
        width: 100%;
        height: 100%;
        border: 0;
      }
    `;

    const iframe = document.createElement("iframe");
    iframe.allowFullscreen = false;
    iframe.title = "Streaming Embed";
    iframe.role = "dialog";
    iframe.allow = "microphone";
    iframe.src = url;

    let visible = false,
      initial = false;
    window.addEventListener("message", (e) => {
      if (e.origin === host && e.data && e.data.type === "streaming-embed") {
        if (e.data.action === "init") {
          initial = true;
          wrapDiv.classList.toggle("show", initial);
        } else if (e.data.action === "show") {
          visible = true;
          wrapDiv.classList.toggle("expand", visible);
        } else if (e.data.action === "hide") {
          visible = false;
          wrapDiv.classList.toggle("expand", visible);
        }
      }
    });

    container.appendChild(iframe);
    wrapDiv.appendChild(stylesheet);
    wrapDiv.appendChild(container);
    document.body.appendChild(wrapDiv);

    console.log("Heygen Embed añadido ✅");

    return () => {
      document.body.removeChild(wrapDiv); // Limpia el widget al desmontar
    };
  }, []);

  return null; // No renderiza nada en el DOM de React
};

export default HeygenEmbed;
