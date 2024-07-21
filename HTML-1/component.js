class JobIdCard extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });

        const style = document.createElement('style');
        style.textContent = `
            .id-container {
                border: 5px solid black;
                max-width: 400px;
                margin: auto;
                display: flex;
                flex-direction: column;
                align-items: center;
            }
            .id-company-name img {
                width: 100%;
            }
            .id-worker-info-img-container {
                display: flex;
                justify-content: center;
                padding: 2rem;
            }
            .id-worker-info-img-container img {
                border-radius: 50px;
                max-width: 100%;
            }
            .id-worker-info {
                background-color: black;
                display: flex;
                align-items: center;
                flex-direction: column;
                width: 100%;
            }
            .id-worker-info span {
                color: white;
                padding: 1.5rem;
                font-size: 6vh;
                font-family: Verdana, Geneva, Tahoma, sans-serif;
                font-weight: bold;
            }
            .id-position-info {
                background-color: #f21d3d;
                display: flex;
                align-items: center;
                flex-direction: column;
                width: 100%;
            }
            .id-position-info span {
                color: white;
                padding: 1rem;
                font-size: 6vh;
                font-family: Verdana, Geneva, Tahoma, sans-serif;
                font-weight: bold;
            }
        `;

        const container = document.createElement('div');
        container.classList.add('id-container');
        container.innerHTML = `
            <header class="id-company-name">
                <img src="./Assets/Company.jpg" alt="Company image">
            </header>
            <main class="id-worker-info">
                <div class="id-worker-info-img-container">
                    <img src="${this.getAttribute('image-url')||'./Assets/Jaden.jpg'}" alt="Worker image">
                </div>
                <span>${this.getAttribute('worker-name')||'Jaden Yuki'}</span>
            </main>
            <footer class="id-position-info">
                <span>${this.getAttribute('position')||'Dev Ops'}</span>
            </footer>
        `;

        shadow.appendChild(style);
        shadow.appendChild(container);
    }
}

customElements.define('job-id-card', JobIdCard);