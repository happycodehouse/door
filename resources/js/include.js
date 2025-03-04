let door = {};

console.log("include.js")

function loadHeader() {
    return new Promise((resolve, reject) => {
        let allHtmlElements = document.querySelectorAll('[data-include-path]');

        // 모든 요소를 비동기로 로드
        let loadPromises = Array.from(allHtmlElements).map(el => {
            let includePath = el.dataset.includePath;

            if (includePath) {
                return new Promise((resolve, reject) => {
                    let xhttp = new XMLHttpRequest();

                    xhttp.onreadystatechange = function() {
                        if (this.readyState === 4) {
                            if (this.status === 200) {
                                el.innerHTML = this.responseText;
                                resolve();  // 성공 시 resolve 호출
                            } else {
                                console.error('Error loading:', includePath, 'Status:', this.status);
                                reject(this.status);
                            }
                        }
                    };

                    xhttp.onerror = function() {
                        console.error('Request failed with status:', this.status);
                        reject(this.status);
                    };

                    xhttp.open('GET', includePath, true);
                    xhttp.send();
                });
            }
        });

        // 모든 Promise가 완료될 때까지 대기
        Promise.all(loadPromises).then(resolve).catch(reject);
    });
}

loadHeader();