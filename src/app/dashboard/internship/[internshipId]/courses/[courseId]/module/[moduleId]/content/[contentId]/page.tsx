"use client"
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress"
import Image from "next/image";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import NotebookViewer from "@/components/nbc/notebook";
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import api from "@/api";
import { useState, useEffect } from "react";
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeKatex from 'rehype-katex'
import remarkMath from 'remark-math'
import withAuth from "@/components/withAuth";
import 'katex/dist/katex.min.css';
import 'highlight.js/styles/github.css'; // or another theme
// remark plugins
import { toast } from "sonner"

// rehype plugins
import LeftSideBar from "@/components/widgets/dashboard-widgets/left-sidebar";
import TocLink from "@/components/widgets/dashboard-widgets/toc-link";
import HbButton from "@/components/widgets/hb-buttons";
import Video from "@/components/widgets/course-props-widgets/video";
import TextContent from "@/components/widgets/course-props-widgets/text";
import WebRPy from "@/components/widgets/course-props-widgets/webrpy";
import Link from "next/link";
import ProgressFloat from "@/components/widgets/progress-float";

const formatLocalDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const buildLast7Days = (loginDates: string[]) => {
  const dateSet = new Set(loginDates);
  const today = new Date();
  return Array.from({ length: 7 }, (_, index) => {
    const offset = 6 - index;
    const day = new Date(today);
    day.setDate(today.getDate() - offset);
    const key = formatLocalDate(day);
    return dateSet.has(key);
  });
};

const CONTENT_META: Record<string, { icon: string; label: string }> = {
  video: { icon: "🎥", label: "Video" },
  text: { icon: "📄", label: "Reading" },
  quiz: { icon: "❓", label: "Checkpoint" },
  project: { icon: "🧩", label: "Project" },
  codeTask: { icon: "💻", label: "Code Task" },
  jupyter: { icon: "📓", label: "Notebook" },
  submit: { icon: "✅", label: "Submit" },
  certificate: { icon: "🏅", label: "Certificate" },
};




