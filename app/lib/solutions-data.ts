import {
  Database,
  Workflow,
  Plug,
  BarChart3,
  ShieldCheck,
  BrainCircuit,
  Settings,
  LineChart
} from 'lucide-react';

export const solutions = [
  {
    title: 'Governança de Dados',
    description:
      'Estruture políticas, processos e responsabilidades para garantir a qualidade, conformidade e confiabilidade dos dados da sua organização.',
    icon: Database
  },
  {
    title: 'Engenharia de Dados',
    description:
      'Desenvolva pipelines, arquiteturas e soluções escaláveis para coleta, processamento e armazenamento eficiente de dados.',
    icon: Workflow
  },
  {
    title: 'Integração de Dados',
    description:
      'Conecte diferentes sistemas e fontes de informação para criar uma visão unificada e consistente dos seus dados.',
    icon: Plug
  },
  {
    title: 'Análise de Dados',
    description:
      'Transforme dados em insights estratégicos por meio de dashboards, relatórios e análises que apoiam a tomada de decisão.',
    icon: BarChart3
  },
  {
    title: 'Segurança dos Dados',
    description:
      'Proteja informações críticas com práticas de segurança, controle de acesso, criptografia e conformidade regulatória.',
    icon: ShieldCheck
  },
  {
    title: 'Uso de IA',
    description:
      'Aplique inteligência artificial e aprendizado de máquina para automatizar processos, gerar previsões e aumentar a eficiência operacional.',
    icon: BrainCircuit
  },
  {
    title: 'Gestão de Processos',
    description:
      'Mapeie, otimize e automatize processos de negócio para reduzir custos, eliminar gargalos e aumentar a produtividade.',
    icon: Settings
  },
  {
    title: 'Transformação Cultural por Dados',
    description:
      'Promova uma cultura orientada por dados, capacitando equipes a tomar decisões mais assertivas e baseadas em evidências.',
    icon: LineChart
  }
];