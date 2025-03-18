import { ArticleDetail } from "./article-detail";
import { Irepository } from "./irepository";

export interface Article extends Irepository<ArticleDetail> {
}
