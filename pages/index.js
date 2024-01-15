import Head from "next/head";
import Transform from "../components/Transform";
import BasicPlan from "../components/BasicPlan";
import IntermediatePlan from "../components/IntermediatePlan";
import PremiumPlan from "../components/PremiumPlan";
import AllPlans from "../components/AllPlans";


export default function Home() {
  return (
    <div>
      <Head>
        <title>Sousas Midia</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/logo-1.svg" />
      </Head>
      <Transform />
      <BasicPlan />
      <IntermediatePlan />
      <PremiumPlan />
      <AllPlans />
     
    </div>
  );
}
