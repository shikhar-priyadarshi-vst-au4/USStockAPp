import "./Card.scss";

interface IArticleCard{
    imageBaseUrl: string;
    imageSrc: string;
    imageAlt?: string;
    articleDate: string;
    articleSource: string;
    articleTitle: string;
    articleBody:string;
    articleAuthor: string;
}

export default function ArticleCard(props: IArticleCard){
 return <>
 <div className="card">
    <div className="card-header">
        <figure className="card-image">
            <img src={props.imageBaseUrl + "" + props.imageSrc} alt=""/>
        </figure>
        <div className="card-heading">
            <div className="card-heading_caption">
                <span>{props?.articleDate}</span>
                <span>{props?.articleSource}</span>
            </div>
            <p className="card-heading_para">{props?.articleTitle}</p>
        </div>
    </div>
    <div className="card-para" dangerouslySetInnerHTML={{__html: props?.articleBody}}></div>
    <caption className="card-caption">{props?.articleAuthor}</caption>
 </div>
 </>
}