function Page() {

  const params = useParams()
  const courseId = Number(params.courseId);
  const moduleId = Number(params.moduleId);
  const globalInternshipId = Number(params.internshipId);
  const contentId = Number(params.contentId);
  const router = useRouter()

  const [username, setUsername] = useState("");
  const [loginDates, setLoginDates] = useState<string[]>([]);
  const [cert, setCert] = useState(false);
  const [userXP, setUserXP] = useState("");
  const [userClicks, setUserClicks] = useState<number>(1);
  const [completedContent, setCompletedContent] = useState<string>('');
  const [uniqCContent, setUniqCContent] = useState<Set<string>>(new Set());
  const [uniqueContentId, setUniqueContentId] = useState<number>(0);
  const [totalContent, setTotalContent] = useState<number>(0);
  const [mcqGraded, setMcqGraded] = useState(false);
  const [userInternshipId, setUserInternshipId] = useState<number[]>([]);
  const [improve, setImprove] = useState<string>("waiting for review...");
  const [userCoursesId, setUserCoursesId] = useState<number[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState("none");
  const [hintClicked, setHintClicked] = useState<boolean>(false);
  const [totalXP, setTotalXP] = useState<number>(1);
  const [certSkill, setCertSkill] = useState("");
   const [progressPercent, setProgressPercent] = useState<number>(0);
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
  const [stepsOpen, setStepsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"learn" | "practice" | "steps" | "resources">("learn");
  const [certPreparedness, setCertPreparedness] = useState("");
  const [certImprovement, setCertImprovement] = useState("");
  const [certError, setCertError] = useState("");
  const [internshipList, setInternshipList] = useState<Array<{
        id?: string
        title?: string
        description?: string
        published?: boolean
        start_date?: string
        overview?: string
        lenght_in_weeks?: number
        int_image?: string
        courses?: Array<{
            id?: number | string
        }>
    }>>([
        {
            id: "",
            title: "",
            description: "",
            published: false,
            start_date: "",
            overview: "",
            lenght_in_weeks: 0,
            int_image: "/",
            courses: [{ id: "" }]
        }
    ]);
  const [coursesList, setCoursesList] = useState<Array<{
    id?: number | string
    title?: string
    overview?: string
    description?: string
    published?: boolean
    image?: string
  }>>([
      {
        id: "",
        title: "",
        overview: "",
        description: "",
        published: false,
        image: "/"
      }
  ]);

  const [modulesList, setModulesList] = useState<Array<{
    id: number | string
    title: string
    description: string
    course?: number | string
  }>>([]);

  const [contentList, setContentList] = useState<Array<{
    id: number | string
    title: string
    content_type: string
    module?: number | string
    video_url: string
    text_content: string
    quiz_question: string
    quiz_answer_a: string
    quiz_answer_b: string
    quiz_answer_c: string
    actual_answer: string
    project_data: string
    project_promote_channel: string
    project_rubric: string
    jupyter_url: string
    course: number | string
    finished: boolean
    project_solution?: string
  }>>([]);

  const [filteredContentList, setFilteredContentList] = useState<Array<{
        id: number | string
        title: string
        content_type: string
        module?: number | string
        video_url: string
        text_content: string
        quiz_question: string
        quiz_answer_a: string
        quiz_answer_b: string
        quiz_answer_c: string
        actual_answer: string
        project_data: string
        project_promote_channel : string
        project_rubric : string
        jupyter_url: string
        course: number | string
        finished: boolean
        project_solution?: string
    }>>([]);

  const [previousModuleId, setPreviousModuleId] = useState<number>(0);
  const [nextModuleId, setNextModuleId] = useState<number>(0);
  const [previousContentId, setPreviousContentId] = useState<number>(0);
  const [nextContentId, setNextContentId] = useState<number>(0);
  const [solution, setSolution] = useState<string>("");
  const [grade, setGrade] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [subscriptionIntStatus, setSubscriptionIntStatus] = useState<boolean>(false);
  const [officialName, setOfficialName] = useState<string>("");
  const searchParams = useSearchParams();
  const progType = searchParams.get("type");

  const countWords = (text: string) =>
    text.trim().split(/\s+/).filter(Boolean).length;

  const formatBackendError = (error: any) => {
    const data = error?.response?.data;
    if (!data) return "Failed to save feedback. Please try again.";
    if (typeof data === "string") return data;
    if (data.detail) return data.detail;
    if (Array.isArray(data.non_field_errors)) {
      return data.non_field_errors.join(" ");
    }
    if (typeof data === "object") {
      const messages = Object.entries(data).flatMap(([key, value]) => {
        const label = key.replace(/_/g, " ");
        if (Array.isArray(value)) {
          return value.map((msg) => `${label}: ${msg}`);
        }
        if (typeof value === "string") {
          return [`${label}: ${value}`];
        }
        return [];
      });
      if (messages.length > 0) return messages.join(" ");
    }
    return "Failed to save feedback. Please try again.";
  };

  const handleCertificateSubmit = async () => {
    setCertError("");
    if (certSkill.trim().length < 10) {
      setCertError("Skill response must be at least 10 characters.");
      return;
    }
    const prep = Number(certPreparedness);
    if (!certPreparedness || Number.isNaN(prep) || prep < 1 || prep > 10) {
      setCertError("Preparedness must be between 1 and 10.");
      return;
    }
    if (countWords(certImprovement) < 25) {
      setCertError("Improvement response must be at least 25 words.");
      return;
    }
    try {
      const payload: Record<string, unknown> = {
        skill_gained: certSkill.trim(),
        preparedness_score: prep,
        improvement_suggestion: certImprovement.trim(),
      };
      if (progType === "single" && globalInternshipId === 0) {
        payload.course = courseId;
      } else {
        payload.internship = globalInternshipId;
      }
      await api.post('/api/certificate-feedback/', payload);
    } catch (error) {
      setCertError(formatBackendError(error));
      return;
    }
    await handleGenCertificate();
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await api.get('/api/get-user-profile/');
        if (response.data && (response.status == 200 || response.status == 201)) {
          const userProfile = response.data;
          setUsername(userProfile.username);
          setLoginDates(Array.isArray(userProfile.login_dates) ? userProfile.login_dates : []);
        } else {
          router.push("/login");
          console.error("No user profile found.");
        }
      } catch (error) {
        router.push("/login");
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  useEffect(() => {
    setSelectedAnswer("none");
    setMcqGraded(false);
    setHintClicked(false);
    setGrade(0);
  }, [contentId]);

  useEffect(() => {
    const fetchProgressPercent = async () => {
      try {
        if (progType === "single" && globalInternshipId === 0) {
          const res = await api.post("/api/progress/course/", { courseid: courseId });
          const percent = typeof res?.data?.completion_percent === "number" ? res.data.completion_percent : 0;
          setProgressPercent(percent);
          return;
        }

        if (globalInternshipId > 0) {
          const res = await api.post("/api/progress/internship/", {
            internshipid: globalInternshipId,
          });
          const percent = typeof res?.data?.completion_percent === "number" ? res.data.completion_percent : 0;
          setProgressPercent(percent);
          return;
        }

        setProgressPercent(0);
      } catch (error) {
        console.error("Error fetching progress percent:", error);
        setProgressPercent(0);
      }
    };

    fetchProgressPercent();
  }, [courseId, globalInternshipId, progType]);

  useEffect(() => {
    const fetchUserProgress = async () => {
      try {
        let response;
        if (progType === "single" && globalInternshipId === 0) {
          response = await api.post('/api/user-course-progress/', { courseid: courseId });
        } else {
          response = await api.post('/api/get-user-progress/', { internshipid: globalInternshipId });
        }
        if (response.data && (response.status == 200 || response.status == 201)) {
          const userProgress = response.data;
          setUserClicks(userProgress.no_clicks);
          setCert(userProgress.certified);
          setCompletedContent(userProgress.completed_contents ? userProgress.completed_contents : "");
          const uniqItems = new Set(userProgress.completed_contents.split(","));
          const allItemslength = userProgress.completed_contents.split(",").length;
          setUniqueContentId(uniqItems.size);
          setUniqCContent(new Set(userProgress.completed_contents.split(",")));
          setUserXP(Math.ceil(userProgress.total_xp_earned * (uniqItems.size / allItemslength)).toString());

          const subscriptionEnd = new Date(userProgress.current_period_end);
          const now = new Date();
          const msLeft = subscriptionEnd.getTime() - now.getTime();
          const daysLeft = Math.ceil(msLeft / (1000 * 60 * 60 * 24));
          const isActive = daysLeft > 0;
          setSubscriptionIntStatus(isActive);

          let totalXPResponse;
          if (progType === "single" && globalInternshipId === 0) {
            totalXPResponse = await api.post('/api/get-total-course-xp/', { courseid: courseId });
          } else {
            totalXPResponse = await api.post('/api/get-total-xp/', { internshipid: globalInternshipId });
          }

          if (totalXPResponse.status === 200) {
            setTotalXP(totalXPResponse.data.total_xp);
          } else {
            console.error("Failed to fetch total XP.");
          }
        } else {
          router.push("/login");
          console.error("No user profile found.");
        }
      } catch (error) {
        router.push("/login");
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProgress();
  }, []);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await api.get('/api/get-user-profile/');
        if (response.data && (response.status == 200 || response.status == 201)) {
          const userProfile = response.data;
          setLoginDates(Array.isArray(userProfile.login_dates) ? userProfile.login_dates : []);
          setUserInternshipId(
            Array.isArray(userProfile.Internships)
              ? userProfile.Internships.map((id: any) => Number(id))
              : userProfile.Internships
                ? [Number(userProfile.Internships)]
                : []
          );

          const internshipResponse = await api.get('/api/internships/');

          if (internshipResponse.status === 200) {
            const internships = internshipResponse.data.filter((internship: { id: string }) =>
              userProfile.Internships.includes(Number(internship.id))
            );
            setInternshipList(internships);

            const coursesResponse = await api.get('/api/courses/');
            if (coursesResponse.status === 200) {
              const allCourseIds = internships
                .flatMap((internship: any) =>
                  Array.isArray(internship.courses)
                    ? internship.courses.map((c: any) => Number(c))
                    : []
                );
              const courses = coursesResponse.data.filter((course: { id: number | string }) =>
                allCourseIds.includes(Number(course.id))
              );
              setCoursesList(courses);

              const modulesResponse = await api.get('/api/modules/');
              if (modulesResponse.status === 200) {
                const modules = modulesResponse.data.filter((module: { course?: number | string; id?: number | string }) =>
                  Number(module.course) === courseId && Number(module.id) === moduleId
                );
                const allModules = modulesResponse.data.filter((module: { course?: number | string }) =>
                  Number(module.course) === courseId
                );
                const getPreviousModuleId = () => {
                  if (!allModules || allModules.length === 0) return 0;
                  const sortedModules = [...allModules].sort((a, b) => Number(a.id) - Number(b.id));
                  const currentIndex = sortedModules.findIndex(m => Number(m.id) === moduleId);
                  if (currentIndex > 0) {
                    return Number(sortedModules[currentIndex - 1].id);
                  }
                  return 0;
                };

                const getNextModuleId = () => {
                  if (!allModules || allModules.length === 0) return 0;
                  const sortedModules = [...allModules].sort((a, b) => Number(a.id) - Number(b.id));
                  const currentIndex = sortedModules.findIndex(m => Number(m.id) === moduleId);
                  if (currentIndex !== -1 && currentIndex < sortedModules.length - 1) {
                    return Number(sortedModules[currentIndex + 1].id);
                  }
                  return 0;
                };

                setPreviousModuleId(getPreviousModuleId());
                setNextModuleId(getNextModuleId());
                setModulesList(modules);

                const contentResponse = await api.get('/api/contents/');
                if (contentResponse.status === 200) {
                  const allCourseContents = contentResponse.data;
                  setTotalContent(allCourseContents.length);

                  const contents = contentResponse.data.filter((content: { id: number | string; module?: number | string }) =>
                    Number(content.module) === moduleId
                  );

                  if (contents.length > 0) {
                    setFilteredContentList(
                      contents.filter((content: { id: any; }) => Number(content.id) === contentId)
                    );
                  }
                  setContentList(contents);

                  const getFirstContentIdOfPreviousModule = () => {
                    if (getPreviousModuleId() <= 0) return 0;
                    const prevModuleContents = contentResponse.data.filter(
                      (content: { module?: number | string }) => Number(content.module) === getPreviousModuleId()
                    );
                    if (prevModuleContents.length > 0) {
                      return Number(prevModuleContents[0].id);
                    }
                    return 0;
                  };

                  const getFirstContentIdOfNextModule = () => {
                    if (getNextModuleId() <= 0) return 0;
                    const nextModuleContents = contentResponse.data.filter(
                      (content: { module?: number | string }) => Number(content.module) === getNextModuleId()
                    );
                    if (nextModuleContents.length > 0) {
                      return Number(nextModuleContents[0].id);
                    }
                    return 0;
                  };
                  setPreviousContentId(getFirstContentIdOfPreviousModule());
                  setNextContentId(getFirstContentIdOfNextModule());
                } else {
                  console.error("Failed to fetch contents.");
                }
              }
            }
          }

        } else {
          console.error("No user profile found.");
          router.push("/login");
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        router.push("/login");
      }
    };

    fetchUserProfile();
  }, []);

  const handleMarkCompleted = async (navigateAfter = true) => {
    try {
      let response;
      if (progType === "single" && globalInternshipId === 0) {
        response = await api.post('/api/mark-completed-course/', {
          user: username,
          courseid: courseId,
          content: contentId,
          course: courseId,
          module: moduleId
        });
      } else {
        response = await api.post('/api/mark-completed/', {
          user: username,
          internshipid: globalInternshipId,
          content: contentId,
          course: courseId,
          module: moduleId
        });
      }

      if (response.status === 200) {
        setCompletedContent(prevCompleted => prevCompleted.concat(',', String(contentId)));
        toast.success("Marked as complete. 2 XP gained! Proceed to next content.");
        if (navigateAfter) {
          router.push(nextHref);
        }
      } else {
        console.error("Failed to mark content as completed.");
      }
    } catch (error) {
      console.error("Error marking content as completed:", error);
    }
  };

  const handleSolutionSubmit = async () => {
    setLoading(true);
    try {
      let response;
      if (progType === "single" && globalInternshipId === 0) {
        response = await api.post('/api/submit-solution-course/', {
          solution: solution,
          courseid: courseId,
          contentid: contentId,
          minimal_rubric: filteredContentList[0].project_rubric || "Use your best judgment to grade the solution based on the content provided."
        });
      } else {
        response = await api.post('/api/submit-solution/', {
          solution: solution,
          internshipid: globalInternshipId,
          contentid: contentId,
          channel: filteredContentList[0].project_promote_channel || "C09A477A43E",
          minimal_rubric: filteredContentList[0].project_rubric || "",
          project_solution: filteredContentList[0].project_solution || ""
        });
      }

      if (response.status === 200) {
        setGrade((response.data.grade_response));
        setLoading(false);
      } else {
        console.error("Failed to submit solution.");
      }
    } catch (error) {
      console.error("Error submitting solution:", error);
    }
  };

  const handleCodeTaskSubmit = async () => {
    setLoading(true);
    try {
      let response;
      if (progType === "single" && globalInternshipId === 0) {
        response = await api.post('/api/submit-solution-course/', {
          solution: solution,
          courseid: courseId,
          contentid: contentId,
          minimal_rubric: filteredContentList[0].project_rubric
        });
      } else {
        response = await api.post('/api/submit-solution/', {
          solution: solution,
          internshipid: globalInternshipId,
          contentid: contentId,
          channel: filteredContentList[0].project_promote_channel || "C09A477A43E",
          minimal_rubric: filteredContentList[0].project_rubric || "",
          project_solution: filteredContentList[0].project_solution || ""
        });
      }

      if (response.status === 200) {
        setGrade(response.data.grade_response);
        setImprove(filteredContentList[0].project_solution || "No feedback provided.");
        setLoading(false);
      } else {
        console.error("Failed to submit solution.");
      }
    } catch (error) {
      console.error("Error submitting solution:", error);
    }
  };

  const playFeedbackTone = (variant: "success" | "retry") => {
    if (typeof window === "undefined") return;
    const AudioContextCtor = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextCtor) return;

    const ctx = new AudioContextCtor();
    if (ctx.state === "suspended") {
      ctx.resume().catch(() => null);
    }

    const playNote = (frequency: number, start: number, duration: number, peak = 0.12) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = frequency;
      gain.gain.setValueAtTime(0.0001, start);
      gain.gain.linearRampToValueAtTime(peak, start + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
      osc.connect(gain).connect(ctx.destination);
      osc.start(start);
      osc.stop(start + duration);
    };

    const now = ctx.currentTime;
    if (variant === "success") {
      playNote(523.25, now, 0.18, 0.14);
      playNote(659.25, now + 0.16, 0.18, 0.14);
      playNote(783.99, now + 0.32, 0.22, 0.14);
    } else {
      playNote(220.0, now, 0.22, 0.1);
      playNote(261.63, now + 0.18, 0.24, 0.1);
    }

    setTimeout(() => {
      ctx.close().catch(() => null);
    }, 900);
  };

  const handleMCQSubmit = async () => {
    setLoading(true);
    try {
      let response;
      if (progType === "single" && globalInternshipId === 0) {
        response = await api.post('/api/submit-mcq-course/', {
          actual_answer: filteredContentList[0].actual_answer,
          user_answer: selectedAnswer,
          courseid: courseId,
          contentid: contentId
        });
      } else {
        response = await api.post('/api/submit-mcq/', {
          actual_answer: filteredContentList[0].actual_answer,
          user_answer: selectedAnswer,
          internshipid: globalInternshipId,
          contentid: contentId
        });
      }

      if (response.status === 200) {
        const isCorrect = selectedAnswer !== "none" && selectedAnswer === filteredContentList[0].actual_answer;
        setGrade(response.data.xp_earned);
        setLoading(false);
        setMcqGraded(true);
        playFeedbackTone(isCorrect ? "success" : "retry");
        if (isCorrect) {
          toast.success(`Great! You earned ${response.data.xp_earned} XP 🎉`);
        } else {
          toast.message("Almost there! Review and try again.");
        }
      } else {
        console.error("Failed to submit solution.");
      }
    } catch (error) {
      console.error("Error submitting solution:", error);
    }
  };

  const handleGenCertificate = async () => {
    try {
      let response;
      if (progType === "single" && globalInternshipId === 0) {
        response = await api.post('/api/generate-certificate-course/', {
          name: officialName,
          xp: (Math.min(Math.ceil((Number(userXP) / Number(totalXP)) * 120), 100)).toString(),
          course_title: coursesList.find(course => Number(course.id) === courseId)?.title || 'Course',
          courseid: courseId,
        },
        { responseType: 'blob' }
        );
      } else {
        response = await api.post('/api/generate-certificate/', {
          name: officialName,
          xp: (Math.min(Math.ceil((Number(userXP) / Number(totalXP)) * 120), 100)).toString(),
          internship_title: internshipList.find(internship => Number(internship.id) === globalInternshipId)?.title || 'Internship',
          internshipid: globalInternshipId,
        },
        { responseType: 'blob' }
        );
      }

      if (response.status === 200) {
        const link = document.createElement('a');
        const url = window.URL.createObjectURL(response.data);
        link.href = url;
        link.download = 'gen_certificate.pdf';
        link.click();
        window.URL.revokeObjectURL(url);
      } else {
        console.error("Failed to generate certificate.");
      }
    } catch (error) {
      console.error("Error generating certificate:", error);
    }
  };

  const resolvedTrigger =
    progressPercent >= 80
      ? "on_course_80"
      : progressPercent >= 50
        ? "on_course_50"
        : progressPercent >= 25
          ? "on_course_25"
          : null;

  const shouldFetchPopup = !!resolvedTrigger && courseId > 0;
  const showProgressPopup = shouldFetchPopup && !!popupData && !popupDismissed;
  const allowCta = popupTrigger === "on_course_50" || popupTrigger === "on_course_80";

  useEffect(() => {
    if (popupTrigger && resolvedTrigger && popupTrigger !== resolvedTrigger) {
      setPopupData(null);
      setPopupDismissed(false);
    }
  }, [resolvedTrigger, popupTrigger]);

  useEffect(() => {
    const fetchPopup = async () => {
      if (!shouldFetchPopup || popupDismissed || !resolvedTrigger) return;
      if (popupRequestedTrigger === resolvedTrigger) return;
      setPopupRequestedTrigger(resolvedTrigger);
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
  }, [shouldFetchPopup, popupDismissed, courseId, resolvedTrigger, popupRequestedTrigger]);

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

  const streakDays = buildLast7Days(loginDates || []);
  const courseTitle = coursesList.find((course) => Number(course.id) === courseId)?.title || "Course";
  const moduleTitle = modulesList.find((module) => Number(module.id) === moduleId)?.title || "Module";
  const currentLessonTitle = filteredContentList[0]?.title || "Lesson";
  const sortedModuleContents = [...contentList].sort((a, b) => Number(a.id) - Number(b.id));
  const currentModuleIndex = sortedModuleContents.findIndex((content) => Number(content.id) === Number(contentId));
  const nextContentInModuleId =
    currentModuleIndex >= 0 && currentModuleIndex < sortedModuleContents.length - 1
      ? Number(sortedModuleContents[currentModuleIndex + 1].id)
      : 0;
  const prevContentInModuleId =
    currentModuleIndex > 0 ? Number(sortedModuleContents[currentModuleIndex - 1].id) : 0;

  const moduleTotal = contentList.length;
  const moduleCompleted = contentList.filter((content) => uniqCContent.has(String(content.id))).length;
  const modulePercent = moduleTotal ? Math.round((moduleCompleted / moduleTotal) * 100) : 0;
  const isCurrentCompleted = uniqCContent.has(String(contentId));
  const activeContent = filteredContentList[0];
  const isQuizContent = activeContent?.content_type === "quiz";
  const quizItems = contentList.filter((content) => content.content_type === "quiz");
  const quizTotal = quizItems.length;
  const quizIndex = quizItems.findIndex((content) => Number(content.id) === Number(contentId)) + 1;
  const moduleStepIndex = currentModuleIndex >= 0 ? currentModuleIndex + 1 : 1;
  const quizCorrectAnswer = activeContent?.actual_answer || "";
  const isQuizCorrect = isQuizContent && mcqGraded && selectedAnswer !== "none" && selectedAnswer === quizCorrectAnswer;

  const buildContentHref = (targetModuleId: number, targetContentId: number) =>
    `/dashboard/internship/${globalInternshipId}/courses/${courseId}/module/${targetModuleId}/content/${targetContentId}?type=single`;

  const nextHref = nextContentInModuleId > 0
    ? buildContentHref(moduleId, nextContentInModuleId)
    : `/dashboard/internship/${globalInternshipId}/courses/${courseId}?type=single`;
  const prevHref = prevContentInModuleId > 0
    ? buildContentHref(moduleId, prevContentInModuleId)
    : `/dashboard/internship/${globalInternshipId}/courses/${courseId}?type=single`;

  const quizActionLabel = loading && !mcqGraded ? "Submitting..." : !mcqGraded ? "Submit" : isQuizCorrect ? "Next" : "Try again";
  const primaryLabel = isQuizContent
    ? quizActionLabel
    : isCurrentCompleted
      ? (nextContentInModuleId > 0 ? "Next" : "Back to course")
      : "Mark complete";
  const primaryDisabled = isQuizContent && !mcqGraded && (selectedAnswer === "none" || loading);

  const handleQuizAction = async () => {
    if (!mcqGraded) {
      await handleMCQSubmit();
      return;
    }
    if (isQuizCorrect) {
      if (isCurrentCompleted) {
        router.push(nextHref);
      } else {
        await handleMarkCompleted(true);
      }
      return;
    }
    setMcqGraded(false);
    setSelectedAnswer("none");
    setGrade(0);
    setHintClicked(false);
  };

  const handlePrimaryAction = async () => {
    if (isQuizContent) {
      await handleQuizAction();
      return;
    }
    if (isCurrentCompleted) {
      router.push(nextHref);
      return;
    }
    await handleMarkCompleted(true);
  };

  const handleSelectAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    if (mcqGraded) {
      setMcqGraded(false);
      setGrade(0);
    }
  };

  const estimateMinutes = (content: { content_type?: string; text_content?: string }) => {
    const type = content.content_type || "";
    if (type === "text" && typeof content.text_content === "string") {
      const words = countWords(content.text_content);
      return Math.max(2, Math.ceil(words / 180));
    }
    if (type === "video") return 8;
    if (type === "quiz") return 3;
    if (type === "project") return 15;
    if (type === "codeTask") return 12;
    if (type === "jupyter") return 10;
    if (type === "certificate") return 10;
    return 5;
  };

  const stepsList = (
    <div className="flex flex-col gap-2">
      {contentList.map((content) => {
        const meta = CONTENT_META[content.content_type] || { icon: "📘", label: "Lesson" };
        const isActive = Number(content.id) === Number(contentId);
        const isCompleted = uniqCContent.has(String(content.id));
        const statusIcon = isCompleted ? "✅" : isActive ? "⏳" : "○";
        const minutes = estimateMinutes(content);
        return (
          <Link
            key={content.id}
            href={buildContentHref(moduleId, Number(content.id))}
            className={`flex items-start gap-3 rounded-lg border px-3 py-2 transition ${isActive ? "border-green-500 bg-green-50" : "border-gray-200 bg-white"} hover:border-green-300`}
          >
            <span className="text-lg">{statusIcon}</span>
            <div className="flex flex-1 flex-col">
              <span className="text-sm font-semibold text-gray-800">{content.title}</span>
              <span className="text-xs text-gray-500">{meta.icon} {meta.label} • {minutes} min</span>
            </div>
          </Link>
        );
      })}
    </div>
  );

  const quizCard = (content: any) => {
    const answers = [content.quiz_answer_a, content.quiz_answer_b, content.quiz_answer_c].filter(Boolean);
    return (
      <div className="w-full">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 shadow-sm">
          <div className="flex flex-col gap-2">
            <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
              <span className="font-medium">{moduleTitle} · Step {moduleStepIndex}{moduleTotal ? `/${moduleTotal}` : ""}</span>
              {quizTotal > 0 && quizIndex > 0 && <span>Question {quizIndex} of {quizTotal}</span>}
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">🧠 Quick Check</span>
              <div className="ml-auto w-24 sm:w-32">
                <Progress value={modulePercent} />
              </div>
            </div>
          </div>

          <div className="mt-4 text-lg sm:text-xl font-semibold text-gray-900">
            <Markdown remarkPlugins={[remarkMath, remarkGfm]} rehypePlugins={[rehypeKatex]}>{content.quiz_question || "No question provided"}</Markdown>
          </div>

          <div className="mt-4 flex flex-col gap-3">
            {answers.map((answer: string, index: number) => {
              const isSelected = selectedAnswer === answer;
              const isCorrectOption = mcqGraded && answer === quizCorrectAnswer;
              const isIncorrectSelected = mcqGraded && isSelected && !isQuizCorrect;
              const optionClass = mcqGraded
                ? isCorrectOption
                  ? "border-green-500 bg-green-50"
                  : isIncorrectSelected
                    ? "border-red-400 bg-red-50"
                    : "border-gray-200 bg-white"
                : isSelected
                  ? "border-green-500 bg-green-50 shadow-sm"
                  : "border-gray-200 bg-white hover:border-gray-300";
              return (
                <button
                  key={`${answer}-${index}`}
                  type="button"
                  onClick={() => handleSelectAnswer(answer)}
                  className={`w-full text-left rounded-2xl border px-4 py-3 transition duration-150 min-h-[48px] ${optionClass}`}
                  aria-pressed={isSelected}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="text-xs sm:text-sm font-mono text-gray-800 prose prose-sm max-w-none">
                      <Markdown remarkPlugins={[remarkMath, remarkGfm]} rehypePlugins={[rehypeKatex]}>
                        {answer}
                      </Markdown>
                    </div>
                    {mcqGraded && (
                      <span className="text-sm font-semibold">
                        {isCorrectOption ? "✓" : isIncorrectSelected ? "✕" : ""}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {content.video_url && (
            <div className="mt-4">
              <Image src={content.video_url} alt="Schematic" width={600} height={400} className="rounded-xl border w-full" />
            </div>
          )}

          <div className="mt-4">
            <button
              type="button"
              onClick={() => setHintClicked((prev) => !prev)}
              className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-hb-green"
            >
              <span>💡 Need a hint?</span>
              <span className={`text-base transition-transform ${hintClicked ? "rotate-180" : ""}`}>⌃</span>
            </button>
            {hintClicked && (
              <div className="mt-2 rounded-xl border border-yellow-200 bg-yellow-50 px-4 py-3 text-sm text-yellow-800">
                {content.project_rubric || "No hint available yet."}
              </div>
            )}
          </div>

          {mcqGraded && (
            <div
              className={`mt-4 rounded-xl border px-4 py-3 text-sm ${isQuizCorrect ? "border-green-200 bg-green-50 text-green-900" : "border-red-200 bg-red-50 text-red-900"}`}
            >
              <p className="font-semibold">{isQuizCorrect ? "Correct!" : "Not quite."}</p>
              <p className="mt-1">
                {isQuizCorrect
                  ? `You earned ${grade} XP.`
                  : `Correct answer: ${quizCorrectAnswer || "Not provided."}`}
              </p>
              {content.project_rubric && (
                <p className="mt-2 text-xs text-gray-700">{content.project_rubric}</p>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  const streakBar = (tone: "desktop" | "mobile") => (
    <div
      className={`inline-flex items-center gap-3 rounded-full border px-3 py-1 ${tone === "desktop" ? "border-gray-200 bg-white/70" : "border-green-200 bg-white/60"}`}
    >
      <span className={`text-sm font-semibold ${tone === "desktop" ? "text-gray-600" : "text-green-900"}`}>
        🔥 {tone === "mobile" ? "streak" : "Last 7 days"}
      </span>
      <div className="flex items-center gap-2">
        {streakDays.map((isActive, index) => (
          <span
            key={`${tone}-streak-${index}`}
            className={`h-4 w-4 rounded-full ${isActive ? (tone === "desktop" ? "bg-green-500 shadow-[0_0_0_2px_rgba(34,197,94,0.2)]" : "bg-green-600 shadow-[0_0_0_2px_rgba(22,163,74,0.25)]") : tone === "desktop" ? "bg-gray-200" : "bg-green-100"}`}
          />
        ))}
      </div>
    </div>
  );

  const desktopLessonContent = (
    <div className="flex flex-col gap-8">
      {filteredContentList.length > 0 ? (
        filteredContentList.map((content) => (
          <div className="flex flex-col gap-10" key={content.id}>
            <div className="w-full p-3 text-lg border rounded-md border-hb-green">
              {globalInternshipId > 0 ? (
                <p className="text-sm text-gray-600">Overall Internship Progress</p>
              ) : (
                <p className="text-sm text-gray-600">Course Progress</p>
              )}
              {uniqueContentId > 0 && totalContent > 0 ? (
                <div className="flex flex-row gap-10 items-center max-w-full">
                  <Progress value={Math.ceil(progressPercent)} className="" />
                  <p className="font-bold text-2xl rounded-full">{Math.ceil(progressPercent)}%</p>
                </div>
              ) : (
                <div className="h-3 w-10"></div>
              )}
              <p className="text-xs text-gray-500">🎖️XP and progress are computed from the entire internship/pathway content.</p>
            </div>

            {subscriptionIntStatus ? (
              <div>
                {content.content_type === "video" && (
                  <Video video_url={content.video_url} text_content={content.text_content} title={content.title} />
                )}
                {content.content_type === "text" && (
                  <div className="flex flex-col gap-3">
                    {content.title && <p className="text-xl font-semibold text-gray-900">{content.title}</p>}
                    <TextContent text_content={content.text_content} />
                  </div>
                )}

                {content.content_type === "codeTask" && (
                  <div className="w-full flex flex-col text-sm">
                    <div className="rounded-md flex flex-col w-full prose gap-5">
                      <TextContent text_content={content.text_content} />
                      <textarea
                        id="solution"
                        value={solution}
                        onChange={(e) => setSolution(e.target.value)}
                        placeholder="type your solution..."
                        required
                        className="bg-green-950 text-white text-xs placeholder:text-xs p-3 h-100 rounded-md font-mono border border-neutral-200"
                      />
                      <div className="flex flex-col gap-5 items-start justify-start pt-5">
                        <HbButton onClick={() => { handleCodeTaskSubmit(); }} type="primary" text="SUBMIT" />
                        {loading ? (
                          <svg className="animate-spin h-5 w-5 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                          </svg>
                        ) : (
                          <div>
                            <p>Your grade is: {grade} XP</p>
                            <p className="leading-7 text-sm">Suggested Improvements: {improve}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {content.content_type === "jupyter" && (
                  <div className="flex flex-col pb-24 gap-2 text-xs max-w-full overflow-auto prose prose-base leading-tight">
                    <a href="#" target="_blank">
                      <Button className="bg-hb-green text-white">Notebook on HackBio</Button>
                    </a>
                    <a href={content.jupyter_url} target="_blank">
                      <Button className="bg-amber-500 text-white">Notebook on Colab</Button>
                    </a>
                    {typeof content.text_content === "string" && <NotebookViewer url={content.jupyter_url} />}
                  </div>
                )}

                {content.content_type === "quiz" && (
                  <div className="w-full">{quizCard(content)}</div>
                )}

                {content.content_type === "project" && (
                  <div className="w-full flex flex-row gap-5">
                    <div className="border-2 rounded-md border-hb-green prose prose-base p-5 flex flex-col leading-tight w-full">
                      <p className="font-bold text-lg">
                        Project Details: Submit markdown or code solution to the project below
                      </p>
                      <TextContent text_content={content.project_data} />
                      <div className="grid gap-2">
                        <Label htmlFor="solution" className="text-base font-bold pt-5">Your Solution</Label>
                        <textarea id="solution" value={solution} onChange={(e) => setSolution(e.target.value)} placeholder="type your solution..." required className="bg-green-950 text-white text-xs placeholder:text-xs p-3 h-100 font-mono border border-neutral-200" />
                        <p className="text-sm text-gray-500">Note: Please ensure your solution is well documented and clear. We accept text and code!</p>
                        <div className="flex flex-row gap-5 items-center justify-start pt-5">
                          <Button onClick={() => { handleSolutionSubmit(); }} className="w-fit bg-green-500 text-white text-xl py-6 hover:bg-green-600">
                            SUBMIT
                          </Button>
                          {loading ? (
                            <svg className="animate-spin h-5 w-5 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                            </svg>
                          ) : (
                            <p>Your grade is: {grade}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {content.content_type === "submit" && (
                  <div className="w-full flex flex-row gap-5">
                    <div className="border-2 rounded-md border-hb-green p-10 flex flex-col gap-10 w-full">
                      <p className="font-bold text-lg">A Quick Summary</p>
                      <Card className="w-full border-none shadow-none">
                        <CardHeader className="text-center"></CardHeader>
                        <CardContent>
                          <form className="space-y-5">
                            <div className="grid gap-2">
                              <Label htmlFor="projectId" className="text-xl">Project Code</Label>
                              <Input id="projectId" type="text" placeholder="Project Code" required className="bg-blue-50 text-xl placeholder:text-xl py-6" />
                            </div>

                            <div className="grid gap-2">
                              <Label htmlFor="solution" className="text-xl">Your Solution</Label>
                              <Input id="solution" type="text" placeholder="Your Solution" required className="bg-blue-50 text-xl placeholder:text-xl py-6" />
                            </div>

                            <a onClick={handleSolutionSubmit}>
                              <Button className="w-fit bg-green-600 text-white text-xl py-6 hover:bg-green-700">
                                SUBMIT
                              </Button>
                            </a>
                          </form>
                        </CardContent>
                      </Card>
                    </div>
                    <div className="border-2 p-5 rounded-md border-hb-green prose prose-base flex flex-col gap-2 ">
                      <p className="font-bold text-xl">Guideline for Submissions</p>
                      <Markdown remarkPlugins={[remarkMath, remarkGfm]} rehypePlugins={[rehypeKatex]}>{content.text_content}</Markdown>
                    </div>
                  </div>
                )}

                {content.content_type === "certificate" && (
                  <div className="w-full grid grid-cols-2 gap-6">
                    <div className="rounded-lg border border-green-200 bg-white p-6 shadow-sm">
                      <p className="font-bold text-lg text-hb-green">Certificate Request</p>
                      <form className="space-y-4 pt-4" onSubmit={(e) => { e.preventDefault(); }}>
                        <div className="grid gap-2">
                          <Label htmlFor="name" className="text-sm">Your Full Name {`(Official order and Preference)`}</Label>
                          <Input
                            id="name"
                            type="text"
                            placeholder="Your Name"
                            required
                            value={officialName}
                            onChange={(e) => setOfficialName(e.target.value)}
                            className="bg-blue-50 text-sm placeholder:text-sm py-4"
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="cert-skill" className="text-sm">
                            What was the most valuable skill or concept you gained during this internship?
                          </Label>
                          <Input
                            id="cert-skill"
                            type="text"
                            placeholder="At least 10 characters"
                            required
                            minLength={10}
                            value={certSkill}
                            onChange={(e) => setCertSkill(e.target.value)}
                            className="bg-blue-50 text-sm placeholder:text-sm py-4"
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="cert-prep" className="text-sm">
                            On a scale of 1–10, how prepared do you feel to apply these skills independently?
                          </Label>
                          <select
                            id="cert-prep"
                            required
                            value={certPreparedness}
                            onChange={(e) => setCertPreparedness(e.target.value)}
                            className="bg-blue-50 text-sm py-3 rounded-md border border-gray-200"
                          >
                            <option value="">Select 1–10</option>
                            {Array.from({ length: 10 }).map((_, i) => (
                              <option key={i + 1} value={i + 1}>{i + 1}</option>
                            ))}
                          </select>
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="cert-improve" className="text-sm">
                            If you could improve one thing about the internship experience, what would it be?
                          </Label>
                          <textarea
                            id="cert-improve"
                            required
                            value={certImprovement}
                            onChange={(e) => setCertImprovement(e.target.value)}
                            placeholder="Minimum 25 words"
                            className="bg-blue-50 text-sm placeholder:text-sm p-3 rounded-md border border-gray-200 h-28"
                          />
                          <p className="text-xs text-gray-500">
                            Word count: {countWords(certImprovement)} / 25
                          </p>
                        </div>
                        <div className="text-sm text-gray-700">
                          <p>Your Total XP: <span className="font-semibold">{userXP}XP</span></p>
                          <p>Your Total Internship Grade: <span className="font-semibold">{(Math.min(Math.ceil((Number(userXP) / Number(totalXP)) * 120), 100))}%</span></p>
                        </div>
                        {cert ? (
                          <Button disabled className="text-sm px-4 py-2">Generate</Button>
                        ) : (
                          <Button className="w-fit bg-green-600 text-white text-sm px-4 py-2 hover:bg-green-700" onClick={handleCertificateSubmit}>
                            GENERATE
                          </Button>
                        )}
                        {certError && <p className="text-xs font-semibold text-red-500">{certError}</p>}
                        <p className="text-xs font-semibold text-red-500">Can only be generated once!</p>
                      </form>
                    </div>
                    <div className="rounded-lg border border-green-200 bg-white p-6 shadow-sm">
                      <p className="font-bold text-lg text-hb-green">Guidelines</p>
                      <ul className="pt-3 text-sm text-gray-700 list-disc pl-5 space-y-2">
                        <li>You can only generate your certificate once.</li>
                        <li>Your internship grade (percentage) will be recorded on your certificate.</li>
                        <li>Ensure you have enough points before requesting. Once processed, it cannot be generated again.</li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div>
                <p className="mb-10 text-sm text-red-600">
                  {subscriptionIntStatus ? "" : (
                    <span>
                      <p>"Your subscription to this program has expired." <Link className="font-bold hover:underline" href={`/dashboard/checkout?prog=internship&id=${globalInternshipId}`}> Click here to subscribe Now</Link> </p>
                    </span>
                  )}
                </p>
              </div>
            )}
          </div>
        ))
      ) : (
        <p>Loading content...</p>
      )}
    </div>
  );

  const mobileLessonContent = (
    <div className="flex flex-col gap-5">
      {filteredContentList.length > 0 ? filteredContentList.map((content) => (
        <div key={content.id} className="flex flex-col gap-5 overflow-auto">
          {content.content_type === "video" && (
            <div>
              <Video video_url={content.video_url} text_content={content.text_content} title={content.title} />
            </div>
          )}

          {content.content_type === "text" && (
            <div className="flex flex-col gap-3">
              {content.title && <p className="text-base font-semibold text-gray-900">{content.title}</p>}
              <TextContent text_content={content.text_content} />
            </div>
          )}

          {content.content_type === "codeTask" && (
            <div className="w-full flex flex-col text-sm">
              <div className="rounded-md flex flex-col w-full prose gap-5">
                <TextContent text_content={content.text_content} />
                <textarea
                  id="solution"
                  value={solution}
                  onChange={(e) => setSolution(e.target.value)}
                  placeholder="type your solution..."
                  required
                  className="bg-green-950 text-white text-xs placeholder:text-xs p-3 h-100 rounded-md font-mono border border-neutral-200"
                />
                <div className="flex flex-col gap-5 items-start justify-start pt-5">
                  <HbButton onClick={() => { handleCodeTaskSubmit(); }} type="primary" text="SUBMIT" />
                  {loading ? (
                    <svg className="animate-spin h-5 w-5 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                    </svg>
                  ) : (
                    <div>
                      <p>Your grade is: {grade} XP</p>
                      <p className="leading-7 text-sm">Suggested Improvements: {improve}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {content.content_type === "jupyter" && (
            <div className="flex flex-col pb-24 gap-2 text-xs max-w-full overflow-auto prose prose-base leading-tight">
              <a href="#" target="_blank">
                <Button className="bg-hb-green text-white">Notebook on HackBio</Button>
              </a>
              <a href={content.jupyter_url} target="_blank">
                <Button className="bg-amber-500 text-white">Notebook on Colab</Button>
              </a>
              {typeof content.text_content === "string" && <NotebookViewer url={content.jupyter_url} />}
            </div>
          )}

          {content.content_type === "quiz" && (
            <div className="w-full">{quizCard(content)}</div>
          )}

          {content.content_type === "project" && (
            <div className="flex flex-col prose leading-tight gap-3 ">
              <TextContent text_content={content.project_data} />
              <Label htmlFor="solution" className="text-sm font-bold">Your Solution</Label>
              <textarea id="solution" value={solution} onChange={(e) => setSolution(e.target.value)} className="text-xs font-mono h-100 p-2 bg-green-900 text-white" />
              <Button onClick={() => { handleSolutionSubmit(); }} className="bg-hb-green text-white">SUBMIT</Button>
              {loading ? (<p>Loading grade...</p>) : (<p>Your score is: {grade}</p>)}
            </div>
          )}

          {content.content_type === "submit" && (
            <form className="flex flex-col gap-3">
              <Label htmlFor="projectId">Project Code</Label>
              <Input id="projectId" placeholder="Project Code" />
              <Label htmlFor="solution">Your Solution</Label>
              <Input id="solution" placeholder="Your Solution" />
              <Button onClick={handleSolutionSubmit} className="bg-green-600 text-white">SUBMIT</Button>
            </form>
          )}

          {content.content_type === "certificate" && (
            <div className="rounded-lg border border-green-200 bg-white p-4 shadow-sm">
              <p className="font-bold text-base text-hb-green">Certificate Request</p>
              <form className="flex flex-col gap-3 pt-3" onSubmit={(e) => e.preventDefault()}>
                <Label htmlFor="name" className="text-sm">Your Full Name</Label>
                <Input id="name" value={officialName} onChange={(e) => setOfficialName(e.target.value)} className="bg-blue-50 text-sm py-3" />
                <Label htmlFor="cert-skill" className="text-sm">
                  Most valuable skill or concept gained (min 10 characters)
                </Label>
                <Input
                  id="cert-skill"
                  value={certSkill}
                  onChange={(e) => setCertSkill(e.target.value)}
                  minLength={10}
                  required
                  className="bg-blue-50 text-sm py-3"
                />
                <Label htmlFor="cert-prep" className="text-sm">
                  On a scale of 1–10, how prepared do you feel to apply these skills independently? (1–10)
                </Label>
                <select
                  id="cert-prep"
                  required
                  value={certPreparedness}
                  onChange={(e) => setCertPreparedness(e.target.value)}
                  className="bg-blue-50 text-sm py-3 rounded-md border border-gray-200"
                >
                  <option value="">Select 1–10</option>
                  {Array.from({ length: 10 }).map((_, i) => (
                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                  ))}
                </select>
                <Label htmlFor="cert-improve" className="text-sm">
                  Improve one thing (min 25 words)
                </Label>
                <textarea
                  id="cert-improve"
                  value={certImprovement}
                  onChange={(e) => setCertImprovement(e.target.value)}
                  required
                  className="bg-blue-50 text-sm p-3 rounded-md border border-gray-200 h-28"
                />
                <p className="text-xs text-gray-500">
                  Word count: {countWords(certImprovement)} / 25
                </p>
                <div className="text-sm text-gray-700">
                  <p>Total XP: <span className="font-semibold">{userXP}XP</span></p>
                  <p>Grade: <span className="font-semibold">{(Math.min(Math.ceil((Number(userXP) / Number(totalXP)) * 120), 100))}%</span></p>
                </div>
                {cert ? (
                  <Button disabled className="text-sm px-4 py-2">Generate</Button>
                ) : (
                  <Button className="w-fit bg-green-600 text-white text-sm px-4 py-2 hover:bg-green-700" onClick={handleCertificateSubmit}>
                    GENERATE
                  </Button>
                )}
                {certError && <p className="text-xs font-semibold text-red-500">{certError}</p>}
                <p className="text-xs font-semibold text-red-500">Can only be generated once!</p>
              </form>
              <div className="pt-4 text-xs text-gray-700">
                <p className="font-semibold text-hb-green">Guidelines</p>
                <ul className="list-disc pl-4 space-y-1 pt-2">
                  <li>One-time generation only.</li>
                  <li>Your grade will be recorded on the certificate.</li>
                  <li>Ensure you have enough points before requesting.</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      )) : <p className="text-center">Loading content...</p>}
    </div>
  );

  return (
    <main className="w-full">
    <div className="hidden md:flex w-full">
      <div className="pl-5">
        <LeftSideBar />
      </div>
      <div className="flex-1 bg-hb-lightgreen min-h-screen flex flex-col">
          <div className="sticky top-0 z-30 bg-white border-b">
            <div className="flex items-center justify-between px-8 py-4">
              <div>
                <p className="text-xs text-gray-500">HackBio › {courseTitle} › {moduleTitle}</p>
                <p className="text-lg font-semibold text-gray-900">{currentLessonTitle}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-500">Progress {moduleCompleted}/{moduleTotal}</span>
                <div className="w-32">
                  <Progress value={modulePercent} />
                </div>
              </div>
            </div>
          <div className="flex items-center justify-between px-8 pb-4">
            {streakBar("desktop")}
            <button
              type="button"
              onClick={() => setStepsOpen((prev) => !prev)}
              className="text-sm font-semibold text-gray-700 hover:text-hb-green"
            >
              ☰ Module Content
            </button>
          </div>
          </div>

          <div className="flex flex-1">
            <div className="flex-1 overflow-y-auto">
              <div className="mx-auto w-full max-w-3xl px-8 py-8">
                {desktopLessonContent}
              </div>
            </div>
            {stepsOpen && (
              <aside className="w-80 border-l bg-white px-4 py-6 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                <p className="font-semibold text-gray-800">Module Content</p>
                  <button
                    type="button"
                    onClick={() => setStepsOpen(false)}
                    className="text-xs font-semibold text-gray-500 hover:text-gray-800"
                  >
                    Close
                  </button>
                </div>
                {stepsList}
                <div className="pt-4 border-t">
                  <p className="text-sm font-semibold text-gray-700 pb-2">Practice</p>
                  <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
                    <WebRPy />
                  </div>
                </div>
              </aside>
            )}
          </div>

          <div className="sticky bottom-0 z-30 border-t bg-white px-8 py-3">
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => router.push(prevHref)}
                className="text-sm font-semibold text-gray-600 hover:text-hb-green"
              >
                ← Back
              </button>
            <button
              type="button"
              onClick={handlePrimaryAction}
              disabled={primaryDisabled}
              className={`rounded-full bg-hb-green px-6 py-2 text-sm font-semibold text-white transition ${primaryDisabled ? "opacity-60 cursor-not-allowed" : "hover:bg-green-700"}`}
            >
              {primaryLabel}
            </button>
            </div>
          </div>
        </div>
      </div>

      <div className="md:hidden w-full min-h-svh bg-hb-lightgreen flex flex-col">
        <div className="px-4 pt-4 pb-2">
          <p className="text-xs text-gray-500">{courseTitle} • {moduleTitle}</p>
          <div className="flex items-center justify-between gap-4">
            <p className="text-lg font-semibold text-gray-900">{currentLessonTitle}</p>
            <span className="text-xs text-gray-500">{moduleCompleted}/{moduleTotal}</span>
          </div>
          <div className="mt-2">
            <Progress value={modulePercent} />
          </div>
          <div className="mt-3">{streakBar("mobile")}</div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {["learn", "practice", "steps", "resources"].map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab as typeof activeTab)}
                className={`w-full rounded-full px-4 py-2 text-xs font-semibold whitespace-nowrap ${activeTab === tab ? "bg-hb-green text-white" : "bg-white text-gray-600 border border-gray-200"}`}
              >
                {tab === "learn" ? "Learn" : tab === "practice" ? "Practice" : tab === "steps" ? "Module Content" : "Resources"}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 px-4 pb-28">
          {activeTab === "learn" && mobileLessonContent}
          {activeTab === "practice" && (
            <div className="rounded-lg border border-gray-200 bg-white p-3">
              <WebRPy />
            </div>
          )}
          {activeTab === "steps" && stepsList}
          {activeTab === "resources" && (
            <div className="rounded-lg border border-gray-200 bg-white p-4 text-sm text-gray-700">
              <p className="font-semibold text-gray-900">Resources</p>
              <p className="pt-2">Need help? Reach out in your cohort channel or use the course overview below.</p>
              <div className="pt-3">
                <TocLink tocHref={`/dashboard/internship/${globalInternshipId}/courses/${courseId}`} />
              </div>
            </div>
          )}
        </div>

        <div className="sticky bottom-0 z-30 border-t bg-white px-4 py-3">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => router.push(prevHref)}
              className="text-sm font-semibold text-gray-600"
            >
              Back
            </button>
            <button
              type="button"
              onClick={handlePrimaryAction}
              disabled={primaryDisabled}
              className={`rounded-full bg-hb-green px-6 py-2 text-sm font-semibold text-white transition ${primaryDisabled ? "opacity-60 cursor-not-allowed" : ""}`}
            >
              {primaryLabel}
            </button>
          </div>
        </div>
      </div>

      {showProgressPopup && popupData && (
        <ProgressFloat
          title={popupData.headline}
          message={popupData.body || ""}
          percent={progressPercent}
          ctaText={allowCta ? popupData.cta_text : undefined}
          onCta={allowCta && popupData.cta_url ? handlePopupCta : undefined}
          onClose={handlePopupDismiss}
        />
      )}
    </main>
  )
}

const PageWrapper = () => <Page />;

export default withAuth({ children: <PageWrapper /> });
