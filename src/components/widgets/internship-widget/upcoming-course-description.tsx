import React from "react";
import { ArrowRight } from "lucide-react";
import { EnrollDialog } from "@/components/enroll/enroll";
import { Button } from "@/components/ui/button";
import Markdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import HbButton from "../hb-buttons";



// Props: upcoming, coursesList, internshipStatus
export default function ({ description, internshipStatus }: { description: string; internshipStatus: string }) {

  return (
    <div className="flex flex-col gap-5 items-start justify-center w-full overflow-y-auto">
                                
      <div  className="py-5 flex flex-col  items-start justify-start w-full gap-5">
          <p className="text-2xl font-bold">Description</p>
        <div className="prose">
          <Markdown remarkPlugins={[remarkMath, remarkGfm]} rehypePlugins={[rehypeKatex]}>{description}</Markdown>
        </div>
        {internshipStatus === 'close' && (
                            <HbButton
                                text="Application Closed."
                                type="primary"
                                onClick={() => {
                                    if (typeof window !== "undefined") {
                                        window.alert("Application closed! Join us next year");
                                    }
                                }}
                            />
                        )}
        {internshipStatus !== 'close' && <EnrollDialog />}

      </div>
    </div>
  );
}
