'use client';
import UpcomingCourseCard from "@/components/course-card";
import withAuth from "@/components/withAuth";
import api from "@/api";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import LeftSideBar from "@/components/widgets/dashboard-widgets/left-sidebar";
import MainScreenFlex from "@/components/widgets/dashboard-widgets/main-screen-flex";
import { Progress } from "@/components/ui/progress";
import InternshipCourseCard from "@/components/internship-course-card";



function Page() {

  const router = useRouter()
  const [username, setUsername] = useState("");
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

  const [singleCoursesList, setSingleCoursesList] = useState<Array<{
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

  const [internshipProgressMap, setInternshipProgressMap] = useState<Record<number, number>>({});
  const [courseProgressMap, setCourseProgressMap] = useState<Record<number, number>>({});

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

              console.log("Single Courses List:", singleCourses);
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

  console.log("Course List:", coursesList);
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

  // Fetch progress for visible courses (internship courses + single courses)
  useEffect(() => {
    const fetchCourseProgress = async () => {
      try {
        const courseIds = Array.from(
          new Set(
            [...coursesList, ...singleCoursesList]
              .map((c) => Number(c.id))
              .filter((id) => !Number.isNaN(id) && id !== 0)
          )
        );

        if (courseIds.length === 0) return;

        const courseProgressEntries: Array<[number, number]> = [];
        for (const cid of courseIds) {
          const res = await api.post('/api/progress/course/', { courseid: cid });
          const percent = typeof res?.data?.completion_percent === 'number' ? res.data.completion_percent : 0;
          courseProgressEntries.push([cid, percent]);
        }

        if (courseProgressEntries.length > 0) {
          setCourseProgressMap((prev) => ({
            ...prev,
            ...Object.fromEntries(courseProgressEntries),
          }));
        }
      } catch (error) {
        console.error('Error fetching course progress:', error);
      }
    };

    fetchCourseProgress();
  }, [coursesList, singleCoursesList]);

  return (
    <main className="w-full ">
    <div className="hidden md:flex flex-row w-full pl-5">
      {/**LEFT SIDE BAR */}
      <LeftSideBar />
      {/** MAIN */}
      <div className="w-full bg-green-50 flex flex-col gap-10 overflow-y-auto h-screen pb-10">
        <MainScreenFlex username={username} mini_desc="Your Internship Courses"/>
        <div className="flex flex-col gap-10 w-full px-10 ">
          <nav aria-label="Table of contents" className="w-full bg-white border border-green-100 rounded-lg p-4 text-sm">
            <p className="font-semibold text-gray-700">Table of Contents</p>
            <ul className="flex flex-col gap-2 pt-2">
              <li>
                <a href="#internship-courses-desktop" className="text-hb-green hover:underline">
                  Internship/Pathway Courses
                </a>
              </li>
              <li>
                <a href="#single-courses-desktop" className="text-hb-green hover:underline">
                  Single Courses
                </a>
              </li>
            </ul>
            {internshipList.length !== 0 && internshipList[0].id !== "" && (
              <div className="pt-3">
                <p className="font-semibold text-gray-700">Courses</p>
                <ul className="flex flex-col gap-2 pt-2">
                  {internshipList.flatMap((internship) => {
                    const internshipCourseIds = internship.courses?.map((c) => Number(c.id ?? c)) ?? [];
                    const coursesForInternship = coursesList.filter((course) =>
                      internshipCourseIds.includes(Number(course.id))
                    );
                    return coursesForInternship.map((course, courseIndex) => {
                      const courseAnchor = `course-${internship.id ?? "internship"}-${course.id ?? courseIndex}`;
                      return (
                        <li key={courseAnchor}>
                          <a href={`#${courseAnchor}`} className="text-hb-green hover:underline">
                            {course.title ?? "Untitled course"}
                          </a>
                        </li>
                      );
                    });
                  })}
                </ul>
              </div>
            )}
          </nav>

          <section id="internship-courses-desktop">
            {internshipList.length !== 0 && internshipList[0].id !== "" ? (
              internshipList.map((internship) => {
                // Get course IDs for this internship
                const internshipCourseIds = internship.courses?.map((c) => Number(c.id ?? c)) ?? [];
                // Filter courses that belong to this internship
                const coursesForInternship = coursesList.filter((course) =>
                  internshipCourseIds.includes(Number(course.id))
                );
                return (
                  <div key={internship.id} className="mb-10">
                    <div className="mb-4">
                      <p className="font-bold text-lg">{internship.title}</p>
                    </div>
                    {coursesForInternship.length > 0 ? (
                      <div className="flex flex-col gap-6">
                        {internship.id && internshipProgressMap[Number(internship.id)] !== undefined && (
                          <div className="w-96 border border-hb-green rounded-md p-4">
                            <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                              <span>Progress</span>
                              <span>{internshipProgressMap[Number(internship.id)].toFixed(0)}%</span>
                            </div>
                            <Progress value={internshipProgressMap[Number(internship.id)]} />
                          </div>
                        )}
                        {coursesForInternship.map((course, courseIndex) => {
                          const courseAnchor = `course-${internship.id ?? "internship"}-${course.id ?? courseIndex}`;
                          return (
                            <div key={courseAnchor} id={courseAnchor}>
                              <div className="mb-2">
                                <p className="font-semibold text-gray-700">{course.title ?? ""}</p>
                              </div>
                              <InternshipCourseCard
                                desc={course.overview ?? ""}
                                image={course.image ?? "/"}
                                directTo={`/dashboard/internship/${internship.id}/courses/${course.id}/`}
                                title={course.title ?? ""}
                                weeks={0}
                                lessons={0}
                                progressPercent={courseProgressMap[Number(course.id)] ?? 0}
                              />
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div>
                        <InternshipCourseCard
                          desc="No courses found for this internship."
                          image="https://internship.thehackbio.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fhb_logo.a812b2f6.png&w=96&q=75"
                          directTo="/dashboard/internship"
                          title="Nothing to show here yet"
                          weeks={0}
                          lessons={0}
                        />
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <div>
                <InternshipCourseCard
                  desc={`If you are enrolled for an internship or a course and this is still empty after 24 hours, please write to contact@thehackbio.com. We would fix it 😊.`}
                  image={"https://internship.thehackbio.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fhb_logo.a812b2f6.png&w=96&q=75"}
                  directTo={'/dashboard/internship'}
                  title={`Nothing to show here yet`}
                  weeks={0}
                  lessons={0}
                />
              </div>
            )}
          </section>
        
          <p className=" text-base font-bold text-start text-gray-700">-- Your Single Course Subscriptions </p>
          {userCoursesId.length !== 0  ? (
            <div className="flex flex-col gap-6" id="single-courses-desktop">
              {singleCoursesList.map((course) => (
                <div key={course.id} className="w-full">
                  <div className="mb-2">
                    <p className="font-semibold text-gray-700">{course.title ?? ""}</p>
                  </div>
                  <UpcomingCourseCard
                    desc={course.overview ?? ""}
                    image={course.image ?? "/"}
                    directTo={`/dashboard/internship/${0}/courses/${course.id}?type=single`}
                    title={course.title ?? ""}
                    weeks={0}
                    lessons={0}
                  />
                </div>
              ))}
            </div>) : 
            (<div>
              <UpcomingCourseCard
                desc="If you are enrolled for an internship or a course and this is still empty after 24 hours, please write to contact@thehackbio.com. We would fix it 😊."
                image="https://internship.thehackbio.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fhb_logo.a812b2f6.png&w=96&q=75"
                directTo="/dashboard/internship"
                title="Nothing to show here yet"
                weeks={0}
                lessons={0}
              />
            </div>
          )}
               
        </div>
      </div>
    </div>

    {/** MOBILE */}
    <div className="block md:hidden w-full pb-20 ">

      {/* Header */}
      <LeftSideBar />

      {/* Main Content */}
      <MainScreenFlex username={username} mini_desc="Your Internship Courses"/>

      <div className="flex flex-col w-full gap-6 items-center px-4">
        <nav aria-label="Table of contents" className="w-full bg-white border border-green-100 rounded-lg p-4 text-sm">
          <p className="font-semibold text-gray-700">Table of Contents</p>
          <ul className="flex flex-col gap-2 pt-2">
            <li>
              <a href="#internship-courses-mobile" className="text-hb-green hover:underline">
                Internship/Pathway Courses
              </a>
            </li>
            <li>
              <a href="#single-courses-mobile" className="text-hb-green hover:underline">
                Single Courses
              </a>
            </li>
          </ul>
          {internshipList.length !== 0 && internshipList[0].id !== "" && (
            <div className="pt-3">
              <p className="font-semibold text-gray-700">Courses</p>
              <ul className="flex flex-col gap-2 pt-2">
                {internshipList.flatMap((internship) => {
                  const internshipCourseIds = internship.courses?.map((c) => Number(c.id ?? c)) ?? [];
                  const coursesForInternship = coursesList.filter((course) =>
                    internshipCourseIds.includes(Number(course.id))
                  );
                  return coursesForInternship.map((course, courseIndex) => {
                    const courseAnchor = `course-${internship.id ?? "internship"}-${course.id ?? courseIndex}`;
                    return (
                      <li key={courseAnchor}>
                        <a href={`#${courseAnchor}`} className="text-hb-green hover:underline">
                          {course.title ?? "Untitled course"}
                        </a>
                      </li>
                    );
                  });
                })}
              </ul>
            </div>
          )}
        </nav>

        <section id="internship-courses-mobile" className="w-full">
          {internshipList.length !== 0 && internshipList[0].id !== "" ? (
            internshipList.map((internship) => {
              // Get course IDs for this internship
              const internshipCourseIds = internship.courses?.map((c) => Number(c.id ?? c)) ?? [];
              // Filter courses that belong to this internship
              const coursesForInternship = coursesList.filter((course) =>
                internshipCourseIds.includes(Number(course.id))
              );
              return (
                <div key={internship.id} className="mb-10">
                  <div className="mb-4">
                    <p className="font-bold text-lg">{internship.title}</p>
                  </div>
                  {coursesForInternship.length > 0 ? (
                    <div className="flex flex-col gap-6">
                      {internship.id && internshipProgressMap[Number(internship.id)] !== undefined && (
                        <div className="w-full">
                          <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                            <span>Progress</span>
                            <span>{internshipProgressMap[Number(internship.id)].toFixed(0)}%</span>
                          </div>
                          <Progress value={internshipProgressMap[Number(internship.id)]} />
                        </div>
                      )}
                      {coursesForInternship.map((course, courseIndex) => {
                        const courseAnchor = `course-${internship.id ?? "internship"}-${course.id ?? courseIndex}`;
                        return (
                          <div key={courseAnchor} id={courseAnchor}>
                            <InternshipCourseCard 
                              desc={course.overview ?? ""}
                              image={course.image ?? "/"}
                              directTo={`/dashboard/internship/${internship.id}/courses/${course.id}/`}
                              title={course.title ?? ""}
                              weeks={0}
                              lessons={0}
                              progressPercent={courseProgressMap[Number(course.id)] ?? 0}
                            />
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div>
                      <InternshipCourseCard
                        desc="No courses found for this internship."
                        image="https://internship.thehackbio.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fhb_logo.a812b2f6.png&w=96&q=75"
                        directTo="/dashboard/internship"
                        title="Nothing to show here yet"
                        weeks={0}
                        lessons={0}
                      />
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div>
              <InternshipCourseCard
                desc={`If you are enrolled for an internship or a course and this is still empty after 24 hours, please write to contact@thehackbio.com. We would fix it 😊.`}
                image={"https://internship.thehackbio.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fhb_logo.a812b2f6.png&w=96&q=75"}
                directTo={'/dashboard/internship'}
                title={`Nothing to show here yet`}
                weeks={0}
                lessons={0}
              />
            </div>
          )}
        </section>

        <p className="py-5 text-base text-start text-gray-700 w-full">-- Your Single Course Subscriptions </p>
          {userCoursesId.length !== 0  ? (
            <div className="flex flex-col gap-6 w-full" id="single-courses-mobile">
              {singleCoursesList.map((course) => (
                <div key={course.id} className="w-full">
                  <div className="mb-2">
                    <p className="font-semibold text-gray-700">{course.title ?? ""}</p>
                  </div>
                  <UpcomingCourseCard
                    desc={course.overview ?? ""}
                    image={course.image ?? "/"}
                    directTo={`/dashboard/internship/${0}/courses/${course.id}?type=single`}
                    title={course.title ?? ""}
                    weeks={0}
                    lessons={0}
                  />
                </div>
              ))}
            </div>) : 
            (<div>
              <UpcomingCourseCard
                desc="If you are enrolled for an internship or a course and this is still empty after 24 hours, please write to contact@thehackbio.com. We would fix it 😊."
                image="https://internship.thehackbio.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fhb_logo.a812b2f6.png&w=96&q=75"
                directTo="/dashboard/internship"
                title="Nothing to show here yet"
                weeks={0}
                lessons={0}
              />
            </div>
          )}
      </div>
    </div>

    </main>
  )
}

const PageWrapper = () => <Page />;

export default withAuth({ children: <PageWrapper /> });
