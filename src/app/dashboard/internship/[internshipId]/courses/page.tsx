'use client';
import withAuth from "@/components/withAuth";
import api from "@/api";
import { useMemo, useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import LeftSideBar from "@/components/widgets/dashboard-widgets/left-sidebar";
import MainScreenFlex from "@/components/widgets/dashboard-widgets/main-screen-flex";
import ProgressFloat from "@/components/widgets/progress-float";

type CourseItem = {
  id?: number | string;
  title?: string;
  overview?: string;
  description?: string;
  published?: boolean;
  image?: string;
  skill_tags?: string | null;
  difficulty_level?: string | null;
};

const splitSkillTags = (skillTags?: string | null) => {
  if (!skillTags) return [];
  return skillTags
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean)
    .slice(0, 4);
};

const clampProgress = (value: number) => Math.max(0, Math.min(100, value));

const cleanDescription = (value?: string | null) => {
  const text = (value || "").trim();
  if (!text) return "No description available yet.";

  const normalized = text.replace(/\s+/g, " ").trim();
  const words = normalized.split(" ").filter(Boolean);
  if (words.length <= 20) return normalized;
  return `${words.slice(0, 20).join(" ")} ...`;
};

function CourseListingCard({
  course,
  href,
}: {
  course: CourseItem;
  href: string;
}) {
  const skillTags = splitSkillTags(course.skill_tags);
  const difficulty = course.difficulty_level || "Beginner";
  const showDifficultyTag = difficulty !== "Beginner";
  const summary = cleanDescription(course.overview || course.description);

  return (
    <article className="rounded-md border border-hb-green/20 bg-white p-4 h-full flex flex-col gap-3 shadow-[0_8px_18px_rgba(39,174,96,0.08)]">
      <div className="h-[50px] w-[50px] rounded-sm border border-hb-green/20 bg-hb-lightgreen overflow-hidden">
        {course.image ? (
          <img
            src={course.image}
            alt={course.title || "Course image"}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center text-xs font-semibold text-hb-green">
            HackBio Course
          </div>
        )}
      </div>
      <h3 className="text-base font-semibold text-gray-900">{course.title || "Untitled Course"}</h3>

      {(skillTags.length > 0 || showDifficultyTag) ? (
        <div className="flex flex-wrap items-center gap-2">
          {skillTags.map((tag) => (
            <span key={`${course.id}-${tag}`} className="rounded-sm border border-hb-green/25 bg-hb-lightgreen px-2 py-1 text-xs font-medium text-hb-green">
              {tag}
            </span>
          ))}
          {showDifficultyTag ? (
            <span className="rounded-sm border border-hb-green/25 bg-white px-2 py-1 text-xs font-medium text-hb-green">{difficulty}</span>
          ) : null}
        </div>
      ) : null}

      <p className="text-sm text-gray-600 min-h-[4.5rem]">
        {summary}
      </p>

      <div className="pt-2 mt-auto">
        <Link
          href={href}
          className="inline-flex items-center justify-center rounded-sm bg-hb-green px-3 py-2 text-sm font-semibold text-white hover:bg-hb-green-dark"
        >
          Open Course →
        </Link>
      </div>
    </article>
  );
}


