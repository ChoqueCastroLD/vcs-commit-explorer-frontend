import { useRef, useEffect, useState  } from "react";

import { Repository, Branch, Commit } from "../types/api.ts";


type BackgroundCanvasProps = {
  repository: Repository | null;
  branches: Branch[];
  commits: Commit[];
  [key: string]: any;
}
function BackgroundCanvas(props: BackgroundCanvasProps) {
  const canvasRef = useRef(null);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const { repository, branches, commits, ...rest } = props;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!repository || !branches || !commits) return;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const drawCanvas = () => {
      // Dibuja el fondo
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
  
      // Dibuja las estrellas
      ctx.fillStyle = "white";
      for (let star = 0; star < repository.stars; star++) {
        ctx.beginPath();
        ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, 1, 0, 2 * Math.PI);
        ctx.fill();
      }
  
      // Dibuja el planeta repositorio (central)
      ctx.fillStyle = "blue";
      ctx.beginPath();
      ctx.arc(canvas.width / 2, canvas.height / 2, 20, 0, 2 * Math.PI);
      ctx.fill();
  
      // Dibuja los watchers (siluetas de personas)
      for (let watcher = 0; watcher < repository.watchers; watcher++) {
        ctx.beginPath();
        ctx.arc(
          canvas.width / 2 + (Math.random() * 50) - 25,
          canvas.height / 2 + (Math.random() * 50) - 25,
          1,
          0,
          2 * Math.PI
        );
        ctx.fill();
      }
  
      // Dibuja las branches
      ctx.strokeStyle = "green";
      branches.forEach((branch) => {
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, canvas.height / 2); // Comienza desde el centro (planeta)
        ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
        ctx.stroke();
      });
  
      // Dibuja los commits (edificios)
      ctx.fillStyle = "red";
      commits.forEach((commit) => {
        ctx.fillRect(
          Math.random() * canvas.width,
          Math.random() * canvas.height,
          1,
          1
        );
      });
    }

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      setCanvasSize({ width: canvas.width, height: canvas.height });
      drawCanvas();
    };

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [repository, branches, commits]);

  return (
    <canvas
      ref={canvasRef}
      {...rest}
    />
  );
};

export default BackgroundCanvas;
