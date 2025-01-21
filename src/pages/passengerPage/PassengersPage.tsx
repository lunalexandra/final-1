import {
  Header,
  SearchBlock,
  Footer,
  StepsBar,
  PassengerList,
} from "../../components";
import banner2 from "../../assets/images/second-banner.png";

export const PassengersPage = () => {
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
      <StepsBar currentStep={2} />
      <div className="main-container">
        <PassengerList />
      </div>
      <Footer />
    </>
  );
};
