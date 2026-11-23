import FormularioBriefing from "@/components/briefing/FormularioBriefing";
import { armazenamentoConfigurado, prefixo } from "@/lib/briefing/armazenamento";
import { ehServico } from "@/lib/briefing/tipos";

/*
 * /briefing                  o cliente escolhe o serviço
 * /briefing?servico=site     já chega com "Site" marcado
 * /briefing?servico=google   já chega com "Google Meu Negócio" marcado
 * /briefing?servico=ambos    já chega com "Os dois" marcado
 */

export default async function BriefingPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { servico } = await searchParams;
  const inicial = typeof servico === "string" && ehServico(servico) ? servico : null;

  return (
    <FormularioBriefing
      servicoInicial={inicial}
      prefixo={prefixo()}
      armazenamentoOk={armazenamentoConfigurado()}
    />
  );
}
