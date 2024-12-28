import { ContactInfo } from "./contactInfo/ContactInfo";
import { SubscriptionBlock } from "./subscriptionBlock/SubscriptionBlock";
import { LogoLine } from "./logoLine/LogoLine";
import classes from "./footer.module.css";

export const Footer = () => {
  return (
    <footer className={classes.footer}>
      <div className={classes["footer__info-wrp"]}>
        <ContactInfo />
        <SubscriptionBlock />
      </div>
      <LogoLine />
    </footer>
  );
};
