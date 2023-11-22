export function getFile(data) {
    return fetch(
        `https://api.github.com/repos/${data.owner}/${data.repo}/contents/${data.name}`,
        {
          method: "GET",
          headers: {
            Accept: "application/vnd.github+json",
            Authorization: `Bearer ${data.token}`
          },
        }
      ).then((res) => res.json());
}
export function setFile(data) {//todo this wont work unless adding sha or deleting the file first
    console.log({setToFile: data.content, data})
    return fetch(
        `https://api.github.com/repos/${data.owner}/${data.repo}/contents/${data.name}`,
        {
          method: "PUT",
          headers: {
            Accept: "application/vnd.github+json",
            Authorization: `Bearer ${data.token}`
          },
          body: JSON.stringify({
            message: "upload data from api",
            content: data.content,
            sha: data.sha,
          })
        }
      ).then((res) => res.json());
}

function uploadImage(data) {//todo does it also work for text
    return fetch(
      `https://api.github.com/repos/${data.owner}/${data.repo}/contents/${data.name}`,
      {
        method: "PUT",
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: `Bearer ${data.token}`
        },
        body: JSON.stringify({
          message: "upload image from api",
          content: data.content
        })
      }
    ).then((res) => res.json());
  }
  
  function insertImage(src) {
    const newImage = document.createElement("img");
    newImage.src = src;

    // document.querySelector(".img").innerHTML = newImage.outerHTML;
  }
  
  function getRandomName(type) {
    if (type.endsWith("png")) {
      return [Date.now(), ".png"].join("");
    }
    return [Date.now(), ".jpeg"].join("");
  }
  
  function blobToBase64(blob) {
    return new Promise((resolve) => {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        const srcData = fileReader.result;
        resolve(srcData);
      };
      fileReader.readAsDataURL(blob);
    });
  }
  
  async function parseClipboardData(callback) {
    const items = await navigator.clipboard.read().catch((err) => {
      console.error(err);
    }) ?? [];
    for (let item of items) {
      for (let type of item.types) {
        if (type.startsWith("image/")) {
          console.log("item-->: ", item);
          item
            .getType(type)
            .then(blobToBase64)
            .then((srcData) => {
              insertImage(srcData);
              callback &&
                callback({
                  content: srcData,
                  name: getRandomName(type),
                  type: type
                });
            });
          return true;
        }
      }
    }
  }
  
  function handleImageChange(callback) {
    const $file = document.querySelector(".local");

    if(!$file) return;
    $file.addEventListener("change", (event: any) => {
      const selectedfile = event?.target?.files;
      if (selectedfile.length > 0) {
        const [imageFile] = selectedfile;
        blobToBase64(imageFile).then((srcData) => {
          insertImage(srcData);
          callback &&
            callback({
              content: srcData,
              name: imageFile.name,
              type: imageFile.type
            });
        });
      }
    });
  
    // document.querySelector(".paste").onclick = () => {
    //   parseClipboardData(callback);
    // };
  }

  const initGithub = () => {
    const $form = document.querySelector(".form");
    let image = null;
    // $form.addEventListener("submit", (event) => {
    //   event.preventDefault();
    //   if (!image) {
    //     alert('Image is empty, please select or paste');
    //     return;
    //   }
    //   const formData = new FormData($form);
    //   const data = {}
    //   for (let [key, value] of formData.entries()) {
    //     data[key] = value;
    //   }
    //   // 获取图片信息
    //   uploadImage({
    //     ...data,
    //     ...image
    //   }).then(res => {
    //     let message = '';
    //     if (res.message) {
    //       message = res.message
    //     } else {
    //       message = `upload success: <a href="${res.content.html_url}">${res.content.html_url}</a>`
    //     }
    //     console.log('res', res);
    //     document.querySelector('.log').innerHTML = message;
    //   })
    // });
  
    // handleImageChange(imageInfo => {
    //   image = {
    //     ...imageInfo,
    //     content: imageInfo.content.split('base64,')[1]
    //   };
    // });
  }

  window.onload = () => {
    // initGithub();
  };

  // list repositories of user
  export function requestUserRepos(username, onLoad){
    const xhr = new XMLHttpRequest();
    const url = `https://api.github.com/users/${username}/repos`;
    xhr.open('GET', url, true);
    xhr.onload = function() {
        const data = JSON.parse(this.response);
        for(let i in data) {
            // console.log(i, data[i])
            // let ul = document.getElementById('userRepos');
            // let li = document.createElement('li');
            // li.classList.add('list-group-item');
            // li.innerHTML = (`
            // <p>Repo: ${data[i].name}</p>
            // <p>Description: ${data[i].description}</p>
            // <p>URL: <a href="${data[i].html_url}">${data[i].html_url}</a></p>
            // `);
            // ul.appendChild(li);
            
        }
        onLoad(data)
    }
    xhr.send();   
}

// https://codepen.io/blurymind/pen/JjxLGxE 
// https://github.com/blurymind/renjs-game-testbed
// list files inside of a user repository
// https://docs.github.com/en/rest/repos/contents?apiVersion=2022-11-28#create-or-update-file-contents
export function requestUserRepoFiles(username, repository, branch, token, onLoad){
    const xhr = new XMLHttpRequest();
    // https://api.github.com/repos/[USER]/[REPO]/git/trees/[BRANCH]?recursive=1

    const url = `https://api.github.com/repos/${username}/${repository}/git/trees/${branch}?recursive=1`;
    console.log({url, token})
    xhr.open('GET', url, true);
    xhr.setRequestHeader('Authorization', 'Bearer ' + token);
    xhr.onload = function() {
        const data = JSON.parse(this.response);
        for(let i in data) {
        }
        onLoad(data)
    }
    xhr.send();   
}