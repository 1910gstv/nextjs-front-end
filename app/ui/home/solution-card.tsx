"use client";

import { useState } from "react";
import {
  Database,
  Workflow,
  Plug,
  BarChart3,
  ShieldCheck,
  BrainCircuit,
  Settings,
  LineChart,
  type LucideIcon,
} from "lucide-react";

const solutions: { title: string; description: string; icon: LucideIcon }[] = [
  {
    title: "Gestão de Processos",
    description:
      "Mapeie, otimize e automatize processos de negócio para reduzir custos, eliminar gargalos e aumentar a produtividade.",
    icon: Settings,
  },
  {
    title: "Governança de Dados",
    description:
      "Estruture políticas, processos e responsabilidades para garantir a qualidade, conformidade e confiabilidade dos dados da sua organização.",
    icon: Database,
  },
  {
    title: "Integração de Dados",
    description:
      "Conecte diferentes sistemas e fontes de informação para criar uma visão unificada e consistente dos seus dados.",
    icon: Plug,
  },
  {
    title: "Engenharia de Dados",
    description:
      "Desenvolva pipelines, arquiteturas e soluções escaláveis para coleta, processamento e armazenamento eficiente de dados.",
    icon: Workflow,
  },
  {
    title: "Segurança dos Dados",
    description:
      "Proteja informações críticas com práticas de segurança, controle de acesso, criptografia e conformidade regulatória.",
    icon: ShieldCheck,
  },
  {
    title: "Análise de Dados",
    description:
      "Transforme dados em insights estratégicos por meio de dashboards, relatórios e análises que apoiam a tomada de decisão.",
    icon: BarChart3,
  },
  {
    title: "Uso de IA",
    description:
      "Aplique inteligência artificial e aprendizado de máquina para automatizar processos, gerar previsões e aumentar a eficiência operacional.",
    icon: BrainCircuit,
  },

  {
    title: "Transformação Cultural por Dados",
    description:
      "Promova uma cultura orientada por dados, capacitando equipes a tomar decisões mais assertivas e baseadas em evidências.",
    icon: LineChart,
  },
];

// ✅ Sem props — dados ficam no client bundle, nunca cruzam a fronteira
export default function SolutionCard() {
  const [active, setActive] = useState(0);
  const activeItem = solutions[active];
  const ActiveIcon = activeItem.icon;

  return (
    <div className="max-w-7xl mx-auto">
      {/* Linha */}
      <div className="relative flex justify-between items-center">
        <div className="absolute top-6 left-0 right-0 h-[2px] bg-white/10" />
        <div
          className="absolute top-6 left-0 h-[2px] bg-indigo-500 transition-all duration-700"
          style={{ width: `${(active / (solutions.length - 1)) * 100}%` }}
        />

        {solutions.map((item, index) => {
          const Icon = item.icon;
          return (
            <button
              key={item.title}
              onMouseEnter={() => setActive(index)}
              onClick={() => setActive(index)}
              className="relative z-10 flex flex-col items-center"
            >
              <div
                className={`h-12 w-12 rounded-full flex items-center justify-center transition-all duration-500 ${
                  active >= index
                    ? "bg-indigo-500 text-white scale-110"
                    : "bg-slate-800 text-slate-400"
                }`}
              >
                <Icon size={20} />
              </div>
              <span
                className={`mt-4 text-sm font-medium transition-colors ${
                  active === index ? "text-white" : "text-slate-400"
                }`}
              >
                {item.title}
              </span>
            </button>
          );
        })}
      </div>

      {/* Conteúdo */}
      <div className="mt-20">
        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur p-10">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-2xl bg-indigo-500 flex items-center justify-center">
              <ActiveIcon size={28} className="text-white" />
            </div>
            <h3 className="text-3xl font-bold text-white">
              {activeItem.title}
            </h3>
          </div>
          <p className="mt-8 text-lg text-slate-300 leading-relaxed max-w-3xl">
            {activeItem.description}
          </p>
        </div>
      </div>
    </div>
  );
}
