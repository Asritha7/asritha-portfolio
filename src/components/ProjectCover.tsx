/**
 * ProjectCover - reusable editorial SVG cover system.
 * One consistent visual language across project cards, case studies, notes,
 * and earlier public projects. Pure SVG, theme-aware via CSS variables, no
 * baked-in text. Decorative shapes are hidden from AT; the wrapper carries
 * the meaningful alt via role="img" + aria-label.
 */
import type { CSSProperties } from "react";

export type CoverVariant =
  | "aws-microservices-cdk-ecs"
  | "automation-framework"
  | "keycloak-identity-flow"
  | "kafka-strimzi-upgrade"
  | "kubernetes-cicd-reliability"
  | "rfid-pin-authentication-research"
  | "note"
  | "public";

type Ratio = "16/9" | "4/3" | "3/2";

const RATIO_CLASS: Record<Ratio, string> = {
  "16/9": "aspect-[16/9]",
  "4/3": "aspect-[4/3]",
  "3/2": "aspect-[3/2]",
};

const ALT: Record<CoverVariant, string> = {
  "aws-microservices-cdk-ecs":
    "Abstract architecture sketch: an API gateway routing into a tier of three ECS Fargate services with running tasks, connected to a data store, with one service highlighted as the scope of my work.",
  "automation-framework":
    "Abstract illustration of reusable automation modules moving through a delivery pipeline with branching validation states.",
  "keycloak-identity-flow":
    "Abstract illustration of identity nodes and configuration layers converging through a key motif into a consistent state.",
  "kafka-strimzi-upgrade":
    "Abstract illustration of message streams flowing through a clustered system with two distinct upgrade phases.",
  "kubernetes-cicd-reliability":
    "Abstract illustration of a rollout path with pods and configuration signals, with one failed state isolated.",
  "rfid-pin-authentication-research":
    "Abstract illustration of a two-stage authentication flow combining an RFID card and a keypad pattern.",
  note: "Abstract editorial sketch of a notebook page with checklist marks and a small decision tree.",
  public: "Simple editorial mark indicating a learning project.",
};

export function ProjectCover({
  variant,
  ratio = "16/9",
  className = "",
  style,
  rounded = true,
}: {
  variant: CoverVariant;
  ratio?: Ratio;
  className?: string;
  style?: CSSProperties;
  rounded?: boolean;
}) {
  return (
    <div
      role="img"
      aria-label={ALT[variant]}
      className={[
        "project-cover relative w-full overflow-hidden border border-hairline",
        rounded ? "rounded-[3px]" : "",
        RATIO_CLASS[ratio],
        className,
      ].join(" ")}
      style={{ background: "var(--warm-fill)", ...style }}
    >
      <CoverArt variant={variant} />
    </div>
  );
}

function CoverArt({ variant }: { variant: CoverVariant }) {
  switch (variant) {
    case "aws-microservices-cdk-ecs":
      return <AwsCover />;
    case "automation-framework":
      return <AutomationCover />;
    case "keycloak-identity-flow":
      return <KeycloakCover />;
    case "kafka-strimzi-upgrade":
      return <KafkaCover />;
    case "kubernetes-cicd-reliability":
      return <K8sCover />;
    case "rfid-pin-authentication-research":
      return <RfidCover />;
    case "note":
      return <NoteCover />;
    case "public":
      return <PublicCover />;
  }
}

/* ---------- shared svg props ---------- */
const SVG_PROPS = {
  viewBox: "0 0 320 180",
  width: "100%",
  height: "100%",
  preserveAspectRatio: "xMidYMid slice",
  "aria-hidden": true as const,
  focusable: false as const,
};
const INK = "var(--foreground)";
const ACCENT = "var(--accent-terra)";
const HAIR = "var(--hairline)";
const PANEL = "var(--panel)";

