"use client";

import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap, registerGsap } from "@/lib/gsap/setup";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import {
  eraQuestions,
  eraCopy,
  eraTypes,
  scoreEra,
  type EraAnswer,
  type EraPath,
  type EraType,
} from "@/content/era-quiz";
import { drawEraCard, eraFileName } from "./drawEraCard";
import s from "./EraQuiz.module.css";

export function EraGlyph({ type, className }: { type: EraType; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 200 200" aria-hidden="true">
      {type.glyph.solid.map((d) => (
        <path key={d} d={d} className={s.glyphLine} pathLength={1} />
      ))}
      {type.glyph.dotted && <path d={type.glyph.dotted} className={s.glyphDots} />}
      <circle cx={type.glyph.dot[0]} cy={type.glyph.dot[1]} r="10" className={s.glyphDot} />
    </svg>
  );
}

/** Progress as a short Trasa: passed stations solid, current one yellow, the rest dotted. */
function Progress({ step, total }: { step: number; total: number }) {
  const gap = 100 / (total - 1);
  const past = useRef<SVGLineElement>(null);
  const reduced = usePrefersReducedMotion();
  const drawn = `0% ${step * gap}%`;
  const placed = useRef(false);

  // The solid line is drawn on to the new station. Lines use pixel
  // coordinates (no viewBox scaling), so DrawSVG lengths match the screen.
  useLayoutEffect(() => {
    registerGsap();
    const line = past.current;
    if (!line) return;
    if (reduced || !placed.current) {
      placed.current = true;
      gsap.set(line, { drawSVG: drawn });
      return;
    }
    const tween = gsap.to(line, { drawSVG: drawn, duration: 0.45, ease: "power2.out", overwrite: true });
    return () => {
      tween.kill();
    };
  }, [drawn, reduced]);

  useEffect(() => {
    const resize = () => past.current && gsap.set(past.current, { drawSVG: drawn });
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [drawn]);

  return (
    <div className={s.progress} aria-hidden="true">
      <svg>
        <line x1="0" y1="50%" x2="100%" y2="50%" className={s.progressFuture} />
        <line ref={past} x1="0" y1="50%" x2="100%" y2="50%" className={s.progressPast} />
      </svg>
      {Array.from({ length: total }, (_, i) => (
        <span
          key={i}
          className={s.station}
          data-state={i < step ? "past" : i === step ? "now" : "next"}
          style={{ left: `${i * gap}%` }}
        />
      ))}
    </div>
  );
}

export function EraQuiz() {
  const [path, setPath] = useState<EraPath | null>(null);
  const [answers, setAnswers] = useState<EraAnswer[]>([]);
  const [status, setStatus] = useState("");
  const heading = useRef<HTMLHeadingElement>(null);
  const questions = path ? eraQuestions[path] : [];
  const done = path !== null && answers.length === questions.length;
  const result = done && path ? eraTypes[scoreEra(answers, path)] : null;
  const copy = result && path ? eraCopy(result, path) : null;
  const step = answers.length;

  // Move focus to the new question or result so keyboard and screen-reader
  // users continue where the content changed.
  const shown = useRef(`${path}-${step}`);
  useEffect(() => {
    const key = `${path}-${step}`;
    if (shown.current === key) return;
    shown.current = key;
    heading.current?.focus();
  }, [path, step]);

  function restart() {
    setPath(null);
    setAnswers([]);
    setStatus("");
  }

  async function download() {
    if (!result || !path) return;
    const blob = await drawEraCard(result, path);
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = eraFileName(result);
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setStatus("Nálepka je stažená.");
  }

  async function share() {
    if (!result || !path) return;
    const url = location.origin + "/tvoje-era";
    const text = `Moje ERA: ${result.name}. ${eraCopy(result, path).line} Jaká je ta tvoje?`;
    try {
      const blob = await drawEraCard(result, path);
      const file = blob && new File([blob], eraFileName(result), { type: "image/png" });
      if (file && navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file], text, url });
        return;
      }
      if (navigator.share) {
        await navigator.share({ title: "Jaké je tvoje ERA?", text, url });
        return;
      }
      await navigator.clipboard.writeText(`${text} ${url}`);
      setStatus("Text a\u00a0odkaz jsou zkopírované.");
    } catch (error) {
      if ((error as DOMException)?.name !== "AbortError")
        setStatus("Sdílení se nepovedlo. Stáhni si nálepku.");
    }
  }

  if (!path) {
    return (
      <section className={s.quiz} aria-labelledby="era-start">
        <h2 id="era-start" ref={heading} tabIndex={-1} className={s.question}>
          Jak se k&nbsp;tobě Erasmus dostal?
        </h2>
        <p className={s.hint}>Pět otázek, zhruba minuta. Nic neukládáme a&nbsp;nic neodesíláme.</p>
        <div className={s.paths}>
          <button type="button" className={s.path} onClick={() => setPath("vyjel")}>
            <strong>Mám vlastní Erasmus</strong>
            <span>Studium, stáž, výuka, výměna nebo dobrovolnictví v&nbsp;zahraničí.</span>
          </button>
          <button type="button" className={s.path} onClick={() => setPath("nevyjel")}>
            <strong>Na Erasmu: 0 dní</strong>
            <span>Zkušenost se ke mně dostala přes někoho, kdo vyjel: učitele, kolegu, kamaráda.</span>
          </button>
        </div>
      </section>
    );
  }

  if (result) {
    return (
      <section className={s.quiz} aria-labelledby="era-result" data-result>
        <div className={s.result}>
          <div className={s.card} data-path={path}>
            <p className={s.cardTop}>
              <span>Moje ERA</span>
              {path === "nevyjel" && <span>Na Erasmu: 0 dní. Přesto.</span>}
            </p>
            <EraGlyph type={result} className={s.cardGlyph} />
            <h2 id="era-result" ref={heading} tabIndex={-1} className={s.cardName}>
              {result.name}
            </h2>
            <p className={s.cardLine}>{copy?.line}</p>
            <p className={s.cardSign}>
              <span>Erasmus+ již 40 let mění životy</span>
              <span>1987–2027</span>
            </p>
          </div>
          <div className={s.resultText}>
            <p className={s.body}>{copy?.body}</p>
            <div className={s.actions}>
              <button type="button" className={s.primary} onClick={download}>
                Stáhnout nálepku <span aria-hidden="true">↓</span>
              </button>
              <button type="button" className={s.secondary} onClick={share}>
                Sdílet
              </button>
              <button type="button" className={s.text} onClick={restart}>
                Zkusit znovu
              </button>
            </div>
            <p className={s.status} role="status">
              {status}
            </p>
            <div className={s.next}>
              <p>Jak to bylo dál? Za tvou zkušeností je konkrétní příběh.</p>
              <Link href="/zapojte-se#pribeh">
                Zapsat svůj příběh <span aria-hidden="true">↗</span>
              </Link>
            </div>
            <p className={s.disclaimer}>
              Kvíz je pro zábavu. Výsledek není výzkum ani měření dopadu.
            </p>
          </div>
        </div>
      </section>
    );
  }

  const question = questions[step];
  return (
    <section className={s.quiz} aria-labelledby="era-question">
      <Progress step={step} total={questions.length} />
      <p className={s.count}>
        Otázka {step + 1} z {questions.length}
      </p>
      <h2 id="era-question" ref={heading} tabIndex={-1} className={s.question}>
        {question.text}
      </h2>
      <ul className={s.answers}>
        {question.answers.map((answer) => (
          <li key={answer.label}>
            <button
              type="button"
              className={s.answer}
              onClick={() => setAnswers((current) => [...current, answer])}
            >
              {answer.label}
            </button>
          </li>
        ))}
      </ul>
      <button
        type="button"
        className={s.back}
        onClick={() =>
          step === 0 ? setPath(null) : setAnswers((current) => current.slice(0, -1))
        }
      >
        <span aria-hidden="true">←</span> Zpět
      </button>
    </section>
  );
}
