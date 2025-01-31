import {
    Header,
    SearchBlock,
    Footer,
    StepsBar,
    Confirmation
  } from "../../components";
  import banner2 from "../../assets/images/second-banner.png";
  
  export const ConfirmationPage = () => {
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
        <StepsBar currentStep={4} />
        <div className="main-container">
          <Confirmation/>
        </div>
        <Footer />
      </>
    );
  };
  