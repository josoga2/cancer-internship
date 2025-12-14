import React from "react";
import { Button } from "@/components/ui/button";
import { EnrollDialog } from "@/components/enroll/enroll";
import HbButtons from "../hb-buttons";



// Props: upcoming, coursesList, internshipStatus
export default function UpcomingSection({ id, start_date, int_image, title, overview, lenght_in_weeks, internshipStatus }: { id: string; start_date: string; int_image: string; title: string; overview: string; lenght_in_weeks: number; internshipStatus: string }) {

  return (
    <main>
      <div key={id} className="hidden w-full pb-10  h-full md:flex flex-col gap-10 px-10 items-center justify-center border-r-hb-lightgreen border-r border-l border-l-hb-lightgreen">
        <div className="flex flex-col gap-2 w-full items-start justify-start">
          <p className="text-3xl font-bold">Upcoming</p>
          <p className="text-lg">{start_date}</p>
        </div>

        <div className="flex flex-row gap-10 w-full justify-center">
          <div className=" gap-10 w-full items-start justify-start">

            <div className="flex flex-col gap-7 items-start justify-start border-2 border-hb-green rounded-lg px-5 py-10 w-full sticky top-0">
              <img
                src={int_image}
                alt="upcoming_int"
                width={64}
                height={64}
                className="border-2 rounded-md border-hb-green"
              />

              <p className="text-2xl font-bold">{title}</p>
              <p className="text-base">{overview}</p>

              <span className="flex flex-row gap-5 items-center justify-center">
                <p className="text-base">{lenght_in_weeks} Weeks</p>
              </span>

              {internshipStatus === "close" ? (
                <Button
                  onClick={() => {
                    if (typeof window !== "undefined") {
                      window.alert("Application closed! Join us next year");
                    }
                  }}
                  className="bg-hb-green text-white"
                >
                  Application Closed.
                </Button>
              ) : (
                <EnrollDialog />
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/**Mobile */}
      <div className="flex flex-col w-full md:hidden gap-5  rounded-xl">
        <div className="flex flex-col gap-3 items-start justify-start w-full">
          <p className="text-xl font-bold">Upcoming</p>
          <p className="text-base">{start_date}</p>
        </div>
          
        <div className="flex flex-col gap-5 border-2 border-hb-green rounded-lg px-5 py-5">
          <img src={int_image} alt="internship" width={64} height={64} className="border-2 rounded-md border-hb-green" />
          <p className="text-lg font-bold">{title}</p>
          <p className="text-sm">{overview}</p>
          <p className="text-sm">{lenght_in_weeks} Weeks</p>
          {internshipStatus === 'close' && (
              <Button
                  onClick={() => {
                      if (typeof window !== "undefined") {
                          window.alert("Application closed! Join us next year");
                      }
                  }}
                  className="bg-hb-green text-white"
              >
                  Application Closed.
              </Button>
          )}
          {internshipStatus !== 'close' && <EnrollDialog />}
        </div>
      </div>

    </main>
  );
}
