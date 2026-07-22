import Head from "next/head";
import { fetchLeads, readContentPipeline, readAdsConfig } from "../../lib/panelData";

export async function getServerSideProps() {
  const [leads, content] = await Promise.all([fetchLeads({ limit: 30 }), Promise.resolve(readContentPipeline())]);
  const ads = readAdsConfig();
  return { props: { leads, content, ads } };
}

const STATUS_STYLE = {
  draft: "bg-surface-raised text-ink-soft",
  generated: "bg-brand-50 text-brand-700",
  validated: "bg-[#E3F6F9] text-[#00779B]",
  approved: "bg-[#E3F7EF] text-[#1F7A54]",
  published: "bg-brand-900 text-white",
};

const PRIORITY_STYLE = {
  High: "bg-[#FDECEC] text-[#C9372C]",
  Medium: "bg-[#FFF4E5] text-[#974F0C]",
  Low: "bg-surface-raised text-ink-soft",
};

function fmtDate(iso) {
  if (!iso) return "—";
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? "—" : d.toLocaleDateString("pt-BR", { day: "2-digit", month: "short" });
}

function Tile({ label, value, sub }) {
  return (
    <div className="rounded-2xl border border-line bg-surface p-5">
      <div className="text-sm text-ink-soft">{label}</div>
      <div className="mt-1 text-3xl font-display font-extrabold text-ink">{value}</div>
      {sub ? <div className="mt-1 text-xs text-ink-faint">{sub}</div> : null}
    </div>
  );
}

function Card({ title, right, children }) {
  return (
    <section className="rounded-2xl border border-line bg-surface">
      <header className="flex items-center justify-between border-b border-line px-5 py-3">
        <h2 className="font-display font-bold text-ink">{title}</h2>
        {right}
      </header>
      <div className="p-5">{children}</div>
    </section>
  );
}