/* ---------- 1. AWS microservices ---------- */
function AwsCover() {
  // Architecture: API Gateway (left) → ECS Fargate service tier (3 services, each with
  // running tasks) → data layer (right). A dashed boundary marks "my scope".
  const services = [110, 160, 210]; // x centers
  return (
    <svg {...SVG_PROPS}>
      {/* faint cloud boundary */}
      <path
        d="M 14 132 Q 8 108 26 102 Q 22 78 50 78 Q 56 58 84 64 Q 102 46 128 60 Q 156 48 176 66 Q 210 54 226 76 Q 256 74 260 96 Q 286 100 282 124 Q 296 138 280 150 L 30 150 Q 8 148 14 132 Z"
        fill="none"
        stroke={INK}
        strokeWidth="0.6"
        opacity="0.22"
        strokeDasharray="2 3"
      />

      {/* API Gateway (hex) */}
      <g>
        <polygon
          points="40,82 56,90 56,108 40,116 24,108 24,90"
          fill={PANEL}
          stroke={INK}
          strokeWidth="1"
        />
        <path d="M 32 99 H 48 M 36 95 H 44 M 36 103 H 44" stroke={INK} strokeWidth="0.7" opacity="0.6" />
      </g>

      {/* connector from gateway into service tier */}
      <path d="M 56 99 H 82" stroke={INK} strokeWidth="0.9" opacity="0.55" />
      <path d="M 78 96 L 84 99 L 78 102" fill="none" stroke={INK} strokeWidth="0.9" opacity="0.55" />

      {/* ECS service tier: 3 services, each with 3 task circles */}
      {services.map((x, i) => (
        <g key={i}>
          <rect
            x={x - 22}
            y={64}
            width="44"
            height="70"
            rx="3"
            fill={PANEL}
            stroke={INK}
            strokeWidth="0.9"
          />
          {/* service header bar */}
          <rect x={x - 22} y={64} width="44" height="10" rx="3" fill={INK} opacity="0.78" />
          <rect x={x - 18} y={68} width="22" height="2" rx="1" fill={PANEL} opacity="0.9" />
          {/* tasks */}
          {[86, 102, 118].map((ty, ti) => (
            <g key={ti}>
              <circle
                cx={x - 10}
                cy={ty}
                r="3.2"
                fill={ti === 0 ? ACCENT : PANEL}
                stroke={INK}
                strokeWidth="0.7"
              />
              <line x1={x - 4} y1={ty} x2={x + 14} y2={ty} stroke={INK} strokeWidth="0.6" opacity="0.45" />
            </g>
          ))}
        </g>
      ))}

      {/* inter-service mesh lines (faint) */}
      <g stroke={INK} strokeWidth="0.6" opacity="0.3">
        <path d="M 132 80 H 138" />
        <path d="M 182 80 H 188" />
        <path d="M 132 118 H 138" />
        <path d="M 182 118 H 188" />
      </g>

      {/* connector to data tier */}
      <path d="M 232 99 H 256" stroke={INK} strokeWidth="0.9" opacity="0.55" />
      <path d="M 252 96 L 258 99 L 252 102" fill="none" stroke={INK} strokeWidth="0.9" opacity="0.55" />

      {/* Data layer (cylinder) */}
      <g>
        <ellipse cx="278" cy="78" rx="18" ry="5" fill={PANEL} stroke={INK} strokeWidth="0.9" />
        <path d="M 260 78 V 118 Q 278 124 296 118 V 78" fill={PANEL} stroke={INK} strokeWidth="0.9" />
        <ellipse cx="278" cy="78" rx="18" ry="5" fill="none" stroke={INK} strokeWidth="0.7" opacity="0.7" />
        <ellipse cx="278" cy="92" rx="18" ry="5" fill="none" stroke={INK} strokeWidth="0.5" opacity="0.45" />
        <ellipse cx="278" cy="106" rx="18" ry="5" fill="none" stroke={INK} strokeWidth="0.5" opacity="0.35" />
      </g>

      {/* "My scope" highlight around the middle service */}
      <rect
        x={services[1] - 30}
        y={56}
        width="60"
        height="86"
        rx="4"
        fill="none"
        stroke={ACCENT}
        strokeWidth="1.4"
        strokeDasharray="4 3"
      />
      <rect
        x={services[1] - 30}
        y={56}
        width="60"
        height="86"
        rx="4"
        fill={ACCENT}
        opacity="0.08"
      />

      {/* baseline */}
      <line x1="14" y1="158" x2="306" y2="158" stroke={HAIR} strokeWidth="0.6" />
    </svg>
  );
}

