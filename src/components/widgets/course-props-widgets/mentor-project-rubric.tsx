import { ListChecks, ShieldCheck } from "lucide-react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

type RubricCriterion = {
  title: string;
  description?: string;
  score?: string;
  checks?: string[];
};

type ParsedRubric = {
  criteria: RubricCriterion[];
  passThreshold?: string;
  requiresProjectLink?: boolean;
  rawMarkdown?: string;
};

const firstText = (
  value: Record<string, unknown>,
  keys: string[]
): string | undefined => {
  for (const key of keys) {
    const candidate = value[key];
    if (typeof candidate === "string" && candidate.trim()) {
      return candidate.trim();
    }
  }
  return undefined;
};

const parseCriterion = (value: unknown, index: number): RubricCriterion => {
  if (typeof value === "string") {
    return { title: value };
  }
  if (!value || typeof value !== "object") {
    return { title: `Criterion ${index + 1}` };
  }

  const criterion = value as Record<string, unknown>;
  const title =
    firstText(criterion, ["title", "name", "criterion", "requirement"]) ||
    `Criterion ${index + 1}`;
  const description = firstText(criterion, [
    "description",
    "expectation",
    "details",
    "feedback",
    "hint",
  ]);
  const scoreValue =
    criterion.weight ?? criterion.points ?? criterion.max_score ?? criterion.score;
  const score =
    typeof scoreValue === "number" || typeof scoreValue === "string"
      ? String(scoreValue)
      : undefined;

  const checks: string[] = [];
  const addList = (key: string, label: string) => {
    const raw = criterion[key];
    const values = Array.isArray(raw)
      ? raw.map(String).filter(Boolean)
      : typeof raw === "string" && raw.trim()
        ? [raw.trim()]
        : [];
    if (values.length) checks.push(`${label}: ${values.join(", ")}`);
  };

  addList("required_keywords", "Required keywords");
  addList("keywords", "Required keywords");
  addList("must_have", "Required elements");
  addList("required_calls", "Required function calls");
  addList("forbidden_keywords", "Forbidden keywords");
  addList("forbidden_calls", "Forbidden function calls");

  return { title, description, score, checks };
};

const parseRubric = (rubric: string): ParsedRubric => {
  const trimmed = rubric.trim();
  if (!trimmed) return { criteria: [] };

  try {
    const value = JSON.parse(trimmed) as unknown;
    const root = Array.isArray(value)
      ? { criteria: value }
      : value && typeof value === "object"
        ? (value as Record<string, unknown>)
        : null;

    if (!root) return { criteria: [], rawMarkdown: trimmed };

    const rawCriteria = Array.isArray(root.criteria)
      ? root.criteria
      : Array.isArray(root.rubric)
        ? root.rubric
        : [];
    const threshold = root.pass_threshold ?? root.passThreshold;

    return {
      criteria: rawCriteria.map(parseCriterion),
      passThreshold:
        typeof threshold === "number" || typeof threshold === "string"
          ? `${threshold}%`
          : undefined,
      requiresProjectLink: Boolean(
        root.require_project_link ?? root.requiresProjectLink
      ),
    };
  } catch {
    return { criteria: [], rawMarkdown: trimmed };
  }
};

export default function MentorProjectRubric({
  isMentor,
  rubric,
  contentType = "project",
}: {
  isMentor: boolean;
  rubric?: string | null;
  contentType?: "project" | "codeTask";
}) {
  if (!isMentor) return null;

  const parsed = parseRubric(String(rubric || ""));
  const contentLabel = contentType === "codeTask" ? "code task" : "project";

  return (
    <aside className="my-5 border-l-4 border-[#27AE60] bg-emerald-50 px-4 py-4 text-[#173b27] dark:bg-emerald-950/35 dark:text-emerald-50">
      <div className="flex items-start gap-3">
        <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#27AE60]" />
        <div className="min-w-0 flex-1">
          <p className="text-base font-semibold">
            Mentor reference: {contentLabel} rubric
          </p>
          <p className="mt-1 text-sm text-emerald-900/75 dark:text-emerald-100/75">
            Visible only to mentors. Use these expectations when reviewing an
            intern&apos;s {contentLabel} question or grading complaint.
          </p>

          {!rubric?.trim() ? (
            <p className="mt-4 text-sm">
              No rubric has been added to this {contentLabel} yet.
            </p>
          ) : parsed.rawMarkdown ? (
            <div className="prose prose-sm mt-4 max-w-none text-inherit dark:prose-invert">
              <Markdown remarkPlugins={[remarkGfm]}>{parsed.rawMarkdown}</Markdown>
            </div>
          ) : (
            <div className="mt-4">
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                {parsed.passThreshold ? (
                  <span>Pass threshold: {parsed.passThreshold}</span>
                ) : null}
                {parsed.requiresProjectLink ? (
                  <span>Project link required</span>
                ) : null}
              </div>
              {parsed.criteria.length ? (
                <ol className="mt-4 space-y-3">
                  {parsed.criteria.map((criterion, index) => (
                    <li key={`${criterion.title}-${index}`} className="flex gap-3">
                      <ListChecks className="mt-0.5 h-4 w-4 shrink-0 text-[#27AE60]" />
                      <div className="min-w-0">
                        <p className="text-sm font-semibold">
                          {criterion.title}
                          {criterion.score ? ` (${criterion.score})` : ""}
                        </p>
                        {criterion.description ? (
                          <p className="mt-1 text-sm leading-6 text-emerald-900/80 dark:text-emerald-100/80">
                            {criterion.description}
                          </p>
                        ) : null}
                        {criterion.checks?.length ? (
                          <ul className="mt-2 space-y-1 text-sm leading-6 text-emerald-900/80 dark:text-emerald-100/80">
                            {criterion.checks.map((check) => (
                              <li key={check}>{check}</li>
                            ))}
                          </ul>
                        ) : null}
                      </div>
                    </li>
                  ))}
                </ol>
              ) : (
                <p className="mt-4 text-sm">No criteria are listed in this rubric.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