export default function Painel({ leads, content, ads }) {
  const byStatus = content.items.reduce((m, i) => ((m[i.status] = (m[i.status] || 0) + 1), m), {});
  const published = byStatus.published || 0;

  return (
    <>
      <Head>
        <title>Web Makers · Painel</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <main className="min-h-screen bg-surface-sunken">
        <div className="mx-auto max-w-6xl px-5 py-8">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <h1 className="font-display text-2xl font-extrabold text-brand-900">Web Makers · Painel</h1>
              <p className="text-sm text-ink-soft">Leads, conteúdo e canais — operação de crescimento.</p>
            </div>
            <a href={ads?.landing || "https://webmakers.dev.br"} className="text-sm font-semibold text-brand-600 hover:text-brand-700">
              webmakers.dev.br →
            </a>
          </div>

          {/* KPIs */}
          <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
            <Tile label="Leads (Jira VEN)" value={leads.ok ? leads.total : "—"} sub={leads.ok ? "total no funil" : "Jira não conectado"} />
            <Tile label="Conteúdo no pipeline" value={content.items.length} sub={`${published} publicado(s)`} />
            <Tile label="Meta / IG" value={ads?.metaReady && ads?.igReady ? "ok" : "setup"} sub={ads?.igUsername ? `@${ads.igUsername}` : "—"} />
            <Tile label="Google Ads" value={ads?.googleAds ? "ok" : "—"} sub={ads?.googleAds || "sem conversão"} />
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Leads */}
            <div className="lg:col-span-2">
              <Card title="Leads recentes" right={<span className="text-xs text-ink-faint">projeto VEN</span>}>
                {!leads.ok ? (
                  <p className="text-sm text-ink-soft">
                    Não foi possível carregar os leads ({leads.reason}). Defina <code>JIRA_BASE_URL</code>, <code>JIRA_EMAIL</code> e{" "}
                    <code>JIRA_TOKEN</code> no ambiente.
                  </p>
                ) : leads.leads.length === 0 ? (
                  <p className="text-sm text-ink-soft">Nenhum lead ainda.</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-left text-ink-faint">
                          <th className="pb-2 font-medium">Contato</th>
                          <th className="pb-2 font-medium">Serviço</th>
                          <th className="pb-2 font-medium">Interesse</th>
                          <th className="pb-2 font-medium">Prioridade</th>
                          <th className="pb-2 font-medium">Status</th>
                          <th className="pb-2 font-medium">Data</th>
                        </tr>
                      </thead>
                      <tbody>
                        {leads.leads.map((l) => (
                          <tr key={l.key} className="border-t border-line align-top">
                            <td className="py-2 pr-3">
                              <div className="font-medium text-ink">{l.contact.nome || l.summary}</div>
                              <div className="text-xs text-ink-faint">{[l.contact.telefone, l.contact.email].filter(Boolean).join(" · ")}</div>
                              {l.contact.segmento ? <div className="text-xs text-ink-faint">{l.contact.segmento}</div> : null}
                            </td>
                            <td className="py-2 pr-3 text-ink-subtle">
                              <div>{l.contact.servico || "—"}</div>
                              {l.contact.orcamento ? <div className="text-xs text-ink-faint">{l.contact.orcamento}</div> : null}
                            </td>
                            <td className="py-2 pr-3 text-ink-subtle">{l.contact.interesse || "—"}</td>
                            <td className="py-2 pr-3">
                              {l.priority ? (
                                <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${PRIORITY_STYLE[l.priority] || "bg-surface-raised text-ink-soft"}`}>
                                  {l.priority}
                                </span>
                              ) : (
                                <span className="text-xs text-ink-faint">{l.contact.urgencia || "—"}</span>
                              )}
                            </td>
                            <td className="py-2 pr-3">
                              <span className="rounded-full bg-surface-raised px-2 py-0.5 text-xs text-ink-soft">{l.status}</span>
                            </td>
                            <td className="py-2 text-ink-faint">{fmtDate(l.created)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </Card>
            </div>

            {/* Canais / Ads */}
            <Card title="Canais">
              <ul className="space-y-3 text-sm">
                <li className="flex items-center justify-between">
                  <span className="text-ink-subtle">Instagram orgânico</span>
                  <span className={ads?.igReady ? "font-semibold text-[#1F7A54]" : "text-ink-faint"}>{ads?.igReady ? "conectado" : "configurar"}</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-ink-subtle">Meta Ads</span>
                  <span className={ads?.metaReady ? "font-semibold text-[#1F7A54]" : "text-ink-faint"}>{ads?.metaReady ? "conectado" : "configurar"}</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-ink-subtle">Google Ads</span>
                  <span className={ads?.googleAds ? "font-semibold text-[#1F7A54]" : "text-ink-faint"}>{ads?.googleAds ? "ativo" : "—"}</span>
                </li>
              </ul>
              <p className="mt-4 border-t border-line pt-3 text-xs text-ink-faint">
                Criativos gerados pelo Growth Kit (<code>scripts/growth</code>). Publicação com gate humano.
              </p>
            </Card>
          </div>

          {/* Pipeline de conteúdo */}
          <div className="mt-6">
            <Card title="Pipeline de conteúdo" right={<span className="text-xs text-ink-faint">Growth Kit · briefs</span>}>
              {!content.ok ? (
                <p className="text-sm text-ink-soft">Não foi possível ler os briefs ({content.reason}).</p>
              ) : content.items.length === 0 ? (
                <p className="text-sm text-ink-soft">Nenhum brief. Crie com <code>node scripts/growth/factory.mjs brief &lt;id&gt;</code>.</p>
              ) : (
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  {content.items.map((i) => (
                    <div key={i.id} className="rounded-xl border border-line p-4">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs text-ink-soft">{i.id}</span>
                        <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_STYLE[i.status] || "bg-surface-raised text-ink-soft"}`}>
                          {i.status}
                        </span>
                      </div>
                      <p className="mt-2 line-clamp-2 text-sm text-ink-subtle">{i.concept}</p>
                      <div className="mt-2 flex items-center gap-2 text-xs text-ink-faint">
                        <span>{i.format}</span>
                        {(i.destination.organic || []).map((d) => (
                          <span key={d} className="rounded bg-brand-50 px-1.5 py-0.5 text-brand-700">{d}</span>
                        ))}
                        {(i.destination.ads || []).map((d) => (
                          <span key={d} className="rounded bg-[#EEECFB] px-1.5 py-0.5 text-[#5243AA]">ads:{d}</span>
                        ))}
                        {i.publishedIg ? (
                          <a href={i.publishedIg} className="ml-auto text-brand-600 hover:text-brand-700">ver post →</a>
                        ) : null}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </div>
        </div>
      </main>
    </>
  );
}
