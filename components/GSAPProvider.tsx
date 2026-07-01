"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function GSAPProvider({ children }: { children: React.ReactNode }) {
  const mounted = useRef(false);

  useEffect(() => {
    if (!mounted.current) {
      // Регистрируем плагин только на клиенте
      gsap.registerPlugin(ScrollTrigger);
      mounted.current = true;
    }

    return () => {
      // Очищаем все триггеры при размонтировании
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return <>{children}</>;
}