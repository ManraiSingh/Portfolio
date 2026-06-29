const portfolio = {
  projects: [
    {
number: "01",
title: "ZIGGY - PET FOR COUPLES",
year: "2026",
type: "iOS Startup",
blurb: "A shared digital pet and widget designed to help couples stay connected through everyday interactions.",
story: "Ziggy - Pet for Couples is an iOS relationship app centered around a virtual companion that both partners raise together. Built using SwiftUI, WidgetKit and Firebase, the experience turns simple actions like feeding, playing and sharing moments into a fun way of maintaining connection across distance.",
image: "./assets/images/ziggy-for-two.png",
inProgress: true,
link: ""
}
,
    {
number: "02",
title: "ZIGGY AI",
year: "2025",
type: "AI Chrome Extension",
blurb: "An AI companion that lives inside your browser and understands what you're viewing.",
story: "Ziggy AI is a context-aware Chrome extension that helps users interact with web content without switching tabs. It can understand the current page, answer questions, summarize information and provide assistance directly inside the browsing experience through a playful virtual companion.",
image: "./assets/images/ziggy-ai.png",
link: "https://chromewebstore.google.com/detail/omapeelmihfdaliinnmbgpficaliocfl"
},
    {
number: "03",
title: "FOCUS TAB",
year: "2024",
type: "Productivity Extension",
blurb: "A distraction-free new tab experience built for focus, organization and daily productivity.",
story: "Focus Tab transforms the default browser tab into a personal productivity hub. It combines task management, weather updates, focus tools, quick shortcuts and clean design into a single workspace that helps users start every browsing session with intention.",
image: "./assets/images/focustab.png",
link: "https://chromewebstore.google.com/detail/leiofepjjglilgnegnnppaglgdnpieen"
},
    {
  number: "04",
  title: "CR FINANCE",
  year: "2026",
  type: "Client Website",
  blurb: "A professional financial advisory website designed to build trust and attract new clients.",
  story: "Designed and developed a modern website for CR Financial Advisors focused on clarity, credibility and lead generation. The platform presents financial services in a simple and approachable way while maintaining a professional and trustworthy brand presence.",
  image: "./assets/images/crfinance.png",
  link: "https://crfinancialadvisors.com/"
}
  ]
};

const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

function renderProjects() {
  $("#project-list").innerHTML = portfolio.projects.map((project, index) => `
    <article class="project reveal" tabindex="0" data-project="${index}" aria-label="Open ${project.title} case study">
      <span class="project__number">${project.number}</span>
      <h2 class="project__title">${project.title}</h2>
      <div class="project__meta">
        <p><span>Discipline</span>${project.type}</p>
        <p><span>Year</span>${project.year}</p>
      </div>
      <span class="project__arrow">↗</span>
      <div class="project__preview" aria-hidden="true"><div style="background:${project.palette}"></div></div>
    </article>
  `).join("");
}

function runLoader() {
  const counter = $(".loader__count");
  const bar = $(".loader__line i");
  let value = 0;
  const interval = setInterval(() => {
    value += Math.ceil(Math.random() * 12);
    value = Math.min(value, 100);
    counter.textContent = String(value).padStart(3, "0");
    bar.style.width = `${value}%`;
    if (value === 100) {
      clearInterval(interval);
      setTimeout(() => {
        $(".loader").classList.add("is-done");
        document.body.classList.add("is-loaded");
      }, 250);
    }
  }, 40);
}

function initReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => entry.isIntersecting && entry.target.classList.add("is-visible"));
  }, { threshold: .12 });
  $$(".reveal").forEach(el => observer.observe(el));

  const text = $(".split-text");
  text.innerHTML = text.textContent.trim().split(/\s+/).map(word => `<span class="word">${word}&nbsp;</span>`).join("");
  const words = $$(".word", text);
  window.addEventListener("scroll", () => {
    const rect = text.getBoundingClientRect();
    const progress = Math.max(0, Math.min(1, (innerHeight - rect.top) / (innerHeight + rect.height * .35)));
    words.forEach((word, index) => word.style.opacity = progress > index / words.length ? "1" : ".14");
  }, { passive: true });
}

