
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

// ── DADOS ────────────────────────────────────────────────────────────────────
const services = [
  {
    icon: "⬡",
    title: "Governança de Dados",
    desc: "Estruturação de políticas, papéis e processos para garantir qualidade, rastreabilidade e controle sobre os dados corporativos.",
    tags: ["Data Catalog", "Data Stewardship", "Lineage"],
  },
  {
    icon: "⬡",
    title: "Arquitetura de Dados",
    desc: "Design de Data Mesh, Data Lakehouse e pipelines de ingestão alinhados às necessidades do negócio e capacidade da equipe.",
    tags: ["Data Mesh", "Lakehouse", "Pipeline"],
  },
  {
    icon: "⬡",
    title: "Conformidade & LGPD",
    desc: "Mapeamento de dados pessoais, gestão de consentimento e implementação de controles para atender LGPD, GDPR e ISO 27001.",
    tags: ["LGPD", "GDPR", "ISO 27001"],
  },
  {
    icon: "⬡",
    title: "Gestão de TI & ITSM",
    desc: "Implementação de processos ITIL, indicadores de serviço e frameworks de gestão para elevar a maturidade operacional de TI.",
    tags: ["ITIL 4", "ITSM", "OKR"],
  },
  {
    icon: "⬡",
    title: "Analytics & BI",
    desc: "Construção de camadas semânticas, modelos dimensionais e dashboards executivos que transformam dados em decisões.",
    tags: ["dbt", "Power BI", "Looker"],
  },
  {
    icon: "⬡",
    title: "Data Quality & Observabilidade",
    desc: "Implementação de contratos de dados, monitoramento de qualidade e alertas proativos para pipelines críticos de negócio.",
    tags: ["Monte Carlo", "Great Expectations", "SLA"],
  },
];

const steps = [
  { num: "01", title: "Diagnóstico de Maturidade", desc: "Avaliação do DAMA-DMBOK e CMMI para mapear gaps reais de capacidade em dados, TI e compliance." },
  { num: "02", title: "Roadmap Priorizado", desc: "Desenho do plano de evolução com marcos trimestrais, quick-wins tangíveis e investimento justificado." },
  { num: "03", title: "Implementação Guiada", desc: "Execução lado a lado com as equipes do cliente — transferência de conhecimento é requisito, não opcional." },
  { num: "04", title: "Operação Sustentável", desc: "Estabelecimento de fóruns de governança, KPIs e rituais que mantêm a evolução sem dependência da consultoria." },
];

const testimonials = [
  {
    quote: "Em 6 meses saímos de uma planilha descontrolada para um catálogo com lineage completo. A equipe de dados ganhou credibilidade interna que nunca tivemos.",
    author: "Renata Pinheiro",
    role: "Head of Data · Valore Saúde",
    initials: "RP"
  },
  {
    quote: "A auditoria LGPD que parecia impossível de passar virou um case de sucesso. O mapeamento que a DataGovern entregou foi decisivo.",
    author: "Felipe Monteiro",
    role: "DPO · Meridian Bank",
    initials: "FM"
  },
  {
    quote: "Reduzimos de 14 dias para 4 horas o tempo de entrega de relatórios gerenciais. Isso mudou como o C-level toma decisão.",
    author: "Carolina Luz",
    role: "CTO · Grupo Atlântico",
    initials: "CL"
  }
];

