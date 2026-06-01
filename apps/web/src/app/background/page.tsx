"use client";

import { Suspense } from "react";
import Link from "next/link";
import type { Route } from "next";
import { useSearchParams } from "next/navigation";
import { AppHeader } from "../page";
import styles from "../page.module.css";

type Language = "pt" | "en";

type MethodCard = {
  title: string;
  body: string;
  links: Array<{ href: string; label: string }>;
};

type InfoCard =
  | { title: string; body: string; items?: never; methods?: never; note?: never }
  | { title: string; items: string[]; body?: never; methods?: never; note?: never }
  | { title: string; body: string; methods: MethodCard[]; note: string; items?: never };

const methodLinks = {
  repo: "https://github.com/United4Surveillance/signal-detection-tool",
  ecdc: "https://www.ecdc.europa.eu/en/publications-data/episignaldetection-tool",
  farringtonWrapper: "https://united4surveillance.github.io/signal-detection-tool/reference/get_signals_farringtonflexible.html",
  farringtonSurveillance: "https://r-packages.io/packages/surveillance/farringtonFlexible",
  ears: "https://www.rdocumentation.org/packages/surveillance/topics/earsC",
  methods: "https://united4surveillance.github.io/signal-detection-tool/",
  cusumWrapper: "https://united4surveillance.github.io/signal-detection-tool/reference/algo.cusum_with_reset.html",
  cusumSurveillance: "https://www.rdocumentation.org/packages/surveillance/topics/algo.cusum"
};