function initCounters() {
  const counters = $$("[data-count]");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const target = Number(entry.target.dataset.count);
      let value = 0;
      const tick = () => {
        value += Math.ceil((target - value) * .16);
        entry.target.textContent = String(Math.min(value, target)).padStart(2, "0");
        if (value < target) requestAnimationFrame(tick);
      };
      tick();
      observer.unobserve(entry.target);
    });
  }, { threshold: .4 });
  counters.forEach(counter => observer.observe(counter));
}

function initParallax() {
  const depthItems = $$("[data-depth]");
  if (!depthItems.length || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  let x = 0;
  let y = 0;
  let tx = 0;
  let ty = 0;

  document.addEventListener("pointermove", event => {
    tx = (event.clientX / innerWidth - .5) * 2;
    ty = (event.clientY / innerHeight - .5) * 2;
  }, { passive: true });

  const render = () => {
    x += (tx - x) * .08;
    y += (ty - y) * .08;
    depthItems.forEach(item => {
      const depth = Number(item.dataset.depth);
      item.style.translate = `${x * depth * 90}px ${y * depth * 70}px`;
      item.style.rotate = `${-y * depth * 8}deg ${x * depth * 12}deg`;
    });
    requestAnimationFrame(render);
  };
  render();
}

function initPointer() {
  if (!matchMedia("(pointer:fine)").matches) return;
  const cursor = $(".cursor");
  let mouseX = -100, mouseY = -100, cursorX = -100, cursorY = -100;
  document.addEventListener("mousemove", event => { mouseX = event.clientX; mouseY = event.clientY; });
  const render = () => {
    cursorX += (mouseX - cursorX) * .18;
    cursorY += (mouseY - cursorY) * .18;
    cursor.style.left = `${cursorX}px`;
    cursor.style.top = `${cursorY}px`;
    requestAnimationFrame(render);
  };
  render();

  $$(".project").forEach(project => {
    const preview = $(".project__preview", project);
    project.addEventListener("mouseenter", () => cursor.classList.add("is-project"));
    project.addEventListener("mouseleave", () => {
      cursor.classList.remove("is-project");
      project.style.transform = "";
    });
    project.addEventListener("mousemove", event => {
      const rect = project.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - .5;
      const y = (event.clientY - rect.top) / rect.height - .5;
      project.style.transform = `perspective(900px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg)`;
      preview.style.left = `${event.clientX}px`;
      preview.style.top = `${event.clientY}px`;
    });
  });

  $$(".magnetic").forEach(el => {
    el.addEventListener("mousemove", event => {
      const rect = el.getBoundingClientRect();
      el.style.transform = `translate(${(event.clientX - rect.left - rect.width / 2) * .22}px, ${(event.clientY - rect.top - rect.height / 2) * .22}px)`;
    });
    el.addEventListener("mouseleave", () => el.style.transform = "");
  });
}

function openProject(index) {
  const project = portfolio.projects[index];
  const live = !project.inProgress && !!project.link;
  const modal = $("#project-modal");
  $(".modal__content", modal).innerHTML = `
    <div class="modal__hero">
      <div class="title-row"><h2>${project.title}</h2></div>
      <p>${project.blurb}</p>
    </div>
    <div class="modal__visual ${live ? "is-live" : "is-wip"}" role="button" tabindex="0"
         aria-label="${live ? `Visit ${project.title} website` : `${project.title} is still in the making`}">
      <img src="${project.image}" alt="${project.title}">
      <div class="view-orb" aria-hidden="true">
        <div class="view-orb__inner">
          <span class="view-orb__label">${live ? "View" : "Soon"}</span>
          <i class="view-orb__sub">${live ? "website ↗" : "in progress"}</i>
        </div>
      </div>
    </div>
    <div class="modal__details">
      <p>${project.story}</p>
      <div class="modal__facts">
        <div><span>Product Name</span><span>${project.title}</span></div>
        <div><span>Discipline</span><span>${project.type}</span></div>
        <div><span>Year</span><span>${project.year}</span></div>
        <div><span>Status</span><span>${live ? "Live project" : "In the making"}</span></div>
      </div>
    </div>`;
  initModalVisual(modal, project, live);
  modal.showModal();
  document.body.style.overflow = "hidden";
}

function initModalVisual(modal, project, live) {
  const visual = $(".modal__visual", modal);
  const orb = $(".view-orb", visual);
  let mx = 0, my = 0, x = 0, y = 0, hovering = false, raf = 0;

  const loop = () => {
    if (!orb.isConnected) { raf = 0; return; }            // bail if modal content was replaced
    const rect = visual.getBoundingClientRect();
    const tx = mx - rect.left, ty = my - rect.top;
    x += (tx - x) * 0.22;                                  // smooth trailing
    y += (ty - y) * 0.22;
    orb.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    raf = hovering ? requestAnimationFrame(loop) : 0;
  };

  visual.addEventListener("pointermove", event => { mx = event.clientX; my = event.clientY; });
  visual.addEventListener("pointerenter", event => {
    mx = event.clientX; my = event.clientY;
    const rect = visual.getBoundingClientRect();
    x = mx - rect.left; y = my - rect.top;                 // snap so it doesn't fly in
    orb.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    hovering = true;
    visual.classList.add("is-hover");
    if (!raf) raf = requestAnimationFrame(loop);
  });
  visual.addEventListener("pointerleave", () => {
    hovering = false;
    visual.classList.remove("is-hover");
  });

  const activate = () => {
    if (live) window.open(project.link, "_blank", "noopener");
    else openWip(project);
  };
  visual.addEventListener("click", activate);
  visual.addEventListener("keydown", event => {
    if (["Enter", " "].includes(event.key)) { event.preventDefault(); activate(); }
  });
}

function openWip(project) {
  const wip = $("#wip-modal");
  $(".wip__file", wip).textContent = `${project.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")}.swift`;
  $(".wip__name", wip).textContent = project.title;
  wip.showModal();
}

function initWip() {
  const wip = $("#wip-modal");
  if (!wip) return;
  const close = () => wip.close();
  $(".wip__close", wip).addEventListener("click", close);
  wip.addEventListener("click", event => { if (event.target === wip) close(); });
}

function initProjects() {
  $$(".project").forEach(project => {
    const open = () => openProject(Number(project.dataset.project));
    project.addEventListener("click", open);
    project.addEventListener("keydown", event => ["Enter", " "].includes(event.key) && open());
  });
  $(".modal__close").addEventListener("click", () => {
    $("#project-modal").close();
    document.body.style.overflow = "";
  });
}

function initTilt() {
  const element = $("[data-tilt]");
  element.addEventListener("mousemove", event => {
    const rect = element.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - .5;
    const y = (event.clientY - rect.top) / rect.height - .5;
    element.style.transform = `perspective(900px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
  });
  element.addEventListener("mouseleave", () => element.style.transform = "");
}

function updateTime() {
  $("#local-time").textContent = `IST ${new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit", hour12: false }).format(new Date())}`;
}

function initMobileMenu() {
  $(".menu-btn").addEventListener("click", event => {
    const nav = $(".nav");
    nav.classList.toggle("is-open");
    event.currentTarget.textContent = nav.classList.contains("is-open") ? "Close" : "Menu";
  });
  $$(".nav nav a").forEach(link => link.addEventListener("click", () => $(".nav").classList.remove("is-open")));
}

renderProjects();
runLoader();
initReveal();
initCounters();
initParallax();
initPointer();
initProjects();
initWip();
initTilt();
initMobileMenu();
updateTime();
setInterval(updateTime, 30000);
'use strict';
