import { useEffect, useRef } from "react";
import { CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import type { MatchDetails } from "~/types";
 
export default function GoldXpGraph({ radiant_gold_adv, radiant_xp_adv, duration }: MatchDetails) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
 
    canvas.width = canvas.offsetWidth * 2;
    canvas.height = canvas.offsetHeight * 2;
    ctx.scale(2, 2);
 
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;
 
    const maxGold = Math.max(...radiant_gold_adv.map((v) => Math.abs(v)), 1000);
    const maxXp = Math.max(...radiant_xp_adv.map((v) => Math.abs(v)), 1000);
 
    ctx.beginPath();
    ctx.strokeStyle = "#e5e7eb";
    ctx.lineWidth = 1;
 
    ctx.moveTo(0, height / 2);
    ctx.lineTo(width, height / 2);
 
    for (let i = 0; i <= 10; i++) {
      const x = (width * i) / 10;
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
 
      if (i % 2 === 0) {
        ctx.fillStyle = "#6b7280";
        ctx.font = "10px Arial";
        ctx.textAlign = "center";
        const minutes = Math.floor((duration * i) / 600);
        ctx.fillText(`${minutes}m`, x, height - 5);
      }
    }
 
    for (let i = 1; i <= 4; i++) {
      const y1 = height / 2 - (height / 2) * (i / 4);
      const y2 = height / 2 + (height / 2) * (i / 4);

      ctx.moveTo(0, y1);
      ctx.lineTo(width, y1);
      ctx.moveTo(0, y2);
      ctx.lineTo(width, y2);
 
      ctx.fillStyle = "#6b7280";
      ctx.font = "10px Arial";
      ctx.textAlign = "left";
      const value = Math.round((maxGold * i) / 4 / 1000);
      ctx.fillText(`${value}k`, 5, y1 + 3);
      ctx.fillText(`-${value}k`, 5, y2 + 3);
    }

    ctx.stroke();
 
    ctx.beginPath();
    ctx.strokeStyle = "#fbbf24";
    ctx.lineWidth = 2;

    for (let i = 0; i < radiant_gold_adv.length; i++) {
      const x = (width * i) / radiant_gold_adv.length;
      const y = height / 2 - (height / 2) * (radiant_gold_adv[i] ?? 1 / maxGold);

      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }

    ctx.stroke();
 
    ctx.beginPath();
    ctx.strokeStyle = "#60a5fa";
    ctx.lineWidth = 2;

    for (let i = 0; i < radiant_xp_adv.length; i++) {
      const x = (width * i) / radiant_xp_adv.length;
      const y = height / 2 - (height / 2) * (radiant_xp_adv?.[i] ?? 1 / maxXp);

      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }

    ctx.stroke();
 
    ctx.fillStyle = "#fbbf24";
    ctx.fillRect(width - 100, 10, 10, 10);
    ctx.fillStyle = "#60a5fa";
    ctx.fillRect(width - 100, 30, 10, 10);

    ctx.fillStyle = "#000000";
    ctx.font = "12px Arial";
    ctx.textAlign = "left";
    ctx.fillText("Gold", width - 85, 20);
    ctx.fillText("XP", width - 85, 40);
  }, [radiant_gold_adv, radiant_xp_adv, duration]);

  return (
    <div>
      <CardHeader className="pb-2">
        <CardTitle>Gold & XP Advantage</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-xs text-gray-500 mb-2">
          Positive values indicate Radiant advantage, negative values indicate Dire advantage
        </div>
        <div className="relative h-80 w-full">
          <canvas
            ref={canvasRef}
            className="absolute top-0 left-0 w-full h-full"
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      </CardContent>
    </div>
  );
}
