import {
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  ArrowDownToLine,
  ArrowRight,
  Download,
  Trash2,
  ArrowUpRight,
  Check,
  Code2,
  Grid2X2,
  Layers,
  Plus,
  Search,
  Terminal,
  X,
  type LucideIcon,
} from "lucide-react";
import { CopyButton } from "./components/CopyButton";
import catalog from "../registry.json";
import designPrinciples from "./design-principles.txt?raw";
import { Button as MotionButton } from "../registry/motion-button";
import { NamButton } from "../registry/nam-button";
import { ProfileCard } from "../registry/profile-card";
import { FeedbackWidget } from "../registry/feedback-widget";
import { EmptyState } from "../registry/empty-state";

const sources = import.meta.glob("../registry/*.tsx", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

interface Item {
  name: string;
  type: string;
  title: string;
  description: string;
  files: { path: string; type: string }[];
}
const designs: Item[] = catalog.items;
const repo = "https://github.com/namtran6701/Nam-Design-System";

const categories: {
  label: string;
  icon: LucideIcon;
  match: (item: Item) => boolean;
}[] = [
  { label: "All designs", icon: Grid2X2, match: () => true },
  {
    label: "Components",
    icon: Layers,
    match: (item) => item.type === "registry:ui",
  },
  {
    label: "Blocks",
    icon: Code2,
    match: (item) => item.type === "registry:block",
  },
];

function typeLabel(type: string) {
  return type.replace(/^registry:/, "").toUpperCase();
}

function command(item: Item) {
  return `npx shadcn@latest add ${new URL(`r/${item.name}.json`, new URL(".", window.location.href)).href}`;
}

function sourcesFor(item: Item) {
  return item.files
    .map((file) => ({ path: file.path, code: sources[`../${file.path}`] }))
    .filter((file) => typeof file.code === "string");
}

function Modal({
  labelledBy,
  className,
  onClose,
  children,
}: {
  labelledBy: string;
  className: string;
  onClose: () => void;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useLayoutEffect(() => {
    ref.current?.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);
  return (
    <dialog
      ref={ref}
      className={className}
      aria-labelledby={labelledBy}
      tabIndex={0}
      onCancel={onClose}
      onClick={(event) => {
        const box = event.currentTarget.getBoundingClientRect();
        const outside =
          event.clientX < box.left ||
          event.clientX > box.right ||
          event.clientY < box.top ||
          event.clientY > box.bottom;
        if (event.detail > 0 && outside) onClose();
      }}
    >
      {children}
    </dialog>
  );
}

export default function App() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(categories[0].label);
  const [selected, setSelected] = useState<Item | null>(null);
  const [tab, setTab] = useState("Preview");
  const [guide, setGuide] = useState(false);
  const [notice, setNotice] = useState("");
  const previews: Record<string, ReactNode> = useMemo(
    () => ({
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
      "motion-button": (
        <div className="motion-button-examples">
          <div>
            <MotionButton>
              Continue <ArrowRight size={16} aria-hidden="true" />
            </MotionButton>
            <MotionButton variant="secondary">
              <Download size={16} aria-hidden="true" /> Download
            </MotionButton>
            <MotionButton variant="outline">Outline</MotionButton>
            <MotionButton variant="ghost">Ghost</MotionButton>
          </div>
          <div>
            <MotionButton size="sm">Small</MotionButton>
            <MotionButton>Medium</MotionButton>
            <MotionButton size="lg">Large</MotionButton>
            <MotionButton
              variant="secondary"
              size="icon"
              aria-label="Delete example"
            >
              <Trash2 size={16} aria-hidden="true" />
            </MotionButton>
          </div>
          <div>
            <MotionButton ripple>Ripple</MotionButton>
            <MotionButton variant="outline" pressScale={0.85}>
              Tap me
            </MotionButton>
          </div>
        </div>
      ),
      "profile-card": (
        <ProfileCard
          onContact={() =>
            setNotice(
              "Contact clicked — connect this to your own contact flow.",
            )
          }
        />
      ),
      "feedback-widget": (
        <div className="feedback-example">
          <p>Have an idea? Try the feedback button.</p>
          <span>Interactive demo · nothing is sent</span>
          <FeedbackWidget
            onSubmit={() =>
              new Promise<void>((resolve) => window.setTimeout(resolve, 900))
            }
          />
        </div>
      ),
      "empty-state": (
        <EmptyState
          onAction={() =>
            setNotice("Create clicked — connect this to your own project flow.")
          }
        />
      ),
    }),
    [],
  );
  const missingPreview = <p>Add a preview in src/App.tsx.</p>;
  const match =
    categories.find((entry) => entry.label === category)?.match ?? (() => true);
  const items = designs.filter(
    (item) =>
      match(item) &&
      `${item.name} ${item.title} ${item.description}`
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
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
        <a
          className="brand"
          href="./"
          aria-label="Favorite Design Components home"
        >
          <img
            className="brand-mark"
            src={`${import.meta.env.BASE_URL}new_logo.svg`}
            width="42"
            height="42"
            alt=""
          />
          <span>
            Favorite<span className="brand-subtitle">Design Components</span>
          </span>
        </a>
        <nav aria-label="Collection categories">
          {categories.map(({ label, icon: Icon, match: inCategory }) => (
            <button
              key={label}
              aria-pressed={category === label}
              onClick={() => setCategory(label)}
            >
              <Icon size={18} aria-hidden="true" />
              {label}
              <span>{designs.filter(inCategory).length}</span>
            </button>
          ))}
        </nav>
        <a className="repo-link" href={repo} target="_blank" rel="noreferrer">
          <Code2 size={17} aria-hidden="true" /> GitHub repository{" "}
          <ArrowUpRight size={15} aria-hidden="true" />
        </a>
      </aside>
      <main>
        <header className="topbar">
          <span>
            Workspace <span className="slash">/</span>{" "}
            <strong>Collection</strong>
          </span>
        </header>
        <div className="main-content">
          <section className="intro">
            <div>
              <h1>
                Components.
                <br />
                <span>Ready to use.</span>
              </h1>
            </div>
            <div className="hero-actions">
              <a className="primary-action" href="#collection">
                Explore the collection{" "}
                <ArrowDownToLine size={16} aria-hidden="true" />
              </a>
              <button className="text-action" onClick={() => setGuide(true)}>
                Add a design <Plus size={17} aria-hidden="true" />
              </button>
            </div>
            <div className="hero-art" aria-hidden="true">
              <div className="art-orbit" />
              <div className="art-panel art-panel-back">
                <span />
                <span />
                <span />
              </div>
              <div className="art-panel art-panel-front">
                <div className="art-icon">
                  <Layers size={35} strokeWidth={1.4} />
                </div>
                <div className="art-line" />
                <div className="art-line short" />
                <div className="art-pill">
                  <Check size={18} />
                </div>
              </div>
              <div className="art-tile">
                <Code2 size={30} strokeWidth={1.6} />
              </div>
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
            <div className="design-grid" key={category + query}>
              {items.map((item) => (
                <article key={item.name} className="design-card">
                  <div className={`card-preview ${item.name}`}>
                    {previews[item.name] ?? missingPreview}
                  </div>
                  <div className="card-info">
                    <div>
                      <span className="item-type">{typeLabel(item.type)}</span>
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
                    setCategory(categories[0].label);
                  }}
                >
                  Reset filters
                </button>
              </div>
            )}
          </section>
          <section
            id="design-principles"
            className="principles-section"
            aria-labelledby="principles-title"
          >
            <div className="principles-heading">
              <h2 id="principles-title">Design principles</h2>
            </div>
            <article
              className="principles-text"
              aria-label="Agent design instructions"
              tabIndex={0}
            >
              <CopyButton
                className="principles-copy"
                label="Copy design principles"
                text={designPrinciples}
              />
              {designPrinciples
                .trim()
                .split("\n\n")
                .map((section) => {
                  const [title, ...body] = section.split("\n");
                  return (
                    <div className="principle" key={title}>
                      <h3>{title}</h3>
                      <p>{body.join("\n")}</p>
                    </div>
                  );
                })}
            </article>
          </section>
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
        <Modal
          labelledBy="design-title"
          className="detail-dialog"
          onClose={() => setSelected(null)}
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
              {previews[selected.name] ?? missingPreview}
            </div>
          ) : (
            sourcesFor(selected).map(({ path, code }) => (
              <div className="source-panel" key={path}>
                <CopyButton label="Copy source code" text={code} />
                <pre tabIndex={0} aria-label={path}>
                  <code>{code}</code>
                </pre>
              </div>
            ))
          )}
          {tab === "Code" && !sourcesFor(selected).length && (
            <p className="dialog-description">
              No source found for this design. Registry files must live directly
              in <code>registry/</code> to appear here.
            </p>
          )}
          <div className="install">
            <h3>
              <Terminal size={17} aria-hidden="true" /> Take it to your app
            </h3>
            <p>Run in a React + Tailwind project with shadcn initialized.</p>
            <div className="command">
              <code>{command(selected)}</code>
              <CopyButton
                key={selected.name}
                label="Copy install command"
                text={command(selected)}
              />
            </div>
            <small>
              {["localhost", "127.0.0.1"].includes(window.location.hostname)
                ? "Local preview commands work on this computer. Deploy the gallery for a shareable URL."
                : "Copies the source into your app. Customize it freely; updates are not automatic."}
            </small>
          </div>
        </Modal>
      )}
      {guide && (
        <Modal
          labelledBy="guide-title"
          className="guide-dialog"
          onClose={() => setGuide(false)}
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
        </Modal>
      )}
    </div>
  );
}
