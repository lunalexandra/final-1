import {
  Header,
  SearchBlock,
  Footer,
  StepsBar,
  Filter,
} from "../../components";
import DirectionsList from "../../components/directionsList/DirectionsList";
import banner2 from "../../assets/images/second-banner.png";

export const TrainPage = () => {
  return (
    <>
      <Header
        background={banner2}
        children={
          <SearchBlock
            style={{
              flexDirection: "row",
              margin: "111px auto 0",
              justifyContent: "space-between",
              padding: "28px 40px 0px",
              flexWrap: "wrap",
              width: "77%",
            }}
            styleBtn={{
              justifyContent: "start",
            }}
          />
        }
      />
      <StepsBar currentStep={1} />
      <div className="main-container">
        <aside>
          <Filter />
        </aside>
        <main>
          <DirectionsList/>
        </main>
      </div>
      <Footer />
    </>
  );
};
