"use client";

import { useParams, useRouter } from "next/navigation";
import { Progress } from "@/components/ui/progress";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import api from "@/api";
import { useEffect, useMemo, useState } from "react";
import withAuth from "@/components/withAuth";
import LeftSideBar from "@/components/widgets/dashboard-widgets/left-sidebar";
import MainScreenFlexIntXP from "@/components/widgets/dashboard-widgets/main-screen-intxp";
import Link from "next/link";
import ProgressFloat from "@/components/widgets/progress-float";
import { CircleAlert, CircleCheck } from "lucide-react";

type CourseItem = {
  id?: number | string;
  title?: string;
  overview?: string;
  description?: string;
  published?: boolean;
  is_active?: boolean;
  image?: string;
};

type ModuleItem = {
  id: number | string;
  title: string;
  description: string;
  course?: number | string;
};

type ContentItem = {
  id: number | string;
  title: string;
  content_type: string;
  module?: number | string;
  course?: number | string;
};

type PathwayItem = {
  id?: number | string;
  title?: string;
  published?: boolean;
  is_active?: boolean;
  courses?: Array<number | string | { id?: number | string }>;
};

const scientistAdjectives = [
  "Brilliant",
  "Curious",
  "Innovative",
  "Sharp",
  "Ingenious",
  "Diligent",
  "Methodical",
  "Precise",
  "Wise",
  "Thoughtful",
  "Analytical",
  "Persistent",
];

const normalizeIdArray = (value: unknown): number[] => {
  if (Array.isArray(value)) {
    return value.map((id) => Number(id)).filter((id) => !Number.isNaN(id));
  }
  const numeric = Number(value);
  return Number.isNaN(numeric) ? [] : [numeric];
};

const courseRefId = (course: number | string | { id?: number | string }) =>
  Number(typeof course === "object" ? course.id : course);

const clampProgress = (value: number) => Math.max(0, Math.min(100, value));

