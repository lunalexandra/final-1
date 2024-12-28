import adv2 from "../../assets/images/сity.png";
import adv1 from "../../assets/images/screen.png";
import adv3 from "../../assets/images/earth.png"


import classes from "./howItWorks.module.css"
export const HowItWorks = () => {
    return (
    <section id="howitworks"className={classes["how-it-works"]}>
        <div className={classes["how-it-works__headline"]}>
            <h2 className={classes["how-it-works__title"]}>КАК ЭТО РАБОТАЕТ</h2>
            <button type="button" className={classes["how-it-works__button"]}>Узнать больше</button>
        </div>
        <div className={classes["how-it-works__advantages"]}>
            <div className={classes["how-it-works__advantage-box"]}>
                <img src={adv1} alt="" className={classes["how-it-works__advantage-1"]}/>
                <p className={classes["how-it-works__text"]}>Удобный заказ 
                на сайте</p>
            </div>
            <div className={classes["how-it-works__advantage-box"]}>
                <img src={adv2} alt="" className={classes["how-it-works__advantage-2"]}/>
                <p className={classes["how-it-works__text"]}>Нет необходимости ехать в офис</p>
            </div>
            <div className={classes["how-it-works__advantage-box"]}>
                <img src={adv3} alt="" className={classes["how-it-works__advantage-3"]}/>
                <p className={classes["how-it-works__text"]}>Огромный выбор
                направлений</p>
            </div>
        </div>
    </section>
    )
}