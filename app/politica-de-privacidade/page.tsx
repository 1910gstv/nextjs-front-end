import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidade | Alcina Dados & IA",
  description: "Política de Privacidade da Alcina Dados & IA.",
};

export default function PoliticaDePrivacidade() {
  return (
    <main className="min-h-screen bg-slate-900 text-white/80 px-6 py-24">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-light tracking-wide text-white mb-2">
          Política de Privacidade
        </h1>
        <p className="text-sm text-white/50 mb-12">
          Última atualização: {new Date().toLocaleDateString("pt-BR")}
        </p>

        <section className="space-y-10 text-sm leading-relaxed">
          <div>
            <h2 className="text-lg text-white font-medium mb-3">1. Introdução</h2>
            <p>
              A Alcina Dados & IA ("nós") respeita a sua privacidade e está
              comprometida em proteger os dados pessoais coletados através
              deste site. Esta política explica quais informações coletamos,
              como as usamos e quais são os seus direitos, em conformidade
              com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018).
            </p>
          </div>

          <div>
            <h2 className="text-lg text-white font-medium mb-3">2. Quais dados coletamos</h2>
            <p className="mb-3">
              <strong className="text-white/90">Dados de navegação (analytics):</strong>{" "}
              Utilizamos o Umami Analytics, uma ferramenta que não usa cookies
              e não coleta dados pessoais identificáveis. Coletamos apenas
              informações agregadas e anônimas, como páginas visitadas,
              duração da visita, tipo de dispositivo e origem do acesso
              (ex: Google, redes sociais, acesso direto).
            </p>
            <p>
              <strong className="text-white/90">Dados fornecidos voluntariamente:</strong>{" "}
              Caso você entre em contato conosco através do formulário,
              e-mail ou WhatsApp disponíveis no site, coletamos as
              informações que você optar por nos fornecer, como nome,
              e-mail e mensagem.
            </p>
          </div>

          <div>
            <h2 className="text-lg text-white font-medium mb-3">3. Como usamos os dados</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>Responder às suas solicitações de contato;</li>
              <li>Entender como os visitantes usam o site, para melhorá-lo;</li>
              <li>Cumprir obrigações legais, quando aplicável.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg text-white font-medium mb-3">4. Compartilhamento de dados</h2>
            <p>
              Não vendemos, alugamos ou compartilhamos seus dados pessoais
              com terceiros para fins comerciais. Os dados de navegação
              agregados pelo Umami são armazenados em [servidor
              próprio/plano cloud do Umami — especifique onde você hospeda].
              O site é hospedado na Vercel, que pode processar dados
              técnicos de acesso (como endereço IP) como parte da
              infraestrutura do serviço.
            </p>
          </div>

          <div>
            <h2 className="text-lg text-white font-medium mb-3">5. Seus direitos (LGPD)</h2>
            <p className="mb-3">Você tem direito a:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Confirmar a existência de tratamento de dados;</li>
              <li>Acessar os dados que temos sobre você;</li>
              <li>Corrigir dados incompletos ou desatualizados;</li>
              <li>Solicitar a exclusão dos seus dados;</li>
              <li>Revogar consentimento a qualquer momento.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg text-white font-medium mb-3">6. Contato</h2>
            <p>
              Para dúvidas sobre esta política ou para exercer seus direitos,
              entre em contato pelo e-mail{" "}
              <a href="mailto:contato@alcina.com.br" className="underline hover:text-white">
                [contato@alcina.com.br]
              </a>.
            </p>
          </div>

          <div>
            <h2 className="text-lg text-white font-medium mb-3">7. Alterações nesta política</h2>
            <p>
              Podemos atualizar esta política periodicamente. Recomendamos
              revisá-la ocasionalmente para se manter informado sobre como
              protegemos seus dados.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}