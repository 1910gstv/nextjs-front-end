export default function Page() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="bg-slate-900 text-white py-24 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">
            Transforme sua ideia em resultados reais
          </h1>

          <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-8">
            Uma solução moderna para ajudar sua empresa a crescer,
            automatizar processos e aumentar suas vendas.
          </p>

          <button className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-lg font-semibold">
            Começar Agora
          </button>
        </div>
      </section>

      {/* Sobre */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Sobre Nossa Solução
          </h2>

          <p className="text-gray-600 text-lg">
            Desenvolvemos ferramentas que simplificam processos,
            aumentam a produtividade e ajudam empresas de todos os
            tamanhos a alcançarem melhores resultados.
          </p>
        </div>
      </section>

      {/* Benefícios */}
      <section className="bg-gray-100 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Benefícios
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="font-semibold text-xl mb-3">
                Mais Produtividade
              </h3>
              <p className="text-gray-600">
                Automatize tarefas repetitivas e foque no que realmente importa.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="font-semibold text-xl mb-3">
                Escalabilidade
              </h3>
              <p className="text-gray-600">
                Cresça sem aumentar a complexidade operacional.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="font-semibold text-xl mb-3">
                Segurança
              </h3>
              <p className="text-gray-600">
                Proteção de dados e confiabilidade para seu negócio.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Formulário */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">
            Entre em Contato
          </h2>

          <form className="space-y-6 bg-white p-8 rounded-xl shadow">
            <div>
              <label className="block mb-2 font-medium">
                Nome
              </label>
              <input
                type="text"
                className="w-full border rounded-lg p-3"
                placeholder="Seu nome"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                E-mail
              </label>
              <input
                type="email"
                className="w-full border rounded-lg p-3"
                placeholder="seu@email.com"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Mensagem
              </label>
              <textarea
                rows={5}
                className="w-full border rounded-lg p-3"
                placeholder="Digite sua mensagem..."
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
            >
              Enviar Mensagem
            </button>
          </form>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-600 text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">
            Pronto para começar?
          </h2>

          <p className="mb-8 text-lg">
            Fale com nossa equipe e descubra como podemos ajudar.
          </p>

          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold">
            Solicitar Demonstração
          </button>
        </div>
      </section>

      {/* Rodapé */}
      <footer className="bg-slate-900 text-slate-400 py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-6">
          <div>
            <h3 className="text-white font-bold text-lg mb-2">
              Sua Empresa
            </h3>
            <p>
              Soluções digitais para impulsionar negócios.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-2">
              Contato
            </h4>
            <p>contato@empresa.com</p>
            <p>(11) 99999-9999</p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-2">
              Redes Sociais
            </h4>
            <p>Instagram</p>
            <p>LinkedIn</p>
            <p>Facebook</p>
          </div>
        </div>

        <div className="text-center mt-8 border-t border-slate-700 pt-6">
          © 2026 Sua Empresa. Todos os direitos reservados.
        </div>
      </footer>
    </main>
  );
}