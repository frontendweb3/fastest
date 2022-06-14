let search = document.getElementById('search')
let submitButton = document.getElementById('submitButton')
let resultOutput = document.getElementById('outPostResult')
let loadingElement = document.getElementById('loadingData')
let noPostResultElement = document.getElementById('noPostResult')



let query;
let queryLower;
var result = []
var looding;

if (search) {
  document.getElementById('search').addEventListener("change", function () {
    query = search.value
    queryLower = query.toLowerCase()
  }
  )
}

if (submitButton) {
  submitButton.addEventListener(
    'click', function () {
      let errorElement = document.getElementsByClassName('error')

      const api = new GhostContentAPI({
        url: 'https://officialrajdeepsingh.dev',
        key: 'b69753961ae603cfa6773090ce',
        version: "v4"
      });
      result = []

      loading = true

      showLoading()

    
      if (errorElement > 0) {
        errorElement.className = 'hidden'
      }
      try {
        api.posts
          .browse({ limit: 'all', include: 'authors' })
          .then(
            (posts) => {

              posts.filter(
                post => {

                  if (post.title.toLowerCase().trim().includes(queryLower) || post.excerpt.toLowerCase().trim().includes(queryLower)) {

                    result.push(post)
                  }
                }
              )
              loading = false
              showdata(result)
            }
          )
      } catch (error) {
        loadingElement.classList.add("hidden");
        const para = document.createElement("p");
        para.className = 'error'
        para.innerText = error
        resultOutput.appendChild(para);
      }

    }
  )
}

function showdata(resultData) {

  loadingElement.classList.add("hidden");
  noPostResultElement.classList.add('hidden')

 

  if (resultData.length > 0) {

    resultData.map(
      post => {
      

        //   outer div
        const outerDiv = document.createElement("div");

        outerDiv.className = 'postData flex flex-col m-auto my-16 xs:my-16 sm:my-16 md:my-16 lg:my-20 xl:my-20 2xl:my-22 p-6 w-5/6 sm:w-5/6 md:w-5/6 lg:w-5/6 xl:w-5/6 2xl:w-5/6'
        resultOutput.appendChild(outerDiv);
    
        
        // inside outer div create h2
      const insideH2 = document.createElement("h2");
      insideH2.className='text-sm text-gray-600 xs:text-md sm:text-md md:text-lg xl:text-xl 2xl:text-1xl'
      insideH2.innerText= new Date(post.updated_at).toLocaleDateString('en-us', { year:"numeric", month:"short", day:"numeric"}) 
   
      outerDiv.appendChild(insideH2);

      // inside outer div create a 
      const titleAnchor = document.createElement("a");
      titleAnchor.target='_blank'
      titleAnchor.href= post.url
     
      outerDiv.appendChild(titleAnchor);
//  title tag with title Anchor
      const title = document.createElement("h1");
     
      title.className ='text-1xl text-gray-800 xs:mt-2 sm:mt-2 md:mt-2 lg:mt-2 xl:mt-2 2xl:mt-2 xs:text-1xl sm:text-3xl md:text-4xl xl:text-5xl 2xl:text-5xl'
        title.innerText=post.title
    
        titleAnchor.appendChild(title);


        // inside outer div create second anchor 
      const secondAnchor = document.createElement("a");
      secondAnchor.target="_blank"
      secondAnchor.href= post.url
     
      outerDiv.appendChild(secondAnchor);
//  title tag with title Anchor
      const excerpt = document.createElement("p");
      excerpt.className ='text-sm text-gray-600 mt-0 xs:mt-0 sm:mt-0 md:mt-1 lg:mt-2 xl:mt-2 2xl:mt-2 xs:text-md sm:text-md md:text-xl xl:text-2xl 2xl:text-3xl'
        excerpt.innerText=post.excerpt
    
        secondAnchor.appendChild(excerpt);

         // inside outer div create author div 
      const authorOuterDiv = document.createElement("div");
      authorOuterDiv.className="flex flex-row mt-2"
      outerDiv.appendChild(authorOuterDiv);

    //  Author Anchor
      const authorNameAnchor = document.createElement("a");
      authorNameAnchor.href= post.primary_author.url
      authorNameAnchor.target= "_blank"
      authorOuterDiv.appendChild(authorNameAnchor);

    //   Author anchor with h5
    const authorh5 = document.createElement("h5");
    authorh5.className ='text-sm text-gray-600 xs:text-md sm:text-md md:text-lg xl:text-xl 2xl:text-1xl'
    authorh5.innerText= post.primary_author.name
    authorNameAnchor.appendChild(authorh5);

    //  add time in author box

    const authorTime = document.createElement("h5");
    authorTime.className ='ml-3 text-sm text-gray-600 xs:text-md sm:text-md md:text-lg xl:text-xl 2xl:text-1xl'
    authorTime.innerText= post.reading_time + ' Min Read'
    authorOuterDiv.appendChild(authorTime);
    
      }
    )
  }
  else {

    noPostResultElement.classList.remove('hidden')

    loadingElement.classList.add("hidden");
  }

}


function showLoading() {

  let OldpostDataOutput = document.querySelectorAll(".postData");

  if (OldpostDataOutput.length > 0) {
    Array.prototype.forEach.call(OldpostDataOutput, function (node) {
      node.parentNode.removeChild(node);
    });
  }
  if (loading) {
    loadingElement.classList.remove("hidden");
  }

}