/* ---------- 2. Automation framework ---------- */
function AutomationCover() {
  return (
    <svg {...SVG_PROPS}>
      {/* pipeline rail */}
      <line x1="20" y1="90" x2="300" y2="90" stroke={INK} strokeWidth="0.8" opacity="0.4" />
      {/* modular blocks moving through pipeline */}
      {[40, 90, 140, 190, 240].map((x, i) => (
        <g key={i}>
          <rect
            x={x - 14}
            y={76}
            width="28"
            height="28"
            rx="2"
            fill={i === 2 ? ACCENT : PANEL}
            stroke={HAIR}
            strokeWidth="0.8"
          />
          <line x1={x - 6} y1={84} x2={x + 6} y2={84} stroke={INK} strokeWidth="0.6" opacity="0.5" />
          <line x1={x - 6} y1={90} x2={x + 6} y2={90} stroke={INK} strokeWidth="0.6" opacity="0.5" />
          <line x1={x - 6} y1={96} x2={x + 2} y2={96} stroke={INK} strokeWidth="0.6" opacity="0.5" />
        </g>
      ))}
      {/* branching validation states */}
      <path d="M 240 76 C 260 60, 275 50, 290 40" fill="none" stroke={ACCENT} strokeWidth="0.9" />
      <path d="M 240 104 C 260 120, 275 130, 290 140" fill="none" stroke={INK} strokeWidth="0.9" opacity="0.45" />
      <circle cx="292" cy="40" r="4" fill={ACCENT} />
      <circle cx="292" cy="140" r="4" fill="none" stroke={INK} strokeWidth="0.9" opacity="0.5" />
      {/* diagnostic output */}
      <g opacity="0.55">
        <line x1="20" y1="140" x2="80" y2="140" stroke={INK} strokeWidth="0.6" />
        <line x1="20" y1="148" x2="100" y2="148" stroke={INK} strokeWidth="0.6" />
        <line x1="20" y1="156" x2="72" y2="156" stroke={INK} strokeWidth="0.6" />
      </g>
    </svg>
  );
}

/* ---------- 3. Keycloak identity flow ---------- */
function KeycloakCover() {
  return (
    <svg {...SVG_PROPS}>
      {/* config layers */}
      {[50, 64, 78].map((y, i) => (
        <rect key={i} x="30" y={y} width="120" height="8" rx="1" fill={PANEL} stroke={HAIR} strokeWidth="0.6" opacity={1 - i * 0.12} />
      ))}
      {/* mismatched identity nodes converging */}
      <g>
        <circle cx="40" cy="120" r="6" fill={PANEL} stroke={INK} strokeWidth="0.8" />
        <circle cx="64" cy="132" r="6" fill={PANEL} stroke={INK} strokeWidth="0.8" />
        <circle cx="88" cy="118" r="6" fill={PANEL} stroke={INK} strokeWidth="0.8" />
        <circle cx="112" cy="134" r="6" fill={PANEL} stroke={INK} strokeWidth="0.8" />
        <circle cx="136" cy="122" r="6" fill={PANEL} stroke={INK} strokeWidth="0.8" />
        <path d="M 40 120 Q 90 90 160 100" stroke={INK} strokeWidth="0.6" fill="none" opacity="0.4" />
        <path d="M 64 132 Q 110 100 160 100" stroke={INK} strokeWidth="0.6" fill="none" opacity="0.4" />
        <path d="M 88 118 Q 120 100 160 100" stroke={INK} strokeWidth="0.6" fill="none" opacity="0.4" />
        <path d="M 112 134 Q 140 110 160 100" stroke={INK} strokeWidth="0.6" fill="none" opacity="0.4" />
        <path d="M 136 122 Q 150 110 160 100" stroke={INK} strokeWidth="0.6" fill="none" opacity="0.4" />
      </g>
      {/* key motif on the right */}
      <g transform="translate(190 70)">
        <circle cx="20" cy="30" r="14" fill="none" stroke={ACCENT} strokeWidth="1.6" />
        <circle cx="20" cy="30" r="4" fill={ACCENT} />
        <rect x="34" y="27" width="70" height="6" fill={ACCENT} />
        <rect x="92" y="33" width="6" height="8" fill={ACCENT} />
        <rect x="80" y="33" width="6" height="10" fill={ACCENT} />
      </g>
      {/* consistent target */}
      <rect x="155" y="92" width="14" height="16" rx="2" fill={ACCENT} opacity="0.18" stroke={ACCENT} strokeWidth="0.8" />
    </svg>
  );
}

