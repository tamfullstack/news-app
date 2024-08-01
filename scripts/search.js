"use strict";

const queryInput = document.getElementById("input-query");
const submitBtn = document.getElementById("btn-submit");

const newsListEl = document.getElementById("news-container");

const navPageNumEL = document.getElementById("nav-page-num");
navPageNumEL.classList.add("hide");

const pageNumEl = document.getElementById("page-num");
const prevBtn = document.getElementById("btn-prev");
const nextBtn = document.getElementById("btn-next");

const getNewsApi = async (query) => {
  const api = `https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}`;

  try {
    const res = await fetch(api);
    const { status, articles } = await res.json();

    if (status === "ok") {
      let page = 1;
      const lastPage = Math.ceil(articles.length / newsPerPage);

      if (articles.length > 0) {
        navPageNumEL.classList.remove("hide");
      } else {
        navPageNumEL.classList.add("hide");
        setTimeout(() => {
          alert("No result!");
        }, 100);
      }

      const renderNews = (page) => {
        pageNumEl.textContent = page;

        newsListEl.innerHTML = "";
        let html = "";

        const first = (page - 1) * newsPerPage;
        const last =
          first + newsPerPage > articles.length
            ? articles.length
            : first + newsPerPage;
        const newsList = articles.slice(first, last);

        newsList.forEach((article) => {
          html += `
            <div class="news-item row mt-3">
              <div class="col-4" style="padding-left: 0">
                <img
                  src=${article.urlToImage}
                  alt=${article.title}
                  width="100%"
                />
              </div>
              <div class="col-8 mt-4 mb-4">
                <h4>
                  ${article.title}
                </h4>
                <p>
                  ${article.description}
                </p>
                <a
                  href=${article.url}
                  target="_blank"
                >
                  <button class="btn btn-primary">View</button>
                </a>
              </div>
            </div>
          `;
        });

        newsListEl.innerHTML = html;

        prevBtn.classList.remove("hide");
        nextBtn.classList.remove("hide");

        if (page === 1) {
          prevBtn.classList.add("hide");
        }

        if (page === lastPage) {
          nextBtn.classList.add("hide");
        }
      };
      renderNews(page);

      prevBtn.addEventListener("click", () => {
        if (page > 1) {
          page--;
          renderNews(page);
        }
      });

      nextBtn.addEventListener("click", () => {
        if (page < lastPage) {
          page++;
          renderNews(page);
        }
      });
    }
  } catch (err) {
    console.error(err);
  }
};

submitBtn.addEventListener("click", () => {
  const query = queryInput.value;

  if (!query) {
    alert("Please input query!");
  } else {
    getNewsApi(query);
  }
});
