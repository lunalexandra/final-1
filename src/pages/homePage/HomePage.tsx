import {
  Header,
  HeadlineBlock,
  Footer,
  AboutUs,
  HowItWorks,
  Reviews,
} from "../../components";
import banner1 from "/src/assets/images/big-banner.png";

export const HomePage = () => {
  return (
    <>
      <Header background={banner1} children={<HeadlineBlock />} />
        <AboutUs />
        <HowItWorks />
        <Reviews />
      <Footer />
    </>
  );
};