/* ---------- 4. Kafka / Strimzi ---------- */
function KafkaCover() {
  return (
    <svg {...SVG_PROPS}>
      {/* two phases divider */}
      <line x1="160" y1="20" x2="160" y2="160" stroke={HAIR} strokeWidth="0.8" strokeDasharray="2 3" />
      {/* operator phase (left) - small control plane diamonds */}
      <g>
        {[40, 80, 120].map((x, i) => (
          <g key={i}>
            <rect x={x - 12} y="42" width="24" height="24" rx="2" fill={PANEL} stroke={HAIR} strokeWidth="0.6" />
            <circle cx={x} cy="54" r="3" fill={ACCENT} opacity={i === 1 ? 1 : 0.4} />
          </g>
        ))}
        <line x1="40" y1="66" x2="120" y2="66" stroke={INK} strokeWidth="0.6" opacity="0.4" />
      </g>
      {/* broker phase (right) - cluster nodes */}
      <g>
        {[200, 240, 280].map((x) => (
          <rect key={x} x={x - 14} y="42" width="28" height="60" rx="2" fill={PANEL} stroke={HAIR} strokeWidth="0.6" />
        ))}
        {[200, 240, 280].map((x) => (
          <g key={`b-${x}`}>
            <circle cx={x} cy="56" r="2.5" fill={ACCENT} />
            <circle cx={x} cy="70" r="2.5" fill={INK} opacity="0.4" />
            <circle cx={x} cy="84" r="2.5" fill={INK} opacity="0.4" />
          </g>
        ))}
      </g>
      {/* message streams flowing across */}
      <g stroke={ACCENT} strokeWidth="1" fill="none" opacity="0.85">
        <path d="M 20 130 Q 90 110 160 130 T 300 130" />
        <path d="M 20 140 Q 90 122 160 140 T 300 140" opacity="0.55" />
        <path d="M 20 150 Q 90 134 160 150 T 300 150" opacity="0.35" />
      </g>
    </svg>
  );
}

/* ---------- 5. Kubernetes CI/CD ---------- */
function K8sCover() {
  return (
    <svg {...SVG_PROPS}>
      {/* rollout path */}
      <path d="M 20 90 H 300" stroke={INK} strokeWidth="0.8" opacity="0.35" />
      {/* hex-ish pods rolling out */}
      {[50, 100, 150, 200, 250].map((x, i) => {
        const failed = i === 2;
        const pending = i === 4;
        return (
          <g key={i}>
            <polygon
              points={`${x},72 ${x + 14},80 ${x + 14},100 ${x},108 ${x - 14},100 ${x - 14},80`}
              fill={failed ? PANEL : pending ? PANEL : ACCENT}
              fillOpacity={failed ? 1 : pending ? 1 : 0.85}
              stroke={failed ? ACCENT : HAIR}
              strokeWidth={failed ? 1.4 : 0.8}
            />
            {failed ? (
              <>
                <line x1={x - 5} y1={85} x2={x + 5} y2={95} stroke={ACCENT} strokeWidth="1.2" />
                <line x1={x + 5} y1={85} x2={x - 5} y2={95} stroke={ACCENT} strokeWidth="1.2" />
              </>
            ) : pending ? (
              <circle cx={x} cy={90} r="2.4" fill={INK} opacity="0.5" />
            ) : (
              <circle cx={x} cy={90} r="2.4" fill={PANEL} />
            )}
          </g>
        );
      })}
      {/* isolation ring around failed pod */}
      <circle cx="150" cy="90" r="26" fill="none" stroke={ACCENT} strokeWidth="0.8" strokeDasharray="3 2" />
      {/* config signals / events */}
      <g opacity="0.55" stroke={INK} strokeWidth="0.6">
        <line x1="20" y1="40" x2="60" y2="40" />
        <line x1="20" y1="48" x2="80" y2="48" />
        <line x1="240" y1="140" x2="300" y2="140" />
        <line x1="220" y1="148" x2="300" y2="148" />
      </g>
    </svg>
  );
}

