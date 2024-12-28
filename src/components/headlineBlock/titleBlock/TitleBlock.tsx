import classes from "../headlineBlock.module.css";

export const TitleBlock = () => {
    return (
        <div className={classes["headline-block__title"]}>
        <h1>
          Вся жизнь - <br/>
          <span className={classes["headline-block__title-bold"]}>
            путешествие!
          </span>
        </h1>
      </div>
    )
}