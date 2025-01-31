import {
    Header,
    SearchBlock,
    Footer,
    StepsBar,
    Payment
  } from "../../components";
  import banner2 from "../../assets/images/second-banner.png";
  
  export const PaymentPage = () => {
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
        <StepsBar currentStep={3} />
        <div className="main-container">
          <Payment/>
        </div>
        <Footer />
      </>
    );
  };
  