/* ---------- 6. RFID + PIN ---------- */
function RfidCover() {
  return (
    <svg {...SVG_PROPS}>
      {/* stage 1: RFID card with concentric waves */}
      <g transform="translate(50 50)">
        <rect x="0" y="0" width="80" height="50" rx="4" fill={PANEL} stroke={INK} strokeWidth="0.8" />
        <circle cx="20" cy="25" r="5" fill="none" stroke={ACCENT} strokeWidth="1.1" />
        <path d="M 30 18 A 12 12 0 0 1 30 32" fill="none" stroke={ACCENT} strokeWidth="1.1" />
        <path d="M 36 14 A 18 18 0 0 1 36 36" fill="none" stroke={ACCENT} strokeWidth="0.9" opacity="0.6" />
        <line x1="48" y1="20" x2="72" y2="20" stroke={INK} strokeWidth="0.6" opacity="0.4" />
        <line x1="48" y1="28" x2="68" y2="28" stroke={INK} strokeWidth="0.6" opacity="0.4" />
        <line x1="48" y1="36" x2="72" y2="36" stroke={INK} strokeWidth="0.6" opacity="0.4" />
      </g>
      {/* arrow between stages */}
      <path d="M 140 90 H 175 L 170 86 M 175 90 L 170 94" stroke={INK} strokeWidth="1" fill="none" opacity="0.6" />
      {/* stage 2: keypad */}
      <g transform="translate(190 40)">
        <rect x="0" y="0" width="70" height="90" rx="4" fill={PANEL} stroke={INK} strokeWidth="0.8" />
        {[0, 1, 2].map((r) =>
          [0, 1, 2].map((c) => {
            const k = r * 3 + c;
            const active = k === 1 || k === 4 || k === 7;
            return (
              <circle
                key={`${r}-${c}`}
                cx={14 + c * 21}
                cy={18 + r * 22}
                r="6"
                fill={active ? ACCENT : "none"}
                stroke={active ? ACCENT : INK}
                strokeOpacity={active ? 1 : 0.5}
                strokeWidth="0.8"
              />
            );
          }),
        )}
      </g>
      {/* access path baseline */}
      <line x1="30" y1="150" x2="290" y2="150" stroke={HAIR} strokeWidth="0.6" />
      <circle cx="30" cy="150" r="3" fill={ACCENT} />
      <circle cx="290" cy="150" r="3" fill={ACCENT} />
    </svg>
  );
}

/* ---------- 7. Engineering note (editorial sketch) ---------- */
function NoteCover() {
  return (
    <svg {...SVG_PROPS}>
      {/* notebook page */}
      <rect x="40" y="24" width="160" height="132" rx="2" fill={PANEL} stroke={HAIR} strokeWidth="0.8" />
      {/* margin */}
      <line x1="58" y1="24" x2="58" y2="156" stroke={ACCENT} strokeWidth="0.6" opacity="0.7" />
      {/* checklist lines */}
      {[44, 62, 80, 98, 116, 134].map((y, i) => (
        <g key={y}>
          <rect x="66" y={y} width="6" height="6" rx="1" fill={i < 2 ? ACCENT : "none"} stroke={INK} strokeWidth="0.6" />
          <line x1="78" y1={y + 3} x2={i % 2 === 0 ? 180 : 160} y2={y + 3} stroke={INK} strokeWidth="0.6" opacity="0.55" />
        </g>
      ))}
      {/* decision tree sketch */}
      <g transform="translate(220 40)" stroke={INK} strokeWidth="0.7" fill="none" opacity="0.75">
        <circle cx="30" cy="10" r="4" fill={PANEL} />
        <line x1="30" y1="14" x2="14" y2="36" />
        <line x1="30" y1="14" x2="46" y2="36" />
        <circle cx="14" cy="40" r="4" fill={PANEL} />
        <circle cx="46" cy="40" r="4" fill={ACCENT} stroke={ACCENT} />
        <line x1="46" y1="44" x2="34" y2="64" />
        <line x1="46" y1="44" x2="58" y2="64" />
        <circle cx="34" cy="68" r="4" fill={PANEL} />
        <circle cx="58" cy="68" r="4" fill={PANEL} />
      </g>
    </svg>
  );
}

/* ---------- 8. Public / learning ---------- */
function PublicCover() {
  return (
    <svg {...SVG_PROPS}>
      <g opacity="0.85">
        <circle cx="160" cy="90" r="42" fill="none" stroke={HAIR} strokeWidth="0.8" />
        <circle cx="160" cy="90" r="28" fill="none" stroke={HAIR} strokeWidth="0.8" />
        <circle cx="160" cy="90" r="14" fill={ACCENT} opacity="0.85" />
      </g>
      <g stroke={INK} strokeWidth="0.6" opacity="0.4">
        <line x1="30" y1="40" x2="80" y2="40" />
        <line x1="30" y1="48" x2="60" y2="48" />
        <line x1="240" y1="140" x2="290" y2="140" />
        <line x1="260" y1="148" x2="290" y2="148" />
      </g>
    </svg>
  );
}

/* ---------- map a study slug to a variant (for callers) ---------- */
export function coverVariantForSlug(slug: string): CoverVariant {
  switch (slug) {
    case "aws-microservices-cdk-ecs":
    case "automation-framework":
    case "keycloak-identity-flow":
    case "kafka-strimzi-upgrade":
    case "kubernetes-cicd-reliability":
    case "rfid-pin-authentication-research":
      return slug;
    default:
      return "public";
  }
}