function Page() {
  const params = useParams();
  const courseId = Number(params.courseId);
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [loginDates, setLoginDates] = useState<string[]>([]);
  const [userXP, setUserXP] = useState("");
  const [title, setTitle] = useState("");
  const [subscriptionStatus, setSubscriptionStatus] = useState(false);
  const [completedContent, setCompletedContent] = useState("");
  const [progressPercent, setProgressPercent] = useState(0);
  const [activePathway, setActivePathway] = useState<PathwayItem | null>(null);
  const [coursesList, setCoursesList] = useState<CourseItem[]>([]);
  const [modulesList, setModulesList] = useState<ModuleItem[]>([]);
  const [contentList, setContentList] = useState<ContentItem[]>([]);
  const [popupDismissed, setPopupDismissed] = useState(false);
  const [popupRequestedTrigger, setPopupRequestedTrigger] = useState<string | null>(null);
  const [popupTrigger, setPopupTrigger] = useState<string | null>(null);
  const [popupData, setPopupData] = useState<{
    variant_id: number;
    headline: string;
    body: string;
    cta_text?: string;
    cta_url?: string;
  } | null>(null);

  const completedContentIds = useMemo(() => {
    return new Set(
      completedContent
        .split(",")
        .map((id) => id.trim())
        .filter((id) => id && id.toLowerCase() !== "none")
        .map((id) => Number(id))
        .filter((id) => !Number.isNaN(id))
    );
  }, [completedContent]);

  useEffect(() => {
    const fetchPageData = async () => {
      try {
        const profileResponse = await api.get("/api/get-user-profile/");
        if (!(profileResponse.data && (profileResponse.status === 200 || profileResponse.status === 201))) {
          router.push("/login");
          return;
        }

        const userProfile = profileResponse.data;
        setUsername(userProfile.username);
        setLoginDates(Array.isArray(userProfile.login_dates) ? userProfile.login_dates : []);

        const adjective = scientistAdjectives[Math.floor(Math.random() * scientistAdjectives.length)];
        setTitle(`${adjective} ${userProfile.username}`);

        const enrolledPathwayIds = normalizeIdArray(userProfile.Pathways);
        const [pathwayResponse, coursesResponse, modulesResponse, contentResponse, courseProgressResponse] =
          await Promise.all([
            api.get("/api/pathways/"),
            api.get("/api/courses/"),
            api.get("/api/modules/"),
            api.get("/api/contents/"),
            api.post("/api/user-course-progress/", { courseid: courseId }),
          ]);

        const enrolledPathways: PathwayItem[] = pathwayResponse.data.filter((pathway: PathwayItem) =>
          enrolledPathwayIds.includes(Number(pathway.id))
        );
        const matchingPathway =
          enrolledPathways.find((pathway) =>
            (pathway.courses || [])
              .map((course) => courseRefId(course))
              .filter((id) => !Number.isNaN(id))
              .includes(courseId)
          ) || null;

        setActivePathway(matchingPathway);

        const pathwayCourseIds = new Set(
          (matchingPathway?.courses || [])
            .map((course) => courseRefId(course))
            .filter((id) => !Number.isNaN(id))
        );
        if (pathwayCourseIds.size === 0) {
          pathwayCourseIds.add(courseId);
        }

        setCoursesList(
          coursesResponse.data.filter((course: CourseItem) =>
            pathwayCourseIds.has(Number(course.id))
          )
        );
        setModulesList(modulesResponse.data.filter((module: ModuleItem) => courseId === Number(module.course)));
        setContentList(contentResponse.data.filter((content: ContentItem) => courseId === Number(content.course)));

        const courseProgress = courseProgressResponse.data;
        setCompletedContent(courseProgress.completed_contents || "");
        setUserXP(String(courseProgress.total_xp_earned || userProfile.total_xp || 0));

        const subscriptionEnd = new Date(courseProgress.current_period_end);
        setSubscriptionStatus(subscriptionEnd.getTime() > Date.now());

        if (matchingPathway?.id) {
          const pathwayProgressResponse = await api.post("/api/progress/pathway/", {
            pathwayid: Number(matchingPathway.id),
          });
          const percent =
            typeof pathwayProgressResponse?.data?.completion_percent === "number"
              ? pathwayProgressResponse.data.completion_percent
              : 0;
          setProgressPercent(percent);
        } else {
          const courseProgressPercent = await api.post("/api/progress/course/", { courseid: courseId });
          const percent =
            typeof courseProgressPercent?.data?.completion_percent === "number"
              ? courseProgressPercent.data.completion_percent
              : 0;
          setProgressPercent(percent);
        }
      } catch (error) {
        console.error("Error fetching pathway course page data:", error);
        router.push("/login");
      }
    };

    fetchPageData();
  }, [courseId, router]);

  const resolvedTrigger =
    progressPercent >= 80
      ? "on_course_80"
      : progressPercent >= 50
        ? "on_course_50"
        : progressPercent >= 25
          ? "on_course_25"
          : null;

  const popupRequestKey = resolvedTrigger ? `${courseId}:${resolvedTrigger}` : null;
  const showProgressPopup = !!resolvedTrigger && !!popupData && !popupDismissed;
  const allowCta = popupTrigger === "on_course_50" || popupTrigger === "on_course_80";

  useEffect(() => {
    if (popupTrigger && resolvedTrigger && popupTrigger !== resolvedTrigger) {
      setPopupData(null);
      setPopupDismissed(false);
    }
  }, [resolvedTrigger, popupTrigger]);

  useEffect(() => {
    const fetchPopup = async () => {
      if (!resolvedTrigger || popupDismissed || !popupRequestKey) return;
      if (popupRequestedTrigger === popupRequestKey) return;
      setPopupRequestedTrigger(popupRequestKey);

      try {
        const res = await api.get("/api/popups/next/", {
          params: { course_id: courseId, trigger: resolvedTrigger },
        });
        if (res.status === 200 && res.data?.variant_id) {
          setPopupData(res.data);
          setPopupTrigger(resolvedTrigger);
          await api.post("/api/popups/impression/", {
            variant_id: res.data.variant_id,
            course_id: courseId,
          });
        }
      } catch (error) {
        console.error("Error fetching popup:", error);
      }
    };

    fetchPopup();
  }, [courseId, popupDismissed, popupRequestKey, popupRequestedTrigger, resolvedTrigger]);

  const handlePopupDismiss = async () => {
    if (popupData?.variant_id) {
      try {
        await api.post("/api/popups/action/", {
          variant_id: popupData.variant_id,
          action: "dismissed",
        });
      } catch (error) {
        console.error("Error logging dismiss:", error);
      }
    }
    setPopupDismissed(true);
  };

  const handlePopupCta = async () => {
    if (!popupData?.cta_url) return;
    if (popupData?.variant_id) {
      try {
        await api.post("/api/popups/action/", {
          variant_id: popupData.variant_id,
          action: "clicked",
        });
      } catch (error) {
        console.error("Error logging click:", error);
      }
    }
    setPopupDismissed(true);
    if (popupData.cta_url.startsWith("http")) {
      window.location.href = popupData.cta_url;
    } else {
      router.push(popupData.cta_url);
    }
  };

  const checkoutHref = activePathway?.id
    ? `/dashboard/checkout?prog=pathway&id=${activePathway.id}`
    : `/dashboard/checkout?prog=course&id=${courseId}`;

  const courseContentHref = (moduleId: string | number, contentId: string | number) =>
    subscriptionStatus
      ? `/dashboard/pathway/courses/${courseId}/module/${moduleId}/content/${contentId}`
      : checkoutHref;

  return (
    <main className="w-full">
      <div className="hidden md:flex w-full">
        <LeftSideBar />
        <div className="w-full bg-hb-lightgreen flex h-screen flex-col gap-8 overflow-y-auto pb-10">
          <MainScreenFlexIntXP
            username={username}
            mini_desc="Your Pathway Courses"
            userXP={userXP}
            title={title}
            loginDates={loginDates}
            contentClassName="max-w-6xl mx-auto w-full px-6 lg:px-8"
          />

          <div className="w-full max-w-6xl mx-auto px-6 lg:px-8">
            {coursesList
              .filter((course) => Number(course.id) === courseId)
              .map((course) => (
                <div key={course.id}>
                  {course.image ? (
                    <div className="mb-10 flex w-full flex-row items-end gap-5">
                      <img
                        src={course.image}
                        alt="course image"
                        className="h-48 w-48 rounded-md border-2 border-neutral-400 object-cover"
                      />
                      <div className="flex w-full flex-col gap-2">
                        <p className="font-bold text-3xl">{course.title}</p>
                        <p className="text-sm text-gray-600">
                          {activePathway?.title ? `${activePathway.title} Progress` : "Pathway Progress"}
                        </p>
                        <div className="flex w-full flex-row items-center justify-between gap-10 rounded-md border border-hb-green px-5 py-3">
                          <Progress value={Math.ceil(clampProgress(progressPercent))} />
                          <p className="rounded-full text-2xl font-bold">{Math.ceil(clampProgress(progressPercent))}%</p>
                        </div>
                      </div>
                    </div>
                  ) : null}

                  <p className="mb-10 text-sm text-red-600">
                    {subscriptionStatus ? "" : (
                      <span>
                        Your subscription to this pathway has expired.{" "}
                        <Link className="font-bold hover:underline" href={checkoutHref}>
                          Click here to subscribe now
                        </Link>
                      </span>
                    )}
                  </p>

                  {modulesList.map((module) => (
                    <div key={module.id} className="flex flex-col gap-5 pb-5">
                      <div className="flex w-full flex-col gap-5 rounded-md border border-hb-green bg-white px-6 py-4">
                        <Accordion type="multiple" className="flex w-full flex-col gap-5">
                          <AccordionItem value={module.id.toString()}>
                            <AccordionTrigger className="text-xl font-bold">{module.title}</AccordionTrigger>
                            <AccordionContent className="text-sm">
                              <div className="flex flex-col gap-5 pl-5 text-base text-gray-600">
                                {contentList
                                  .filter((content) => Number(content.module) === Number(module.id))
                                  .map((content) => {
                                    const isDone = completedContentIds.has(Number(content.id));
                                    return (
                                      <div key={content.id} className="flex flex-col gap-2">
                                        <ul className="list-none pl-0 text-base">
                                          <Link href={courseContentHref(module.id, content.id)} className="hover:underline">
                                            <li className="flex items-center gap-2">
                                              {isDone ? (
                                                <CircleCheck className="h-4 w-4 text-green-600" />
                                              ) : (
                                                <CircleAlert className="h-4 w-4 text-red-500" />
                                              )}
                                              <span>{content.title}</span>
                                            </li>
                                          </Link>
                                        </ul>
                                      </div>
                                    );
                                  })}
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
          </div>
        </div>
      </div>

      <div className="flex min-h-svh w-full flex-col bg-hb-lightgreen pb-20 md:hidden">
        <LeftSideBar />

        <MainScreenFlexIntXP
          username={username}
          mini_desc="Your Pathway Courses"
          userXP={userXP}
          title={title}
          loginDates={loginDates}
          contentClassName="max-w-6xl mx-auto w-full px-4"
        />

        <div className="min-h-svh flex-1 px-4 pb-20 pt-6">
          {coursesList
            .filter((course) => Number(course.id) === courseId)
            .map((course) => (
              <div key={course.id} className="flex flex-col gap-6">
                {course.image ? (
                  <div className="flex flex-col items-center gap-4">
                    <img
                      src={course.image}
                      alt="course image"
                      className="h-32 w-32 rounded-md border-2 border-neutral-400 object-cover"
                    />
                    <p className="text-center text-xl font-bold">{course.title}</p>

                    <div className="flex w-full items-center justify-between gap-3 rounded-md border border-hb-green bg-white px-4 py-2">
                      <p className="text-sm text-gray-600">Pathway Progress</p>
                      <Progress value={Math.ceil(clampProgress(progressPercent))} />
                      <p className="text-lg font-bold">{Math.ceil(clampProgress(progressPercent))}%</p>
                    </div>
                  </div>
                ) : null}

                <p className="text-sm text-red-600">
                  {subscriptionStatus ? "" : (
                    <span>
                      Your subscription to this pathway has expired.{" "}
                      <Link className="font-bold hover:underline" href={checkoutHref}>
                        Click here to subscribe now
                      </Link>
                    </span>
                  )}
                </p>

                {modulesList.map((module) => (
                  <div key={module.id} className="w-full rounded-lg border border-hb-green bg-white px-4 py-3">
                    <Accordion type="multiple">
                      <AccordionItem value={module.id.toString()}>
                        <AccordionTrigger className="text-lg font-bold">{module.title}</AccordionTrigger>
                        <AccordionContent>
                          <div className="flex flex-col gap-3 pl-2 text-sm text-gray-600">
                            {contentList
                              .filter((content) => Number(content.module) === Number(module.id))
                              .map((content) => {
                                const isDone = completedContentIds.has(Number(content.id));
                                return (
                                  <ul className="list-none pl-0" key={content.id}>
                                    <Link href={courseContentHref(module.id, content.id)} className="hover:underline">
                                      <li className="flex items-center gap-2">
                                        {isDone ? (
                                          <CircleCheck className="h-4 w-4 text-green-600" />
                                        ) : (
                                          <CircleAlert className="h-4 w-4 text-red-500" />
                                        )}
                                        <span>{content.title}</span>
                                      </li>
                                    </Link>
                                  </ul>
                                );
                              })}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                ))}
              </div>
            ))}
        </div>
      </div>

      {showProgressPopup && popupData ? (
        <ProgressFloat
          title={popupData.headline}
          message={popupData.body || ""}
          percent={progressPercent}
          ctaText={allowCta ? popupData.cta_text : undefined}
          onCta={allowCta && popupData.cta_url ? handlePopupCta : undefined}
          onClose={handlePopupDismiss}
        />
      ) : null}
    </main>
  );
}

const PageWrapper = () => <Page />;

export default withAuth({ children: <PageWrapper /> });