function Page() {

  const params = useParams();
  const activeInternshipId = Number(params.internshipId);
  const router = useRouter()
  const [username, setUsername] = useState("");
  const [loginDates, setLoginDates] = useState<string[]>([]);
  const [userInternshipId, setUserInternshipId] = useState<number[]>([]);
  const [userCoursesId, setUserCoursesId] = useState<number[]>([]);
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

  const [coursesList, setCoursesList] = useState<CourseItem[]>([
      {
        id: "",
        title: "",
        overview: "",
        description: "",
        published: false,
        image: "/",
        skill_tags: "",
        difficulty_level: "Beginner",
      }
  ]);

  const [singleCoursesList, setSingleCoursesList] = useState<CourseItem[]>([
      {
        id: "",
        title: "",
        overview: "",
        description: "",
        published: false,
        image: "/",
        skill_tags: "",
        difficulty_level: "Beginner",
      }
  ]);

  const [internshipProgressMap, setInternshipProgressMap] = useState<Record<number, number>>({});
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

    //get username
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await api.get('/api/get-user-profile/'); // Adjust the endpoint as needed
        //console.log("Response from get-user-profile:", response.data);
        if (response.data && response.status == 200 || response.status == 201) {
          //console.log("User profile data:", response.data);
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

  //get user internship id
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await api.get('/api/get-user-profile/'); // Adjust the endpoint as needed
        //console.log("Response from get-user-profile:", response.data);
        if (response.data && response.status == 200 || response.status == 201) {
          //console.log("User profile data:", response.data[0].Internships);
          const userProfile = response.data; // Assuming you want the first profile
          //console.log("User profile data internships:", userProfile);
          setLoginDates(Array.isArray(userProfile.login_dates) ? userProfile.login_dates : []);
          setUserInternshipId(
            Array.isArray(userProfile.Internships)
              ? userProfile.Internships.map((id: any) => Number(id))
              : userProfile.Internships
                ? [Number(userProfile.Internships)]
                : []
          ); // Set the internships array if it exists

          //make the internship list
          const internshipResponse = await api.get('/api/internships/');

          if (internshipResponse.status === 200) {
            const internships = internshipResponse.data.filter((internship: { id: string }) => 
              userProfile.Internships.includes(Number(internship.id))
            );
            setInternshipList(internships);

            //make the courses list
            const coursesResponse = await api.get('/api/courses/');
            if (coursesResponse.status === 200) {
              
              const allCourseIds = internships
              .flatMap((internship: any) => 
                Array.isArray(internship.courses)
                  ? internship.courses.map((c: any) => Number(c)) // each c is already an ID
                  : []
              );
              //console.log("filtered internships:", internships);
              const courses = coursesResponse.data.filter((course: { id: number | string }) =>
                allCourseIds.includes(Number(course.id))
              );
              //console.log("Courses List:", courses);
              setCoursesList(courses)
            }

            if (coursesResponse.status === 200) {
              const enrolledCourses = userProfile.Courses

              const singleCourses = coursesResponse.data.filter((course: { id: number | string }) =>
                enrolledCourses.includes(Number(course.id))
              );

              setSingleCoursesList(singleCourses)

              setUserCoursesId(enrolledCourses);
              
            }
          }

          //const coursesResponse = await api.get('/api/courses/');
          //console.log('courses response: ', coursesResponse)
          
          
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
  //console.log("User Internship IDs:", internshipList);

  //console.log("Course List:", coursesList);
  //console.log('course list west: ', userCoursesId)

  // Fetch progress for visible internships
  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const internshipIds = internshipList
          .map((i) => Number(i.id))
          .filter((id) => !Number.isNaN(id) && id !== 0);

        if (internshipIds.length === 0) return;

        const internshipProgressEntries: Array<[number, number]> = [];
        for (const iid of internshipIds) {
          const res = await api.post('/api/progress/internship/', { internshipid: iid });
          const percent = typeof res?.data?.completion_percent === 'number' ? res.data.completion_percent : 0;
          internshipProgressEntries.push([iid, percent]);
        }

        if (internshipProgressEntries.length > 0) {
          setInternshipProgressMap((prev) => ({
            ...prev,
            ...Object.fromEntries(internshipProgressEntries),
          }));
        }
      } catch (error) {
        console.error('Error fetching progress:', error);
      }
    };

    fetchProgress();
  }, [internshipList]);

  const activeInternshipProgress = !Number.isNaN(activeInternshipId)
    ? (internshipProgressMap[activeInternshipId] ?? 0)
    : 0;

  const resolvedTrigger = useMemo(() => {
    if (activeInternshipProgress >= 80) return "on_course_80";
    if (activeInternshipProgress >= 50) return "on_course_50";
    if (activeInternshipProgress >= 25) return "on_course_25";
    return null;
  }, [activeInternshipProgress]);

  const popupCourseId = useMemo(() => {
    if (Number.isNaN(activeInternshipId)) return undefined;
    const activeInternship = internshipList.find(
      (internship) => Number(internship.id) === activeInternshipId
    );
    if (!activeInternship?.courses?.length) return undefined;
    const courseIds = activeInternship.courses
      .map((course) => Number((course as any).id ?? course))
      .filter((id) => !Number.isNaN(id) && id !== 0);
    return courseIds[0];
  }, [activeInternshipId, internshipList]);

  const shouldFetchPopup = !!resolvedTrigger && !!popupCourseId;
  const popupRequestKey = resolvedTrigger && popupCourseId ? `${popupCourseId}:${resolvedTrigger}` : null;
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
      if (!shouldFetchPopup || popupDismissed || !popupCourseId || !resolvedTrigger) return;
      if (!popupRequestKey) return;
      if (popupRequestedTrigger === popupRequestKey) return;
      setPopupRequestedTrigger(popupRequestKey);
      try {
        const res = await api.get("/api/popups/next/", {
          params: { course_id: popupCourseId, trigger: resolvedTrigger },
        });
        if (res.status === 200 && res.data?.variant_id) {
          setPopupData(res.data);
          setPopupTrigger(resolvedTrigger);
          await api.post("/api/popups/impression/", {
            variant_id: res.data.variant_id,
            course_id: popupCourseId,
          });
        }
      } catch (error) {
        console.error("Error fetching popup:", error);
      }
    };

    fetchPopup();
  }, [shouldFetchPopup, popupDismissed, popupCourseId, popupRequestedTrigger, resolvedTrigger]);

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


  return (
    <main className="w-full ">
      <div className="hidden md:flex flex-row w-full">
        <LeftSideBar />
        <div className="w-full bg-hb-lightgreen flex flex-col gap-8 overflow-y-auto h-screen pb-10">
          <MainScreenFlex
            username={username}
            mini_desc="Your Internship Courses"
            loginDates={loginDates}
            contentClassName="max-w-6xl mx-auto w-full px-6 lg:px-8"
          />
          <div className="w-full max-w-6xl mx-auto px-6 lg:px-8 flex flex-col gap-8">
            <section id="internship-courses-desktop" className="flex flex-col gap-8">
              {internshipList.length !== 0 && internshipList[0].id !== "" ? (
                internshipList.map((internship) => {
                  const internshipCourseIds = internship.courses?.map((c) => Number(c.id ?? c)) ?? [];
                  const coursesForInternship = coursesList.filter((course) =>
                    internshipCourseIds.includes(Number(course.id))
                  );

                  return (
                    <div key={internship.id} className="rounded-md border border-hb-green/20 bg-white p-5">
                      <div className="flex flex-col gap-4">
                        <p className="font-bold text-lg text-gray-900">{internship.title}</p>
                        <div className="w-full max-w-sm">
                          <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                            <span>Internship Progress</span>
                            <span>{Math.round(internshipProgressMap[Number(internship.id)] ?? 0)}%</span>
                          </div>
                          <div className="h-2 w-full overflow-hidden rounded-full border border-hb-green/20 bg-hb-lightgreen">
                            <div
                              className="h-full rounded-full bg-hb-green transition-[width]"
                              style={{ width: `${clampProgress(internshipProgressMap[Number(internship.id)] ?? 0)}%` }}
                            />
                          </div>
                        </div>
                      </div>

                      {coursesForInternship.length > 0 ? (
                        <div className="mt-5 grid grid-cols-3 gap-4">
                          {coursesForInternship.map((course, courseIndex) => {
                            const courseAnchor = `course-${internship.id ?? "internship"}-${course.id ?? courseIndex}`;
                            return (
                              <div key={courseAnchor} id={courseAnchor}>
                                <CourseListingCard
                                  course={course}
                                  href={`/dashboard/internship/${internship.id}/courses/${course.id}/`}
                                />
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <p className="mt-4 text-sm text-gray-600">No courses found for this internship.</p>
                      )}
                    </div>
                  );
                })
              ) : (
                <div className="rounded-md border border-hb-green/20 bg-white p-5 text-sm text-gray-600">
                  If you are enrolled for an internship or a course and this is still empty after 24 hours, please write to contact@thehackbio.com.
                </div>
              )}
            </section>

            <section id="single-courses-desktop" className="flex flex-col gap-4 pb-4">
              <p className="text-base font-bold text-gray-800">Single Courses</p>
              {userCoursesId.length !== 0 ? (
                <div className="grid grid-cols-3 gap-4">
                  {singleCoursesList.map((course) => (
                    <CourseListingCard
                      key={course.id}
                      course={course}
                      href={`/dashboard/internship/0/courses/${course.id}?type=single`}
                    />
                  ))}
                </div>
              ) : (
                <div className="rounded-md border border-hb-green/20 bg-white p-5 text-sm text-gray-600">
                  No single course subscriptions yet.
                </div>
              )}
            </section>
          </div>
        </div>
      </div>

      <div className="block md:hidden w-full pb-20 ">
        <LeftSideBar />
        <MainScreenFlex
          username={username}
          mini_desc="Your Internship Courses"
          loginDates={loginDates}
          contentClassName="max-w-6xl mx-auto w-full px-6 lg:px-8"
        />

        <div className="flex flex-col w-full gap-6 items-center px-4">
          <section id="internship-courses-mobile" className="w-full flex flex-col gap-6">
            {internshipList.length !== 0 && internshipList[0].id !== "" ? (
              internshipList.map((internship) => {
                const internshipCourseIds = internship.courses?.map((c) => Number(c.id ?? c)) ?? [];
                const coursesForInternship = coursesList.filter((course) =>
                  internshipCourseIds.includes(Number(course.id))
                );

                return (
                  <div key={internship.id} className="rounded-md border border-hb-green/20 bg-white p-4">
                    <p className="font-bold text-lg text-gray-900">{internship.title}</p>
                    <div className="w-full mt-3">
                      <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                        <span>Internship Progress</span>
                        <span>{Math.round(internshipProgressMap[Number(internship.id)] ?? 0)}%</span>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full border border-hb-green/20 bg-hb-lightgreen">
                        <div
                          className="h-full rounded-full bg-hb-green transition-[width]"
                          style={{ width: `${clampProgress(internshipProgressMap[Number(internship.id)] ?? 0)}%` }}
                        />
                      </div>
                    </div>

                    {coursesForInternship.length > 0 ? (
                      <div className="mt-4 grid grid-cols-1 gap-4">
                        {coursesForInternship.map((course) => (
                          <CourseListingCard
                            key={course.id}
                            course={course}
                            href={`/dashboard/internship/${internship.id}/courses/${course.id}/`}
                          />
                        ))}
                      </div>
                    ) : (
                      <p className="mt-3 text-sm text-gray-600">No courses found for this internship.</p>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="rounded-md border border-hb-green/20 bg-white p-4 text-sm text-gray-600">
                If you are enrolled for an internship or a course and this is still empty after 24 hours, please write to contact@thehackbio.com.
              </div>
            )}
          </section>

          <section id="single-courses-mobile" className="w-full flex flex-col gap-4">
            <p className="text-base font-bold text-gray-800">Single Courses</p>
            {userCoursesId.length !== 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {singleCoursesList.map((course) => (
                  <CourseListingCard
                    key={course.id}
                    course={course}
                    href={`/dashboard/internship/0/courses/${course.id}?type=single`}
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-md border border-hb-green/20 bg-white p-4 text-sm text-gray-600">
                No single course subscriptions yet.
              </div>
            )}
          </section>
        </div>
      </div>

      {showProgressPopup && popupData && (
        <ProgressFloat
          title={popupData.headline}
          message={popupData.body || ""}
          percent={activeInternshipProgress}
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
