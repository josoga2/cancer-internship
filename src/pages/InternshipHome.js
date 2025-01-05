import InternshipHero from "../components/InternshipHero";
import LearningPathway from "../components/LearningPathway";
import Pricing from "../components/Pricing";
import Stories from "../components/Stories";
import Webinar from "../components/Webinar";
import InternshipModules from "./InternshipModules";


const InternshipHome = () => {
  return (
    <div>
      <InternshipHero />
      <InternshipModules />
      <LearningPathway />
      <Webinar/>
      <Stories />
      {<Pricing />}
    </div>
  );
}

export default InternshipHome;
