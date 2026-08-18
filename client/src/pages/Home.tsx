/**
 * Design: ClearLayer Technical Precision — dossier branco, preciso e conciso.
 * Cada secção comunica uma única decisão de produto; imagens e medidas servem como evidência.
 */
import { useEffect, useState } from "react";
import { ArrowDownRight, CircleAlert, Layers3, ScanLine, Wrench } from "lucide-react";
import { clearDossierState, readDossierState, writeDossierState } from "@/lib/clearLayerDb";

const isStaticBuild = import.meta.env.VITE_GITHUB_PAGES === "true";
const asset = (filename: string, storagePath: string) => isStaticBuild ? `${import.meta.env.BASE_URL}${filename}` : storagePath;

const assets = {
  wordmark: asset("clearlayer-wordmark.png", "/manus-storage/clearlayer-wordmark_be6a4db4.png"),
  fullLogo: asset("clearlayer-logo-reference.JPG", "/manus-storage/clearlayer-logo-reference_3f7853ba.JPG"),
  blueprint: asset("blueprint.png", "/manus-storage/F74375B7-C9E2-4F8B-AB39-CB5C38626469_1f13939c.png"),
  structure: asset("structure.jpg", "/manus-storage/IMG_5163_da3ff018.JPG"),
  v1Front: asset("clearlayer-v1-frontal-adhesive.png", "/manus-storage/clearlayer-v1-frontal-adhesive_e4cabf48.png"),
  v1ThreeQuarter: asset("clearlayer-v1-threequarter-correct.png", "/manus-storage/clearlayer-v1-threequarter-correct_20238ed5.png"),
  v1Rimless: asset("clearlayer-v1-rimless-adhesive.png", "/manus-storage/clearlayer-v1-rimless-adhesive_19a56e9b.png"),
  v2Front: asset("clearlayer-v2-front-reference-crop.png", "/manus-storage/clearlayer-v2-front-reference-crop_a0b663ec.png"),
  v2Detail: asset("clearlayer-v2-detail-preformed.png", "/manus-storage/IMG_5131_bef8e37f.JPG"),
  profileImages: {
    roundV1: asset("clearlayer-round-v1.webp", "/manus-storage/clearlayer-round-v1.webp"),
    roundV2: asset("clearlayer-round-v2.webp", "/manus-storage/clearlayer-round-v2.webp"),
    squareV1: asset("clearlayer-square-v1.webp", "/manus-storage/clearlayer-square-v1.webp"),
    squareV2: asset("clearlayer-square-v2.webp", "/manus-storage/clearlayer-square-v2.webp"),
    aviatorV1: asset("clearlayer-aviator-v1.webp", "/manus-storage/clearlayer-aviator-v1.webp"),
    aviatorV2: asset("clearlayer-aviator-v2.webp", "/manus-storage/clearlayer-aviator-v2.webp"),
    rimlessV1: asset("clearlayer-rimless-v1.webp", "/manus-storage/clearlayer-rimless-v1.webp"),
  },
};

const principles = [
  { icon: Layers3, name: "Superfície", copy: "V1 é uma película adesiva ultrafina aplicada diretamente sobre a lente. A leitura permanece limpa e a remoção é uma hipótese de validação." },
  { icon: ScanLine, name: "Estrutura", copy: "Filme ótico, adesivo e revestimento trabalham em conjunto. A referência atual é 0,075 mm + 0,020 mm + 0,005 mm." },
  { icon: Wrench, name: "Aplicação", copy: "Curvatura, bordo e arquitetura da armação definem a configuração. V2 só é estudada onde existe aro completo para apoiar a forma." },
];

