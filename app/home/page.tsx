"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { sendForm } from "../lib/home/actions";
import Image from "next/image";
import SolutionCard from "@/app/ui/home/solution-card";
import PipelineMonitor from "@/app/ui/home/pipeline-monitor";

/* ─── Animated counter ─────────────────────────────────────── */
function Counter({ end, suffix = "", prefix = "" }: { end: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        let start = 0;
        const duration = 1800;
        const step = end / (duration / 16);
        const timer = setInterval(() => {
          start += step;
          if (start >= end) { setCount(end); clearInterval(timer); }
          else setCount(Math.floor(start));
        }, 16);
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);

  return <span ref={ref}>{prefix}{count.toLocaleString("pt-BR")}{suffix}</span>;
}

/* ─── Floating data particles canvas ───────────────────────── */
function DataCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const nodes: { x: number; y: number; vx: number; vy: number; r: number; alpha: number }[] = Array.from({ length: 55 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 2 + 1,
      alpha: Math.random() * 0.5 + 0.2,
    }));

    let frame: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      nodes.forEach((n) => {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
      });

      nodes.forEach((a, i) => {
        nodes.slice(i + 1).forEach((b) => {
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 130) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(99,102,241,${0.15 * (1 - d / 130)})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        });
        ctx.beginPath();
        ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(99,102,241,${a.alpha})`;
        ctx.fill();
      });

      frame = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(frame); window.removeEventListener("resize", resize); };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}

/* ─── Scroll-reveal wrapper ─────────────────────────────────── */
function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ─── Main Page ─────────────────────────────────────────────── */
export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    const formData = new FormData(e.currentTarget);
    await sendForm(formData);
    setSending(false);
    setSubmitted(true);
  }, []);

  const stats = [
    { value: 2.5, suffix: "tri", prefix: "R$", label: "perdidos por empresas brasileiras ao ano por má gestão de dados", source: "IBM / Gartner" },
    { value: 73,  suffix: "%",  prefix: "",    label: "das empresas não confiam na qualidade dos próprios dados", source: "Forrester Research" },
    { value: 8,   suffix: "x",  prefix: "",    label: "mais retorno financeiro em empresas orientadas por dados vs concorrentes", source: "McKinsey Global" },
    { value: 68,  suffix: "%",  prefix: "",    label: "dos projetos de IA falham por falta de dados bem estruturados", source: "MIT Sloan" },
  ];



  return (
    <main className="min-h-screen font-sans">

      {/* ── Header ── */}
      <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-slate-900/70 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <Image src="/logo/alcina-logo.png" alt="Alcina" width={36} height={36} />
            <span className="text-xl font-light tracking-[0.25em] text-white">ALCINA</span>
          </div>

          <nav className="hidden lg:flex items-center gap-12">
            {["Serviços", "Soluções", "Contato"].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`}
                className="text-white/70 text-sm uppercase tracking-wider hover:text-white transition-colors duration-200">
                {item}
              </a>
            ))}
          </nav>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden text-white/70 hover:text-white"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <a href="#contato" className="hidden lg:block border border-indigo-400/40 px-5 py-2 rounded-full text-indigo-300 text-sm hover:bg-indigo-500/10 hover:border-indigo-400 transition-all duration-200">
            Fale Conosco
          </a>
        </div>

        {menuOpen && (
          <div className="lg:hidden bg-slate-900/95 border-t border-white/5 px-6 py-4 flex flex-col gap-4">
            {["Serviços", "Soluções", "Contato"].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)}
                className="text-white/70 text-sm uppercase tracking-wider hover:text-white transition-colors">
                {item}
              </a>
            ))}
          </div>
        )}
      </header>

      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center bg-gradient-to-br from-slate-950 via-[#0B1730] to-[#081326] overflow-hidden pt-20">
        <DataCanvas />

        {/* gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-950/60 pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-6 py-32 text-center">
          <div
            className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full px-4 py-1.5 mb-8"
            style={{ animation: "fadeDown 0.8s ease both" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
            <span className="text-indigo-300 text-xs tracking-widest uppercase">Consultoria de Dados & IA</span>
          </div>

          <h1
            className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6"
            style={{ animation: "fadeUp 0.9s ease 0.1s both" }}
          >
            Sua empresa tem dados.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
              Mas tem resultados?
            </span>
          </h1>

          <p
            className="text-xl md:text-2xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed"
            style={{ animation: "fadeUp 0.9s ease 0.2s both" }}
          >
            Transformamos dados dispersos em decisões precisas —
            com estratégia, tecnologia e visão de negócio.
          </p>

          <div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            style={{ animation: "fadeUp 0.9s ease 0.3s both" }}
          >
            <a href="#contato"
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-indigo-500/25 hover:-translate-y-0.5">
              Solicitar diagnóstico gratuito
            </a>
            <a href="#servicos"
              className="border border-white/15 text-white/80 hover:text-white hover:border-white/30 px-8 py-4 rounded-xl font-medium transition-all duration-200">
              Conheça nossos serviços
            </a>
          </div>

          {/* scroll hint */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
            <span className="text-xs text-white uppercase tracking-widest">Role para baixo</span>
            <div className="w-px h-10 bg-white/30 animate-pulse" />
          </div>
        </div>
      </section>

      {/* ── Estatísticas Reais ── */}
      <section className="py-24 px-6 bg-slate-950 border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <Reveal className="text-center mb-16">
            <span className="uppercase tracking-[0.3em] text-sm text-indigo-400">O problema é real</span>
            <h2 className="mt-4 text-4xl md:text-5xl font-bold text-white">
              O custo de ignorar seus dados
            </h2>
            <p className="mt-4 text-slate-400 max-w-xl mx-auto">
              Dados de institutos globais mostram o impacto financeiro direto da má gestão de dados nas empresas.
            </p>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <Reveal key={i} delay={i * 100}
                className="bg-white/3 border border-white/8 rounded-2xl p-8 hover:border-indigo-500/30 hover:bg-indigo-500/5 transition-all duration-300 group">
                <div className="text-4xl md:text-5xl font-bold text-white mb-3">
                  <Counter end={s.value} suffix={s.suffix} prefix={s.prefix} />
                </div>
                <p className="text-slate-300 text-sm leading-relaxed mb-4">{s.label}</p>
                <span className="text-xs text-indigo-400/70 font-medium tracking-wide">Fonte: {s.source}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Quem Somos ── */}
      <section id="quem-somos" className="py-24 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            <Reveal className="lg:col-span-5">
              <span className="uppercase tracking-[0.3em] text-sm text-gray-500">Quem Somos</span>
              <h2 className="mt-6 text-5xl font-bold text-gray-900 leading-tight">
                Transformamos<br />dados em<br />decisões.
              </h2>
              <div className="mt-10 w-20 h-[2px] bg-indigo-300" />
            </Reveal>

            <Reveal delay={150} className="lg:col-span-7 space-y-6">
              <p className="text-xl leading-relaxed text-gray-700">
                A Alcina Dados & IA nasceu da combinação entre experiência técnica de alto nível e visão prática de negócios.
              </p>
              <p className="text-lg leading-relaxed text-gray-600">
                Somos uma consultoria boutique especializada em dados e inteligência artificial, formada por profissionais com atuação em projetos de alta complexidade nos setores financeiro, industrial e varejista.
              </p>
              <p className="text-lg leading-relaxed text-gray-600">
                Não acreditamos em soluções genéricas. Cada organização possui sua própria realidade, seus desafios e seus objetivos. Por isso, construímos estratégias sob medida que conectam tecnologia às necessidades reais do negócio.
              </p>
              <div className="pt-4 border-t border-gray-200">
                <div className="flex flex-wrap gap-3">
                  {["SAP", "Cloud AWS / Azure", "Python", "dbt", "Power BI", "LLMs"].map((tag) => (
                    <span key={tag} className="bg-indigo-50 text-indigo-700 text-xs font-medium px-3 py-1.5 rounded-full border border-indigo-100">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          <div className="mt-24 border-t border-gray-200 pt-12">
            <div className="grid md:grid-cols-3 gap-12">
              {[
                { label: "Atuação", value: "Financeiro, Industrial e Varejo" },
                { label: "Especialidades", value: "Dados, Analytics e Inteligência Artificial" },
                { label: "Propósito", value: "Transformar dados dispersos em ativos estratégicos" },
              ].map((item, i) => (
                <Reveal key={i} delay={i * 80}>
                  <div className="text-sm uppercase tracking-widest text-gray-500">{item.label}</div>
                  <p className="mt-3 text-lg font-medium text-gray-900">{item.value}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Serviços / Soluções ── */}
      <section
        id="serviços"
        className="relative overflow-hidden py-24 px-6 bg-gradient-to-b from-[#081326] via-[#0B1730] to-[#050B16]"
      >
        <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto">
          <Reveal className="text-center mb-16">
            <span className="uppercase tracking-[0.3em] text-sm text-indigo-300">Soluções</span>
            <h2 className="mt-4 text-4xl md:text-5xl font-bold text-white">Nossos Serviços</h2>
            <p className="mt-6 max-w-2xl mx-auto text-slate-400 text-lg">
              Estruturamos dados, processos e inteligência artificial para transformar informação em vantagem competitiva.
            </p>
          </Reveal>
          <SolutionCard />
        </div>
      </section>

      {/* ── Pipeline Monitor ── */}
      <section className="py-24 px-6 bg-gradient-to-b from-[#050B16] to-[#081326]">
        <div className="max-w-5xl mx-auto">
          <Reveal className="text-center mb-16">
            <span className="uppercase tracking-[0.3em] text-sm text-teal-400">Infraestrutura</span>
            <h2 className="mt-4 text-4xl font-bold text-white">Pipeline de Dados ao Vivo</h2>
            <p className="mt-4 text-slate-400 max-w-xl mx-auto">
              Monitoramos cada camada do seu pipeline — da ingestão bruta até os dashboards de decisão.
            </p>
          </Reveal>
          <Reveal delay={100}>
            <PipelineMonitor />
          </Reveal>
        </div>
      </section>



      {/* ── Como funciona ── */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <Reveal className="text-center mb-16">
            <span className="uppercase tracking-[0.3em] text-sm text-gray-500">Processo</span>
            <h2 className="mt-4 text-4xl font-bold text-gray-900">Como trabalhamos</h2>
          </Reveal>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Diagnóstico", desc: "Mapeamos o estado atual dos seus dados, sistemas e processos." },
              { step: "02", title: "Estratégia", desc: "Desenhamos o roadmap técnico alinhado ao seu negócio." },
              { step: "03", title: "Execução", desc: "Implementamos as soluções com sua equipe, de forma ágil." },
              { step: "04", title: "Evolução", desc: "Monitoramos, ajustamos e evoluímos continuamente." },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 100} className="relative">
                {i < 3 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-px bg-gray-200 -translate-y-px z-0" style={{ width: "calc(100% - 2rem)" }} />
                )}
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-full bg-indigo-50 border-2 border-indigo-200 flex items-center justify-center mb-6">
                    <span className="text-indigo-600 font-bold text-lg">{item.step}</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Formulário ── */}
      <section id="contato" className="py-24 px-6 bg-gradient-to-b from-[#081326] to-slate-950">
        <div className="max-w-xl mx-auto">
          <Reveal className="text-center mb-10">
            <span className="uppercase tracking-[0.3em] text-sm text-indigo-400">Contato</span>
            <h2 className="mt-4 text-4xl font-bold text-white">Diagnóstico Gratuito</h2>
            <p className="mt-4 text-slate-400 text-lg">
              Preencha abaixo e um especialista entrará em contato para entender seu contexto.
            </p>
          </Reveal>

          <Reveal delay={100}>
            <form
              onSubmit={handleSubmit}
              className="bg-white/5 backdrop-blur border border-white/10 p-8 md:p-10 rounded-3xl"
            >
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Nome</label>
                  <input
                    type="text" name="name" required
                    placeholder="Como podemos te chamar?"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">E-mail</label>
                  <input
                    type="email" name="email" required
                    placeholder="seu@email.com"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Empresa</label>
                  <input
                    type="text" name="company"
                    placeholder="Nome da sua empresa"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Principal desafio</label>
                  <select
                    name="challenge"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all appearance-none"
                  >
                    <option value="" className="bg-slate-800">Selecione uma opção</option>
                    <option value="gov" className="bg-slate-800">Governança e qualidade de dados</option>
                    <option value="eng" className="bg-slate-800">Pipelines e engenharia de dados</option>
                    <option value="ia"  className="bg-slate-800">Implementação de IA / Machine Learning</option>
                    <option value="bi"  className="bg-slate-800">Dashboards e Analytics</option>
                    <option value="out" className="bg-slate-800">Outro</option>
                  </select>
                </div>
                <button
                  type="submit"
                  disabled={sending}
                  className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-indigo-500/25 active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  {sending ? (
                    <>
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                      </svg>
                      Enviando...
                    </>
                  ) : "Solicitar Diagnóstico Gratuito"}
                </button>
                <p className="text-center text-xs text-slate-500">
                  Garantimos total privacidade dos seus dados. Sem spam.
                </p>
              </div>
            </form>
          </Reveal>
        </div>
      </section>

      {/* ── Modal de Obrigado ── */}
      {submitted && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center px-4"
          style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(6px)", animation: "fadeDown 0.3s ease both" }}
          onClick={() => setSubmitted(false)}
        >
          <div
            className="relative bg-[#0d1b2e] border border-white/10 rounded-3xl p-10 max-w-md w-full text-center shadow-2xl"
            style={{ animation: "fadeUp 0.35s ease both" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* ícone */}
            <div className="mx-auto mb-6 w-20 h-20 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
              <svg className="w-9 h-9 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h3 className="text-2xl font-bold text-white mb-3">Recebemos seu contato!</h3>
            <p className="text-slate-400 leading-relaxed mb-8">
              Em breve um especialista da Alcina entrará em contato para entender melhor o seu contexto e apresentar o diagnóstico.
            </p>

            <button
              onClick={() => setSubmitted(false)}
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-indigo-500/25"
            >
              Fechar
            </button>

            {/* fechar no canto */}
            <button
              onClick={() => setSubmitted(false)}
              className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors"
              aria-label="Fechar"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* ── Footer ── */}
      <footer className="bg-slate-950 border-t border-white/5 text-slate-400 py-14 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <Image src="/logo/alcina-logo.png" alt="Alcina" width={32} height={32} />
              <span className="text-white font-light tracking-[0.2em]">ALCINA</span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs">
              Consultoria boutique especializada em Dados & IA para empresas que querem tomar decisões melhores.
            </p>
          </div>
          <div>
            <h4 className="text-white text-sm font-semibold mb-4 uppercase tracking-widest">Contato</h4>
            <p className="text-sm">contato@alcinaia.com.br</p>
            <p className="text-sm mt-1">(11) 99999-9999</p>
          </div>
          <div>
            <h4 className="text-white text-sm font-semibold mb-4 uppercase tracking-widest">Redes</h4>
            {["LinkedIn", "Instagram"].map((r) => (
              <p key={r} className="text-sm mt-1 hover:text-white transition-colors cursor-pointer">{r}</p>
            ))}
          </div>
        </div>
        <div className="border-t border-white/5 pt-8 text-center text-xs text-slate-600">
          © 2026 Alcina Dados & IA. Todos os direitos reservados.
        </div>
      </footer>

      <style>{`
        @keyframes fadeUp   { from { opacity:0; transform:translateY(24px) } to { opacity:1; transform:translateY(0) } }
        @keyframes fadeDown { from { opacity:0; transform:translateY(-12px) } to { opacity:1; transform:translateY(0) } }
      `}</style>
    </main>
  );
}