const copy: Record<Language, {
  help: string;
  signals: string;
  title: string;
  intro: string;
  back: string;
  cards: InfoCard[];
}> = {
  pt: {
    help: "Ajuda",
    signals: "Sinais",
    title: "Contexto, fontes e nota legal",
    intro:
      "Esta proposta é um painel português de vigilância epidemiológica inspirado no United4Surveillance Signal Detection Tool. Serve para avaliação técnica, desenho de interface, planeamento de migração e validação progressiva dos métodos.",
    back: "Voltar aos Sinais",
    cards: [
      {
        title: "Objetivos da proposta",
        items: [
          "Replicar o fluxo principal da aplicação Shiny numa interface analítica orientada ao browser.",
          "Usar uma line-list portuguesa sintética para testar interação, filtros e gráficos.",
          "Preparar o caminho de worker Python/R para execução validada dos algoritmos.",
          "Documentar limites, pressupostos e requisitos antes de usar qualquer dado real de vigilância."
        ]
      },
      {
        title: "Fontes de inspiração",
        body:
          "O trabalho inspira-se no repositório United4Surveillance Signal Detection Tool, na vista Shiny de sinais e no contexto metodológico ECDC EpiSignalDetection. A proposta é independente e não representa endosso do ECDC ou da United4Surveillance."
      },
      {
        title: "Fluxo original coberto",
        items: [
          "Dados: upload de line-list, validação de variáveis obrigatórias, feedback de qualidade e pré-visualização.",
          "Parâmetros: seleção de agente/doença, filtros, janela de deteção, estratos e método.",
          "Sinais: cartões-resumo, vistas estratificadas, série temporal e tabelas de sinais.",
          "Relatório: exportação resumida baseada no método, filtros e estratos selecionados."
        ]
      },
      {
        title: "Modelo de interação atual",
        body:
          "A app segue um fluxo da esquerda para a direita: carregar e validar dados, ajustar parâmetros, inspecionar sinais e exportar relatório. Também permite alternar entre Parâmetros e Sinais durante a afinação dos filtros, alinhando-se com a orientação da aplicação Shiny original."
      },
      {
        title: "Nota sobre dados",
        body:
          "A amostra portuguesa incluída é sintética. Não contém casos reais, doentes reais, dados pessoais, dados de saúde identificáveis ou registos oficiais de vigilância. Contagens e alarmes são ilustrativos e não devem ser interpretados como evidência epidemiológica."
      },
      {
        title: "Métodos do repositório original",
        body:
          "Estes métodos são ferramentas de rastreio para séries temporais de vigilância. Identificam contagens invulgares face a uma baseline ajustada ou recente; não substituem investigação epidemiológica, revisão de qualidade dos dados ou verificação de denominadores.",
        methods: [
          {
            title: "FarringtonFlexible",
            body:
              "Deteção de surtos baseada em GLM sazonal para séries históricas longas. É mais adequada quando há histórico semanal suficiente e estrutura sazonal recorrente.",
            links: [
              { href: methodLinks.farringtonWrapper, label: "Wrapper SignalDetectionTool" },
              { href: methodLinks.farringtonSurveillance, label: "surveillance::farringtonFlexible" }
            ]
          },
          {
            title: "EARS",
            body:
              "Método de rastreio de janela curta para aberrações recentes. Útil quando o histórico é limitado, mas mais sensível a ruído recente e variações de notificação.",
            links: [
              { href: methodLinks.ears, label: "surveillance::earsC" },
              { href: methodLinks.methods, label: "Lista de métodos SignalDetectionTool" }
            ]
          },
          {
            title: "CUSUM",
            body:
              "Detetor de soma cumulativa para aumentos sustentados acima do comportamento esperado. Neste projeto, a variante com reset segue a adaptação do repositório original.",
            links: [
              { href: methodLinks.cusumWrapper, label: "CUSUM com reset" },
              { href: methodLinks.cusumSurveillance, label: "surveillance::algo.cusum" }
            ]
          },
          {
            title: "Família GLM",
            body:
              "Baselines modeladas com variantes de média, tendência e harmónicas sazonais. São úteis quando a pergunta de saúde pública exige um modelo explícito da baseline.",
            links: [
              { href: methodLinks.methods, label: "Variantes GLM disponíveis" },
              { href: methodLinks.ecdc, label: "Contexto ECDC EpiSignalDetection" }
            ]
          }
        ],
        note:
          "Os relatórios seguem o conceito original de run_report(). Os links externos são informativos e não implicam endosso pelo ECDC, R-Forge, CRAN ou United4Surveillance."
      },
      {
        title: "Limites metodológicos",
        body:
          "A interface espelha o fluxo epidemiológico para avaliação técnica. FarringtonFlexible e GLM usam a integração R; EARS e CUSUM requerem validação operacional adicional. Uso em produção deve assentar em métodos testados por paridade, governação de dados e revisão epidemiológica."
      },
      {
        title: "Lacunas para produção",
        items: [
          "EARS e CUSUM ainda precisam de reforço operacional final e maior cobertura de casos-limite.",
          "FarringtonFlexible e GLM estão disponíveis via R bridge local, mas o bridge é uma camada de integração e não o endpoint final de produção.",
          "Geração DOCX e HTML completo semelhante ao Shiny ainda precisam do caminho de relatório em R.",
          "Autenticação, controlo de acessos por papel, logs de auditoria e políticas de retenção devem ser definidos antes de uso com dados reais.",
          "Uso de dados reais exige revisão DPIA/base legal, minimização de dados e controlos operacionais de segurança."
        ]
      },
      {
        title: "Marcas institucionais",
        body:
          "Logótipos institucionais não são apresentados. Isto evita sugerir endosso, aprovação, contratação ou implantação operacional por qualquer entidade pública enquanto a ferramenta está em avaliação técnica."
      },
      {
        title: "Governação e privacidade",
        body:
          "Dados reais de saúde ou administrativos devem ser tratados segundo as regras aplicáveis de RGPD, segurança da informação, minimização, retenção, auditoria e controlo de acesso. Line-lists carregadas devem ser pseudonimizadas, guardadas em buckets privados, protegidas por segurança ao nível da linha e processadas por jobs auditáveis."
      },
      {
        title: "Notas de implementação",
        items: [
          "Protótipo frontend: Next.js em apps/web.",
          "Migração do worker: pacote Python em migration/python-worker.",
          "Harness de paridade R: migration/r-worker/export_golden_outputs.R.",
          "Notas metodológicas: methodology.md e migration/ALGORITHM_PARITY.md."
        ]
      },
      {
        title: "Assets de terceiros",
        body:
          "A inspiração visível de terceiros limita-se à geometria SVG pública dos distritos de Portugal e às referências citadas ao fluxo United4Surveillance/Shiny."
      },
      {
        title: "Informação de desenvolvimento",
        body:
          "Notas de desenvolvimento e migração técnica podem referenciar Hugo Filipe Monteiro como contexto de contacto técnico: hfmonteiro.com."
      }
    ]
  },
  en: {
    help: "Help",
    signals: "Signals",
    title: "Background, Sources and Legal Notice",
    intro:
      "This proposal is a Portuguese public-health surveillance dashboard inspired by the United4Surveillance Signal Detection Tool. It is intended for technical evaluation, interface design, migration planning and progressive method validation.",
    back: "Return to Signals",
    cards: [
      {
        title: "Prototype Objectives",
        items: [
          "Replicate the main Shiny workflow in a browser-first analytical interface.",
          "Use a Portuguese demonstration line-list to test interaction, filtering and charts.",
          "Prepare a Python/R worker path for validated algorithm execution.",
          "Document limits, assumptions and requirements before any real surveillance data is used."
        ]
      },
      {
        title: "Sources of Inspiration",
        body:
          "The work is inspired by the United4Surveillance Signal Detection Tool repository, the original Shiny signals view, and ECDC EpiSignalDetection methodological context. This is an independent proposal and does not imply endorsement by ECDC or United4Surveillance."
      },
      {
        title: "Original Git Workflow Covered",
        items: [
          "Data: line-list upload, mandatory variable checks, quality feedback and preview.",
          "Input parameters: pathogen selection, filters, detection window, strata and method selection.",
          "Signals: summary cards, stratified views, time series, and signal tables.",
          "Report: downloadable artefact based on the selected method, filters and strata."
        ]
      },
      {
        title: "Current Interaction Model",
        body:
          "The app is designed as a left-to-right workflow: load and validate data, tune parameters, inspect signals, then export a report. It also supports jumping between Input parameters and Signals while adjusting filters, matching the original Shiny guidance."
      },
      {
        title: "Data Notice",
        body:
          "The bundled Portuguese sample is for demonstration. It does not contain real cases, real patients, personal data, identifiable health data, or official surveillance records. Counts and alarms are illustrative and should not be interpreted as epidemiological evidence."
      },
      {
        title: "Methods From the Original Repository",
        body:
          "These methods are screening tools for surveillance time series. They identify unusual counts against a fitted or recent baseline; they do not replace epidemiological investigation, data-quality review, or denominator checks.",
        methods: [
          {
            title: "FarringtonFlexible",
            body:
              "Seasonal GLM-based outbreak detection for longer historical series. Best fit when weekly counts have enough baseline history and recurring seasonal structure.",
            links: [
              { href: methodLinks.farringtonWrapper, label: "SignalDetectionTool wrapper" },
              { href: methodLinks.farringtonSurveillance, label: "surveillance::farringtonFlexible" }
            ]
          },
          {
            title: "EARS",
            body:
              "Short-window screening method for recent aberrations. Useful when history is limited, but it is more sensitive to recent noise and reporting artefacts.",
            links: [
              { href: methodLinks.ears, label: "surveillance::earsC" },
              { href: methodLinks.methods, label: "SignalDetectionTool methods list" }
            ]
          },
          {
            title: "CUSUM",
            body:
              "Cumulative-sum detector for sustained increases above expected behaviour. In this project the reset variant follows the original repository's adaptation.",
            links: [
              { href: methodLinks.cusumWrapper, label: "CUSUM with reset" },
              { href: methodLinks.cusumSurveillance, label: "surveillance::algo.cusum" }
            ]
          },
          {
            title: "GLM family",
            body:
              "Model-based baselines covering mean, trend and harmonic seasonal variants. These are most useful when the public-health question requires an explicit baseline model.",
            links: [
              { href: methodLinks.methods, label: "Available GLM variants" },
              { href: methodLinks.ecdc, label: "ECDC EpiSignalDetection context" }
            ]
          }
        ],
        note:
          "Reports follow the original run_report() concept. External links are informational and do not imply endorsement by ECDC, R-Forge, CRAN, or United4Surveillance."
      },
      {
        title: "Methodological Limits",
        body:
          "The browser interface mirrors the epidemiological workflow for technical evaluation. FarringtonFlexible and GLM use the R integration; EARS and CUSUM require additional operational validation. Production use should rely on parity-tested methods, data governance and epidemiological review."
      },
      {
        title: "Production Readiness Gaps",
        items: [
          "EARS and CUSUM still need operational validation and broader edge-case coverage.",
          "FarringtonFlexible and GLM are available through the local R bridge, but the bridge is an integration layer rather than the final production endpoint.",
          "DOCX and full Shiny-like HTML report generation still need the R report path.",
          "Authentication, role-based access, audit logs and retention policies must be defined before real-data use.",
          "Real data use requires DPIA/legal-basis review, data minimisation and operational security controls."
        ]
      },
      {
        title: "Institutional Marks",
        body:
          "Institutional logos are intentionally not displayed. This avoids implying endorsement, approval, procurement, or operational deployment by any public body while the tool remains under technical evaluation."
      },
      {
        title: "Governance and Privacy",
        body:
          "Real healthcare or administrative data must be handled under applicable GDPR, information security, data minimisation, retention, audit, and access-control rules. Uploaded line lists should be pseudonymised, stored in private buckets, protected by row-level security, and processed through auditable jobs."
      },
      {
        title: "Implementation Notes",
        items: [
          "Frontend: Next.js under apps/web.",
          "Worker migration: Python package under migration/python-worker.",
          "R parity harness: migration/r-worker/export_golden_outputs.R.",
          "Methodology notes: methodology.md and migration/ALGORITHM_PARITY.md."
        ]
      },
      {
        title: "Third-Party Assets",
        body:
          "Current visible third-party inspiration is limited to the public-domain Portugal district SVG geometry and the cited United4Surveillance/Shiny workflow references."
      },
      {
        title: "Development Information",
        body:
          "Prototype development and technical migration notes can reference Hugo Filipe Monteiro as development contact context: hfmonteiro.com."
      }
    ]
  }
};

