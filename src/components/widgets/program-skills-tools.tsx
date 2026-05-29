export type SkillTool = {
  id?: number | string;
  name?: string;
  item_type?: "skill" | "tool" | string;
  icon_key?: string | null;
  icon_image?: string | null;
};

type ProgramSkillsToolsProps = {
  items?: SkillTool[];
};

const fallbackIcons: Record<string, string> = {
  linux: "/svgs/linux.png",
  python: "/svgs/py.png",
  py: "/svgs/py.png",
  r: "/svgs/R.png",
  rstudio: "/svgs/R.png",
  "r-studio": "/svgs/R.png",
  "r-rstudio": "/svgs/R.png",
  "r-and-rstudio": "/svgs/R.png",
};

function iconFor(item: SkillTool) {
  if (item.icon_image) {
    return item.icon_image;
  }

  const key = `${item.icon_key || item.name || ""}`.toLowerCase().replace(/&/g, "and").replace(/\s+/g, "-");
  return fallbackIcons[key] || fallbackIcons[key.replace(/[^a-z0-9-]/g, "")] || "";
}

export default function ProgramSkillsTools({ items = [] }: ProgramSkillsToolsProps) {
  const visibleItems = items.filter((item) => item?.name);

  if (!visibleItems.length) {
    return null;
  }

  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-8 md:px-10">
      <h2 className="mb-4 text-2xl font-bold text-[#1f1f24] dark:text-white">Skills &amp; Tools you will learn</h2>
      <div className="flex flex-wrap items-center gap-x-8 gap-y-5 rounded-sm border border-hb-green px-5 py-4 dark:border-hb-green/70 dark:bg-[#111827] sm:gap-x-14 sm:px-6">
        {visibleItems.map((item) => {
          const icon = iconFor(item);

          return (
            <div key={item.id || item.name} className="flex min-w-0 max-w-full items-center gap-2">
              {icon ? (
                <img src={icon} alt="" className="h-12 w-12 rounded-lg object-contain" />
              ) : (
                <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-hb-lightgreen text-base font-bold text-hb-green dark:bg-[#0f241a]">
                  {item.name?.slice(0, 1)}
                </span>
              )}
              <span className="min-w-0 break-words text-base font-bold text-[#1f1f24] dark:text-white">{item.name}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
