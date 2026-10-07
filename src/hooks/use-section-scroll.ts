import { useEffect } from "react";

/** Step between screens only at reading boundaries; never skip tall content. */
export function useSectionScroll() {
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("main > .snap-section, footer"));
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let busy = false;
    let releaseAt = 0;
    let wheelTotal = 0;
    let lastWheel = 0;
    let touch: { x: number; y: number; target: number | null; captured: boolean } | null = null;

    const boundaryTarget = (direction: number) => {
      const y = window.scrollY;
      const height = window.innerHeight;
      const index = sections.findIndex((section, i) => {
        const top = section.getBoundingClientRect().top + y;
        const next = sections[i + 1];
        return y >= top - 3 && (!next || y < next.getBoundingClientRect().top + y - 3);
      });
      const section = sections[index];
      if (!section) return null;
      const top = section.getBoundingClientRect().top + y;
      const bottom = top + section.offsetHeight;
      // A tall section remains freely scrollable until its final screen is read.
      const atBoundary = direction > 0 ? y + height >= bottom - 3 : y <= top + 3;
      const next = sections[index + direction];
      if (!atBoundary || !next) return null;
      const nextTop = next.getBoundingClientRect().top + y;
      return direction > 0 ? nextTop : Math.max(nextTop, top - height);
    };

    const go = (target: number) => {
      const from = window.scrollY;
      const to = Math.min(target, document.documentElement.scrollHeight - window.innerHeight);
      if (Math.abs(to - from) < 2) return;
      busy = true;
      const start = performance.now();
      const duration = reducedMotion.matches ? 0 : 680;
      const tick = (now: number) => {
        const progress = duration === 0 ? 1 : Math.min((now - start) / duration, 1);
        const ease = progress < 0.5 ? 4 * progress ** 3 : 1 - (-2 * progress + 2) ** 3 / 2;
        window.scrollTo({ top: from + (to - from) * ease, behavior: "instant" });
        if (progress < 1) frame = requestAnimationFrame(tick);
        else {
          busy = false;
          releaseAt = performance.now() + 180;
        }
      };
      frame = requestAnimationFrame(tick);
    };

    const nestedScroll = (target: EventTarget | null) => {
      if (!(target instanceof Element)) return false;
      if (target.closest("input, textarea, select, [contenteditable='true'], [role='dialog']")) return true;
      let element: Element | null = target;
      while (element && element !== document.body) {
        if (/(auto|scroll)/.test(getComputedStyle(element).overflowY) && element.scrollHeight > element.clientHeight + 2) return true;
        element = element.parentElement;
      }
      return false;
    };

    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey || Math.abs(event.deltaX) > Math.abs(event.deltaY) || nestedScroll(event.target)) return;
      const now = performance.now();
      if (busy || now < releaseAt) {
        event.preventDefault();
        releaseAt = now + 180;
        return;
      }
      if (!event.deltaY) return;
      const direction = Math.sign(event.deltaY);
      const target = boundaryTarget(direction);
      if (target === null) { wheelTotal = 0; return; }
      event.preventDefault();
      if (now - lastWheel > 180 || Math.sign(wheelTotal) !== direction) wheelTotal = 0;
      lastWheel = now;
      wheelTotal += event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? window.innerHeight : 1);
      if (Math.abs(wheelTotal) >= 20) { wheelTotal = 0; go(target); }
    };

    const onTouchStart = (event: TouchEvent) => {
      const point = event.touches[0];
      touch = event.touches.length === 1 && point && !nestedScroll(event.target)
        ? { x: point.clientX, y: point.clientY, target: null, captured: false } : null;
    };
    const onTouchMove = (event: TouchEvent) => {
      const point = event.touches[0];
      if (!touch || !point || event.touches.length !== 1) return;
      const dy = touch.y - point.clientY;
      const dx = touch.x - point.clientX;
      if (Math.abs(dx) > Math.abs(dy) || Math.abs(dy) < 8) return;
      if (busy) { event.preventDefault(); return; }
      if (!touch.captured) {
        touch.target = boundaryTarget(Math.sign(dy));
        touch.captured = touch.target !== null;
      }
      if (touch.captured) event.preventDefault();
    };
    const onTouchEnd = (event: TouchEvent) => {
      const point = event.changedTouches[0];
      if (touch?.captured && touch.target !== null && point && Math.abs(touch.y - point.clientY) >= 40 && !busy) go(touch.target);
      touch = null;
    };
    const cancel = () => {
      cancelAnimationFrame(frame);
      busy = false;
      releaseAt = 0;
      touch = null;
    };
    const onClick = (event: MouseEvent) => {
      if (event.target instanceof Element && event.target.closest("a")) cancel();
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("touchcancel", cancel, { passive: true });
    window.addEventListener("keydown", cancel);
    window.addEventListener("resize", cancel);
    document.addEventListener("click", onClick);
    document.documentElement.classList.add("section-scroll-enabled");
    return () => {
      cancel();
      document.documentElement.classList.remove("section-scroll-enabled");
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("touchcancel", cancel);
      window.removeEventListener("keydown", cancel);
      window.removeEventListener("resize", cancel);
      document.removeEventListener("click", onClick);
    };
  }, []);
}