// ── COMPONENTE CANVAS ─────────────────────────────────────────────────────────
function DataGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let W, H, nodes: any[] = [];

    function resize() {
      W = canvas!.width = canvas!.offsetWidth;
      H = canvas!.height = canvas!.offsetHeight;
      nodes = [];
      const count = Math.floor((W * H) / 22000);
      for (let i = 0; i < count; i++) {
        nodes.push({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25, r: 1.5 + Math.random() * 1.5, pulse: Math.random() * Math.PI * 2 });
      }
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      nodes.forEach(n => {
        n.x += n.vx; n.y += n.vy; n.pulse += 0.02;
        if (n.x < 0 || n.x > W) n.vx *= -1;
        if (n.y < 0 || n.y > H) n.vy *= -1;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,201,167,${(0.6 + 0.4 * Math.sin(n.pulse)) * 0.8})`;
        ctx.fill();
      });
      requestAnimationFrame(draw);
    }

    window.addEventListener('resize', resize);
    resize();
    draw();
    return () => window.removeEventListener('resize', resize);
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 opacity-18 pointer-events-none" />;
}

// ── PÁGINA PRINCIPAL ──────────────────────────────────────────────────────────
export default function Page() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Conectado ao banco: enviando", email);
  };

  return (
    <main className="min-h-screen bg-[#0A0F1E] text-[#F0F4FF] font-sans">
      {/* ── NAV ── */}
      <nav className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-[5%] py-5 bg-[rgba(10,15,30,0.85)] backdrop-blur-md border-b border-[rgba(13,127,255,0.12)]">
        <div className="font-['Space_Grotesk'] font-bold text-xl tracking-tighter">Data<span className="text-[#00C9A7]">Govern</span></div>
        <ul className="hidden lg:flex gap-10">
          {["Serviços", "Metodologia", "Casos"].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-[#8B9CC8] text-sm font-medium hover:text-white transition">{item}</a>
          ))}
        </ul>
        <a href="#contato" className="bg-[#0D7FFF] text-white px-5 py-2 rounded text-sm font-medium hover:bg-[#0060cc] transition">Fale com especialista</a>
      </nav>

      {/* ── HERO ── */}
      <section id="hero" className="relative min-h-screen flex items-center px-[5%] pt-28">
        <DataGrid />
        <div className="relative z-10 max-w-[640px]">
          <span className="text-[#00C9A7] text-xs font-medium uppercase tracking-[0.12em] mb-4 flex items-center gap-2"><span className="w-7 h-[1px] bg-[#00C9A7]"></span> Consultoria em Dados & Governança de TI</span>
          <h1 className="font-['Space_Grotesk'] text-6xl font-bold leading-[1.1] mb-6">Seus dados são<br/><em className="not-italic bg-[linear-gradient(90deg,#0D7FFF,#00C9A7)] bg-clip-text text-transparent">ativo estratégico.</em><br/>Trate como tal.</h1>
          <p className="text-lg text-[#8B9CC8] mb-8">Estruturamos a governança de dados e TI da sua organização do diagnóstico à operação contínua — com metodologia, não improviso.</p>
          <div className="flex gap-4">
            <a href="#contato" className="bg-[#0D7FFF] px-8 py-3 rounded-lg font-['Space_Grotesk'] font-semibold text-sm shadow-[0_0_32px_rgba(13,127,255,0.35)]">Solicitar diagnóstico</a>
            <a href="#servicos" className="border border-[rgba(240,244,255,0.2)] px-8 py-3 rounded-lg font-['Space_Grotesk'] font-semibold text-sm">Conheça os serviços</a>
          </div>
        </div>
      </section>

      {/* ── SERVIÇOS ── */}
      <section id="servicos" className="py-24 px-[5%] bg-[#111827]">
        <h2 className="font-['Space_Grotesk'] text-4xl font-bold mb-12">Da estratégia à execução em dados</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[rgba(139,156,200,0.1)] border border-[rgba(139,156,200,0.1)] rounded-xl overflow-hidden">
          {services.map((svc) => (
            <div key={svc.title} className="bg-[#141C2E] p-10 hover:bg-[#192036] transition">
              <div className="text-2xl text-[#0D7FFF] mb-4">{svc.icon}</div>
              <h3 className="font-['Space_Grotesk'] font-semibold mb-2">{svc.title}</h3>
              <p className="text-sm text-[#8B9CC8] leading-7 mb-4">{svc.desc}</p>
              <div className="flex flex-wrap gap-2">{svc.tags.map(t => <span key={t} className="text-[10px] bg-[rgba(13,127,255,0.12)] text-[#0D7FFF] px-2 py-1 rounded">{t}</span>)}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CONTATO ── */}
      <section id="contato" className="py-24 px-[5%] text-center bg-[#111827]">
        <h2 className="text-3xl font-bold mb-4">Diagnóstico gratuito em 48 horas</h2>
        <p className="text-[#8B9CC8] mb-8 max-w-lg mx-auto">Deixe seu e-mail corporativo e um especialista entra em contato para entender seu contexto.</p>
        <form onSubmit={handleSubmit} className="flex gap-3 max-w-md mx-auto">
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="seu@empresa.com.br" className="flex-1 bg-[rgba(240,244,255,0.06)] border border-[rgba(139,156,200,0.2)] rounded-lg px-4 py-3 outline-none" required />
          <button type="submit" className="bg-[#0D7FFF] px-6 py-3 rounded-lg font-semibold text-sm">Quero meu diagnóstico</button>
        </form>
      </section>
    </main>
  );
}

