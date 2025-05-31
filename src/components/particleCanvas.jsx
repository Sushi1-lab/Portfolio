// src/components/ParticleCanvas.jsx
import React, { useRef, useEffect, useCallback } from 'react';

const ParticleCanvas = () => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);

  const createParticle = useCallback((ctx) => {
    return {
      x: Math.random() * ctx.canvas.width,
      y: Math.random() * ctx.canvas.height,
      radius: Math.random() * 1.5 + 0.5,
      dx: (Math.random() - 0.5) * 0.5,
      dy: (Math.random() - 0.5) * 0.5,
      alpha: Math.random() * 0.7 + 0.3,
    };
  }, []);

  const drawParticles = useCallback((ctx) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.globalCompositeOperation = 'lighter';

    particlesRef.current.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
      ctx.fill();

      p.x += p.dx;
      p.y += p.dy;

      if (p.x < 0 || p.x > ctx.canvas.width) p.dx *= -1;
      if (p.y < 0 || p.y > ctx.canvas.height) p.dy *= -1;
    });

    requestAnimationFrame(() => drawParticles(ctx));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = document.body.scrollHeight;

    const numParticles = Math.floor((canvas.width * canvas.height) / 30000);
    particlesRef.current = Array.from({ length: numParticles }, () => createParticle(ctx));

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = document.body.scrollHeight;
      const newNumParticles = Math.floor((canvas.width * canvas.height) / 30000);
      particlesRef.current = Array.from({ length: newNumParticles }, () => createParticle(ctx));
    };

    window.addEventListener('resize', handleResize);
    drawParticles(ctx);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [createParticle, drawParticles]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0"
      style={{ opacity: 0.1 }}
    ></canvas>
  );
};

export default ParticleCanvas;