import { TitleBlock } from "./titleBlock/TitleBlock";
import { SearchBlock } from "./searchBlock/SearchBlock";

import classes from "./headlineBlock.module.css";
export const HeadlineBlock = () => {
  return (
    <div className={classes["headline-block"]}>
      <TitleBlock />
      <div className={classes["search-block__wrp"]}>
        <SearchBlock />
      </div>
    </div>
  );
};