function renderCard(card: InfoCard) {
  return (
    <article className={styles.legalCard} key={card.title}>
      <h3>{card.title}</h3>
      {card.body ? <p>{card.body}</p> : null}
      {card.items ? (
        <ul>
          {card.items.map((item) => <li key={item}>{item}</li>)}
        </ul>
      ) : null}
      {card.methods ? (
        <>
          <div className={styles.methodCards}>
            {card.methods.map((method) => (
              <section key={method.title}>
                <h4>{method.title}</h4>
                <p>{method.body}</p>
                {method.links.map((link) => (
                  <a href={link.href} key={link.href}>{link.label}</a>
                ))}
              </section>
            ))}
          </div>
          <p className={styles.methodNote}>{card.note}</p>
        </>
      ) : null}
    </article>
  );
}

function BackgroundContent() {
  const searchParams = useSearchParams();
  const language: Language = searchParams.get("lang") === "en" ? "en" : "pt";
  const t = copy[language];

  return (
    <main className={styles.page}>
      <AppHeader
        language={language}
        languageHref={(nextLanguage) => `/background?lang=${nextLanguage}` as Route}
      />
      <nav className={styles.tabs} aria-label="Application sections">
        <Link href={`/background?lang=${language}`} className={styles.activeTab}>
          <span aria-hidden="true">?</span>
          {t.help}
        </Link>
        <Link href={`/?lang=${language}&section=signals`}>
          <span aria-hidden="true">╬</span>
          {t.signals}
        </Link>
      </nav>

      <section className={styles.backgroundPage}>
        <article className={styles.legalHero}>
          <h2>{t.title}</h2>
          <p>{t.intro}</p>
          <Link className={styles.backLink} href={`/?lang=${language}&section=signals`}>{t.back}</Link>
        </article>

        <section className={styles.legalGrid}>
          {t.cards.map(renderCard)}
        </section>
      </section>
    </main>
  );
}

export default function BackgroundPage() {
  return (
    <Suspense fallback={null}>
      <BackgroundContent />
    </Suspense>
  );
}


