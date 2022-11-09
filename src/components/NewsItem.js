import { getByTitle } from '@testing-library/react'
// import React, { Component } from 'react'

// export class NewsItem extends Component {
//     render() {
//         let { title, description, imgUrl, newsUrl } = this.props;
//         return (
//             <div className="my-3">
//                 <div className="card" style={{ width: " 18rem" }}>
//                     <img src={imgUrl} className="card-img-top" alt="Image cant load" />
//                     <div className="card-body">
//                         <h5 className="card-title">{title}...</h5>
//                         <p className="card-text">{description}... </p>
//                         <a href={newsUrl} target="_blank" className="btn btn-sm btn-primary">Read more</a>
//                     </div>
//                 </div>

//             </div>
//         )
//     }
// }

// export default NewsItem
import React, { Component } from 'react'

export class NewsItem extends Component {
    render() {
        let { title, description, imageUrl, newsUrl, author, date } = this.props;
        return (
            <div className="my-3">
                <div className="card" >
                    <img src={!imageUrl ? "https://fdn.gsmarena.com/imgroot/news/21/08/xiaomi-smart-home-india-annoucnements/-476x249w4/gsmarena_00.jpg" : imageUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <p className="card-text"><small className="text-muted">By {author == null ? "Unknown" : author} on {new Date(date).toUTCString()} </small></p>
                        <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem
