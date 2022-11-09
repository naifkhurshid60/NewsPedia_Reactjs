import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'




export class News extends Component {



    // async componentDidMount() {
    //     let url = "https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=bd0090aee6774f45a0ccc16270b09eb9";
    //     try {
    // https://newsapi.org/v2/top-headlines?country=in&category=$business&apiKey=bd0090aee6774f45a0ccc16270b09eb9
    //         const res = await fetch(url);
    //         const data = await res.json();
    //         this.setState({
    //             article: data.article
    //         });
    //     }
    //     catch (e) {
    //         console.log("something is not working");
    //     }
    // }
    static defaultProps = {
        country: 'in',
        pageSize: 8,
        category: "general"
    }
    static PropsTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    }
    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    constructor(props) {
        super(props);
        //console.log("this is constructer")
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)}-NewsPedia`;
    }
    // async updatePage() {
    //     const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=bd0090aee6774f45a0ccc16270b09eb9&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    //     this.setState({ loading: true })
    //     let data = await fetch(url);
    //     //console.log(data);
    //     let parsedData = await data.json()
    //     //console.log(parsedData);
    //     this.setState({ loading: false })

    // }
    async componentDidMount() {
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=bd0090aee6774f45a0ccc16270b09eb9&page=1&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true })
        let data = await fetch(url);
        //console.log(data);
        let parsedData = await data.json()
        console.log(parsedData);
        this.setState({ loading: false })
        this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults })
        // this.updatePage();


    }
    handlePrevClick = async () => {
        console.log("prev click");
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=bd0090aee6774f45a0ccc16270b09eb9&page=${this.state.page + -1}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true })
        let data = await fetch(url);
        //console.log(data);
        let parsedData = await data.json()
        //console.log(parsedData);
        this.setState({ loading: false })
        this.setState({
            page: this.state.page - 1,
            articles: parsedData.articles
        })
        // this.setState({
        //     page: this.state.page - 1
        // })
        // this.updatePage()

    }
    handleNextClick = async () => {
        if (!(this.state.page + 1 > (Math.ceil(this.state.totalResults / this.props.pageSize)))) {


            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=bd0090aee6774f45a0ccc16270b09eb9&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
            this.setState({ loading: true })
            let data = await fetch(url);
            //console.log(data);
            let parsedData = await data.json()
            //console.log(parsedData);
            this.setState({ loading: false })


            console.log("next click");
            this.setState({
                page: this.state.page + 1,
                articles: parsedData.articles
            })
            // this.setState({
            //     page: this.state.page + 1
            // })
            // this.updatePage()
        }
    }



    render() {
        return (

            <div className="container my-3" >
                <h1 className="text-center" style={{ margin: "35px 0px" }}>NewsPedia-Top headlines on {this.capitalizeFirstLetter(this.props.category)} </h1>
                {this.state.loading && <Spinner />}





                <div className="row">

                    {!this.state.loading && this.state.articles?.map((element) => {


                        return <div className="col-md-4" key={element.url}>

                            <NewsItem title={element.title ? element.title : ""}
                                description={element.description ? element.description : ""}
                                imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} />

                        </div>
                    })}
                </div>
                <div className="container d-flex justify-content-between my-2">
                    <button type="button" disabled={this.state.page <= 1} className="btn btn-dark" onClick={this.handlePrevClick}>&larr;Previous</button>
                    <button type="button" disabled={this.state.page + 1 > (Math.ceil(this.state.totalResults / this.props.pageSize))} className="btn btn-dark" onClick={this.handleNextClick}>Next&rarr;</button>


                </div>

            </div>
        )
    }
}

export default News
//import React, { Component } from 'react'
// import NewsItem from './NewsItem'

// export class News extends Component {

//     constructor() {
//         super();
//         this.state = {
//             articles: [],
//             loading: false,
//             page: 1
//         }
//     }

//     async componentDidMount() {
//         let url = "https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=bd0090aee6774f45a0ccc16270b09eb9&page=1pageSize=20";
//         let data = await fetch(url);
//         let parsedData = await data.json()
//         console.log(parsedData);
//         this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults })
//     }

//     handlePrevClick = async () => {
//         console.log("Previous");
//         let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=bd0090aee6774f45a0ccc16270b09eb9&page=${this.state.page - 1}&pageSize=20`;
//         let data = await fetch(url);
//         let parsedData = await data.json()
//         console.log(parsedData);
//         this.setState({
//             page: this.state.page - 1,
//             articles: parsedData.articles
//         })

//     }

//     handleNextClick = async () => {
//         console.log("Next");
//         if (this.state.page + 1 > Math.ceil(this.state.totalResults / 20)) {

//         }
//         else {
//             let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=bd0090aee6774f45a0ccc16270b09eb9&page=${this.state.page + 1}&pageSize=20`;
//             let data = await fetch(url);
//             let parsedData = await data.json()
//             console.log(parsedData);
//             this.setState({
//                 page: this.state.page + 1,
//                 articles: parsedData.articles
//             })
//         }
//     }

//     render() {
//         return (
//             <div className="container my-3">
//                 <h1>NewsMonkey - Top Headlines</h1>
//                 <div className="row">
//               {this.state.articles.map((element) => {
//                         return <div className="col-md-4" key={element.url}>
//                             <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} />
//                         </div>
//                     })}
//                 </div>
//                 <div className="container d-flex justify-content-between">
//                     <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}> &larr; Previous</button>
//                     <button type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
//                 </div>
//             </div>
//         )
//     }
// }

// export default News
