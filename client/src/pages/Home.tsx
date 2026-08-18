/**
 * Design: ClearLayer Technical Precision — dossier branco, preciso e conciso.
 * Cada secção comunica uma única decisão de produto; imagens e medidas servem como evidência.
 */
import { useEffect, useState } from "react";
import { ArrowDownRight, CircleAlert, Layers3, ScanLine, Wrench } from "lucide-react";
import { clearDossierState, readDossierState, writeDossierState } from "@/lib/clearLayerDb";

const assets = {
  wordmark: "/manus-storage/clearlayer-wordmark_be6a4db4.png",
  blueprint: "/manus-storage/F74375B7-C9E2-4F8B-AB39-CB5C38626469_1f13939c.png",
  structure: "/manus-storage/IMG_5163_da3ff018.JPG",
  v1Front: "/manus-storage/clearlayer-v1-frontal-adhesive_e4cabf48.png",
  v1ThreeQuarter: "/manus-storage/clearlayer-v1-threequarter-correct_20238ed5.png",
  v1Rimless: "/manus-storage/clearlayer-v1-rimless-adhesive_19a56e9b.png",
  v2Front: "/manus-storage/clearlayer-v2-front-reference-crop_a0b663ec.png",
  v2Detail: "/manus-storage/IMG_5131_bef8e37f.JPG",
  modelSheet: "/manus-storage/9F21138E-9287-401A-8EDC-2414F5540A70_7c4fce9d.png",
};

const principles = [
  { icon: Layers3, name: "Superfície", copy: "V1 é uma película adesiva ultrafina aplicada diretamente sobre a lente. A leitura permanece limpa e a remoção é uma hipótese de validação." },
  { icon: ScanLine, name: "Estrutura", copy: "Filme ótico, adesivo e revestimento trabalham em conjunto. A referência atual é 0,075 mm + 0,020 mm + 0,005 mm." },
  { icon: Wrench, name: "Aplicação", copy: "Curvatura, bordo e arquitetura da armação definem a configuração. V2 só é estudada onde existe aro completo para apoiar a forma." },
];

const profiles = [
  ["01", "Aro redondo", "V1 adesiva · V2 a validar"],
  ["02", "Aro quadrado", "V1 adesiva · V2 a validar"],
  ["03", "Aviador", "V1 adesiva · V2 a validar"],
  ["04", "Sem aro", "Apenas V1 adesiva"],
];

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function Home() {
  const [localStatus, setLocalStatus] = useState<"loading" | "ready" | "unavailable">("loading");
  const [lastSection, setLastSection] = useState<string | null>(null);

  const sectionLabels: Record<string, string> = {
    produto: "Produto",
    imagens: "Imagens",
    perfis: "Perfis",
    processo: "Processo",
  };

  useEffect(() => {
    let active = true;
    void readDossierState().then((state) => {
      if (!active) return;
      setLastSection(state?.lastSection ?? null);
      setLocalStatus("ready");
    });
    return () => {
      active = false;
    };
  }, []);

  const rememberSection = async (section: string) => {
    setLastSection(section);
    const saved = await writeDossierState({ lastSection: section });
    setLocalStatus(saved ? "ready" : "unavailable");
  };

  const clearLocalMemory = async () => {
    const cleared = await clearDossierState();
    if (cleared) setLastSection(null);
    setLocalStatus(cleared ? "ready" : "unavailable");
  };

  return <main className="precision-site">
    <header className="precision-header">
      <a className="precision-wordmark" href="#top" aria-label="ClearLayer — início"><img src={assets.wordmark} alt="ClearLayer" /></a>
      <nav aria-label="Navegação principal"><a href="#produto" onClick={() => void rememberSection("produto")}>Produto</a><a href="#imagens" onClick={() => void rememberSection("imagens")}>Imagens</a><a href="#perfis" onClick={() => void rememberSection("perfis")}>Perfis</a><a href="#processo" onClick={() => void rememberSection("processo")}>Processo</a></nav>
      <button className="header-button" onClick={() => scrollTo("imagens")}>Explorar vistas <ArrowDownRight size={14} /></button>
    </header>

    <section className="precision-hero" id="top">
      <div className="hero-copy">
        <span className="eyebrow"><i /> PROTÓTIPO DE ENGENHARIA · EM DESENVOLVIMENTO</span>
        <h1>Proteção<br />transparente.<br /><b>Leitura precisa</b><br />da lente.</h1>
        <p>ClearLayer explora uma película ótica configurada pela geometria da armação. O projeto comunica referências de produto, hipóteses de aplicação e critérios de validação — sem converter protótipos em promessas.</p>
        <button className="primary-button" onClick={() => scrollTo("produto")}>Explorar o produto <ArrowDownRight size={16} /></button>
        <span className="hero-spec">FILME · ADESIVO · REVESTIMENTO</span>
      </div>
      <div className="hero-drawing">
        <div className="drawing-grid" />
        <img src={assets.blueprint} alt="Desenho técnico de uma película transparente aplicada numa lente" />
        <span className="drawing-tag top">REFERÊNCIA · V1</span><span className="drawing-tag bottom">SUPERFÍCIE ADESIVA</span>
      </div>
    </section>

    <section className="principle-section" id="produto">
      <h2>A arquitetura do filme é o produto.</h2>
      <div className="principle-grid">
        {principles.map(({ icon: Icon, name, copy }) => <article key={name}><Icon size={23} strokeWidth={1.4} /><h3>{name}</h3><p>{copy}</p></article>)}
      </div>
    </section>

    <section className="lens-logic">
      <article><span>CONDIÇÃO REAL</span><h2>Uma lente não é<br />uma superfície genérica.</h2><p>Curvatura, limpeza, espessura e perfil da armação alteram a aplicação. O ponto de partida é sempre uma lente real, não uma forma abstrata.</p></article>
      <div className="lens-section-image"><img src={assets.structure} alt="Estrutura em camadas do filme ClearLayer" /><span>FILME · 0,075 mm</span><span>ADESIVO · 0,020 mm</span><span>REVESTIMENTO · 0,005 mm</span></div>
      <article><span>ABORDAGEM</span><h2>Configurar antes<br />de aplicar.</h2><p>O sistema parte do perfil da armação, produz uma amostra e regista um critério de aceitação. V1 e V2 não são o mesmo produto em duas imagens.</p></article>
    </section>

    <section className="product-images" id="imagens">
      <div className="section-head"><span>IMAGENS DE PRODUTO</span><p>Vistas de referência para distinguir a aplicação adesiva V1 da solução V2 pré-conformada em armação com aro.</p></div>
      <div className="image-board">
        <figure className="image-feature"><img src={assets.v2Front} alt="Vista frontal V2 pré-conformada numa armação de aro completo" /><figcaption><b>V2 · FRENTE</b><span>ARO COMPLETO · CONTORNO PRÉ-CONFORMADO</span></figcaption></figure>
        <div className="image-grid">
          <figure><img src={assets.v1Front} alt="V1 adesiva vista frontal" /><figcaption>V1 · FRENTE</figcaption></figure>
          <figure><img src={assets.v1ThreeQuarter} alt="V1 adesiva vista três quartos" /><figcaption>V1 · VISTA 3/4</figcaption></figure>
          <figure><img src={assets.v2Detail} alt="Detalhe de aplicação V2 num aro completo" /><figcaption>V2 · DETALHE</figcaption></figure>
          <figure><img src={assets.v1Rimless} alt="V1 adesiva em armação sem aro" /><figcaption>SEM ARO · V1</figcaption></figure>
        </div>
      </div>
    </section>

    <section className="profiles-section" id="perfis">
      <div className="section-head"><span>PERFIS DE ARMAÇÃO</span><p>Quatro perfis de referência; quatro decisões que não devem ser tratadas como uma geometria única.</p></div>
      <div className="profile-content"><div className="profile-diagram"><img src={assets.modelSheet} alt="Prancha técnica de quatro perfis de armação" /></div><div className="profile-grid">{profiles.map(([number, title, status]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{status}</p>{title === "Sem aro" && <small><CircleAlert size={13} /> Sem aperto periférico</small>}</article>)}</div></div>
    </section>

    <section className="process-section" id="processo">
      <h2>Um processo que deixa rasto técnico.</h2>
      <div className="process-line">
        <article><span>F0</span><h3>Definição</h3><p>Armação, lente e critério de aceitação.</p></article>
        <article><span>F1</span><h3>V1 Flat</h3><p>Filme, corte, aplicação e remoção.</p></article>
        <article><span>F2</span><h3>V2 Press</h3><p>Conformação em perfis com aro.</p></article>
        <article><span>F3</span><h3>Industrial</h3><p>Receitas e controlo por configuração.</p></article>
      </div>
    </section>

    <section className="final-statement"><h2>Uma camada mais clara<br />sobre o processo.</h2><button className="primary-button" onClick={() => scrollTo("top")}>Voltar ao início <ArrowDownRight size={16} /></button></section>
    <footer><img src={assets.wordmark} alt="ClearLayer" /><span>ESTADO · EM DESENVOLVIMENTO</span><span>PORTUGAL · 2026</span><span className="local-status" aria-live="polite">{localStatus === "ready" ? "MEMÓRIA LOCAL · INDEXEDDB" : localStatus === "loading" ? "MEMÓRIA LOCAL · A VERIFICAR" : "MEMÓRIA LOCAL · INDISPONÍVEL"}</span>{lastSection && <span>ÚLTIMA SECÇÃO · {sectionLabels[lastSection] ?? lastSection}</span>}<button className="local-clear" type="button" onClick={() => void clearLocalMemory()}>Limpar estado local</button></footer>
  </main>;
}
