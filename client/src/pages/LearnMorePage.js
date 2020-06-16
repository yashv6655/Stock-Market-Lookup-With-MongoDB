import React from "react";
import { Link } from "react-router-dom";
import logo from "../newsThumbnail.jpg";
import { articles } from "./LearnMorePageArticles";
import Navbar from "../components/Navbar";

export default function LearnMorePage() {
  return (
    <section className="section learn-section">
      <div className="mt-5">
        <h1 className="section-title">Learn About Stocks</h1>
        <div className="col-sm">
          {articles.map((article) => {
            return (
              <div
                className="card bg-light mb-3 mr-3"
                style={{ maxWidth: "18rem", float: "left" }}
                key={article.id}
              >
                <div className="card-header">{article.publisher}</div>
                <div className="card-body">
                  <h5 className="card-title">{article.title}</h5>
                  <p className="card-text">{article.description}</p>
                  <a
                    href={article.urlToArticle}
                    className="btn btn-warning"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    Read More
                  </a>
                </div>
              </div>
            );
          })}
        </div>
        <button className="learn-section-btn btn-warning btn mt-5">
          <Link to="/" className="btn btn-warning">
            Back Home
          </Link>
        </button>
      </div>
    </section>
  );
}
