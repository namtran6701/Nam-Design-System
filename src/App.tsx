import { useState, type ReactNode } from "react";
import {
  ArrowDownToLine,
  ArrowUpRight,
  Check,
  Code2,
  Copy,
  Grid2X2,
  Layers,
  Plus,
  Search,
  Terminal,
  X,
} from "lucide-react";
import catalog from "../registry.json";
import { NamButton } from "../registry/nam-button";
import { ProfileCard } from "../registry/profile-card";
import { EmptyState } from "../registry/empty-state";

const sources = import.meta.glob("../registry/*.tsx", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;
type Item = (typeof catalog.items)[number];
const repo = "https://github.com/namtran6701/Nam-Design-System";
function command(item: Item) {
  return `npx shadcn@latest add ${new URL(`r/${item.name}.json`, new URL(".", window.location.href)).href}`;
}

export default function App() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All designs");
  const [selected, setSelected] = useState<Item | null>(null);
  const [tab, setTab] = useState("Preview");
  const [guide, setGuide] = useState(false);
  const [notice, setNotice] = useState("");
  const [copied, setCopied] = useState("");
  const previews: Record<string, ReactNode> = {
    "nam-button": (
      <div className="button-examples">
        <NamButton onClick={() => setNotice("Primary button clicked")}>
          Make it happen <ArrowUpRight size={16} aria-hidden="true" />
        </NamButton>
        <div>
          <NamButton
            variant="secondary"
            onClick={() => setNotice("Secondary button clicked")}
          >
            Secondary
          </NamButton>
          <NamButton
            variant="outline"
            onClick={() => setNotice("Outline button clicked")}
          >
            Outline
          </NamButton>
        </div>
      </div>
    ),
    "profile-card": (
      <ProfileCard
        onContact={() =>
          setNotice("Contact clicked — connect this to your own contact flow.")
        }
      />
    ),
    "empty-state": (
      <EmptyState
        onAction={() =>
          setNotice("Create clicked — connect this to your own project flow.")
        }
      />
    ),
  };
  const items = catalog.items.filter(
    (item) =>
      (category === "All designs" ||
        (category === "Components"
          ? item.type === "registry:ui"
          : item.type === "registry:block")) &&
      `${item.title} ${item.description}`
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  async function copy(text: string, key: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(key);
      setTimeout(() => setCopied(""), 2000);
    } catch {
      setNotice(
        "Clipboard unavailable. Select the command or source text and copy it manually.",
      );
    }
  }
  function open(item: Item) {
    setSelected(item);
    setTab("Preview");
  }
  return (
    <div className="app-shell">
      <a className="skip-link" href="#collection">
        Skip to collection
      </a>
      <aside className="sidebar">
        <a className="brand" href="./" aria-label="Nam design system home">
          <span className="brand-mark">
            n<span>↗</span>
          </span>
          <span>
            nam<span className="brand-subtitle">DESIGN SYSTEM</span>
          </span>
        </a>
        <div className="workspace-label">PERSONAL WORKSPACE</div>
        <nav aria-label="Collection categories">
          {["All designs", "Components", "Blocks"].map((label, i) => {
            const Icon = [Grid2X2, Layers, Code2][i];
            return (
              <button
                key={label}
                aria-current={category === label ? "page" : undefined}
                onClick={() => setCategory(label)}
              >
                <Icon size={18} aria-hidden="true" />
                {label}
                <span>
                  {i === 0
                    ? catalog.items.length
                    : catalog.items.filter((x) =>
                        i === 1
                          ? x.type === "registry:ui"
                          : x.type === "registry:block",
                      ).length}
                </span>
              </button>
            );
          })}
        </nav>
        <div className="sidebar-note">
          <span className="mini-shapes" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <strong>Your ideas, on repeat.</strong>
          <p>A home for the little things you’ll build with again.</p>
          <button onClick={() => setGuide(true)}>
            How to add a design <ArrowUpRight size={15} aria-hidden="true" />
          </button>
        </div>
        <a className="repo-link" href={repo} target="_blank" rel="noreferrer">
          <Code2 size={17} aria-hidden="true" /> GitHub repository{" "}
          <ArrowUpRight size={15} aria-hidden="true" />
        </a>
        <div className="owner">
          <span>NT</span>
          <div>
            Nam Tran<small>Personal collection</small>
          </div>
        </div>
      </aside>
      <main>
        <header className="topbar">
          <span>
            Workspace <span className="slash">/</span>{" "}
            <strong>Collection</strong>
          </span>
          <span className="react-label">
            <span /> Built for React
          </span>
        </header>
        <div className="main-content">
          <section className="intro">
            <div>
              <div className="eyebrow">COLLECT. CUSTOMIZE. CREATE.</div>
              <h1>
                Good design.
                <br />
                <span>Ready for your next idea.</span>
              </h1>
              <p>
                Your own shelf of components and building blocks.
                <br className="desktop-break" /> Find something you love. Make
                it yours. Use it again.
              </p>
            </div>
            <button className="primary-action" onClick={() => setGuide(true)}>
              <Plus size={17} aria-hidden="true" /> Add a design
            </button>
          </section>
          <section className="workflow" aria-label="How the collection works">
            <div>
              <span>
                <Code2 size={18} aria-hidden="true" />
              </span>
              <p>
                Save your code<small>One React file to start</small>
              </p>
            </div>
            <span className="workflow-arrow" aria-hidden="true">
              →
            </span>
            <div>
              <span>
                <Grid2X2 size={18} aria-hidden="true" />
              </span>
              <p>
                See it live<small>Preview every detail</small>
              </p>
            </div>
            <span className="workflow-arrow" aria-hidden="true">
              →
            </span>
            <div>
              <span>
                <ArrowDownToLine size={18} aria-hidden="true" />
              </span>
              <p>
                Bring it with you<small>Install in your next app</small>
              </p>
            </div>
          </section>
          <section id="collection" className="collection">
            <div className="collection-toolbar">
              <div>
                <h2>{category}</h2>
                <span>
                  {items.length} {items.length === 1 ? "design" : "designs"}
                </span>
              </div>
              <label className="search">
                <Search size={17} aria-hidden="true" />
                <input
                  aria-label="Search designs"
                  placeholder="Find a design…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                {query && (
                  <button
                    aria-label="Clear search"
                    onClick={() => setQuery("")}
                  >
                    <X size={15} />
                  </button>
                )}
              </label>
            </div>
            <div className="design-grid">
              {items.map((item) => (
                <article key={item.name} className="design-card">
                  <div className={`card-preview ${item.name}`}>
                    {previews[item.name] ?? (
                      <p>Add a preview in src/App.tsx.</p>
                    )}
                  </div>
                  <div className="card-info">
                    <div>
                      <span className="item-type">
                        {item.type === "registry:ui" ? "COMPONENT" : "BLOCK"}
                      </span>
                      <h3>
                        <button onClick={() => open(item)}>
                          {item.title}
                          <ArrowUpRight size={17} aria-hidden="true" />
                        </button>
                      </h3>
                      <p>{item.description}</p>
                    </div>
                    <div className="card-footer">
                      <span>React · Tailwind</span>
                      <button onClick={() => open(item)}>
                        View design <span aria-hidden="true">→</span>
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            {!items.length && (
              <div className="no-results">
                <Search size={25} aria-hidden="true" />
                <h3>No designs found</h3>
                <p>Try another search or browse all designs.</p>
                <button
                  onClick={() => {
                    setQuery("");
                    setCategory("All designs");
                  }}
                >
                  Reset filters
                </button>
              </div>
            )}
          </section>
          <footer className="page-footer">
            <span>A growing collection. A familiar starting point.</span>
            <button onClick={() => setGuide(true)}>
              Make room for your next design{" "}
              <Plus size={15} aria-hidden="true" />
            </button>
          </footer>
        </div>
      </main>
      {notice && (
        <div className="toast" role="status">
          {notice}
          <button
            aria-label="Dismiss notification"
            onClick={() => setNotice("")}
          >
            <X size={17} />
          </button>
        </div>
      )}
      {selected && (
        <dialog
          aria-labelledby="design-title"
          open
          ref={(el) => {
            if (el && !el.matches(":modal")) {
              el.close();
              el.showModal();
            }
          }}
          onCancel={() => setSelected(null)}
          className="detail-dialog"
        >
          <div className="dialog-heading">
            <div>
              <span className="eyebrow">YOUR COLLECTION</span>
              <h2 id="design-title">{selected.title}</h2>
            </div>
            <button
              className="icon-button"
              aria-label="Close design"
              onClick={() => setSelected(null)}
            >
              <X size={20} />
            </button>
          </div>
          <p className="dialog-description">{selected.description}</p>
          <div className="view-tabs">
            {["Preview", "Code"].map((label) => (
              <button
                aria-pressed={tab === label}
                key={label}
                onClick={() => setTab(label)}
              >
                {label === "Code" ? (
                  <Code2 size={16} aria-hidden="true" />
                ) : (
                  <Grid2X2 size={16} aria-hidden="true" />
                )}
                {label}
              </button>
            ))}
          </div>
          {tab === "Preview" ? (
            <div className={`detail-preview ${selected.name}`}>
              {previews[selected.name]}
            </div>
          ) : (
            <div className="source-panel">
              <button
                onClick={() =>
                  copy(sources[`../${selected.files[0].path}`], "source")
                }
              >
                {copied === "source" ? "Copied" : "Copy source"}
              </button>
              <pre>
                <code>{sources[`../${selected.files[0].path}`]}</code>
              </pre>
            </div>
          )}
          <div className="install">
            <h3>
              <Terminal size={17} aria-hidden="true" /> Take it to your app
            </h3>
            <p>Run in a React + Tailwind project with shadcn initialized.</p>
            <div className="command">
              <code>{command(selected)}</code>
              <button
                aria-label="Copy install command"
                onClick={() => copy(command(selected), "command")}
              >
                {copied === "command" ? (
                  <Check size={18} />
                ) : (
                  <Copy size={18} />
                )}
              </button>
            </div>
            <small>
              {["localhost", "127.0.0.1"].includes(window.location.hostname)
                ? "Local preview commands work on this computer. Deploy the gallery for a shareable URL."
                : "Copies the source into your app. Customize it freely; updates are not automatic."}
            </small>
          </div>
        </dialog>
      )}
      {guide && (
        <dialog
          aria-labelledby="guide-title"
          open
          ref={(el) => {
            if (el && !el.matches(":modal")) {
              el.close();
              el.showModal();
            }
          }}
          onCancel={() => setGuide(false)}
          className="guide-dialog"
        >
          <div className="dialog-heading">
            <h2 id="guide-title">Add to your collection</h2>
            <button
              className="icon-button"
              aria-label="Close guide"
              onClick={() => setGuide(false)}
            >
              <X size={20} />
            </button>
          </div>
          <p>Start with a React component you want to use again.</p>
          <ol>
            <li>
              <strong>Save the component</strong>
              <p>
                Add your <code>.tsx</code> file inside <code>registry/</code>.
              </p>
            </li>
            <li>
              <strong>Register the design</strong>
              <p>
                Add its name, description, and files to{" "}
                <code>registry.json</code>. Declare any package dependencies
                there too.
              </p>
            </li>
            <li>
              <strong>Add a live preview</strong>
              <p>
                Import the component in <code>src/App.tsx</code> and add an
                example to the <code>previews</code> map.
              </p>
            </li>
            <li>
              <strong>Build and push</strong>
              <p>
                Run <code>npm run build</code>, then commit and push. With
                GitHub Pages enabled, your gallery deploys automatically.
              </p>
            </li>
          </ol>
          <a
            className="primary-action"
            href={`${repo}/blob/main/README.md`}
            target="_blank"
            rel="noreferrer"
          >
            Open the full guide <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </dialog>
      )}
    </div>
  );
}