const profiles = [
  ["round", "01", "Aro redondo", "V1 adesiva · V2 a validar"],
  ["square", "02", "Aro quadrado", "V1 adesiva · V2 a validar"],
  ["aviator", "03", "Aviador", "V1 adesiva · V2 a validar"],
  ["rimless", "04", "Sem aro", "Apenas V1 adesiva"],
];

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function Home() {
  const [localStatus, setLocalStatus] = useState<"loading" | "ready" | "unavailable">("loading");
  const [lastSection, setLastSection] = useState<string | null>(null);
  const [selectedProfile, setSelectedProfile] = useState("round");
  const [productVersion, setProductVersion] = useState<"V1" | "V2">("V1");
  const [viewMode, setViewMode] = useState<"technical" | "product">("technical");

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
      setSelectedProfile(state?.lastProfile ?? "round");
      setProductVersion(state?.productVersion ?? "V1");
      setViewMode(state?.viewMode ?? "technical");
      setLocalStatus("ready");
    });
    return () => {
      active = false;
    };
  }, []);

  const persistPreferences = async (patch: { lastSection?: string; lastProfile?: string; productVersion?: "V1" | "V2"; viewMode?: "technical" | "product" }) => {
    const next = { lastSection: lastSection ?? undefined, lastProfile: selectedProfile, productVersion, viewMode, ...patch };
    if (patch.lastSection) setLastSection(patch.lastSection);
    if (patch.lastProfile) setSelectedProfile(patch.lastProfile);
    if (patch.productVersion) setProductVersion(patch.productVersion);
    if (patch.viewMode) setViewMode(patch.viewMode);
    const saved = await writeDossierState(next);
    setLocalStatus(saved ? "ready" : "unavailable");
  };

  const rememberSection = async (section: string) => persistPreferences({ lastSection: section });

  const clearLocalMemory = async () => {
    const cleared = await clearDossierState();
    if (cleared) {
      setLastSection(null);
      setSelectedProfile("round");
      setProductVersion("V1");
      setViewMode("technical");
    }
    setLocalStatus(cleared ? "ready" : "unavailable");
  };

  return <main className={`precision-site view-${viewMode} version-${productVersion.toLowerCase()}`} data-selected-profile={selectedProfile}>
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
      <div className="preference-strip" aria-label="Preferências locais do dossier"><label>Perfil<select value={selectedProfile} onChange={(event) => void persistPreferences({ lastProfile: event.target.value })}><option value="round">Aro redondo</option><option value="square">Aro quadrado</option><option value="aviator">Aviador</option><option value="rimless">Sem aro</option></select></label><label>Versão<select value={productVersion} onChange={(event) => void persistPreferences({ productVersion: event.target.value as "V1" | "V2" })}><option value="V1">V1 adesiva</option><option value="V2">V2 pré-conformada</option></select></label><label>Modo<select value={viewMode} onChange={(event) => void persistPreferences({ viewMode: event.target.value as "technical" | "product" })}><option value="technical">Técnico</option><option value="product">Produto</option></select></label></div>
      <div className="profile-content"><div className="profile-diagram" aria-label="Imagens individuais dos perfis de armação"><figure><img src={assets.profileImages.roundV1} alt="Aro redondo com aplicação V1 adesiva" width="1600" height="900" loading="lazy" decoding="async" /><figcaption>Aro redondo · V1</figcaption></figure><figure><img src={assets.profileImages.roundV2} alt="Aro redondo com aplicação V2" width="1600" height="900" loading="lazy" decoding="async" /><figcaption>Aro redondo · V2</figcaption></figure><figure><img src={assets.profileImages.squareV1} alt="Aro quadrado com aplicação V1 adesiva" width="1600" height="900" loading="lazy" decoding="async" /><figcaption>Aro quadrado · V1</figcaption></figure><figure><img src={assets.profileImages.squareV2} alt="Aro quadrado com aplicação V2" width="1600" height="900" loading="lazy" decoding="async" /><figcaption>Aro quadrado · V2</figcaption></figure><figure><img src={assets.profileImages.aviatorV1} alt="Aviador com aplicação V1 adesiva" width="1600" height="900" loading="lazy" decoding="async" /><figcaption>Aviador · V1</figcaption></figure><figure><img src={assets.profileImages.aviatorV2} alt="Aviador com aplicação V2" width="1600" height="900" loading="lazy" decoding="async" /><figcaption>Aviador · V2</figcaption></figure><figure><img src={assets.profileImages.rimlessV1} alt="Armação sem aro com aplicação V1 adesiva" width="1600" height="900" loading="lazy" decoding="async" /><figcaption>Sem aro · V1</figcaption></figure></div><div className="profile-grid">{profiles.map(([profileId, number, title, status]) => <article className={selectedProfile === profileId ? "is-selected" : ""} key={profileId}><span>{number}</span><h3>{title}</h3><p>{status}</p>{title === "Sem aro" && <small><CircleAlert size={13} /> Sem aperto periférico</small>}</article>)}</div></div>
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
    <footer><div className="footer-brand"><img className="footer-wordmark" src={assets.wordmark} alt="ClearLayer" /><img className="footer-full-logo" src={assets.fullLogo} alt="ClearLayer — símbolo e wordmark" /></div><span>ESTADO · EM DESENVOLVIMENTO</span>
<span>PORTUGAL · 2026</span><span className="local-status" aria-live="polite">{localStatus === "ready" ? "MEMÓRIA LOCAL · INDEXEDDB" : localStatus === "loading" ? "MEMÓRIA LOCAL · A VERIFICAR" : "MEMÓRIA LOCAL · INDISPONÍVEL"}</span>{lastSection && <span>ÚLTIMA SECÇÃO · {sectionLabels[lastSection] ?? lastSection}</span>}<button className="local-clear" type="button" onClick={() => void clearLocalMemory()}>Limpar estado local</button></footer>
  </main>;
}
