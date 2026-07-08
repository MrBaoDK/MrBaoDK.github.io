import React, { useEffect, useRef } from 'react';

const LiquidGrid: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    window.addEventListener('resize', resize);
    resize();

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove);

    interface Dot {
      x: number;
      y: number;
      ox: number;
      oy: number;
    }

    const dots: Dot[] = [];
    const spacing = 40;

    const initDots = () => {
      dots.length = 0;
      for (let x = spacing / 2; x < width; x += spacing) {
        for (let y = spacing / 2; y < height; y += spacing) {
          dots.push({ x, y, ox: x, oy: y });
        }
      }
    };

    initDots();

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const mouse = mouseRef.current;
      const maxDist = 120;

      dots.forEach((dot) => {
        const dx = mouse.x - dot.ox;
        const dy = mouse.y - dot.oy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        let alpha = 0.18; // Base visibility

        if (dist < maxDist) {
          const angle = Math.atan2(dy, dx);
          const force = (maxDist - dist) / maxDist;
          dot.x = dot.ox - Math.cos(angle) * force * 20;
          dot.y = dot.oy - Math.sin(angle) * force * 20;
          alpha += force * 0.8; // Increase brightness near mouse
        } else {
          dot.x += (dot.ox - dot.x) * 0.1;
          dot.y += (dot.oy - dot.y) * 0.1;
        }

        ctx.fillStyle = `rgba(233, 30, 96, ${alpha})`;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, 1, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className='fixed inset-0 z-0 pointer-events-none'
      style={{ opacity: 0.8 }}
    />
  );
};

export default LiquidGrid;
